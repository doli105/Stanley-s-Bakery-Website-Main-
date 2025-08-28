"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"
import Link from "next/link"

const showcaseCakes: any[] = []

export default function CakeShowcase() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    const element = document.getElementById("cake-showcase")
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="cake-showcase"
      className="py-20 bg-gradient-to-br from-white via-amber-50/30 to-pink-50/30 relative overflow-hidden"
    >
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-10 w-40 h-40 bg-gradient-to-br from-yellow-200 to-amber-200 rounded-full opacity-10 animate-gentleFloat"></div>
        <div
          className="absolute bottom-20 left-10 w-32 h-32 bg-gradient-to-br from-pink-200 to-rose-200 rounded-full opacity-10 animate-gentleFloat"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className={`text-center mb-16 ${isVisible ? "animate-slideInFromTop" : "opacity-0"}`}>
          <div className="flex items-center justify-center mb-4">
            <Sparkles className="h-8 w-8 text-yellow-500 mr-2 animate-pulse" />
            <h2 className="text-4xl md:text-5xl font-bold text-amber-900">
              Our <span className="font-dancing-script text-pink-600">Signature Collections</span>
            </h2>
            <Sparkles className="h-8 w-8 text-pink-500 ml-2 animate-pulse" style={{ animationDelay: "0.5s" }} />
          </div>
          <p className="text-xl text-amber-700 max-w-3xl mx-auto">
            Discover our most popular cake categories, each crafted with premium ingredients and artistic flair
          </p>
        </div>

        <div
          className={`transition-all duration-1000 ${isVisible ? "animate-slideInFromBottom stagger-3" : "opacity-0"}`}
        >
          <div className="text-center py-16">
            <div className="max-w-lg mx-auto">
              <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-yellow-100 to-amber-100 rounded-full flex items-center justify-center">
                <svg className="w-12 h-12 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-amber-900 mb-4">Collections Coming Soon</h3>
              <p className="text-amber-700 mb-8 text-lg">
                We're curating our signature cake collections. In the meantime, contact us for custom designs and
                orders.
              </p>
              <Link href="/cakes">
                <Button className="bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-amber-900 font-bold btn-dynamic hover-lift group">
                  Contact for Custom Orders
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
