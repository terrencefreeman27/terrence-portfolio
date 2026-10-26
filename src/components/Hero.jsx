import BackgroundGrid from './BackgroundGrid.jsx'
import SystemRail from './SystemRail.jsx'

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-ink-deep">
      <BackgroundGrid />
      <SystemRail />

      <div className="relative mx-auto grid max-w-6xl gap-12 px-6 py-24 sm:px-8 sm:py-32 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-8 lg:py-40 lg:pl-16">
        <div className="text-center sm:text-left">
          <p className="animate-fade-up font-mono text-xs uppercase tracking-[0.2em] text-brand-light">
            Software Engineer
          </p>
          <h1 className="mt-4 animate-fade-up font-display text-4xl font-bold tracking-tight text-white [animation-delay:100ms] sm:text-5xl lg:text-6xl">
            Terrence Freeman
          </h1>
          <p className="mt-5 max-w-2xl animate-fade-up text-lg text-slate-300 [animation-delay:200ms] sm:text-xl">
            UCF Computer Science senior building cloud infrastructure,
            software, and AI-assisted business solutions.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4 animate-fade-up [animation-delay:300ms] sm:justify-start">
            <a
              href="#work"
              className="bg-brand px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-light focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
            >
              View work
            </a>
            <a
              href="#contact"
              className="border border-slate-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-slate-400 hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-light focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
            >
              Contact
            </a>
          </div>
        </div>

        <div className="animate-fade-up [animation-delay:400ms]">
          {/* Portrait in place of the abstract graphic, framed with the
              site's hairline border and corner ticks. Above the fold, so it
              loads eagerly with high priority. */}
          <figure className="relative mx-auto w-full max-w-[18rem] sm:max-w-sm">
            <img
              src="/terrence-freeman.jpg"
              alt="Portrait of Terrence Freeman"
              width="900"
              height="1200"
              fetchPriority="high"
              decoding="async"
              className="aspect-[3/4] w-full border border-white/10 object-cover"
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -left-2 -top-2 h-4 w-4 border-l border-t border-accent-light/70"
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-2 -right-2 h-4 w-4 border-b border-r border-white/25"
            />
          </figure>
          <p className="mx-auto mt-6 max-w-sm text-center font-mono text-xs uppercase tracking-widest text-slate-500 sm:text-left">
            Cloud
            <span className="mx-2 text-slate-700">/</span>
            Terraform
            <span className="mx-2 text-slate-700">/</span>
            Automation
            <span className="mx-2 text-slate-700">/</span>
            Software
          </p>
        </div>
      </div>
    </section>
  )
}
