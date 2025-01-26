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

  const navItems = [
    { href: "/task", label: "Tasks", icon: "📋" },
    { href: "/habits", label: "Habits", icon: "🔄" },
    { href: "/wellness", label: "Wellness", icon: "🧘" },
    { href: "/analytics", label: "Analytics", icon: "📊" }
  ]

  return (
    <motion.header
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled 
          ? "bg-white/80 backdrop-blur-lg shadow-md" 
          : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <motion.div 
          initial={{ opacity: 0, x: -20 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ duration: 0.5 }}
        >
          <Link 
            href="/" 
            className="text-3xl font-bold gradient-text flex items-center hover:scale-105 transition-transform"
          >
            <span className="mr-2">🚀</span>LifeSync
          </Link>
        </motion.div>

        <div className="hidden md:flex space-x-6 items-center">
          {navItems.map((item) => (
            <NavLink key={item.href} href={item.href} currentPath={pathname}>
              <span className="mr-2">{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Link 
              href="/signup" 
              className="button-gradient px-4 py-2 rounded-full text-white ml-4"
            >
              Get Started
            </Link>
          </motion.div>
        </div>

        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="focus:outline-none text-gray-800"
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden px-6 pb-4"
          >
            {navItems.map((item) => (
              <NavLink key={item.href} href={item.href} currentPath={pathname} mobile>
                <span className="mr-2">{item.icon}</span>
                {item.label}
              </NavLink>
            ))}
            <Link 
              href="/signup" 
              className="block mt-4 button-gradient px-4 py-2 rounded-full text-white text-center"
            >
              Get Started
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
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
    className={`
      ${mobile ? "block py-2 border-b" : "inline-flex items-center"} 
      text-gray-800 hover:text-primary transition duration-300 relative group
      ${currentPath === href ? "font-semibold text-primary" : ""}
    `}
  >
    <motion.span 
      whileHover={{ scale: 1.05 }} 
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.span>
  </Link>
)

export default Header