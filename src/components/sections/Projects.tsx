import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { GitFork, ExternalLink } from 'lucide-react'
import SectionLabel from '../ui/SectionLabel'

// ── Data ──────────────────────────────────────────────────────────────
interface Project {
  id: string
  title: string
  tagline: string
  description: string
  tech: string[]
  color: string
  accentBg: string
  status: string
  featured: boolean
  gradientFrom: string
  github: string
  demo: string | null
  year: string
}

const PROJECTS: Project[] = [
  {
    id: 'turfeasy',
    title: 'TurfEasePro',
    tagline: 'Full-stack sports turf booking platform',
    description:
      'Real-time slot booking with split payments via shareable links, post-game match stats, referee/coach add-ons, and AI-free weather-based slot advisories using Open-Meteo API. Role-based access for users, partners, and admins.',
    tech: ['React', 'TypeScript', 'Node.js', 'Fastify', 'MongoDB', 'Open-Meteo API'],
    color: '#00d4ff',
    accentBg: 'rgba(0,212,255,0.06)',
    status: 'LIVE',
    featured: true,
    gradientFrom: 'rgba(8,47,73,0.5)',
    github: '#',
    demo: 'https://turfeasepro.vercel.app/',
    year: '2024',
  },
  {
    id: 'hospital',
    title: 'Hospital Management System',
    tagline: 'Comprehensive healthcare ops platform',
    description:
      'Hospital data management system with CRUD operations, patient tracking, inventory management, and operations planning dashboards for hospital administrators.',
    tech: ['React', 'Node.js', 'MongoDB', 'Express.js'],
    color: '#4ade80',
    accentBg: 'rgba(74,222,128,0.06)',
    status: 'ARCHIVED',
    featured: false,
    gradientFrom: 'rgba(5,46,22,0.5)',
    github: '#',
    demo: null,
    year: '2022',
  },
  {
    id: 'portfolio',
    title: 'This Portfolio',
    tagline: 'Interactive 3D developer showcase',
    description:
      'Built with React, Three.js, and a procedural 3D avatar that guides you through sections. Features animated skill chips, timeline with count-up metrics, and the Cyber-Whimsy design system.',
    tech: ['React', 'TypeScript', 'Three.js', 'Vite', 'Tailwind CSS', 'GSAP'],
    color: '#ffb95a',
    accentBg: 'rgba(255,185,90,0.06)',
    status: "YOU'RE HERE",
    featured: false,
    gradientFrom: 'rgba(67,36,6,0.5)',
    github: '#',
    demo: '#',
    year: '2025',
  },
]

// ── 3D tilt hook ──────────────────────────────────────────────────────
function useTilt(maxDeg = 8) {
  const ref = useRef<HTMLDivElement>(null)
  const [tiltStyle, setTiltStyle] = useState<React.CSSProperties>({})
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 })

  const onMouseMove = (e: React.MouseEvent) => {
    const el = ref.current
    if (!el) return
    const { left, top, width, height } = el.getBoundingClientRect()
    const x = (e.clientX - left) / width
    const y = (e.clientY - top) / height
    setTiltStyle({
      transform: `perspective(1200px) rotateX(${(y - 0.5) * -maxDeg * 2}deg) rotateY(${(x - 0.5) * maxDeg * 2}deg) scale(1.01)`,
      transition: 'transform 0.12s ease-out',
    })
    setGlare({ x: x * 100, y: y * 100, opacity: 0.12 })
  }

  const onMouseLeave = () => {
    setTiltStyle({
      transform: 'perspective(1200px) rotateX(0deg) rotateY(0deg) scale(1)',
      transition: 'transform 0.6s ease-out',
    })
    setGlare((g) => ({ ...g, opacity: 0 }))
  }

  return { ref, tiltStyle, glare, onMouseMove, onMouseLeave }
}

