import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import SectionReveal from '../ui/SectionReveal'
import SectionHeading from '../ui/SectionHeading'
import { personalInfo } from '../../data/portfolioData'

export default function About() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 })

  return (
    <section id="about" className="relative py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading
          label="01 — About Me"
          title="The Engineer Behind the Code"
          subtitle="Turning complex systems into elegant experiences."
        />

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left — Avatar card */}
          <SectionReveal direction="right" delay={0.1}>
            <div className="relative flex justify-center">
              {/* Orbit rings */}
              <div className="relative w-72 h-72">
                {/* Outer ring */}
                <motion.div
                  className="absolute inset-[-30px] rounded-full border border-[#00d4ff]/15"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                >
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[#00d4ff] shadow-[0_0_10px_#00d4ff]" />
                </motion.div>

                {/* Middle ring */}
                <motion.div
                  className="absolute inset-[-14px] rounded-full border border-[#7c3aed]/20"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
                >
                  <div className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-[#7c3aed] shadow-[0_0_8px_#7c3aed]" />
                </motion.div>

                {/* Avatar placeholder */}
                <div
                  className="w-full h-full rounded-full glass border border-white/10 flex items-center justify-center overflow-hidden"
                  style={{ boxShadow: '0 0 60px rgba(0,212,255,0.15), 0 0 120px rgba(124,58,237,0.1)' }}
                >
                  <div
                    className="w-full h-full rounded-full flex items-center justify-center"
                    style={{
                      background: 'radial-gradient(circle at 40% 40%, rgba(0,212,255,0.2), rgba(124,58,237,0.2), rgba(2,2,14,0.9))',
                    }}
                  >
                    <i className="fa-solid fa-user text-8xl text-white/10" />
                  </div>
                </div>

                {/* Floating badge chips */}
                {[
                  { label: 'React', color: '#61dafb', pos: 'top-0 right-[-30px]' },
                  { label: 'AI/ML', color: '#00ff88', pos: 'bottom-8 left-[-40px]' },
                  { label: 'Cloud', color: '#ff9500', pos: 'bottom-0 right-[-20px]' },
                ].map(({ label, color, pos }) => (
                  <motion.div
                    key={label}
                    className={`absolute ${pos} glass border border-white/10 px-3 py-1 rounded-full`}
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 3 + Math.random() * 2, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <span className="font-mono text-xs font-bold" style={{ color }}>{label}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </SectionReveal>

          {/* Right — Info */}
          <div ref={ref} className="space-y-6">
            <SectionReveal delay={0.2}>
              <p className="font-rajdhani text-lg text-white/65 leading-relaxed">
                {personalInfo.bio}
              </p>
            </SectionReveal>

            {/* Highlights grid */}
            <SectionReveal delay={0.3}>
              <div className="grid grid-cols-2 gap-3 mt-8">
                {personalInfo.highlights.map(({ icon, label }, i) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.4 + i * 0.1 }}
                    className="glass border border-white/8 rounded-xl p-4 flex items-center gap-3 neon-card group"
                  >
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center"
                      style={{ background: 'linear-gradient(135deg, rgba(0,212,255,0.15), rgba(124,58,237,0.15))' }}>
                      <i className={`${icon} text-sm text-[#00d4ff]`} />
                    </div>
                    <span className="font-rajdhani font-semibold text-sm text-white/80">{label}</span>
                  </motion.div>
                ))}
              </div>
            </SectionReveal>

            {/* Info row */}
            <SectionReveal delay={0.5}>
              <div className="flex flex-wrap gap-6 pt-2">
                <div className="flex items-center gap-2 text-white/50 font-rajdhani text-sm">
                  <i className="fa-solid fa-location-dot text-[#00d4ff]" />
                  {personalInfo.location}
                </div>
                <div className="flex items-center gap-2 text-white/50 font-rajdhani text-sm">
                  <i className="fa-solid fa-envelope text-[#7c3aed]" />
                  {personalInfo.email}
                </div>
              </div>
            </SectionReveal>
          </div>
        </div>
      </div>
    </section>
  )
}
