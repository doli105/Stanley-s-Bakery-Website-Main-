"use client"

import { useState, useEffect, useRef } from "react"
import ReviewSection from "../components/ReviewSection"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Reviews() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <div className="bg-gradient-to-br from-pink-50 via-orange-50 to-yellow-50 min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-20 left-10 text-4xl opacity-20"
          style={{ animation: "breathe 3s ease-in-out infinite" }}
        >
          🧁
        </div>
        <div
          className="absolute top-40 right-20 text-3xl opacity-15"
          style={{ animation: "breathe 4s ease-in-out infinite 0.5s" }}
        >
          🍰
        </div>
        <div
          className="absolute top-60 left-1/4 text-5xl opacity-10"
          style={{ animation: "breathe 3.5s ease-in-out infinite 1s" }}
        >
          🎂
        </div>
        <div
          className="absolute bottom-40 right-10 text-4xl opacity-20"
          style={{ animation: "breathe 4.5s ease-in-out infinite 2s" }}
        >
          🧁
        </div>
        <div
          className="absolute bottom-20 left-20 text-3xl opacity-15"
          style={{ animation: "breathe 3.2s ease-in-out infinite 0.5s" }}
        >
          🍰
        </div>
        <div
          className="absolute top-1/3 right-1/3 text-4xl opacity-10"
          style={{ animation: "breathe 4.2s ease-in-out infinite 1.5s" }}
        >
          🎂
        </div>
        <div
          className="absolute bottom-1/3 left-1/2 text-3xl opacity-20"
          style={{ animation: "breathe 3.8s ease-in-out infinite 3s" }}
        >
          🧁
        </div>
      </div>

      <style jsx>{`
        @keyframes breathe {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
        }
      `}</style>

      <div className="pt-2 pb-8 relative z-10">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-pink-600 via-pink-500 to-orange-500 bg-clip-text text-transparent mb-2 font-serif">
              Reviews
            </h1>
            <p className="text-sm md:text-lg text-pink-600 max-w-3xl mx-auto font-medium mb-4">
              See what our delighted customers have to say about Stanley's magical creations
            </p>
          </div>
        </div>
      </div>

      <div
        ref={sectionRef}
        className={`transition-all duration-1000 relative z-10 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <ReviewSection />
      </div>

      {/* Added WhatsApp floating button */}
      <div className="fixed bottom-6 right-6 z-50">
        <a
          href="https://wa.me/27784914587?text=Hi! I'm interested in ordering a cake from Stanley's Bakery"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center"
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
          </svg>
        </a>
      </div>

      <div className="bg-gradient-to-r from-pink-200 via-orange-200 to-yellow-200 py-16 mt-16 relative z-10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-pink-700 mb-6 font-serif">
            Love What You See? Order Your Cake Today!
          </h2>
          <p className="text-pink-600 mb-8 max-w-2xl mx-auto text-lg leading-relaxed">
            Join our happy customers and experience the magic of Stanley's Bakery for yourself.
          </p>
          <Link href="/cakes">
            <Button className="bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white font-bold py-4 px-10 text-xl rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-white hover:scale-105">
              Order Now
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
