import { useEffect, useRef } from 'react'

export default function ParticleBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId
    let W = canvas.width = window.innerWidth
    let H = canvas.height = window.innerHeight

    const COLORS = ['rgba(0,212,255,', 'rgba(124,58,237,', 'rgba(255,45,120,', 'rgba(0,255,136,']

    class Star {
      constructor() { this.reset() }
      reset() {
        this.x = Math.random() * W
        this.y = Math.random() * H
        this.r = Math.random() * 1.5 + 0.2
        this.alpha = Math.random() * 0.7 + 0.1
        this.da = (Math.random() - 0.5) * 0.005
        this.vx = (Math.random() - 0.5) * 0.12
        this.vy = (Math.random() - 0.5) * 0.12
        this.colorBase = COLORS[Math.floor(Math.random() * COLORS.length)]
      }
      update() {
        this.x += this.vx; this.y += this.vy
        this.alpha += this.da
        if (this.alpha < 0.05 || this.alpha > 0.9) this.da *= -1
        if (this.x < 0 || this.x > W || this.y < 0 || this.y > H) this.reset()
      }
      draw() {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2)
        ctx.fillStyle = this.colorBase + this.alpha + ')'
        ctx.fill()
      }
    }

    class Nebula {
      constructor() {
        this.x = Math.random() * W
        this.y = Math.random() * H
        this.r = Math.random() * 200 + 80
        this.colorBase = COLORS[Math.floor(Math.random() * COLORS.length)]
        this.alpha = Math.random() * 0.04 + 0.01
        this.vx = (Math.random() - 0.5) * 0.05
        this.vy = (Math.random() - 0.5) * 0.05
      }
      update() {
        this.x += this.vx; this.y += this.vy
        if (this.x < -this.r) this.x = W + this.r
        if (this.x > W + this.r) this.x = -this.r
        if (this.y < -this.r) this.y = H + this.r
        if (this.y > H + this.r) this.y = -this.r
      }
      draw() {
        const g = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.r)
        g.addColorStop(0, this.colorBase + this.alpha + ')')
        g.addColorStop(1, 'rgba(0,0,0,0)')
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2)
        ctx.fillStyle = g
        ctx.fill()
      }
    }

    const stars = Array.from({ length: 160 }, () => new Star())
    const nebulae = Array.from({ length: 6 }, () => new Nebula())
    const CONN_DIST = 120

    function drawConnections() {
      for (let i = 0; i < stars.length; i++) {
        for (let j = i + 1; j < stars.length; j++) {
          const dx = stars[i].x - stars[j].x
          const dy = stars[i].y - stars[j].y
          const d = Math.sqrt(dx * dx + dy * dy)
          if (d < CONN_DIST) {
            ctx.beginPath()
            ctx.moveTo(stars[i].x, stars[i].y)
            ctx.lineTo(stars[j].x, stars[j].y)
            ctx.strokeStyle = `rgba(0,212,255,${(1 - d / CONN_DIST) * 0.08})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }
    }

    function loop() {
      ctx.clearRect(0, 0, W, H)
      nebulae.forEach(n => { n.update(); n.draw() })
      drawConnections()
      stars.forEach(s => { s.update(); s.draw() })
      animId = requestAnimationFrame(loop)
    }
    loop()

    const onResize = () => {
      W = canvas.width = window.innerWidth
      H = canvas.height = window.innerHeight
    }
    window.addEventListener('resize', onResize)
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0, opacity: 0.85 }}
    />
  )
}
