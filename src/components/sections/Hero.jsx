import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { personalInfo } from '../../data/portfolioData'
import SectionReveal from '../ui/SectionReveal'

const ROLES = [
  'Full-Stack Engineer',
  'AI/ML Architect',
  'Problem Solver'
]

function TypedRole() {
  const [roleIdx, setRoleIdx] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [deleting, setDeleting] = useState(false)
  const [charIdx, setCharIdx] = useState(0)

  useEffect(() => {
    const current = ROLES[roleIdx]
    let timeout

    if (!deleting) {
      if (charIdx < current.length) {
        timeout = setTimeout(() => {
          setDisplayed(current.slice(0, charIdx + 1))
          setCharIdx(c => c + 1)
        }, 60)
      } else {
        timeout = setTimeout(() => setDeleting(true), 2000)
      }
    } else {
      if (charIdx > 0) {
        timeout = setTimeout(() => {
          setDisplayed(current.slice(0, charIdx - 1))
          setCharIdx(c => c - 1)
        }, 35)
      } else {
        setDeleting(false)
        setRoleIdx(r => (r + 1) % ROLES.length)
      }
    }
    return () => clearTimeout(timeout)
  }, [charIdx, deleting, roleIdx])

  return (
    <span className="text-[#00d4ff] glow-cyan">
      {displayed}
      <span className="animate-blink border-r-2 border-[#00d4ff] ml-0.5" />
    </span>
  )
}

export default function Hero() {
  return (
    <section id='about' className="relative min-h-screen flex items-center justify-center overflow-hidden grid-overlay px-6">
      
      {/* Background */}
      <div className="absolute inset-0 bg-space pointer-events-none" />


      <motion.div
        className="absolute left-[-8%] bottom-[5%] w-[300px] h-[300px] rounded-full opacity-10"
        style={{ background: 'radial-gradient(circle, #ff2d78, #02020e)' }}
        animate={{ rotate: -360 }}
        transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
      />

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl w-full grid lg:grid-cols-2 gap-16 items-center">

        {/* Left — Avatar card */}
        <SectionReveal direction="right" delay={0.1}>
          <div className="relative flex justify-center mt-30 lg:mt-0">
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
                className="w-full h-full rounded-full glass border border-white/10 flex items-center justify-center overflow-hidden relative"
                style={{
                  boxShadow:
                    '0 0 60px rgba(0,212,255,0.15), 0 0 120px rgba(124,58,237,0.1)',
                }}
              >
                {/* Background glow */}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      'radial-gradient(circle at 40% 40%, rgba(0,212,255,0.2), rgba(124,58,237,0.2), rgba(2,2,14,0.9))',
                  }}
                />

                {/* Profile Image */}
                <img
                  src="/m1.jpg"
                  alt="profile"
                  className="relative z-10 w-full h-full object-cover rounded-full"
                />
              </div>

              {/* Floating badge chips */}
              {[
                { label: 'React', color: '#61dafb', pos: 'top-0 right-[-30px]' },
                { label: 'AI/ML', color: '#00ff88', pos: 'bottom-8 left-[-40px]' },
                { label: 'DSA', color: '#ff9500', pos: 'bottom-0 right-[-20px]' },
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

        {/* RIGHT — Content */}
        <div className="text-center lg:text-left">


          {/* Name */}
          <h1 className="font-orbitron text-5xl md:text-7xl font-black mb-4">
            <span className="gradient-text">{personalInfo.name}</span>
          </h1>

          {/* Role */}
          <div className="text-xl md:text-2xl mb-4">
            <TypedRole />
          </div>

          {/* Bio */}
          <p className="text-white/60 max-w-xl mb-6">
            {personalInfo.bio}
          </p>

          {/* Highlights */}
          <div className="grid grid-cols-2 gap-3 mb-8">
            {personalInfo.highlights.map(({ icon, label }) => (
              <div
                key={label}
                className="glass border border-white/10 rounded-xl p-3 flex items-center gap-3"
              >
                <i className={`${icon} text-[#00d4ff]`} />
                <span className="text-sm text-white/80">{label}</span>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="flex flex-wrap gap-4 justify-center lg:justify-start mb-6">
            <a
              href={personalInfo.resume}
              target='_blank'
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] text-black font-bold"
            >
              Resume
            </a>

            <a
              href={personalInfo.github}
              target='_blank'
              className="px-6 py-3 rounded-xl border border-white/20 text-white"
            >
              GitHub
            </a>
          </div>

          {/* Social */}
          <div className="flex gap-4 justify-center lg:justify-start">
            <a href={personalInfo.linkedin}><i className="fa-brands fa-linkedin" /></a>
            <a href={personalInfo.github}><i className="fa-brands fa-github" /></a>
            <a href={`mailto:${personalInfo.email}`}><i className="fa-solid fa-envelope" /></a>
          </div>

        </div>
      </div>
    </section>
  )
}