"use client"

import { useState, useEffect, useRef } from "react"
import ReviewSection from "../components/ReviewSection"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const reviews = [
  {
    id: 1,
    name: "Sarah Johnson",
    rating: 5,
    review:
      "Stanley created the most beautiful wedding cake for us! Not only was it stunning to look at, but it tasted absolutely incredible. Every guest asked for the recipe. The attention to detail was perfect.",
    occasion: "Wedding Cake",
    date: "2 weeks ago",
    avatar: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 2,
    name: "Mike Rodriguez",
    rating: 5,
    review:
      "My daughter's dinosaur birthday cake was a huge hit! The kids were amazed by how realistic it looked, and the chocolate cake inside was delicious. Stanley really knows how to make kids' dreams come true.",
    occasion: "Kids Birthday",
    date: "1 month ago",
    avatar: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 3,
    name: "Emily Chen",
    rating: 5,
    review:
      "I ordered cupcakes for my office party and they were absolutely perfect! Beautiful presentation and every flavor was delicious. The team at Stanley's is so professional and accommodating.",
    occasion: "Corporate Event",
    date: "3 weeks ago",
    avatar: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 4,
    name: "David Thompson",
    rating: 5,
    review:
      "The anniversary cake Stanley made for my wife and me was beyond our expectations. The design was elegant and the red velvet flavor was to die for. We'll definitely be back for future celebrations!",
    occasion: "Anniversary",
    date: "1 week ago",
    avatar: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 5,
    name: "Lisa Martinez",
    rating: 5,
    review:
      "I've ordered several cakes from Stanley's over the years, and they never disappoint. The quality is consistently excellent, and the customer service is outstanding. Highly recommend!",
    occasion: "Multiple Orders",
    date: "2 months ago",
    avatar: "/placeholder.svg?height=100&width=100",
  },
]

const stats = [
  { number: "500+", label: "Happy Customers" },
  { number: "1,200+", label: "Cakes Created" },
  { number: "4.9/5", label: "Average Rating" },
  { number: "3", label: "Years Running" },
]

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
    <div className="bg-white min-h-screen">
      <div className="pt-2 pb-8">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-stanley-pink via-stanley-orange to-stanley-yellow bg-clip-text text-transparent mb-4 font-serif">
              Customer Reviews
            </h1>
            <p className="text-stanley-pink text-base md:text-lg mb-6">
              Discover our exquisite collection of handcrafted cakes and sweet treats
            </p>
          </div>
        </div>
      </div>

      <div
        ref={sectionRef}
        className={`transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <ReviewSection reviews={reviews} stats={stats} />
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

      <div className="bg-gradient-to-r from-pink-100 to-yellow-100 py-12 mt-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-stanley-pink mb-4 font-serif">
            Love What You See? Order Your Cake Today!
          </h2>
          <p className="text-stanley-pink mb-6 max-w-2xl mx-auto">
            Join our happy customers and experience the magic of Stanley's Bakery for yourself.
          </p>
          <Link href="/cakes">
            <Button className="bg-stanley-yellow hover:bg-yellow-400 text-stanley-brown font-bold py-3 px-8 text-lg rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-stanley-pink hover:border-pink-400">
              Order Now
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
