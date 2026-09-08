import BackgroundGrid from './BackgroundGrid.jsx'

export default function Footer() {
  return (
    <footer
      id="contact"
      className="relative scroll-mt-20 overflow-hidden border-t border-white/5 bg-ink-deep"
    >
      <BackgroundGrid tint="none" />
      <div className="relative mx-auto max-w-6xl px-6 py-16 sm:px-8 sm:py-20">
        <div className="flex flex-col gap-10 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-brand-light">
              Contact
            </h2>
            <p className="mt-3 max-w-prose font-display text-lg text-white">
              Reach out by email or find me on the links below.
            </p>
          </div>
          <ul className="flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium text-slate-300">
            <li>
              <a
                href="mailto:terrencefreeman27@gmail.com"
                className="inline-flex items-center gap-2 rounded-sm transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-light focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
              >
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="h-4 w-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 6.75A2.25 2.25 0 0 1 5.25 4.5h13.5A2.25 2.25 0 0 1 21 6.75v10.5A2.25 2.25 0 0 1 18.75 19.5H5.25A2.25 2.25 0 0 1 3 17.25V6.75Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m3.75 7 8.25 6 8.25-6"
                  />
                </svg>
                Email
              </a>
            </li>
            <li>
              <a
                href="https://github.com/terrencefreeman27"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-sm transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-light focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
              >
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-4 w-4"
                >
                  <path d="M12 .5a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58v-2.03c-3.34.72-4.04-1.6-4.04-1.6-.55-1.38-1.33-1.75-1.33-1.75-1.09-.74.08-.73.08-.73 1.2.09 1.84 1.24 1.84 1.24 1.07 1.83 2.8 1.3 3.49 1 .11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.66.24 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.49 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58A12 12 0 0 0 12 .5Z" />
                </svg>
                GitHub
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/terrence-freeman-b4833523a/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-sm transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-light focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
              >
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-4 w-4"
                >
                  <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm7 0h3.84v1.64h.05c.53-1 1.84-2.05 3.79-2.05 4.05 0 4.8 2.67 4.8 6.14V21h-4v-5.6c0-1.34-.02-3.06-1.87-3.06-1.87 0-2.16 1.46-2.16 2.96V21h-4V9Z" />
                </svg>
                LinkedIn
              </a>
            </li>
          </ul>
        </div>
        <p className="mt-12 border-t border-white/10 pt-6 text-xs text-slate-400">
          &copy; {new Date().getFullYear()} Terrence Freeman.
        </p>
      </div>
    </footer>
  )
}
