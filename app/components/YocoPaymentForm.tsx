"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CreditCard, Lock, AlertCircle, CheckCircle } from "lucide-react"

interface YocoPaymentFormProps {
  amount: number
  orderData: any
  onPaymentSuccess: (paymentResult: any) => void
  onPaymentError: (error: string) => void
}

export default function YocoPaymentForm({ amount, orderData, onPaymentSuccess, onPaymentError }: YocoPaymentFormProps) {
  const [paymentData, setPaymentData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardName: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentStep, setPaymentStep] = useState<"form" | "processing" | "success" | "error">("form")

  const validatePaymentForm = () => {
    const newErrors: Record<string, string> = {}

    // Card number validation (basic)
    if (!paymentData.cardNumber.trim()) {
      newErrors.cardNumber = "Card number is required"
    } else if (!/^\d{13,19}$/.test(paymentData.cardNumber.replace(/\s/g, ""))) {
      newErrors.cardNumber = "Please enter a valid card number"
    }

    // Expiry date validation
    if (!paymentData.expiryDate.trim()) {
      newErrors.expiryDate = "Expiry date is required"
    } else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(paymentData.expiryDate)) {
      newErrors.expiryDate = "Please enter date in MM/YY format"
    } else {
      const [month, year] = paymentData.expiryDate.split("/")
      const expiry = new Date(2000 + Number.parseInt(year), Number.parseInt(month) - 1)
      if (expiry < new Date()) {
        newErrors.expiryDate = "Card has expired"
      }
    }

    // CVV validation
    if (!paymentData.cvv.trim()) {
      newErrors.cvv = "CVV is required"
    } else if (!/^\d{3,4}$/.test(paymentData.cvv)) {
      newErrors.cvv = "CVV must be 3 or 4 digits"
    }

    // Cardholder name validation
    if (!paymentData.cardName.trim()) {
      newErrors.cardName = "Cardholder name is required"
    } else if (paymentData.cardName.trim().length < 2) {
      newErrors.cardName = "Please enter the full cardholder name"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handlePayment = async () => {
    if (!validatePaymentForm()) {
      return
    }

    setIsProcessing(true)
    setPaymentStep("processing")

    try {
      console.log("[v0] Creating Yoco payment intent...")

      // Step 1: Create payment intent
      const createPaymentResponse = await fetch("/api/yoco/create-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: amount,
          currency: "ZAR",
          metadata: {
            orderNumber: orderData.orderNumber,
            customerName: orderData.customer.name,
            customerEmail: orderData.customer.email,
            items: orderData.items.map((item: any) => ({
              name: item.name,
              quantity: item.quantity,
              price: item.price,
            })),
          },
        }),
      })

      const paymentIntent = await createPaymentResponse.json()

      if (!paymentIntent.success) {
        throw new Error(paymentIntent.error || "Failed to create payment")
      }

      console.log("[v0] Payment intent created:", paymentIntent.payment.id)

      // Step 2: Confirm payment with card details
      const [month, year] = paymentData.expiryDate.split("/")
      const confirmPaymentResponse = await fetch("/api/yoco/confirm-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          paymentId: paymentIntent.payment.id,
          paymentMethod: {
            type: "card",
            card: {
              number: paymentData.cardNumber.replace(/\s/g, ""),
              expiry_month: Number.parseInt(month),
              expiry_year: 2000 + Number.parseInt(year),
              cvc: paymentData.cvv,
              name: paymentData.cardName,
            },
          },
        }),
      })

      const paymentResult = await confirmPaymentResponse.json()

      if (!paymentResult.success) {
        throw new Error(paymentResult.error || "Payment failed")
      }

      console.log("[v0] Payment confirmed:", paymentResult.payment.status)

      if (paymentResult.payment.status === "succeeded") {
        setPaymentStep("success")
        setTimeout(() => {
          onPaymentSuccess({
            ...paymentResult.payment,
            orderData,
          })
        }, 2000)
      } else {
        throw new Error("Payment was not successful")
      }
    } catch (error) {
      console.error("[v0] Payment processing error:", error)
      setPaymentStep("error")
      onPaymentError(error instanceof Error ? error.message : "Payment processing failed")
    } finally {
      setIsProcessing(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setPaymentData({ ...paymentData, [field]: value })
    if (errors[field]) {
      setErrors({ ...errors, [field]: "" })
    }
  }

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    const matches = v.match(/\d{4,16}/g)
    const match = (matches && matches[0]) || ""
    const parts = []
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }
    if (parts.length) {
      return parts.join(" ")
    } else {
      return v
    }
  }

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    if (v.length >= 2) {
      return v.substring(0, 2) + "/" + v.substring(2, 4)
    }
    return v
  }

  if (paymentStep === "processing") {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardContent className="p-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto mb-4"></div>
          <h3 className="text-lg font-semibold text-amber-900 mb-2">Processing Payment</h3>
          <p className="text-amber-600">Please wait while we process your payment securely...</p>
        </CardContent>
      </Card>
    )
  }

  if (paymentStep === "success") {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardContent className="p-8 text-center">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-amber-900 mb-2">Payment Successful!</h3>
          <p className="text-amber-600">Your order has been confirmed. Redirecting...</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="bg-gradient-to-r from-yellow-500 to-amber-500 text-amber-900">
        <CardTitle className="text-xl font-bold flex items-center">
          <Lock className="mr-2 h-5 w-5" />
          Secure Payment
        </CardTitle>
        <p className="text-sm opacity-90">Total: R{amount.toFixed(2)}</p>
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        <div>
          <Label className="text-amber-900 font-medium">Card Number *</Label>
          <Input
            value={paymentData.cardNumber}
            onChange={(e) => handleInputChange("cardNumber", formatCardNumber(e.target.value))}
            className={`border-amber-200 focus:border-yellow-500 ${errors.cardNumber ? "border-red-500" : ""}`}
            placeholder="1234 5678 9012 3456"
            maxLength={19}
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
            <Label className="text-amber-900 font-medium">Expiry Date *</Label>
            <Input
              value={paymentData.expiryDate}
              onChange={(e) => handleInputChange("expiryDate", formatExpiryDate(e.target.value))}
              className={`border-amber-200 focus:border-yellow-500 ${errors.expiryDate ? "border-red-500" : ""}`}
              placeholder="MM/YY"
              maxLength={5}
            />
            {errors.expiryDate && (
              <p className="text-red-600 text-sm mt-1 flex items-center">
                <AlertCircle className="h-4 w-4 mr-1" />
                {errors.expiryDate}
              </p>
            )}
          </div>
          <div>
            <Label className="text-amber-900 font-medium">CVV *</Label>
            <Input
              value={paymentData.cvv}
              onChange={(e) => handleInputChange("cvv", e.target.value.replace(/\D/g, ""))}
              className={`border-amber-200 focus:border-yellow-500 ${errors.cvv ? "border-red-500" : ""}`}
              placeholder="123"
              maxLength={4}
              type="password"
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
          <Label className="text-amber-900 font-medium">Cardholder Name *</Label>
          <Input
            value={paymentData.cardName}
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

        <Button
          onClick={handlePayment}
          disabled={isProcessing}
          className="w-full bg-yellow-500 hover:bg-yellow-600 text-amber-900 font-bold py-3 text-lg"
        >
          <CreditCard className="mr-2 h-5 w-5" />
          {isProcessing ? "Processing..." : `Pay R${amount.toFixed(2)}`}
        </Button>

        <div className="flex items-center justify-center space-x-2 text-xs text-amber-600">
          <Lock className="h-3 w-3" />
          <span>Secured by Yoco - Your payment information is encrypted</span>
        </div>
      </CardContent>
    </Card>
  )
}
