const NAV_LINKS = ['HOME', 'ABOUT', 'SKILLS', 'EXPERIENCE', 'PROJECTS', 'CONTACT']

export default function Footer() {
  const year = new Date().getFullYear()

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <footer className="bg-bg-low border-t border-outline/20 py-8">
      <div className="max-w-container mx-auto px-6">

        {/* Row 1 */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 bg-primary text-bg-low font-mono font-bold text-xs flex items-center justify-center flex-shrink-0">
              YT
            </span>
            <span className="font-mono text-sm text-muted">yash.dev</span>
          </div>

          {/* Nav links */}
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-1">
            {NAV_LINKS.map((label) => (
              <button
                key={label}
                onClick={() => scrollTo(label.toLowerCase())}
                className="font-mono text-xs text-muted hover:text-primary transition-colors duration-200 tracking-widest"
              >
                {label}
              </button>
            ))}
          </nav>
        </div>

        {/* Row 2 */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 mt-4 pt-4 border-t border-outline/10">
          <p className="font-mono text-xs text-muted/60">
            © {year} Yash Tayade. Crafted in Bangalore.
          </p>
          <p className="font-mono text-xs text-muted/60">
            Built with React + Three.js + ☕
          </p>
        </div>

      </div>
    </footer>
  )
}
