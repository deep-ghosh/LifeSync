"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const moodOptions = [
  { value: 1, label: "Very Bad", color: "bg-red-500" },
  { value: 2, label: "Bad", color: "bg-orange-500" },
  { value: 3, label: "Neutral", color: "bg-yellow-500" },
  { value: 4, label: "Good", color: "bg-green-500" },
  { value: 5, label: "Very Good", color: "bg-blue-500" },
]

export default function Wellness() {
  const [moodEntries, setMoodEntries] = useState<{ id: number; date: string; mood: number }[]>([])
  const [selectedMood, setSelectedMood] = useState<number | null>(null)

  const addMoodEntry = () => {
    if (selectedMood !== null) {
      const newEntry = {
        id: Date.now(),
        date: new Date().toISOString().split("T")[0],
        mood: selectedMood,
      }
      setMoodEntries([newEntry, ...moodEntries])
      setSelectedMood(null)
    }
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
        Wellness Tracker
      </motion.h1>
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8, type: "spring" }}
        className="card p-6 mb-8"
      >
        <h2 className="text-2xl font-semibold mb-4">How are you feeling today?</h2>
        <div className="flex justify-between mb-4">
          {moodOptions.map((option) => (
            <motion.button
              key={option.value}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setSelectedMood(option.value)}
              className={`${option.color} ${selectedMood === option.value ? "ring-4 ring-opacity-50" : ""} text-white rounded-full p-4 focus:outline-none`}
            >
              {option.label}
            </motion.button>
          ))}
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={addMoodEntry}
          disabled={selectedMood === null}
          className="w-full button-gradient py-2 rounded-lg focus:outline-none disabled:opacity-50"
        >
          Log Mood
        </motion.button>
      </motion.div>
      <h2 className="text-2xl font-semibold mb-4">Mood History</h2>
      <AnimatePresence>
        {moodEntries.map((entry) => (
          <motion.div
            key={entry.id}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            className="card flex items-center justify-between p-4 mb-4"
          >
            <span className="text-lg text-gray-800">{entry.date}</span>
            <motion.div
              className={`${moodOptions[entry.mood - 1].color} text-white px-4 py-2 rounded-full`}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            >
              {moodOptions[entry.mood - 1].label}
            </motion.div>
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  )
}

