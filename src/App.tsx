import { useState } from 'react'
import './index.css'
import { useLenis } from './hooks/useLenis'
import Loader from './components/Loader'
import Navbar from './components/Navbar'
import ScrollProgress from './components/ui/ScrollProgress'
import Hero from './components/sections/Hero'
import About from './components/sections/About'
import Skills from './components/sections/Skills'
import Experience from './components/sections/Experience'
import Projects from './components/sections/Projects'
import Contact from './components/sections/Contact'
import Footer from './components/Footer'
import CustomCursor from './components/CustomCursor'
import HireBadge from './components/HireBadge'
import ScrollToTop from './components/ui/ScrollToTop'

export default function App() {
  const [loading, setLoading] = useState(true)

  useLenis()

  const handleLoaderDone = () => setLoading(false)

  return (
    <>
      <CustomCursor />
      {loading && <Loader onDone={handleLoaderDone} />}

      <div style={{ visibility: loading ? 'hidden' : 'visible' }}>
        <ScrollProgress />
        <Navbar />
        <main>
          <Hero />
          <About />
          <Skills />
          <Experience />
          <Projects />
          <Contact />
        </main>
        <Footer />
        <HireBadge />
        <ScrollToTop />
      </div>
    </>
  )
}
