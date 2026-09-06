import { projects } from '../data/projects.js'
import ProjectCard from './ProjectCard.jsx'

export default function FeaturedProjects() {
  return (
    <section id="work" className="mx-auto max-w-5xl px-6 py-16">
      <h2 className="text-2xl font-bold tracking-tight text-ink">
        Featured projects
      </h2>
      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </section>
  )
}
