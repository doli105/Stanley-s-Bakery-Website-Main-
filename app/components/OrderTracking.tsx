"use client"

import { useState } from "react"
import { Search, Package, Clock, Truck, CheckCircle, X, ChefHat, Gift } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface OrderTrackingProps {
  isOpen: boolean
  onClose: () => void
}

const mockOrders = [
  {
    id: "ORD-2024-001",
    customerName: "Sarah Johnson",
    cakeName: "Princess Castle Cake",
    status: "confirmed",
    orderDate: "2024-01-15",
    deliveryDate: "2024-01-18",
    total: "R850",
    estimatedTime: "2-3 hours",
  },
  {
    id: "ORD-2024-002",
    customerName: "Mike Rodriguez",
    cakeName: "Superhero Adventure Cake",
    status: "out-for-delivery",
    orderDate: "2024-01-16",
    deliveryDate: "2024-01-19",
    total: "R950",
    estimatedTime: "30-45 minutes",
  },
]

const statusSteps = [
  {
    key: "pending",
    label: "Order Received",
    description: "We've received your order and it's being reviewed",
    icon: Clock,
    estimatedTime: "5-10 minutes",
    color: "bg-yellow-500",
  },
  {
    key: "confirmed",
    label: "Order Confirmed",
    description: "Your order is confirmed and we're preparing ingredients",
    icon: CheckCircle,
    estimatedTime: "15-30 minutes",
    color: "bg-blue-500",
  },
  {
    key: "preparing",
    label: "Baking in Progress",
    description: "Our bakers are crafting your delicious cake",
    icon: ChefHat,
    estimatedTime: "2-4 hours",
    color: "bg-orange-500",
  },
  {
    key: "ready-to-collect",
    label: "Ready for Pickup",
    description: "Your cake is ready! Come collect it or we'll deliver soon",
    icon: Gift,
    estimatedTime: "Ready now",
    color: "bg-purple-500",
  },
  {
    key: "out-for-delivery",
    label: "Out for Delivery",
    description: "Your cake is on its way to you",
    icon: Truck,
    estimatedTime: "30-60 minutes",
    color: "bg-indigo-500",
  },
  {
    key: "delivered",
    label: "Delivered",
    description: "Enjoy your delicious cake!",
    icon: Package,
    estimatedTime: "Completed",
    color: "bg-green-500",
  },
]

