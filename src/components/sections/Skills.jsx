import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { skills } from '../../data/portfolioData'
import SectionHeading from '../ui/SectionHeading'


const ASTEROIDS = [
  { key: 'Frontend',       color: '#f5d98a', orbitR: 160, dur: 22, start: 10,  size: 112 },
  { key: 'Backend',        color: '#c4b5fd', orbitR: 220, dur: 32, start: 100, size: 100 },
  { key: 'Languages', color: '#86efac', orbitR: 140, dur: 17, start: 210, size: 92  },
  { key: 'Tooling',        color: '#fbcfe8', orbitR: 195, dur: 26, start: 290, size: 96  },
]

function asteroidPts(r, cx, cy) {
  const angles = [0, 42, 78, 118, 162, 198, 238, 278, 318]
  const radii  = [0.84, 0.96, 0.88, 0.80, 0.93, 0.86, 0.94, 0.82, 0.90]
  return angles.map((deg, i) => {
    const a = (deg * Math.PI) / 180
    return `${cx + Math.cos(a) * r * radii[i]},${cy + Math.sin(a) * r * radii[i]}`
  }).join(' ')
}

function Asteroid({ meta, center, active, onClick }) {
  const divRef   = useRef(null)
  const angleRef = useRef((meta.start * Math.PI) / 180)
  const pauseRef = useRef(false)
  const rafRef   = useRef(null)
  const r = meta.size / 2

  useEffect(() => { pauseRef.current = active }, [active])

  useEffect(() => {
    const speed = (2 * Math.PI) / (meta.dur * 60)
    const tick  = () => {
      if (!pauseRef.current) angleRef.current += speed
      const x = center + Math.cos(angleRef.current) * meta.orbitR - meta.size / 2
      const y = center + Math.sin(angleRef.current) * meta.orbitR - meta.size / 2
      if (divRef.current) divRef.current.style.transform = `translate(${x}px,${y}px)`
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [meta, center])

  const pts = asteroidPts(r, r, r)

  return (
    <div
      ref={divRef}
      onClick={onClick}
      className="absolute top-0 left-0 cursor-pointer select-none"
      style={{
        width: meta.size, height: meta.size,
        willChange: 'transform',
        filter: active
                  ? `drop-shadow(0 0 25px ${meta.color}) drop-shadow(0 0 50px ${meta.color}60)`
                  : `drop-shadow(0 0 8px ${meta.color}40)`,
        transition: 'filter 0.3s',
      }}
    >
      <motion.div
        animate={{ scale: active ? 1.18 : 1 }}
        whileHover={{ scale: active ? 1.18 : 1.08 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        <svg width={meta.size} height={meta.size} style={{ overflow: 'visible' }}>
          <defs>
            <radialGradient id={`rg-${meta.key}`} cx="35%" cy="32%" r="68%">
              <stop offset="0%"   stopColor={meta.color} stopOpacity={active ? '0.60' : '0.35'} />
              <stop offset="55%"  stopColor={meta.color} stopOpacity={active ? '0.18' : '0.10'} />
              <stop offset="100%" stopColor={meta.color} stopOpacity="0.03" />
            </radialGradient>
          </defs>

          <polygon
            points={pts}
            fill={`url(#rg-${meta.key})`}
            stroke={meta.color}
            strokeWidth={active ? '1.4' : '0.7'}
            strokeOpacity={active ? '0.85' : '0.35'}
          />

          <circle cx={meta.size*0.4}  cy={meta.size*0.38} r={meta.size*0.07} fill="none" stroke={meta.color} strokeWidth="0.5" strokeOpacity="0.25"/>
          <circle cx={meta.size*0.62} cy={meta.size*0.55} r={meta.size*0.05} fill="none" stroke={meta.color} strokeWidth="0.4" strokeOpacity="0.18"/>
          <circle cx={meta.size*0.35} cy={meta.size*0.62} r={meta.size*0.04} fill="none" stroke={meta.color} strokeWidth="0.4" strokeOpacity="0.15"/>

          <text
            x={r} y={r + 1}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize={meta.size * 0.138}
            fontFamily="Syne, sans-serif"
            fontWeight="700"
            fill={meta.color}
            fillOpacity={active ? '1' : '0.65'}
            style={{ letterSpacing: '0.05em', pointerEvents: 'none', userSelect: 'none' }}
          >
            {meta.key.toUpperCase()}
          </text>

          {active && (
            <circle cx={r} cy={r} r={r + 10}
              fill="none" stroke={meta.color} strokeWidth="0.8"
              strokeOpacity="0.35" strokeDasharray="3 5"
            >
              <animateTransform attributeName="transform" type="rotate"
                from={`0 ${r} ${r}`} to={`360 ${r} ${r}`} dur="10s" repeatCount="indefinite" />
            </circle>
          )}
        </svg>
      </motion.div>
    </div>
  )
}

function OrbitCanvas({ active, onSelect, size = 540 }) {
  const center = size / 2

  return (
    <div className="relative flex-shrink-0" style={{ width: size, height: size }}>
      <svg
        width={size} height={size}
        className="absolute inset-0 pointer-events-none"
        style={{ overflow: 'visible' }}
      >
        {ASTEROIDS.map(a => (
          <circle key={a.key}
            cx={center} cy={center} r={a.orbitR}
            fill="none" stroke={a.color}
            strokeWidth="0.4" strokeOpacity={active === a.key ? '0.22' : '0.07'}
            strokeDasharray="2 10"
          />
        ))}
        {/* Core — no label */}
        <circle cx={center} cy={center} r="24" fill="none" stroke="#e8c97e" strokeWidth="0.5" strokeOpacity="0.12" />
        <circle cx={center} cy={center} r="14" fill="#0e0e1a" stroke="#e8c97e" strokeWidth="0.8" strokeOpacity="0.18" />
        <circle cx={center} cy={center} r="5"  fill="#e8c97e" fillOpacity="0.3" />
        <circle cx={center} cy={center} r="2"  fill="#e8c97e" fillOpacity="0.75" />
      </svg>

      {ASTEROIDS.map(a => (
        <Asteroid
          key={a.key}
          meta={a}
          center={center}
          active={active === a.key}
          onClick={() => onSelect(active === a.key ? null : a.key)}
        />
      ))}
    </div>
  )
}

function SkillPanel({ activeKey }) {
  const group = skills.find(s => s.group === activeKey)
  const meta  = ASTEROIDS.find(a => a.key === activeKey)

  return (
    <div className="flex-1 flex flex-col justify-center min-h-[420px] w-full max-w-md">
      <AnimatePresence mode="wait">
        {activeKey && group && meta ? (
          <motion.div
            key={activeKey}
            initial={{ opacity: 0, x: 28, filter: 'blur(4px)' }}
            animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, x: -16, filter: 'blur(4px)' }}
            transition={{ duration: 0.38, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="flex items-center gap-4 mb-8">
              <motion.div
                className="h-10 w-1.5 rounded-full"
                style={{ background: meta.color }}
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 0.35 }}
              />
              <div>
                <p className="font-mono text-[10px] tracking-[0.3em] mb-1" style={{ color: meta.color, opacity: 0.55 }}>
                  CATEGORY
                </p>
                <h3 className="font-display text-3xl font-bold text-white/88 tracking-tight leading-none">
                  {group.group}
                </h3>
              </div>
            </div>

            <div className="space-y-1.5">
              {group.items.map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: 18 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 + i * 0.06, duration: 0.3 }}
                  className="group flex items-center gap-4 py-3 px-4 rounded-lg border border-white/[0.045] hover:border-white/[0.1] cursor-default transition-all duration-200"
                  style={{ background: 'rgba(14,14,26,0.5)' }}
                >
                  <motion.div
                    className="w-1.5 h-1.5 rounded-full fle x-shrink-0"
                    style={{ background: meta.color }}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.12 + i * 0.06 }}
                  />
                  <span className="font-body text-sm text-white/58 group-hover:text-white/82 transition-colors duration-200 flex-1">
                    {item}
                  </span>
                  <motion.div
                    className="h-px w-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: `linear-gradient(90deg, ${meta.color}50, transparent)` }}
                  />
                </motion.div>
              ))}
            </div>

            <p className="font-mono text-[10px] text-white/15 mt-8 tracking-[0.2em]">
              CLICK ANOTHER ASTEROID TO SWITCH ·· CLICK AGAIN TO DESELECT
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="idle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col justify-center"
          >
            <p className="font-mono text-[10px] tracking-[0.3em] text-white/25 mb-6">ALL SKILLS</p>
            <div className="space-y-5">
              {ASTEROIDS.map((a, gi) => {
                const grp = skills.find(s => s.group === a.key)
                if (!grp) return null
                return (
                  <motion.div
                    key={a.key}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: gi * 0.07, duration: 0.35 }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-1 h-3 rounded-full" style={{ background: a.color, opacity: 0.6 }} />
                      <span className="font-mono text-[10px] tracking-widest" style={{ color: a.color, opacity: 0.55 }}>
                        {a.key.toUpperCase()}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1.5 pl-3">
                      {grp.items.map((item, i) => (
                        <motion.span
                          key={item}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: gi * 0.07 + i * 0.03 }}
                          className="font-mono text-[11px] px-2.5 py-1 rounded border border-white/[0.06] bg-white/[0.02] text-white/40"
                        >
                          {item}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>
                )
              })}
            </div>
            <p className="font-mono text-[10px] text-white/15 mt-8 tracking-[0.2em]">
              CLICK AN ASTEROID TO FOCUS A CATEGORY
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function MobileSkills() {
  const [active, setActive] = useState(null)
  const group = skills.find(s => s.group === active)
  const meta  = ASTEROIDS.find(a => a.key === active)

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-3">
        {ASTEROIDS.map(a => (
          <button
            key={a.key}
            onClick={() => setActive(active === a.key ? null : a.key)}
            className="relative flex items-center gap-3 px-4 py-3 rounded-xl border transition-all duration-200"
            style={{
              borderColor: active === a.key ? `${a.color}60` : 'rgba(255,255,255,0.06)',
              background: active === a.key ? `${a.color}0c` : 'rgba(14,14,26,0.5)',
            }}
          >
            <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: a.color, opacity: active === a.key ? 1 : 0.4 }} />
            <span className="font-display text-sm font-semibold" style={{ color: active === a.key ? a.color : 'rgba(255,255,255,0.45)' }}>
              {a.key}
            </span>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {active && group && meta && (
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.3 }}
            className="border border-white/[0.05] rounded-xl overflow-hidden"
          >
            {group.items.map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 px-4 py-3 border-b border-white/[0.04] last:border-b-0"
                style={{ background: 'rgba(14,14,26,0.5)' }}
              >
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: meta.color, opacity: 0.6 }} />
                <span className="font-body text-sm text-white/60">{item}</span>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function Skills() {
  const [active, setActive] = useState(null)
  const { ref, inView }     = useInView({ triggerOnce: true, threshold: 0.08 })

  return (
    <section id="skills" className="relative py-28 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading
          index="01"
          title="Skills"
          sub="Click an asteroid to explore the stack."
        />

        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7 }}
          className="hidden lg:flex items-center gap-4"
        >
          <OrbitCanvas active={active} onSelect={setActive} size={540} />
          <SkillPanel activeKey={active} />
        </motion.div>

        <div className="lg:hidden">
          <MobileSkills />
        </div>
      </div>
    </section>
  )
}