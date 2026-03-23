import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import SectionReveal from '../ui/SectionReveal'
import SectionHeading from '../ui/SectionHeading'
import { useTilt } from '../../hooks/useTilt'
import { projects } from '../../data/portfolioData'
import { ExternalLink, Github, Star } from 'lucide-react'

const CATEGORIES = ['All', 'AI', 'Full-Stack']

function ProjectCard({ project, index }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })
  const tilt = useTilt(10)
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1 }}
      className="relative"
    >
      <div
        ref={tilt.ref}
        onMouseMove={tilt.onMouseMove}
        onMouseLeave={() => { tilt.onMouseLeave(); setHovered(false) }}
        onMouseEnter={() => setHovered(true)}
        className="relative glass border border-white/10 rounded-2xl overflow-hidden group h-full flex flex-col backdrop-blur-xl"
        style={{
          transformStyle: 'preserve-3d',
          boxShadow: hovered
            ? `0 30px 100px ${project.color}25, inset 0 0 40px ${project.color}10`
            : '0 10px 40px rgba(0,0,0,0.3)',
        }}
      >

        {/* 🔥 Top Glow Line */}
        <div
          className="h-[2px] w-full"
          style={{
            background: `linear-gradient(90deg, transparent, ${project.color}, transparent)`
          }}
        />

        {/* 🔮 Holographic Core */}
        {/* <div className="relative h-40 flex items-center justify-center overflow-hidden">

          
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:20px_20px]" />

          
          <motion.div
            className="absolute w-32 h-32 rounded-full"
            style={{
              border: `1px solid ${project.color}40`,
              boxShadow: `0 0 40px ${project.color}40`,
            }}
            animate={hovered ? { scale: [1, 1.1, 1], opacity: [0.6, 1, 0.6] } : {}}
            transition={{ duration: 2, repeat: Infinity }}
          />

          
          <motion.div
            className="absolute w-40 h-40 rounded-full border border-dashed"
            style={{ borderColor: `${project.color}30` }}
            animate={hovered ? { rotate: 360 } : { rotate: 0 }}
            transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
          />

          
          <div
            className="relative z-10 w-14 h-14 rounded-xl flex items-center justify-center"
            style={{
              background: `${project.color}15`,
              border: `1px solid ${project.color}50`,
              boxShadow: `0 0 25px ${project.color}50`,
            }}
          >
            <i className="fa-solid fa-cube text-xl" style={{ color: project.color }} />
          </div>

          
          <div className="absolute top-3 left-3 text-[10px] font-mono px-2 py-1 rounded-full glass border border-white/10"
            style={{ color: project.color }}>
            {project.category}
          </div>

          
          <div className="absolute top-3 right-3 flex items-center gap-1 glass px-2 py-1 rounded-full">
            <Star size={10} className="text-yellow-400" />
            <span className="text-[10px] text-white/60 font-mono">
              {project.stars}
            </span>
          </div>
        </div> */}

        {/* 📦 Content */}
        <div className="p-5 flex flex-col gap-3 flex-1">

          {/* Title */}
          <h3 className="font-orbitron text-base font-bold text-white group-hover:text-[#00d4ff] transition">
            {project.title}
          </h3>

          {/* Description */}
          <p className="text-sm text-white/50 leading-relaxed flex-1">
            {project.description}
          </p>

          {/* Features */}
          <div className="flex flex-wrap gap-2">
            {project.features.map(f => (
              <span
                key={f}
                className="text-[10px] font-mono px-2 py-1 rounded-full border backdrop-blur-md"
                style={{
                  borderColor: `${project.color}30`,
                  color: project.color,
                  background: `${project.color}10`,
                }}
              >
                {f}
              </span>
            ))}
          </div>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2 pt-1">
            {project.tech.map(t => (
              <span
                key={t}
                className="text-[10px] font-mono px-2 py-1 rounded-md bg-white/5 text-white/40 border border-white/10 hover:text-white transition"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* 🚀 Footer */}
        <div className="px-5 pb-5 flex items-center gap-3">

          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-sm text-white/50 hover:text-white transition"
            onClick={e => e.stopPropagation()}
          >
            <Github size={14} /> Code
          </a>

          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-auto flex items-center gap-1 text-sm px-4 py-1.5 rounded-lg transition hover:scale-105"
            style={{
              background: `${project.color}20`,
              border: `1px solid ${project.color}50`,
              color: project.color,
            }}
            onClick={e => e.stopPropagation()}
          >
            <ExternalLink size={12} /> Live
          </a>

        </div>
      </div>
    </motion.div>
  )
}

export default function Projects() {
  const [filter, setFilter] = useState('All')
  const filtered = filter === 'All' ? projects : projects.filter(p => p.category === filter)

  return (
    <section id="projects" className="relative py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading
          label="03 — Projects"
          title="Featured Work"
          subtitle="A selection of projects that push the boundaries of what's possible."
        />

        {/* Filter tabs */}
        <SectionReveal className="flex flex-wrap justify-center gap-2 mb-12">
          {CATEGORIES.map(cat => (
            <motion.button
              key={cat}
              onClick={() => setFilter(cat)}
              whileTap={{ scale: 0.96 }}
              className={`font-orbitron text-xs font-bold px-5 py-2 rounded-xl transition-all duration-200 ${
                filter === cat
                  ? 'bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] text-[#02020e] shadow-neon-cyan'
                  : 'glass border border-white/10 text-white/50 hover:text-white hover:border-white/20'
              }`}
            >
              {cat}
            </motion.button>
          ))}
        </SectionReveal>

        {/* Grid */}
        <AnimatePresence mode="popLayout">
          <motion.div
            key={filter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6"
          >
            {filtered.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* View more */}
        <SectionReveal className="text-center mt-12">
          <a
            href="https://github.com/JYOTHSNA-DUVVADA"
            target='_blank'
            className="inline-flex items-center gap-2 font-orbitron text-sm font-bold text-[#00d4ff] border border-[#00d4ff]/30 px-8 py-3 rounded-xl hover:bg-[#00d4ff]/10 hover:shadow-neon-cyan transition-all duration-300"
          >
            <i className="fa-brands fa-github" />
            View All on GitHub
          </a>
        </SectionReveal>
      </div>
    </section>
  )
}