export default function OrderTracking({ isOpen, onClose }: OrderTrackingProps) {
  const [orderNumber, setOrderNumber] = useState("")
  const [foundOrder, setFoundOrder] = useState<any>(null)

  const handleSearch = () => {
    const order = mockOrders.find((o) => o.id === orderNumber)
    setFoundOrder(order || null)
  }

  const getStatusIndex = (status: string) => {
    return statusSteps.findIndex((step) => step.key === status)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white border-pink-200 shadow-2xl">
        <CardHeader className="bg-gradient-to-r from-pink-600 via-rose-500 to-amber-600 text-white">
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-bold flex items-center">
              <Package className="mr-2 h-6 w-6" />
              Track Your Cake Order
            </CardTitle>
            <Button variant="ghost" size="icon" onClick={onClose} className="text-white hover:bg-white/20">
              <X className="h-6 w-6" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="p-6">
          {/* Search Section */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-pink-900 mb-2">Enter your order number</label>
            <div className="flex gap-2">
              <Input
                value={orderNumber}
                onChange={(e) => setOrderNumber(e.target.value)}
                placeholder="e.g., ORD-2024-001"
                className="border-pink-200 focus:border-pink-500 text-lg py-3"
              />
              <Button onClick={handleSearch} className="bg-pink-500 hover:bg-pink-600 text-white font-bold px-6">
                <Search className="h-4 w-4 mr-2" />
                Track
              </Button>
            </div>
          </div>

          {/* Order Details */}
          {foundOrder ? (
            <div className="space-y-8">
              <div className="bg-gradient-to-r from-pink-50 to-amber-50 rounded-xl p-6 border border-pink-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-pink-900">Order Details</h3>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-pink-600">{foundOrder.id}</p>
                    <p className="text-sm text-pink-500">Order Number</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="bg-white/60 rounded-lg p-3">
                    <span className="text-pink-600 font-medium">Customer:</span>
                    <p className="font-bold text-pink-900">{foundOrder.customerName}</p>
                  </div>
                  <div className="bg-white/60 rounded-lg p-3">
                    <span className="text-pink-600 font-medium">Cake:</span>
                    <p className="font-bold text-pink-900">{foundOrder.cakeName}</p>
                  </div>
                  <div className="bg-white/60 rounded-lg p-3">
                    <span className="text-pink-600 font-medium">Total:</span>
                    <p className="font-bold text-pink-900">{foundOrder.total}</p>
                  </div>
                  <div className="bg-white/60 rounded-lg p-3">
                    <span className="text-pink-600 font-medium">Order Date:</span>
                    <p className="font-bold text-pink-900">{foundOrder.orderDate}</p>
                  </div>
                  <div className="bg-white/60 rounded-lg p-3">
                    <span className="text-pink-600 font-medium">Delivery Date:</span>
                    <p className="font-bold text-pink-900">{foundOrder.deliveryDate}</p>
                  </div>
                  <div className="bg-white/60 rounded-lg p-3">
                    <span className="text-pink-600 font-medium">Est. Time:</span>
                    <p className="font-bold text-amber-600">{foundOrder.estimatedTime}</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-pink-900 mb-6 text-center">Order Progress</h3>

                {/* Progress Bar */}
                <div className="relative mb-8">
                  <div className="absolute top-5 left-0 w-full h-1 bg-gray-200 rounded-full"></div>
                  <div
                    className="absolute top-5 left-0 h-1 bg-gradient-to-r from-pink-500 to-amber-500 rounded-full transition-all duration-1000 ease-in-out"
                    style={{ width: `${((getStatusIndex(foundOrder.status) + 1) / statusSteps.length) * 100}%` }}
                  ></div>

                  {/* Status Steps */}
                  <div className="relative flex justify-between">
                    {statusSteps.map((step, index) => {
                      const currentStatusIndex = getStatusIndex(foundOrder.status)
                      const isCompleted = index <= currentStatusIndex
                      const isCurrent = index === currentStatusIndex
                      const IconComponent = step.icon

                      return (
                        <div key={step.key} className="flex flex-col items-center">
                          {/* Icon Circle */}
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center border-4 transition-all duration-500 ${
                              isCompleted
                                ? isCurrent
                                  ? `${step.color} text-white border-white shadow-lg animate-pulse`
                                  : "bg-green-500 text-white border-green-300"
                                : "bg-gray-200 text-gray-500 border-gray-300"
                            }`}
                          >
                            <IconComponent className="h-5 w-5" />
                          </div>

                          {/* Step Info */}
                          <div className="mt-3 text-center max-w-[120px]">
                            <p className={`font-bold text-sm ${isCompleted ? "text-pink-900" : "text-gray-500"}`}>
                              {step.label}
                            </p>
                            <p className={`text-xs mt-1 ${isCompleted ? "text-pink-600" : "text-gray-400"}`}>
                              {step.description}
                            </p>
                            {isCurrent && (
                              <div className="mt-2">
                                <p className="text-xs font-bold text-amber-600 bg-amber-100 px-2 py-1 rounded-full">
                                  {step.estimatedTime}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>

                <div className="bg-gradient-to-r from-pink-500 to-amber-500 text-white rounded-xl p-6 text-center">
                  <div className="flex items-center justify-center mb-2">
                    {(() => {
                      const currentStep = statusSteps[getStatusIndex(foundOrder.status)]
                      const IconComponent = currentStep?.icon || Clock
                      return <IconComponent className="h-8 w-8 mr-3" />
                    })()}
                    <h4 className="text-2xl font-bold">
                      {statusSteps[getStatusIndex(foundOrder.status)]?.label || "Processing"}
                    </h4>
                  </div>
                  <p className="text-lg opacity-90">
                    {statusSteps[getStatusIndex(foundOrder.status)]?.description || "Your order is being processed"}
                  </p>
                  <div className="mt-4 bg-white/20 rounded-lg p-3">
                    <p className="text-sm font-medium">Estimated Time Remaining</p>
                    <p className="text-xl font-bold">{foundOrder.estimatedTime}</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            orderNumber && (
              <div className="text-center py-12">
                <Package className="h-20 w-20 text-pink-300 mx-auto mb-4" />
                <p className="text-pink-700 text-xl font-bold">Order not found</p>
                <p className="text-pink-600">Please check your order number and try again</p>
              </div>
            )
          )}

          {!foundOrder && !orderNumber && (
            <div className="text-center py-12">
              <Search className="h-20 w-20 text-pink-300 mx-auto mb-4" />
              <p className="text-pink-700 text-xl font-bold">Track Your Cake Order</p>
              <p className="text-pink-600">Enter your order number to see real-time progress</p>
              <div className="mt-6 bg-pink-50 rounded-lg p-4 max-w-md mx-auto">
                <p className="text-sm text-pink-700">
                  <strong>Tip:</strong> You can find your order number in your confirmation email or receipt
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
