import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function LoadingScreen({ onDone }) {
  const [progress, setProgress] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    let val = 0
    const id = setInterval(() => {
      val += Math.random() * 18 + 6
      if (val >= 100) {
        val = 100
        clearInterval(id)
        setTimeout(() => { setVisible(false); onDone?.() }, 600)
      }
      setProgress(Math.min(val, 100))
    }, 90)
    return () => clearInterval(id)
  }, [onDone])

  const letters = 'JYOTHSNA'.split('')

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#02020e]"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Spinning ring */}
          <div className="relative w-40 h-40 mb-10">
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-transparent"
              style={{
                borderTopColor: '#00d4ff',
                borderRightColor: '#7c3aed',
              }}
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1.2, ease: 'linear' }}
            />
            <motion.div
              className="absolute inset-4 rounded-full border border-transparent"
              style={{ borderBottomColor: '#ff2d78' }}
              animate={{ rotate: -360 }}
              transition={{ repeat: Infinity, duration: 1.8, ease: 'linear' }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                className="w-3 h-3 rounded-full bg-[#00d4ff]"
                animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                transition={{ repeat: Infinity, duration: 1.2 }}
                style={{ boxShadow: '0 0 20px #00d4ff, 0 0 40px rgba(0,212,255,0.4)' }}
              />
            </div>
          </div>

          {/* Title letters stagger */}
          <div className="flex gap-1 mb-2">
            {letters.map((l, i) => (
              <motion.span
                key={i}
                className="font-orbitron text-5xl font-black gradient-text"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
              >
                {l}
              </motion.span>
            ))}
          </div>

          <motion.p
            className="font-mono text-xs text-[#00d4ff] mb-10 tracking-widest opacity-70"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            transition={{ delay: 0.6 }}
          >
            INITIALIZING SYSTEMS...
          </motion.p>

          {/* Progress bar */}
          <div className="w-64 h-[2px] bg-white/10 rounded overflow-hidden">
            <motion.div
              className="h-full"
              style={{
                background: 'linear-gradient(90deg, #00d4ff, #7c3aed, #ff2d78)',
                boxShadow: '0 0 8px #00d4ff',
                width: `${progress}%`,
              }}
              transition={{ duration: 0.1 }}
            />
          </div>

          <motion.p
            className="font-mono text-xs text-white/30 mt-3 tracking-widest"
            animate={{ opacity: [0.3, 0.8, 0.3] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            {Math.round(progress)}%
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
