"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import HabitsBackground from "../components/backgrounds/HabitsBackground"

export default function Habits() {
  const [habits, setHabits] = useState<{ id: number; name: string; streak: number; lastChecked: string | null }[]>([])
  const [newHabit, setNewHabit] = useState("")

  const addHabit = (e: React.FormEvent) => {
    e.preventDefault()
    if (newHabit.trim()) {
      setHabits([...habits, { id: Date.now(), name: newHabit, streak: 0, lastChecked: null }])
      setNewHabit("")
    }
  }

  const checkHabit = (id: number) => {
    const today = new Date().toISOString().split("T")[0]
    setHabits(
      habits.map((habit) => {
        if (habit.id === id) {
          if (habit.lastChecked !== today) {
            return { ...habit, streak: habit.streak + 1, lastChecked: today }
          }
        }
        return habit
      }),
    )
  }

  const resetStreak = (id: number) => {
    setHabits(habits.map((habit) => (habit.id === id ? { ...habit, streak: 0, lastChecked: null } : habit)))
  }

  return (
    <>
      <HabitsBackground />
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
          Habit Tracker
        </motion.h1>
        <motion.form
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8, type: "spring" }}
          onSubmit={addHabit}
          className="mb-8"
        >
          <div className="flex">
            <input
              type="text"
              value={newHabit}
              onChange={(e) => setNewHabit(e.target.value)}
              placeholder="Add a new habit"
              className="flex-grow px-4 py-2 text-gray-700 bg-white bg-opacity-50 backdrop-blur-md border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="px-4 py-2 button-gradient rounded-r-lg focus:outline-none"
            >
              Add Habit
            </motion.button>
          </div>
        </motion.form>
        <AnimatePresence>
          {habits.map((habit) => (
            <motion.div
              key={habit.id}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className="card flex items-center justify-between p-4 mb-4"
            >
              <span className="text-lg text-gray-800">{habit.name}</span>
              <div className="flex items-center">
                <motion.span
                  className="mr-4 text-2xl font-bold gradient-text"
                  initial={{ scale: 1 }}
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.3 }}
                >
                  {habit.streak}
                </motion.span>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => checkHabit(habit.id)}
                  className="mr-2 bg-green-500 text-white p-2 rounded-full focus:outline-none"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => resetStreak(habit.id)}
                  className="bg-red-500 text-white p-2 rounded-full focus:outline-none"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                </motion.button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </>
  )
}

