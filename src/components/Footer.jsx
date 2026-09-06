export default function Footer() {
  return (
    <footer id="contact" className="border-t border-slate-200">
      <div className="mx-auto max-w-5xl px-6 py-10">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted">
          Contact
        </h2>
        <p className="mt-2 max-w-prose text-ink">
          Placeholder contact copy — reach out by email or find me on the
          links below.
        </p>
        <ul className="mt-4 flex flex-wrap gap-4 text-sm font-medium text-brand">
          <li>
            <a href="mailto:hello@example.com" className="hover:underline">
              Email
            </a>
          </li>
          <li>
            <a
              href="https://github.com/"
              target="_blank"
              rel="noreferrer"
              className="hover:underline"
            >
              GitHub
            </a>
          </li>
          <li>
            <a
              href="https://linkedin.com/"
              target="_blank"
              rel="noreferrer"
              className="hover:underline"
            >
              LinkedIn
            </a>
          </li>
        </ul>
        <p className="mt-8 text-xs text-muted">
          &copy; {new Date().getFullYear()} Terrence Freeman.
        </p>
      </div>
    </footer>
  )
}
