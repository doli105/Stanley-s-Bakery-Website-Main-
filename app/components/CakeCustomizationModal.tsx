"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../components/ui/dialog"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Textarea } from "../components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select"
import { Card, CardContent } from "../components/ui/card"
import { X, ShoppingCart } from "lucide-react"
import Image from "next/image"
import { useCart } from "./CartContext"

interface CakeCustomizationModalProps {
  isOpen: boolean
  onClose: () => void
  cake: any
  category: string
  subcategory: string
}

export default function CakeCustomizationModal({
  isOpen,
  onClose,
  cake,
  category,
  subcategory,
}: CakeCustomizationModalProps) {
  const [selectedSize, setSelectedSize] = useState("")
  const [selectedFlavor, setSelectedFlavor] = useState("red-velvet")
  const [selectedExtras, setSelectedExtras] = useState<string[]>([])
  const [uploadedImage, setUploadedImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [specialInstructions, setSpecialInstructions] = useState("")

  const { addToCart } = useCart()

  // Show image upload only for corporate/custom cakes
  const showImageUpload = category === "celebration-special-occasion" && subcategory === "corporate-custom-cakes"

  const getJungleCakePricing = () => {
    if (cake?.category !== "Jungle Cakes") return null

    return {
      singleTier: [
        { size: "12.5cm diameter x 10cm height", serves: "2 to 4 people", price: 550 },
        { size: "12.5cm diameter x 15cm height", serves: "4 to 6 people", price: 650 },
        { size: "15cm diameter x 10cm height", serves: "8 to 10 people", price: 850 },
        { size: "15cm diameter x 15cm height", serves: "10 to 12 people", price: 950 },
        { size: "17.5cm diameter x 10cm height", serves: "12 to 14 people", price: 1200 },
        { size: "17.5cm diameter x 15cm height", serves: "15 to 20 people", price: 1500 },
        { size: "20cm diameter x 10cm height", serves: "16 to 22 people", price: 1700 },
        { size: "20cm diameter x 15cm height", serves: "20 to 25 people", price: 1900 },
        { size: "22.5cm diameter x 10cm height", serves: "25 to 30 people", price: 2300 },
        { size: "25cm diameter x 10cm height", serves: "30 to 35 people", price: 2600 },
      ],
      twoTier: [
        { size: "15cm x 10cm bottom, 10cm x 10cm top", serves: "15 to 20 people", price: 1500 },
        { size: "17.5cm x 10cm bottom, 12.5cm x 10cm top", serves: "20 to 25 people", price: 1850 },
        { size: "20cm x 10cm bottom, 15cm x 10cm top", serves: "25 to 30 people", price: 2550 },
        { size: "20cm x 15cm bottom, 15cm x 15cm top", serves: "30 to 35 people", price: 3050 },
        { size: "22.5cm x 10cm bottom, 17.5cm x 10cm top", serves: "45 to 50 people", price: 3700 },
      ],
    }
  }

  const sizeOptions = (() => {
    const junglePricing = getJungleCakePricing()

    if (junglePricing) {
      return [
        ...junglePricing.singleTier.map((pricing, index) => ({
          id: `single-${index}`,
          name: `Single Tier - ${pricing.size}`,
          serves: pricing.serves,
          price: pricing.price,
        })),
        ...junglePricing.twoTier.map((pricing, index) => ({
          id: `two-tier-${index}`,
          name: `2-Tier - ${pricing.size}`,
          serves: pricing.serves,
          price: pricing.price,
        })),
      ]
    }

    return cake?.pricing
      ? cake.pricing.map((pricing: any, index: number) => ({
          id: `size-${index}`,
          name: `${pricing.size}`,
          serves: pricing.serves,
          price: pricing.price,
        }))
      : [
          { id: "small", name: "Small (6 inch)", serves: "6-8 people", priceMultiplier: 0.8 },
          { id: "medium", name: "Medium (8 inch)", serves: "10-12 people", priceMultiplier: 1.0 },
          { id: "large", name: "Large (10 inch)", serves: "15-20 people", priceMultiplier: 1.3 },
          { id: "extra-large", name: "Extra Large (12 inch)", serves: "25-30 people", priceMultiplier: 1.6 },
        ]
  })()

  const flavorOptions = [
    { id: "red-velvet", name: "Red Velvet", price: 0 },
    { id: "lemon-cake", name: "Lemon Cake", price: 0 },
    { id: "lemon-poppyseed", name: "Lemon Poppyseed", price: 0 },
    { id: "blueberry-cream-cheese", name: "Blueberry Cream Cheese", price: 0 },
    { id: "vanilla-raspberry", name: "Vanilla Cake Sponge with Raspberry", price: 0 },
    { id: "vanilla-strawberry", name: "Vanilla Cake Sponge with Strawberry", price: 0 },
    { id: "vanilla-caramel", name: "Vanilla Sponge with Caramel Cream", price: 0 },
    { id: "chocolate-bar-one", name: "Moist Chocolate Cake Sponge with Bar One", price: 0 },
    { id: "chocolate-mint", name: "Moist Chocolate Sponge with Choc Mint", price: 0 },
  ]

  const extraOptions =
    cake?.category === "Jungle Cakes"
      ? [
          { id: "animal-figurines", name: "Animal Figurines", price: 0 }, // Price not specified in requirements
          { id: "happy-birthday-topper", name: "Happy Birthday Cake Topper", price: 150 },
          { id: "custom-topper", name: "Custom-Made Cake Topper", price: 200 },
        ]
      : [
          { id: "happy-birthday-topper", name: "Happy Birthday Cake Topper", price: 150 },
          { id: "custom-topper", name: "Custom-Made Cake Topper", price: 200 },
        ]

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setUploadedImage(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const toggleExtra = (extraId: string) => {
    setSelectedExtras((prev) => (prev.includes(extraId) ? prev.filter((id) => id !== extraId) : [...prev, extraId]))
  }

  const calculatePrice = () => {
    if (!cake) return 0

    let basePrice = 0

    if (cake?.category === "Jungle Cakes" && selectedSize) {
      const selectedSizeOption = sizeOptions.find((size) => size.id === selectedSize)
      basePrice = selectedSizeOption?.price || 0
    } else if (cake.pricing && selectedSize) {
      const selectedSizeOption = sizeOptions.find((size) => size.id === selectedSize)
      basePrice = selectedSizeOption?.price || cake.basePrice
    } else {
      const selectedSizeOption = sizeOptions.find((size) => size.id === selectedSize)
      basePrice = (cake.basePrice || 0) * (selectedSizeOption?.priceMultiplier || 1)
    }

    const selectedFlavorOption = flavorOptions.find((flavor) => flavor.id === selectedFlavor)
    basePrice += selectedFlavorOption?.price || 0

    const extrasPrice = selectedExtras.reduce((total, extraId) => {
      const extra = extraOptions.find((e) => e.id === extraId)
      return total + (extra?.price || 0)
    }, 0)

    return (basePrice + extrasPrice) * quantity
  }

  const handleAddToCart = () => {
    if (!selectedSize) return

    const selectedSizeOption = sizeOptions.find((s) => s.id === selectedSize)
    const selectedFlavorOption = flavorOptions.find((f) => f.id === selectedFlavor)
    const selectedExtrasOptions = selectedExtras.map((id) => extraOptions.find((e) => e.id === id)).filter(Boolean)

    const cartItem = {
      id: cake.id || `${category}-${subcategory}-${cake.name}`,
      name: cake.name,
      price: calculatePrice() / quantity, // Base price per item
      category: `${category} - ${subcategory}`,
      subcategory,
      serves: selectedSizeOption?.serves || "1 person",
      image: cake.image || "/colorful-layered-cake.png",
      customizations: {
        size: selectedSizeOption,
        flavor: selectedFlavorOption,
        extras: selectedExtrasOptions,
        specialInstructions,
        uploadedImage: uploadedImage ? uploadedImage.name : undefined,
      },
    }

    // Add the item with the specified quantity
    for (let i = 0; i < quantity; i++) {
      addToCart(cartItem)
    }

    onClose()
  }

  if (!cake) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-amber-900 flex items-center justify-between">
            Customize Your Cake
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Cake Details */}
          <div className="space-y-6">
            <Card>
              <CardContent className="p-4">
                <div className="relative mb-4">
                  <Image
                    src={cake.image || "/colorful-layered-cake.png"}
                    alt={cake.name}
                    width={400}
                    height={300}
                    className="w-full h-48 object-contain rounded-lg"
                  />
                </div>
                <h3 className="text-xl font-semibold text-amber-900 mb-2">{cake.name}</h3>
                <p className="text-amber-700 text-sm mb-2">{cake.description}</p>
              </CardContent>
            </Card>

            {/* Pricing Information */}
            {(cake.pricing || cake?.category === "Jungle Cakes") && (
              <Card>
                <CardContent className="p-4">
                  <h4 className="text-lg font-semibold text-amber-900 mb-3">Pricing Information</h4>
                  <div className="p-3 mb-3">
                    {cake?.category === "Jungle Cakes" ? (
                      <>
                        <p className="text-amber-800 text-sm mb-2">
                          <strong>Single Tier: Starting from R550</strong>
                        </p>
                        <p className="text-amber-800 text-sm mb-2">
                          <strong>2-Tier: Starting from R1500</strong>
                        </p>
                        <p className="text-amber-700 text-xs mb-3">(excluding animal figurines and cake toppers)</p>
                      </>
                    ) : (
                      <p className="text-amber-800 text-sm mb-2">
                        <strong>Starting from R{cake.basePrice || 0}</strong> (excluding cake toppers)
                      </p>
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-amber-700">
                      {cake?.category === "Jungle Cakes" && (
                        <div>
                          • Animal Figurines: <strong>Contact for pricing</strong>
                        </div>
                      )}
                      <div>
                        • Happy Birthday Cake Topper: <strong>R150</strong>
                      </div>
                      <div>
                        • Custom-Made Cake Topper: <strong>R200</strong>
                      </div>
                    </div>
                    <p className="text-xs text-amber-600 mt-2 italic">All flavors available for every cake design</p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Image Upload Section - Only for Corporate/Custom Cakes */}
            {showImageUpload && (
              <Card>
                <CardContent className="p-4">
                  <Label className="text-base font-semibold text-amber-900 mb-3 block">Upload Reference Image</Label>
                  <div className="border border-amber-300 rounded-lg p-6 text-center">
                    {imagePreview ? (
                      <div className="space-y-3">
                        <img
                          src={imagePreview || "/placeholder.svg"}
                          alt="Preview"
                          className="max-w-full h-32 object-cover mx-auto rounded"
                        />
                        <p className="text-sm text-amber-600">{uploadedImage?.name}</p>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setUploadedImage(null)
                            setImagePreview(null)
                          }}
                        >
                          Remove Image
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <div>
                          <Label htmlFor="image-upload" className="cursor-pointer">
                            <span className="text-amber-700 hover:text-amber-900">
                              Click to upload your logo or reference image
                            </span>
                            <Input
                              id="image-upload"
                              type="file"
                              accept="image/*"
                              onChange={handleImageUpload}
                              className="hidden"
                            />
                          </Label>
                        </div>
                        <p className="text-xs text-amber-500">PNG, JPG up to 10MB</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Column - Customization Options */}
          <div className="space-y-6">
            {/* Size Selection */}
            <Card>
              <CardContent className="p-4">
                <Label className="text-base font-semibold text-amber-900 mb-3 block">Cake Size</Label>
                <Select value={selectedSize} onValueChange={setSelectedSize}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a size" />
                  </SelectTrigger>
                  <SelectContent>
                    {sizeOptions.map((size) => (
                      <SelectItem key={size.id} value={size.id}>
                        {cake.pricing || size.price
                          ? `${size.name} - ${size.serves} - R${size.price}`
                          : `${size.name} - ${size.serves}`}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            {/* Flavor Selection */}
            <Card>
              <CardContent className="p-4">
                <Label className="text-base font-semibold text-amber-900 mb-3 block">Cake Flavor</Label>
                <Select value={selectedFlavor} onValueChange={setSelectedFlavor}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {flavorOptions.map((flavor) => (
                      <SelectItem key={flavor.id} value={flavor.id}>
                        {flavor.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            {/* Extra Options */}
            <Card>
              <CardContent className="p-4">
                <Label className="text-base font-semibold text-amber-900 mb-3 block">Extra Decorations</Label>
                <div className="grid grid-cols-1 gap-2">
                  {extraOptions.map((extra) => (
                    <div
                      key={extra.id}
                      className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                        selectedExtras.includes(extra.id)
                          ? "border-amber-500 bg-amber-50"
                          : "border-amber-200 hover:border-amber-300"
                      }`}
                      onClick={() => toggleExtra(extra.id)}
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-amber-900">{extra.name}</span>
                        <span className="text-sm text-amber-600">+R{extra.price}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quantity */}
            <Card>
              <CardContent className="p-4">
                <Label className="text-base font-semibold text-amber-900 mb-3 block">Quantity</Label>
                <div className="flex items-center space-x-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    -
                  </Button>
                  <span className="text-lg font-semibold text-amber-900 min-w-[2rem] text-center">{quantity}</span>
                  <Button variant="outline" size="sm" onClick={() => setQuantity(quantity + 1)}>
                    +
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Special Instructions */}
            <Card>
              <CardContent className="p-4">
                <Label className="text-base font-semibold text-amber-900 mb-3 block">Special Instructions</Label>
                <Textarea
                  placeholder="Any special requests, dietary requirements, or custom messages..."
                  value={specialInstructions}
                  onChange={(e) => setSpecialInstructions(e.target.value)}
                  className="min-h-[80px]"
                />
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Price Summary and Actions */}
        <div className="border-t pt-6 mt-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-center sm:text-left">
              <p className="text-sm text-amber-600">Total Price</p>
              <p className="text-3xl font-bold text-amber-900">R{calculatePrice()}</p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button
                className="bg-yellow-500 hover:bg-yellow-600 text-amber-900 font-bold"
                onClick={handleAddToCart}
                disabled={!selectedSize}
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
