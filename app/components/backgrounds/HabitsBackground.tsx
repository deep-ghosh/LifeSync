"use client"

import { useEffect, useRef } from "react"

const HabitsBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const circles: Circle[] = []
    const circleCount = 30

    class Circle {
      x: number
      y: number
      radius: number
      color: string
      growth: number
      maxRadius: number

      constructor() {
        this.x = Math.random() * (canvas?.width ?? 0)
        this.y = Math.random() * (canvas?.height ?? 0)
        this.radius = Math.random() * 2 + 1
        this.color = `hsla(${Math.random() * 360}, 70%, 70%, 0.3)`
        this.growth = Math.random() * 0.1 + 0.05
        this.maxRadius = Math.random() * 20 + 10
      }
      update() {
        this.radius += this.growth

        if (this.radius > this.maxRadius || this.radius < 1) {
          this.growth *= -1
        }
      }

      draw() {
        if (!ctx) return
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        ctx.fillStyle = this.color
        ctx.fill()
      }
    }

    const init = () => {
      for (let i = 0; i < circleCount; i++) {
        circles.push(new Circle())
      }
    }

    const animate = () => {
      if (!ctx) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (const circle of circles) {
        circle.update()
        circle.draw()
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

export default HabitsBackground

