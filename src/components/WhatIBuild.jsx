import BackgroundGrid from './BackgroundGrid.jsx'
import SectionHeading from './SectionHeading.jsx'
import SystemRail from './SystemRail.jsx'

// Short, honest descriptions of the kind of work each category represents —
// not accomplishments, employers, or metrics. Cloud Infrastructure and
// Software Engineering are grounded in the CloudMart project and the skill
// list in About.jsx; AI & Automation is framed as an area of interest rather
// than a claimed track record, since nothing in this repo establishes
// shipped AI work.
const CATEGORIES = [
  {
    title: 'Cloud Infrastructure',
    description:
      'Designing and provisioning cloud environments as code — networking, compute, and data tiers built with security, cost, and real operational behavior in mind, not just "it works." CloudMart, below, is the current example of this in practice.',
    layout: 'md:col-span-7',
  },
  {
    title: 'AI & Automation',
    description:
      'An active area of interest alongside the infrastructure work: scripting away manual operations, leaning on auto-scaling and self-healing designs instead of babysitting servers, and exploring how AI/LLM tooling fits into a modern development workflow.',
    layout: 'md:col-span-5 md:col-start-8',
  },
  {
    title: 'Software Engineering',
    description:
      'End-to-end application development — React on the frontend, Node.js/Express on the backend, PostgreSQL underneath — built with the same attention to structure and maintainability as the infrastructure it sits on.',
    layout: 'md:col-span-6 md:col-start-2 md:mt-12',
  },
]

export default function WhatIBuild() {
  return (
    <section
      id="build"
      className="relative scroll-mt-20 overflow-hidden border-t border-white/5 bg-ink-raised py-20 sm:py-28"
    >
      <BackgroundGrid />
      <SystemRail />
      <div className="relative mx-auto max-w-6xl px-6 sm:px-8 lg:pl-16">
        <SectionHeading
          index="02"
          eyebrow="What I build"
          title="Three areas, one way of working"
        />

        <div className="mt-14 grid gap-x-8 gap-y-14 md:grid-cols-12">
          {CATEGORIES.map((category, index) => (
            <article
              key={category.title}
              className={`animate-fade-up border-t border-white/15 pt-6 ${category.layout}`}
              style={{ animationDelay: `${index * 120}ms` }}
            >
              <p className="font-mono text-xs text-slate-600">
                {String(index + 1).padStart(2, '0')}
              </p>
              <h3 className="mt-3 font-display text-xl font-bold text-white">
                {category.title}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-slate-400">
                {category.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
