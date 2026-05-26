import { motion } from 'framer-motion'
import SectionLabel from '../ui/SectionLabel'

// ── Terminal JSON viewer ──────────────────────────────────────────────
const K = ({ children }: { children: string }) => (
  <span className="text-primary">"{children}"</span>
)
const S = ({ children }: { children: string }) => (
  <span className="text-secondary">"{children}"</span>
)
const V = ({ children }: { children: string }) => (
  <span className="text-on-surface">{children}</span>
)
const P = ({ children }: { children: string }) => (
  <span className="text-muted">{children}</span>
)

function TerminalJSON() {
  return (
    <div className="bg-bg-card rounded-card border border-outline/40 overflow-hidden">
      {/* Title bar */}
      <div className="bg-bg-top px-4 py-2.5 flex items-center gap-2">
        <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
        <span className="font-mono text-xs text-muted mx-auto">about.json</span>
      </div>

      {/* JSON content */}
      <div className="p-6 font-mono text-sm leading-[1.9] overflow-x-auto">
        <P>{'{'}</P>
        <div className="pl-5">
          <div><K>name</K><P>{': '}</P><S>Yash Tayade</S><P>,</P></div>
          <div><K>role</K><P>{': '}</P><S>Full Stack Engineer</S><P>,</P></div>
          <div><K>location</K><P>{': '}</P><S>Bangalore, India</S><P>,</P></div>
          <div><K>experience</K><P>{': '}</P><S>2+ years</S><P>,</P></div>
          <div>
            <K>focus</K><P>{': ['}</P>
            <div className="pl-5">
              <div><S>Backend APIs</S><P>,</P></div>
              <div><S>Microservices</S><P>,</P></div>
              <div><S>WebGL & 3D Web</S></div>
            </div>
            <P>{'],'}</P>
          </div>
          <div><K>currently</K><P>{': '}</P><S>@ Signzy</S><P>,</P></div>
          <div><K>available</K><P>{': '}</P><V>true</V><P>,</P></div>
          <div><K>cgpa</K><P>{': '}</P><V>9.61</V></div>
        </div>
        <P>{'}'}</P>
        <span className="cursor-blink text-primary">▌</span>
      </div>
    </div>
  )
}

// ── Info cards ────────────────────────────────────────────────────────
function InfoCard({
  label,
  title,
  body,
  badge,
  badgeColor,
}: {
  label: string
  title: string
  body: string
  badge: string
  badgeColor: 'cyan' | 'amber'
}) {
  return (
    <div className="bg-bg-card border border-outline/40 rounded-card p-5 flex flex-col">
      <span className="font-mono text-xs text-primary tracking-widest uppercase">{label}</span>
      <span className="font-mono font-bold text-lg text-on-surface mt-2">{title}</span>
      <p className="font-sans text-sm text-muted mt-1 leading-relaxed flex-1">{body}</p>
      <div className="flex items-center gap-2 mt-4">
        <span
          className={`w-2 h-2 rounded-full flex-shrink-0 ${badgeColor === 'cyan' ? 'bg-primary' : 'bg-secondary'}`}
        />
        <span
          className={`font-mono text-xs ${badgeColor === 'cyan' ? 'text-primary' : 'text-secondary'}`}
        >
          {badge}
        </span>
      </div>
    </div>
  )
}

// ── About section ─────────────────────────────────────────────────────
export default function About() {
  return (
    <section id="about" className="bg-bg-low">
      <div className="max-w-container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-start">

          {/* ── LEFT COLUMN ──────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <SectionLabel text="WHO'S BEHIND THE KEYBOARD?" />

            <h2 className="font-mono font-bold text-4xl text-on-surface mb-6">
              I'm Yash.
            </h2>

            <div className="space-y-4">
              <p className="font-sans text-base text-muted leading-relaxed">
                I'm a Full Stack Engineer currently building scalable financial
                infrastructure at{' '}
                <span className="text-primary font-semibold">Signzy</span>. My
                journey into tech was driven by a fascination with how complex
                systems can be abstracted into intuitive user experiences.
              </p>
              <p className="font-sans text-base text-muted leading-relaxed">
                I hold a B.Tech in Computer Science from{' '}
                <span className="text-secondary font-semibold">VIIT Pune</span>{' '}
                with a{' '}
                <span className="text-secondary font-semibold">9.61 CGPA</span>.
                My technical focus lies at the intersection of high-performance
                backend architecture and polished, interactive frontends.
              </p>
            </div>

            {/* Info cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
              <InfoCard
                label="CURRENT ROLE"
                title="Signzy"
                body="Full Stack Engineer specialising in API performance and secure onboarding flows."
                badge="Nov 2023 – Present"
                badgeColor="cyan"
              />
              <InfoCard
                label="EDUCATION"
                title="VIIT Pune"
                body="B.Tech in Computer Engineering. Academic excellence award recipient."
                badge="CGPA: 9.61"
                badgeColor="amber"
              />
            </div>
          </motion.div>

          {/* ── RIGHT COLUMN ─────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
          >
            <TerminalJSON />
          </motion.div>

        </div>
      </div>
    </section>
  )
}
