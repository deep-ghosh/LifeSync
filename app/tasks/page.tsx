"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import TasksBackground from "../components/backgrounds/TasksBackground"

export default function Tasks() {
  const [tasks, setTasks] = useState<{ id: number; text: string; completed: boolean }[]>([])
  const [newTask, setNewTask] = useState("")

  const addTask = (e: React.FormEvent) => {
    e.preventDefault()
    if (newTask.trim()) {
      setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }])
      setNewTask("")
    }
  }

  const toggleTask = (id: number) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)))
  }

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  return (
    <>
      <TasksBackground />
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
          Task Management
        </motion.h1>
        <motion.form
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8, type: "spring" }}
          onSubmit={addTask}
          className="mb-8"
        >
          <div className="flex">
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Add a new task"
              className="flex-grow px-4 py-2 text-gray-700 bg-white bg-opacity-50 backdrop-blur-md border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="px-4 py-2 button-gradient rounded-r-lg focus:outline-none"
            >
              Add Task
            </motion.button>
          </div>
        </motion.form>
        <AnimatePresence>
          {tasks.map((task) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className="card flex items-center justify-between p-4 mb-4"
            >
              <div className="flex items-center">
                <motion.input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
                  className="mr-3 form-checkbox h-5 w-5 text-primary transition duration-150 ease-in-out"
                  whileTap={{ scale: 1.2 }}
                />
                <motion.span
                  animate={{ color: task.completed ? "#888" : "#333" }}
                  className={`text-lg ${task.completed ? "line-through text-gray-500" : "text-gray-800"}`}
                >
                  {task.text}
                </motion.span>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => deleteTask(task.id)}
                className="text-red-500 hover:text-red-700 focus:outline-none"
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
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </motion.button>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </>
  )
}

