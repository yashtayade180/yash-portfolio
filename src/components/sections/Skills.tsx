import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import SectionLabel from '../ui/SectionLabel'
import SkillOrbs3D from '../Skills/SkillOrbs3D'

// ── Data ──────────────────────────────────────────────────────────────
interface Skill { name: string; category: string; color: string }

const SKILLS: Skill[] = [
  // Languages
  { name: 'JavaScript', category: 'Languages', color: '#ffb95a' },
  { name: 'TypeScript',  category: 'Languages', color: '#ffb95a' },
  { name: 'Python',      category: 'Languages', color: '#ffb95a' },
  { name: 'C++',         category: 'Languages', color: '#ffb95a' },
  { name: 'Java',        category: 'Languages', color: '#ffb95a' },
  // Backend
  { name: 'Node.js',     category: 'Backend',   color: '#00d4ff' },
  { name: 'Fastify',     category: 'Backend',   color: '#00d4ff' },
  { name: 'Express.js',  category: 'Backend',   color: '#00d4ff' },
  { name: 'Spring Boot', category: 'Backend',   color: '#00d4ff' },
  // Databases
  { name: 'MongoDB',     category: 'Databases', color: '#4ade80' },
  { name: 'PostgreSQL',  category: 'Databases', color: '#4ade80' },
  { name: 'Redis',       category: 'Databases', color: '#4ade80' },
  { name: 'MySQL',       category: 'Databases', color: '#4ade80' },
  { name: 'GraphQL',     category: 'Databases', color: '#4ade80' },
  // DevOps
  { name: 'Docker',           category: 'DevOps', color: '#a78bfa' },
  { name: 'Kubernetes',       category: 'DevOps', color: '#a78bfa' },
  { name: 'AWS Lambda',       category: 'DevOps', color: '#a78bfa' },
  { name: 'AWS S3',           category: 'DevOps', color: '#a78bfa' },
  { name: 'Jenkins',          category: 'DevOps', color: '#a78bfa' },
  { name: 'GitHub Actions',   category: 'DevOps', color: '#a78bfa' },
  // Frontend
  { name: 'React.js',      category: 'Frontend', color: '#f472b6' },
  { name: 'Next.js',       category: 'Frontend', color: '#f472b6' },
  { name: 'React Native',  category: 'Frontend', color: '#f472b6' },
  { name: 'Tailwind CSS',  category: 'Frontend', color: '#f472b6' },
  // MQ
  { name: 'RabbitMQ',   category: 'MQ', color: '#fb923c' },
  { name: 'Kafka',      category: 'MQ', color: '#fb923c' },
  { name: 'Zookeeper',  category: 'MQ', color: '#fb923c' },
]

const CATEGORIES = ['All', 'Languages', 'Backend', 'Databases', 'DevOps', 'Frontend', 'MQ']

// ── Skill chip ────────────────────────────────────────────────────────
function SkillChip({
  skill,
  dimmed,
  entryDelay,
  visible,
}: {
  skill: Skill
  dimmed: boolean
  entryDelay: number
  visible: boolean
}) {
  const [hovered, setHovered] = useState(false)
  const [entryDone, setEntryDone] = useState(false)

  return (
    <motion.div
      className="bg-bg-card rounded-card p-3 flex flex-col items-center gap-2 cursor-default select-none"
      initial={{ opacity: 0, y: 10 }}
      animate={{
        opacity: visible ? (dimmed ? 0.2 : 1) : 0,
        y: visible ? 0 : 10,
        scale: dimmed ? 0.95 : 1,
      }}
      whileHover={!dimmed ? { scale: 1.06 } : {}}
      transition={{
        duration: 0.25,
        delay: visible && !entryDone ? entryDelay : 0,
      }}
      onAnimationComplete={() => { if (visible) setEntryDone(true) }}
      onHoverStart={() => { if (!dimmed) setHovered(true) }}
      onHoverEnd={() => setHovered(false)}
      style={{
        border: `1px solid ${hovered && !dimmed ? skill.color + '99' : 'rgba(60,73,78,0.3)'}`,
        boxShadow: hovered && !dimmed ? `0 0 12px ${skill.color}40` : 'none',
        transition: 'border-color 0.2s, box-shadow 0.2s',
      }}
    >
      {/* Category colour dot */}
      <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: skill.color }} />

      {/* Skill name */}
      <span className="font-mono text-xs text-on-surface text-center leading-tight">
        {skill.name}
      </span>

      {/* Category label */}
      <span
        className="font-mono text-[10px] tracking-widest uppercase text-center leading-tight"
        style={{ color: skill.color, opacity: 0.8 }}
      >
        {skill.category}
      </span>
    </motion.div>
  )
}

