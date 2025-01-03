'use client'

import { motion } from "framer-motion"
import { ChevronDown, ShoppingCart, Users, Flame, Coins } from 'lucide-react'
import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"

const stats = [
  { icon: <Users size={24} />, text: '10k+ Users' },
  { icon: <Flame size={24} />, text: '30+ Countries' },
  { icon: <Coins size={24} />, text: '95% Satisfaction' },
];

export default function Page() {
  const [activeSection, setActiveSection] = useState("hero")

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section")
      const scrollPosition = window.scrollY + window.innerHeight / 2

      sections.forEach((section) => {
        const top = section.offsetTop
        const height = section.offsetHeight

        if (scrollPosition >= top && scrollPosition < top + height) {
          setActiveSection(section.id)
        }
      })
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <>
      {/* PAGE WRAPPER */}
      <div className="bg-gray-100 min-h-screen">
        <span style={{ color: 'green' }}>
          {/* Wrapped navbar in the same container for matching margins */}
        </span>
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm">
          <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
            <div className="w-8 h-8 rounded-full bg-yellow-300" />
            <div className="flex items-center gap-24">
              {/* Social icon placeholder */}
              <button onClick={() => scrollToSection("about")} className="text-lg hover:text-blue-700">
                About
              </button>
              <button onClick={() => scrollToSection("chart")} className="text-lg hover:text-blue-700">
                Chart
              </button>
              <button onClick={() => scrollToSection("help")} className="text-lg hover:text-blue-700">
                Hehe
              </button>
              <button onClick={() => scrollToSection("how-to-buy")} className="text-lg hover:text-blue-700">
                How to Buy
              </button>

              <div className="ml-8 flex items-center">
                <Image src="/xIcon.png" alt="x" width={20} height={20} />
                <button className="px-12 py-2 text-lg rounded-xl bg-blue-800 text-white hover:bg-blue-700 ml-4">
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </nav>

        <div className="max-w-5xl mx-auto px-6 pt-16">
          <span style={{ color: 'green' }}>
            {/* HERO SECTION with background image at 100% height, text + $$$ button at bottom */}
          </span>
          <section id="hero">
            <div className="relative h-[93vh] w-full overflow-hidden">
              {/* Background Image */}
              <Image
                src="/wow.jpg"
                alt="Background"
                layout="fill"
                objectFit="cover"
                priority
              />

              {/* Content Container */}
              <div className="absolute inset-0 flex flex-col justify-between p-6 md:p-12">
                {/* Top Section with Stat Cards */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 mt-8">
                  <StatCard title="Users" value="10k+" />
                  <StatCard title="Countries" value="30+" />
                  <StatCard title="Satisfaction" value="95%" />
                </div>

                {/* Bottom Section */}
                <div className="flex items-end justify-between items-center mb-20">
                  {/* Title */}
                  <h1 className="text-2xl md:text-4xl font-bold text-white max-w-2xl leading-tight">
                    Discover a New Way of Connecting
                  </h1>

                  <button className="px-12 py-2 text-lg rounded-xl bg-blue-800 text-white hover:bg-blue-700 flex items-center">
                    <ShoppingCart className="mr-2" />
                    Buy LARI
                  </button>
                </div>
              </div>

              {/* Scroll Indicator */}
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
                <ChevronDown size={32} />
              </div>
            </div>
          </section>

          {/* CHART SECTION */}
          <section id="chart" className="min-h-screen px-6 py-20">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-5xl flex justify-center font-handwriting mb-8">The Chart</h2>
              <div className="aspect-video bg-gray-200 rounded-lg" />
            </div>
          </section>

          {/* FUNNY TIME GALLERY */}
          <section id="help" className="min-h-screen pt-20">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-5xl flex justify-center font-handwriting mb-8">Funny Time</h2>
              <span style={{ color: 'green' }}>
                {/* Clean, uniform grid (example: 3 columns on md, 4 on lg) */}
              </span>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="bg-gray-200 rounded-lg aspect-square" />
                ))}
              </div>
            </div>
          </section>

          {/* ABOUT SECTION */}
          <section id="about" className="min-h-screen pt-20 bg-white md:rounded-full">
            <div className="grid grid-cols-2">
              <div className="max-w-2xl mx-auto">
                <h2 className="text-4xl font-handwriting mb-2">About LARI Token</h2>
                <p className="text-sm mb-8 mr-6">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make</p>

                <div className="space-y-2">
                  {stats.map((stat, index) => (
                    <div key={index} className="flex items-center gap-2">
                      {stat.icon}
                      <span className="text-pink-500"></span>
                      <span>{stat.text}</span>
                    </div>
                  ))}
                </div>
              </div>
              <Image src="/wow.jpg" alt="About" width={500} height={500} />
            </div>

            {/* HOW TO BUY SECTION */}
            <section id="how-to-buy" className="pb-20 pt-20 bg-white md:rounded-full">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-4xl font-handwriting mb-8">How to Buy</h2>

                <div className="relative flex items-center justify-between">
                  <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 border-b border-gray-300" />

                  {/* STEP 1: Static (no pulse) */}
                  <div className="text-center bg-white z-10">
                    <motion.div
                      className="px-16 py-8 cursor-pointer rounded-lg mb-2 font-semibold text-white bg-gradient-to-r from-blue-400 to-blue-600 hover:opacity-90 shadow-md"
                    >
                      Get Hashpack
                    </motion.div>
                  </div>

                  {/* ARROW 1: From STEP 1 to STEP 2 */}
                  <motion.div
                    initial={{ x: -50 }}
                    animate={{ x: [-50, 50, -50] }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      repeatType: "loop",
                      ease: "easeInOut",
                    }}
                    className="text-4xl z-10"
                  >
                    →
                  </motion.div>

                  {/* STEP 2: Slight, colorless pulse */}
                  <div className="text-center bg-white z-10">
                    <motion.div
                      animate={{
                        boxShadow: [
                          "0 0 10px rgba(0,0,0,0.3)",
                          "0 0 20px rgba(0,0,0,0.3)",
                          "0 0 10px rgba(0,0,0,0.3)"
                        ],
                        scale: [1, 1.03, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "mirror",
                        ease: "easeInOut",
                      }}
                      className="px-16 py-8 cursor-pointer rounded-lg mb-2 font-semibold text-white bg-gradient-to-r from-blue-400 to-blue-600 hover:opacity-90 shadow-md"
                    >
                      Get HBAR
                    </motion.div>
                  </div>

                  {/* ARROW 2: From STEP 2 to STEP 3 */}
                  <motion.div
                    initial={{ x: -50 }}
                    animate={{ x: [-50, 50, -50] }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      repeatType: "loop",
                      ease: "easeInOut",
                    }}
                    className="text-4xl z-10"
                  >
                    →
                  </motion.div>

                  {/* STEP 3: Noticeable color pulse */}
                  <div className="text-center bg-white z-10">
                    <motion.div
                      animate={{
                        boxShadow: [
                          "0 0 25px rgba(0,136,255,0.7)",
                          "0 0 40px rgba(0,136,255,0.9)",
                          "0 0 25px rgba(0,136,255,0.7)"
                        ],
                        scale: [1, 1.06, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "mirror",
                        ease: "easeInOut",
                      }}
                      className="px-16 py-8 cursor-pointer rounded-lg font-semibold text-white bg-gradient-to-r from-blue-400 to-blue-600 hover:opacity-90 shadow-md"
                    >
                      Buy LARI
                    </motion.div>
                  </div>
                </div>
              </div>
            </section>
          </section>
          {/* FOOTER */}
          <footer className="flex items-center justify-center px-6 py-4 border-t mt-8">
            <div className="flex flex-col gap-4 justify-center items-center">
              <div className="flex items-center gap-4 items-center">
                <div className="w-8 h-8 rounded-full bg-yellow-300" />
                <div className="text-sm text-gray-500">
                  Some funny quote that you need to add here, actually here, actually a little further just here
                </div>
                {/* Social icon placeholder on the right of footer */}
                <Image src="/xIcon.png" alt="x" width={20} height={20} />
              </div>
              <div className="text-sm text-gray-400">
                © 2024 LARI Token. All rights reserved.
              </div>
            </div>
          </footer>
        </div>
      </div>
    </>
  )
}

function StatCard({ title, value, icon }) {
  return (
    <Card className="bg-white/10 backdrop-blur-lg border-none text-white">
      <CardContent className="p-4">
        {icon}
        <p className="text-sm font-medium">{title}</p>
        <p className="text-2xl font-bold">{value}</p>
      </CardContent>
    </Card>
  )
}