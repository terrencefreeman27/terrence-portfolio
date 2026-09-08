// The site's one recurring signature motif: a vertical "systems rail" —
// a hairline with perpendicular tick marks and mono coordinate labels,
// borrowed from technical/architectural drawings rather than UI chrome.
// It appears literally (this component) along the edge of a handful of
// major sections, and its grammar — straight lines, ticks, coordinate
// labels — is what `HeroGraphic` and `ArchitectureDiagram` echo internally,
// so the whole site reads as one system rather than several unrelated
// decorative ideas.
//
// Purely decorative: every section that renders this also carries its own
// real heading/copy, so it's safe to hide from assistive tech entirely.
// Hidden below `lg` — asymmetric edge furniture like this doesn't have a
// sensible single-column mobile equivalent, so it simply isn't shown there.
const DEFAULT_TICKS = [
  { top: '0%', label: '0.00' },
  { top: '22%' },
  { top: '48%' },
  { top: '74%' },
  { top: '100%', label: '1.00' },
]

export default function SystemRail({ ticks = DEFAULT_TICKS, className = '' }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-y-0 left-0 hidden w-10 lg:block ${className}`}
    >
      <div className="absolute inset-y-4 left-4 w-px bg-white/10" />
      {ticks.map((tick, i) => (
        <div
          key={i}
          className="absolute left-4 flex -translate-y-1/2 items-center"
          style={{ top: tick.top }}
        >
          <span className="block h-px w-2.5 bg-white/25" />
          {tick.label && (
            <span className="ml-2 whitespace-nowrap font-mono text-[10px] tracking-widest text-slate-600">
              {tick.label}
            </span>
          )}
        </div>
      ))}
    </div>
  )
}
