// Abstract representation of CloudMart's AWS architecture, in the same
// visual language as the hero graphic (square-cornered nodes, thin
// connecting lines, navy/indigo/cyan palette). Every element below maps
// directly to
// something already described in `src/data/projects.js`'s CloudMart
// `caseStudy` content:
//   - one VPC (10.0.0.0/16) spanning two Availability Zones, each with a
//     public and a private subnet (see the "Architecture" section)
//   - a single logical ALB spanning both AZs' public subnets, in front of an
//     Auto Scaling Group in the private subnets (see "Architecture" /
//     "Highlights")
//   - a private, single-AZ-by-default RDS PostgreSQL instance, reachable
//     only via security-group chaining (ALB → backend → DB) (see
//     "Architecture" / "Security")
//   - S3 + CloudFront serving the frontend, the only tier actually deployed
//     alongside the VPC itself (see "Implementation status")
//
// Solid, glowing lines mark what's actually deployed today; dashed lines
// mark what's fully designed and `terraform plan`-verified but intentionally
// left undeployed — mirroring the Implementation status table. Decorative
// only: the same facts are stated in the surrounding case-study copy, and a
// text legend below repeats the deployed/plan-validated distinction.
function Node({ x, y, w = 84, h = 30, label, sub, tone = 'muted' }) {
  const stroke =
    tone === 'live' ? '#38bdf8' : tone === 'brand' ? '#818cf8' : '#334155'
  const fill = tone === 'live' ? '#38bdf822' : '#141c33'
  return (
    <g>
      <rect
        x={x - w / 2}
        y={y - h / 2}
        width={w}
        height={h}
        fill={fill}
        stroke={stroke}
        strokeWidth="1.25"
      />
      <text
        x={x}
        y={sub ? y - 2 : y + 3}
        textAnchor="middle"
        className="fill-slate-200 font-mono text-[9px] font-medium uppercase tracking-wide"
      >
        {label}
      </text>
      {sub && (
        <text
          x={x}
          y={y + 10}
          textAnchor="middle"
          className="fill-slate-400 font-mono text-[7px] uppercase tracking-wide"
        >
          {sub}
        </text>
      )}
    </g>
  )
}

export default function ArchitectureDiagram() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 640 400"
      className="h-full w-full"
      fill="none"
    >
      {/* internet / users */}
      <Node x={430} y={34} w={90} h={28} label="Users" tone="muted" />

      {/* live frontend tier — deployed */}
      <Node x={210} y={104} label="CloudFront" tone="live" />
      <Node x={210} y={176} label="S3 (private)" sub="OAC" tone="live" />

      <path
        pathLength="1"
        d="M395 40 C 320 60, 260 70, 218 92"
        stroke="#38bdf8"
        strokeWidth="1.5"
        strokeDasharray="1"
        className="animate-draw-line"
      />
      <path
        pathLength="1"
        d="M210 119 L210 160"
        stroke="#38bdf8"
        strokeWidth="1.5"
        strokeDasharray="1"
        className="animate-draw-line"
        style={{ animationDelay: '150ms' }}
      />

      {/* future API path — plan-validated only */}
      <path
        d="M440 48 C 420 120, 400 190, 372 234"
        stroke="#64748b"
        strokeWidth="1"
        strokeDasharray="3 5"
      />

      {/* VPC boundary */}
      <rect
        x={40}
        y={210}
        width={560}
        height={172}
        fill="none"
        stroke="#334155"
        strokeWidth="1.25"
        strokeDasharray="4 5"
      />
      <text
        x={58}
        y={230}
        className="fill-slate-400 font-mono text-[9px] uppercase tracking-widest"
      >
        VPC · 10.0.0.0/16
      </text>

      {/* AZ-a */}
      <rect
        x={68}
        y={240}
        width={232}
        height={128}
        fill="#ffffff05"
        stroke="#1e293b"
      />
      <text x={80} y={254} className="fill-slate-500 font-mono text-[8px] uppercase tracking-wide">
        AZ-a
      </text>
      <Node x={184} y={278} w={100} h={26} label="ALB" sub="public subnet" tone="brand" />
      <Node x={130} y={334} w={80} h={30} label="ASG (EC2)" sub="private subnet" tone="muted" />
      <Node x={232} y={334} w={90} h={30} label="RDS Postgres" sub="single-AZ" tone="muted" />

      {/* AZ-b */}
      <rect
        x={340}
        y={240}
        width={232}
        height={128}
        fill="#ffffff05"
        stroke="#1e293b"
      />
      <text x={352} y={254} className="fill-slate-500 font-mono text-[8px] uppercase tracking-wide">
        AZ-b
      </text>
      <Node x={456} y={278} w={100} h={26} label="ALB" sub="public subnet" tone="brand" />
      <Node x={456} y={334} w={80} h={30} label="ASG (EC2)" sub="private subnet" tone="muted" />

      {/* ALB spans both AZs as one logical load balancer */}
      <path
        pathLength="1"
        d="M234 278 L406 278"
        stroke="#818cf8"
        strokeWidth="1.5"
        strokeDasharray="1"
        className="animate-draw-line"
        style={{ animationDelay: '300ms' }}
      />
      <text
        x={320}
        y={268}
        textAnchor="middle"
        className="fill-slate-500 font-mono text-[7px] uppercase tracking-wide"
      >
        multi-AZ
      </text>

      {/* ALB → ASG, ASG → RDS — plan-validated, SG-chained */}
      <path d="M184 291 L150 319" stroke="#475569" strokeWidth="1" strokeDasharray="3 4" />
      <path d="M456 291 L456 319" stroke="#475569" strokeWidth="1" strokeDasharray="3 4" />
      <path d="M170 334 L187 334" stroke="#475569" strokeWidth="1" strokeDasharray="3 4" />

      {/* legend */}
      <g transform="translate(340, 356)">
        <line x1="0" y1="0" x2="16" y2="0" stroke="#38bdf8" strokeWidth="1.5" />
        <text x="20" y="3" className="fill-slate-400 font-mono text-[7px] uppercase tracking-wide">
          Deployed
        </text>
        <line x1="90" y1="0" x2="106" y2="0" stroke="#64748b" strokeWidth="1" strokeDasharray="3 4" />
        <text x="110" y="3" className="fill-slate-400 font-mono text-[7px] uppercase tracking-wide">
          Plan-validated
        </text>
      </g>
    </svg>
  )
}
