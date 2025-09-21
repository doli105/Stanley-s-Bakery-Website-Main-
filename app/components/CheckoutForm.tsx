"use client"

import { useState } from "react"
import { X, CreditCard, Calendar, User, Phone, Mail, AlertCircle, Package } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useCart } from "./CartContext"
import DeliveryCalculator from "./DeliveryCalculator"
import YocoPaymentForm from "./YocoPaymentForm"
import Image from "next/image"

interface CheckoutFormProps {
  isOpen: boolean
  onClose: () => void
}

export default function CheckoutForm({ isOpen, onClose }: CheckoutFormProps) {
  const { items, getTotalPrice, clearCart, deliveryOption, deliveryAddress, deliveryCost } = useCart()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    eventDate: "",
    customNotes: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [currentStep, setCurrentStep] = useState<"details" | "payment">("details")
  const [orderData, setOrderData] = useState<any>(null)

  const totalAmount = getTotalPrice()

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

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
    } else if (!/^[\d\s\-+()]{10,}$/.test(formData.phone.replace(/\s/g, ""))) {
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

    // Delivery validation
    if (deliveryOption === "delivery" && !deliveryAddress.trim()) {
      newErrors.delivery = "Please enter a delivery address and calculate delivery cost"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleProceedToPayment = () => {
    if (!validateForm()) {
      return
    }

    // Generate order number
    const orderNumber = `SB-${new Date().getFullYear()}-${String(Date.now()).slice(-6)}`

    // Prepare order data
    const preparedOrderData = {
      orderNumber,
      customer: formData,
      items: items.map((item) => ({
        ...item,
        customizations: item.customizations || {},
      })),
      delivery: {
        method: deliveryOption,
        address: deliveryOption === "delivery" ? deliveryAddress : "15 Turkmeinistan Cres, Randburg, Gauteng",
        cost: deliveryCost,
      },
      pricing: {
        subtotal: getTotalPrice() - deliveryCost,
        deliveryCost,
        total: totalAmount,
      },
      orderDate: new Date().toISOString(),
      eventDate: formData.eventDate,
      status: "pending_payment",
    }

    setOrderData(preparedOrderData)
    setCurrentStep("payment")
  }

  const handlePaymentSuccess = (paymentResult: any) => {
    console.log("[v0] Payment successful:", paymentResult)

    const orderSummary = `
Order Confirmation - ${orderData.orderNumber}

Payment ID: ${paymentResult.id}
Customer: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Event Date: ${formData.eventDate}

Delivery: ${deliveryOption === "pickup" ? "Store Pickup" : `Home Delivery to ${deliveryAddress}`}
${deliveryOption === "delivery" ? `Delivery Cost: R${deliveryCost}` : ""}

Items:
${items
  .map(
    (item) => `- ${item.name} (Qty: ${item.quantity}) - R${(item.price * item.quantity).toFixed(2)}
  ${item.customizations?.size ? `Size: ${item.customizations.size.name}` : ""}
  ${item.customizations?.flavor ? `Flavor: ${item.customizations.flavor.name}` : ""}
  ${item.customizations?.extras?.length ? `Extras: ${item.customizations.extras.map((e) => e.name).join(", ")}` : ""}
  ${item.customizations?.specialInstructions ? `Special Instructions: ${item.customizations.specialInstructions}` : ""}`,
  )
  .join("\n\n")}

Total Paid: R${totalAmount.toFixed(2)}

${formData.customNotes ? `Additional Notes: ${formData.customNotes}` : ""}
    `

    alert(
      `Payment successful!\n\nOrder Number: ${orderData.orderNumber}\nPayment ID: ${paymentResult.id}\n\nWe'll contact you within 24 hours to confirm your order details and arrange ${deliveryOption === "pickup" ? "pickup" : "delivery"}.`,
    )

    console.log("[v0] Order completed:", orderSummary)

    clearCart()
    onClose()
  }

  const handlePaymentError = (error: string) => {
    console.error("[v0] Payment failed:", error)
    alert(`Payment failed: ${error}\n\nPlease try again or contact support.`)
    setCurrentStep("details")
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value })
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors({ ...errors, [field]: "" })
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-6xl max-h-[90vh] overflow-y-auto bg-white border-amber-200">
        <CardHeader className="bg-gradient-to-r from-yellow-500 to-amber-500 text-amber-900">
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-bold flex items-center">
              <Package className="mr-2 h-6 w-6" />
              {currentStep === "details" ? "Checkout" : "Secure Payment"}
            </CardTitle>
            <Button variant="ghost" size="icon" onClick={onClose} className="text-amber-900 hover:bg-amber-100">
              <X className="h-6 w-6" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="p-6">
          {currentStep === "details" ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Order Summary - Left Column */}
              <div className="lg:col-span-1">
                <h3 className="text-xl font-bold text-amber-900 mb-4">Order Summary</h3>
                <div className="space-y-3 mb-4">
                  {items.map((item) => (
                    <div key={item.id} className="p-4 bg-amber-50 rounded-lg border border-amber-200">
                      <div className="flex items-start space-x-3">
                        <Image
                          src={item.image || "/colorful-layered-cake.png"}
                          alt={item.name}
                          width={60}
                          height={60}
                          className="rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <p className="font-medium text-amber-900">{item.name}</p>
                          <p className="text-sm text-amber-600">Qty: {item.quantity}</p>
                          {item.customizations?.size && (
                            <p className="text-xs text-amber-600">Size: {item.customizations.size.name}</p>
                          )}
                          {item.customizations?.flavor && (
                            <p className="text-xs text-amber-600">Flavor: {item.customizations.flavor.name}</p>
                          )}
                          {item.customizations?.extras && item.customizations.extras.length > 0 && (
                            <p className="text-xs text-amber-600">
                              Extras: {item.customizations.extras.map((e) => e.name).join(", ")}
                            </p>
                          )}
                          <p className="font-bold text-amber-800 mt-1">R{(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-amber-200 pt-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-amber-700">Subtotal:</span>
                    <span className="text-amber-900">R{(getTotalPrice() - deliveryCost).toFixed(2)}</span>
                  </div>
                  {deliveryOption === "delivery" && (
                    <div className="flex justify-between">
                      <span className="text-amber-700">Delivery Fee:</span>
                      <span className="text-amber-900">R{deliveryCost.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-xl font-bold text-amber-900 border-t border-amber-200 pt-2">
                    <span>Total:</span>
                    <span>R{totalAmount.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Delivery Options - Middle Column */}
              <div className="lg:col-span-1">
                <DeliveryCalculator />
                {errors.delivery && (
                  <p className="text-red-600 text-sm mt-2 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.delivery}
                  </p>
                )}
              </div>

              {/* Customer Information - Right Column */}
              <div className="lg:col-span-1">
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    handleProceedToPayment()
                  }}
                  className="space-y-6"
                >
                  <h3 className="text-xl font-bold text-amber-900 mb-4">Customer Information</h3>

                  {/* Personal Information */}
                  <div className="space-y-4">
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
                        placeholder="(011) 123-4567"
                      />
                      {errors.phone && (
                        <p className="text-red-600 text-sm mt-1 flex items-center">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          {errors.phone}
                        </p>
                      )}
                    </div>

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

                    {/* Special Instructions */}
                    <div>
                      <label className="block text-sm font-medium text-amber-900 mb-2">Special Instructions</label>
                      <Textarea
                        value={formData.customNotes}
                        onChange={(e) => handleInputChange("customNotes", e.target.value)}
                        className="border-amber-200 focus:border-yellow-500"
                        placeholder="Any special requests or dietary requirements..."
                        rows={3}
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    className="w-full bg-yellow-500 hover:bg-yellow-600 text-amber-900 font-bold py-3 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={items.length === 0}
                  >
                    <CreditCard className="mr-2 h-5 w-5" />
                    Proceed to Payment - R{totalAmount.toFixed(2)}
                  </Button>
                </form>
              </div>
            </div>
          ) : (
            // Payment Step
            <div className="flex justify-center">
              <YocoPaymentForm
                amount={totalAmount}
                orderData={orderData}
                onPaymentSuccess={handlePaymentSuccess}
                onPaymentError={handlePaymentError}
              />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
