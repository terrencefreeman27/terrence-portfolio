import { Link } from 'react-router-dom'
import { projects, STATUS_LABELS } from '../data/projects.js'
import ArchitectureDiagram from './ArchitectureDiagram.jsx'
import BackgroundGrid from './BackgroundGrid.jsx'
import SectionHeading from './SectionHeading.jsx'
import SystemRail from './SystemRail.jsx'
import TechList from './TechList.jsx'

function FlagshipProject({ project }) {
  const hasDiagram = Boolean(project.architectureDiagram)

  return (
    <article className="relative mt-16 lg:grid lg:grid-cols-12 lg:items-start lg:gap-6">
      <div className={hasDiagram ? 'lg:col-span-6' : 'lg:col-span-12 lg:max-w-2xl'}>
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

      {hasDiagram && (
        <div className="relative mt-14 lg:col-span-7 lg:col-start-6 lg:-mr-6 lg:mt-0">
          <div className="relative border-t border-white/10 pt-6 lg:border-t-0 lg:pt-0 lg:pl-8">
            {/* Mini rail sharing `SystemRail`'s hairline-plus-tick grammar, so
                the diagram reads as continuous with the page's coordinate
                system rather than a dropped-in illustration next to a column
                of text. */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-1 left-0 hidden w-8 lg:block"
            >
              <div className="absolute inset-y-2 left-3 w-px bg-white/10" />
              <span className="absolute left-3 top-0 block h-px w-2.5 -translate-y-1/2 bg-accent-light/70" />
              <span className="absolute bottom-0 left-3 block h-px w-2.5 translate-y-1/2 bg-white/25" />
            </div>

            <p className="font-mono text-[10px] uppercase tracking-widest text-slate-600">
              Fig.01 — AWS architecture
            </p>

            <div className="mt-3">
              <ArchitectureDiagram />
            </div>

            {/* Legend + facts woven directly under the diagram as a ruled
                instrument-panel strip, rather than a separate caption
                paragraph — the same solid/dashed distinction the SVG already
                draws internally, stated once more here as real text so it
                doesn't depend on the (aria-hidden) SVG to be understood. */}
            <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-white/10 pt-4">
              <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-slate-400">
                <span aria-hidden="true" className="h-px w-4 bg-accent" />
                Deployed
              </span>
              <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-slate-400">
                <span
                  aria-hidden="true"
                  className="h-0 w-4 border-t border-dashed border-slate-500"
                />
                Plan-validated only
              </span>
            </div>
            <p className="mt-2 max-w-md text-xs leading-relaxed text-slate-500">
              VPC across two Availability Zones · ALB + Auto Scaling Group ·
              private RDS PostgreSQL · S3 + CloudFront — dashed paths are
              fully designed and <span className="font-mono">terraform plan</span>
              -validated but intentionally not applied, to keep the project
              near $0/month.
            </p>
          </div>
        </div>
      )}
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
          description="Two projects, each treated as a real case study rather than a portfolio card — one where the infrastructure decisions matter more than the app in front of them, the other a real client site shipped end to end."
        />

        {projects.map((project) => (
          <FlagshipProject key={project.slug} project={project} />
        ))}
      </div>
    </section>
  )
}
