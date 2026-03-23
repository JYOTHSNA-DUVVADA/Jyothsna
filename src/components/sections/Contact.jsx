import { useState } from 'react'
import { motion } from 'framer-motion'
import SectionReveal from '../ui/SectionReveal'
import SectionHeading from '../ui/SectionHeading'
import { personalInfo } from '../../data/portfolioData'
import { Send, CheckCircle } from 'lucide-react'

const SOCIALS = [
  { icon: 'fa-brands fa-github', label: 'GitHub', href: personalInfo.github, color: '#fff' },
  { icon: 'fa-brands fa-linkedin', label: 'LinkedIn', href: personalInfo.linkedin, color: '#0a66c2' },
  { icon: 'fa-brands fa-x-twitter', label: 'Twitter / X', href: personalInfo.twitter, color: '#fff' },
  { icon: 'fa-solid fa-envelope', label: personalInfo.email, href: `mailto:${personalInfo.email}`, color: '#00d4ff' },
]

function InputField({ label, id, type = 'text', value, onChange, error, placeholder, multiline = false }) {
  const base = `w-full glass border rounded-xl px-4 py-3 font-rajdhani text-sm text-white/80 placeholder:text-white/20 outline-none transition-all duration-300 focus:border-[#00d4ff]/50 focus:shadow-[0_0_16px_rgba(0,212,255,0.12)] bg-transparent ${error ? 'border-[#ff2d78]/50' : 'border-white/10'}`

  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="font-mono text-xs text-white/40 tracking-wider">{label}</label>
      {multiline ? (
        <textarea
          id={id}
          rows={5}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`${base} resize-none`}
        />
      ) : (
        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={base}
        />
      )}
      {error && <p className="font-mono text-[10px] text-[#ff2d78]">{error}</p>}
    </div>
  )
}

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!form.email.trim()) e.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Invalid email address'
    if (!form.subject.trim()) e.subject = 'Subject is required'
    if (!form.message.trim()) e.message = 'Message is required'
    else if (form.message.trim().length < 10) e.message = 'Message is too short'
    return e
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    setSending(true)
    await new Promise(r => setTimeout(r, 1800)) // simulate
    setSending(false)
    setSent(true)
  }

  const set = (field) => (e) => {
    setForm(f => ({ ...f, [field]: e.target.value }))
    setErrors(er => ({ ...er, [field]: undefined }))
  }

  return (
    <section id="contact" className="relative py-32 overflow-hidden">
      {/* BG glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full blur-[120px] opacity-[0.06] pointer-events-none"
        style={{ background: 'linear-gradient(135deg, #ff2d78, #7c3aed)' }} />

      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading
          label="07 — Contact"
          title="Let's Build Together"
          subtitle="Have an idea, opportunity, or just want to connect? My inbox is always open."
        />

        <div className="grid lg:grid-cols-5 gap-10">
          {/* Left — social panel */}
          <SectionReveal direction="right" className="lg:col-span-2 space-y-6">
            <div className="glass border border-white/8 rounded-2xl p-6 space-y-5">
              <p className="font-rajdhani text-sm text-white/50 leading-relaxed">
                I'm currently open to full-time positions, freelance projects, and interesting collaborations. Whether it's a quick question or a long-term partnership — let's talk.
              </p>

              <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

              <div className="space-y-3">
                {SOCIALS.map(({ icon, label, href, color }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-all duration-200 group"
                  >
                    <div className="w-9 h-9 rounded-lg glass flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform"
                      style={{ border: `1px solid ${color}30` }}>
                      <i className={`${icon} text-sm`} style={{ color }} />
                    </div>
                    <span className="font-rajdhani text-sm text-white/60 group-hover:text-white/90 transition-colors truncate">
                      {label}
                    </span>
                    <i className="fa-solid fa-arrow-up-right-from-square text-[10px] text-white/20 ml-auto group-hover:text-white/50 transition-colors" />
                  </a>
                ))}
              </div>
            </div>

            {/* Availability */}
            <div className="glass border border-[#00ff88]/20 rounded-2xl p-4 flex items-center gap-4">
              <motion.div
                className="w-3 h-3 rounded-full bg-[#00ff88] flex-shrink-0"
                animate={{ scale: [1, 1.4, 1], opacity: [1, 0.6, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                style={{ boxShadow: '0 0 12px #00ff88' }}
              />
              <div>
                <p className="font-orbitron text-xs font-bold text-[#00ff88]">Available for Work</p>
                <p className="font-rajdhani text-xs text-white/40">Response within 24 hours</p>
              </div>
            </div>
          </SectionReveal>

          {/* Right — form */}
          <SectionReveal direction="left" delay={0.2} className="lg:col-span-3">
            <div className="glass border border-white/8 rounded-2xl p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 rounded-full blur-3xl opacity-[0.04] pointer-events-none"
                style={{ background: '#00d4ff', transform: 'translate(30%, -30%)' }} />

              {sent ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-16 gap-4 text-center"
                >
                  <motion.div
                    animate={{ scale: [0.8, 1.1, 1] }}
                    transition={{ duration: 0.5 }}
                  >
                    <CheckCircle size={56} className="text-[#00ff88]" style={{ filter: 'drop-shadow(0 0 16px #00ff88)' }} />
                  </motion.div>
                  <h3 className="font-orbitron text-lg font-bold gradient-text">Message Sent!</h3>
                  <p className="font-rajdhani text-sm text-white/50">Thanks for reaching out. I'll get back to you within 24 hours.</p>
                  <button
                    onClick={() => { setSent(false); setForm({ name: '', email: '', subject: '', message: '' }) }}
                    className="mt-4 font-orbitron text-xs font-bold text-[#00d4ff] border border-[#00d4ff]/30 px-6 py-2.5 rounded-xl hover:bg-[#00d4ff]/10 transition-all"
                  >
                    Send Another
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <InputField label="NAME" id="name" value={form.name} onChange={set('name')} placeholder="Your fullname " error={errors.name} />
                    <InputField label="EMAIL" id="email" type="email" value={form.email} onChange={set('email')} placeholder="example@email.com" error={errors.email} />
                  </div>
                  <InputField label="SUBJECT" id="subject" value={form.subject} onChange={set('subject')} placeholder="Let's collaborate on..." error={errors.subject} />
                  <InputField label="MESSAGE" id="message" value={form.message} onChange={set('message')} placeholder="Tell me about your project or idea..." error={errors.message} multiline />

                  <motion.button
                    type="submit"
                    disabled={sending}
                    whileTap={{ scale: 0.97 }}
                    className="w-full flex items-center justify-center gap-3 py-3.5 rounded-xl font-orbitron text-sm font-bold text-[#02020e] bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] hover:shadow-neon-cyan transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {sending ? (
                      <>
                        <motion.div
                          className="w-4 h-4 border-2 border-[#02020e]/30 border-t-[#02020e] rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}
                        />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={16} />
                        Send Message
                      </>
                    )}
                  </motion.button>
                </form>
              )}
            </div>
          </SectionReveal>
        </div>
      </div>
    </section>
  )
}
