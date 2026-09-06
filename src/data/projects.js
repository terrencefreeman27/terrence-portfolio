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
//   caseStudy   — { sections: [{ id, title, body }] }, structured stub content
//                 for the case-study route. Partial/placeholder until each
//                 project's full write-up is done.
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
      repo: null,
    },
    heroImage: null,
    caseStudy: {
      sections: [
        {
          id: 'overview',
          title: 'Overview',
          body: 'What CloudMart is and why it exists: an infrastructure-first exam-prep vehicle for the AWS SAA-C03. Full write-up coming soon.',
        },
        {
          id: 'architecture',
          title: 'Architecture',
          body: 'Multi-AZ VPC architecture diagram, plus a breakdown of what is actually deployed versus plan-validated only. Diagram and detail coming soon.',
        },
        {
          id: 'highlights',
          title: 'Highlights',
          body: 'Multi-AZ networking, S3 + CloudFront static hosting, ALB + ASG design, private RDS, SSM-over-SSH access, least-privilege IAM, and 100% Terraform IaC. Details coming soon.',
        },
        {
          id: 'implementation-status',
          title: 'Implementation status',
          body: 'A table of what is deployed, what is plan-validated only, and what has been destroyed to control cost. Coming soon.',
        },
        {
          id: 'security',
          title: 'Security',
          body: 'Private S3 with Origin Access Control, HTTPS everywhere on the live path, security-group chaining, encryption at rest, Secrets Manager, and IAM Identity Center. Details coming soon.',
        },
        {
          id: 'availability-scalability',
          title: 'Availability & scalability',
          body: 'Two-AZ design, ALB/ASG failover behavior, and the RDS Multi-AZ option. Details coming soon.',
        },
        {
          id: 'cost-optimization',
          title: 'Cost optimization',
          body: 'No NAT gateway, a deploy-verify-destroy workflow, and a design that targets $0/month at idle. Details coming soon.',
        },
        {
          id: 'what-i-learned',
          title: 'What I learned',
          body: 'IAM least privilege in practice, a Terraform dependency-graph edge case, cost-aware design as a real constraint, state management realities, SSM-only access, and production-vs-portfolio tradeoffs named explicitly. Full reflection coming soon.',
        },
        {
          id: 'key-decisions',
          title: 'Key decisions',
          body: 'Links to architecture decision records (ADR 0001, 0004–0010) from the source repository. Links coming soon.',
        },
      ],
    },
  },
]

export function getProjectBySlug(slug) {
  return projects.find((project) => project.slug === slug)
}
