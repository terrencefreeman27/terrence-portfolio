export default function Hero() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-20 text-center sm:text-left">
      <p className="text-sm font-medium uppercase tracking-wide text-brand">
        Software Engineer
      </p>
      <h1 className="mt-3 text-4xl font-bold tracking-tight text-ink sm:text-5xl">
        Terrence Freeman
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-muted">
        Placeholder positioning line — building infrastructure-minded,
        production-style software projects.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-4 sm:justify-start">
        <a
          href="#work"
          className="rounded-card bg-brand px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-dark"
        >
          View work
        </a>
        <a
          href="#contact"
          className="rounded-card border border-slate-300 px-5 py-2.5 text-sm font-semibold text-ink hover:border-slate-400"
        >
          Contact
        </a>
      </div>
    </section>
  )
}
