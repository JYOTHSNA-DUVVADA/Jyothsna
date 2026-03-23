import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sun, Moon, Menu, X } from 'lucide-react'
import { useScrollProgress } from '../../hooks/useScrollProgress'

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  // { label: 'Experience', href: '#experience' },
  { label: 'Achievements', href: '#achievements' },
  // { label: 'Blog', href: '#blog' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar({ theme, onToggleTheme }) {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)
  const progress = useScrollProgress()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNav = (href) => {
    setActive(href)
    setMenuOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      {/* Scroll progress */}
      <div
        id="scroll-progress"
        style={{ width: `${progress}%` }}
      />

      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-300 ${
          scrolled
            ? 'glass border-b border-white/5 shadow-[0_8px_32px_rgba(0,0,0,0.4)]'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => { e.preventDefault(); handleNav('#hero') }}
            className="font-orbitron text-xl font-black gradient-text glow-cyan select-none"
          >
            JYOTHSNA
          </a>

          {/* Desktop links */}
          <ul className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map(({ label, href }) => (
              <li key={href}>
                <button
                  onClick={() => handleNav(href)}
                  className={`font-rajdhani font-semibold text-sm px-4 py-2 rounded-lg tracking-wide transition-all duration-200 relative group ${
                    active === href
                      ? 'text-[#00d4ff]'
                      : 'text-white/60 hover:text-white'
                  }`}
                >
                  {label}
                  <span className={`absolute bottom-1 left-1/2 -translate-x-1/2 h-px w-0 bg-[#00d4ff] transition-all duration-300 group-hover:w-4/5 ${active === href ? 'w-4/5' : ''}`} />
                </button>
              </li>
            ))}
          </ul>

          {/* Right controls */}
          <div className="flex items-center gap-3">
            {/* Theme toggle */}
            {/* <motion.button
              onClick={onToggleTheme}
              whileTap={{ scale: 0.9 }}
              className="w-10 h-10 rounded-xl glass flex items-center justify-center text-white/70 hover:text-[#00d4ff] transition-colors border border-white/10"
            >
              <AnimatePresence mode="wait">
                {theme === 'dark' ? (
                  <motion.span key="sun" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <Sun size={16} />
                  </motion.span>
                ) : (
                  <motion.span key="moon" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <Moon size={16} />
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button> */}

            {/* Resume CTA */}
            <a
              href="/jyothsnaresume.pdf"
              target='_blank'
              className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl font-orbitron text-xs font-bold text-[#02020e] bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] hover:shadow-neon-cyan transition-all duration-300"
            >
              <i className="fa-solid fa-download text-xs" /> Resume
            </a>

            {/* Mobile menu btn */}
            <button
              onClick={() => setMenuOpen(m => !m)}
              className="lg:hidden w-10 h-10 rounded-xl glass flex items-center justify-center text-white/70"
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-[72px] left-4 right-4 z-[999] glass rounded-2xl p-6 border border-white/10 lg:hidden"
          >
            <ul className="flex flex-col gap-2">
              {NAV_LINKS.map(({ label, href }) => (
                <li key={href}>
                  <button
                    onClick={() => handleNav(href)}
                    className="w-full text-left font-rajdhani font-semibold text-base px-4 py-3 rounded-xl hover:bg-white/5 hover:text-[#00d4ff] text-white/70 transition-all duration-200"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
