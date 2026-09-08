import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section className="mx-auto flex max-w-3xl flex-col items-center px-6 py-24 text-center">
      <p className="font-mono text-sm font-semibold uppercase tracking-widest text-brand-light">
        404
      </p>
      <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-white">
        Page not found
      </h1>
      <p className="mt-2 text-slate-400">
        The page you&rsquo;re looking for doesn&rsquo;t exist.
      </p>
      <Link
        to="/"
        className="mt-6 rounded-sm text-sm font-semibold text-accent-light transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
      >
        ← Back home
      </Link>
    </section>
  )
}
