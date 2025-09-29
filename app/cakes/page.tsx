"use client"

import { useState, useRef } from "react"
import { ArrowLeft, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import AddToCartButton from "../components/AddToCartButton"

import menuData from "../../data/menu.json"

export default function CakesPage() {
  const [selectedParentCategory, setSelectedParentCategory] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [visibleCategories, setVisibleCategories] = useState<Set<number>>(new Set())
  const categoryRefs = useRef<(HTMLDivElement | null)[]>([])

  const parentCategories = Object.keys(menuData).map((categoryKey, index) => {
    const categoryData = menuData[categoryKey]
    const totalItems = Object.values(categoryData?.subcategories || {}).reduce((total: number, subcategory: any) => {
      return total + (subcategory?.items?.length || 0)
    }, 0)

    return {
      id: index + 1,
      name: categoryData?.name || categoryKey,
      key: categoryKey,
      description: getDescriptionForCategory(categoryData?.name || categoryKey),
      totalItems,
    }
  })

  const categories = selectedParentCategory
    ? Object.keys(menuData[parentCategories.find((p) => p.id === selectedParentCategory)?.key]?.subcategories || {})
        .map((subcategoryKey, index) => {
          const parentCategoryKey = parentCategories.find((p) => p.id === selectedParentCategory)?.key
          const subcategoryData = menuData[parentCategoryKey]?.subcategories[subcategoryKey]

          return {
            id: index + 1,
            name: subcategoryData?.name || subcategoryKey,
            key: subcategoryKey,
            description: `Delicious ${(subcategoryData?.name || subcategoryKey).toLowerCase()} made fresh daily`,
            items: subcategoryData?.items || [],
            bgColor: getBgColorForCategory(subcategoryData?.name || subcategoryKey),
            textColor: getTextColorForCategory(subcategoryData?.name || subcategoryKey),
            borderColor: getBorderColorForCategory(subcategoryData?.name || subcategoryKey),
          }
        })
        .filter((category) => category.items && category.items.length > 0)
    : []

  function getDescriptionForCategory(categoryName: string) {
    const descriptions: { [key: string]: string } = {
      "Celebration and Special Occasion Cakes": "Perfect cakes for birthdays, weddings, and special celebrations",
      "Cookies and Pastries": "Freshly baked cookies, pastries, and sweet treats",
      "Regular treats and desserts": "Daily favorites and classic desserts for every occasion",
      "Cake boards": "Professional cake boards and accessories for your perfect presentation",
    }
    return descriptions[categoryName] || "Delicious treats made with love"
  }

  function getBgColorForCategory(categoryName: string) {
    const colors: { [key: string]: string } = {
      "Princess Cakes": "bg-gradient-to-br from-pink-100 to-pink-200",
      "Fairyland Cakes": "bg-gradient-to-br from-violet-100 to-violet-200",
      "Spider Man Cakes": "bg-gradient-to-br from-slate-100 to-slate-200",
      "Frozen Cakes": "bg-gradient-to-br from-cyan-100 to-cyan-200",
      "CoComelon Cakes": "bg-gradient-to-br from-lime-100 to-lime-200",
      "Jungle Cakes": "bg-gradient-to-br from-emerald-100 to-emerald-200",
      "Mickey Mouse Cakes": "bg-gradient-to-br from-red-100 to-red-200",
      "Bento Cakes": "bg-gradient-to-br from-pink-100 to-pink-200",
      "Heart Shaped Cakes": "bg-gradient-to-br from-red-100 to-red-200",
      "Car Lovers Cakes": "bg-gradient-to-br from-blue-100 to-blue-200",
      "Sportsman Cakes": "bg-gradient-to-br from-green-100 to-green-200",
    }
    return colors[categoryName] || "bg-gradient-to-br from-gray-100 to-gray-200"
  }

  function getTextColorForCategory(categoryName: string) {
    const colors: { [key: string]: string } = {
      "Princess Cakes": "text-pink-800",
      "Fairyland Cakes": "text-violet-800",
      "Spider Man Cakes": "text-slate-800",
      "Frozen Cakes": "text-cyan-800",
      "CoComelon Cakes": "text-lime-800",
      "Jungle Cakes": "text-emerald-800",
      "Mickey Mouse Cakes": "text-red-800",
      "Bento Cakes": "text-pink-800",
      "Heart Shaped Cakes": "text-red-800",
      "Car Lovers Cakes": "text-blue-800",
      "Sportsman Cakes": "text-green-800",
    }
    return colors[categoryName] || "text-gray-800"
  }

  function getBorderColorForCategory(categoryName: string) {
    const colors: { [key: string]: string } = {
      "Princess Cakes": "border-pink-300",
      "Fairyland Cakes": "border-violet-300",
      "Spider Man Cakes": "border-slate-300",
      "Frozen Cakes": "border-cyan-300",
      "CoComelon Cakes": "border-lime-300",
      "Jungle Cakes": "border-emerald-300",
      "Mickey Mouse Cakes": "border-red-300",
      "Bento Cakes": "border-pink-300",
      "Heart Shaped Cakes": "border-red-300",
      "Car Lovers Cakes": "border-blue-300",
      "Sportsman Cakes": "border-green-300",
    }
    return colors[categoryName] || "border-gray-300"
  }

  if (selectedCategory) {
    const category = categories.find((cat) => cat.id === selectedCategory)
    if (!category) return null

    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50">
        <div className="bg-white shadow-sm border-b sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-4">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="default"
                onClick={() => {
                  setSelectedCategory(null)
                }}
                className="flex items-center gap-2 text-amber-700 hover:text-amber-800 hover:bg-amber-50 min-h-[44px] px-4"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="hidden sm:inline">Back to Menu</span>
                <span className="sm:hidden">Back</span>
              </Button>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-amber-800">{category.name}</h1>
                <p className="text-sm sm:text-sm text-amber-600 hidden sm:block">{category.description}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm border-b sticky top-[81px] sm:top-[89px] z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
            <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-1">
              {categories.map((cat) => (
                <Button
                  key={cat.id}
                  variant={selectedCategory === cat.id ? "default" : "ghost"}
                  size="default"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`whitespace-nowrap text-sm px-4 py-2 min-h-[44px] flex-shrink-0 ${
                    selectedCategory === cat.id
                      ? "bg-amber-600 text-white hover:bg-amber-700"
                      : "text-amber-700 hover:text-amber-800 hover:bg-amber-50"
                  }`}
                >
                  {cat.name}
                </Button>
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {category.items.map((item, index) => (
              <Card
                key={item.name}
                className={`${category.bgColor} ${category.borderColor} border-2 hover:shadow-lg transition-all duration-300 transform hover:scale-105 animate-in slide-in-from-bottom-4 fade-in`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-4 sm:p-4">
                  <div className="aspect-[4/2.5] bg-white/50 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                    <img
                      src={
                        item.image ||
                        `/placeholder.svg?height=120&width=160&query=${encodeURIComponent(item.name + " cake dessert bakery") || "/placeholder.svg"}`
                      }
                      alt={item.name}
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.src = `/placeholder.svg?height=120&width=160&query=${encodeURIComponent(item.name + " cake dessert bakery")}`
                      }}
                    />
                  </div>
                  <h3 className={`font-semibold text-base sm:text-base ${category.textColor} mb-2 sm:mb-2`}>
                    {item.name}
                  </h3>
                  <p className="text-sm sm:text-sm text-gray-600 mb-3 sm:mb-3 line-clamp-2">{item.description}</p>

                  <div className="mb-3 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold text-gray-800">
                        R{item.basePrice || item.price?.replace(/[^\d.]/g, "") || "0"}
                      </span>
                    </div>

                    <div className="bg-white/70 rounded-lg p-2 border border-gray-200">
                      {item.weight && (
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium text-gray-600">Weight:</span>
                          <span className="text-sm font-bold text-amber-700 bg-amber-50 px-2 py-1 rounded">
                            {item.weight}
                          </span>
                        </div>
                      )}
                      {item.quantity && (
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium text-gray-600">Quantity:</span>
                          <span className="text-sm font-bold text-blue-700 bg-blue-50 px-2 py-1 rounded">
                            {item.quantity}
                          </span>
                        </div>
                      )}
                      {item.servingSize && (
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-600">Serves:</span>
                          <span className="text-sm font-bold text-green-700 bg-green-50 px-2 py-1 rounded">
                            {item.servingSize}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-2">
                    <Badge
                      variant="secondary"
                      className={`${category.bgColor} ${category.textColor} text-sm font-bold px-3 py-1.5`}
                    >
                      {item.price || `R${item.basePrice || "0"}`}
                    </Badge>
                    <AddToCartButton
                      cake={{
                        id: `${category.key}-${item.name}`,
                        name: item.name,
                        description: item.description,
                        basePrice: Number.parseFloat(
                          item.basePrice?.toString() || item.price?.replace(/[^\d.]/g, "") || "0",
                        ),
                        image: item.image,
                        category: category.name,
                        pricing: item.pricing,
                      }}
                      category={parentCategories.find((p) => p.id === selectedParentCategory)?.key || "general"}
                      subcategory={category.key}
                      variant="default"
                      size="default"
                      className="w-full"
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-yellow-50 to-orange-50 relative overflow-hidden">
      {/* Floating background elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div
          className="absolute top-20 left-10 text-4xl opacity-20"
          style={{ animation: "breathe 3s ease-in-out infinite" }}
        >
          🧁
        </div>
        <div
          className="absolute top-40 right-20 text-3xl opacity-15"
          style={{ animation: "breathe 4s ease-in-out infinite 0.5s" }}
        >
          🍰
        </div>
        <div
          className="absolute top-60 left-1/4 text-5xl opacity-10"
          style={{ animation: "breathe 3.5s ease-in-out infinite 1s" }}
        >
          🎂
        </div>
        <div
          className="absolute bottom-40 right-10 text-4xl opacity-20"
          style={{ animation: "breathe 4.5s ease-in-out infinite 2s" }}
        >
          🧁
        </div>
        <div
          className="absolute bottom-20 left-20 text-3xl opacity-15"
          style={{ animation: "breathe 3.2s ease-in-out infinite 0.5s" }}
        >
          🍰
        </div>
        <div
          className="absolute top-1/3 right-1/3 text-4xl opacity-10"
          style={{ animation: "breathe 4.2s ease-in-out infinite 1.5s" }}
        >
          🎂
        </div>
        <div
          className="absolute bottom-1/3 left-1/2 text-3xl opacity-20"
          style={{ animation: "breathe 3.8s ease-in-out infinite 3s" }}
        >
          🧁
        </div>
      </div>

      <style jsx>{`
        @keyframes breathe {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
        }
      `}</style>

      <div className="relative z-10">
        <div className="text-center py-8 sm:py-12 px-3 sm:px-6">
          <h1 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-pink-600 via-pink-500 to-orange-500 bg-clip-text text-transparent mb-2 font-serif animate-in fade-in slide-in-from-top-4 duration-1000">
            Our Cake Menu
          </h1>
          <p
            className="text-lg sm:text-xl text-pink-600 font-medium animate-in fade-in slide-in-from-top-6 duration-1000"
            style={{ animationDelay: "200ms" }}
          >
            Discover our delicious collection of handcrafted cakes and treats
          </p>
        </div>

        {selectedParentCategory ? (
          <>
            <div className="bg-gradient-to-br from-yellow-50 to-pink-50 border-b relative z-10">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
                <div className="flex items-center gap-3 mb-4">
                  <Button
                    variant="ghost"
                    size="default"
                    onClick={() => setSelectedParentCategory(null)}
                    className="flex items-center gap-2 text-pink-600 hover:text-pink-700 hover:bg-pink-50 border border-pink-200 hover:border-pink-300 min-h-[44px] px-4"
                  >
                    <ArrowLeft className="w-5 h-5" />
                    <span className="hidden sm:inline">Back to Categories</span>
                    <span className="sm:hidden">Back</span>
                  </Button>
                  <h2 className="text-xl sm:text-xl font-bold bg-gradient-to-r from-pink-500 to-pink-600 bg-clip-text text-transparent font-serif">
                    {parentCategories.find((p) => p.id === selectedParentCategory)?.name}
                  </h2>
                </div>
                <p className="text-sm sm:text-sm text-pink-600 text-center mb-3 font-medium">
                  <span className="hidden sm:inline">
                    Slide horizontally to browse categories • Click to view full menu
                  </span>
                  <span className="sm:hidden">Slide to browse • Tap to view menu</span>
                </p>
                <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
                  {categories.map((category) => (
                    <Button
                      key={category.id}
                      variant="ghost"
                      size="default"
                      onClick={() => setSelectedCategory(category.id)}
                      className="whitespace-nowrap text-sm px-4 py-2 min-h-[44px] flex-shrink-0 text-pink-600 hover:text-pink-700 hover:bg-pink-50 border border-pink-200 hover:border-pink-300"
                    >
                      {category.name}
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 relative z-10">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-6">
                {categories.map((category, index) => (
                  <div
                    key={category.id}
                    ref={(el) => (categoryRefs.current[index] = el)}
                    data-category-index={index}
                    className={`transition-all duration-500 ease-out ${
                      visibleCategories.has(index) ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
                    }`}
                    style={{
                      transitionDelay: `${index * 100}ms`,
                    }}
                  >
                    <Card
                      className="bg-gradient-to-br from-yellow-50 to-pink-50 border-2 border-pink-300 hover:border-pink-400 cursor-pointer hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group overflow-hidden"
                      onClick={() => setSelectedCategory(category.id)}
                    >
                      <CardContent className="p-4 sm:p-4 relative">
                        <div className="absolute top-0 left-0 w-6 h-6 border-l-2 border-t-2 border-pink-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="absolute top-0 right-0 w-6 h-6 border-r-2 border-t-2 border-pink-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="absolute bottom-0 left-0 w-6 h-6 border-l-2 border-b-2 border-pink-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="absolute bottom-0 right-0 w-6 h-6 border-r-2 border-b-2 border-pink-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                        <div className="aspect-[4/2.5] bg-white/50 rounded-lg mb-4 flex items-center justify-center overflow-hidden border-2 border-pink-200 group-hover:border-pink-300 transition-all duration-500">
                          <img
                            src={
                              category.items?.[0]?.image ||
                              `/placeholder.svg?height=120&width=160&query=${encodeURIComponent(category.name + " cakes bakery display") || "/placeholder.svg"}`
                            }
                            alt={category.name}
                            className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement
                              target.src = `/placeholder.svg?height=120&width=160&query=${encodeURIComponent(category.name + " cakes bakery display")}`
                            }}
                          />
                        </div>
                        <h3 className="font-bold text-lg sm:text-lg text-pink-600 mb-2 sm:mb-2 font-serif font-serif group-hover:text-pink-700 transition-colors duration-300">
                          {category.name}
                        </h3>
                        <p className="text-sm sm:text-sm text-pink-500 mb-4 sm:mb-4 line-clamp-2">
                          {category.description}
                        </p>
                        <Button
                          size="default"
                          onClick={() => setSelectedCategory(category.id)}
                          className="bg-gradient-to-r from-pink-400 to-pink-500 hover:from-pink-500 hover:to-pink-600 text-white font-bold text-sm px-4 py-2 min-h-[44px] w-full rounded-lg shadow-md hover:shadow-xl transition-all duration-300 border border-pink-300 group-hover:scale-105"
                        >
                          View Menu
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>

              {/* Added contact card for personalized recommendations */}
              {/* Improved animations and transitions for smoother user experience */}
            </div>

            {/* Added contact card for personalized recommendations */}
            <div
              className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 text-center relative z-10"
              style={{ animationDelay: "800ms" }}
            >
              <Card className="bg-gradient-to-r from-pink-100 to-yellow-100 border-pink-300 border-2 max-w-md mx-auto hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-6 sm:p-6">
                  <h3 className="font-bold text-xl sm:text-xl text-pink-600 mb-3 sm:mb-3 font-serif">
                    Need Help Choosing?
                  </h3>
                  <p className="text-base sm:text-base text-pink-500 mb-4 sm:mb-4 font-medium">
                    Contact us for personalized recommendations
                  </p>
                  <Button
                    size="default"
                    className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white w-full"
                    onClick={() =>
                      window.open(
                        "https://wa.me/27123456789?text=Hi! I need help choosing from your cake menu.",
                        "_blank",
                      )
                    }
                  >
                    <Phone className="w-5 h-5 mr-2" />
                    WhatsApp Us
                  </Button>
                </CardContent>
              </Card>
            </div>
          </>
        ) : (
          <>
            <div className="max-w-7xl mx-auto px-3 sm:px-6 py-4 sm:py-8 relative z-10">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {parentCategories.map((category, index) => (
                  <Card
                    key={category.id}
                    className="bg-gradient-to-br from-yellow-50 to-pink-50 border-2 border-pink-300 hover:border-pink-400 cursor-pointer hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group overflow-hidden animate-in fade-in slide-in-from-bottom-4"
                    style={{ animationDelay: `${index * 150}ms` }}
                    onClick={() => setSelectedParentCategory(category.id)}
                  >
                    <CardContent className="p-4 sm:p-6 relative">
                      <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-pink-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <div className="absolute top-0 right-0 w-4 h-4 border-r-2 border-t-2 border-pink-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <div className="absolute bottom-0 left-0 w-4 h-4 border-l-2 border-b-2 border-pink-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <div className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-pink-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                      <h3 className="font-bold text-xl sm:text-2xl bg-gradient-to-r from-pink-500 to-pink-600 bg-clip-text text-transparent mb-3 sm:mb-4 font-serif group-hover:from-pink-600 group-hover:to-pink-700 transition-all duration-300">
                        {category.name}
                      </h3>
                      <p className="text-sm sm:text-base text-pink-500 mb-4 sm:mb-6 line-clamp-3 font-medium">
                        {category.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <Badge className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-yellow-900 font-bold px-3 py-1 text-sm border border-yellow-300">
                          {category.totalItems} items
                        </Badge>
                        <Button
                          size="sm"
                          onClick={() => setSelectedParentCategory(category.id)}
                          className="bg-gradient-to-r from-pink-400 to-pink-500 hover:from-pink-500 hover:to-pink-600 text-white font-bold px-4 py-2 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 border border-pink-300 group-hover:scale-105"
                        >
                          View Menu
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div
              className="max-w-7xl mx-auto px-3 sm:px-6 py-8 sm:py-12 text-center relative z-10"
              style={{ animationDelay: "800ms" }}
            >
              <Card className="bg-gradient-to-r from-pink-100 to-yellow-100 border-pink-300 border-2 max-w-md mx-auto hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-4 sm:p-6">
                  <h3 className="font-bold text-lg sm:text-xl text-pink-600 mb-2 sm:mb-3 font-serif">
                    Need Help Choosing?
                  </h3>
                  <p className="text-sm sm:text-base text-pink-500 mb-3 sm:mb-4 font-medium">
                    Contact us for personalized recommendations
                  </p>
                  <Button
                    className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white w-full sm:w-auto"
                    onClick={() =>
                      window.open(
                        "https://wa.me/27123456789?text=Hi! I need help choosing from your cake menu.",
                        "_blank",
                      )
                    }
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    WhatsApp Us
                  </Button>
                </CardContent>
              </Card>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
