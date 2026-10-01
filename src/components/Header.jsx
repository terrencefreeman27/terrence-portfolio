import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { RESUME_URL } from '../data/resume.js'

const NAV_LINKS = [
  { href: '/#work', label: 'Work' },
  { href: '/#build', label: 'Build' },
  { href: '/#now', label: 'Now' },
  // The resume is a static PDF, not a route — opened in a new tab so a
  // reader skimming the site doesn't lose their place, and left to the
  // browser's own viewer rather than forced as a download.
  { href: RESUME_URL, label: 'Resume', external: true },
  { href: '#contact', label: 'Contact' },
]

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  // Close the mobile menu on any route/hash change triggered from within
  // it (nav links are plain anchors, so a fresh navigation unmounts and
  // remounts Header anyway, but this also covers same-page hash jumps).
  useEffect(() => {
    if (!menuOpen) return undefined
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [menuOpen])

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-ink/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 sm:px-8">
        <Link
          to="/"
          onClick={() => setMenuOpen(false)}
          className="group flex items-center gap-3 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
        >
          {/* Compact monogram mark, in the same coordinate-tag/bracket
              grammar as the `SYS.00` labels and status badges elsewhere —
              corner brackets rather than a full box, so it reads as a
              schematic reference tag rather than a generic logo chip. The
              full name stays visible as real text right next to it, so the
              mark itself is safe to hide from assistive tech. */}
          <span
            aria-hidden="true"
            className="relative flex h-8 w-8 shrink-0 items-center justify-center border border-white/20 font-mono text-[11px] font-semibold tracking-[0.05em] text-accent-light transition-colors group-hover:border-accent/60 group-hover:text-accent"
          >
            <span className="absolute -left-px -top-px h-2 w-2 border-l border-t border-accent/60" />
            <span className="absolute -bottom-px -right-px h-2 w-2 border-b border-r border-accent/60" />
            TF
          </span>
          <span className="whitespace-nowrap font-display text-base font-bold tracking-tight text-white transition-colors group-hover:text-accent-light sm:text-lg">
            Terrence Freeman
          </span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium text-slate-300 sm:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.external ? '_blank' : undefined}
              rel={link.external ? 'noreferrer' : undefined}
              className="rounded-sm transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Mobile menu toggle — same corner-bracket grammar as the
            monogram, kept a plain button (not a full nav bar squeeze) since
            below `sm` there isn't room for "Terrence Freeman" plus four
            links on one line without either wrapping or clipping. */}
        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          className="relative flex h-8 w-8 shrink-0 items-center justify-center border border-white/20 text-slate-200 transition-colors hover:border-accent/60 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-ink sm:hidden"
        >
          <span className="absolute -left-px -top-px h-2 w-2 border-l border-t border-accent/60" />
          <span className="absolute -bottom-px -right-px h-2 w-2 border-b border-r border-accent/60" />
          <span className="sr-only">{menuOpen ? 'Close menu' : 'Open menu'}</span>
          <span aria-hidden="true" className="flex flex-col gap-[3px]">
            <span
              className={`h-px w-4 bg-current transition-transform ${menuOpen ? 'translate-y-[3.5px] rotate-45' : ''}`}
            />
            <span
              className={`h-px w-4 bg-current transition-transform ${menuOpen ? '-translate-y-[3.5px] -rotate-45' : ''}`}
            />
          </span>
        </button>
      </div>

      {menuOpen && (
        <nav
          id="mobile-nav"
          className="border-t border-white/10 bg-ink/95 px-6 py-4 sm:hidden"
        >
          <ul className="flex flex-col gap-1 text-sm font-medium text-slate-300">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  target={link.external ? '_blank' : undefined}
                  rel={link.external ? 'noreferrer' : undefined}
                  onClick={() => setMenuOpen(false)}
                  className="block rounded-sm py-2 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  )
}
