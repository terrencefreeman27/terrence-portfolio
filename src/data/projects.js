// Project data.
//
// Shape (see docs/CONTENT_INVENTORY.md):
//   slug        — url-safe id, used for /projects/:slug
//   name        — display name
//   tagline     — one-line summary (card + hero)
//   summary     — 2-4 sentence description (card back / list view)
//   status      — 'live-demo' | 'in-progress' | 'archived'
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
          body: "CloudMart's foundation is a single VPC (10.0.0.0/16) spanning two Availability Zones, with a public and a private subnet in each — built first, before there was anything to put in the second AZ, so the network layout never had to be redesigned as later phases added compute and data tiers. Only the Application Load Balancer, once deployed, sits in the public subnets; the backend and database are designed to live in the private subnets with no direct route to the internet, and there is no NAT Gateway anywhere in the project's Terraform. Two tiers are actually deployed today: the VPC itself (13 resources — subnets, an Internet Gateway, and per-AZ route tables, all free resource types) and the frontend, a private S3 bucket read only by CloudFront via Origin Access Control. Everything else — the Application Load Balancer and Auto Scaling Group in front of the backend, the RDS PostgreSQL database, and most of the CloudWatch/SNS monitoring — is fully designed in Terraform and verified with terraform plan, but deliberately not applied, to keep the project at or near $0/month. An earlier single EC2 instance was deployed, validated over an SSM tunnel, and destroyed the same day; it was later superseded by the ALB/Auto Scaling Group design. See Implementation status below for the full deployed-versus-plan-validated breakdown, and Key decisions for the reasoning behind each undeployed tier.",
        },
        {
          id: 'highlights',
          title: 'Highlights',
          body: "Multi-AZ networking from the start — one VPC spanning two Availability Zones with public and private subnets in each, before there was a second tier to put in either one. Public/private subnet separation, with only the ALB (once deployed) in public subnets and the backend and database designed for private subnets with no direct internet route. S3 + CloudFront for the frontend: the React build lives in a fully private S3 bucket, with CloudFront as the only reader via Origin Access Control. An ALB + Auto Scaling Group design spanning both AZs, with ELB-based health checks so a failed instance is detected and replaced automatically, no manual intervention. A private RDS tier — PostgreSQL with no public accessibility, reachable only from the backend's security group, encrypted at rest, with a master password AWS generates and manages via Secrets Manager. SSM instead of SSH: no key pairs and no open port 22 anywhere in the project; administrative access is IAM-gated through AWS Systems Manager Session Manager. Least-privilege IAM throughout, including a narrowly-scoped policy added for the operator's own SSO permission set rather than widening it when an early apply was blocked. 100% Terraform IaC — every resource, deployed or not, is defined in code, with no manual console changes to anything long-lived. Cost-aware deployment decisions: every resource with a real ongoing charge was either time-boxed and destroyed after validation, or fully designed and plan-verified but left undeployed pending explicit approval.",
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
          body: "The frontend's S3 bucket has all four S3 Block Public Access settings enabled; the only reader is CloudFront, via Origin Access Control scoped to this exact distribution's ARN, not any CloudFront distribution. HTTPS is enforced everywhere it's live — CloudFront redirects every viewer connection to HTTPS today, and the ALB design does the same for the API once deployed. There is no SSH and no open port 22 anywhere in the project; administrative access is IAM-gated through AWS Systems Manager Session Manager instead. Security groups chain by reference rather than CIDR block — ALB to backend to database, each hop trusting the previous security group directly, so the rule stays correct automatically as instances are replaced. The RDS design sets publicly_accessible to false, is reachable only from the backend's security group, and its own security group has zero egress rules, since it never needs to initiate outbound connections. Data is encrypted at rest: S3 with SSE-S3, and the RDS design with storage_encrypted set at creation, an option that can't be retrofitted later. The RDS master password is generated and owned entirely by AWS through Secrets Manager (manage_master_user_password = true) — it never appears in Terraform code, state, or the repository. All administrative access, including Terraform itself, uses IAM Identity Center SSO for short-lived, auto-expiring credentials rather than a long-lived access key.",
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
]

export function getProjectBySlug(slug) {
  return projects.find((project) => project.slug === slug)
}
