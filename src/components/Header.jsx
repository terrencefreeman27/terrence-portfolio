import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header className="border-b border-slate-200">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link to="/" className="text-lg font-semibold tracking-tight text-ink">
          Terrence Freeman
        </Link>
        <nav className="flex items-center gap-6 text-sm font-medium text-muted">
          <Link to="/" className="hover:text-ink">
            Work
          </Link>
          <a href="#contact" className="hover:text-ink">
            Contact
          </a>
        </nav>
      </div>
    </header>
  )
}
