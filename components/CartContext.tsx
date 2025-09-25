"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  category: string
  subcategory?: string
  serves: string
  image: string
  customizations?: {
    size?: { id: string; name: string; serves: string; price: number }
    flavor?: { id: string; name: string; price: number }
    extras?: Array<{ id: string; name: string; price: number }>
    specialInstructions?: string
    uploadedImage?: string
  }
}

interface CartContextType {
  items: CartItem[]
  addToCart: (item: Omit<CartItem, "quantity">) => void
  removeFromCart: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  getTotalPrice: () => number
  getTotalItems: () => number
  showConfirmation: boolean
  setShowConfirmation: (show: boolean) => void
  isLoaded: boolean
  deliveryOption: "pickup" | "delivery"
  setDeliveryOption: (option: "pickup" | "delivery") => void
  deliveryAddress: string
  setDeliveryAddress: (address: string) => void
  deliveryCost: number
  setDeliveryCost: (cost: number) => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [deliveryOption, setDeliveryOption] = useState<"pickup" | "delivery">("pickup")
  const [deliveryAddress, setDeliveryAddress] = useState("")
  const [deliveryCost, setDeliveryCost] = useState(0)

  useEffect(() => {
    // Initialize cart from localStorage if available
    try {
      const savedCart = localStorage.getItem("stanley-bakery-cart")
      if (savedCart) {
        const cartData = JSON.parse(savedCart)
        setItems(cartData.items || cartData) // Handle both old and new format
        setDeliveryOption(cartData.deliveryOption || "pickup")
        setDeliveryAddress(cartData.deliveryAddress || "")
        setDeliveryCost(cartData.deliveryCost || 0)
      }
    } catch (error) {
      console.error("Error loading cart from localStorage:", error)
    }
    setIsLoaded(true)
  }, [])

  useEffect(() => {
    // Save cart to localStorage whenever items change
    if (isLoaded) {
      try {
        const cartData = {
          items,
          deliveryOption,
          deliveryAddress,
          deliveryCost,
        }
        localStorage.setItem("stanley-bakery-cart", JSON.stringify(cartData))
      } catch (error) {
        console.error("Error saving cart to localStorage:", error)
      }
    }
  }, [items, deliveryOption, deliveryAddress, deliveryCost, isLoaded])

  const addToCart = (item: Omit<CartItem, "quantity">) => {
    setItems((prevItems) => {
      const customizationId = item.customizations
        ? `${item.id}-${item.customizations.size?.id || ""}-${item.customizations.flavor?.id || ""}-${item.customizations.extras?.map((e) => e.id).join(",") || ""}`
        : item.id

      const existingItem = prevItems.find((i) => i.id === customizationId)
      if (existingItem) {
        return prevItems.map((i) => (i.id === customizationId ? { ...i, quantity: i.quantity + 1 } : i))
      }
      return [...prevItems, { ...item, id: customizationId, quantity: 1 }]
    })
    setShowConfirmation(true)
  }

  const removeFromCart = (id: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id))
  }

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id)
      return
    }
    setItems((prevItems) => prevItems.map((item) => (item.id === id ? { ...item, quantity } : item)))
  }

  const clearCart = () => {
    setItems([])
    setDeliveryOption("pickup")
    setDeliveryAddress("")
    setDeliveryCost(0)
  }

  const getTotalPrice = () => {
    const itemsTotal = items.reduce((total, item) => {
      let itemPrice = item.price
      if (item.customizations?.extras) {
        itemPrice += item.customizations.extras.reduce((extraTotal, extra) => extraTotal + extra.price, 0)
      }
      return total + itemPrice * item.quantity
    }, 0)

    return itemsTotal + (deliveryOption === "delivery" ? deliveryCost : 0)
  }

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0)
  }

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalPrice,
        getTotalItems,
        showConfirmation,
        setShowConfirmation,
        isLoaded,
        deliveryOption,
        setDeliveryOption,
        deliveryAddress,
        setDeliveryAddress,
        deliveryCost,
        setDeliveryCost,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
