"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Star, Sparkles, ShoppingCart, Package } from "lucide-react"
import Link from "next/link"
import { useCart } from "./CartContext"
import CartModal from "./CartModal"
import OrderTracking from "./OrderTracking"

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isOrderTrackingOpen, setIsOrderTrackingOpen] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const cart = useCart()

  const slideshowImages = [
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-08-14%20at%2001.16.27_411b42eb.jpg-6B2xdYI0CYqsYgPktOyZLvFBfdwTdS.jpeg",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-08-14%20at%2001.16.28_7852dbd9.jpg-L3hdibFeecL1JvsuAAdADkCxhLyY1K.jpeg",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-08-14%20at%2001.16.26_dc8c4c6a.jpg-C2fIfagb8oDTTrkamuFTqwV6gYh5Ug.jpeg",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-08-14%20at%2001.16.28_07d7c411.jpg-I2t15f7NaNhxq5SlBqaImDOA1ITSVG.jpeg",
  ]

  useEffect(() => {
    setIsVisible(true)

    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slideshowImages.length)
    }, 8000)

    return () => {
      clearInterval(slideInterval)
    }
  }, [slideshowImages.length])

  const totalItems = cart.isLoaded ? cart.getTotalItems() : 0

  return (
    <section className="relative overflow-hidden min-h-screen flex items-center">
      <div className="absolute inset-0">
        {slideshowImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-2000 ease-in-out ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
            style={{
              backgroundImage: `url("${image}")`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          />
        ))}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="absolute top-4 right-4 z-20 flex flex-row sm:flex-col space-x-2 sm:space-x-0 sm:space-y-3">
        <button
          onClick={() => setIsCartOpen(true)}
          className="relative bg-white/20 backdrop-blur-sm hover:bg-white/30 p-3 rounded-xl shadow-lg transition-all duration-300 hover:scale-105"
          disabled={!cart.isLoaded}
          title="View Cart"
        >
          <ShoppingCart className="h-5 w-5 text-white" />
          {totalItems > 0 && (
            <span className="absolute -top-1 -right-1 bg-amber-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </button>

        <button
          onClick={() => setIsOrderTrackingOpen(true)}
          className="bg-white/20 backdrop-blur-sm hover:bg-white/30 p-3 rounded-xl shadow-lg transition-all duration-300 hover:scale-105"
          title="Track Your Order"
        >
          <Package className="h-5 w-5 text-white" />
        </button>
      </div>

      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
        {slideshowImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-500 ${
              index === currentSlide ? "bg-amber-400 scale-125" : "bg-white/50 hover:bg-amber-300/70"
            }`}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 py-4 sm:py-6 lg:py-8 xl:py-12 relative z-10">
        <div className="flex flex-col items-center justify-start pt-16 sm:pt-20 lg:pt-24 min-h-[70vh] text-center space-y-6 sm:space-y-8 lg:space-y-10">
          <div
            className={`flex items-center justify-center space-x-2 ${isVisible ? "animate-slideInFromLeft stagger-1" : "opacity-0"}`}
          >
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 sm:h-5 sm:w-5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="text-sm sm:text-base text-white font-medium">500+ Happy Customers</span>
            <Sparkles className="h-4 w-4 text-amber-400" />
          </div>

          <div className={`${isVisible ? "animate-slideInFromLeft stagger-2" : "opacity-0"}`}>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight max-w-4xl mx-auto">
              Baked with
              <span className="font-dancing-script text-pink-400 block text-5xl sm:text-6xl md:text-7xl lg:text-8xl my-2">
                Love,
              </span>
              Naturally!
            </h1>
          </div>

          <div
            className={`flex flex-col gap-3 justify-center w-full max-w-xs sm:max-w-md lg:max-w-lg xl:max-w-xl mx-auto ${isVisible ? "animate-slideInFromBottom stagger-4" : "opacity-0"}`}
          >
            <Link href="/cakes" className="w-full">
              <Button
                size="default"
                className="w-full bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white font-bold px-4 py-3 sm:px-6 sm:py-4 lg:px-10 lg:py-6 xl:px-12 xl:py-7 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-sm sm:text-base lg:text-xl xl:text-2xl border-2 border-pink-400"
              >
                VIEW CAKE OPTIONS
                <ArrowRight className="ml-2 h-5 w-5 sm:h-6 w-6 lg:h-7 lg:w-7 xl:h-8 xl:w-8" />
              </Button>
            </Link>
          </div>

          <div
            className={`flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 lg:gap-6 w-full max-w-xs sm:max-w-md lg:max-w-lg xl:max-w-xl mx-auto ${isVisible ? "animate-slideInFromBottom stagger-5" : "opacity-0"}`}
          >
            <button
              onClick={() => setIsCartOpen(true)}
              className="flex items-center justify-center space-x-2 px-3 py-2 sm:px-4 sm:py-2 lg:px-8 lg:py-4 xl:px-10 xl:py-5 bg-white/20 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 w-full sm:w-auto text-xs sm:text-sm lg:text-base xl:text-lg"
              disabled={!cart.isLoaded}
            >
              <ShoppingCart className="h-3 w-3 sm:h-4 sm:w-4 lg:h-5 lg:w-5 xl:h-6 xl:w-6 text-white" />
              <span className="font-medium text-white">Cart {totalItems > 0 && `(${totalItems})`}</span>
            </button>

            <button
              onClick={() => setIsOrderTrackingOpen(true)}
              className="flex items-center justify-center space-x-2 px-3 py-2 sm:px-4 sm:py-2 lg:px-8 lg:py-4 xl:px-10 xl:py-5 bg-white/20 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 w-full sm:w-auto text-xs sm:text-sm lg:text-base xl:text-lg"
            >
              <Package className="h-3 w-3 sm:h-4 sm:w-4 lg:h-5 lg:w-5 xl:h-6 xl:w-6 text-white" />
              <span className="font-medium text-white">Track Order</span>
            </button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-amber-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-amber-400 rounded-full mt-2"></div>
        </div>
      </div>

      {cart.isLoaded && <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />}
      <OrderTracking isOpen={isOrderTrackingOpen} onClose={() => setIsOrderTrackingOpen(false)} />
    </section>
  )
}
