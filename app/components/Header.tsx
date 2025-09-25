"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, ShoppingCart, Package } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "./CartContext"
import CartModal from "./CartModal"
import OrderTracking from "./OrderTracking"
import Image from "next/image"
import { usePathname } from "next/navigation"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const cart = useCart()
  const [isOrderTrackingOpen, setIsOrderTrackingOpen] = useState(false)
  const pathname = usePathname()
  const [logoError, setLogoError] = useState(false)

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Gallery", href: "/gallery" },
    { name: "Cakes", href: "/cakes" },
    { name: "About", href: "/about" },
    { name: "Reviews", href: "/reviews" },
    { name: "Contact", href: "/contact" },
    { name: "Terms & Conditions", href: "/terms" },
  ]

  const totalItems = cart.isLoaded ? cart.getTotalItems() : 0

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-400 shadow-lg border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 sm:h-18">
          <Link
            href="/"
            className="flex items-center space-x-2 sm:space-x-3 hover:scale-105 transition-transform duration-300"
          >
            {!logoError ? (
              <Image
                src="/images/stanley-logo-full.jpg"
                alt="Stanley's Bakery"
                width={60}
                height={45}
                className="object-contain w-12 h-9 sm:w-16 sm:h-12 md:w-[70px] md:h-[52px] rounded-lg shadow-md"
                onError={() => setLogoError(true)}
                priority
              />
            ) : (
              <div className="w-12 h-9 sm:w-16 sm:h-12 md:w-[70px] md:h-[52px] bg-gradient-to-br from-pink-500 to-pink-600 rounded-lg shadow-md flex items-center justify-center">
                <span className="text-white font-bold text-xs sm:text-sm md:text-base">SB</span>
              </div>
            )}
            <div className="block">
              <h1 className="font-dancing-script text-base sm:text-xl md:text-2xl font-bold text-white leading-tight drop-shadow-md">
                Stanley's Bakery
              </h1>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`font-medium transition-all duration-300 text-sm xl:text-base hover:scale-105 ${
                  pathname === item.href ? "text-pink-600 font-bold" : "text-pink-500 hover:text-pink-600"
                }`}
              >
                {item.name}
              </Link>
            ))}
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 text-pink-500 hover:text-pink-600 transition-colors duration-300 hover:scale-110"
                disabled={!cart.isLoaded}
              >
                <ShoppingCart className="h-5 w-5 xl:h-6 xl:w-6" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gradient-to-r from-pink-500 to-pink-400 text-white text-xs font-bold rounded-full h-4 w-4 xl:h-5 xl:w-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </button>
              <button
                onClick={() => setIsOrderTrackingOpen(true)}
                className="p-2 text-pink-500 hover:text-pink-600 transition-colors duration-300 hover:scale-110"
                title="Track Order"
              >
                <Package className="h-5 w-5 xl:h-6 xl:w-6" />
              </button>
              <Button
                className="bg-gradient-to-r from-pink-500 to-pink-400 hover:from-pink-600 hover:to-pink-500 text-white font-bold text-sm px-4 py-2 transition-all duration-300 hover:scale-105 shadow-lg"
                onClick={() => (window.location.href = "/cakes")}
              >
                Order Now
              </Button>
            </div>
          </nav>

          <div className="lg:hidden flex items-center space-x-1 sm:space-x-2">
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-pink-500 hover:text-pink-600 transition-colors duration-300"
              disabled={!cart.isLoaded}
            >
              <ShoppingCart className="h-5 w-5 sm:h-6 sm:w-6" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-pink-500 to-pink-400 text-white text-xs font-bold rounded-full h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
            <button
              className="p-2 bg-gradient-to-r from-pink-500 via-pink-400 to-pink-300 text-white hover:from-pink-600 hover:via-pink-500 hover:to-pink-400 transition-all duration-300 rounded-lg"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5 sm:h-6 sm:w-6" /> : <Menu className="h-5 w-5 sm:h-6 sm:w-6" />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="lg:hidden bg-white border-t shadow-lg">
            <nav className="py-4 space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block px-4 py-3 text-pink-500 hover:text-pink-600 font-medium hover:bg-pink-50 rounded-lg mx-2 transition-colors duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="px-4 pt-4 border-t mt-4">
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => {
                      setIsCartOpen(true)
                      setIsMenuOpen(false)
                    }}
                    className="relative flex items-center justify-center space-x-2 p-3 text-pink-500 hover:text-pink-600 transition-colors duration-300 bg-pink-50 rounded-lg hover:bg-pink-100"
                    disabled={!cart.isLoaded}
                  >
                    <ShoppingCart className="h-5 w-5" />
                    <span className="font-medium text-sm">Cart</span>
                    {totalItems > 0 && (
                      <span className="bg-gradient-to-r from-pink-500 to-pink-400 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                        {totalItems}
                      </span>
                    )}
                  </button>
                  <button
                    onClick={() => {
                      setIsOrderTrackingOpen(true)
                      setIsMenuOpen(false)
                    }}
                    className="flex items-center justify-center space-x-2 p-3 text-pink-500 hover:text-pink-600 transition-colors duration-300 bg-pink-50 rounded-lg hover:bg-pink-100"
                  >
                    <Package className="h-5 w-5" />
                    <span className="font-medium text-sm">Track</span>
                  </button>
                </div>
                <Button
                  className="w-full mt-3 bg-gradient-to-r from-pink-500 to-pink-400 hover:from-pink-600 hover:to-pink-500 text-white font-bold transition-all duration-300 shadow-lg"
                  onClick={() => (window.location.href = "/cakes")}
                >
                  Order Now
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
      {cart.isLoaded && <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />}
      <OrderTracking isOpen={isOrderTrackingOpen} onClose={() => setIsOrderTrackingOpen(false)} />
    </header>
  )
}
