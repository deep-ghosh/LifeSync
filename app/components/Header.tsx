"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { usePathname } from "next/navigation"

const Header = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  return (
    <motion.header
      className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? "bg-white shadow-lg" : "bg-transparent"}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <nav className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <Link href="/" className="text-3xl font-bold gradient-text">
              LifeSync
            </Link>
          </motion.div>
          <div className="hidden md:flex space-x-8">
            <NavLink href="/tasks" currentPath={pathname}>
              Tasks
            </NavLink>
            <NavLink href="/habits" currentPath={pathname}>
              Habits
            </NavLink>
            <NavLink href="/wellness" currentPath={pathname}>
              Wellness
            </NavLink>
            <NavLink href="/analytics" currentPath={pathname}>
              Analytics
            </NavLink>
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="focus:outline-none text-gray-800"
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden mt-4 space-y-4"
            >
              <NavLink href="/tasks" currentPath={pathname} mobile>
                Tasks
              </NavLink>
              <NavLink href="/habits" currentPath={pathname} mobile>
                Habits
              </NavLink>
              <NavLink href="/wellness" currentPath={pathname} mobile>
                Wellness
              </NavLink>
              <NavLink href="/analytics" currentPath={pathname} mobile>
                Analytics
              </NavLink>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  )
}

const NavLink = ({
  href,
  children,
  currentPath,
  mobile = false,
}: {
  href: string
  children: React.ReactNode
  currentPath: string
  mobile?: boolean
}) => (
  <Link
    href={href}
    className={`${mobile ? "block" : ""} text-gray-800 hover:text-primary transition duration-300 relative group ${
      currentPath === href ? "font-semibold" : ""
    }`}
  >
    <motion.span whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      {children}
    </motion.span>
    {!mobile && (
      <motion.span
        className="absolute bottom-0 left-0 w-full h-0.5 bg-primary origin-left transform scale-x-0 transition-transform duration-300 ease-out"
        initial={false}
        animate={currentPath === href ? { scaleX: 1 } : { scaleX: 0 }}
      />
    )}
  </Link>
)

export default Header

