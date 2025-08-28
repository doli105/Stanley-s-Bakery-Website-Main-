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
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isOrderTrackingOpen, setIsOrderTrackingOpen] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const cart = useCart()

  const slideshowImages = [
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-08-14%20at%2001.16.27_411b42eb.jpg-6B2xdYI0CYqsYgPktOyZLvFBfdwTdS.jpeg", // Chocolate strawberry cake
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-08-14%20at%2001.16.28_7852dbd9.jpg-L3hdibFeecL1JvsuAAdADkCxhLyY1K.jpeg", // Salted caramel cupcakes
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-08-14%20at%2001.16.26_dc8c4c6a.jpg-C2fIfagb8oDTTrkamuFTqwV6gYh5Ug.jpeg", // Glazed donuts
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-08-14%20at%2001.16.28_07d7c411.jpg-I2t15f7NaNhxq5SlBqaImDOA1ITSVG.jpeg", // Churros with chocolate
  ]

  useEffect(() => {
    setIsVisible(true)

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 20,
        y: (e.clientY / window.innerHeight) * 20,
      })
    }

    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slideshowImages.length)
    }, 8000) // Change slide every 8 seconds

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
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
              filter: "contrast(1.1) saturate(1.1) brightness(1.05)",
            }}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-amber-900/5 via-black/10 to-amber-800/15" />
      </div>

      <div className="absolute inset-0 overflow-hidden">
        {/* Rising steam effects */}
        <div className="absolute bottom-0 left-1/4 w-2 h-32 opacity-30">
          <div className="steam-rise bg-gradient-to-t from-amber-200/60 to-transparent rounded-full animate-steam-1" />
        </div>

        {/* Golden flour dust particles */}
        {[...Array(6)].map((_, i) => (
          <div
            key={`flour-${i}`}
            className="absolute w-1 h-1 bg-gradient-to-r from-amber-200 to-yellow-300 rounded-full animate-flour-fall opacity-40 shadow-sm"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${12 + Math.random() * 8}s`, // Slower animation
            }}
          />
        ))}

        {/* Warm golden twinkling lights */}
        {[...Array(8)].map((_, i) => (
          <div
            key={`twinkle-${i}`}
            className="absolute w-1 h-1 bg-gradient-to-r from-amber-300 to-yellow-400 rounded-full animate-twinkle opacity-50 shadow-amber-300/30 shadow-sm"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${5 + Math.random() * 4}s`, // Slower animation
            }}
          />
        ))}

        {/* Subtle floating sparkles */}
        {[...Array(4)].map((_, i) => (
          <div
            key={`sparkle-${i}`}
            className="absolute animate-float opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 6}s`,
              animationDuration: `${8 + Math.random() * 6}s`, // Slower animation
            }}
          >
            <Sparkles className="h-3 w-3 text-amber-300 drop-shadow-sm" />
          </div>
        ))}
      </div>

      <div className="absolute top-4 right-4 z-20 flex flex-row sm:flex-col space-x-2 sm:space-x-0 sm:space-y-3">
        <button
          onClick={() => setIsCartOpen(true)}
          className="relative bg-white/95 backdrop-blur-sm hover:bg-white p-3 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 group border border-gray-200/50"
          disabled={!cart.isLoaded}
          title="View Cart"
        >
          <ShoppingCart className="h-5 w-5 text-gray-800 group-hover:text-gray-900" />
          {totalItems > 0 && (
            <span className="absolute -top-1 -right-1 bg-gradient-to-r from-amber-400 to-yellow-500 text-amber-900 text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-pulse shadow-md">
              {totalItems}
            </span>
          )}
        </button>

        <button
          onClick={() => setIsOrderTrackingOpen(true)}
          className="bg-white/95 backdrop-blur-sm hover:bg-white p-3 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 group border border-gray-200/50"
          title="Track Your Order"
        >
          <Package className="h-5 w-5 text-gray-800 group-hover:text-gray-900" />
        </button>
      </div>

      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
        {slideshowImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-500 ${
              index === currentSlide ? "bg-amber-300 shadow-lg" : "bg-white/50 hover:bg-white/70"
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
                <Star
                  key={i}
                  className={`h-4 w-4 sm:h-5 sm:w-5 fill-amber-400 text-amber-400 transition-all duration-300 hover:scale-125 drop-shadow-lg ${isVisible ? "animate-scaleIn" : ""}`}
                  style={{ animationDelay: `${0.5 + i * 0.1}s` }}
                />
              ))}
            </div>
            <span
              className="text-sm sm:text-base text-amber-100 font-medium drop-shadow-2xl"
              style={{ textShadow: "1px 1px 4px rgba(0,0,0,0.8)" }}
            >
              500+ Happy Customers
            </span>
            <Sparkles className="h-4 w-4 text-amber-300 animate-pulse drop-shadow-lg" />
          </div>

          <div className={`${isVisible ? "animate-slideInFromLeft stagger-2" : "opacity-0"}`}>
            <h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight drop-shadow-2xl max-w-4xl mx-auto"
              style={{ textShadow: "2px 2px 8px rgba(0,0,0,0.8), 0 0 16px rgba(0,0,0,0.6)" }}
            >
              <span className="inline-block hover:animate-pulse transition-all duration-300">Baked</span>{" "}
              <span className="inline-block hover:animate-pulse transition-all duration-300">with</span>
              <span
                className="font-dancing-script text-amber-300 block text-5xl sm:text-6xl md:text-7xl lg:text-8xl hover:text-yellow-300 transition-colors duration-500 drop-shadow-2xl my-2"
                style={{ textShadow: "2px 2px 8px rgba(0,0,0,0.8), 0 0 16px rgba(0,0,0,0.6)" }}
              >
                Love,
              </span>
              <span className="inline-block hover:animate-pulse transition-all duration-300">Naturally!</span>
            </h1>
          </div>

          <div
            className={`flex flex-col gap-3 justify-center w-full max-w-xs sm:max-w-md lg:max-w-lg xl:max-w-xl mx-auto ${isVisible ? "animate-slideInFromBottom stagger-4" : "opacity-0"}`}
          >
            <Link href="/cakes" className="w-full">
              <Button
                size="default"
                className="w-full bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-500 hover:from-amber-600 hover:via-yellow-600 hover:to-amber-600 text-amber-900 font-bold px-4 py-3 sm:px-6 sm:py-4 lg:px-10 lg:py-6 xl:px-12 xl:py-7 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group border border-amber-400/30 text-sm sm:text-base lg:text-xl xl:text-2xl"
              >
                <span className="relative z-10">VIEW CAKE OPTIONS</span>
                <ArrowRight className="ml-2 h-5 w-5 sm:h-6 w-6 lg:h-7 lg:w-7 xl:h-8 xl:w-8 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </Link>
          </div>

          <div
            className={`flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 lg:gap-6 w-full max-w-xs sm:max-w-md lg:max-w-lg xl:max-w-xl mx-auto ${isVisible ? "animate-slideInFromBottom stagger-5" : "opacity-0"}`}
          >
            <button
              onClick={() => setIsCartOpen(true)}
              className="flex items-center justify-center space-x-2 px-3 py-2 sm:px-4 sm:py-2 lg:px-8 lg:py-4 xl:px-10 xl:py-5 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group border border-gray-200/50 w-full sm:w-auto text-xs sm:text-sm lg:text-base xl:text-lg"
              disabled={!cart.isLoaded}
            >
              <ShoppingCart className="h-3 w-3 sm:h-4 sm:w-4 lg:h-5 lg:w-5 xl:h-6 xl:w-6 text-gray-800 group-hover:text-gray-900" />
              <span className="font-medium text-gray-800 group-hover:text-gray-900">
                Cart {totalItems > 0 && `(${totalItems})`}
              </span>
            </button>

            <button
              onClick={() => setIsOrderTrackingOpen(true)}
              className="flex items-center justify-center space-x-2 px-3 py-2 sm:px-4 sm:py-2 lg:px-8 lg:py-4 xl:px-10 xl:py-5 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group border border-gray-200/50 w-full sm:w-auto text-xs sm:text-sm lg:text-base xl:text-lg"
            >
              <Package className="h-3 w-3 sm:h-4 sm:w-4 lg:h-5 lg:w-5 xl:h-6 xl:w-6 text-gray-800 group-hover:text-gray-900" />
              <span className="font-medium text-gray-800 group-hover:text-gray-900">Track Order</span>
            </button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-amber-300 rounded-full flex justify-center shadow-lg">
          <div className="w-1 h-3 bg-gradient-to-b from-amber-300 to-amber-400 rounded-full mt-2 animate-pulse shadow-sm"></div>
        </div>
      </div>

      {/* Modals */}
      {cart.isLoaded && <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />}
      <OrderTracking isOpen={isOrderTrackingOpen} onClose={() => setIsOrderTrackingOpen(false)} />
    </section>
  )
}
