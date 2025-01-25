"use client"

import { useEffect, useRef } from "react"

const TasksBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const tasks: Task[] = []
    const taskCount = 20

    class Task {
      x: number
      y: number
      size: number
      color: string
      completed: boolean
      speed: number

      constructor() {
        this.x = Math.random() * (canvas?.width ?? 0)
        this.y = Math.random() * (canvas?.height ?? 0)
        this.size = Math.random() * 20 + 10
        this.color = `hsla(${Math.random() * 60 + 180}, 70%, 50%, 0.3)`
        this.completed = Math.random() > 0.5
        this.speed = Math.random() * 0.5 + 0.1
      }
      update() {
        this.y += this.speed

        if (canvas && this.y > canvas.height) {
          this.y = -this.size
          this.x = Math.random() * (canvas.width ?? 0)
          this.completed = Math.random() > 0.5
        }
      }
      draw() {
        if (!ctx) return
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.rect(this.x, this.y, this.size, this.size)
        ctx.fill()

        if (this.completed) {
          ctx.strokeStyle = "rgba(255, 255, 255, 0.8)"
          ctx.lineWidth = 2
          ctx.beginPath()
          ctx.moveTo(this.x + this.size * 0.2, this.y + this.size * 0.5)
          ctx.lineTo(this.x + this.size * 0.4, this.y + this.size * 0.7)
          ctx.lineTo(this.x + this.size * 0.8, this.y + this.size * 0.3)
          ctx.stroke()
        }
      }
    }

    const init = () => {
      for (let i = 0; i < taskCount; i++) {
        tasks.push(new Task())
      }
    }

    const animate = () => {
      if (!ctx) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (const task of tasks) {
        task.update()
        task.draw()
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

export default TasksBackground

