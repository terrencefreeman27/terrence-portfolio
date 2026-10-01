# Content Inventory

Source of truth for what content the portfolio site needs to hold, and how it's
structured. This is inventory, not final copy — most fields below are stubs to
be filled in later. Derived from `~/cloudmart-aws/README.md` and `docs/`.

## Scope for v1

Only one project is populated: **CloudMart**. The data structure must support
adding more projects later without any architectural change — new projects are
just new entries in the project data, not new code paths.

## Project data shape

Each project is an object with (at minimum):

- `slug` — url-safe id, e.g. `cloudmart`
- `name` — display name
- `tagline` — one-line summary (card + hero use)
- `summary` — 2-4 sentence description (card back / list view)
- `status` — e.g. `live-demo`, `in-progress`, `archived`
- `stack` — array of tech/service tags (e.g. `Terraform`, `AWS`, `React`)
- `links` — `{ demo, repo }` (either may be null)
- `heroImage` — placeholder for now (no asset yet)
- `caseStudy` — structured content for the case-study route (see below);
  optional/partial until a project's write-up is done

## Projects

### CloudMart (featured)

- **Tagline:** Production-style AWS architecture for a small e-commerce app, built with Terraform while preparing for the AWS SAA-C03 exam.
- **Status:** live demo (frontend only; backend intentionally undeployed for cost reasons)
- **Stack:** Terraform, AWS (VPC, EC2, ALB, ASG, RDS PostgreSQL, S3, CloudFront, IAM, Secrets Manager, Systems Manager, CloudWatch/SNS), React, Node.js/Express
- **Links:**
  - Demo: https://d3u41r8pyeqew9.cloudfront.net
  - Repo: (local — `~/cloudmart-aws`, not yet pushed/public; add GitHub URL when available)
- **Case study sections (content exists in source repo, not yet written for the site):**
  - Overview — what CloudMart is and why it exists (exam prep vehicle, infra-first)
  - Architecture — VPC/multi-AZ diagram, deployed vs. plan-validated components
  - Highlights — multi-AZ networking, S3+CloudFront static hosting, ALB+ASG design, private RDS, SSM over SSH, least-privilege IAM, 100% Terraform IaC
  - Implementation status — table of what's deployed vs. plan-validated vs. destroyed
  - Security — private S3+OAC, HTTPS everywhere live, SG chaining, encryption at rest, Secrets Manager, IAM Identity Center
  - Availability & scalability — 2-AZ design, ALB/ASG failover behavior, RDS Multi-AZ option
  - Cost optimization — no NAT gateway, deploy-verify-destroy pattern, $0/month-at-idle design
  - What I learned — IAM least privilege in practice, Terraform dependency-graph edge case, cost-aware design as constraint, state management realities, SSM-only access, production-vs-portfolio tradeoffs named explicitly
  - Key decisions — links to ADRs (0001, 0004-0010) in source repo

Full detail lives in `~/cloudmart-aws/README.md` and `~/cloudmart-aws/docs/*`.
The case-study route ships as a placeholder in v1; copy gets filled in later.

### AWS Architecture Design Assistant (added 2026-10-01)

- **Slug:** `aws-architecture-assistant`
- **Tagline:** An MVP workbench that turns plain-language business requirements into a reviewable AWS architecture plan and diagram — asking follow-up questions instead of guessing.
- **Status:** `in-progress` — MVP built 2026-10-01. Hosted demo (https://aws-architecture-assistant.vercel.app/) loads but plan generation is broken as of 2026-10-01 (`/api` returns 404); fix pending on the source repo's `fix/client-side-demo` branch. `links.demo` stays `null` until the live demo is verified working, then flip status to `live-demo`.
- **Stack:** React, Vite, TypeScript, Node.js/Express, Zod, Mermaid, Vitest, Playwright; grounded in AWS Well-Architected
- **Links:**
  - Demo: none yet (see status)
  - Repo: https://github.com/terrencefreeman27/aws-architecture-assistant
- **Case study sections (written, in `src/data/projects.js`):**
  - Overview — who it's for, what it does, MVP framing, never touches AWS accounts
  - How it works — completeness gating + follow-up questions, plan contents, deterministic demo planner with three sample scenarios, edit/regenerate
  - Keeping the output honest (table) — Zod-validated plans + app-generated Mermaid, 41-service catalog, 56-source official AWS doc registry, guardrails (no cost figures, no compliance determinations, never "production-ready")
  - Testing — 70 Vitest unit/API tests on `main` (89 on the pending fix branch; update when it merges) + Playwright browser e2e script
  - Status & limitations — narrow scope, no estimates/compliance/DR, optional Claude provider exists but is off by default and not exercised against the live API
- **Screenshots:** available in the source repo's `docs/screenshots/`, but the site has no project-image rendering yet (`heroImage` is unused), so none are copied in.

Facts verified against the source repo's `main` branch on 2026-10-01. Do not
describe the AI provider as live or the demo as working until each is verified.

## Homepage sections (v1 structure only, not fully designed)

1. **Hero** — name/role, one-line positioning, primary CTA (view work / contact)
2. **Featured projects** — grid/list rendered from project data; CloudMart is the only card for now
3. **About / skills summary** — short bio + skill/tech tags (placeholder copy)
4. **Contact / footer** — contact method(s) + links (GitHub, LinkedIn, etc.)

## Routes (v1)

- `/` — homepage (sections above)
- `/projects/:slug` — case-study route; `/projects/cloudmart` is the only real
  entry, rendered from placeholder content until the case study is written
- 404 — not-found fallback

## Explicitly out of scope for this pass

- Final visual design / polish of any section
- Real imagery/screenshots (use placeholders)
- Full case-study copy (structure only)
- About/contact real copy (placeholder only)
- Additional projects beyond CloudMart
