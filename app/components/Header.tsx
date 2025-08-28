"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, ShoppingCart, Package } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "./CartContext"
import CartModal from "./CartModal"
import OrderTracking from "./OrderTracking"
import Image from "next/image"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const cart = useCart()
  const [isOrderTrackingOpen, setIsOrderTrackingOpen] = useState(false)

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Gallery", href: "/gallery" },
    { name: "Cakes", href: "/cakes" },
    { name: "About", href: "/about" },
    { name: "Reviews", href: "/reviews" },
    { name: "Contact", href: "/contact" },
    { name: "Terms & Conditions", href: "/terms" },
  ]

  // Show loading state if cart is not loaded yet
  const totalItems = cart.isLoaded ? cart.getTotalItems() : 0

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md border-b border-amber-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 sm:h-18">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 sm:space-x-3">
            <Image
              src="/images/stanley-logo-full.jpg"
              alt="Stanley's Bakery"
              width={60}
              height={45}
              className="object-contain w-12 h-9 sm:w-16 sm:h-12 md:w-[70px] md:h-[52px]"
            />
            <div className="block">
              <h1 className="font-dancing-script text-base sm:text-xl md:text-2xl font-bold text-amber-900 leading-tight">
                Stanley's Bakery
              </h1>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-amber-800 hover:text-amber-900 font-medium transition-colors text-sm xl:text-base"
              >
                {item.name}
              </Link>
            ))}
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 text-amber-800 hover:text-amber-900 transition-colors"
                disabled={!cart.isLoaded}
              >
                <ShoppingCart className="h-5 w-5 xl:h-6 xl:w-6" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-yellow-500 text-amber-900 text-xs font-bold rounded-full h-4 w-4 xl:h-5 xl:w-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </button>
              <button
                onClick={() => setIsOrderTrackingOpen(true)}
                className="p-2 text-amber-800 hover:text-amber-900 transition-colors"
                title="Track Order"
              >
                <Package className="h-5 w-5 xl:h-6 xl:w-6" />
              </button>
              <Button
                className="bg-yellow-500 hover:bg-yellow-600 text-amber-900 font-bold text-sm px-4 py-2"
                onClick={() => (window.location.href = "/cakes")}
              >
                Order Now
              </Button>
            </div>
          </nav>

          {/* Mobile menu button and cart */}
          <div className="lg:hidden flex items-center space-x-1 sm:space-x-2">
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-amber-800 hover:text-amber-900 transition-colors"
              disabled={!cart.isLoaded}
            >
              <ShoppingCart className="h-5 w-5 sm:h-6 sm:w-6" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-yellow-500 text-amber-900 text-xs font-bold rounded-full h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
            <button className="p-2 text-amber-800" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-5 w-5 sm:h-6 sm:w-6" /> : <Menu className="h-5 w-5 sm:h-6 sm:w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white border-t border-amber-200">
            <nav className="py-4 space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block px-4 py-3 text-amber-800 hover:text-amber-900 font-medium hover:bg-amber-50 rounded-lg mx-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="px-4 pt-4 border-t border-amber-200 mt-4">
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => {
                      setIsCartOpen(true)
                      setIsMenuOpen(false)
                    }}
                    className="relative flex items-center justify-center space-x-2 p-3 text-amber-800 hover:text-amber-900 transition-colors bg-amber-50 rounded-lg"
                    disabled={!cart.isLoaded}
                  >
                    <ShoppingCart className="h-5 w-5" />
                    <span className="font-medium text-sm">Cart</span>
                    {totalItems > 0 && (
                      <span className="bg-yellow-500 text-amber-900 text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                        {totalItems}
                      </span>
                    )}
                  </button>
                  <button
                    onClick={() => {
                      setIsOrderTrackingOpen(true)
                      setIsMenuOpen(false)
                    }}
                    className="flex items-center justify-center space-x-2 p-3 text-amber-800 hover:text-amber-900 transition-colors bg-amber-50 rounded-lg"
                  >
                    <Package className="h-5 w-5" />
                    <span className="font-medium text-sm">Track</span>
                  </button>
                </div>
                <Button
                  className="w-full mt-3 bg-yellow-500 hover:bg-yellow-600 text-amber-900 font-bold"
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
