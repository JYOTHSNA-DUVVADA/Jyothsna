import { useState } from 'react'
import { useTheme } from './hooks/useTheme'

// Layout
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'

// UI
import LoadingScreen from './components/ui/LoadingScreen'
import CustomCursor from './components/ui/CustomCursor'
import ParticleBackground from './components/ui/ParticleBackground'

// Sections
import Hero from './components/sections/Hero'
import About from './components/sections/About'
import Skills from './components/sections/Skills'
import Projects from './components/sections/Projects'
import Achievements from './components/sections/Achievements'
import Contact from './components/sections/Contact'

export default function App() {
  const { theme, toggle } = useTheme()
  const [loaded, setLoaded] = useState(false)

  return (
    <>
      <LoadingScreen onDone={() => setLoaded(true)} />
      <CustomCursor />

      {loaded && (
        <div className={`relative min-h-screen ${theme === 'dark' ? 'bg-[#02020e]' : 'bg-[#f0f4ff]'}`}>
          <ParticleBackground />

          <div className="relative z-10">
            <Navbar theme={theme} onToggleTheme={toggle} />

            <main>
              <Hero />
              {/* <About /> */}
              <Skills />
              <Projects />
              <Achievements />
              <Contact />
            </main>

            <Footer />
          </div>
        </div>
      )}
    </>
  )
}
