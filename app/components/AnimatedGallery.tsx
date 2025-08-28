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
    <section id="animated-gallery" className="py-16 bg-gradient-to-br from-amber-50 to-pink-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-amber-900 mb-4 font-serif">
            Our Sweet <span className="font-dancing-script text-pink-600">Gallery</span>
          </h2>
          <p className="text-amber-700 text-lg max-w-2xl mx-auto mb-8">
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
                  <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                    <Image
                      src={image.src || "/placeholder.svg"}
                      alt={image.alt}
                      width={400}
                      height={400}
                      className="w-full h-64 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="font-semibold text-amber-900 mb-1">{image.alt}</h3>
                      <span className="text-sm text-amber-600 bg-amber-100 px-2 py-1 rounded-full">
                        {image.category}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <ChevronLeft className="h-6 w-6 text-amber-800" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <ChevronRight className="h-6 w-6 text-amber-800" />
          </button>
        </div>
      </div>
    </section>
  )
}
