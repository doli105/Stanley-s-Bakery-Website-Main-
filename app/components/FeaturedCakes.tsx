"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"

const featuredCakes: any[] = []

export default function FeaturedCakes() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-amber-900 mb-4">
            Featured <span className="font-dancing-script text-pink-600">Creations</span>
          </h2>
          <p className="text-amber-700 max-w-2xl mx-auto">
            Discover our most popular cake designs, each crafted with premium ingredients and artistic flair
          </p>
        </div>

        <div className="text-center py-12">
          <div className="max-w-md mx-auto">
            <div className="w-20 h-20 mx-auto mb-6 bg-amber-100 rounded-full flex items-center justify-center">
              <svg className="w-10 h-10 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-amber-900 mb-3">Featured Cakes Coming Soon</h3>
            <p className="text-amber-700 mb-6">
              We're updating our featured collection. Contact us for custom cake orders.
            </p>
            <Button
              className="bg-yellow-500 hover:bg-yellow-600 text-amber-900 font-bold"
              onClick={() =>
                window.open("https://wa.me/27784914587?text=Hi! I would like to place a custom cake order", "_blank")
              }
            >
              Contact Us
            </Button>
          </div>
        </div>

        <div className="text-center mt-12">
          <Link href="/cakes">
            <Button
              size="lg"
              variant="outline"
              className="border-amber-300 text-amber-700 hover:bg-amber-50 bg-transparent"
            >
              View All Cakes
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
