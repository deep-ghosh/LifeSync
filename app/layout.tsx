import "./globals.css"
import { Inter } from "next/font/google"
import Header from "./components/Header"
import Footer from "./components/Footer"
import { AnimatePresence } from "framer-motion"
import BackgroundAnimation from "./components/BackgroundAnimation"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "LifeSync - Sync Your Life, Boost Your Productivity",
  description: "LifeSync is your all-in-one platform for task management, habit tracking, and mental wellness.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen flex flex-col relative`}>
        <BackgroundAnimation />
        <Header />
        <AnimatePresence mode="wait">
          <main className="flex-grow">{children}</main>
        </AnimatePresence>
        <Footer />
      </body>
    </html>
  )
}

