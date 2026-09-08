import { Link, useParams } from 'react-router-dom'
import { getProjectBySlug, STATUS_LABELS } from '../data/projects.js'
import TechList from '../components/TechList.jsx'
import NotFound from './NotFound.jsx'

export default function ProjectCaseStudy() {
  const { slug } = useParams()
  const project = getProjectBySlug(slug)

  if (!project) {
    return <NotFound />
  }

  return (
    <article className="mx-auto max-w-3xl px-6 py-16 sm:py-20">
      <Link
        to="/"
        className="rounded-sm text-sm font-medium text-accent-light transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
      >
        ← Back to work
      </Link>

      <header className="mt-6">
        <span className="border border-accent/30 px-2 py-0.5 font-mono text-[11px] uppercase tracking-widest text-accent-light">
          {STATUS_LABELS[project.status] ?? project.status}
        </span>
        <h1 className="mt-4 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
          {project.name}
        </h1>
        <p className="mt-2 text-lg text-slate-300">{project.tagline}</p>

        <div className="mt-6">
          <TechList items={project.stack} />
        </div>

        <div className="mt-6 flex gap-6 text-sm font-semibold text-accent-light">
          {project.links?.demo && (
            <a
              href={project.links.demo}
              target="_blank"
              rel="noreferrer"
              className="rounded-sm transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
            >
              Live demo →
            </a>
          )}
          {project.links?.repo && (
            <a
              href={project.links.repo}
              target="_blank"
              rel="noreferrer"
              className="rounded-sm transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
            >
              Repo →
            </a>
          )}
        </div>
      </header>

      <p className="mt-10 border-t border-white/10 pt-8 text-white">
        {project.summary}
      </p>

      <div className="mt-12 space-y-10">
        {project.caseStudy?.sections.map((section) => (
          <section key={section.id} className="border-t border-white/10 pt-8">
            <h2 className="font-display text-xl font-bold text-white">
              {section.title}
            </h2>
            {section.table ? (
              <div className="mt-4 overflow-x-auto">
                <table className="w-full min-w-[640px] border-collapse text-left text-sm">
                  <thead>
                    <tr className="border-b border-white/15">
                      {section.table.headers.map((header) => (
                        <th
                          key={header}
                          className="py-2 pr-4 font-mono text-xs uppercase tracking-wide text-slate-400"
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {section.table.rows.map((row, rowIndex) => (
                      <tr key={rowIndex} className="border-b border-white/5">
                        {row.map((cell, cellIndex) => (
                          <td
                            key={cellIndex}
                            className="py-2 pr-4 align-top text-slate-400"
                          >
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="mt-3 leading-relaxed text-slate-400">
                {section.body}
              </p>
            )}
          </section>
        ))}
      </div>
    </article>
  )
}
