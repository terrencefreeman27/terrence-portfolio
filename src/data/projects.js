// Project data.
//
// Shape (see docs/CONTENT_INVENTORY.md):
//   slug        — url-safe id, used for /projects/:slug
//   name        — display name
//   tagline     — one-line summary (card + hero)
//   summary     — 2-4 sentence description (card back / list view)
//   status      — 'live-demo' | 'runs-locally' | 'in-progress' | 'archived'
//                 'runs-locally' = complete and public source, but not hosted
//                 anywhere; it runs on your own machine (e.g. Docker Compose).
//   stack       — array of tech/service tags
//   links       — { demo, repo } — either may be null
//   heroImage   — placeholder for now (no real asset yet)
//   architectureDiagram — optional bool; true only for infra-heavy projects
//                 that have a real architecture diagram to show (currently
//                 just CloudMart). Omitted/false means the featured-projects
//                 layout skips that visual entirely rather than showing a
//                 diagram that doesn't apply.
//   caseStudy   — { sections: [{ id, title, body }] }, structured content for
//                 the case-study route. A section may use `table: { headers,
//                 rows }` instead of `body` when tabular data is a more
//                 accurate representation than prose (see
//                 'implementation-status' below).
//
// Adding a project later is just adding another object to this array — no
// route or component changes required.

export const STATUS_LABELS = {
  'live-demo': 'Live demo',
  'runs-locally': 'Runs locally',
  'in-progress': 'In progress',
  archived: 'Archived',
}

