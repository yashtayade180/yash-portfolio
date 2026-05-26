import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { cn } from '../lib/utils'

const NAV_LINKS = [
  { label: 'HOME',       href: '#hero' },
  { label: 'ABOUT',      href: '#about' },
  { label: 'SKILLS',     href: '#skills' },
  { label: 'EXPERIENCE', href: '#experience' },
  { label: 'PROJECTS',   href: '#projects' },
  { label: 'CONTACT',    href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled]         = useState(false)
  const [activeSection, setActiveSection] = useState('hero')
  const [drawerOpen, setDrawerOpen]     = useState(false)

  // Scroll-based background
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Active section detection via IntersectionObserver
  useEffect(() => {
    const sections = document.querySelectorAll('section[id]')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        })
      },
      { threshold: 0.5 }
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  const scrollTo = (href: string) => {
    const el = document.querySelector(href)
    el?.scrollIntoView({ behavior: 'smooth' })
    setDrawerOpen(false)
  }

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 h-14 flex items-center justify-between px-6 transition-all duration-300',
          scrolled
            ? 'bg-bg/80 backdrop-blur-md border-b border-outline/40'
            : 'bg-transparent'
        )}
      >
        {/* Logo */}
        <button
          onClick={() => scrollTo('#hero')}
          className="flex items-center gap-2 focus:outline-none"
        >
          <span className="w-7 h-7 bg-primary text-bg-low font-mono font-bold text-sm flex items-center justify-center flex-shrink-0">
            YT
          </span>
          <span className="font-mono text-sm text-primary hidden sm:block">yash.dev</span>
        </button>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map(({ label, href }) => (
            <button
              key={href}
              onClick={() => scrollTo(href)}
              className={cn(
                'font-mono text-xs tracking-widest transition-colors duration-200 pb-0.5',
                activeSection === href.slice(1)
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-muted hover:text-primary'
              )}
            >
              {label}
            </button>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => scrollTo('#contact')}
            className="font-mono text-xs px-3 py-1 rounded-pill border border-primary text-primary
                       hover:bg-primary hover:text-bg-low hover:shadow-glow-cyan transition-all duration-200"
          >
            HIRE ME
          </button>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-muted hover:text-primary transition-colors"
            onClick={() => setDrawerOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {drawerOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-40 flex">
          {/* Backdrop */}
          <div
            className="flex-1 bg-black/60"
            onClick={() => setDrawerOpen(false)}
          />
          {/* Drawer panel */}
          <div className="w-64 bg-bg-card h-full flex flex-col pt-20 pb-8 px-6 border-l border-outline/30">
            {NAV_LINKS.map(({ label, href }) => (
              <button
                key={href}
                onClick={() => scrollTo(href)}
                className={cn(
                  'font-mono text-xs tracking-widest py-4 text-left border-b border-outline/20 transition-colors duration-200',
                  activeSection === href.slice(1) ? 'text-primary' : 'text-muted hover:text-primary'
                )}
              >
                {label}
              </button>
            ))}
            <button
              onClick={() => scrollTo('#contact')}
              className="mt-8 font-mono text-xs px-4 py-2 rounded-pill border border-primary text-primary
                         hover:bg-primary hover:text-bg-low transition-all duration-200"
            >
              HIRE ME
            </button>
          </div>
        </div>
      )}
    </>
  )
}
