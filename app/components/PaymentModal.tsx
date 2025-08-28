"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { CheckCircle, CreditCard, MapPin, Calendar, Clock, X, Copy, Calculator } from "lucide-react"

interface PaymentModalProps {
  isOpen: boolean
  onClose: () => void
  orderDetails: any
}

export default function PaymentModal({ isOpen, onClose, orderDetails }: PaymentModalProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [orderNumber, setOrderNumber] = useState("")
  const [deliveryDistance, setDeliveryDistance] = useState(0)
  const [isCalculatingDistance, setIsCalculatingDistance] = useState(false)
  const [distanceError, setDistanceError] = useState("")
  const [customerInfo, setCustomerInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    deliveryMethod: "pickup",
    address: "",
    city: "",
    postalCode: "",
    deliveryDate: "",
    deliveryTime: "",
    specialNotes: "",
  })
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
  })

  if (!isOpen || !orderDetails) return null

  const deliveryFee = customerInfo.deliveryMethod === "delivery" ? Math.round(deliveryDistance * 8) : 0
  const totalAmount = orderDetails.totalPrice + deliveryFee

  const calculateDeliveryDistance = async () => {
    if (!customerInfo.address || !customerInfo.city) {
      alert("Please enter your delivery address first")
      return
    }

    setIsCalculatingDistance(true)
    setDistanceError("")

    try {
      const bakeryAddress = "15 Turkmeinistan Cres, Randburg, Gauteng, South Africa"
      const customerAddress = `${customerInfo.address}, ${customerInfo.city}, ${customerInfo.postalCode}, South Africa`

      const response = await fetch("/api/calculate-distance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          origin: bakeryAddress,
          destination: customerAddress,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to calculate distance")
      }

      const data = await response.json()

      if (data.error) {
        throw new Error(data.error)
      }

      // Distance is returned in meters, convert to kilometers
      const distanceInKm = Math.round(data.distance / 1000)
      setDeliveryDistance(distanceInKm)
    } catch (error) {
      console.error("Error calculating distance:", error)
      setDistanceError("Unable to calculate distance. Please contact us for delivery fee.")

      // Fallback to estimated distance based on city
      const cityLower = customerInfo.city.toLowerCase()
      let estimatedDistance = 15 // Default 15km from Randburg

      if (cityLower.includes("randburg") || cityLower.includes("ferndale") || cityLower.includes("blairgowrie")) {
        estimatedDistance = 5
      } else if (cityLower.includes("sandton") || cityLower.includes("rosebank") || cityLower.includes("hyde park")) {
        estimatedDistance = 12
      } else if (cityLower.includes("johannesburg") || cityLower.includes("joburg") || cityLower.includes("jburg")) {
        estimatedDistance = 20
      } else if (cityLower.includes("pretoria") || cityLower.includes("tshwane") || cityLower.includes("centurion")) {
        estimatedDistance = 35
      } else if (cityLower.includes("midrand") || cityLower.includes("halfway house")) {
        estimatedDistance = 20
      } else if (cityLower.includes("roodepoort") || cityLower.includes("krugersdorp")) {
        estimatedDistance = 18
      }

      setDeliveryDistance(estimatedDistance)
    } finally {
      setIsCalculatingDistance(false)
    }
  }

  const handleCustomerInfoSubmit = () => {
    setCurrentStep(2)
  }

  const handlePaymentSubmit = () => {
    // Generate unique order number when payment is processed
    const timestamp = Date.now()
    const year = new Date().getFullYear()
    const orderNum = `ORD-${year}-${String(timestamp).slice(-6)}`
    setOrderNumber(orderNum)
    setCurrentStep(3)
  }

  const copyOrderNumber = () => {
    navigator.clipboard.writeText(orderNumber)
    alert("Order number copied to clipboard!")
  }

  const handleFinalSubmit = () => {
    // Here you would typically process the payment and create the order
    console.log("Order submitted:", {
      orderNumber,
      orderDetails,
      customerInfo,
      paymentInfo,
      deliveryDistance,
      deliveryFee,
      timestamp: new Date().toISOString(),
    })
    onClose()
    // Reset form
    setCurrentStep(1)
    setOrderNumber("")
    setDeliveryDistance(0)
    setCustomerInfo({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      deliveryMethod: "pickup",
      address: "",
      city: "",
      postalCode: "",
      deliveryDate: "",
      deliveryTime: "",
      specialNotes: "",
    })
    setPaymentInfo({
      cardNumber: "",
      expiryDate: "",
      cvv: "",
      cardholderName: "",
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-amber-900 flex items-center justify-between">
            Complete Your Order
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>

        {/* Progress Indicator */}
        <div className="flex items-center justify-center mb-6">
          <div className="flex items-center space-x-4">
            <div className={`flex items-center ${currentStep >= 1 ? "text-amber-600" : "text-gray-400"}`}>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  currentStep >= 1 ? "bg-amber-600 text-white" : "bg-gray-200"
                }`}
              >
                1
              </div>
              <span className="ml-2 text-sm font-medium">Details</span>
            </div>
            <div className={`w-8 h-1 ${currentStep >= 2 ? "bg-amber-600" : "bg-gray-200"}`} />
            <div className={`flex items-center ${currentStep >= 2 ? "text-amber-600" : "text-gray-400"}`}>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  currentStep >= 2 ? "bg-amber-600 text-white" : "bg-gray-200"
                }`}
              >
                2
              </div>
              <span className="ml-2 text-sm font-medium">Payment</span>
            </div>
            <div className={`w-8 h-1 ${currentStep >= 3 ? "bg-amber-600" : "bg-gray-200"}`} />
            <div className={`flex items-center ${currentStep >= 3 ? "text-green-600" : "text-gray-400"}`}>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  currentStep >= 3 ? "bg-green-600 text-white" : "bg-gray-200"
                }`}
              >
                <CheckCircle className="h-4 w-4" />
              </div>
              <span className="ml-2 text-sm font-medium">Confirmation</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Order Summary - Always Visible */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-amber-900">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {orderNumber && (
                  <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-green-600 font-medium">Order Number</p>
                        <p className="text-sm font-bold text-green-800">{orderNumber}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={copyOrderNumber}
                        className="text-green-600 hover:text-green-800 hover:bg-green-100"
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}

                <div className="flex items-center space-x-3">
                  <img
                    src={orderDetails.cake?.image || "/placeholder.svg"}
                    alt={orderDetails.cake?.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div>
                    <h4 className="font-semibold text-amber-900 text-sm">{orderDetails.cake?.name}</h4>
                    <Badge variant="secondary" className="text-xs">
                      {orderDetails.subcategory}
                    </Badge>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Size:</span>
                    <span>{orderDetails.customizations?.size?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Flavor:</span>
                    <span>{orderDetails.customizations?.flavor?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Frosting:</span>
                    <span>{orderDetails.customizations?.frosting?.name}</span>
                  </div>
                  {orderDetails.customizations?.extras?.length > 0 && (
                    <div>
                      <span className="font-medium">Extras:</span>
                      {orderDetails.customizations.extras.map((extra: any, index: number) => (
                        <div key={index} className="flex justify-between ml-2">
                          <span>• {extra.name}</span>
                          <span>+R{extra.price}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Quantity:</span>
                    <span>{orderDetails.quantity}</span>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>R{orderDetails.totalPrice}</span>
                  </div>
                  {deliveryFee > 0 && (
                    <div className="space-y-1">
                      <div className="flex justify-between">
                        <span>Delivery Fee:</span>
                        <span>R{deliveryFee}</span>
                      </div>
                      {deliveryDistance > 0 && (
                        <div className="flex justify-between text-xs text-amber-600">
                          <span>Distance:</span>
                          <span>{deliveryDistance}km @ R8/km</span>
                        </div>
                      )}
                    </div>
                  )}
                  <div className="flex justify-between font-semibold text-amber-900">
                    <span>Total Amount:</span>
                    <span>R{totalAmount}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-2">
            {/* Step 1: Customer Information */}
            {currentStep === 1 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg text-amber-900">Customer Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input
                        id="firstName"
                        value={customerInfo.firstName}
                        onChange={(e) => setCustomerInfo({ ...customerInfo, firstName: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input
                        id="lastName"
                        value={customerInfo.lastName}
                        onChange={(e) => setCustomerInfo({ ...customerInfo, lastName: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={customerInfo.email}
                        onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        value={customerInfo.phone}
                        onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label className="text-base font-semibold mb-3 block">Delivery Method</Label>
                    <Select
                      value={customerInfo.deliveryMethod}
                      onValueChange={(value) => {
                        setCustomerInfo({ ...customerInfo, deliveryMethod: value })
                        if (value === "pickup") {
                          setDeliveryDistance(0)
                        }
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pickup">Store Pickup (Free)</SelectItem>
                        <SelectItem value="delivery">Home Delivery (R8 per km)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {customerInfo.deliveryMethod === "delivery" && (
                    <div className="space-y-4 p-4 bg-amber-50 rounded-lg">
                      <h4 className="font-semibold text-amber-900 flex items-center">
                        <MapPin className="h-4 w-4 mr-2" />
                        Delivery Address
                      </h4>
                      <div>
                        <Label htmlFor="address">Street Address *</Label>
                        <Input
                          id="address"
                          value={customerInfo.address}
                          onChange={(e) => setCustomerInfo({ ...customerInfo, address: e.target.value })}
                          required
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="city">City *</Label>
                          <Input
                            id="city"
                            value={customerInfo.city}
                            onChange={(e) => setCustomerInfo({ ...customerInfo, city: e.target.value })}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="postalCode">Postal Code *</Label>
                          <Input
                            id="postalCode"
                            value={customerInfo.postalCode}
                            onChange={(e) => setCustomerInfo({ ...customerInfo, postalCode: e.target.value })}
                            required
                          />
                        </div>
                      </div>

                      <div className="bg-white p-4 rounded-lg border border-amber-200">
                        <div className="flex items-center justify-between mb-3">
                          <h5 className="font-semibold text-amber-900 flex items-center">
                            <Calculator className="h-4 w-4 mr-2" />
                            Delivery Fee Calculator
                          </h5>
                          <Button
                            onClick={calculateDeliveryDistance}
                            disabled={isCalculatingDistance || !customerInfo.address || !customerInfo.city}
                            size="sm"
                            className="bg-amber-600 hover:bg-amber-700"
                          >
                            {isCalculatingDistance ? "Calculating..." : "Calculate Fee"}
                          </Button>
                        </div>

                        <p className="text-xs text-amber-600 mb-3">
                          Distance calculated from Stanley's Bakery: 15 Turkmeinistan Cres, Randburg, Gauteng
                        </p>

                        {distanceError && (
                          <div className="bg-red-50 p-3 rounded border border-red-200 mb-3">
                            <p className="text-sm text-red-600">{distanceError}</p>
                            <p className="text-xs text-red-500 mt-1">Using estimated distance based on your city</p>
                          </div>
                        )}

                        {deliveryDistance > 0 && (
                          <div className="bg-green-50 p-3 rounded border border-green-200">
                            <div className="flex justify-between items-center">
                              <div>
                                <p className="text-sm font-medium text-green-800">Distance: {deliveryDistance}km</p>
                                <p className="text-xs text-green-600">Delivery Fee: R{deliveryFee} (R8 per km)</p>
                              </div>
                              <CheckCircle className="h-5 w-5 text-green-600" />
                            </div>
                          </div>
                        )}

                        {deliveryDistance === 0 && !distanceError && (
                          <p className="text-sm text-amber-600">
                            Enter your complete address and click "Calculate Fee" to get your delivery cost
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="deliveryDate" className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2" />
                        {customerInfo.deliveryMethod === "pickup" ? "Pickup" : "Delivery"} Date *
                      </Label>
                      <Input
                        id="deliveryDate"
                        type="date"
                        value={customerInfo.deliveryDate}
                        onChange={(e) => setCustomerInfo({ ...customerInfo, deliveryDate: e.target.value })}
                        min={new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]}
                        required
                      />
                      <p className="text-xs text-amber-600 mt-1">Minimum 3 days notice required</p>
                    </div>
                    <div>
                      <Label htmlFor="deliveryTime" className="flex items-center">
                        <Clock className="h-4 w-4 mr-2" />
                        Preferred Time
                      </Label>
                      <Select
                        value={customerInfo.deliveryTime}
                        onValueChange={(value) => setCustomerInfo({ ...customerInfo, deliveryTime: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select time" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="morning">Morning (9AM - 12PM)</SelectItem>
                          <SelectItem value="afternoon">Afternoon (12PM - 5PM)</SelectItem>
                          <SelectItem value="evening">Evening (5PM - 8PM)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="specialNotes">Special Notes</Label>
                    <Textarea
                      id="specialNotes"
                      placeholder="Any additional instructions or special requests..."
                      value={customerInfo.specialNotes}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, specialNotes: e.target.value })}
                    />
                  </div>

                  <div className="flex justify-end">
                    <Button onClick={handleCustomerInfoSubmit} className="bg-amber-600 hover:bg-amber-700">
                      Continue to Payment
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* ... existing code for steps 2 and 3 ... */}

            {/* Step 2: Payment Information */}
            {currentStep === 2 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg text-amber-900 flex items-center">
                    <CreditCard className="h-5 w-5 mr-2" />
                    Payment Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-900 mb-2">Payment Terms</h4>
                    <ul className="text-sm text-blue-800 space-y-1">
                      <li>• Full payment required: R{totalAmount}</li>
                      <li>• Secure payment processing</li>
                      <li>• Full refund available up to 48 hours before {customerInfo.deliveryMethod} date</li>
                    </ul>
                  </div>

                  <div>
                    <Label htmlFor="cardholderName">Cardholder Name *</Label>
                    <Input
                      id="cardholderName"
                      value={paymentInfo.cardholderName}
                      onChange={(e) => setPaymentInfo({ ...paymentInfo, cardholderName: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="cardNumber">Card Number *</Label>
                    <Input
                      id="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      value={paymentInfo.cardNumber}
                      onChange={(e) => setPaymentInfo({ ...paymentInfo, cardNumber: e.target.value })}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="expiryDate">Expiry Date *</Label>
                      <Input
                        id="expiryDate"
                        placeholder="MM/YY"
                        value={paymentInfo.expiryDate}
                        onChange={(e) => setPaymentInfo({ ...paymentInfo, expiryDate: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="cvv">CVV *</Label>
                      <Input
                        id="cvv"
                        placeholder="123"
                        value={paymentInfo.cvv}
                        onChange={(e) => setPaymentInfo({ ...paymentInfo, cvv: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <Button variant="outline" onClick={() => setCurrentStep(1)}>
                      Back
                    </Button>
                    <Button onClick={handlePaymentSubmit} className="bg-green-600 hover:bg-green-700">
                      Process Payment (R{totalAmount})
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 3: Confirmation */}
            {currentStep === 3 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg text-green-600 flex items-center">
                    <CheckCircle className="h-5 w-5 mr-2" />
                    Order Confirmed!
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-green-50 p-6 rounded-lg text-center">
                    <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-green-900 mb-2">Thank You!</h3>
                    <p className="text-green-800 mb-4">
                      Your order has been successfully placed and payment processed.
                    </p>
                    <div className="bg-white p-4 rounded border">
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-semibold text-gray-900">Order Number: {orderNumber}</p>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={copyOrderNumber}
                          className="text-amber-600 hover:text-amber-800 hover:bg-amber-50"
                        >
                          <Copy className="h-4 w-4 mr-1" />
                          Copy
                        </Button>
                      </div>
                      <p className="text-sm text-gray-600">
                        {customerInfo.deliveryMethod === "pickup" ? "Pickup" : "Delivery"} Date:{" "}
                        {customerInfo.deliveryDate}
                      </p>
                      <p className="text-xs text-amber-600 mt-2">Save this order number for tracking your order</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-semibold text-amber-900">What happens next?</h4>
                    <ul className="space-y-2 text-sm text-amber-800">
                      <li className="flex items-start">
                        <span className="w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center text-xs font-semibold mr-3 mt-0.5">
                          1
                        </span>
                        You'll receive an email confirmation with your order details and tracking number
                      </li>
                      <li className="flex items-start">
                        <span className="w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center text-xs font-semibold mr-3 mt-0.5">
                          2
                        </span>
                        Our team will begin preparing your custom cake
                      </li>
                      <li className="flex items-start">
                        <span className="w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center text-xs font-semibold mr-3 mt-0.5">
                          3
                        </span>
                        We'll contact you 24 hours before your {customerInfo.deliveryMethod} date
                      </li>
                      <li className="flex items-start">
                        <span className="w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center text-xs font-semibold mr-3 mt-0.5">
                          4
                        </span>
                        Your cake will be ready for {customerInfo.deliveryMethod} as scheduled
                      </li>
                    </ul>
                  </div>

                  <div className="bg-amber-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-amber-900 mb-2">Need Help?</h4>
                    <p className="text-sm text-amber-800 mb-2">
                      Contact us if you have any questions or need to make changes to your order. Please reference your
                      order number: <strong>{orderNumber}</strong>
                    </p>
                    <p className="text-sm text-amber-800">
                      <strong>Phone:</strong> +27 78 491 4587
                      <br />
                      <strong>WhatsApp:</strong> +27 78 491 4587
                      <br />
                      <strong>Email:</strong> orders@stanleysbakery.co.za
                    </p>
                  </div>

                  <div className="flex justify-center">
                    <Button onClick={handleFinalSubmit} className="bg-amber-600 hover:bg-amber-700">
                      Close
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
