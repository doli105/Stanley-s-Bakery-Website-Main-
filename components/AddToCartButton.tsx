"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Plus } from "lucide-react"
import { useCart } from "@/components/CartContext"
import CakeCustomizationModal from "@/components/CakeCustomizationModal"

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
    try {
      const cartItem = {
        id: cake.id || `${category}-${subcategory}-${cake.name}`,
        name: cake.name,
        price: cake.basePrice || cake.price || 0,
        category: `${category} - ${subcategory}`,
        subcategory,
        serves: cake.serves || "1 person",
        image: cake.image || "/colorful-layered-cake.png",
      }

      addToCart(cartItem)
    } catch (error) {
      console.error("Error adding item to cart:", error)
    }
  }

  const handleCustomize = () => {
    try {
      setShowCustomization(true)
    } catch (error) {
      console.error("Error opening customization modal:", error)
    }
  }

  const needsCustomization =
    category === "celebration-special-occasion" || subcategory === "cupcakes" || subcategory === "cheesecakes"

  return (
    <>
      <div className={`flex gap-2 ${className}`}>
        {needsCustomization ? (
          <Button onClick={handleCustomize} variant={variant} size={size} className="flex-1">
            <Plus className="mr-2 h-4 w-4" />
            Customize & Add
          </Button>
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
