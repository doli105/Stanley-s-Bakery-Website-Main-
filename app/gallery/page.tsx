"use client"

import { useState, useEffect, useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

// Sample cake data for each category
const cakeCategories = [
  {
    name: "Heart Shaped Cakes",
    menuLink: "/cakes?category=birthday&subcategory=For Her&section=heart",
    cakes: [
      {
        id: 25,
        name: "Royal Birthday Crown Heart Cake",
        image: "/images/heart-cake-1.jpg",
      },
      {
        id: 26,
        name: "August Calendar Heart Cake",
        image: "/images/heart-cake-2.jpg",
      },
      {
        id: 27,
        name: "Nqobile Memory Heart Cake",
        image: "/images/heart-cake-3.jpg",
      },
      {
        id: 28,
        name: "Pink 21st Birthday Heart Cake",
        image: "/images/heart-cake-4.jpg",
      },
      {
        id: 29,
        name: "February Calendar Heart Cake",
        image: "/images/heart-cake-5.jpg",
      },
    ],
  },
  {
    name: "Bento Cakes",
    menuLink: "/cakes?category=bento&subcategory=Themed Cupcakes",
    cakes: [
      {
        id: 30,
        name: "Pink Pearl 31st Birthday Bento Set",
        image: "/images/bento-cake-1.jpg",
      },
      {
        id: 31,
        name: "Black & Gold Luxury Bento Collection",
        image: "/images/bento-cake-2.jpg",
      },
      {
        id: 32,
        name: "Funny 25th Birthday Bento Box",
        image: "/images/bento-cake-3.jpg",
      },
      {
        id: 33,
        name: "Pink Princess 12th Birthday Bento",
        image: "/images/bento-cake-4.jpg",
      },
    ],
  },
  {
    name: "Wedding Cakes",
    menuLink: "/cakes?category=wedding&subcategory=Bridal Cakes",
    cakes: [
      {
        id: 45,
        name: "Classic Pearl Elegance Wedding Cake",
        image:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-08-14%20at%2016.53.11_0c246b40.jpg-Ldt5olDCPXhdMz079huRBvlfwiN1la.jpeg",
      },
      {
        id: 46,
        name: "Art Deco Luxury Wedding Cake",
        image:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-08-14%20at%2016.56.02_36d003a3.jpg-qWyKj0R2acsJ81FsFf1LvWCdAwESVr.jpeg",
      },
      {
        id: 47,
        name: "Romantic Draped Monogram Wedding Cake",
        image:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-08-14%20at%2016.53.11_12f9cf00.jpg-WpBpZH5WzdbHv9DCJqC1owUmWheDvy.jpeg",
      },
      {
        id: 48,
        name: "Bohemian Gold Mandala Wedding Cake",
        image:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-08-14%20at%2016.56.03_04e4a44b.jpg-a0e3cN0JfCoOQQEtjl3OUXDW4jyZIi.jpeg",
      },
    ],
  },
  {
    name: "Frozen Cakes",
    menuLink: "/cakes?category=birthday&subcategory=For Girls&section=princess",
    cakes: [
      {
        id: 6,
        name: "Elsa Birthday Celebration Cake",
        image: "/images/frozen-cake-1.jpg",
      },
      {
        id: 7,
        name: "Elsa Portrait Snowflake Cake",
        image: "/images/frozen-cake-2.jpg",
      },
      {
        id: 8,
        name: "Olaf & Elsa Winter Wonderland",
        image: "/images/frozen-cake-3.jpg",
      },
      {
        id: 9,
        name: "Let It Go Ombre Ruffle Cake",
        image: "/images/frozen-cake-4.jpg",
      },
    ],
  },
  {
    name: "Spider Man Cakes",
    menuLink: "/cakes?category=birthday&subcategory=For Boys&section=superhero",
    cakes: [
      {
        id: 1,
        name: "Spider-Man Cityscape Adventure",
        image: "/images/spiderman-cake-1.jpg",
      },
      {
        id: 2,
        name: "Classic Spider-Man Hero Cake",
        image: "/images/spiderman-cake-2.jpg",
      },
      {
        id: 3,
        name: "Spider-Man Web Pattern Cake",
        image: "/images/spiderman-cake-3.jpg",
      },
      {
        id: 4,
        name: "Spider-Man Wall Crawler Cake",
        image: "/images/spiderman-cake-4.jpg",
      },
      {
        id: 5,
        name: "Spider-Man Mask Celebration",
        image: "/images/spiderman-cake-5.jpg",
      },
    ],
  },
  {
    name: "Princess Cakes",
    menuLink: "/cakes?category=birthday&subcategory=For Girls&section=princess",
    cakes: [
      {
        id: 20,
        name: "Barbie Rainbow Princess Cake",
        image: "/images/princess-cake-1.jpg",
      },
      {
        id: 21,
        name: "Disney Princess Castle Cake",
        image: "/images/princess-cake-2.jpg",
      },
      {
        id: 22,
        name: "Butterfly Princess Birthday Cake",
        image: "/images/princess-cake-3.jpg",
      },
      {
        id: 23,
        name: "Sweet Princess Ice Cream Cake",
        image: "/images/princess-cake-4.jpg",
      },
      {
        id: 24,
        name: "Royal Crown Princess Cake",
        image: "/images/princess-cake-5.jpg",
      },
    ],
  },
  {
    name: "Milestone Cakes",
    menuLink: "/cakes?category=birthday&subcategory=For Him&section=milestone",
    cakes: [
      {
        id: 34,
        name: "January 2025 Calendar Cake",
        image: "/images/milestone-cake-1.jpg",
      },
      {
        id: 35,
        name: "Kele 40th Birthday Elegance",
        image: "/images/milestone-cake-2.jpg",
      },
      {
        id: 36,
        name: "April 1985 Memory Cake",
        image: "/images/milestone-cake-3.jpg",
      },
      {
        id: 37,
        name: "Happy 60th Birthday Mum",
        image: "/images/milestone-cake-4.jpg",
      },
      {
        id: 38,
        name: "White Feather Elegance Cake",
        image: "/images/milestone-cake-5.jpg",
      },
      {
        id: 39,
        name: "Rose Gold Drip Celebration",
        image: "/images/milestone-cake-6.jpg",
      },
    ],
  },
  {
    name: "Gentleman Cakes",
    menuLink: "/cakes?category=birthday&subcategory=For Him&section=gentleman",
    cakes: [
      {
        id: 40,
        name: "Manchester City Football Celebration",
        image:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-08-14%20at%2016.38.19_850e72b0.jpg-3wy6SbQRsD1Kgc4wPIt0QXagA66h5i.jpeg",
      },
      {
        id: 41,
        name: "Elegant Navy Ribbon Birthday Cake",
        image:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-08-14%20at%2016.38.19_07b048fa.jpg-QSBl6nbnsbLYVA0PBk3rakE2pJZgMO.jpeg",
      },
      {
        id: 42,
        name: "Construction Site Adventure Cake",
        image:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-08-14%20at%2016.38.20_b4b38129.jpg-5o95NE4MqMN3mGm0jvwAwZ1q6Qp4Ws.jpeg",
      },
      {
        id: 43,
        name: "Luxury Black Automotive Cake",
        image:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-08-14%20at%2016.38.19_61b9a22b.jpg-G6OCxUn5vp11QwmbKtPfa0QAhzbbmF.jpeg",
      },
      {
        id: 44,
        name: "50th Best Husband & Dad Celebration",
        image:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-08-14%20at%2016.38.20_9e093e87.jpg-5OBGtigeIeaAqbGxEj7ZUc87X0tPhF.jpeg",
      },
    ],
  },
  {
    name: "Cocomelon Cakes",
    menuLink: "/cakes?category=birthday&subcategory=Cocomelon Cakes",
    cakes: [
      {
        id: 10,
        name: "JJ Rainbow Garden Cake",
        image: "/images/cocomelon-cake-1.jpg",
      },
      {
        id: 11,
        name: "JJ First Birthday Celebration",
        image: "/images/cocomelon-cake-2.jpg",
      },
      {
        id: 12,
        name: "JJ Rainbow Balloon Cake",
        image: "/images/cocomelon-cake-3.jpg",
      },
      {
        id: 13,
        name: "JJ Animal Friends Cake",
        image: "/images/cocomelon-cake-4.jpg",
      },
      {
        id: 14,
        name: "JJ Green Rainbow Cake",
        image: "/images/cocomelon-cake-5.jpg",
      },
    ],
  },
  {
    name: "Jungle Cakes",
    menuLink: "/cakes?category=birthday&subcategory=For Boys&section=jungle",
    cakes: [
      {
        id: 15,
        name: "Safari Adventure Two-Tier Cake",
        image: "/images/jungle-cake-1.jpg",
      },
      {
        id: 16,
        name: "Miranda's Jungle Paradise Cake",
        image: "/images/jungle-cake-2.jpg",
      },
      {
        id: 17,
        name: "Dinosaur Birthday Adventure Cake",
        image: "/images/jungle-cake-3.jpg",
      },
      {
        id: 18,
        name: "Lion King Pride Lands Cake",
        image: "/images/jungle-cake-4.jpg",
      },
      {
        id: 19,
        name: "King of the Jungle Three-Tier Cake",
        image: "/images/jungle-cake-5.jpg",
      },
    ],
  },
]

export default function Gallery() {
  const [scrollPositions, setScrollPositions] = useState<{ [key: string]: number }>({})
  const [visibleCategories, setVisibleCategories] = useState<Set<number>>(new Set())
  const categoryRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number.parseInt(entry.target.getAttribute("data-category-index") || "0")
          if (entry.isIntersecting) {
            setVisibleCategories((prev) => new Set([...prev, index]))
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      },
    )

    categoryRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [])

  const scrollCarousel = (categoryName: string, direction: "left" | "right") => {
    const container = document.getElementById(`carousel-${categoryName.replace(/\s+/g, "-").toLowerCase()}`)
    if (container) {
      const scrollAmount = 280
      const currentScroll = scrollPositions[categoryName] || 0
      const newScroll = direction === "left" ? currentScroll - scrollAmount : currentScroll + scrollAmount

      container.scrollTo({
        left: newScroll,
        behavior: "smooth",
      })

      setScrollPositions((prev) => ({
        ...prev,
        [categoryName]: newScroll,
      }))
    }
  }

  return (
    <div className="min-h-screen relative bg-white">
      <div className="pt-2 pb-8 relative z-10">
        <div className="container mx-auto px-3">
          <div className="text-center">
            <h1 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-pink-600 via-rose-500 to-pink-700 bg-clip-text text-transparent mb-2 font-serif">
              Our Cake Gallery
            </h1>
            <p className="text-sm md:text-lg text-amber-700 max-w-3xl mx-auto font-medium mb-4">
              Discover our exquisite collection of handcrafted cakes, each one a masterpiece designed to make your
              special moments unforgettable
            </p>
            <div className="flex items-center justify-center space-x-2 text-amber-600">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
              <span className="text-xs font-medium">Scroll down to explore more cakes</span>
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-3 relative z-10">
        <div className="space-y-8">
          {cakeCategories.map((category, categoryIndex) => (
            <div
              key={categoryIndex}
              className={`relative transition-all duration-700 ease-out ${
                visibleCategories.has(categoryIndex) ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"
              }`}
              ref={(el) => (categoryRefs.current[categoryIndex] = el)}
              data-category-index={categoryIndex}
              style={{
                transitionDelay: `${categoryIndex * 100}ms`,
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg md:text-2xl font-bold text-amber-700 font-serif">{category.name}</h2>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => scrollCarousel(category.name, "left")}
                    className="border-gray-300 hover:bg-gray-100 text-gray-700 rounded-full w-8 h-8 p-0"
                  >
                    <ChevronLeft className="h-3 w-3" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => scrollCarousel(category.name, "right")}
                    className="border-gray-300 hover:bg-gray-100 text-gray-700 rounded-full w-8 h-8 p-0"
                  >
                    <ChevronRight className="h-3 w-3" />
                  </Button>
                </div>
              </div>

              <div
                id={`carousel-${category.name.replace(/\s+/g, "-").toLowerCase()}`}
                className="flex space-x-3 overflow-x-auto scrollbar-hide pb-4"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                {category.cakes.map((cake, cakeIndex) => (
                  <div
                    key={cake.id}
                    className={`flex-shrink-0 transition-all duration-500 ease-out ${
                      visibleCategories.has(categoryIndex) ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
                    }`}
                    style={{
                      transitionDelay: `${categoryIndex * 100 + cakeIndex * 50}ms`,
                    }}
                  >
                    <Card className="w-64 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer border-2 border-amber-200 hover:border-amber-400 bg-white overflow-hidden group relative">
                      <CardContent className="p-0">
                        <div className="relative overflow-hidden bg-gradient-to-br from-amber-50 to-yellow-50 border-b-2 border-amber-100 group-hover:border-amber-300 transition-all duration-500">
                          <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-amber-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
                          <div className="absolute top-0 right-0 w-4 h-4 border-r-2 border-t-2 border-amber-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
                          <div className="absolute bottom-0 left-0 w-4 h-4 border-l-2 border-b-2 border-amber-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
                          <div className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-amber-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
                          <div className="absolute inset-1 border-2 border-transparent group-hover:border-amber-300 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:shadow-lg group-hover:shadow-amber-200/50"></div>
                          <img
                            src={cake.image || "/placeholder.svg"}
                            alt={cake.name}
                            className="w-full h-48 object-contain transition-all duration-500 group-hover:scale-110 p-3 group-hover:p-2"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                          <Badge className="absolute top-3 left-3 bg-pink-600/90 hover:bg-pink-700 text-white font-medium px-2 py-1 text-xs backdrop-blur-sm border border-pink-400/30 shadow-lg">
                            {category.name.split(" ")[0]}
                          </Badge>
                        </div>
                        <div className="p-4 bg-gradient-to-b from-white to-amber-50/30 group-hover:from-amber-50/50 group-hover:to-yellow-50/50 transition-all duration-500">
                          <h3 className="text-sm font-bold text-amber-700 mb-3 font-serif leading-tight text-center line-clamp-2 group-hover:text-amber-800 transition-colors duration-300">
                            {cake.name}
                          </h3>
                          <Link href="/cakes">
                            <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-amber-900 font-bold py-2 text-xs rounded-lg shadow-md hover:shadow-xl transition-all duration-300 border-2 border-yellow-400 hover:border-yellow-500 group-hover:scale-105">
                              Order Now
                            </Button>
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="fixed bottom-6 right-6 z-50">
        <a
          href="https://wa.me/27784914587?text=Hi! I'm interested in ordering a cake from Stanley's Bakery"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center"
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
          </svg>
        </a>
      </div>

      <div className="bg-amber-50 py-12 mt-16">
        <div className="container mx-auto px-3 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-amber-700 mb-4 font-serif">Found Your Perfect Cake?</h2>
          <p className="text-amber-600 mb-6 max-w-2xl mx-auto">
            Browse our complete menu to see all available options and place your order today!
          </p>
          <Link href="/cakes">
            <Button className="bg-yellow-500 hover:bg-yellow-600 text-amber-900 font-bold py-3 px-8 text-lg rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-yellow-400 hover:border-yellow-500">
              Order Now
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
