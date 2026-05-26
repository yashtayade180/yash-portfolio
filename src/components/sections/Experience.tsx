import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import SectionLabel from '../ui/SectionLabel'
import { useCountUp } from '../../hooks/useCountUp'

// ── Data ──────────────────────────────────────────────────────────────
interface Metric { value: number; unit: string; label: string }

interface Experience {
  id: string
  role: string
  company: string
  period: string
  location: string
  type: 'PRESENT' | 'CONTRACT' | 'INTERN'
  color: string
  metrics: Metric[]
  bullets: string[]
  tech: string[]
}

const EXPERIENCES: Experience[] = [
  {
    id: 'signzy',
    role: 'SDE 1 · Full Stack Engineer',
    company: 'Signzy',
    period: 'NOV 2023 · PRESENT',
    location: 'Bangalore, India',
    type: 'PRESENT',
    color: '#00d4ff',
    metrics: [
      { value: 15,   unit: '+',  label: 'APIS BUILT'  },
      { value: 50,   unit: 'K+', label: 'DAILY TXN'   },
      { value: 45,   unit: '%',  label: 'FASTER API'   },
      { value: 99.9, unit: '%',  label: 'UPTIME'       },
    ],
    bullets: [
      'Architected 15+ RESTful APIs using Node.js, Fastify, TypeScript — processing 50K+ daily banking transactions.',
      'Cut API response time 45% via Redis caching strategy and MongoDB query optimisation.',
      'Engineered microservices architecture with Docker + Kubernetes, cutting deployment time 60%.',
      'Optimised RabbitMQ task processing to handle 200K+ async jobs daily at 3× previous throughput.',
      'Built ELK Stack monitoring tracking 50K+ daily requests, reducing MTTR from 4 hrs → 2 hrs.',
    ],
    tech: ['Node.js', 'TypeScript', 'Fastify', 'Redis', 'MongoDB', 'Docker', 'Kubernetes', 'RabbitMQ', 'Kafka'],
  },
  {
    id: 'lystloc',
    role: 'Full Stack Developer',
    company: 'Lystloc',
    period: 'AUG 2023 · NOV 2023',
    location: 'Remote, India',
    type: 'CONTRACT',
    color: '#ffb95a',
    metrics: [
      { value: 12, unit: '+',  label: 'SERVERLESS APIs' },
      { value: 40, unit: '%',  label: 'COST REDUCTION'  },
      { value: 35, unit: '%',  label: 'STABILITY UP'    },
      { value: 5,  unit: 'K+', label: 'DAILY SCANS'     },
    ],
    bullets: [
      'Built 12+ serverless APIs on AWS Lambda + API Gateway — cut infra costs 40%, sub-200ms response.',
      'Reduced application instability by 35% — resolved 20+ critical bugs with root cause analysis.',
      'Spearheaded facial recognition attendance system processing 5K+ daily verifications (Python ML + Node.js).',
      'CI/CD pipeline integration via GitHub Actions: deployment cycle 2 days → 4 hours.',
    ],
    tech: ['AWS Lambda', 'API Gateway', 'Python', 'Node.js', 'Jest', 'GitHub Actions'],
  },
  {
    id: 'accredian',
    role: 'Full Stack Development Intern',
    company: 'Accredian',
    period: 'FEB 2023 · AUG 2023',
    location: 'Remote, India',
    type: 'INTERN',
    color: '#4ade80',
    metrics: [
      { value: 10, unit: 'K+', label: 'DATA/DAY'       },
      { value: 80, unit: '%',  label: 'EFFORT CUT'      },
      { value: 3,  unit: '',   label: 'MERN APPS'       },
      { value: 95, unit: '%',  label: 'DATA ACCURACY'   },
    ],
    bullets: [
      'Python web scraping (BeautifulSoup + Selenium) — 10K+ data points/day, 80% manual effort reduction.',
      'Delivered 3 full-stack MERN applications with RESTful APIs serving 1K+ users.',
      'Data validation pipelines boosted accuracy from 60% → 95%.',
    ],
    tech: ['Python', 'React.js', 'Node.js', 'MongoDB', 'Selenium'],
  },
]

// ── Type badge ────────────────────────────────────────────────────────
const BADGE_STYLES = {
  PRESENT:  'bg-primary/20 text-primary border-primary/40',
  CONTRACT: 'bg-secondary/20 text-secondary border-secondary/40',
  INTERN:   'bg-green-500/20 text-green-400 border-green-500/40',
}

function TypeBadge({ type }: { type: Experience['type'] }) {
  return (
    <span className={`font-mono text-[10px] tracking-widest px-2 py-1 rounded-pill border flex-shrink-0 ${BADGE_STYLES[type]}`}>
      {type}
    </span>
  )
}

