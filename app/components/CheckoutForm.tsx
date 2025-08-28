"use client"

import type React from "react"

import { useState } from "react"
import { X, CreditCard, Calendar, User, Phone, Mail, MapPin, Lock, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useCart } from "./CartContext"

interface CheckoutFormProps {
  isOpen: boolean
  onClose: () => void
}

export default function CheckoutForm({ isOpen, onClose }: CheckoutFormProps) {
  const { items, getTotalPrice, clearCart } = useCart()
  const [deliveryMethod, setDeliveryMethod] = useState("")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    eventDate: "",
    customNotes: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardName: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isProcessing, setIsProcessing] = useState(false)

  const deliveryFee = deliveryMethod === "delivery" ? 15 : 0
  const totalAmount = getTotalPrice() + deliveryFee

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    // Delivery method validation
    if (!deliveryMethod) {
      newErrors.deliveryMethod = "Please select a delivery method"
    }

    // Personal information validation
    if (!formData.name.trim()) {
      newErrors.name = "Full name is required"
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email address is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required"
    } else if (!/^[\d\s\-+$$$$]{10,}$/.test(formData.phone.replace(/\s/g, ""))) {
      newErrors.phone = "Please enter a valid phone number"
    }

    if (!formData.eventDate) {
      newErrors.eventDate = "Event date is required"
    } else {
      const selectedDate = new Date(formData.eventDate)
      const minDate = new Date()
      minDate.setDate(minDate.getDate() + 3) // 3 days minimum notice
      if (selectedDate < minDate) {
        newErrors.eventDate = "Event date must be at least 3 days from today"
      }
    }

    // Address validation for delivery
    if (deliveryMethod === "delivery") {
      if (!formData.address.trim()) {
        newErrors.address = "Delivery address is required"
      } else if (formData.address.trim().length < 10) {
        newErrors.address = "Please provide a complete address"
      }
    }

    // Payment information validation
    if (!formData.cardNumber.trim()) {
      newErrors.cardNumber = "Card number is required"
    } else if (!/^\d{13,19}$/.test(formData.cardNumber.replace(/\s/g, ""))) {
      newErrors.cardNumber = "Please enter a valid card number"
    }

    if (!formData.expiryDate.trim()) {
      newErrors.expiryDate = "Expiry date is required"
    } else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.expiryDate)) {
      newErrors.expiryDate = "Please enter date in MM/YY format"
    } else {
      const [month, year] = formData.expiryDate.split("/")
      const expiry = new Date(2000 + Number.parseInt(year), Number.parseInt(month) - 1)
      if (expiry < new Date()) {
        newErrors.expiryDate = "Card has expired"
      }
    }

    if (!formData.cvv.trim()) {
      newErrors.cvv = "CVV is required"
    } else if (!/^\d{3,4}$/.test(formData.cvv)) {
      newErrors.cvv = "CVV must be 3 or 4 digits"
    }

    if (!formData.cardName.trim()) {
      newErrors.cardName = "Cardholder name is required"
    } else if (formData.cardName.trim().length < 2) {
      newErrors.cardName = "Please enter the full cardholder name"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsProcessing(true)

    try {
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Generate order number
      const orderNumber = `ORD-${new Date().getFullYear()}-${String(Date.now()).slice(-6)}`

      console.log("Payment submitted:", {
        orderNumber,
        deliveryMethod,
        formData,
        items,
        totalAmount,
      })

      alert(
        `Payment successful! Your order number is ${orderNumber}. We'll contact you within 24 hours to confirm your order details.`,
      )
      clearCart()
      onClose()
    } catch (error) {
      alert("Payment failed. Please try again or contact support.")
    } finally {
      setIsProcessing(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value })
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors({ ...errors, [field]: "" })
    }
  }

  const handleDeliveryMethodChange = (method: string) => {
    setDeliveryMethod(method)
    if (errors.deliveryMethod) {
      setErrors({ ...errors, deliveryMethod: "" })
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white border-amber-200">
        <CardHeader className="bg-gradient-to-r from-yellow-500 to-amber-500 text-amber-900">
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-bold flex items-center">
              <CreditCard className="mr-2 h-6 w-6" />
              Secure Checkout
            </CardTitle>
            <Button variant="ghost" size="icon" onClick={onClose} className="text-amber-900 hover:bg-amber-100">
              <X className="h-6 w-6" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Order Summary */}
            <div>
              <h3 className="text-xl font-bold text-amber-900 mb-4">Order Summary</h3>
              <div className="space-y-3 mb-4">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between items-center p-3 bg-amber-50 rounded-lg">
                    <div>
                      <p className="font-medium text-amber-900">{item.name}</p>
                      <p className="text-sm text-amber-600">Quantity: {item.quantity}</p>
                    </div>
                    <p className="font-bold text-amber-800">R{(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>

              <div className="border-t border-amber-200 pt-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-amber-700">Subtotal:</span>
                  <span className="text-amber-900">R{getTotalPrice().toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-amber-700">Delivery Fee:</span>
                  <span className="text-amber-900">R{deliveryFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-xl font-bold text-amber-900 border-t border-amber-200 pt-2">
                  <span>Total:</span>
                  <span>R{totalAmount.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Checkout Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Delivery Method */}
              <div>
                <label className="block text-sm font-medium text-amber-900 mb-3">Delivery Method *</label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => handleDeliveryMethodChange("pickup")}
                    className={`p-4 rounded-lg border transition-all flex items-center space-x-3 ${
                      deliveryMethod === "pickup"
                        ? "border-yellow-500 bg-yellow-50 text-amber-900"
                        : "border-amber-200 hover:border-amber-300 text-amber-700"
                    }`}
                  >
                    <MapPin className="h-5 w-5" />
                    <div className="text-left">
                      <div className="font-medium">Store Pickup</div>
                      <div className="text-sm opacity-75">Free</div>
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeliveryMethodChange("delivery")}
                    className={`p-4 rounded-lg border transition-all flex items-center space-x-3 ${
                      deliveryMethod === "delivery"
                        ? "border-yellow-500 bg-yellow-50 text-amber-900"
                        : "border-amber-200 hover:border-amber-300 text-amber-700"
                    }`}
                  >
                    <MapPin className="h-5 w-5" />
                    <div className="text-left">
                      <div className="font-medium">Home Delivery</div>
                      <div className="text-sm opacity-75">R15 fee</div>
                    </div>
                  </button>
                </div>
                {errors.deliveryMethod && (
                  <p className="text-red-600 text-sm mt-1 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.deliveryMethod}
                  </p>
                )}
              </div>

              {/* Personal Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-amber-900 mb-2">
                    <User className="inline h-4 w-4 mr-1" />
                    Full Name *
                  </label>
                  <Input
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className={`border-amber-200 focus:border-yellow-500 ${errors.name ? "border-red-500" : ""}`}
                    placeholder="Your full name"
                  />
                  {errors.name && (
                    <p className="text-red-600 text-sm mt-1 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.name}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-amber-900 mb-2">
                    <Phone className="inline h-4 w-4 mr-1" />
                    Phone Number *
                  </label>
                  <Input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className={`border-amber-200 focus:border-yellow-500 ${errors.phone ? "border-red-500" : ""}`}
                    placeholder="(555) 123-4567"
                  />
                  {errors.phone && (
                    <p className="text-red-600 text-sm mt-1 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.phone}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-amber-900 mb-2">
                    <Mail className="inline h-4 w-4 mr-1" />
                    Email Address *
                  </label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className={`border-amber-200 focus:border-yellow-500 ${errors.email ? "border-red-500" : ""}`}
                    placeholder="your@email.com"
                  />
                  {errors.email && (
                    <p className="text-red-600 text-sm mt-1 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.email}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-amber-900 mb-2">
                    <Calendar className="inline h-4 w-4 mr-1" />
                    Event Date *
                  </label>
                  <Input
                    type="date"
                    value={formData.eventDate}
                    onChange={(e) => handleInputChange("eventDate", e.target.value)}
                    className={`border-amber-200 focus:border-yellow-500 ${errors.eventDate ? "border-red-500" : ""}`}
                    min={new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]}
                  />
                  {errors.eventDate && (
                    <p className="text-red-600 text-sm mt-1 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.eventDate}
                    </p>
                  )}
                  <p className="text-xs text-amber-600 mt-1">Minimum 3 days notice required</p>
                </div>
              </div>

              {deliveryMethod === "delivery" && (
                <div>
                  <label className="block text-sm font-medium text-amber-900 mb-2">
                    <MapPin className="inline h-4 w-4 mr-1" />
                    Delivery Address *
                  </label>
                  <Textarea
                    value={formData.address}
                    onChange={(e) => handleInputChange("address", e.target.value)}
                    className={`border-amber-200 focus:border-yellow-500 ${errors.address ? "border-red-500" : ""}`}
                    placeholder="Full delivery address including street, city, and postal code"
                  />
                  {errors.address && (
                    <p className="text-red-600 text-sm mt-1 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.address}
                    </p>
                  )}
                </div>
              )}

              {/* Payment Information */}
              <div className="border-t border-amber-200 pt-6">
                <h4 className="text-lg font-bold text-amber-900 mb-4 flex items-center">
                  <Lock className="h-5 w-5 mr-2" />
                  Secure Payment
                </h4>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-amber-900 mb-2">Card Number *</label>
                    <Input
                      value={formData.cardNumber}
                      onChange={(e) => handleInputChange("cardNumber", e.target.value)}
                      className={`border-amber-200 focus:border-yellow-500 ${errors.cardNumber ? "border-red-500" : ""}`}
                      placeholder="1234 5678 9012 3456"
                    />
                    {errors.cardNumber && (
                      <p className="text-red-600 text-sm mt-1 flex items-center">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        {errors.cardNumber}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-amber-900 mb-2">Expiry Date *</label>
                      <Input
                        value={formData.expiryDate}
                        onChange={(e) => handleInputChange("expiryDate", e.target.value)}
                        className={`border-amber-200 focus:border-yellow-500 ${errors.expiryDate ? "border-red-500" : ""}`}
                        placeholder="MM/YY"
                      />
                      {errors.expiryDate && (
                        <p className="text-red-600 text-sm mt-1 flex items-center">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          {errors.expiryDate}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-amber-900 mb-2">CVV *</label>
                      <Input
                        value={formData.cvv}
                        onChange={(e) => handleInputChange("cvv", e.target.value)}
                        className={`border-amber-200 focus:border-yellow-500 ${errors.cvv ? "border-red-500" : ""}`}
                        placeholder="123"
                      />
                      {errors.cvv && (
                        <p className="text-red-600 text-sm mt-1 flex items-center">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          {errors.cvv}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-amber-900 mb-2">Cardholder Name *</label>
                    <Input
                      value={formData.cardName}
                      onChange={(e) => handleInputChange("cardName", e.target.value)}
                      className={`border-amber-200 focus:border-yellow-500 ${errors.cardName ? "border-red-500" : ""}`}
                      placeholder="Name as it appears on card"
                    />
                    {errors.cardName && (
                      <p className="text-red-600 text-sm mt-1 flex items-center">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        {errors.cardName}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Custom Notes */}
              <div>
                <label className="block text-sm font-medium text-amber-900 mb-2">Special Instructions</label>
                <Textarea
                  value={formData.customNotes}
                  onChange={(e) => handleInputChange("customNotes", e.target.value)}
                  className="border-amber-200 focus:border-yellow-500"
                  placeholder="Any special requests or dietary requirements..."
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-amber-900 font-bold py-3 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isProcessing}
              >
                <Lock className="mr-2 h-5 w-5" />
                {isProcessing ? "Processing Payment..." : `Complete Secure Payment - R${totalAmount.toFixed(2)}`}
              </Button>
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
