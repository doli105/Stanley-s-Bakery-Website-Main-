"use client"

import type React from "react"

import { useState } from "react"
import { X, Upload, Calendar, User, Phone, Mail, MapPin, CreditCard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface OrderFormProps {
  isOpen: boolean
  onClose: () => void
}

export default function OrderForm({ isOpen, onClose }: OrderFormProps) {
  const [selectedCategory, setSelectedCategory] = useState("")
  const [deliveryMethod, setDeliveryMethod] = useState("")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    eventDate: "",
    customNotes: "",
    referenceImage: null as File | null,
  })

  const cakeCategories = [
    "Celebration Cakes",
    "For Little Gentlemen",
    "For Little Princesses",
    "For Him",
    "For Her",
    "Forever Cakes",
    "Little Blessings Cakes",
    "Whimsical & Custom Creations",
    "Styled Cupcake Delights",
    "Cookies",
    "Pastries",
    "Melting Moments",
  ]

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, referenceImage: e.target.files[0] })
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log("Order submitted:", { selectedCategory, deliveryMethod, formData })
    // You would typically send this to your backend
    alert("Order submitted successfully! We'll contact you within 24 hours.")
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white border-amber-200">
        <CardHeader className="bg-gradient-to-r from-yellow-500 to-amber-500 text-amber-900">
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-bold">Order Your Dream Cake</CardTitle>
            <Button variant="ghost" size="icon" onClick={onClose} className="text-amber-900 hover:bg-amber-100">
              <X className="h-6 w-6" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Cake Category Selection */}
            <div>
              <label className="block text-sm font-medium text-amber-900 mb-3">Select Cake Category *</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {cakeCategories.map((category) => (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setSelectedCategory(category)}
                    className={`p-3 text-left rounded-lg border transition-all ${
                      selectedCategory === category
                        ? "border-yellow-500 bg-yellow-50 text-amber-900"
                        : "border-amber-200 hover:border-amber-300 text-amber-700"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Delivery Method */}
            <div>
              <label className="block text-sm font-medium text-amber-900 mb-3">Delivery Method *</label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setDeliveryMethod("pickup")}
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
                  onClick={() => setDeliveryMethod("delivery")}
                  className={`p-4 rounded-lg border transition-all flex items-center space-x-3 ${
                    deliveryMethod === "delivery"
                      ? "border-yellow-500 bg-yellow-50 text-amber-900"
                      : "border-amber-200 hover:border-amber-300 text-amber-700"
                  }`}
                >
                  <MapPin className="h-5 w-5" />
                  <div className="text-left">
                    <div className="font-medium">Home Delivery</div>
                    <div className="text-sm opacity-75">$15 fee</div>
                  </div>
                </button>
              </div>
            </div>

            {/* Personal Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-amber-900 mb-2">
                  <User className="inline h-4 w-4 mr-1" />
                  Full Name *
                </label>
                <Input
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="border-amber-200 focus:border-yellow-500"
                  placeholder="Your full name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-amber-900 mb-2">
                  <Phone className="inline h-4 w-4 mr-1" />
                  Phone Number *
                </label>
                <Input
                  required
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="border-amber-200 focus:border-yellow-500"
                  placeholder="(555) 123-4567"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-amber-900 mb-2">
                  <Mail className="inline h-4 w-4 mr-1" />
                  Email Address *
                </label>
                <Input
                  required
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="border-amber-200 focus:border-yellow-500"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-amber-900 mb-2">
                  <Calendar className="inline h-4 w-4 mr-1" />
                  Event Date *
                </label>
                <Input
                  required
                  type="date"
                  value={formData.eventDate}
                  onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                  className="border-amber-200 focus:border-yellow-500"
                />
              </div>
            </div>

            {/* Custom Notes */}
            <div>
              <label className="block text-sm font-medium text-amber-900 mb-2">Custom Cake Notes</label>
              <Textarea
                value={formData.customNotes}
                onChange={(e) => setFormData({ ...formData, customNotes: e.target.value })}
                className="border-amber-200 focus:border-yellow-500 min-h-24"
                placeholder="Describe your dream cake: flavors, colors, size, special decorations, dietary requirements, etc."
              />
            </div>

            {/* Reference Image Upload */}
            <div>
              <label className="block text-sm font-medium text-amber-900 mb-2">
                <Upload className="inline h-4 w-4 mr-1" />
                Reference Image (Optional)
              </label>
              <div className="border-2 border-dashed border-amber-200 rounded-lg p-6 text-center hover:border-amber-300 transition-colors">
                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" id="image-upload" />
                <label htmlFor="image-upload" className="cursor-pointer">
                  <Upload className="h-8 w-8 text-amber-500 mx-auto mb-2" />
                  <p className="text-amber-700">
                    {formData.referenceImage ? formData.referenceImage.name : "Click to upload inspiration image"}
                  </p>
                  <p className="text-sm text-amber-600 mt-1">PNG, JPG up to 10MB</p>
                </label>
              </div>
            </div>

            {/* Payment Section */}
            <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
              <h3 className="font-medium text-amber-900 mb-3 flex items-center">
                <CreditCard className="h-5 w-5 mr-2" />
                Payment & Pricing
              </h3>
              <p className="text-sm text-amber-700 mb-3">
                Final pricing will be provided based on your specifications. A 50% deposit is required to confirm your
                order.
              </p>
              <div className="text-sm text-amber-600">
                <p>• Free consultation and quote</p>
                <p>• Secure online payment</p>
                <p>• Full refund if cancelled 48+ hours in advance</p>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1 border-amber-300 text-amber-700 hover:bg-amber-50 bg-transparent"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-amber-900 font-bold"
                disabled={!selectedCategory || !deliveryMethod}
              >
                Submit Order Request
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
