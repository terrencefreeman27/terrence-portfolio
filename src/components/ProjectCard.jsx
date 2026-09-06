import { Link } from 'react-router-dom'
import { STATUS_LABELS } from '../data/projects.js'

export default function ProjectCard({ project }) {
  return (
    <article className="flex flex-col overflow-hidden rounded-card border border-slate-200">
      {/* heroImage placeholder — no real asset yet */}
      <div className="flex h-40 items-center justify-center bg-surface text-3xl">
        🗂️
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-lg font-semibold text-ink">{project.name}</h3>
          <span className="whitespace-nowrap rounded-full bg-surface px-2.5 py-0.5 text-xs font-medium text-muted">
            {STATUS_LABELS[project.status] ?? project.status}
          </span>
        </div>
        <p className="mt-2 text-sm text-muted">{project.tagline}</p>
        <ul className="mt-4 flex flex-wrap gap-1.5">
          {project.stack.slice(0, 6).map((tech) => (
            <li
              key={tech}
              className="rounded-full border border-slate-200 px-2 py-0.5 font-mono text-xs text-muted"
            >
              {tech}
            </li>
          ))}
        </ul>
        <Link
          to={`/projects/${project.slug}`}
          className="mt-6 text-sm font-semibold text-brand hover:underline"
        >
          Read case study →
        </Link>
      </div>
    </article>
  )
}
