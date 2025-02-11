'use client'

import {
  ChevronDown,
  ShoppingCart,
  ChartLine,
  Lock,
  PiggyBank,
  Copy,
  Check
} from 'lucide-react'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import './rain.scss';

export default function Page() {
  // States
  const [copied, setCopied] = useState(false)

  // Copy to clipboard
  const handleCopy = () => {
    navigator.clipboard.writeText('0.0.7893583')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Stats
  const [tokenPrice, setTokenPrice] = useState('Loading...')
  const [marketCap, setMarketCap] = useState('Loading...')
  const [tvl, setTvl] = useState('Loading...')

  // Fetch data
  useEffect(() => {
    fetchTokenData()
    const intervalId = setInterval(fetchTokenData, 30000) // refresh every 30s
    return () => clearInterval(intervalId)
  }, [])

  async function fetchTokenData() {
    try {
      setTokenPrice('Loading...')
      setMarketCap('Loading...')
      setTvl('Loading...')

      const response = await fetch(
        'https://grelf.me/lol.php?action=analyze&tokenId=0.0.7893583'
      )
      if (!response.ok) throw new Error('Network response was not ok')

      const data = await response.json()
      console.log('Token Data:', data)

      // Update states
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

  function formatCurrency(value, decimals = 2) {
    if (isNaN(value) || value === 0) return '$0.00'
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(value)
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* 2) Full-screen hero image as entire site background */}
      <Image
        src="/main.jpg"
        alt="Full-site background"
        fill
        quality={100}
        style={{
          objectFit: 'cover',
          objectPosition: 'center 160%' // Adjust this percentage to move image up/down
        }}
        className="-z-20"
      />

      {/* 3) Subtle overlay over the entire background if you want */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/40 -z-10" />

      {/* HERO SECTION */}
      <section
        id="hero"
        className="relative min-h-[80vh] md:min-h-[100vh] flex flex-col items-center justify-center text-white"
      >

        {/* Title + Token ID */}
        <div className="z-10 text-center">
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold drop-shadow-xl text-green-400 mt-32 md:mt-0 px-8 py-4"
            style={{
              textShadow: "2px 3px 6px rgba(0,0,0,0.8)",
              backgroundColor: "rgba(0, 0, 0, 0.2)",
              padding: "0.5em 1em",
              borderRadius: "0.3em"
            }}
          >
            $LARI INCOMING!
          </h1>

          {/* Token Copy */}
          <div className="mt-4 flex items-center justify-center gap-2">
            <p
              id="token-id"
              className="font-semibold text-white text-sm md:text-base"
            >
              Token ID: 0.0.7893583
            </p>
            <button
              onClick={handleCopy}
              className="inline-flex items-center px-3 py-1 text-sm rounded-md transition-all"
            >
              {copied ? (
                <Check size={16} className="mr-1" />
              ) : (
                <Copy size={16} className="mr-1" />
              )}
            </button>
          </div>
        </div>

        {/* Stats + CTA */}
        <div className="z-10 container mx-auto px-4 py-12 text-center flex flex-col gap-8">
          {/* Token Stats */}
          <div className="flex flex-wrap justify-center gap-8">
            {[
              { title: 'Token Price', value: tokenPrice, icon: <ChartLine size={28} /> },
              { title: 'Market Cap', value: marketCap, icon: <PiggyBank size={28} /> },
              { title: 'Total Value Locked', value: tvl, icon: <Lock size={28} /> },
            ].map((stat, index) => (
              <div
                key={index}
                className="w-40 h-40 md:w-48 md:h-48 bg-gradient-to-b from-green-500 to-purple-600 text-gray-800 rounded-xl shadow-xl flex flex-col justify-center items-center transform transition-all duration-300 hover:scale-105 hover:-rotate-2"
              >
                <div className="flex items-center text-white">
                  {stat.icon}
                  <div className="text-sm md:text-lg font-bold mb-1 ml-1">
                    {stat.value}
                  </div>
                </div>
                <div className="text-sm md:text-md font-semibold text-white">
                  {stat.title}
                </div>
              </div>
            ))}
          </div>

          {/* Buy CTA */}
          <div className="flex flex-col items-center gap-6">
            <a
              href="https://www.saucerswap.finance/swap/HBAR/0.0.7893583"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="mt-2 px-6 py-3 text-sm md:text-lg rounded-xl bg-gradient-to-r from-green-500 to-purple-800 hover:opacity-90 flex items-center justify-center shadow-lg">
                <ShoppingCart size={20} className="mr-2" />
                Buy LARI Now
              </button>
            </a>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <div className="bg-transparent text-black min-h-[100vh]">
        {/* GALLERY */}
        <section id="hehe" className="pt-32 pb-10">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
              <div className="m-8 bg-white shadow-md rounded-xl md:p-4 transform transition-all duration-300 hover:scale-105 hover:-rotate-0 -rotate-6">
                <div className="mb-4">
                  <Image
                    src="/alien.png"
                    alt="alien"
                    width={300}
                    height={300}
                    className="w-full h-auto object-contain rounded-xl"
                  />
                </div>
                <p className="text-sm md:text-base leading-relaxed md:p-0 p-4">
                  <span className='font-extrabold'>LARI crashed into the trenches</span> on first day of Memejob.fun's launch and the dev quickly rugged and jeeted. <span className='font-extrabold'>CTO saved $LARI</span> with socials, websites and multiple liquidity pools. Now, sir lari hopes to increase awareness around <span className='font-extrabold'>v2 pool rewards on Saucerswap</span>, as well as provide <span className='font-extrabold'>educational content</span> on the Saucerswap ecosystem
                </p>
              </div>

              {/* RIGHT COLUMN: Steps to Buy */}
              <div className="m-8 bg-white shadow-md rounded-xl md:p-4 transform transition-all duration-300 hover:scale-105 hover:-rotate-0 rotate-6">
                <div className="mb-4">
                  <Image
                    src="/logobg.png"
                    alt="logobg"
                    width={300}
                    height={300}
                    className="w-full h-auto object-contain rounded-xl"
                  />
                </div>
                <ol className="list-decimal list-inside space-y-2 text-sm md:text-base mt-2 p-4 md:p-0">
                  <li>
                    Download <span className="bg-green-200 px-1 rounded">HashPack Wallet</span>.
                  </li>
                  <li>
                    Buy <span className="bg-green-200 px-1 rounded">$HBAR</span> on Coinbase/Binance, then send it to your wallet.
                  </li>
                  <li>
                    Swap <span className="bg-green-200 px-1 rounded">$HBAR</span> for <span className="bg-green-200 px-1 rounded">$LARI</span> on SaucerSwap
                    <span className="ml-1" role="img" aria-label="UFO">🛸</span>
                  </li>
                  <li>
                    Copy/Paste <span className="bg-green-200 px-1 rounded">$LARI on X</span> to spread the word!
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="px-6 py-2 border-t mt-4 mx-auto max-w-5xl flex flex-col md:flex-row items-center justify-between bg-transparent">
          <div className="flex items-center mb-2 md:mb-0">
            <Image src="/logo.png" alt="logo" width={40} height={40} />
          </div>
          <div className="text-sm text-gray-300 mb-2 md:mb-0">
            © lari
          </div>
          <div className="flex items-center gap-4">
            <a
              className="text-gray-500 hover:text-gray-900 py-1"
              href="https://x.com/lari_hbar"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/xWhite.png"
                alt="x"
                width={16}
                height={16}
                className="cursor-pointer"
              />
            </a>
            <a
              className="text-gray-500 hover:text-gray-900 py-1"
              href="https://t.me/+JggX0Bsc_8AwMTZh"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/tg.png"
                alt="tg"
                width={35}
                height={35}
                className="cursor-pointer"
              />
            </a>
          </div>
        </footer>
      </div>
    </div>
  )
}