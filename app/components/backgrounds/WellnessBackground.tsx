"use client"

import { useEffect, useRef } from "react"

const WellnessBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const leaves: Leaf[] = []
    const leafCount = 40

    class Leaf {
      x: number
      y: number
      size: number
      angle: number
      color: string
      speed: number

      constructor() {
        this.x = Math.random() * (canvas?.width ?? 0)
        this.y = Math.random() * (canvas?.height ?? 0)
        this.size = Math.random() * 20 + 10
        this.angle = Math.random() * Math.PI * 2
        this.color = `hsla(${120 + Math.random() * 60}, 70%, 70%, 0.6)`
        this.speed = Math.random() * 0.5 + 0.1
      }
      update() {
        this.y += Math.sin(this.angle) * this.speed
        this.x += Math.cos(this.angle) * this.speed
        this.angle += 0.01

        if (canvas) {
          if (this.x > canvas.width) this.x = 0
          else if (this.x < 0) this.x = canvas.width

          if (this.y > canvas.height) this.y = 0
          else if (this.y < 0) this.y = canvas.height
        }
      }
      draw() {
        if (!ctx) return
        ctx.save()
        ctx.translate(this.x, this.y)
        ctx.rotate(this.angle)
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.ellipse(0, 0, this.size / 2, this.size, 0, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      }
    }

    const init = () => {
      for (let i = 0; i < leafCount; i++) {
        leaves.push(new Leaf())
      }
    }

    const animate = () => {
      if (!ctx) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (const leaf of leaves) {
        leaf.update()
        leaf.draw()
      }

      requestAnimationFrame(animate)
    }

    init()
    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10" />
}

export default WellnessBackground

