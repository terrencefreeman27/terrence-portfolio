import BackgroundGrid from './BackgroundGrid.jsx'
import SectionHeading from './SectionHeading.jsx'

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
          <p className="max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
            I'm a Computer Science senior at the University of Central
            Florida, graduating in May 2027. I build practical cloud,
            software, and AI-assisted systems, with experience spanning
            AWS architecture, Terraform, full-stack development, and
            production websites.
          </p>

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
