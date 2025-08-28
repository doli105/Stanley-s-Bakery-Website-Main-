"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

const galleryImages = [
  {
    id: 1,
    src: "/placeholder.svg?height=400&width=400&text=Elegant+white+3-tier+wedding+cake+with+roses",
    alt: "Elegant Wedding Cake",
    category: "Wedding",
  },
  {
    id: 2,
    src: "/placeholder.svg?height=400&width=400&text=Princess+castle+cake+pink+and+purple",
    alt: "Princess Castle Cake",
    category: "Birthday",
  },
  {
    id: 3,
    src: "/placeholder.svg?height=400&width=400&text=Superhero+themed+cake+with+action+figures",
    alt: "Superhero Adventure Cake",
    category: "Birthday",
  },
  {
    id: 4,
    src: "/placeholder.svg?height=400&width=400&text=Corporate+branded+cake+with+logo",
    alt: "Corporate Branding Cake",
    category: "Corporate",
  },
  {
    id: 5,
    src: "/placeholder.svg?height=400&width=400&text=Unicorn+cake+with+rainbow+mane",
    alt: "Unicorn Fantasy Cake",
    category: "Birthday",
  },
  {
    id: 6,
    src: "/placeholder.svg?height=400&width=400&text=Money+drip+cake+with+chocolate+drip",
    alt: "Money Drip Cake",
    category: "Custom",
  },
  {
    id: 7,
    src: "/placeholder.svg?height=400&width=400&text=Floral+tiered+wedding+cake+with+flowers",
    alt: "Floral Wedding Cake",
    category: "Wedding",
  },
  {
    id: 8,
    src: "/placeholder.svg?height=400&width=400&text=3D+sculpted+custom+novelty+cake",
    alt: "3D Custom Sculpture",
    category: "Custom",
  },
]

export default function AnimatedGallery() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const itemsPerView = 4

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    const element = document.getElementById("animated-gallery")
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + itemsPerView >= galleryImages.length ? 0 : prevIndex + 1))
    }, 4000)

    return () => clearInterval(timer)
  }, [itemsPerView])

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + itemsPerView >= galleryImages.length ? 0 : prevIndex + 1))
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? Math.max(0, galleryImages.length - itemsPerView) : prevIndex - 1))
  }

  return (
    <section
      id="animated-gallery"
      className="py-16 bg-gradient-to-br from-amber-50 to-pink-50 relative overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-10 left-10 animate-bounce"
          style={{ animationDelay: "0s", animationDuration: "4s" }}
        >
          <svg className="w-6 h-6 text-pink-200 opacity-30" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C10.9 2 10 2.9 10 4s.9 2 2 2 2-.9 2-2-.9-2-2-2zm6 8c0-3.31-2.69-6-6-6S6 6.69 6 10v2c0 2.76 2.24 5 5 5h2c2.76 0 5-2.24 5-5v-2z" />
          </svg>
        </div>
        <div
          className="absolute top-20 right-16 animate-pulse"
          style={{ animationDelay: "1.5s", animationDuration: "5s" }}
        >
          <svg className="w-8 h-8 text-yellow-200 opacity-25" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 6c1.11 0 2-.9 2-2 0-.38-.1-.73-.29-1.03L12 1.27 10.29 2.97c-.19.3-.29.65-.29 1.03 0 1.1.89 2 2 2zm4.6 9.99l-1.07-1.07-1.08 1.07c-1.3 1.3-3.58 1.31-4.89 0l-1.07-1.07L7.4 15.99C8.7 17.3 10.8 17.3 12 16.2c1.2 1.1 3.3 1.1 4.6-.21z" />
          </svg>
        </div>
        <div
          className="absolute bottom-16 left-1/4 animate-bounce"
          style={{ animationDelay: "2s", animationDuration: "6s" }}
        >
          <svg className="w-7 h-7 text-orange-200 opacity-20" fill="currentColor" viewBox="0 0 24 24">
            <circle cx="12" cy="8" r="3" fill="currentColor" />
            <path d="M12 12c-2 0-6 1-6 3v2h12v-2c0-2-4-3-6-3z" />
          </svg>
        </div>
        <div
          className="absolute bottom-32 right-20 animate-pulse"
          style={{ animationDelay: "3s", animationDuration: "4.5s" }}
        >
          <svg className="w-9 h-9 text-pink-300 opacity-25" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-pink-600 to-orange-500 bg-clip-text text-transparent mb-4 font-serif">
            Our Sweet <span className="font-dancing-script text-pink-600">Gallery</span>
          </h2>
          <p className="text-pink-600 text-lg max-w-2xl mx-auto mb-8">
            Discover our beautiful cake creations that have made celebrations extra special
          </p>
          <Link href="/cakes">
            <Button className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-bold px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
              Order Now
            </Button>
          </Link>
        </div>

        <div className="relative">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)` }}
            >
              {galleryImages.map((image, index) => (
                <div key={image.id} className="w-1/4 flex-shrink-0 px-2">
                  <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 border-pink-200 hover:border-pink-300">
                    <Image
                      src={image.src || "/placeholder.svg"}
                      alt={image.alt}
                      width={400}
                      height={400}
                      className="w-full h-64 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="font-semibold text-pink-700 mb-1">{image.alt}</h3>
                      <span className="text-sm text-pink-600 bg-pink-100 px-2 py-1 rounded-full">{image.category}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-pink-200 hover:border-pink-300"
          >
            <ChevronLeft className="h-6 w-6 text-pink-600" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-pink-200 hover:border-pink-300"
          >
            <ChevronRight className="h-6 w-6 text-pink-600" />
          </button>
        </div>
      </div>
    </section>
  )
}
