import SectionReveal from './SectionReveal'

export default function SectionHeading({ label, title, subtitle, align = 'center' }) {
  return (
    <SectionReveal className={`mb-16 ${align === 'center' ? 'text-center' : 'text-left'}`}>
      {/* <p className="font-mono text-xs tracking-[0.3em] text-[#00d4ff] mb-3 uppercase opacity-80">
        {'// '}{label}
      </p> */}
      <h2 className="font-orbitron text-4xl md:text-5xl font-black mb-4">
        <span className="gradient-text">{title}</span>
      </h2>
      {subtitle && (
        <p className="font-rajdhani text-lg text-white/50 max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
      <div className={`mt-6 h-px bg-gradient-to-r from-transparent via-[#00d4ff]/40 to-transparent ${align === 'center' ? '' : 'max-w-xs'}`} />
    </SectionReveal>
  )
}
