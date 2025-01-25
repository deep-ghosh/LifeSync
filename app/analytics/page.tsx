"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

export default function Analytics() {
  const [productivityData, setProductivityData] = useState<{ date: string; score: number }[]>([])

  useEffect(() => {
    // Simulating data fetch
    const generateData = () => {
      const data = []
      for (let i = 30; i > 0; i--) {
        const date = new Date()
        date.setDate(date.getDate() - i)
        data.push({
          date: date.toISOString().split("T")[0],
          score: Math.floor(Math.random() * 100),
        })
      }
      setProductivityData(data)
    }
    generateData()
  }, [])

  const chartData = {
    labels: productivityData.map((d) => d.date),
    datasets: [
      {
        label: "Productivity Score",
        data: productivityData.map((d) => d.score),
        fill: false,
        backgroundColor: "rgb(75, 192, 192)",
        borderColor: "rgba(75, 192, 192, 0.2)",
      },
    ],
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Productivity Trend",
      },
    },
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-6 py-16 min-h-screen"
    >
      <motion.h1
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8, type: "spring" }}
        className="text-4xl font-bold gradient-text mb-8"
      >
        Analytics Dashboard
      </motion.h1>
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8, type: "spring" }}
        className="card p-6 mb-8"
      >
        <h2 className="text-2xl font-semibold mb-4">Productivity Overview</h2>
        <Line data={chartData} options={options} />
      </motion.div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8, type: "spring" }}
          className="card p-6"
        >
          <h3 className="text-xl font-semibold mb-4">Task Completion Rate</h3>
          <div className="text-4xl font-bold gradient-text">85%</div>
          <p className="text-gray-600 mt-2">Great job! You're making steady progress.</p>
        </motion.div>
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8, type: "spring" }}
          className="card p-6"
        >
          <h3 className="text-xl font-semibold mb-4">Habit Streak</h3>
          <div className="text-4xl font-bold gradient-text">7 days</div>
          <p className="text-gray-600 mt-2">Keep it up! You're building strong habits.</p>
        </motion.div>
      </div>
    </motion.div>
  )
}

