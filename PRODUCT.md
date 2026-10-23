# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Two audiences, weighted roughly equally:

- **Full-time hiring managers/recruiters** evaluating Terrence for cloud/DevOps/infrastructure or full-stack software engineering roles. He is open to either lane, not narrowed to one.
- **Freelance/contract clients** — small businesses considering commissioning a site or application, in the same vein as the Belle Menti Montessori School engagement.

The site has to read as credible to both from the same pages, not as two separate sites bolted together.

## Product Purpose

A personal portfolio for Terrence Freeman that proves real, checkable work rather than asserting claims — serving two goals at once: landing a full-time cloud/DevOps or software engineering role, and attracting freelance/contract web-development clients.

## Positioning

"UCF Computer Science senior building cloud infrastructure, software, and AI-assisted business solutions." (Confirmed by Terrence 2026-09-08 as the hero positioning line.)

## Operating Context

- Terrence is a Computer Science senior at the University of Central Florida, graduating May 2027.
- Currently preparing for the AWS Certified Solutions Architect – Associate (SAA-C03) exam; CloudMart (the featured infra project) exists as a vehicle for that prep.
- Four pieces of real evidence exist today: CloudMart (self-directed AWS/Terraform case study), Belle Menti Montessori School (a real, live client engagement), the AWS Architecture Design Assistant (MVP with a hosted demo), and ResolveOps (local AI support-operations prototype). See Evidence on Hand.

## Capabilities and Constraints

- Confirmed skills to reflect: AWS architecture (VPC, EC2, ALB, ASG, RDS, S3, CloudFront, IAM, Secrets Manager, Systems Manager, CloudWatch/SNS), Terraform/IaC, React, Node.js/Express, PostgreSQL.
- AI/LLM tooling and automation is an active area of interest. ResolveOps (added 2026-10-23) is a real AI case study, but it is a local prototype evaluated on synthetic cases — not a deployed product with real users — so do not frame it as production or delivered-to-customers AI experience.
- Hard constraint from Terrence: do not invent additional experience, credentials, metrics, employers, testimonials, project results, social links, or personal details beyond what is recorded in this file. Any additional fact must be marked unresolved here and confirmed with Terrence before it's used anywhere on the site.

## Brand Commitments

- Name: Terrence Freeman.
- Real contact channels (replace the placeholder `mailto:hello@example.com` and empty `github.com/` / `linkedin.com/` links currently in `Footer.jsx`):
  - Email: terrencefreeman27@gmail.com
  - GitHub: https://github.com/terrencefreeman27
  - LinkedIn: https://www.linkedin.com/in/terrence-freeman-b4833523a/

## Evidence on Hand

- **CloudMart** — AWS/Terraform e-commerce infrastructure case study.
  - Live demo: https://d3u41r8pyeqew9.cloudfront.net
  - Repo: https://github.com/terrencefreeman27/cloudmart-aws
  - Backend intentionally left undeployed between reviews to control cost; frontend is live.
- **Belle Menti Montessori School** — real client site for a licensed Montessori school in Hollywood, FL. Hand-coded HTML/CSS/JS, 9 pages, Netlify-hosted contact form, JS lightbox gallery, on-page SEO, deployed on the client's own domain.
  - Live: https://bellementimontessorihollywood.com
  - Repo: https://github.com/terrencefreeman27/belle-mont-montessori
- **AWS Architecture Design Assistant** — MVP (built 2026-10-01) that turns business requirements into a reviewable AWS architecture plan and validated Mermaid diagram, using a deterministic demo planner. Added at Terrence's request 2026-10-01.
  - Repo: https://github.com/terrencefreeman27/aws-architecture-assistant
  - Hosted demo: https://aws-architecture-assistant.vercel.app/ — verified generating plans on 2026-10-01 (demo planner runs in the browser).
  - Shipped 2026-10-01 and verified live: share links (URL fragment) + autosave, Markdown report export, official AWS Architecture Icons in the diagram, plain-language questions with "Not sure" conservative defaults, plan summary bar, mobile layout. 180 tests; 96 browser checks pass against the live site.
  - Shipped 2026-10-21 and verified live: data-pipeline and scheduled-jobs patterns (5 total), drawn alternative diagrams with computed what-changes, 46-service catalog, 61 verified sources, 316 tests, GitHub Actions CI. Also a local MCP server and CLI (developer channels, not hosted, not on npm).
  - Its optional Claude provider has not been exercised against the live API — this is not evidence of shipped AI work.
- **ResolveOps** — AI support-operations agent prototype (FastAPI, PostgreSQL + pgvector, local fastembed embeddings, React/TypeScript/Tailwind, Docker Compose). The model proposes; code enforces identity, tool permissions, approval versioning, stale-policy invalidation, the evidence guard, and idempotent execution. Added at Terrence's request 2026-10-23; facts verified against the repo's `main` (`c31a505`).
  - Repo (public): https://github.com/terrencefreeman27/resolveops
  - No hosted demo: local Docker Compose app only (site status `runs-locally`).
  - Live mode verified against the real Claude API on 2026-10-23 with `claude-haiku-5-5` (smoke test 4/4). Live eval, 2 runs on 50 synthetic cases: next action 72–74%, classification 88–90%, citations 100% valid, 0 safety violations, 0 under-escalations, 5–6 over-escalations, median ~11 s. Prompt-only baseline ~50% / 92% (not a capability comparison). **Labels are agent-written and not human-reviewed** — always say so when citing these numbers.
  - 127 backend tests, 64/64 deterministic backend checks, 50 browser checks.
  - GitHub Issues adapter is **unverified against real GitHub** (fake transport only). Single-instance rate limiting.
- No other testimonials, metrics, employer history, or additional projects are confirmed. Do not fabricate any.

## Product Principles

1. Every claim on the site must be backed by real, checkable evidence (a live demo, a repo, a deployed client site) — never an invented achievement or metric.
2. Serve both audiences without splitting into two sites: full-time hiring evaluation and freelance client inquiry both need to read as credible from the same pages.
3. Present infrastructure/cloud work and applied software work as one coherent practice, not two disconnected interests — CloudMart and Belle Menti are the concrete proof points for each side.
4. Stay honest about current stage: a student still building out the case-study/evidence base, not someone overstating experience.

## Accessibility & Inclusion

No product-specific requirement established yet.
