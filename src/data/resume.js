// Single source of truth for the resume asset so the header, About section,
// and footer can't drift apart if the file is ever renamed or re-exported.
// Lives in `public/` (not imported/hashed by Vite) so the URL stays stable
// and shareable — a recruiter can be sent the link directly.
export const RESUME_URL = '/Terrence-Freeman-Resume.pdf'
export const RESUME_UPDATED = 'September 2026'
