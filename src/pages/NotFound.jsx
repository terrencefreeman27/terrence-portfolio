import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section className="mx-auto flex max-w-3xl flex-col items-center px-6 py-24 text-center">
      <p className="text-sm font-semibold uppercase tracking-wide text-brand">
        404
      </p>
      <h1 className="mt-3 text-3xl font-bold tracking-tight text-ink">
        Page not found
      </h1>
      <p className="mt-2 text-muted">
        The page you&rsquo;re looking for doesn&rsquo;t exist.
      </p>
      <Link
        to="/"
        className="mt-6 text-sm font-semibold text-brand hover:underline"
      >
        ← Back home
      </Link>
    </section>
  )
}
