'use client'

import { motion } from 'framer-motion'
import {
  ChevronDown,
  ShoppingCart,
  Users,
  Flame,
  Coins,
  Menu,
  X,
  ChartLine,
  Lock,
  PiggyBank,
  Copy,
  Check
} from 'lucide-react'
import { useEffect, useState } from 'react'
import Image from 'next/image'

const stats = [
  { icon: <Users size={24} />, text: 'Community is Everything' },
  { icon: <Flame size={24} />, text: 'Only Good Times' },
  { icon: <Coins size={24} />, text: 'True Earning' },
]

export default function Page() {
  // Existing state
  const [activeSection, setActiveSection] = useState('hero')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText('0.0.7915979');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Revert back after 2 seconds
  };

  // 1) States for fetched stats
  const [tokenPrice, setTokenPrice] = useState('Loading...')
  const [marketCap, setMarketCap] = useState('Loading...')
  const [tvl, setTvl] = useState('Loading...')

  // Toggle mobile menu
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  // Track scrolling
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section')
      const scrollPosition = window.scrollY + window.innerHeight / 2

      sections.forEach((section) => {
        const top = section.offsetTop
        const height = section.offsetHeight
        if (scrollPosition >= top && scrollPosition < top + height) {
          setActiveSection(section.id)
        }
      })
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // 2) Fetch & refresh stats
  useEffect(() => {
    fetchTokenData()
    const intervalId = setInterval(fetchTokenData, 30000) // refresh every 30s
    return () => clearInterval(intervalId)
  }, [])

  async function fetchTokenData() {
    try {
      // Reset to 'Loading...' before fetching
      setTokenPrice('Loading...')
      setMarketCap('Loading...')
      setTvl('Loading...')

      const response = await fetch('https://grelf.me/lol.php?action=analyze&tokenId=0.0.731861')
      if (!response.ok) throw new Error('Network response was not ok')

      const data = await response.json()
      console.log('Token Data:', data)

      // Update states if data is valid
      if (data.priceUsd) {
        const price = parseFloat(data.priceUsd)
        setTokenPrice('$' + price.toFixed(6))
      } else {
        setTokenPrice('N/A')
      }

      if (data.marketCap) {
        const mc = parseFloat(data.marketCap)
        setMarketCap(formatCurrency(mc))
      } else {
        setMarketCap('N/A')
      }

      if (data.totalValueLocked) {
        const locked = parseFloat(data.totalValueLocked)
        setTvl(formatCurrency(locked))
      } else {
        setTvl('N/A')
      }

    } catch (error) {
      console.error('Error fetching token data:', error)
      setTokenPrice('Error')
      setMarketCap('Error')
      setTvl('Error')
    }
  }

  // Helper: format large numbers as currency
  function formatCurrency(value, decimals = 2) {
    if (isNaN(value) || value === 0) return '$0.00'
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    }).format(value)
  }

  function scrollToSection(id) {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setIsMenuOpen(false)
    }
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <a href="/" className="flex items-center">
                <Image src="/logo.png" alt="logo" width={60} height={60} className='p-2' />
              </a>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <a className="text-black hover:text-blue-900 px-3 py-2 rounded-md text-md font-medium cursor-pointer" onClick={() => scrollToSection('about')}>About</a>
                <a className="text-black hover:text-blue-900 px-3 py-2 rounded-md text-md font-medium cursor-pointer" onClick={() => scrollToSection('chart')}>Chart</a>
                <a className="text-black hover:text-blue-900 px-3 py-2 rounded-md text-md font-medium cursor-pointer" onClick={() => scrollToSection('hehe')}>Hehe</a>
                <a className="text-black hover:text-blue-900 px-3 py-2 rounded-md text-md font-medium cursor-pointer" onClick={() => scrollToSection('how-to-buy')}>How to Buy</a>
              </div>
            </div>

            {/* Social Icons and Buy Now Button */}
            <div className="hidden md:flex items-center">
              <a className="text-gray-600 hover:text-gray-900 py-2">
                <Image src="/xIcon.png" alt="x" width={20} height={20} className='cursor-pointer' />
              </a>
              <a className="text-gray-600 hover:text-gray-900 px-3 py-2">
                <Image src="/tg.png" alt="tg" width={50} height={50} className='cursor-pointer' />
              </a>
              <a href="https://www.saucerswap.finance/swap/HBAR/0.0.731861" target="_blank" rel="noopener noreferrer">
                <button className="m-2 px-6 py-3 text-sm md:text-lg text-white rounded-xl bg-gradient-to-r from-indigo-500 to-blue-600 hover:opacity-90 flex items-center justify-center shadow-lg">
                  Buy LARI →
                </button>
              </a>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={toggleMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              >
                <span className="sr-only">Open main menu</span>
                {isMenuOpen ? (
                  <X className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <Menu className="block h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu, show/hide based on menu state */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <a className="text-black hover:text-blue-900 px-3 py-2 rounded-md text-base font-medium cursor-pointer" onClick={() => scrollToSection('about')}>About</a>
              <a className="text-black hover:text-blue-900 px-3 py-2 rounded-md text-base font-medium cursor-pointer" onClick={() => scrollToSection('chart')}>Chart</a>
              <a className="text-black hover:text-blue-900 px-3 py-2 rounded-md text-base font-medium cursor-pointer" onClick={() => scrollToSection('hehe')}>Hehe</a>
              <a className="text-black hover:text-blue-900 px-3 py-2 rounded-md text-base font-medium cursor-pointer" onClick={() => scrollToSection('how-to-buy')}>How to Buy</a>
            </div>
            <div className="pt-4 pb-3 border-t border-gray-200">
              <div className="flex items-center px-5">
                <a className="text-gray-600 hover:text-gray-900 px-3 py-2">
                  <Image src="/xIcon.png" alt="x" width={20} height={20} className='cursor-pointer' />
                </a>
                <a className="text-gray-600 hover:text-gray-900 px-3 py-2">
                  <Image src="/tg.png" alt="tg" width={50} height={50} className='cursor-pointer' />
                </a>
              </div>
              <div className="mt-3 px-2">
                <a href="https://www.saucerswap.finance/swap/HBAR/0.0.731861" target="_blank" rel="noopener noreferrer">
                  <button className="m-2 px-6 py-3 text-sm md:text-lg text-white rounded-xl bg-gradient-to-r from-indigo-500 to-blue-600 hover:opacity-90 flex items-center justify-center shadow-lg" href="https://www.saucerswap.finance/swap">
                    Buy LARI →
                  </button>
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* MAIN CONTENT CONTAINER */}
      <div className="mx-auto pt-16">
        <section className="relative min-h-[75vh] md:min-h-[90vh] flex flex-col items-center justify-center text-white">
          {/* Background Image */}
          <Image
            src="/alien.png"
            alt="Hero background"
            fill
            style={{ objectFit: "cover" }}
            quality={100}
            className="z-0"
          />

          <span style={{ color: 'green' }}>
            {/* Added a semi-transparent gradient overlay for a more cohesive look */}
          </span>
          <div className="absolute inset-0 bg-gradient-to-b from-[#1c1c1c66] to-[#00000099] z-0" />
          {/* Content Container */}
          <div className="z-10 container mx-auto px-4 py-12 text-center flex flex-col gap-8">
            <div className="flex flex-wrap justify-center gap-8">
              {[
                { title: 'Token Price', value: tokenPrice, icon: <ChartLine size={28} /> },
                { title: 'Market Cap', value: marketCap, icon: <PiggyBank size={28} /> },
                { title: 'Total Value Locked', value: tvl, icon: <Lock size={28} /> },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="w-40 h-40 md:w-48 md:h-48 bg-white/90 text-gray-800 rounded-xl shadow-xl flex flex-col justify-center items-center transform transition-all duration-300 hover:scale-105 hover:-rotate-2"
                >
                  <div className="flex items-center">
                    {stat.icon}
                    <div className="text-sm md:text-lg font-bold mb-1 ml-1">{stat.value}</div>
                  </div>
                  <div className="text-sm md:text-md font-semibold">{stat.title}</div>
                </div>
              ))}
            </div>

            <div className="flex flex-col items-center gap-6">
              <span style={{ color: 'green' }}>
                {/* Title with a slightly bigger text, subtle text-shadow */}
              </span>
              <h1
                className="text-4xl md:text-5xl lg:text-6xl font-bold drop-shadow-xl"
                style={{ textShadow: "2px 3px 6px rgba(0,0,0,0.8)" }}
              >
                LARI Token is beaming to the Moon
              </h1>
              <div>
                <span style={{ color: 'green' }}>
                  {/* CTA Button in a purple/blue gradient for more contrast */}
                </span>
                <a href="https://www.saucerswap.finance/swap/HBAR/0.0.731861" target="_blank" rel="noopener noreferrer">
                  <button className="mt-2 px-6 py-3 text-sm md:text-lg rounded-xl bg-gradient-to-r from-indigo-500 to-blue-600 hover:opacity-90 flex items-center justify-center shadow-lg" href="https://www.saucerswap.finance/swap">
                    <ShoppingCart size={20} className="mr-2" />
                    Buy LARI Now
                  </button>
                </a>
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <span style={{ color: 'green' }}>
            {/* Moved the scroll indicator slightly up and made it more visible */}
          </span>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-white animate-bounce z-10">
            <ChevronDown size={32} />
          </div>
        </section>

        {/* CHART SECTION */}
        <section id="chart" className="px-6 py-20 min-h-screen">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-5xl flex justify-center font-handwriting mb-8">
              The Chart
            </h2>

            {/*
      We use a “padding-bottom” trick for the container so it scales
      proportionally with width. On large screens, reduce that padding so the
      chart is not excessively tall. 
    */}
            <div
              id="dexscreener-embed"
              className="
        relative 
        w-full 
        pb-[125%]       /* default: tall enough on mobile */
        lg:pb-[65%]     /* shorter on large screens */
        overflow-hidden
      "
              style={{ zIndex: 0 }} // ensure it's behind nothing else
            >
              <iframe
                src="https://dexscreener.com/hedera/0x02437f36e30867a70bd4dfb011b2404477314846?embed=1&loadChartSettings=0&trades=0&tabs=0&info=0&chartLeftToolbar=0&chartTheme=dark&theme=dark&chartStyle=0&chartType=usd&interval=15"
                className="
          absolute 
          top-0 
          left-0 
          w-full 
          h-full 
          border-0
        "
                allowFullScreen
              />
            </div>
          </div>
        </section>

        {/* FUNNY TIME GALLERY */}
        <section id="hehe" className="pt-20 pb-10">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-5xl flex justify-center font-handwriting mb-8">
              Funny Time
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-gray-200 rounded-lg aspect-square" />
              ))}
            </div>
          </div>
        </section>

        {/* ABOUT SECTION */}
        <section
          id="about"
          className="min-h-screen pt-20 bg-white md:rounded-full max-w-5xl mx-auto"
        >
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Text Side */}
            <div className="max-w-2xl mx-auto px-4 md:px-8">
              <h2 className="text-3xl md:text-4xl font-handwriting mb-2">
                About LARI Token
              </h2>
              <p className="text-sm md:text-base mb-8 leading-relaxed">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s...
              </p>

              <div className="space-y-2">
                {stats.map((stat, index) => (
                  <div key={index} className="flex items-center gap-2">
                    {stat.icon}
                    <span className="text-pink-500" />
                    <span>{stat.text}</span>
                  </div>
                ))}
              </div>

              <span style={{ color: 'green' }}>
                {/* Added a copy button for Token ID just below the stats */}
              </span>
              <div className="mt-4 flex items-center gap-2">
                {/* Replace this hard-coded ID with your actual token ID if needed */}
                <p id="token-id" className="font-semibold text-gray-900 text-sm md:text-base">
                  Token ID: 0.0.7915979
                </p>
                <button
                  onClick={handleCopy}
                  className="inline-flex items-center px-3 py-1 text-sm rounded-md"
                >
                  {copied ? <Check size={16} className="mr-1" /> : <Copy size={16} className="mr-1" />}
                </button>
              </div>
            </div>

            {/* Image Side */}
            <div className="flex justify-center items-center mt-8 md:mt-0">
              <Image
                src="/logobg.png"
                alt="About"
                width={500}
                height={500}
                className="object-cover"
              />
            </div>
          </div>

          {/* HOW TO BUY SECTION */}
          <section
            id="how-to-buy"
            className="pb-20 pt-20 bg-white md:rounded-full"
          >
            <div className="max-w-4xl mx-auto px-4 md:px-0">
              <h2 className="text-3xl md:text-4xl font-handwriting mb-8">
                How to Buy
              </h2>
              {/* Vertical on mobile, horizontal on desktop */}
              <div className="relative flex flex-col md:flex-row items-center justify-between gap-2 md:gap-10">

                {/* Decorative line behind the steps (Desktop Only) */}
                <div className="absolute md:inset-x-0 md:top-1/2 md:-translate-y-1/2 border-b border-gray-300 hidden md:block" />

                {/* STEP 1 */}
                <div className="text-center z-10">
                  <a href="https://www.hashpack.app/download" target="_blank" rel="noopener noreferrer">
                    <motion.div className="px-16 py-12 cursor-pointer rounded-lg mb-2 font-semibold text-white bg-gradient-to-r from-blue-400 to-blue-600 hover:opacity-90 shadow-md text-sm md:text-base">
                      Get Hashpack
                    </motion.div>
                  </a>
                </div>

                <span style={{ color: 'green' }}>
                  {/* Desktop Arrow (horizontal) */}
                </span>
                <motion.div
                  initial={{ x: -50 }}
                  animate={{ x: [-50, 50, -50] }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    repeatType: 'loop',
                    ease: 'easeInOut',
                  }}
                  className="hidden md:block text-3xl md:text-4xl z-10"
                >
                  →
                </motion.div>

                <span style={{ color: 'green' }}>
                  {/* Mobile Arrow (vertical) */}
                </span>
                <motion.div
                  initial={{ y: -40 }}
                  animate={{ y: [-40, 10, -40] }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    repeatType: 'loop',
                    ease: 'easeInOut',
                  }}
                  className="md:hidden block text-3xl z-10"
                >
                  ↓
                </motion.div>

                {/* STEP 2 */}
                <div className="text-center z-10">
                  <a href="https://www.binance.com/en" target="_blank" rel="noopener noreferrer">
                    <motion.div
                      animate={{
                        boxShadow: [
                          '0 0 10px rgba(0,0,0,0.3)',
                          '0 0 20px rgba(0,0,0,0.3)',
                          '0 0 10px rgba(0,0,0,0.3)',
                        ],
                        scale: [1, 1.03, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatType: 'mirror',
                        ease: 'easeInOut',
                      }}
                      className="px-16 py-12 cursor-pointer rounded-lg mb-2 font-semibold text-white bg-gradient-to-r from-blue-400 to-blue-600 hover:opacity-90 shadow-md text-sm md:text-base"
                    >
                      Get HBAR
                    </motion.div>
                  </a>
                </div>

                <span style={{ color: 'green' }}>
                  {/* Desktop Arrow (horizontal) */}
                </span>
                <motion.div
                  initial={{ x: -50 }}
                  animate={{ x: [-50, 50, -50] }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    repeatType: 'loop',
                    ease: 'easeInOut',
                  }}
                  className="hidden md:block text-3xl md:text-4xl z-10"
                >
                  →
                </motion.div>

                <span style={{ color: 'green' }}>
                  {/* Mobile Arrow (vertical) */}
                </span>
                <motion.div
                  initial={{ y: -40 }}
                  animate={{ y: [-40, 10, -40] }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    repeatType: 'loop',
                    ease: 'easeInOut',
                  }}
                  className="md:hidden block text-3xl z-10"
                >
                  ↓
                </motion.div>

                {/* STEP 3 */}
                <div className="text-center z-10">
                  <a href="https://www.saucerswap.finance/swap/HBAR/0.0.731861" target="_blank" rel="noopener noreferrer">
                    <motion.div
                      animate={{
                        boxShadow: [
                          '0 0 25px rgba(0,136,255,0.7)',
                          '0 0 40px rgba(0,136,255,0.9)',
                          '0 0 25px rgba(0,136,255,0.7)',
                        ],
                        scale: [1, 1.06, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatType: 'mirror',
                        ease: 'easeInOut',
                      }}
                      className="px-16 py-12 cursor-pointer rounded-lg font-semibold text-white bg-gradient-to-r from-blue-400 to-blue-600 hover:opacity-90 shadow-md text-sm md:text-base"
                    >
                      Buy LARI
                    </motion.div>
                  </a>
                </div>
              </div>
            </div>
          </section>
        </section>

        <span style={{ color: 'green' }}>
          {/* Footer has enough bottom margin so it's fully visible */}
        </span>
        <footer className="flex items-center justify-center px-6 py-6 border-t mt-8">
          <div className="flex flex-col gap-4 items-center">
            <div className="flex items-center gap-4">
              <Image src="/logo.png" alt="logo" width={60} height={60} />
              <div className="text-sm text-gray-500">
                Some funny quote that you need to add here, actually here,
                actually a little further just here
              </div>
              <div className="flex items-center">
                <a className="text-gray-600 hover:text-gray-900 py-2">
                  <Image src="/xIcon.png" alt="x" width={20} height={20} className="cursor-pointer" />
                </a>
                <a className="text-gray-600 hover:text-gray-900 py-2">
                  <Image src="/tg.png" alt="tg" width={50} height={50} className="cursor-pointer" />
                </a>
              </div>
            </div>
            <div className="text-sm text-gray-400">
              © 2024 LARI Token. All rights reserved.
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}