// ── Status badge ──────────────────────────────────────────────────────
function StatusBadge({ status }: { status: string }) {
  const cls =
    status === 'LIVE'
      ? 'bg-primary/20 text-primary border-primary/40'
      : status === 'ARCHIVED'
      ? 'bg-bg-top text-muted border-outline/40'
      : 'bg-secondary/20 text-secondary border-secondary/40'
  return (
    <span className={`font-mono text-[10px] tracking-widest px-2 py-1 rounded-pill border ${cls}`}>
      {status}
    </span>
  )
}

// ── Tech pill ─────────────────────────────────────────────────────────
function TechPill({ name }: { name: string }) {
  return (
    <span className="font-mono text-[10px] tracking-widest uppercase border border-outline/40 px-2 py-1 rounded-pill text-muted">
      {name}
    </span>
  )
}

// ── Scrolling code decoration ─────────────────────────────────────────
function CodeDecoration() {
  const K = ({ c }: { c: string }) => <span className="text-primary">{c}</span>
  const S = ({ c }: { c: string }) => <span className="text-secondary">{c}</span>
  const M = ({ c }: { c: string }) => <span className="text-muted/50">{c}</span>
  const N = ({ c }: { c: string }) => <span className="text-on-surface/80">{c}</span>

  const Block = () => (
    <div className="leading-[1.85]">
      <M c="// fetch available slot" /><br />
      <K c="const " /><N c="booking = " /><K c="await " /><N c="db" /><br />
      <N c="  .collection(" /><S c="'slots'" /><N c=")" /><br />
      <N c="  .findOne({" /><br />
      <N c="    id," /><br />
      <N c="    available: " /><K c="true" /><br />
      <N c="  });" /><br />
      <br />
      <M c="// distributed lock" /><br />
      <K c="await " /><N c="redis.setex(" /><br />
      <N c="  " /><S c={"`lock:${slotId}`"} /><N c="," /><br />
      <N c="  300," /><br />
      <N c="  userId" /><br />
      <N c=");" /><br />
      <br />
      <M c="// confirm booking" /><br />
      <K c="return " /><N c="res.send({" /><br />
      <N c="  status: " /><S c="'CONFIRMED'" /><N c="," /><br />
      <N c="  slot: booking," /><br />
      <N c="});" /><br />
      <br />
    </div>
  )

  return (
    <div className="overflow-hidden h-full">
      <div className="code-scroll">
        <Block />
        <Block />
      </div>
    </div>
  )
}

