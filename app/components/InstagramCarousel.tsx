"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Instagram } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

const instagramPosts = [
  // Heart Shaped Cakes
  {
    id: 1,
    image: "/images/heart-cake-1.jpg",
    alt: "Royal Birthday Crown Heart Cake",
  },
  {
    id: 2,
    image: "/images/heart-cake-2.jpg",
    alt: "August Calendar Heart Cake",
  },
  // Bento Cakes
  {
    id: 3,
    image: "/images/bento-cake-1.jpg",
    alt: "Pink Pearl 31st Birthday Bento Set",
  },
  {
    id: 4,
    image: "/images/bento-cake-2.jpg",
    alt: "Black & Gold Luxury Bento Collection",
  },
  // Wedding Cakes
  {
    id: 5,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-08-14%20at%2016.53.11_0c246b40.jpg-Ldt5olDCPXhdMz079huRBvlfwiN1la.jpeg",
    alt: "Classic Pearl Elegance Wedding Cake",
  },
  {
    id: 6,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-08-14%20at%2016.56.02_36d003a3.jpg-qWyKj0R2acsJ81FsFf1LvWCdAwESVr.jpeg",
    alt: "Art Deco Luxury Wedding Cake",
  },
  // Frozen Cakes
  {
    id: 7,
    image: "/images/frozen-cake-1.jpg",
    alt: "Elsa Birthday Celebration Cake",
  },
  {
    id: 8,
    image: "/images/frozen-cake-2.jpg",
    alt: "Elsa Portrait Snowflake Cake",
  },
  // Spider Man Cakes
  {
    id: 9,
    image: "/images/spiderman-cake-1.jpg",
    alt: "Spider-Man Cityscape Adventure",
  },
  {
    id: 10,
    image: "/images/spiderman-cake-2.jpg",
    alt: "Classic Spider-Man Hero Cake",
  },
  // Princess Cakes
  {
    id: 11,
    image: "/images/princess-cake-1.jpg",
    alt: "Barbie Rainbow Princess Cake",
  },
  {
    id: 12,
    image: "/images/princess-cake-2.jpg",
    alt: "Disney Princess Castle Cake",
  },
  // Milestone Cakes
  {
    id: 13,
    image: "/images/milestone-cake-1.jpg",
    alt: "January 2025 Calendar Cake",
  },
  {
    id: 14,
    image: "/images/milestone-cake-2.jpg",
    alt: "Kele 40th Birthday Elegance",
  },
  // Gentleman Cakes
  {
    id: 15,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-08-14%20at%2016.38.19_850e72b0.jpg-3wy6SbQRsD1Kgc4wPIt0QXagA66h5i.jpeg",
    alt: "Manchester City Football Celebration",
  },
  {
    id: 16,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-08-14%20at%2016.38.19_07b048fa.jpg-QSBl6nbnsbLYVA0PBk3rakE2pJZgMO.jpeg",
    alt: "Elegant Navy Ribbon Birthday Cake",
  },
  // Cocomelon Cakes
  {
    id: 17,
    image: "/images/cocomelon-cake-1.jpg",
    alt: "JJ Rainbow Garden Cake",
  },
  {
    id: 18,
    image: "/images/cocomelon-cake-2.jpg",
    alt: "JJ First Birthday Celebration",
  },
  // Jungle Cakes
  {
    id: 19,
    image: "/images/jungle-cake-1.jpg",
    alt: "Safari Adventure Two-Tier Cake",
  },
  {
    id: 20,
    image: "/images/jungle-cake-2.jpg",
    alt: "Miranda's Jungle Paradise Cake",
  },
]

export default function InstagramCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [itemsPerView, setItemsPerView] = useState(6)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerView(2)
      } else if (window.innerWidth < 768) {
        setItemsPerView(3)
      } else if (window.innerWidth < 1024) {
        setItemsPerView(4)
      } else {
        setItemsPerView(6)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + itemsPerView >= instagramPosts.length ? 0 : prevIndex + 1))
    }, 1500) // Increased speed from 3000ms to 1500ms

    return () => clearInterval(timer)
  }, [itemsPerView])

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + itemsPerView >= instagramPosts.length ? 0 : prevIndex + 1))
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? Math.max(0, instagramPosts.length - itemsPerView) : prevIndex - 1,
    )
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-amber-900 mb-4">
            Follow Our <span className="font-dancing-script text-pink-600">Sweet Journey</span>
          </h2>
          <p className="text-amber-700 mb-6">Get inspired by our latest creations on Instagram</p>
          <Button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-300">
            <Instagram className="mr-2 h-5 w-5" />
            Follow @stanleysbakery
          </Button>
        </div>

        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all duration-300 hover:scale-110"
          >
            <ChevronLeft className="h-6 w-6 text-amber-800" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all duration-300 hover:scale-110"
          >
            <ChevronRight className="h-6 w-6 text-amber-800" />
          </button>

          {/* Carousel Container */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-300 ease-in-out" // Reduced transition duration from 500ms to 300ms for faster sliding
              style={{ transform: `translateX(-${(currentIndex * 100) / itemsPerView}%)` }}
            >
              {instagramPosts.map((post) => (
                <div
                  key={post.id}
                  className="group relative overflow-hidden aspect-square flex-shrink-0"
                  style={{ width: `${100 / itemsPerView}%` }}
                >
                  <div className="p-2">
                    <div className="relative aspect-square overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                      <Image
                        src={post.image || "/placeholder.svg"}
                        alt={post.alt}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center rounded-lg">
                        <Instagram className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                        <div className="flex items-center space-x-1 mb-1">
                          <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                          <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        </div>
                        <p className="text-xs text-white font-medium truncate">{post.alt}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-6 space-x-2">
            {Array.from({ length: Math.ceil(instagramPosts.length / itemsPerView) }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index * itemsPerView)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${Math.floor(currentIndex / itemsPerView) === index ? "bg-pink-500 w-6" : "bg-amber-300 hover:bg-amber-400"}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
