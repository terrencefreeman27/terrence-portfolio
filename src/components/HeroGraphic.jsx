// Engineering-schematic treatment of the hero's right-hand panel: a single
// vertical spine with coordinate tick marks (the same grammar as
// `SystemRail`), straight horizontal traces running off it at staggered
// depths and heights, and four labeled, square-cornered nodes — Cloud,
// Terraform, Automation, Software. Deliberately asymmetric (no shared
// center, no mirrored spoke lengths) and built from straight lines only —
// the opposite of a symmetric glowing hub-and-spoke network graphic.
//
// Decorative only — the same four category names are also rendered as real
// text in Hero.jsx, so this whole graphic is safe to hide from assistive
// tech. Motion is limited to a one-time line-draw reveal on mount.
const SPINE_X = 54
const SPINE_TOP = 24
const SPINE_BOTTOM = 372

const NODES = [
  { key: 'cloud', label: 'Cloud', y: 76, traceEnd: 150, w: 96, h: 30, tone: '#818cf8', delay: '0ms' },
  { key: 'terraform', label: 'Terraform', y: 158, traceEnd: 216, w: 104, h: 30, tone: '#38bdf8', delay: '120ms' },
  { key: 'automation', label: 'Automation', y: 240, traceEnd: 128, w: 112, h: 30, tone: '#38bdf8', delay: '240ms' },
  { key: 'software', label: 'Software', y: 322, traceEnd: 188, w: 96, h: 30, tone: '#818cf8', delay: '360ms' },
]

function CategoryIcon({ type }) {
  switch (type) {
    case 'cloud':
      return (
        <path
          d="M-7 3a4 4 0 0 1 1-7.9A5 5 0 0 1 3.5-8a5 5 0 0 1 4.9 4.1A3.5 3.5 0 0 1 8 3Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
      )
    case 'terraform':
      return (
        <g fill="none" stroke="currentColor" strokeWidth="1.4">
          <path d="M-6 -6 0 -3 0 3 -6 0Z" />
          <path d="M6 -6 0 -3 M0 3 6 6" />
          <path d="M0 3 6 6 6 0" />
        </g>
      )
    case 'automation':
      return (
        <path
          d="M-6 0a6 6 0 0 1 10.4-4M6 0a6 6 0 0 1-10.4 4M4.4-6.4 4.4-4 2-4M-4.4 6.4-4.4 4-2 4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )
    case 'software':
      return (
        <path
          d="M-3-6-7 0-3 6M3-6 7 0 3 6"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )
    default:
      return null
  }
}

const SPINE_TICKS = [24, 105, 187, 268, 349]

export default function HeroGraphic() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 400 400"
      className="h-full w-full"
      fill="none"
    >
      {/* spine */}
      <line
        x1={SPINE_X}
        y1={SPINE_TOP}
        x2={SPINE_X}
        y2={SPINE_BOTTOM}
        stroke="#334155"
        strokeWidth="1"
      />
      {SPINE_TICKS.map((y) => (
        <line
          key={y}
          x1={SPINE_X - 5}
          y1={y}
          x2={SPINE_X + 5}
          y2={y}
          stroke="#475569"
          strokeWidth="1"
        />
      ))}
      {/* origin marker */}
      <line x1={SPINE_X - 8} y1={SPINE_TOP} x2={SPINE_X + 8} y2={SPINE_TOP} stroke="#7dd3fc" strokeWidth="1.5" />
      <text
        x={SPINE_X + 12}
        y={SPINE_TOP + 3}
        className="fill-slate-500 font-mono text-[8px] uppercase tracking-widest"
      >
        sys.00
      </text>
      <text
        x={SPINE_X - 12}
        y={SPINE_BOTTOM + 4}
        textAnchor="end"
        className="fill-slate-600 font-mono text-[8px] uppercase tracking-widest"
      >
        sys.01
      </text>

      {/* traces + nodes */}
      {NODES.map((node) => (
        <g key={node.key}>
          <path
            d={`M${SPINE_X} ${node.y} H${node.traceEnd}`}
            pathLength="1"
            stroke={node.tone}
            strokeOpacity="0.6"
            strokeWidth="1.5"
            strokeDasharray="1"
            className="animate-draw-line"
            style={{ animationDelay: node.delay }}
          />
          <circle cx={SPINE_X} cy={node.y} r="2" fill={node.tone} />

          <rect
            x={node.traceEnd}
            y={node.y - node.h / 2}
            width={node.w}
            height={node.h}
            fill="#141c33"
            stroke={node.tone}
            strokeOpacity="0.6"
            strokeWidth="1.25"
          />
          <g
            transform={`translate(${node.traceEnd + 17} ${node.y})`}
            className="text-accent-light"
          >
            <CategoryIcon type={node.key} />
          </g>
          <text
            x={node.traceEnd + 32}
            y={node.y + 1}
            className="fill-slate-300 font-mono text-[10px] uppercase tracking-widest"
          >
            {node.label}
          </text>
        </g>
      ))}
    </svg>
  )
}
