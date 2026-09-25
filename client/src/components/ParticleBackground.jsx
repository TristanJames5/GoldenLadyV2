import { useEffect, useRef } from 'react'

export default function ParticleBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animFrame
    let particles = []
    const GOLD = 'rgba(201, 168, 76,'

    function resize() {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    class Particle {
      constructor() { this.reset() }
      reset() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 2.5 + 0.5
        this.speedY = -(Math.random() * 0.4 + 0.1)
        this.speedX = (Math.random() - 0.5) * 0.2
        this.opacity = Math.random() * 0.6 + 0.1
        this.twinkle = Math.random() * Math.PI * 2
        this.twinkleSpeed = Math.random() * 0.02 + 0.005
        // Occasionally make a diamond shape
        this.isDiamond = Math.random() > 0.85
      }
      update() {
        this.y += this.speedY
        this.x += this.speedX
        this.twinkle += this.twinkleSpeed
        this.opacity = (Math.sin(this.twinkle) * 0.3 + 0.4)
        if (this.y < -10 || this.x < -10 || this.x > canvas.width + 10) this.reset()
      }
      draw() {
        ctx.save()
        ctx.globalAlpha = this.opacity
        if (this.isDiamond) {
          ctx.fillStyle = `${GOLD} ${this.opacity})`
          ctx.beginPath()
          ctx.translate(this.x, this.y)
          ctx.rotate(Math.PI / 4)
          ctx.rect(-this.size * 0.8, -this.size * 0.8, this.size * 1.6, this.size * 1.6)
          ctx.fill()
        } else {
          ctx.fillStyle = `${GOLD} ${this.opacity})`
          ctx.beginPath()
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
          ctx.fill()
        }
        ctx.restore()
      }
    }

    // Init particles
    for (let i = 0; i < 80; i++) particles.push(new Particle())

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach(p => { p.update(); p.draw() })
      animFrame = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      cancelAnimationFrame(animFrame)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas id="particle-canvas" ref={canvasRef} />
}