// ── Mobile: grouped horizontal-scroll strips ──────────────────────────
const CATEGORY_ORDER = ['Languages', 'Backend', 'Frontend', 'Databases', 'DevOps', 'MQ']

function MobileSkillStrip({ activeCategory }: { activeCategory: string }) {
  const groups =
    activeCategory === 'All'
      ? CATEGORY_ORDER.map(cat => ({ cat, skills: SKILLS.filter(s => s.category === cat) }))
      : [{ cat: activeCategory, skills: SKILLS.filter(s => s.category === activeCategory) }]

  return (
    <div className="mt-6 flex flex-col gap-4 sm:hidden">
      {groups.map(({ cat, skills }) => (
        <div key={cat}>
          <p className="font-mono text-[10px] text-muted/60 tracking-widest uppercase mb-2">
            {cat}
          </p>
          <div
            className="flex gap-2 overflow-x-auto pb-1"
            style={{ scrollbarWidth: 'none' }}
          >
            {skills.map(s => (
              <div
                key={s.name}
                className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 bg-bg-card rounded-pill border"
                style={{ borderColor: s.color + '55' }}
              >
                <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: s.color }} />
                <span className="font-mono text-[11px] text-on-surface whitespace-nowrap">{s.name}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

// ── Skills grid ───────────────────────────────────────────────────────
function SkillsGrid({ activeCategory }: { activeCategory: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  return (
    <div
      ref={ref}
      className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 mt-8"
    >
      {SKILLS.map((skill, i) => (
        <SkillChip
          key={skill.name}
          skill={skill}
          dimmed={activeCategory !== 'All' && skill.category !== activeCategory}
          entryDelay={i * 0.02}
          visible={isInView}
        />
      ))}
    </div>
  )
}

// ── Skills section ────────────────────────────────────────────────────
export default function Skills() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [view, setView] = useState<'grid' | 'orbs'>('grid')

  const visibleSkills =
    activeCategory === 'All' ? SKILLS : SKILLS.filter((s) => s.category === activeCategory)

  return (
    <section id="skills" className="bg-bg-low py-12 sm:py-24">
      <div className="max-w-container mx-auto px-6">

        {/* Heading block — centred */}
        <div className="text-center">
          <SectionLabel text="THE TOOLKIT" centered />

          <motion.h2
            className="font-mono font-bold text-3xl text-on-surface"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
          >
            Juggling a diverse ecosystem of modern technologies.
          </motion.h2>

          <motion.p
            className="hidden sm:block font-sans text-lg text-muted max-w-2xl mx-auto mt-3"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.12 }}
          >
            {view === 'grid' ? 'Click a category to filter the stack.' : 'Hover an orb to see the skill name.'}
          </motion.p>
        </div>

        {/* Controls row: category filter + view toggle */}
        <motion.div
          className="flex flex-col items-center gap-4 mt-10"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {/* Category filter — scrollable on mobile, wraps on desktop */}
          <div
            className="flex gap-2 overflow-x-auto sm:flex-wrap sm:justify-center w-full pb-1"
            style={{ scrollbarWidth: 'none' }}
          >
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={[
                  'font-mono text-xs px-4 py-2 rounded-pill border transition-all duration-200 flex-shrink-0',
                  activeCategory === cat
                    ? 'bg-primary text-bg-low border-primary font-bold'
                    : 'border-outline/40 text-muted hover:border-primary/60 hover:text-primary',
                ].join(' ')}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* View toggle — all screens */}
          <div className="flex items-center bg-bg-card border border-outline/30 rounded-pill p-1 gap-0.5">
            {(['grid', 'orbs'] as const).map((v) => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={[
                  'font-mono text-xs px-4 py-1.5 rounded-pill transition-all duration-200',
                  view === v
                    ? 'bg-primary text-bg-low font-bold'
                    : 'text-muted hover:text-on-surface',
                ].join(' ')}
              >
                {v === 'grid' ? 'GRID VIEW' : 'ORB VIEW'}
              </button>
            ))}
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {view === 'grid' ? (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              {/* Mobile: compact swipe strips */}
              <MobileSkillStrip activeCategory={activeCategory} />
              {/* Desktop: animated chip grid */}
              <div className="hidden sm:block">
                <SkillsGrid activeCategory={activeCategory} />
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="orbs"
              className="mt-6 rounded-card overflow-hidden border border-outline/20"
              style={{ height: 'clamp(300px, 50vw, 500px)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <SkillOrbs3D skills={visibleSkills} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Count badge */}
        <motion.p
          className="font-mono text-xs text-muted/50 text-center mt-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          {activeCategory === 'All'
            ? `${SKILLS.length} technologies`
            : `${visibleSkills.length} in ${activeCategory}`}
        </motion.p>

      </div>
    </section>
  )
}
