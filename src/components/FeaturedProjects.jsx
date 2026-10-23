import { Link } from 'react-router-dom'
import { projects, STATUS_LABELS } from '../data/projects.js'
import BackgroundGrid from './BackgroundGrid.jsx'
import SectionHeading from './SectionHeading.jsx'
import SystemRail from './SystemRail.jsx'
import TechList from './TechList.jsx'

function FlagshipProject({ project }) {
  return (
    <article className="relative mt-16 lg:grid lg:grid-cols-12 lg:items-start lg:gap-6">
      <div className="lg:col-span-12 lg:max-w-2xl">
        <div className="flex flex-wrap items-center gap-4">
          <span className="border border-accent/30 px-2 py-0.5 font-mono text-[11px] uppercase tracking-widest text-accent-light">
            {STATUS_LABELS[project.status] ?? project.status}
          </span>
          <span className="font-mono text-xs uppercase tracking-widest text-slate-500">
            Case study
          </span>
        </div>

        <h3 className="mt-5 font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">
          {project.name}
        </h3>
        <p className="mt-3 text-base leading-relaxed text-slate-300 sm:text-lg">
          {project.tagline}
        </p>
        <p className="mt-4 text-sm leading-relaxed text-slate-400">
          {project.summary}
        </p>

        <div className="mt-7">
          <TechList items={project.stack} />
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
          {project.links?.demo && (
            <a
              href={project.links.demo}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 bg-brand px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
            >
              Live demo
              <span aria-hidden="true">→</span>
            </a>
          )}
          {project.links?.repo && (
            <a
              href={project.links.repo}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 border border-white/15 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:border-white/30 hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
            >
              Repo
              <span aria-hidden="true">→</span>
            </a>
          )}
          <Link
            to={`/projects/${project.slug}`}
            className="group inline-flex items-center gap-1.5 text-sm font-semibold text-accent-light transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
          >
            Read full case study
            <span
              aria-hidden="true"
              className="transition-transform group-hover:translate-x-1"
            >
              →
            </span>
          </Link>
        </div>
      </div>

    </article>
  )
}

export default function FeaturedProjects() {
  return (
    <section
      id="work"
      className="relative scroll-mt-20 overflow-hidden border-t border-white/5 bg-ink py-20 sm:py-28"
    >
      <BackgroundGrid />
      <SystemRail />
      <div className="relative mx-auto max-w-6xl px-6 sm:px-8 lg:pl-16">
        <SectionHeading
          index="01"
          eyebrow="Work"
          title="Featured projects"
        />

        {projects.map((project) => (
          <FlagshipProject key={project.slug} project={project} />
        ))}
      </div>
    </section>
  )
}
