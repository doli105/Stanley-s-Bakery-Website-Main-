"use client"

import { X, Plus, Minus, ShoppingCart, CreditCard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useCart } from "./CartContext"
import Image from "next/image"
import { useState } from "react"
import CheckoutForm from "./CheckoutForm"

interface CartModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function CartModal({ isOpen, onClose }: CartModalProps) {
  const { items, updateQuantity, removeFromCart, getTotalPrice, getTotalItems } = useCart()
  const [showCheckout, setShowCheckout] = useState(false)

  if (!isOpen) return null

  if (showCheckout) {
    return (
      <CheckoutForm
        isOpen={true}
        onClose={() => {
          setShowCheckout(false)
          onClose()
        }}
      />
    )
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white border-amber-200">
        <CardHeader className="bg-gradient-to-r from-yellow-500 to-amber-500 text-amber-900">
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-bold flex items-center">
              <ShoppingCart className="mr-2 h-6 w-6" />
              Your Cart ({getTotalItems()} items)
            </CardTitle>
            <Button variant="ghost" size="icon" onClick={onClose} className="text-amber-900 hover:bg-amber-100">
              <X className="h-6 w-6" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="p-6">
          {items.length === 0 ? (
            <div className="text-center py-8">
              <ShoppingCart className="h-16 w-16 text-amber-300 mx-auto mb-4" />
              <p className="text-amber-700 text-lg">Your cart is empty</p>
              <p className="text-amber-600 text-sm">Add some delicious cakes to get started!</p>
            </div>
          ) : (
            <>
              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4 p-4 border border-amber-200 rounded-lg">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      width={80}
                      height={80}
                      className="rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-amber-900">{item.name}</h3>
                      <p className="text-sm text-amber-600">{item.category}</p>
                      <p className="text-sm text-amber-600">{item.serves}</p>
                      <p className="font-bold text-amber-800">R{item.price}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="h-8 w-8 border-amber-300"
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-8 text-center font-medium">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="h-8 w-8 border-amber-300"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      Remove
                    </Button>
                  </div>
                ))}
              </div>

              <div className="border-t border-amber-200 pt-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xl font-bold text-amber-900">Total: R{getTotalPrice().toFixed(2)}</span>
                </div>
                <div className="flex gap-4">
                  <Button
                    variant="outline"
                    onClick={onClose}
                    className="flex-1 border-amber-300 text-amber-700 hover:bg-amber-50 bg-transparent"
                  >
                    Continue Shopping
                  </Button>
                  <Button
                    onClick={() => setShowCheckout(true)}
                    className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-amber-900 font-bold"
                  >
                    <CreditCard className="mr-2 h-4 w-4" />
                    Proceed to Checkout
                  </Button>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
