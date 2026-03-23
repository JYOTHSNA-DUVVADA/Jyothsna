import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import SectionReveal from '../ui/SectionReveal'
import SectionHeading from '../ui/SectionHeading'
import { achievements } from '../../data/portfolioData'

function AchievementCard({ item, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      viewport={{ once: true }}
      className="relative group"
    >
      <div className="glass border border-white/10 rounded-2xl p-5 hover:scale-[1.02] transition-all duration-300">

        {/* Glow */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 rounded-2xl"
          style={{ background: `radial-gradient(circle at 50% 0%, ${item.color}20, transparent 70%)` }}
        />

        <div className="relative z-10 flex items-start gap-4">

          {/* Icon */}
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center"
            style={{
              background: `${item.color}20`,
              border: `1px solid ${item.color}40`,
              boxShadow: `0 0 20px ${item.color}40`,
            }}
          >
            <i className="fa-solid fa-trophy text-lg" style={{ color: item.color }} />
          </div>

          {/* Content */}
          <div>
            <h4 className="font-orbitron text-sm font-bold text-white mb-1">
              {item.label}
            </h4>
            <p className="text-sm text-white/50">
              <span className="text-white font-bold">
                {item.value}{item.suffix}
              </span>
              {' '}— {item.description || 'Key milestone achieved'}
            </p>
          </div>

        </div>
      </div>
    </motion.div>
  )
}

export default function Achievements() {
  return (
    <section id='achievements' className="relative py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">

        <SectionHeading
          label="05 — Achievements"
          title="Impact & Milestones"
          subtitle="Not just numbers — real impact, real growth."
        />

        {/* 🔥 Highlight Cards (MAIN FOCUS) */}
        <div className="grid md:grid-cols-3 gap-6 mb-20">

          {achievements.slice(0, 3).map((a, i) => (
            <div
              key={a.label}
              className="relative glass border border-white/10 rounded-2xl p-8 text-center group overflow-hidden"
            >
              {/* Glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition"
                style={{
                  background: `radial-gradient(circle at center, ${a.color}20, transparent 70%)`
                }}
              />

              <div className="relative z-10">
                <h2
                  className="text-4xl font-orbitron font-black mb-2"
                  style={{ color: a.color }}
                >
                  {a.value}{a.suffix}
                </h2>

                <p className="text-white/60 font-semibold">
                  {a.label}
                </p>
              </div>
            </div>
          ))}

        </div>

        {/* 🧠 Achievement Timeline */}
        <div className="grid md:grid-cols-2 gap-6 mb-20">
          {achievements.map((item, i) => (
            <AchievementCard key={item.label} item={item} index={i} />
          ))}
        </div>

        {/* 🏆 Certifications */}
        <SectionReveal>
          <h3 className="text-center font-orbitron text-lg mb-8 gradient-text">
            Certifications
          </h3>

          {/* <div className="flex flex-wrap justify-center gap-4">
            {certifications.map(cert => (
              <div
                key={cert.name}
                className="px-5 py-3 rounded-xl border border-white/10 glass text-sm font-mono text-white/70 hover:scale-105 transition"
                style={{
                  borderColor: `${cert.color}40`,
                  color: cert.color,
                }}
              >
                {cert.name}
              </div>
            ))}
          </div> */}
        </SectionReveal>

        {/* 🧩 LeetCode HERO CARD */}
        <SectionReveal delay={0.3} className="mt-16">
          <div className="relative glass border border-[#ffd700]/30 rounded-2xl p-8 flex flex-col md:flex-row items-center gap-8 overflow-hidden">

            {/* Glow */}
            <div
              className="absolute inset-0 opacity-10"
              style={{
                background: 'radial-gradient(circle at 30% 50%, #ffd700, transparent 60%)'
              }}
            />

            {/* Icon */}
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center"
              style={{
                background: 'rgba(255,215,0,0.15)',
                border: '1px solid rgba(255,215,0,0.4)'
              }}>
              <i className="fa-solid fa-code text-2xl text-[#ffd700]" />
            </div>

            {/* Content */}
            <div>
              <h3 className="font-orbitron text-lg font-bold text-white mb-2">
                LeetCode Excellence
              </h3>

              <p className="text-white/60">
                Solved <span className="text-[#ffd700] font-bold">160+</span> problems,
              </p>
            </div>

            {/* CTA */}
            <a
              href="https://leetcode.com/u/jyothsna_Duvvada/"
              target="_blank"
              rel="noopener noreferrer"
              className="
                ml-auto relative group px-7 py-3 rounded-xl 
                border border-[#ffd700]/30 
                text-[#ffd700] font-medium tracking-wide
                overflow-hidden
                transition-all duration-300
              "
            >
              {/* Glow background */}
              <span className="absolute inset-0 bg-gradient-to-r from-[#ffd700]/0 via-[#ffd700]/20 to-[#ffd700]/0 opacity-0 group-hover:opacity-100 blur-md transition duration-500"></span>

              {/* Shine effect */}
              <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition duration-700 bg-gradient-to-r from-transparent via-white/30 to-transparent"></span>

              {/* Text */}
              <span className="relative z-10 flex items-center gap-2">
                View Profile
                <span className="transform group-hover:translate-x-1 transition">→</span>
              </span>
            </a>

          </div>
        </SectionReveal>

      </div>
    </section>
  )
}