import Hero from '../components/Hero.jsx'
import FeaturedProjects from '../components/FeaturedProjects.jsx'
import WhatIBuild from '../components/WhatIBuild.jsx'
import Now from '../components/Now.jsx'
import About from '../components/About.jsx'

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedProjects />
      <WhatIBuild />
      <Now />
      <About />
    </>
  )
}
