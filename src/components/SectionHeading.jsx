// Recurring structural element for major sections: an oversized display
// numeral paired with the small mono "eyebrow" micro-label already used
// across the site, plus the heading itself. Replaces plain eyebrow+h2 pairs
// with something that reads as an authored numbering system rather than a
// generic landing-page section header.
export default function SectionHeading({ index, eyebrow, title, description }) {
  return (
    <div className="flex items-start gap-5 sm:gap-8">
      <span
        aria-hidden="true"
        className="hidden select-none pt-1 font-display text-6xl font-extrabold leading-none text-white/10 sm:block sm:text-7xl lg:text-8xl"
      >
        {index}
      </span>
      <div>
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
          {eyebrow}
        </p>
        <h2 className="mt-3 max-w-2xl font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
          {title}
        </h2>
        {description && (
          <p className="mt-4 max-w-2xl text-base text-slate-400 sm:text-lg">
            {description}
          </p>
        )}
      </div>
    </div>
  )
}
