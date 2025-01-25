"use client"

import { useEffect, useRef } from "react"

const AnalyticsBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const graphs: Graph[] = []
    const graphCount = 15

    class Graph {
      x: number
      y: number
      width: number
      height: number
      color: string
      speed: number
      points: number[]

      constructor() {
        this.width = Math.random() * 100 + 50
        this.height = Math.random() * 60 + 20
        this.x = Math.random() * ((canvas?.width ?? 0) - this.width)
        this.y = Math.random() * ((canvas?.height ?? 0) - this.height)
        this.color = `hsla(${Math.random() * 360}, 70%, 70%, 0.3)`
        this.speed = Math.random() * 0.5 + 0.1
        this.points = Array.from({ length: 10 }, () => Math.random())
      }
      update() {
        this.x += this.speed

        if (canvas && this.x > canvas.width) {
          this.x = -this.width
          this.y = Math.random() * ((canvas.height ?? 0) - this.height)
        }

        this.points.shift()
        this.points.push(Math.random())
      }

      draw() {
        if (!ctx) return
        ctx.beginPath()
        ctx.moveTo(this.x, this.y + this.height - this.points[0] * this.height)
        for (let i = 1; i < this.points.length; i++) {
          ctx.lineTo(
            this.x + (i / (this.points.length - 1)) * this.width,
            this.y + this.height - this.points[i] * this.height,
          )
        }
        ctx.strokeStyle = this.color
        ctx.lineWidth = 2
        ctx.stroke()
      }
    }

    const init = () => {
      for (let i = 0; i < graphCount; i++) {
        graphs.push(new Graph())
      }
    }

    const animate = () => {
      if (!ctx) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (const graph of graphs) {
        graph.update()
        graph.draw()
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

export default AnalyticsBackground

