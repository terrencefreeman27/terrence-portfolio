// Shared decorative background treatment: a faint technical grid, and
// nothing else — no soft radial glows or blurred blobs. Visual interest
// comes from linework, typography, and composition (see `SystemRail`)
// rather than glow/gradient, per the site's overall drafting-table register.
//
// Purely decorative: every section that uses this also carries its real
// content in normal text, so it's safe to hide from assistive tech entirely.
export default function BackgroundGrid({ grid = true, className = '' }) {
  if (!grid) return null

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      <div className="absolute inset-0 opacity-[0.05] [background-image:linear-gradient(to_right,rgba(148,163,184,0.6)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.6)_1px,transparent_1px)] [background-size:64px_64px]" />
    </div>
  )
}
