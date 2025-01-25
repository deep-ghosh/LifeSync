"use client"

import { useEffect, useRef } from "react"

const BackgroundAnimation = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const gradientColors = ["#f0f8ff", "#e6f3ff", "#d9edff"]
    let currentColorIndex = 0

    const createGradient = () => {
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
      gradient.addColorStop(0, gradientColors[Math.floor(currentColorIndex) % gradientColors.length])
      gradient.addColorStop(1, gradientColors[(Math.floor(currentColorIndex) + 1) % gradientColors.length])
      return gradient
    }

    const animate = () => {
      if (!ctx) return

      ctx.fillStyle = createGradient()
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw subtle floating particles
      for (let i = 0; i < 50; i++) {
        const x = Math.random() * canvas.width
        const y = Math.random() * canvas.height
        const radius = Math.random() * 2
        ctx.beginPath()
        ctx.arc(x, y, radius, 0, Math.PI * 2)
        ctx.fillStyle = "rgba(255, 255, 255, 0.5)"
        ctx.fill()
      }

      currentColorIndex += 0.005
      if (currentColorIndex >= gradientColors.length) {
        currentColorIndex = 0
      }
      requestAnimationFrame(animate)
    }

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

export default BackgroundAnimation

