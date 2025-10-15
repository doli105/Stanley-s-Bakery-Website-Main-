"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ShoppingCart, ChevronRight } from "lucide-react"
import { useCart } from "../components/CartContext"
import WhatsAppChatWidget from "../components/WhatsAppChatWidget"

interface MenuItem {
  id: string
  name: string
  description: string
  basePrice: number
  priceRange?: string // Added priceRange field for items with price ranges
  image: string
  sizes?: Array<{ name: string; price: number; serves?: string }>
  flavors?: string[]
  customizable?: boolean
  inStock?: boolean
}

interface Subcategory {
  name: string
  items: MenuItem[]
}

interface Category {
  name: string
  subcategories: Record<string, Subcategory>
}

interface MenuData {
  [key: string]: Category
}

export default function MenuPage() {
  const [menuData, setMenuData] = useState<MenuData | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null)
  const { addToCart } = useCart()

  useEffect(() => {
    fetch("/api/menu")
      .then((res) => res.json())
      .then((data) => {
        setMenuData(data)
        // Set first category as default
        const firstCategory = Object.keys(data)[0]
        setSelectedCategory(firstCategory)
        const firstSubcat = Object.keys(data[firstCategory].subcategories)[0]
        setSelectedSubcategory(firstSubcat)
      })
      .catch((error) => console.error("Error loading menu:", error))
  }, [])

  if (!menuData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-lg text-muted-foreground">Loading our delicious menu...</p>
        </div>
      </div>
    )
  }

  const currentCategory = selectedCategory ? menuData[selectedCategory] : null
  const currentSubcategory =
    currentCategory && selectedSubcategory ? currentCategory.subcategories[selectedSubcategory] : null

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-white to-pink-50">
      {/* Hero Section */}
      <div className="bg-stanley-gradient-primary text-white py-16 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-slideInFromTop font-dancing-script">Our Menu</h1>
          <p className="text-lg md:text-xl opacity-90 animate-fadeInUp">
            Discover our handcrafted cakes, pastries, and sweet treats
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Category Navigation */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-stanley-brown">Categories</h2>
          <div className="flex flex-wrap gap-3">
            {Object.entries(menuData).map(([key, category]) => (
              <Button
                key={key}
                onClick={() => {
                  setSelectedCategory(key)
                  const firstSubcat = Object.keys(category.subcategories)[0]
                  setSelectedSubcategory(firstSubcat)
                }}
                variant={selectedCategory === key ? "default" : "outline"}
                className={`${
                  selectedCategory === key ? "bg-stanley-gradient-primary text-white" : "hover:bg-stanley-pink/10"
                }`}
              >
                {category.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Subcategory Navigation */}
        {currentCategory && (
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4 text-stanley-brown">{currentCategory.name} - Select Type</h3>
            <div className="flex flex-wrap gap-2">
              {Object.entries(currentCategory.subcategories).map(([key, subcategory]) => (
                <Button
                  key={key}
                  onClick={() => setSelectedSubcategory(key)}
                  variant={selectedSubcategory === key ? "secondary" : "ghost"}
                  size="sm"
                  className={`${
                    selectedSubcategory === key ? "bg-stanley-yellow text-stanley-brown" : "hover:bg-stanley-yellow/20"
                  }`}
                >
                  {subcategory.name}
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Menu Items Grid */}
        {currentSubcategory && (
          <div>
            <h3 className="text-2xl font-bold mb-6 text-stanley-brown">{currentSubcategory.name}</h3>
            {currentSubcategory.items.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-lg text-muted-foreground">No items available in this category yet.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentSubcategory.items.map((item, index) => (
                  <Card
                    key={item.id}
                    className="overflow-hidden hover:shadow-xl transition-all duration-300 card-hover"
                  >
                    <div className="relative h-64 bg-gradient-to-br from-amber-100 to-pink-100">
                      <Image
                        src={
                          item.image ||
                          `/placeholder.svg?height=400&width=600&query=${encodeURIComponent(item.name + " cake")}`
                        }
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        priority={index < 6}
                        quality={85}
                        onError={(e) => {
                          const target = e.target as HTMLImageElement
                          target.src = `/placeholder.svg?height=400&width=600&query=${encodeURIComponent(item.name + " cake")}`
                        }}
                      />
                      {!item.inStock && <Badge className="absolute top-2 right-2 bg-red-500">Out of Stock</Badge>}
                      {item.customizable && (
                        <Badge className="absolute top-2 left-2 bg-stanley-yellow text-stanley-brown">
                          Customizable
                        </Badge>
                      )}
                    </div>
                    <CardContent className="p-6">
                      <h4 className="text-xl font-bold mb-2 text-stanley-brown">{item.name}</h4>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{item.description}</p>

                      <div className="space-y-3">
                        {/* Price */}
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-muted-foreground">
                            {item.priceRange ? "Price range:" : "Starting from:"}
                          </span>
                          <span className="text-2xl font-bold text-stanley-pink">
                            {item.priceRange
                              ? `R${item.priceRange.split("-")[0]}-R${item.priceRange.split("-")[1]}`
                              : `R${item.basePrice.toFixed(2)}`}
                          </span>
                        </div>

                        {/* Sizes */}
                        {item.sizes && item.sizes.length > 0 && (
                          <div>
                            <p className="text-xs font-medium text-muted-foreground mb-1">Available sizes:</p>
                            <p className="text-xs text-muted-foreground">{item.sizes.length} options</p>
                          </div>
                        )}

                        {/* Flavors */}
                        {item.flavors && item.flavors.length > 0 && (
                          <div>
                            <p className="text-xs font-medium text-muted-foreground mb-1">Flavors:</p>
                            <p className="text-xs text-muted-foreground line-clamp-2">
                              {item.flavors.slice(0, 2).join(", ")}
                              {item.flavors.length > 2 && ` +${item.flavors.length - 2} more`}
                            </p>
                          </div>
                        )}

                        {/* Add to Cart Button */}
                        <Button
                          className="w-full bg-stanley-gradient-primary text-white hover:opacity-90"
                          onClick={() => {
                            addToCart({
                              id: item.id,
                              name: item.name,
                              price: item.basePrice,
                              image: item.image,
                              quantity: 1,
                            })
                          }}
                          disabled={!item.inStock}
                        >
                          <ShoppingCart className="mr-2 h-4 w-4" />
                          {item.inStock ? "Add to Cart" : "Out of Stock"}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* WhatsApp chat widget */}
      <WhatsAppChatWidget />
    </div>
  )
}