// ── Featured card ─────────────────────────────────────────────────────
function FeaturedCard({ project }: { project: Project }) {
  const { ref, tiltStyle, glare, onMouseMove, onMouseLeave } = useTilt(8)

  return (
    <motion.div
      ref={ref}
      className="relative rounded-card overflow-hidden cursor-default flex flex-col md:flex-row md:items-stretch md:h-[320px]"
      style={{
        border: `1px solid ${project.color}4d`,
        background: `linear-gradient(135deg, ${project.gradientFrom}, #1d2025)`,
        ...tiltStyle,
      }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.65, ease: 'easeOut' }}
    >
      {/* Glare overlay */}
      <div
        className="absolute inset-0 pointer-events-none rounded-card transition-opacity duration-300"
        style={{
          opacity: glare.opacity,
          background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,0.15) 0%, transparent 60%)`,
        }}
      />

      {/* Left: project info */}
      <div className="relative flex flex-col justify-center p-6 md:p-8 md:w-[56%]">
        <p className="font-mono text-[10px] tracking-widest uppercase mb-2" style={{ color: `${project.color}b3` }}>
          FEATURED PROJECT
        </p>
        <h3 className="font-mono font-bold text-2xl md:text-3xl text-on-surface mt-1">{project.title}</h3>
        <p className="font-mono text-sm mt-1" style={{ color: project.color }}>{project.tagline}</p>
        <p className="font-sans text-sm text-muted mt-3 leading-relaxed line-clamp-3 md:line-clamp-2">{project.description}</p>

        <div className="flex flex-wrap gap-2 mt-4">
          {project.tech.map((t) => <TechPill key={t} name={t} />)}
        </div>

        <div className="flex gap-3 mt-4">
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 bg-primary text-bg-low font-mono text-xs font-bold px-4 py-2 rounded-btn hover:shadow-glow-cyan hover:scale-[1.02] transition-all duration-200"
            >
              VIEW LIVE <ExternalLink size={12} />
            </a>
          )}
          <a
            href={project.github}
            className="flex items-center gap-1.5 border border-primary/50 text-primary font-mono text-xs px-4 py-2 rounded-btn hover:bg-primary/10 transition-all duration-200"
          >
            GITHUB <GitFork size={12} />
          </a>
        </div>
      </div>

      {/* Right: scrolling code block — desktop only */}
      <div
        className="hidden md:block md:w-[44%] rounded-l-card overflow-hidden bg-bg-low self-stretch"
        style={{ borderLeft: `1px solid ${project.color}26` }}
      >
        <div className="p-5 font-mono text-xs h-full">
          <CodeDecoration />
        </div>
      </div>
    </motion.div>
  )
}

// ── Non-featured card ─────────────────────────────────────────────────
function ProjectCard({ project, index }: { project: Project; index: number }) {
  const { ref, tiltStyle, glare, onMouseMove, onMouseLeave } = useTilt(6)

  return (
    <motion.div
      ref={ref}
      className="relative rounded-card overflow-hidden cursor-default flex flex-col"
      style={{
        border: `1px solid ${project.color}33`,
        background: `linear-gradient(135deg, ${project.gradientFrom}, #1d2025)`,
        ...tiltStyle,
      }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: 'easeOut' }}
    >
      {/* Glare */}
      <div
        className="absolute inset-0 pointer-events-none rounded-card transition-opacity duration-300"
        style={{
          opacity: glare.opacity,
          background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,0.12) 0%, transparent 60%)`,
        }}
      />

      <div className="relative p-6 flex flex-col flex-1">
        {/* Status badge */}
        <div className="flex items-center justify-between mb-4">
          <StatusBadge status={project.status} />
          <span className="font-mono text-xs text-muted/60">{project.year}</span>
        </div>

        {/* Title + tagline */}
        <h3 className="font-mono font-bold text-xl text-on-surface">{project.title}</h3>
        <p className="font-mono text-sm mt-1" style={{ color: project.color }}>{project.tagline}</p>

        {/* Description */}
        <p className="font-sans text-sm text-muted mt-3 leading-relaxed flex-1">{project.description}</p>

        {/* Tech pills */}
        <div className="flex flex-wrap gap-2 mt-5">
          {project.tech.map((t) => <TechPill key={t} name={t} />)}
        </div>

        {/* Bottom row */}
        <div className="flex items-center justify-between mt-5 pt-4 border-t border-outline/20">
          <a
            href={project.github}
            className="flex items-center gap-1.5 font-mono text-xs text-muted hover:text-primary transition-colors duration-200"
          >
            <GitFork size={14} /> GitHub
          </a>
          {project.demo && (
            <a
              href={project.demo}
              className="flex items-center gap-1.5 font-mono text-xs hover:scale-[1.04] transition-transform duration-200"
              style={{ color: project.color }}
            >
              View Live <ExternalLink size={12} />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  )
}

// ── Projects section ──────────────────────────────────────────────────
export default function Projects() {
  const featured  = PROJECTS.filter((p) => p.featured)
  const secondary = PROJECTS.filter((p) => !p.featured)

  return (
    <section id="projects" className="bg-bg">
      <div className="max-w-container mx-auto px-6">

        <SectionLabel text="THINGS I'VE BUILT" />

        <motion.h2
          className="font-mono font-bold text-4xl text-on-surface mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Selected work.
        </motion.h2>

        {/* Featured project */}
        <div className="mb-8">
          {featured.map((p) => <FeaturedCard key={p.id} project={p} />)}
        </div>

        {/* Secondary grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {secondary.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} />
          ))}
        </div>

      </div>
    </section>
  )
}
