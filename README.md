# Terrence Portfolio

Personal portfolio site. React + Vite + Tailwind CSS, routed with
`react-router-dom`. See `docs/CONTENT_INVENTORY.md` for the content/data
spec this project is built against.

## Development

```sh
npm install
npm run dev
```

## Build

```sh
npm run build
```

## Project structure

- `src/data/projects.js` — project data (single source of truth for
  featured projects + case-study content)
- `src/components/` — homepage section components (Hero, FeaturedProjects,
  About) plus shared UI (Header, Footer, ProjectCard)
- `src/layouts/RootLayout.jsx` — shared header/footer shell used by every
  route
- `src/pages/` — routed pages (Home, ProjectCaseStudy, NotFound)
- `src/router.jsx` — route table (`/`, `/projects/:slug`, 404 fallback)
