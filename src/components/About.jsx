const SKILLS = [
  'JavaScript',
  'React',
  'Node.js',
  'Terraform',
  'AWS',
  'PostgreSQL',
]

export default function About() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-16">
      <h2 className="text-2xl font-bold tracking-tight text-ink">About</h2>
      <p className="mt-4 max-w-2xl text-muted">
        Placeholder bio — a short paragraph about background, interests, and
        what kind of work is being sought will go here.
      </p>
      <ul className="mt-6 flex flex-wrap gap-2">
        {SKILLS.map((skill) => (
          <li
            key={skill}
            className="rounded-full border border-slate-200 px-3 py-1 font-mono text-xs text-muted"
          >
            {skill}
          </li>
        ))}
      </ul>
    </section>
  )
}
