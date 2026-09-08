// Replaces the "chips in rounded pill boxes" tech-stack treatment with a
// plain monospace, slash-separated list — technical metadata as text,
// rather than UI chrome. Shared between the homepage flagship project and
// the case-study page so the pattern reads as one system, not two.
export default function TechList({ items, label = 'Stack' }) {
  return (
    <div>
      <p className="font-mono text-[11px] uppercase tracking-widest text-slate-600">
        {label}
      </p>
      <ul
        aria-label="Tech stack"
        className="mt-2 flex flex-wrap font-mono text-xs text-slate-400"
      >
        {items.map((item) => (
          <li
            key={item}
            className="after:mx-2 after:text-slate-700 after:content-['/'] last:after:content-none"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}
