import { motion } from 'framer-motion'
import { personalInfo } from '../../data/portfolioData'

const SOCIALS = [
  { icon: 'fa-brands fa-github', href: personalInfo.github },
  { icon: 'fa-brands fa-linkedin', href: personalInfo.linkedin },
  { icon: 'fa-brands fa-x-twitter', href: personalInfo.twitter },
  { icon: 'fa-solid fa-envelope', href: `mailto:${personalInfo.email}` },
]

const NAV = [
  ['About', '#about'],
  ['Skills', '#skills'],
  ['Projects', '#projects'],
  ['Contact', '#contact'],
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative border-t border-white/5 py-12 overflow-hidden">
      {/* Top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00d4ff]/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo + tagline */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <span className="font-orbitron text-2xl font-black gradient-text glow-cyan">JYOTHSNA</span>
            <p className="font-mono text-xs text-white/25 tracking-wider">
              Architecting digital realities.
            </p>
          </div>

          {/* Nav */}
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {NAV.map(([label, href]) => (
              <a
                key={href}
                href={href}
                onClick={(e) => {
                  e.preventDefault()
                  document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="font-rajdhani text-sm text-white/35 hover:text-[#00d4ff] transition-colors duration-200"
              >
                {label}
              </a>
            ))}
          </nav>

          {/* Socials */}
          <div className="flex items-center gap-3">
            {SOCIALS.map(({ icon, href }) => (
              <motion.a
                key={icon}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.15, y: -2 }}
                whileTap={{ scale: 0.9 }}
                className="w-9 h-9 glass rounded-xl border border-white/8 flex items-center justify-center text-white/40 hover:text-[#00d4ff] hover:border-[#00d4ff]/30 transition-all duration-200"
              >
                <i className={`${icon} text-xs`} />
              </motion.a>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-mono text-[11px] text-white/20">
            © {year} {personalInfo.name}. Crafted with{' '}
            <span className="text-[#ff2d78]">♥</span> and too much coffee.
          </p>
          <p className="font-mono text-[11px] text-white/15">
            Built with React · Vite · Tailwind · Framer Motion
          </p>
        </div>
      </div>
    </footer>
  )
}
