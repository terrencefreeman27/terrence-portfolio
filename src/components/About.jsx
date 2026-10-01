import BackgroundGrid from './BackgroundGrid.jsx'
import SectionHeading from './SectionHeading.jsx'
import { RESUME_UPDATED, RESUME_URL } from '../data/resume.js'

// Same six skills as before, just grouped instead of a single flat row.
const SKILL_GROUPS = [
  { label: 'Languages & Frameworks', skills: ['JavaScript', 'React', 'Node.js'] },
  { label: 'Infrastructure & Cloud', skills: ['Terraform', 'AWS'] },
  { label: 'Data', skills: ['PostgreSQL'] },
]

export default function About() {
  return (
    <section
      id="about"
      className="relative scroll-mt-20 overflow-hidden border-t border-white/5 bg-ink-raised py-20 sm:py-28"
    >
      <BackgroundGrid />
      <div className="relative mx-auto max-w-6xl px-6 sm:px-8">
        <SectionHeading index="04" eyebrow="About" title="Background" />

        <div className="mt-12 grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
          <div className="max-w-2xl">
            <p className="text-base leading-relaxed text-slate-300 sm:text-lg">
              I'm a Computer Science senior at the University of Central
              Florida, graduating in May 2027. I build practical cloud,
              software, and AI-assisted systems, with experience spanning
              AWS architecture, Terraform, full-stack development, and
              production websites.
            </p>

            {/* The full résumé belongs with the background copy rather than
                the hero — someone who has read this far is the one who
                wants it. Outlined (not solid) so it stays secondary to the
                hero's "View work" call to action. */}
            <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2">
              <a
                href={RESUME_URL}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-2.5 border border-slate-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:border-accent/60 hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-light focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
              >
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="h-4 w-4 text-slate-400 transition-colors group-hover:text-accent-light"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.25 3v4.5a.75.75 0 0 0 .75.75h4.5M14.25 3H6.75A1.75 1.75 0 0 0 5 4.75v14.5A1.75 1.75 0 0 0 6.75 21h10.5A1.75 1.75 0 0 0 19 19.25V8.25L14.25 3Z"
                  />
                  <path strokeLinecap="round" d="M8.5 12.5h7M8.5 16h4.5" />
                </svg>
                View resume
                <span className="font-mono text-[11px] font-normal uppercase tracking-widest text-slate-500 transition-colors group-hover:text-slate-400">
                  PDF
                </span>
              </a>
              <p className="font-mono text-xs uppercase tracking-widest text-slate-600">
                Updated {RESUME_UPDATED}
              </p>
            </div>
          </div>

          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-slate-600">
              Skills
            </p>
            <div className="mt-4 space-y-5 border-t border-white/10 pt-5">
              {SKILL_GROUPS.map((group) => (
                <div key={group.label}>
                  <p className="font-mono text-xs uppercase tracking-wide text-slate-500">
                    {group.label}
                  </p>
                  <ul className="mt-1.5 flex flex-wrap font-mono text-sm text-slate-300">
                    {group.skills.map((skill) => (
                      <li
                        key={skill}
                        className="after:mx-2 after:text-slate-700 after:content-['/'] last:after:content-none"
                      >
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
