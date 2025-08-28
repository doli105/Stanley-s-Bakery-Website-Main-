"use client"

import { useState } from "react"
import { Search, Package, Clock, Truck, CheckCircle, X } from "lucide-react"
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
  },
  {
    id: "ORD-2024-002",
    customerName: "Mike Rodriguez",
    cakeName: "Superhero Adventure Cake",
    status: "out-for-delivery",
    orderDate: "2024-01-16",
    deliveryDate: "2024-01-19",
    total: "R950",
  },
]

const statusSteps = [
  { key: "pending", label: "Order Placed", icon: Clock },
  { key: "confirmed", label: "Confirmed", icon: CheckCircle },
  { key: "out-for-delivery", label: "Out for Delivery", icon: Truck },
  { key: "delivered", label: "Delivered", icon: Package },
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
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white border-amber-200">
        <CardHeader className="bg-gradient-to-r from-yellow-500 to-amber-500 text-amber-900">
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-bold flex items-center">
              <Package className="mr-2 h-6 w-6" />
              Track Your Order
            </CardTitle>
            <Button variant="ghost" size="icon" onClick={onClose} className="text-amber-900 hover:bg-amber-100">
              <X className="h-6 w-6" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="p-6">
          {/* Search Section */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-amber-900 mb-2">Enter your order number</label>
            <div className="flex gap-2">
              <Input
                value={orderNumber}
                onChange={(e) => setOrderNumber(e.target.value)}
                placeholder="e.g., ORD-2024-001"
                className="border-amber-200 focus:border-yellow-500"
              />
              <Button onClick={handleSearch} className="bg-yellow-500 hover:bg-yellow-600 text-amber-900 font-bold">
                <Search className="h-4 w-4 mr-2" />
                Track
              </Button>
            </div>
          </div>

          {/* Order Details */}
          {foundOrder ? (
            <div className="space-y-6">
              <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
                <h3 className="text-lg font-semibold text-amber-900 mb-2">Order Details</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-amber-600">Order Number:</span>
                    <p className="font-medium text-amber-900">{foundOrder.id}</p>
                  </div>
                  <div>
                    <span className="text-amber-600">Customer:</span>
                    <p className="font-medium text-amber-900">{foundOrder.customerName}</p>
                  </div>
                  <div>
                    <span className="text-amber-600">Cake:</span>
                    <p className="font-medium text-amber-900">{foundOrder.cakeName}</p>
                  </div>
                  <div>
                    <span className="text-amber-600">Total:</span>
                    <p className="font-medium text-amber-900">{foundOrder.total}</p>
                  </div>
                  <div>
                    <span className="text-amber-600">Order Date:</span>
                    <p className="font-medium text-amber-900">{foundOrder.orderDate}</p>
                  </div>
                  <div>
                    <span className="text-amber-600">Delivery Date:</span>
                    <p className="font-medium text-amber-900">{foundOrder.deliveryDate}</p>
                  </div>
                </div>
              </div>

              {/* Status Timeline */}
              <div>
                <h3 className="text-lg font-semibold text-amber-900 mb-4">Order Status</h3>
                <div className="space-y-4">
                  {statusSteps.map((step, index) => {
                    const currentStatusIndex = getStatusIndex(foundOrder.status)
                    const isCompleted = index <= currentStatusIndex
                    const isCurrent = index === currentStatusIndex
                    const IconComponent = step.icon

                    return (
                      <div key={step.key} className="flex items-center space-x-4">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            isCompleted
                              ? isCurrent
                                ? "bg-yellow-500 text-amber-900"
                                : "bg-green-500 text-white"
                              : "bg-gray-200 text-gray-500"
                          }`}
                        >
                          <IconComponent className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <p className={`font-medium ${isCompleted ? "text-amber-900" : "text-gray-500"}`}>
                            {step.label}
                          </p>
                          {isCurrent && <p className="text-sm text-yellow-600">Current Status</p>}
                        </div>
                        {isCompleted && !isCurrent && <CheckCircle className="h-5 w-5 text-green-500" />}
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          ) : (
            orderNumber && (
              <div className="text-center py-8">
                <Package className="h-16 w-16 text-amber-300 mx-auto mb-4" />
                <p className="text-amber-700 text-lg">Order not found</p>
                <p className="text-amber-600 text-sm">Please check your order number and try again</p>
              </div>
            )
          )}

          {!foundOrder && !orderNumber && (
            <div className="text-center py-8">
              <Search className="h-16 w-16 text-amber-300 mx-auto mb-4" />
              <p className="text-amber-700 text-lg">Enter your order number to track</p>
              <p className="text-amber-600 text-sm">You can find your order number in your confirmation email</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
