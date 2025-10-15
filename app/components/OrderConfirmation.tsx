"use client"

import { CheckCircle, Package, Calendar, MapPin, Phone, Mail, Copy, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useState } from "react"

interface OrderConfirmationProps {
  isOpen: boolean
  onClose: () => void
  orderData: {
    orderNumber: string
    customer: {
      name: string
      email: string
      phone: string
      eventDate: string
    }
    items: Array<{
      name: string
      quantity: number
      price: number
    }>
    delivery: {
      method: string
      address: string
      cost: number
    }
    pricing: {
      total: number
    }
  }
  paymentId: string
}

export default function OrderConfirmation({ isOpen, onClose, orderData, paymentId }: OrderConfirmationProps) {
  const [copied, setCopied] = useState(false)

  const handleCopyOrderNumber = () => {
    navigator.clipboard.writeText(orderData.orderNumber)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white border-stanley-pink shadow-2xl">
        <CardHeader className="bg-gradient-to-r from-stanley-pink via-pink-500 to-stanley-yellow text-white text-center pb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-white rounded-full p-4 shadow-lg">
              <CheckCircle className="h-16 w-16 text-stanley-pink animate-bounce" />
            </div>
          </div>
          <CardTitle className="text-3xl font-bold mb-2">Order Confirmed!</CardTitle>
          <p className="text-white/90 text-lg">Thank you for your order, {orderData.customer.name}!</p>
        </CardHeader>

        <CardContent className="p-6 space-y-6">
          {/* Order Number - Prominently Displayed with Pink Colors */}
          <div className="bg-gradient-to-br from-stanley-pink/10 via-pink-50 to-stanley-yellow/10 rounded-2xl p-6 border-2 border-stanley-pink shadow-lg">
            <div className="text-center">
              <p className="text-sm font-medium text-stanley-brown mb-2">Your Order Number</p>
              <div className="flex items-center justify-center gap-3 mb-3">
                <h2 className="text-4xl font-bold bg-gradient-to-r from-stanley-pink via-pink-600 to-stanley-orange bg-clip-text text-transparent">
                  {orderData.orderNumber}
                </h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleCopyOrderNumber}
                  className="text-stanley-pink hover:bg-stanley-pink/10"
                  title="Copy order number"
                >
                  {copied ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
                </Button>
              </div>
              <p className="text-sm text-stanley-brown/70">Save this number to track your order</p>
            </div>
          </div>

          {/* Payment Confirmation */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center gap-2 text-green-700">
              <CheckCircle className="h-5 w-5" />
              <div>
                <p className="font-semibold">Payment Successful</p>
                <p className="text-sm text-green-600">Payment ID: {paymentId}</p>
              </div>
            </div>
          </div>

          {/* Order Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-stanley-brown flex items-center gap-2">
              <Package className="h-5 w-5 text-stanley-pink" />
              Order Details
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-stanley-yellow/10 rounded-lg p-4 border border-stanley-yellow/30">
                <div className="flex items-start gap-2">
                  <Calendar className="h-5 w-5 text-stanley-orange mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-stanley-brown">Event Date</p>
                    <p className="text-stanley-brown/80">
                      {new Date(orderData.customer.eventDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-stanley-pink/10 rounded-lg p-4 border border-stanley-pink/30">
                <div className="flex items-start gap-2">
                  <MapPin className="h-5 w-5 text-stanley-pink mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-stanley-brown">
                      {orderData.delivery.method === "pickup" ? "Pickup Location" : "Delivery Address"}
                    </p>
                    <p className="text-stanley-brown/80 text-sm">{orderData.delivery.address}</p>
                  </div>
                </div>
              </div>

              <div className="bg-stanley-orange/10 rounded-lg p-4 border border-stanley-orange/30">
                <div className="flex items-start gap-2">
                  <Phone className="h-5 w-5 text-stanley-orange mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-stanley-brown">Phone</p>
                    <p className="text-stanley-brown/80">{orderData.customer.phone}</p>
                  </div>
                </div>
              </div>

              <div className="bg-stanley-yellow/10 rounded-lg p-4 border border-stanley-yellow/30">
                <div className="flex items-start gap-2">
                  <Mail className="h-5 w-5 text-stanley-yellow mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-stanley-brown">Email</p>
                    <p className="text-stanley-brown/80 text-sm break-all">{orderData.customer.email}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Items Ordered */}
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-stanley-brown">Items Ordered</h3>
            <div className="space-y-2">
              {orderData.items.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center bg-amber-50 rounded-lg p-3 border border-amber-200"
                >
                  <div>
                    <p className="font-medium text-stanley-brown">{item.name}</p>
                    <p className="text-sm text-stanley-brown/70">Quantity: {item.quantity}</p>
                  </div>
                  <p className="font-bold text-stanley-brown">R{(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Total */}
          <div className="border-t-2 border-stanley-pink/20 pt-4">
            <div className="flex justify-between items-center">
              <span className="text-xl font-bold text-stanley-brown">Total Paid</span>
              <span className="text-2xl font-bold text-stanley-pink">R{orderData.pricing.total.toFixed(2)}</span>
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-gradient-to-r from-stanley-pink/5 to-stanley-yellow/5 rounded-lg p-4 border border-stanley-pink/20">
            <h4 className="font-bold text-stanley-brown mb-2">What happens next?</h4>
            <ul className="space-y-2 text-sm text-stanley-brown/80">
              <li className="flex items-start gap-2">
                <span className="text-stanley-pink font-bold">1.</span>
                <span>We'll contact you within 24 hours to confirm your order details</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-stanley-pink font-bold">2.</span>
                <span>You'll receive updates via email and SMS</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-stanley-pink font-bold">3.</span>
                <span>
                  {orderData.delivery.method === "pickup"
                    ? "We'll notify you when your order is ready for pickup"
                    : "Your order will be delivered on the scheduled date"}
                </span>
              </li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={onClose}
              className="flex-1 bg-gradient-to-r from-stanley-pink to-pink-500 hover:from-stanley-pink/90 hover:to-pink-500/90 text-white font-bold py-3"
            >
              Continue Shopping
            </Button>
            <Button
              onClick={() => {
                // This would open the order tracking modal
                onClose()
              }}
              variant="outline"
              className="flex-1 border-2 border-stanley-pink text-stanley-pink hover:bg-stanley-pink/10 font-bold py-3"
            >
              Track Order
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
