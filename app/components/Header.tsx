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
    { 
      href: "/", 
      label: "Home", 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
          <polyline points="9 22 9 12 15 12 15 22"/>
        </svg>
      )
    },
    { 
      href: "/task", 
      label: "Tasks", 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
          <line x1="9" y1="12" x2="15" y2="12"/>
          <line x1="9" y1="16" x2="15" y2="16"/>
          <line x1="9" y1="8" x2="15" y2="8"/>
        </svg>
      )
    },
    { 
      href: "/habits", 
      label: "Habits", 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 8.5l-4.5 4.5L8 11"/>
          <circle cx="12" cy="12" r="10"/>
        </svg>
      )
    },
    { 
      href: "/wellness", 
      label: "Wellness", 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 3v18h18"/>
          <path d="M18 17V9l-6 6-4-4-4 4"/>
        </svg>
      )
    }
  ]

  return (
    <motion.header
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled 
          ? "bg-white/90 backdrop-blur-xl shadow-lg" 
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
            className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text flex items-center hover:scale-105 transition-transform"
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
              className="bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-2 rounded-full text-white shadow-md hover:shadow-xl transition-all"
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
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="12" x2="21" y2="12"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <line x1="3" y1="18" x2="21" y2="18"/>
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
            className="md:hidden bg-white shadow-md px-6 pb-4"
          >
            {navItems.map((item) => (
              <NavLink key={item.href} href={item.href} currentPath={pathname} mobile>
                <span className="mr-2">{item.icon}</span>
                {item.label}
              </NavLink>
            ))}
            <Link 
              href="/signup" 
              className="block mt-4 bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-3 rounded-full text-white text-center shadow-md hover:shadow-xl transition-all"
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
      ${mobile ? "block py-3 border-b" : "inline-flex items-center"} 
      text-gray-800 hover:text-blue-600 transition duration-300 relative group
      ${currentPath === href ? "font-semibold text-blue-600" : ""}
    `}
  >
    <motion.span 
      whileHover={{ scale: 1.05 }} 
      whileTap={{ scale: 0.95 }}
      className="flex items-center"
    >
      {children}
    </motion.span>
  </Link>
)

export default Header