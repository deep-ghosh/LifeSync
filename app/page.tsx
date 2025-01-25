"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import HomeBackground from "./components/backgrounds/HomeBackground"

const MotionLink = motion(Link)

export default function Home() {
  return (
    <>
      <HomeBackground />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-6 py-16 min-h-screen flex flex-col justify-center"
      >
        <div className="text-center">
          <motion.h1
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8, type: "spring" }}
            className="text-5xl md:text-7xl font-bold gradient-text mb-8"
          >
            Sync Your Life, Boost Your Productivity
          </motion.h1>
          <motion.p
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8, type: "spring" }}
            className="text-xl text-gray-600 mb-12"
          >
            LifeSync is your all-in-one platform for task management, habit tracking, and mental wellness.
          </motion.p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <MotionLink
              href="/signup"
              className="button-gradient px-8 py-3 rounded-full text-lg font-semibold inline-block"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              Get Started
            </MotionLink>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-12"
        >
          <FeatureCard
            title="Task Management"
            description="Organize your tasks, set priorities, and never miss a deadline."
            icon="📋"
          />
          <FeatureCard
            title="Habit Tracking"
            description="Build positive habits and break negative ones with our powerful tracking tools."
            icon="🔄"
          />
          <FeatureCard
            title="Mental Wellness"
            description="Track your mood, practice mindfulness, and improve your overall well-being."
            icon="🧘"
          />
        </motion.div>
      </motion.div>
    </>
  )
}

const FeatureCard = ({ title, description, icon }: { title: string; description: string; icon: string }) => (
  <motion.div
    whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}
    className="card p-6"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 0.2, type: "spring", stiffness: 260, damping: 20 }}
      className="mb-4 text-4xl"
    >
      {icon}
    </motion.div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </motion.div>
)


