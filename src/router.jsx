import { createBrowserRouter } from 'react-router-dom'
import RootLayout from './layouts/RootLayout.jsx'
import Home from './pages/Home.jsx'
import ProjectCaseStudy from './pages/ProjectCaseStudy.jsx'
import NotFound from './pages/NotFound.jsx'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'projects/:slug', element: <ProjectCaseStudy /> },
      { path: '*', element: <NotFound /> },
    ],
  },
])