// ── Metric cell (count-up triggers when card enters view) ─────────────
function MetricCell({
  value, unit, label, color, inView,
}: Metric & { color: string; inView: boolean }) {
  const isFloat  = value % 1 !== 0
  const target   = isFloat ? Math.round(value * 10) : value
  const count    = useCountUp({ end: target, duration: 1500, startOnMount: inView })
  const display  = isFloat ? (count / 10).toFixed(1) : String(count)

  return (
    <div className="bg-bg-low rounded p-2 text-center">
      <p className="font-mono font-bold text-base leading-none" style={{ color }}>
        {display}{unit}
      </p>
      <p className="font-mono text-[9px] tracking-widest text-muted mt-1 leading-tight">{label}</p>
    </div>
  )
}

// ── Single experience card ────────────────────────────────────────────
function ExperienceCard({ exp, index }: { exp: Experience; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(cardRef, { once: true, amount: 0.15 })
  const isLeft   = index % 2 === 0

  return (
    <div className="relative pl-10 md:pl-0 flex">

      {/* ── Mobile dot (left-edge line) ── */}
      <div
        className="absolute md:hidden top-8 left-[18px] w-3 h-3 rounded-full border-2 border-bg z-10 flex-shrink-0"
        style={{ background: exp.color, boxShadow: `0 0 8px ${exp.color}` }}
      />

      {/* ── Desktop dot (center line) ── */}
      <div
        className="absolute hidden md:block top-8 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-[3px] border-bg z-10"
        style={{ background: exp.color, boxShadow: `0 0 12px ${exp.color}` }}
      />

      {/* ── Card ── */}
      <motion.div
        ref={cardRef}
        className={[
          'bg-bg-card border border-outline/30 rounded-card p-6 w-full',
          'md:w-[calc(50%-36px)]',
          isLeft ? 'md:mr-auto' : 'md:ml-auto',
        ].join(' ')}
        initial={{ opacity: 0, x: isLeft ? -60 : 60 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.6, delay: index * 0.12, ease: 'easeOut' }}
      >
        {/* Top row */}
        <div className="flex items-start justify-between gap-2 flex-wrap">
          <h3 className="font-mono font-bold text-xl text-on-surface">{exp.company}</h3>
          <TypeBadge type={exp.type} />
        </div>

        {/* Period + location */}
        <p className="font-mono text-xs mt-1.5">
          <span style={{ color: exp.color }}>{exp.period}</span>
          <span className="text-muted mx-2">·</span>
          <span className="text-muted">{exp.location}</span>
        </p>

        {/* Role */}
        <p className="font-mono text-sm text-on-surface/70 mt-2">{exp.role}</p>

        {/* Metrics */}
        <div className="grid grid-cols-4 gap-2 mt-4">
          {exp.metrics.map((m) => (
            <MetricCell
              key={m.label}
              {...m}
              color={exp.color}
              inView={isInView}
            />
          ))}
        </div>

        {/* Bullets */}
        <ul className="space-y-2 mt-4">
          {exp.bullets.map((b) => (
            <li key={b} className="flex items-start gap-2">
              <span
                className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-[7px]"
                style={{ background: exp.color }}
              />
              <span className="font-sans text-sm text-muted leading-relaxed">{b}</span>
            </li>
          ))}
        </ul>

        {/* Tech pills */}
        <div className="flex flex-wrap gap-2 mt-5">
          {exp.tech.map((t) => (
            <span
              key={t}
              className="font-mono text-[10px] tracking-widest uppercase border border-outline/40 px-2 py-1 rounded-pill text-muted hover:border-primary/60 hover:text-primary transition-colors duration-200 cursor-default"
            >
              {t}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

// ── Experience section ────────────────────────────────────────────────
export default function Experience() {
  return (
    <section id="experience" className="bg-bg">
      <div className="max-w-container mx-auto px-6">

        <SectionLabel text="CAREER TIMELINE" />

        <motion.h2
          className="font-mono font-bold text-4xl text-on-surface mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Where I've made impact.
        </motion.h2>

        <div className="relative max-w-4xl mx-auto">

          {/* Gradient center line — desktop */}
          <div
            className="absolute hidden md:block top-0 bottom-0 w-0.5 left-1/2 -translate-x-1/2 pointer-events-none"
            style={{ background: 'linear-gradient(to bottom, #00d4ff 0%, #ffb95a 50%, #4ade80 100%)' }}
          />

          {/* Left-edge line — mobile */}
          <div
            className="absolute md:hidden top-0 bottom-0 w-0.5 left-5 pointer-events-none"
            style={{ background: 'linear-gradient(to bottom, #00d4ff 0%, #ffb95a 50%, #4ade80 100%)' }}
          />

          <div className="space-y-14">
            {EXPERIENCES.map((exp, i) => (
              <ExperienceCard key={exp.id} exp={exp} index={i} />
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