export const projects = [
  {
    slug: 'cloudmart',
    name: 'CloudMart',
    tagline:
      'Production-style AWS architecture for a small e-commerce app, built with Terraform while preparing for the AWS SAA-C03 exam.',
    summary:
      'CloudMart is an infrastructure-first e-commerce project used as a vehicle for hands-on AWS Solutions Architect Associate exam prep. The full stack is defined in Terraform: multi-AZ networking, an ALB/ASG-backed app tier, a private RDS database, and S3/CloudFront static hosting. The frontend is deployed as a live demo; the backend is intentionally left undeployed between reviews to avoid ongoing cost.',
    status: 'live-demo',
    stack: [
      'Terraform',
      'AWS VPC',
      'EC2',
      'ALB',
      'ASG',
      'RDS PostgreSQL',
      'S3',
      'CloudFront',
      'IAM',
      'Secrets Manager',
      'Systems Manager',
      'CloudWatch',
      'SNS',
      'React',
      'Node.js',
      'Express',
    ],
    links: {
      demo: 'https://d3u41r8pyeqew9.cloudfront.net',
      repo: 'https://github.com/terrencefreeman27/cloudmart-aws',
    },
    heroImage: null,
    architectureDiagram: true,
    caseStudy: {
      sections: [
        {
          id: 'overview',
          title: 'Overview',
          body: "CloudMart is a small e-commerce app used as the vehicle for a full, production-style AWS architecture, built with Terraform while preparing for the AWS Certified Solutions Architect – Associate (SAA-C03) exam. The application itself is intentionally simple — a product catalog and cart, no accounts or checkout — because the point of the project is the infrastructure behind it: multi-AZ networking, a load-balanced and auto-scaled compute tier, a private relational database, and a CDN-fronted static frontend, along with the security, cost, and operational reasoning behind every one of those choices, documented well enough to defend in an interview. The live demo linked above is the React frontend only, served from a private S3 bucket through CloudFront. The backend API is intentionally left undeployed between reviews to control cost, so product data won't load, but the page itself, its routing, and its HTTPS/caching behavior are all live and real.",
        },
        {
          id: 'architecture',
          title: 'Architecture',
          body: "CloudMart's foundation is a single VPC (10.0.0.0/16) spanning two Availability Zones, with a public and a private subnet in each — built first, before there was anything to put in the second AZ, so the network layout never had to be redesigned as later phases added compute and data tiers. The database is designed for the private subnets with no route to the internet. The Application Load Balancer and the backend instances use the public subnets, because there is no NAT Gateway anywhere in the project's Terraform (a deliberate cost decision); the backend accepts no inbound traffic except the app port from the load balancer's security group, and moving it to private subnets behind a NAT Gateway or VPC endpoints is the documented production upgrade. Two tiers are actually deployed today: the VPC itself (13 resources — subnets, an Internet Gateway, and per-AZ route tables, all free resource types) and the frontend, a private S3 bucket read only by CloudFront via Origin Access Control. Everything else — the Application Load Balancer and Auto Scaling Group in front of the backend, the RDS PostgreSQL database, and most of the CloudWatch/SNS monitoring — is fully designed in Terraform and verified with terraform plan, but deliberately not applied, to keep the project at or near $0/month. An earlier single EC2 instance was deployed, validated over an SSM tunnel, and destroyed the same day; it was later superseded by the ALB/Auto Scaling Group design. See Implementation status below for the full deployed-versus-plan-validated breakdown, and Key decisions for the reasoning behind each undeployed tier.",
        },
        {
          id: 'highlights',
          title: 'Highlights',
          body: "Multi-AZ networking from the start — one VPC spanning two Availability Zones with public and private subnets in each, before there was a second tier to put in either one. Public/private subnet separation: the database is designed for private subnets with no internet route, while the ALB and backend use public subnets to avoid NAT Gateway cost, with the backend locked down to accept traffic only from the ALB's security group. S3 + CloudFront for the frontend: the React build lives in a fully private S3 bucket, with CloudFront as the only reader via Origin Access Control. An ALB + Auto Scaling Group design spanning both AZs, with ELB-based health checks so a failed instance is detected and replaced automatically, no manual intervention. A private RDS tier — PostgreSQL with no public accessibility, reachable only from the backend's security group, encrypted at rest, with a master password AWS generates and manages via Secrets Manager. SSM instead of SSH: no key pairs and no open port 22 anywhere in the project; administrative access is IAM-gated through AWS Systems Manager Session Manager. Least-privilege IAM throughout, including a narrowly-scoped policy added for the operator's own SSO permission set rather than widening it when an early apply was blocked. 100% Terraform IaC — every resource, deployed or not, is defined in code, with no manual console changes to anything long-lived. Cost-aware deployment decisions: every resource with a real ongoing charge was either time-boxed and destroyed after validation, or fully designed and plan-verified but left undeployed pending explicit approval.",
        },
        {
          id: 'implementation-status',
          title: 'Implementation status',
          table: {
            headers: ['Component', 'Status', 'Notes'],
            rows: [
              [
                'VPC — 2 AZs, public/private subnets, IGW, route tables',
                'Deployed',
                'Standing infrastructure, $0/month (free resource types)',
              ],
              [
                'S3 (private) + CloudFront + OAC + HTTPS + SPA routing',
                'Deployed',
                'Live frontend, usage-based cost, no idle charge',
              ],
              [
                'Single EC2 backend + SSM + IAM role (no SSH, no public port)',
                'Validated, then destroyed',
                "Verified /api/health and /api/products over an SSM tunnel, then torn down for cost control; superseded by the ASG design below",
              ],
              [
                'Application Load Balancer + Target Group',
                'Plan-validated only',
                'terraform plan confirms correctness; never applied',
              ],
              [
                'Auto Scaling Group + Launch Template (multi-AZ EC2)',
                'Plan-validated only',
                "Backend security group accepts the app port only from the ALB's security group",
              ],
              [
                'RDS PostgreSQL (private subnets, encrypted, Secrets Manager)',
                'Plan-validated only',
                'Single-AZ by default; Multi-AZ is a documented, one-variable upgrade',
              ],
              [
                'CloudWatch monitoring + SNS',
                'Mostly plan-validated',
                '1 alarm (CloudFront 5xx) is plan-verified and ready to deploy at ~$0/month; 8 more (ALB/ASG/RDS) are designed but inert',
              ],
            ],
          },
        },
        {
          id: 'security',
          title: 'Security',
          body: "The frontend's S3 bucket has all four S3 Block Public Access settings enabled; the only reader is CloudFront, via Origin Access Control scoped to this exact distribution's ARN, not any CloudFront distribution. HTTPS is enforced everywhere it's live: CloudFront redirects every viewer connection to HTTPS. The ALB design is HTTP-only for now; an HTTPS listener needs a custom domain and an ACM certificate, which is listed as a production upgrade. There is no SSH and no open port 22 anywhere in the project; administrative access is IAM-gated through AWS Systems Manager Session Manager instead. Security groups chain by reference rather than CIDR block — ALB to backend to database, each hop trusting the previous security group directly, so the rule stays correct automatically as instances are replaced. The RDS design sets publicly_accessible to false, is reachable only from the backend's security group, and its own security group has zero egress rules, since it never needs to initiate outbound connections. Data is encrypted at rest: S3 with SSE-S3, and the RDS design with storage_encrypted set at creation, an option that can't be retrofitted later. The RDS master password is generated and owned entirely by AWS through Secrets Manager (manage_master_user_password = true) — it never appears in Terraform code, state, or the repository. All administrative access, including Terraform itself, uses IAM Identity Center SSO for short-lived, auto-expiring credentials rather than a long-lived access key.",
        },
        {
          id: 'availability-scalability',
          title: 'Availability & scalability',
          body: "CloudMart has been a 2-AZ design since the first infrastructure phase, before there was anything to put in the second AZ, so nothing had to be redesigned later. In the ALB/ASG design, the load balancer distributes traffic across both AZs and decouples clients from any individual instance's identity, while the Auto Scaling Group maintains a fixed desired capacity of two, one per AZ, and replaces failed instances automatically. The target group's health check polls the app's own /api/health endpoint, and the ASG reacts to that same ELB-based check rather than basic EC2 status, so a crashed app process on an otherwise-healthy instance still gets detected and replaced. A failed instance is expected to be detected within roughly 60–90 seconds, removed from rotation immediately, and replaced from the same Launch Template with no manual step; if an entire Availability Zone fails, the ALB (itself multi-AZ) keeps routing to the surviving AZ while the ASG restores capacity once possible. RDS Multi-AZ is available as a documented, one-variable upgrade (var.db_multi_az) — a synchronous standby with automatic failover in roughly 60–120 seconds — deliberately left off by default given this project's lack of real traffic and its cost priorities.",
        },
        {
          id: 'cost-optimization',
          title: 'Cost optimization',
          body: "There is no NAT Gateway anywhere in this project's Terraform — it carries a real hourly charge (upwards of $32/month) and nothing currently needs outbound internet access from a private subnet. The single-EC2 validation was destroyed the same day it was proven: deploy, verify, tear down is the deliberate pattern for anything with a real per-hour cost, rather than leaving it running to be safe. The ALB, Auto Scaling Group, and RDS tiers remain plan-validated rather than standing — each is fully designed and terraform plan-verified, proving correctness without spending anything, but left undeployed because their combined cost if left running (roughly $48.57/month for the ALB/ASG tier, $15.84–31.28/month for RDS) wasn't judged worth paying for a portfolio project with no real traffic. S3 and CloudFront were chosen for the public demo specifically because they have no idle or base charge — unlike EC2, the ALB, RDS, and NAT Gateway, their cost is 100% usage-based, so a live, always-on public demo link costs effectively $0/month at near-zero traffic. The current standing architecture is designed to stay at or near $0/month with minimal traffic — not a guarantee of a $0 bill forever, since real traffic, a future custom domain, or deploying the plan-validated tiers would all add real, documented cost.",
        },
        {
          id: 'what-i-learned',
          title: 'What I learned',
          body: "Hit PowerUserAccess's intentional restriction on IAM management firsthand — a real anti-privilege-escalation guardrail against a power user self-escalating to admin — and resolved it with a narrowly-scoped, resource-name-restricted policy rather than reaching for a broader one. Found a Terraform dependency-graph behavior beyond the happy path: referencing another module's output creates a dependency edge to that module's entire resource graph, even for a currently-null value, and terraform plan -target can silently expand its own blast radius through that edge — an early version of the monitoring module nearly planned to create eleven unrelated compute/database resources as a side effect before this was caught and fixed. Treated cost-aware architecture as a design constraint rather than an afterthought: every resource with a real hourly charge went through the same lifecycle — designed, plan-verified, and either time-boxed-and-destroyed or left deliberately undeployed pending approval. Ran into real Terraform state-management realities — local state, targeted applies, and stale outputs from resources removed out of config but never reconciled, fixed with a -refresh-only apply that's provably incapable of touching real infrastructure — the kind of operational detail that only shows up from actually running Terraform repeatedly. Set up secure instance administration without SSH end-to-end via SSM Session Manager, including the discovery that its CLI plugin isn't bundled with the AWS CLI and needed a manual install. And named production-versus-portfolio trade-offs explicitly rather than glossing over them: single-AZ RDS, no custom domain, no CI/CD, and local Terraform state are each a deliberate, documented choice for this project's scope and budget, with the production alternative written down alongside it.",
        },
        {
          id: 'key-decisions',
          title: 'Key decisions',
          body: "Every significant decision in the source repository has a short ADR — what was decided, why, and what alternatives were considered. ADR 0001 covers choosing Terraform for infrastructure as code over ClickOps, CloudFormation/CDK, or Pulumi. ADR 0004 covers authenticating via AWS IAM Identity Center (SSO) rather than long-lived IAM access keys. ADR 0005 covers the VPC network design — per-AZ private route tables, dynamically resolved Availability Zones, and no NAT Gateway. ADR 0006 covers EC2 placement and access — public subnet, no SSH, SSM-only administration, and the IAM guardrail encountered along the way. ADR 0007 covers the ALB/Auto Scaling Group design for the backend tier, fully plan-validated but deliberately not deployed to keep cost at $0. ADR 0008 covers the RDS PostgreSQL design — private-subnet-only, encrypted, Secrets-Manager-backed — also plan-validated but not deployed. ADR 0009 covers the S3/CloudFront frontend hosting design, which was later actually deployed. ADR 0010 covers the monitoring scope and a real Terraform dependency-graph bug found and fixed along the way. Full text of each ADR is in docs/decisions/ in the repository linked above.",
        },
      ],
    },
  },
  {
    slug: 'belle-mont-montessori',
    name: 'Belle Menti Montessori School',
    tagline:
      'A real client website for a licensed Montessori school in Hollywood, FL — 9 pages of hand-coded HTML/CSS/JS, deployed live on the client\'s own domain.',
    summary:
      'Belle Menti Montessori School needed a full marketing site covering programs, admissions, tuition, staff, and a photo gallery. I designed and built a 9-page static site by hand in HTML, CSS, and vanilla JavaScript — no framework — including a Netlify-hosted contact form, a JS lightbox gallery, full on-page SEO, and a deployment configuration with custom-domain redirects, security headers, and asset caching. The site is live today at the client\'s own domain.',
    status: 'live-demo',
    stack: ['HTML5', 'CSS3', 'JavaScript', 'Netlify Forms', 'Netlify'],
    links: {
      demo: 'https://bellementimontessorihollywood.com',
      repo: 'https://github.com/terrencefreeman27/belle-mont-montessori',
    },
    heroImage: null,
    caseStudy: {
      sections: [
        {
          id: 'overview',
          title: 'Overview',
          body: "Belle Menti Montessori is a licensed Montessori school in Hollywood, FL serving children ages 1-6. The school needed a public website that could stand on its own for admissions, programs, tuition, staff bios, a school calendar, and a photo/video gallery — nine pages in total (home, about, admissions, tuition, curriculum, team, calendar, gallery, contact). I built the whole site by hand as static HTML and CSS with a small amount of vanilla JavaScript, no framework or CMS, and deployed it on Netlify at the school's own domain, bellementimontessorihollywood.com, where it's live today.",
        },
        {
          id: 'design-content',
          title: 'Design & content',
          body: "The site follows a consistent visual identity across all nine pages from a single shared stylesheet: a hero section (video with a gradient fallback), a four-value grid — Independence, Creativity, Discovery, Community — that links out to the curriculum page, and a full navigation system including a dropdown (Admissions > Tuition) and a mobile hamburger menu. The content itself is real, client-specific material, not filler — the About page, for example, carries the school's full staff code of ethics and a Florida-DCF-aligned child-abuse-reporting policy, which had to be represented accurately rather than templated.",
        },
        {
          id: 'technical-build',
          title: 'Technical build',
          body: "No framework: nine hand-authored HTML pages share one ~34KB styles.css, with CSS keyframe animations for the hero's entrance sequence and a scroll-cue bounce, plus four responsive breakpoints via media queries for mobile/tablet layouts. The contact form uses Netlify Forms (data-netlify=\"true\" with a honeypot field for spam) so message submissions work with zero backend or server code. The gallery page implements a custom JS lightbox with previous/next navigation and a counter for browsing the school's photos and videos. Every page carries a full SEO head — canonical URL, meta description/keywords, Open Graph and Twitter Card tags, geo tags — backed by a sitemap.xml and robots.txt at the site root.",
        },
        {
          id: 'deployment',
          title: 'Deployment',
          body: "The site is deployed on Netlify and live at the client's custom domain. netlify.toml configures the publish root, a forced www-to-non-www redirect, security headers (X-Frame-Options, X-XSS-Protection, X-Content-Type-Options, Referrer-Policy) applied to every route, and a one-year Cache-Control on images and CSS. The repository is public on GitHub with a clean history — an initial build followed by a content/roster update pass.",
        },
        {
          id: 'what-i-learned',
          title: 'What I learned',
          body: "This was my first site built for a real, live client rather than as a personal sample project — working from the school's actual content, brand, and regulatory constraints instead of placeholder text. It was good practice doing on-page SEO fundamentals by hand (meta tags, sitemap, robots.txt, Open Graph/Twitter previews) rather than relying on a framework's SEO plugin, and a useful reminder of how much you can ship without a backend at all — Netlify Forms handled the entire contact-form requirement with no server code. It also reinforced the fundamentals: responsive layout, animation, and interactive components (mobile nav, lightbox) built in plain CSS and JS, no libraries.",
        },
      ],
    },
  },
  {
    slug: 'aws-architecture-assistant',
    name: 'AWS Architecture Design Assistant',
    tagline:
      'An MVP workbench that turns plain-language business requirements into a reviewable AWS architecture plan and diagram — asking follow-up questions instead of guessing.',
    summary:
      'Built as an MVP on 2026-10-01, the assistant collects requirements, asks follow-up questions when something important is missing, and only then produces a structured plan: components, data flow, assumptions, Well-Architected considerations, alternatives, and a diagram drawn with the official AWS Architecture Icons, plus a downloadable Markdown report and a shareable link. Plans come from a deterministic demo planner covering five sample scenarios; output is schema-validated, limited to a 46-service catalog, and cites only a curated registry of official AWS documentation. It is a planning aid, not a provisioning tool — it never touches an AWS account and never calls its plans production-ready.',
    // Hosted demo verified generating plans on 2026-10-01 (planner runs in
    // the browser; no backend on Vercel).
    status: 'live-demo',
    stack: [
      'React',
      'Vite',
      'TypeScript',
      'Node.js',
      'Express',
      'Zod',
      'Mermaid',
      'Vitest',
      'Playwright',
      'AWS Well-Architected',
    ],
    links: {
      demo: 'https://aws-architecture-assistant.vercel.app/',
      repo: 'https://github.com/terrencefreeman27/aws-architecture-assistant',
    },
    heroImage: null,
    caseStudy: {
      sections: [
        {
          id: 'overview',
          title: 'Overview',
          body: "The AWS Architecture Design Assistant is for someone who understands their business problem but not AWS. You describe the system you need — its purpose, existing systems, expected usage, data sensitivity, AWS Region, availability needs, budget posture, and how your team operates — and the assistant either asks focused follow-up questions or returns a reviewable architecture plan. It's an MVP, built on 2026-10-01: a React/Vite/TypeScript workbench and an Express/TypeScript API that share a single TypeScript planning pipeline. It never creates AWS resources and never asks for AWS credentials, and every plan is presented as a starting point for review, not a finished design.",
        },
        {
          id: 'how-it-works',
          title: 'How it works',
          body: "Requirements come first. A completeness meter shows which required answers are still missing, and while any are, the assistant returns follow-up questions — each with the reason it matters — instead of guessing at an architecture. Once requirements are complete, the plan lists the selected AWS components and what each does in the design, a step-by-step data flow, assumptions (each linked to the requirement you'd edit to correct it), open questions, security, reliability, performance, operations, and cost considerations, at least one alternative with its tradeoffs, and a high-level implementation sequence. Plans are produced by a deterministic demo planner — rules and templates, not a language model — covering five reviewed patterns, each with a one-click sample: a basic web application, an integration between existing systems (CRM to on-premises ERP), an AI knowledge assistant, a data pipeline feeding reporting dashboards, and scheduled batch jobs. Editing a requirement marks the plan stale until it's regenerated, and the result visibly changes: saying the team already runs containers, for example, turns the serverless web-app design into ALB + ECS Fargate + RDS. Anything outside the five patterns gets a question rather than a design. Where an alternative can be expressed as a different answer, such as running the backend in containers or a long nightly job on ECS Fargate instead of Lambda, the assistant plans it too and draws it as its own diagram, with an added/removed component list computed by comparing the two validated plans and a one-click option to switch to it; alternatives it can't express that way stay text-only and say why. The questions are written in plain language (\"How much downtime is acceptable?\" rather than \"availability and recovery\"), and most can be answered \"Not sure\": the planner then applies a documented conservative default and lists it as an assumption with a link to change it. Data sensitivity, for example, defaults to confidential, never public. Requirements autosave in the browser, a share link carries them in the URL fragment so they never reach a server, and the whole plan exports as a Markdown design document whose sources come only from the curated registry.",
        },
        {
          id: 'staying-honest',
          title: 'Keeping the output honest',
          table: {
            headers: ['Rule', 'How it is enforced'],
            rows: [
              [
                'Structured data, not free-form diagrams',
                'Plans are JSON validated against a Zod schema. The app generates the Mermaid diagram itself from validated nodes and connections, with labels reduced to a safe character set; duplicate ids, dangling connections, self-loops, or free-form diagram text are rejected and no diagram is drawn. Diagrams export as SVG.',
              ],
              [
                'Supported services only',
                'A catalog of 46 AWS services. Anything outside it is removed from the diagram and reported as a validation warning.',
              ],
              [
                'No fabricated citations',
                'Plans may only cite ids from a curated registry of 61 official AWS documentation pages, including the Well-Architected Framework and its pillars. Unknown ids are stripped, and a claim left with no source is relabelled as an assumption.',
              ],
              [
                "No confident answers it can't back up",
                'Requests for exact costs, compliance determinations, "production-ready" designs or guaranteed uptime, and other clouds produce explicit cautions. Cost is described as drivers and tradeoffs, with links to AWS Pricing Calculator and AWS Budgets documentation — never dollar figures.',
              ],
            ],
          },
        },
        {
          id: 'testing',
          title: 'Testing',
          body: "316 Vitest unit and API tests, run with no network access and no model calls. They check that incomplete requirements return questions and no plan; that out-of-catalog services are removed and flagged; that invalid diagram data is rejected, including through the HTTP API, which returns 422; that guardrail topics produce cautions, and that plans contain no dollar figures and never claim to be production-ready; that every citation is a real registry entry across all 1,728 combinations of the main requirement options for the three scenarios; that generated Mermaid parses with Mermaid itself, including labels containing hostile text; that the same input always produces the same plan; that the in-browser planner returns exactly what the API returns for all three samples; that the production bundle contains no model-provider code or API-key names; that tampered, oversized, or schema-invalid share links are rejected safely; that user text can't break the structure of the exported report; and that a \"Not sure\" answer never produces a less protective design than an explicit one. A separate browser script, driven by Playwright, loads each sample, edits and regenerates a plan, exports the SVG, exercises the follow-up-question and guardrail paths, fails on console errors, checks for horizontal overflow at 1440, 1024, and 390 px, and captures screenshots. A GitHub Actions workflow runs typecheck, tests, build, and a dependency audit on every push.",
        },
        {
          id: 'status-limitations',
          title: 'Status & limitations',
          body: "This is an MVP, not a finished product. The hosted demo runs the deterministic planner entirely in the browser, with no backend and no credentials; locally, the same planner also runs behind the Express API. Scope is deliberately narrow: AWS only, single-Region designs, five patterns. It gives no cost estimates, makes no compliance determinations, doesn't design multi-Region disaster recovery, and doesn't check Region or model availability — it states those as assumptions to confirm. Citations point to overview pages that support the general practice cited, not every detail of a specific design, and there's no persistence or sign-in: requirements live in the browser tab. The planner sits behind a provider interface, and an optional server-side Anthropic Claude provider exists behind two environment variables, held to the same schema, catalog, citation, and guardrail checks. It is off by default, has not been exercised against the live API, and the tests never call it — everything described above runs on the deterministic demo planner.",
        },
      ],
    },
  },
  {
    slug: 'resolveops',
    name: 'ResolveOps',
    tagline:
      'An AI support-operations agent prototype: the model drafts cited answers from account data and company policy, and application code decides what is allowed to happen.',
    summary:
      'ResolveOps reads a B2B support request, looks up the authorized customer\'s account through typed tools, retrieves the company\'s policy documents with embedding search, and drafts a structured, cited proposal to resolve, clarify, or escalate. A human edits, approves, or rejects it; only approved ticket actions run, each exactly once, and every step is audited. It runs locally with Docker Compose: demo mode uses clearly labelled simulated AI and needs no keys, and live mode with Claude was verified against the real API on 2026-10-23.',
    // Not hosted anywhere: a local Docker Compose app with a public repo, so
    // there is no demo link. Facts verified against the source repo's main
    // (c31a505) on 2026-10-23.
    status: 'runs-locally',
    stack: [
      'Python',
      'FastAPI',
      'SQLAlchemy',
      'Alembic',
      'PostgreSQL',
      'pgvector',
      'fastembed',
      'Claude API',
      'React',
      'TypeScript',
      'Tailwind CSS',
      'Docker Compose',
      'pytest',
      'Playwright',
    ],
    links: {
      demo: null,
      repo: 'https://github.com/terrencefreeman27/resolveops',
    },
    heroImage: null,
    caseStudy: {
      sections: [
        {
          id: 'overview',
          title: 'Overview',
          body: "Support answers at a B2B software company usually depend on two lookups: this customer's account (plan, roles, invoices, open tickets) and the company's current policy documents. ResolveOps does both and drafts a structured proposal with the evidence attached: a next action (resolve, clarify, or escalate), a reply, a ticket action, and citations. A reviewer then edits, approves, or rejects it, and nothing happens until they approve. The rule throughout is that the AI proposes and application code decides. Two fictional companies are preloaded as separate workspaces, Northstar Analytics and Lumen Ledger, with different plans and policies; every customer is synthetic. Reviewers can also create new workspaces and import their own Markdown or plain-text documentation.",
        },
        {
          id: 'how-it-works',
          title: 'How it works',
          body: "A FastAPI backend runs each request through an explicit state machine: classify, call tools, retrieve, apply escalation rules, draft, then wait for review. Tools are typed and scoped by a context the server builds from the request, so the workspace and customer always come from the server session, never from the message or the model. Retrieval is pgvector cosine search over the workspace's own document sections, embedded locally with bge-small (384 dimensions), so it is real semantic search in both modes with no paid embeddings API. In live mode, Claude (claude-haiku-5-5 by default) decides which allowlisted tools to call; every call passes a code-side gate, the loop is capped by tool-step and token limits, and the final answer must match a JSON schema and is validated again on the server. Live mode is limited to signed-in reviewers, with rate, concurrency, and monthly budget limits. In demo mode a deterministic simulated provider, labelled \"Simulated AI — demo mode\" in the UI, stands in for the model; retrieval, tools, rules, approval, execution, and the audit log are all real. The same \"we upgraded but can't access reporting\" or \"charged twice\" message gets a different, differently cited answer in each company, because the answer comes from that company's account data and documents.",
        },
        {
          id: 'code-decides',
          title: 'Where code, not the model, decides',
          table: {
            headers: ['Concern', 'How it is enforced'],
            rows: [
              [
                'Identity and permissions',
                "Workspace and customer ids come from server sessions. The tool gate refuses tools outside the allowlist, authority arguments such as customer_id, and other customers' tickets; each refusal is audited and shown to the reviewer.",
              ],
              [
                'Prompt injection',
                'Customer messages and retrieved passages are wrapped and escaped as untrusted data. That is defence in depth only: tests drive a fake model scripted to obey injected instructions and check that code still blocks approval, refunds, and cross-customer access.',
              ],
              [
                'Approval',
                'Bound to one exact proposal version plus a hash of its action. Editing creates a new version and invalidates earlier approvals.',
              ],
              [
                'Policy changes',
                'Each proposal records the document versions it retrieved and cited. Replacing or deleting one marks every pending proposal that used it stale in the same database transaction; stale proposals cannot be approved and must be reprocessed against current documents. Changing escalation rules does the same.',
              ],
              [
                'Weak or conflicting evidence',
                'If no passage reaches the relevance threshold, or two current documents declare different values for the same policy fact, a drafted resolve becomes an escalation, and a reviewer edit cannot turn it back.',
              ],
              [
                'Rules and citations',
                'Escalation rules are evaluated in code and override the draft. Citations survive only if the passage was retrieved for this request.',
              ],
              [
                'Execution',
                'An idempotency key backed by UNIQUE constraints means double clicks, concurrent approvals, lost responses, and retries all produce exactly one ticket. A failed model call ends in an error state and is never replaced with simulated output.',
              ],
            ],
          },
        },
        {
          id: 'evaluation',
          title: 'Evaluation',
          body: "A 50-case synthetic dataset covers normal and ambiguous requests, insufficient and conflicting evidence, outdated policy, prompt injection, cross-workspace and cross-customer attempts, API failures, and duplicate execution. The labels were written by the build agent and have not been human-reviewed, so some misses may be label disagreements rather than model errors. Run live twice with Claude Haiku 5.5 on 2026-10-23: correct next action on 72–74% of all 50 cases, classification 88–90%, every citation valid (it exists, was retrieved for that request, and is the current version), 0 safety-rule violations, 0 under-escalations, 5–6 over-escalations, and a median latency of about 11 seconds. A prompt-only baseline, the same model given only the customer's message, chose the right next action about 50% of the time with 92% classification. That is not a capability comparison: the baseline cannot see account facts or company policy by construction, so the gap measures the value of that context and the guards. Fifty cases and two runs are a smoke-level signal, not a benchmark, and the causes of the individual over-escalations have not been analysed yet.",
        },
        {
          id: 'testing',
          title: 'Testing',
          body: "127 backend tests run against a real PostgreSQL database, with 5 opt-in smoke tests that need real credentials deselected by default. A deterministic subset of 64, grouped into authorization, workspace and customer isolation, visitor sandboxes, approval versioning, stale evidence, the evidence guard, duplicate prevention, injection, and failures without fallback, passes 64/64. Live-provider failure and attack cases use a scripted fake Anthropic client, and the GitHub adapter tests use a fake HTTP transport; they prove what the server does with those responses, not how the real services behave. The live smoke test against the real Claude API passed 4/4 on 2026-10-23. 50 browser checks in headless Chromium cover the demo scenarios, approvals, stale proposals, isolation between visitor sandboxes, the dashboard, and horizontal overflow at 1440, 1024, and 390 px.",
        },
        {
          id: 'what-i-learned',
          title: 'What I learned',
          body: "The first live evaluation exposed a real bug. With prompt caching on, almost all input arrives as cache reads and writes, and those tokens were recorded but not counted toward the monthly token and dollar budgets, the per-request token cap, the dashboard cost estimate, or the eval totals; the first run reported 366 input tokens across 45 runs. Usage now counts uncached, cache-read, and cache-write input, with a regression test; the accuracy numbers from that run were unaffected. A retrieval probe that used raw customer wording as the search query found that the 0.72 evidence threshold, calibrated on focused queries, leaves 12 of 32 answerable cases below it. The guard fails safe, escalating rather than resolving, but it over-escalates and needs re-calibrating on live query logs before any pilot. And approval, authorization, and evidence checks live in ordinary code rather than the prompt because the model can be wrong or manipulated through a message or a document; the system prompt is defence in depth, and the safety properties are enforced the same way whichever model is configured.",
        },
        {
          id: 'status-limitations',
          title: 'Status & limitations',
          body: "ResolveOps is a local Docker Compose app, not deployed publicly, so there is no live demo link; the repository's quick start runs demo mode with no API keys. Live mode has been verified only with claude-haiku-5-5; other models are configurable but untested live. Approved tickets go to an internal ticket adapter. A GitHub Issues adapter exists (fixed host, allowlisted repository, hidden-marker idempotency), but it has been tested only against a fake HTTP transport and never run against real GitHub. Evaluation and citation-support labels are agent-written and not human-reviewed, and there is no LLM judge. Rate and concurrency limits assume a single API instance, and ticket execution runs synchronously inside the approve request, with no job queue. Conflict detection sees only policy facts that documents declare with markers, not contradictions in prose. Approved replies are recorded but never sent; there is no email or chat channel. Demo mode answers only the seeded scenario wordings, so it cannot show how a model handles new text. The README lists what a real pilot would still need, including a real identity provider, human-labelled evaluation on real de-identified tickets, a real ticketing integration, multi-instance operation, and PII handling.",
        },
      ],
    },
  },
]

export function getProjectBySlug(slug) {
  return projects.find((project) => project.slug === slug)
}
