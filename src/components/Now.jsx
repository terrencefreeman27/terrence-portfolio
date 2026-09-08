import BackgroundGrid from './BackgroundGrid.jsx'
import SectionHeading from './SectionHeading.jsx'
import SystemRail from './SystemRail.jsx'

// Deliberately small and honest. Content here is limited to what's actually
// established elsewhere in this repo — the CloudMart build and its AWS
// SAA-C03 exam-prep framing, and building this site itself — rather than
// invented job status, certifications, or activity.
const CURRENT_ITEMS = [
  {
    label: 'Building',
    detail:
      "CloudMart's AWS architecture in Terraform, while working through the AWS Certified Solutions Architect – Associate (SAA-C03) exam.",
  },
  {
    label: 'Also building',
    detail:
      "This portfolio — the page you're on is itself a work in progress, redesigned in place rather than shipped once and left alone.",
  },
]

export default function Now() {
  return (
    <section
      id="now"
      className="relative scroll-mt-20 overflow-hidden border-t border-white/5 bg-ink-deep py-20 sm:py-28"
    >
      <BackgroundGrid />
      <SystemRail />
      <div className="relative mx-auto max-w-6xl px-6 sm:px-8 lg:pl-16">
        <SectionHeading
          index="03"
          eyebrow="Status"
          title="Now"
          description="A short, honest list — kept small on purpose until there's more to say."
        />

        {/* Live-status readout: the pulsing node plus a ruled line, echoing
            a terminal/console header rather than a plain caption. */}
        <div className="mt-10 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
          <span
            aria-hidden="true"
            className="h-1.5 w-1.5 shrink-0 animate-pulse-node bg-accent"
          />
          Live
          <span aria-hidden="true" className="ml-2 h-px flex-1 bg-white/10" />
        </div>

        <ul className="mt-8 grid gap-x-10 gap-y-10 sm:grid-cols-2">
          {CURRENT_ITEMS.map((item, index) => (
            <li key={item.label} className="border-t border-white/15 pt-5">
              <p className="font-mono text-[11px] uppercase tracking-widest text-slate-500">
                {String(index + 1).padStart(2, '0')} / {item.label}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-slate-300 sm:text-base">
                {item.detail}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
