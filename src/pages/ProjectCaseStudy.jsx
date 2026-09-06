import { Link, useParams } from 'react-router-dom'
import { getProjectBySlug, STATUS_LABELS } from '../data/projects.js'
import NotFound from './NotFound.jsx'

export default function ProjectCaseStudy() {
  const { slug } = useParams()
  const project = getProjectBySlug(slug)

  if (!project) {
    return <NotFound />
  }

  return (
    <article className="mx-auto max-w-3xl px-6 py-16">
      <Link to="/" className="text-sm font-medium text-brand hover:underline">
        ← Back to work
      </Link>

      <header className="mt-6">
        <span className="rounded-full bg-surface px-2.5 py-0.5 text-xs font-medium text-muted">
          {STATUS_LABELS[project.status] ?? project.status}
        </span>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-ink">
          {project.name}
        </h1>
        <p className="mt-2 text-lg text-muted">{project.tagline}</p>

        <ul className="mt-4 flex flex-wrap gap-1.5">
          {project.stack.map((tech) => (
            <li
              key={tech}
              className="rounded-full border border-slate-200 px-2 py-0.5 font-mono text-xs text-muted"
            >
              {tech}
            </li>
          ))}
        </ul>

        <div className="mt-4 flex gap-4 text-sm font-semibold text-brand">
          {project.links?.demo && (
            <a href={project.links.demo} target="_blank" rel="noreferrer">
              Live demo →
            </a>
          )}
          {project.links?.repo && (
            <a href={project.links.repo} target="_blank" rel="noreferrer">
              Repo →
            </a>
          )}
        </div>
      </header>

      <p className="mt-8 text-ink">{project.summary}</p>

      <div className="mt-12 space-y-10">
        {project.caseStudy?.sections.map((section) => (
          <section key={section.id}>
            <h2 className="text-xl font-semibold text-ink">
              {section.title}
            </h2>
            <p className="mt-2 text-muted">{section.body}</p>
          </section>
        ))}
      </div>
    </article>
  )
}
