"use client"

import { useState } from "react"
import { Button } from "../components/ui/button"
import { ShoppingCart, Plus } from "lucide-react"
import { useCart } from "./CartContext"
import CakeCustomizationModal from "./CakeCustomizationModal"

interface AddToCartButtonProps {
  cake: any
  category: string
  subcategory: string
  variant?: "default" | "outline" | "ghost"
  size?: "default" | "sm" | "lg"
  className?: string
}

export default function AddToCartButton({
  cake,
  category,
  subcategory,
  variant = "default",
  size = "default",
  className = "",
}: AddToCartButtonProps) {
  const [showCustomization, setShowCustomization] = useState(false)
  const { addToCart } = useCart()

  const handleQuickAdd = () => {
    const cartItem = {
      id: cake.id || `${category}-${subcategory}-${cake.name}`,
      name: cake.name,
      price: cake.basePrice || Number.parseFloat(cake.price?.toString().replace(/[^\\d.]/g, "") || "0"),
      category: `${category} - ${subcategory}`,
      subcategory,
      serves: cake.serves || "1 person",
      image: cake.image || "/colorful-layered-cake.png",
    }

    addToCart(cartItem)
  }

  const handleCustomize = () => {
    setShowCustomization(true)
  }

  const needsCustomization =
    category === "celebration-special-occasion" ||
    subcategory === "cupcakes" ||
    subcategory === "cheesecakes" ||
    subcategory === "spiderman-cakes"

  const getPriceRange = () => {
    if (cake.pricing && cake.pricing.length > 0) {
      const minPrice = cake.pricing[0].price
      const maxPrice = cake.pricing[cake.pricing.length - 1].price
      return `R${minPrice} - R${maxPrice}`
    }
    return null
  }

  const priceRange = getPriceRange()

  return (
    <>
      <div className={`flex flex-col gap-2 ${className}`}>
        {needsCustomization ? (
          <>
            <Button onClick={handleCustomize} variant={variant} size={size} className="flex-1">
              <Plus className="mr-2 h-4 w-4" />
              Customize & Add
            </Button>
            {priceRange && subcategory === "spiderman-cakes" && (
              <span className="text-xs font-semibold text-center text-gray-600">{priceRange}</span>
            )}
          </>
        ) : (
          <Button onClick={handleQuickAdd} variant={variant} size={size} className="flex-1">
            <ShoppingCart className="mr-2 h-4 w-4" />
            Add to Cart
          </Button>
        )}
      </div>

      {showCustomization && (
        <CakeCustomizationModal
          isOpen={showCustomization}
          onClose={() => setShowCustomization(false)}
          cake={cake}
          category={category}
          subcategory={subcategory}
        />
      )}
    </>
  )
}
