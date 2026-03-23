/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        orbitron: ['Orbitron', 'sans-serif'],
        rajdhani: ['Rajdhani', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        void:    { DEFAULT: '#02020e', 50: '#0a0a1a', 100: '#060612' },
        cyan:    { neon: '#00d4ff', glow: 'rgba(0,212,255,0.3)' },
        violet:  { neon: '#7c3aed', glow: 'rgba(124,58,237,0.3)' },
        rose:    { neon: '#ff2d78', glow: 'rgba(255,45,120,0.3)' },
        emerald: { neon: '#00ff88', glow: 'rgba(0,255,136,0.3)' },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':  'conic-gradient(var(--tw-gradient-stops))',
        'space': 'radial-gradient(ellipse at 20% 50%, rgba(124,58,237,0.15) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(0,212,255,0.1) 0%, transparent 60%), radial-gradient(ellipse at 50% 80%, rgba(255,45,120,0.08) 0%, transparent 60%)',
      },
      animation: {
        'pulse-slow':   'pulse 3s ease-in-out infinite',
        'spin-slow':    'spin 20s linear infinite',
        'float':        'float 6s ease-in-out infinite',
        'glow-pulse':   'glowPulse 2s ease-in-out infinite',
        'scanline':     'scanline 8s linear infinite',
        'typing':       'typing 3s steps(30) 1s 1 normal both',
        'blink':        'blink 1s steps(2) infinite',
      },
      
      keyframes: {
        float:     { '0%,100%': { transform: 'translateY(0px)' }, '50%': { transform: 'translateY(-20px)' } },
        glowPulse: { '0%,100%': { opacity: '0.6' }, '50%': { opacity: '1' } },
        scanline:  { '0%': { transform: 'translateY(-100%)' }, '100%': { transform: 'translateY(100vh)' } },
        typing:    { from: { width: '0' }, to: { width: '100%' } },
        blink:     { '0%,100%': { borderColor: 'transparent' }, '50%': { borderColor: '#00d4ff' } },
      },
      backdropBlur: { xs: '2px' },
      boxShadow: {
        'neon-cyan':   '0 0 20px rgba(0,212,255,0.5), 0 0 60px rgba(0,212,255,0.2)',
        'neon-violet': '0 0 20px rgba(124,58,237,0.5), 0 0 60px rgba(124,58,237,0.2)',
        'neon-rose':   '0 0 20px rgba(255,45,120,0.5), 0 0 60px rgba(255,45,120,0.2)',
        'glass':       '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)',
        'card-hover':  '0 20px 60px rgba(0,212,255,0.15), 0 0 0 1px rgba(0,212,255,0.2)',
      },
    },
  },
  plugins: [],
}
