"use client"

import type React from "react"
import { ChefHat } from "lucide-react" // Added ChefHat import

import { useState } from "react"
import {
  Package,
  Clock,
  Truck,
  CheckCircle,
  Edit,
  X,
  CreditCard,
  XCircle,
  Trash2,
  Plus,
  ImageIcon,
  Lock,
  User,
  Search,
  Grid,
  List,
  Star,
  Eye,
  EyeOff,
  Save,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const ADMIN_CREDENTIALS = {
  username: "orders@stanleysbakery",
  password: "Sifiso@2016",
}

const completeMenuStructure = {
  "celebration-special-occasion": {
    name: "Celebration & Special Occasion Cakes",
    subcategories: {
      "bento-cakes": {
        name: "Bento Cakes",
        items: [
          {
            id: "bento-1",
            name: "Black & Gold Elegance Bento",
            price: "R150",
            image: "/black-gold-bento-cake.jpg",
            description:
              "Sophisticated black buttercream with gold accents, featuring personalized messages and calendar designs",
            inStock: true,
            featured: false,
          },
          {
            id: "bento-2",
            name: "Pink & White Birthday Bento",
            price: "R140",
            image: "/pink-white-bento-cake.jpg",
            description: "Elegant pink and white themed bento with pearl decorations, perfect for milestone birthdays",
            inStock: true,
            featured: true,
          },
          {
            id: "bento-3",
            name: "Cream & Gold Royal Bento",
            price: "R160",
            image: "/cream-gold-royal-bento-cake.jpg",
            description: "Luxurious cream buttercream with red floral accents and gold crown decorations",
            inStock: true,
            featured: false,
          },
          {
            id: "bento-4",
            name: "Humorous 25th Birthday Bento",
            price: "R130",
            image: "/humorous-25th-birthday-bento-cake.jpg",
            description: "Fun and playful bento with cartoon characters and witty birthday messages",
            inStock: true,
            featured: false,
          },
          {
            id: "bento-5",
            name: "Vibrant Pink Birthday Bento",
            price: "R155",
            image: "/vibrant-pink-birthday-bento-cake.jpg",
            description: "Bold pink rose wreath design with gold script lettering for festive celebrations",
            inStock: true,
            featured: false,
          },
        ],
      },
      "heart-shaped-cakes": {
        name: "Heart Shaped Cakes",
        items: [
          {
            id: "heart-1",
            name: "Personalized Photo Heart Cake",
            price: "R220",
            image: "/personalized-photo-heart-cake.jpg",
            description:
              "Elegant white heart cake with photo prints, black ribbon bows, and personalized birthday message",
            inStock: true,
            featured: true,
          },
          {
            id: "heart-2",
            name: "Royal Gold Crown Heart Cake",
            price: "R250",
            image: "/royal-gold-crown-heart-cake.jpg",
            description:
              "Luxurious white heart cake with gold script lettering, pearl details, and golden crown topper",
            inStock: true,
            featured: false,
          },
          {
            id: "heart-3",
            name: "Red Calendar Heart Cake",
            price: "R230",
            image: "/red-calendar-heart-cake.jpg",
            description: "Vibrant red heart cake with August 2024 calendar design and white pearl decorations",
            inStock: true,
            featured: false,
          },
          {
            id: "heart-4",
            name: "Pink 21st Birthday Heart Cake",
            price: "R240",
            image: "/pink-21st-birthday-heart-cake.jpg",
            description: "Romantic pink heart cake with elaborate buttercream rosettes and ribbon bow decorations",
            inStock: true,
            featured: false,
          },
          {
            id: "heart-5",
            name: "White February Calendar Heart Cake",
            price: "R210",
            image: "/white-february-calendar-heart-cake.jpg",
            description: "Minimalist white heart cake with February calendar design in elegant black script lettering",
            inStock: true,
            featured: false,
          },
        ],
      },
      "car-lovers-cakes": {
        name: "Car Lovers Cakes",
        items: [
          {
            id: "car-1",
            name: "BMW Birthday Celebration Cake",
            price: "R280",
            image: "/bmw-birthday-cake.jpg",
            description:
              "White cylindrical cake with blue drip effect, BMW logo, racing checkered flag elements, and tire decorations",
            inStock: true,
            featured: true,
          },
          {
            id: "car-2",
            name: "BMW Luxury Sports Cake",
            price: "R300",
            image: "/bmw-luxury-sports-cake.jpg",
            description:
              "Sophisticated gray cake with BMW logo, black car silhouettes, silver decorations, and metallic finish",
            inStock: true,
            featured: false,
          },
          {
            id: "car-3",
            name: "Mercedes-Benz Elegant Cake",
            price: "R290",
            image: "/mercedes-benz-elegant-cake.jpg",
            description:
              "Upscale beige cake featuring Mercedes-Benz logo, white car model, silver decorations, and luxury styling",
            inStock: true,
            featured: false,
          },
        ],
      },
      "fairyland-cakes": {
        name: "Fairyland Cakes",
        items: [
          {
            id: "fairy-1",
            name: "Fairy Castle Cake",
            price: "R280",
            image: "/fairy-castle-cake.jpg",
            description: "Enchanted castle with towers and magical details",
            inStock: true,
            featured: true,
          },
          {
            id: "fairy-2",
            name: "Unicorn Dreams Cake",
            price: "R250",
            image: "/unicorn-dreams-cake.jpg",
            description: "Magical unicorn with rainbow mane and horn",
            inStock: true,
            featured: false,
          },
          {
            id: "fairy-3",
            name: "Fairy Garden Cake",
            price: "R220",
            image: "/fairy-garden-cake.jpg",
            description: "Whimsical garden with fairy houses and flowers",
            inStock: true,
            featured: false,
          },
          {
            id: "fairy-4",
            name: "Magic Wand Cake",
            price: "R190",
            image: "/magic-wand-cake.jpg",
            description: "Sparkling wand with stars and glitter",
            inStock: true,
            featured: false,
          },
          {
            id: "fairy-5",
            name: "Enchanted Forest Cake",
            price: "R300",
            image: "/enchanted-forest-cake.jpg",
            description: "Mystical forest scene with fairy lights and creatures",
            inStock: true,
            featured: false,
          },
        ],
      },
      "mickey-mouse-cakes": {
        name: "Mickey Mouse Cakes",
        items: [
          {
            id: "mickey-1",
            name: "Classic Mickey Head Cake",
            price: "R180",
            image: "/classic-mickey-head-cake.jpg",
            description: "Traditional Mickey Mouse head shape with chocolate ears",
            inStock: true,
            featured: false,
          },
          {
            id: "mickey-2",
            name: "Mickey Clubhouse Cake",
            price: "R220",
            image: "/mickey-clubhouse-cake.jpg",
            description: "Colorful clubhouse design with Mickey and friends",
            inStock: true,
            featured: true,
          },
          {
            id: "mickey-3",
            name: "3D Mickey Cake",
            price: "R280",
            image: "/3d-mickey-cake.jpg",
            description: "Three-dimensional Mickey Mouse figure cake",
            inStock: true,
            featured: false,
          },
        ],
      },
      "wedding-cakes": {
        name: "Wedding Cakes",
        items: [
          {
            id: "wedding-1",
            name: "Classic White Wedding Cake",
            price: "R800",
            image: "/elegant-white-wedding-cake-with-roses.jpg",
            description: "Elegant multi-tier white wedding cake with buttercream roses and pearl details",
            inStock: true,
            featured: true,
          },
          {
            id: "wedding-2",
            name: "Rustic Wedding Cake",
            price: "R750",
            image: "/rustic-wedding-cake-with-flowers.jpg",
            description: "Beautiful rustic style cake with fresh flowers and natural decorations",
            inStock: true,
            featured: false,
          },
        ],
      },
      "milestone-cakes": {
        name: "Milestone Cakes",
        items: [
          {
            id: "milestone-1",
            name: "50th Anniversary Cake",
            price: "R400",
            image: "/golden-50th-anniversary-cake.jpg",
            description: "Golden anniversary celebration cake with elegant gold decorations",
            inStock: true,
            featured: true,
          },
          {
            id: "milestone-2",
            name: "Graduation Cake",
            price: "R350",
            image: "/graduation-cap-cake.jpg",
            description: "Graduation themed cake with cap and diploma decorations",
            inStock: true,
            featured: false,
          },
        ],
      },
      "baby-shower-cakes": {
        name: "Baby Shower Cakes",
        items: [
          {
            id: "baby-1",
            name: "Pink Baby Shower Cake",
            price: "R300",
            image: "/pink-baby-shower-cake-with-booties.jpg",
            description: "Adorable pink themed baby shower cake with baby booties and rattles",
            inStock: true,
            featured: true,
          },
          {
            id: "baby-2",
            name: "Blue Baby Shower Cake",
            price: "R300",
            image: "/blue-baby-shower-cake-with-teddy-bear.jpg",
            description: "Sweet blue themed baby shower cake with teddy bear decorations",
            inStock: true,
            featured: false,
          },
        ],
      },
      "novelty-themed-cakes": {
        name: "Novelty Themed Cakes",
        items: [
          {
            id: "novelty-1",
            name: "Superhero Cake",
            price: "R320",
            image: "/superhero-themed-cake.jpg",
            description: "Action-packed superhero themed cake with cape and logo decorations",
            inStock: true,
            featured: true,
          },
          {
            id: "novelty-2",
            name: "Sports Theme Cake",
            price: "R280",
            image: "/sports-themed-cake-with-soccer-ball.jpg",
            description: "Sports enthusiast cake with soccer ball and field decorations",
            inStock: true,
            featured: false,
          },
        ],
      },
      "corporate-custom-cakes": {
        name: "Corporate & Custom Cakes",
        items: [
          {
            id: "corporate-1",
            name: "Corporate Logo Cake",
            price: "R500",
            image: "/professional-corporate-logo-cake.jpg",
            description: "Professional corporate cake with custom logo and branding elements",
            inStock: true,
            featured: true,
          },
          {
            id: "corporate-2",
            name: "Custom Design Cake",
            price: "R600",
            image: "/custom-designed-celebration-cake.jpg",
            description: "Fully customized cake designed to your specific requirements and theme",
            inStock: true,
            featured: false,
          },
        ],
      },
    },
  },
  "regular-treats": {
    name: "Regular Treats & Desserts",
    subcategories: {
      "roman-cream": {
        name: "Roman Cream",
        items: [
          {
            id: "roman-1",
            name: "Classic Roman Cream",
            price: "R45",
            image: "/roman-cream-dessert.jpg",
            description: "Traditional creamy delight",
            inStock: true,
            featured: false,
          },
          {
            id: "roman-2",
            name: "Chocolate Roman Cream",
            price: "R50",
            image: "/roman-cream-chocolate.jpg",
            description: "Rich chocolate variation",
            inStock: true,
            featured: false,
          },
          {
            id: "roman-3",
            name: "Strawberry Roman Cream",
            price: "R48",
            image: "/roman-cream-strawberry.jpg",
            description: "Fresh strawberry flavor",
            inStock: true,
            featured: false,
          },
        ],
      },
      "swiss-rolls": {
        name: "Swiss Rolls",
        items: [
          {
            id: "swiss-1",
            name: "Classic Swiss Roll",
            price: "R35",
            image: "/swiss-roll-classic.jpg",
            description: "Traditional creamy filling",
            inStock: true,
            featured: false,
          },
          {
            id: "swiss-2",
            name: "Chocolate Swiss Roll",
            price: "R40",
            image: "/swiss-roll-chocolate.jpg",
            description: "Rich chocolate indulgence",
            inStock: true,
            featured: true,
          },
          {
            id: "swiss-3",
            name: "Strawberry Swiss Roll",
            price: "R38",
            image: "/swiss-roll-strawberry.jpg",
            description: "Fresh strawberry sensation",
            inStock: true,
            featured: false,
          },
        ],
      },
      cupcakes: {
        name: "Cupcakes",
        items: [
          {
            id: "cupcake-1",
            name: "Classic Cupcake",
            price: "R25",
            image: "/cupcakes-vanilla-sprinkles.jpg",
            description: "Traditional creamy delight",
            inStock: true,
            featured: false,
          },
          {
            id: "cupcake-2",
            name: "Chocolate Cupcake",
            price: "R30",
            image: "/cupcakes-chocolate.jpg",
            description: "Rich chocolate variation",
            inStock: true,
            featured: true,
          },
          {
            id: "cupcake-3",
            name: "Vanilla Cupcake",
            price: "R25",
            image: "/cupcakes-vanilla-chocolate.jpg",
            description: "Pure vanilla essence",
            inStock: true,
            featured: false,
          },
        ],
      },
    },
  },
}

const initialOrders = [
  {
    id: "ORD-2024-001",
    customerName: "Sarah Johnson",
    email: "sarah@email.com",
    phone: "078 123 4567",
    cakeName: "Princess Castle Cake",
    status: "confirmed",
    paymentStatus: "paid", // Added payment status
    orderDate: "2024-01-15",
    deliveryDate: "2024-01-18",
    total: "R850",
    notes: "Pink and purple theme, gluten-free",
  },
  {
    id: "ORD-2024-002",
    customerName: "Mike Rodriguez",
    email: "mike@email.com",
    phone: "078 987 6543",
    cakeName: "Superhero Adventure Cake",
    status: "out-for-delivery",
    paymentStatus: "paid", // Added payment status
    orderDate: "2024-01-16",
    deliveryDate: "2024-01-19",
    total: "R950",
    notes: "Batman theme, chocolate flavor",
  },
  {
    id: "ORD-2024-003",
    customerName: "Lisa Chen",
    email: "lisa@email.com",
    phone: "078 555 1234",
    cakeName: "Wedding Elegance Cake",
    status: "pending",
    paymentStatus: "unpaid", // Added payment status
    orderDate: "2024-01-17",
    deliveryDate: "2024-01-25",
    total: "R2500",
    notes: "3-tier, white roses, vanilla flavor",
  },
]

const statusOptions = [
  { key: "preparing", label: "Baking in Progress", color: "bg-orange-100 text-orange-800", icon: ChefHat },
  { key: "ready-to-collect", label: "Ready for Pickup", color: "bg-purple-100 text-purple-800", icon: Package },
  { key: "out-for-delivery", label: "Out for Delivery", color: "bg-indigo-100 text-indigo-800", icon: Truck },
  { key: "delivered", label: "Delivered", color: "bg-green-100 text-green-800", icon: CheckCircle },
]

export default function AdminPanel() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loginForm, setLoginForm] = useState({ username: "", password: "" })
  const [loginError, setLoginError] = useState("")

  const [orders, setOrders] = useState(initialOrders)
  const [editingOrder, setEditingOrder] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [orderFilter, setOrderFilter] = useState("all") // all, paid, completed, pending

  const [menuData, setMenuData] = useState(completeMenuStructure)
  const [menuSearchTerm, setMenuSearchTerm] = useState("")
  const [selectedParentCategory, setSelectedParentCategory] = useState("all")
  const [selectedSubcategory, setSelectedSubcategory] = useState("all")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [editingItem, setEditingItem] = useState<string | null>(null)
  const [showOutOfStock, setShowOutOfStock] = useState(true)
  const [newItem, setNewItem] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
    parentCategory: "",
    subcategory: "",
  })

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (loginForm.username === ADMIN_CREDENTIALS.username && loginForm.password === ADMIN_CREDENTIALS.password) {
      setIsAuthenticated(true)
      setLoginError("")
    } else {
      setLoginError("Invalid username or password")
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setLoginForm({ username: "", password: "" })
    setLoginError("")
  }

  if (!isAuthenticated) {
    return (
      <div className="bg-gradient-to-br from-stanley-cream to-stanley-pink min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md border-stanley-brown shadow-lg">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-stanley-pink to-stanley-yellow rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-stanley-pink via-stanley-orange to-stanley-yellow bg-clip-text text-transparent">
              Admin Login
            </CardTitle>
            <p className="text-stanley-brown">Enter your credentials to access the admin dashboard</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="text-sm font-medium text-stanley-brown mb-2 block">Username</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-stanley-brown" />
                  <Input
                    type="text"
                    placeholder="Enter username"
                    value={loginForm.username}
                    onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
                    className="pl-10 border-stanley-brown focus:border-stanley-pink"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-stanley-brown mb-2 block">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-stanley-brown" />
                  <Input
                    type="password"
                    placeholder="Enter password"
                    value={loginForm.password}
                    onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                    className="pl-10 border-stanley-brown focus:border-stanley-pink"
                    required
                  />
                </div>
              </div>
              {loginError && (
                <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg border border-red-200">{loginError}</div>
              )}
              <Button type="submit" className="stanley-button w-full">
                Login to Admin Panel
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    )
  }

  const updateOrderStatus = (orderId: string, newStatus: string) => {
    setOrders(orders.map((order) => (order.id === orderId ? { ...order, status: newStatus } : order)))
    setEditingOrder(null)
  }

  const updatePaymentStatus = (orderId: string, newPaymentStatus: string) => {
    setOrders(orders.map((order) => (order.id === orderId ? { ...order, paymentStatus: newPaymentStatus } : order)))
  }

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.cakeName.toLowerCase().includes(searchTerm.toLowerCase())

    if (orderFilter === "paid") {
      return matchesSearch && order.paymentStatus === "paid"
    } else if (orderFilter === "completed") {
      return (
        matchesSearch &&
        order.paymentStatus === "paid" &&
        (order.status === "delivered" || order.status === "collected")
      )
    } else if (orderFilter === "pending") {
      return matchesSearch && (order.paymentStatus === "unpaid" || order.status === "pending")
    }
    return matchesSearch
  })

  const getStatusInfo = (status: string) => {
    return statusOptions.find((option) => option.key === status) || statusOptions[0]
  }

  const getStatusCounts = () => {
    const totalOrders = orders.length
    const paidOrders = orders.filter((order) => order.paymentStatus === "paid").length
    const completedOrders = orders.filter(
      (order) => order.paymentStatus === "paid" && (order.status === "delivered" || order.status === "collected"),
    ).length
    const pendingOrders = orders.filter(
      (order) => order.paymentStatus === "unpaid" || order.status === "pending",
    ).length

    return [
      { key: "total", label: "Total Orders", count: totalOrders, color: "bg-blue-100 text-blue-800", icon: Package },
      { key: "paid", label: "Paid Orders", count: paidOrders, color: "bg-green-100 text-green-800", icon: CreditCard },
      {
        key: "completed",
        label: "Completed",
        count: completedOrders,
        color: "bg-purple-100 text-purple-800",
        icon: CheckCircle,
      },
      { key: "pending", label: "Pending", count: pendingOrders, color: "bg-yellow-100 text-yellow-800", icon: Clock },
    ]
  }

  const getAllMenuItems = () => {
    const allItems: any[] = []
    Object.entries(menuData).forEach(([parentKey, parentCategory]) => {
      Object.entries(parentCategory.subcategories).forEach(([subKey, subcategory]) => {
        subcategory.items.forEach((item: any) => {
          allItems.push({
            ...item,
            parentCategory: parentKey,
            parentCategoryName: parentCategory.name,
            subcategory: subKey,
            subcategoryName: subcategory.name,
          })
        })
      })
    })
    return allItems
  }

  const getFilteredMenuItems = () => {
    let items = getAllMenuItems()

    // Filter by search term
    if (menuSearchTerm) {
      items = items.filter(
        (item) =>
          item.name.toLowerCase().includes(menuSearchTerm.toLowerCase()) ||
          item.description.toLowerCase().includes(menuSearchTerm.toLowerCase()) ||
          item.subcategoryName.toLowerCase().includes(menuSearchTerm.toLowerCase()),
      )
    }

    // Filter by parent category
    if (selectedParentCategory !== "all") {
      items = items.filter((item) => item.parentCategory === selectedParentCategory)
    }

    // Filter by subcategory
    if (selectedSubcategory !== "all") {
      items = items.filter((item) => item.subcategory === selectedSubcategory)
    }

    // Filter by stock status
    if (!showOutOfStock) {
      items = items.filter((item) => item.inStock)
    }

    return items
  }

  const updateMenuItem = (itemId: string, updates: any) => {
    const newMenuData = { ...menuData }
    Object.keys(newMenuData).forEach((parentKey) => {
      Object.keys(newMenuData[parentKey].subcategories).forEach((subKey) => {
        const itemIndex = newMenuData[parentKey].subcategories[subKey].items.findIndex(
          (item: any) => item.id === itemId,
        )
        if (itemIndex !== -1) {
          newMenuData[parentKey].subcategories[subKey].items[itemIndex] = {
            ...newMenuData[parentKey].subcategories[subKey].items[itemIndex],
            ...updates,
          }
        }
      })
    })
    setMenuData(newMenuData)
  }

  const deleteMenuItem = (itemId: string) => {
    const newMenuData = { ...menuData }
    Object.keys(newMenuData).forEach((parentKey) => {
      Object.keys(newMenuData[parentKey].subcategories).forEach((subKey) => {
        newMenuData[parentKey].subcategories[subKey].items = newMenuData[parentKey].subcategories[subKey].items.filter(
          (item: any) => item.id !== itemId,
        )
      })
    })
    setMenuData(newMenuData)
  }

  const addNewMenuItem = () => {
    if (newItem.name && newItem.price && newItem.parentCategory && newItem.subcategory) {
      const newItemWithId = {
        id: `item-${Date.now()}`,
        name: newItem.name,
        price: newItem.price,
        description: newItem.description,
        image:
          newItem.image ||
          `/placeholder.svg?height=200&width=200&query=${newItem.name.replace(/\s+/g, "+").toLowerCase()}`,
        inStock: true,
        featured: false,
      }

      const newMenuData = { ...menuData }
      newMenuData[newItem.parentCategory].subcategories[newItem.subcategory].items.push(newItemWithId)
      setMenuData(newMenuData)
      setNewItem({ name: "", price: "", description: "", image: "", parentCategory: "", subcategory: "" })
    }
  }

  const getMenuStats = () => {
    const allItems = getAllMenuItems()
    const totalItems = allItems.length
    const inStockItems = allItems.filter((item) => item.inStock).length
    const featuredItems = allItems.filter((item) => item.featured).length
    const outOfStockItems = totalItems - inStockItems

    return { totalItems, inStockItems, featuredItems, outOfStockItems }
  }

  const menuStats = getMenuStats()

  return (
    <div className="bg-gradient-to-br from-stanley-cream to-stanley-pink min-h-screen scale-95 sm:scale-100 transition-transform duration-300">
      {/* Header */}
      <div className="pt-4 pb-8">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="flex items-center justify-between mb-4">
              <div className="flex-1">
                <h1 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-stanley-pink via-stanley-orange to-stanley-yellow bg-clip-text text-transparent font-serif animate-slideInFromLeft">
                  Stanley's Bakery Admin
                </h1>
              </div>
              <Button
                onClick={handleLogout}
                variant="outline"
                className="border-stanley-pink text-stanley-pink hover:bg-stanley-pink hover:text-white bg-transparent"
              >
                <X className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
            <p className="text-stanley-brown max-w-2xl mx-auto">
              Manage orders and complete cake menu from one central location
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <Tabs defaultValue="orders" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="orders">Order Management</TabsTrigger>
            <TabsTrigger value="menu">Complete Menu Management</TabsTrigger>
          </TabsList>

          <TabsContent value="orders">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {getStatusCounts().map((status) => {
                const IconComponent = status.icon
                return (
                  <Card
                    key={status.key}
                    className={`border-stanley-brown cursor-pointer transition-all hover:shadow-md ${
                      orderFilter === status.key ? "ring-2 ring-stanley-pink bg-stanley-pink/10" : ""
                    }`}
                    onClick={() => setOrderFilter(status.key === "total" ? "all" : status.key)}
                  >
                    <CardContent className="p-4 text-center">
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2 ${status.color}`}
                      >
                        <IconComponent className="h-6 w-6" />
                      </div>
                      <p className="text-2xl font-bold text-stanley-brown">{status.count}</p>
                      <p className="text-xs text-stanley-brown/70">{status.label}</p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              <Button
                variant={orderFilter === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setOrderFilter("all")}
                className={
                  orderFilter === "all"
                    ? "stanley-button"
                    : "border-stanley-pink text-stanley-pink hover:bg-stanley-pink/10"
                }
              >
                All Orders
              </Button>
              <Button
                variant={orderFilter === "paid" ? "default" : "outline"}
                size="sm"
                onClick={() => setOrderFilter("paid")}
                className={
                  orderFilter === "paid"
                    ? "bg-green-500 hover:bg-green-600"
                    : "border-green-300 text-green-700 hover:bg-green-50"
                }
              >
                <CreditCard className="h-4 w-4 mr-1" />
                Paid Orders
              </Button>
              <Button
                variant={orderFilter === "completed" ? "default" : "outline"}
                size="sm"
                onClick={() => setOrderFilter("completed")}
                className={
                  orderFilter === "completed"
                    ? "bg-purple-500 hover:bg-purple-600"
                    : "border-purple-300 text-purple-700 hover:bg-purple-50"
                }
              >
                <CheckCircle className="h-4 w-4 mr-1" />
                Completed Orders
              </Button>
              <Button
                variant={orderFilter === "pending" ? "default" : "outline"}
                size="sm"
                onClick={() => setOrderFilter("pending")}
                className={
                  orderFilter === "pending"
                    ? "bg-yellow-500 hover:bg-yellow-600"
                    : "border-yellow-300 text-yellow-700 hover:bg-yellow-50"
                }
              >
                <Clock className="h-4 w-4 mr-1" />
                Pending Orders
              </Button>
            </div>

            {/* Search */}
            <div className="mb-6">
              <Input
                placeholder="Search orders by Order Number, customer name, or cake name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-md border-stanley-brown focus:border-stanley-yellow"
              />
            </div>

            {orderFilter !== "all" && (
              <div className="mb-4 p-3 bg-stanley-pink/10 border border-stanley-pink rounded-lg">
                <p className="text-stanley-brown text-sm font-medium">
                  {orderFilter === "paid" && "Showing all orders that have been paid for"}
                  {orderFilter === "completed" && "Showing completed orders (paid and delivered/collected)"}
                  {orderFilter === "pending" && "Showing pending orders (unpaid or awaiting confirmation)"}
                  {filteredOrders.length > 0 && ` - ${filteredOrders.length} order(s) found`}
                </p>
              </div>
            )}

            {/* Orders Table */}
            <div className="space-y-4">
              {filteredOrders.map((order) => {
                const statusInfo = getStatusInfo(order.status)
                const IconComponent = statusInfo.icon

                return (
                  <Card key={order.id} className="border-stanley-brown hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-xl text-stanley-brown font-bold">{order.id}</CardTitle>
                          <p className="text-sm text-stanley-brown/70 mt-1">Order Tracking Number</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge
                            variant={order.paymentStatus === "paid" ? "default" : "destructive"}
                            className={
                              order.paymentStatus === "paid"
                                ? "bg-green-500 hover:bg-green-600"
                                : "bg-red-500 hover:bg-red-600"
                            }
                          >
                            {order.paymentStatus === "paid" ? (
                              <CreditCard className="h-3 w-3 mr-1" />
                            ) : (
                              <XCircle className="h-3 w-3 mr-1" />
                            )}
                            {order.paymentStatus === "paid" ? "Paid" : "Unpaid"}
                          </Badge>
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-medium flex items-center ${statusInfo.color}`}
                          >
                            <IconComponent className="h-4 w-4 mr-1" />
                            {statusInfo.label}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setEditingOrder(editingOrder === order.id ? null : order.id)}
                            className="text-stanley-brown hover:text-stanley-brown"
                          >
                            {editingOrder === order.id ? <X className="h-4 w-4" /> : <Edit className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-stanley-brown/70">Customer</p>
                          <p className="font-medium text-stanley-brown">{order.customerName}</p>
                          <p className="text-sm text-stanley-brown/80">{order.email}</p>
                          <p className="text-sm text-stanley-brown/80">{order.phone}</p>
                        </div>
                        <div>
                          <p className="text-sm text-stanley-brown/70">Cake</p>
                          <p className="font-medium text-stanley-brown">{order.cakeName}</p>
                          <p className="text-sm text-stanley-brown/80">Total: {order.total}</p>
                        </div>
                        <div>
                          <p className="text-sm text-stanley-brown/70">Dates</p>
                          <p className="text-sm text-stanley-brown/80">Ordered: {order.orderDate}</p>
                          <p className="text-sm text-stanley-brown/80">Delivery: {order.deliveryDate}</p>
                        </div>
                      </div>

                      {order.notes && (
                        <div className="mb-4">
                          <p className="text-sm text-stanley-brown/70">Notes</p>
                          <p className="text-sm text-stanley-brown/80 bg-stanley-cream p-2 rounded">{order.notes}</p>
                        </div>
                      )}

                      {/* Status Update Controls */}
                      {editingOrder === order.id && (
                        <div className="border-t border-stanley-brown/20 pt-4 space-y-4">
                          <div>
                            <p className="text-sm font-medium text-stanley-brown mb-3">Update Payment Status:</p>
                            <div className="flex gap-2">
                              <Button
                                variant={order.paymentStatus === "paid" ? "default" : "outline"}
                                size="sm"
                                onClick={() => updatePaymentStatus(order.id, "paid")}
                                className={`${
                                  order.paymentStatus === "paid"
                                    ? "bg-green-500 hover:bg-green-600 text-white"
                                    : "border-green-300 text-green-700 hover:bg-green-50"
                                }`}
                              >
                                <CreditCard className="h-4 w-4 mr-1" />
                                Paid
                              </Button>
                              <Button
                                variant={order.paymentStatus === "unpaid" ? "default" : "outline"}
                                size="sm"
                                onClick={() => updatePaymentStatus(order.id, "unpaid")}
                                className={`${
                                  order.paymentStatus === "unpaid"
                                    ? "bg-red-500 hover:bg-red-600"
                                    : "border-red-300 text-red-700 hover:bg-red-50"
                                }`}
                              >
                                <XCircle className="h-4 w-4 mr-1" />
                                Unpaid
                              </Button>
                            </div>
                          </div>

                          <div className="bg-stanley-pink/10 border border-stanley-pink rounded-lg p-4">
                            <p className="text-sm font-medium text-stanley-brown mb-3 flex items-center">
                              <Package className="h-4 w-4 mr-2" />
                              Update Order Status (Customer Tracking):
                            </p>
                            <p className="text-xs text-stanley-brown/70 mb-3">
                              Update the status that customers see when they track order: <strong>{order.id}</strong>
                            </p>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                              {statusOptions.map((status) => {
                                const StatusIcon = status.icon
                                return (
                                  <Button
                                    key={status.key}
                                    variant={order.status === status.key ? "default" : "outline"}
                                    size="sm"
                                    onClick={() => updateOrderStatus(order.id, status.key)}
                                    className={`${
                                      order.status === status.key
                                        ? "stanley-button"
                                        : "border-stanley-pink text-stanley-pink hover:bg-stanley-pink/10"
                                    }`}
                                  >
                                    <StatusIcon className="h-4 w-4 mr-1" />
                                    {status.label}
                                  </Button>
                                )
                              })}
                            </div>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            {filteredOrders.length === 0 && (
              <div className="text-center py-12">
                <Package className="h-16 w-16 text-stanley-brown/30 mx-auto mb-4" />
                <p className="text-stanley-brown text-lg">
                  {orderFilter === "all"
                    ? "No orders found"
                    : orderFilter === "paid"
                      ? "No paid orders found"
                      : orderFilter === "completed"
                        ? "No completed orders found"
                        : "No pending orders found"}
                </p>
                <p className="text-stanley-brown/70">
                  {searchTerm ? "Try adjusting your search criteria" : "Orders will appear here when available"}
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="menu">
            {/* Menu Statistics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <Card className="border-stanley-brown">
                <CardContent className="p-4 text-center">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-2">
                    <Package className="h-6 w-6 text-blue-600" />
                  </div>
                  <p className="text-2xl font-bold text-stanley-brown">{menuStats.totalItems}</p>
                  <p className="text-xs text-stanley-brown/70">Total Items</p>
                </CardContent>
              </Card>
              <Card className="border-stanley-brown">
                <CardContent className="p-4 text-center">
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-2">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <p className="text-2xl font-bold text-stanley-brown">{menuStats.inStockItems}</p>
                  <p className="text-xs text-stanley-brown/70">In Stock</p>
                </CardContent>
              </Card>
              <Card className="border-stanley-brown">
                <CardContent className="p-4 text-center">
                  <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center mx-auto mb-2">
                    <Star className="h-6 w-6 text-yellow-600" />
                  </div>
                  <p className="text-2xl font-bold text-stanley-brown">{menuStats.featuredItems}</p>
                  <p className="text-xs text-stanley-brown/70">Featured</p>
                </CardContent>
              </Card>
              <Card className="border-stanley-brown">
                <CardContent className="p-4 text-center">
                  <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-2">
                    <XCircle className="h-6 w-6 text-red-600" />
                  </div>
                  <p className="text-2xl font-bold text-stanley-brown">{menuStats.outOfStockItems}</p>
                  <p className="text-xs text-stanley-brown/70">Out of Stock</p>
                </CardContent>
              </Card>
            </div>

            {/* Add New Item Section */}
            <Card className="border-stanley-brown mb-8">
              <CardHeader>
                <CardTitle className="text-stanley-brown flex items-center">
                  <Plus className="h-5 w-5 mr-2" />
                  Add New Menu Item
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                  <Input
                    placeholder="Item Name"
                    value={newItem.name}
                    onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                    className="border-stanley-brown"
                  />
                  <Input
                    placeholder="Price (e.g., R150)"
                    value={newItem.price}
                    onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
                    className="border-stanley-brown"
                  />
                  <Input
                    placeholder="Image URL (optional)"
                    value={newItem.image}
                    onChange={(e) => setNewItem({ ...newItem, image: e.target.value })}
                    className="border-stanley-brown"
                  />
                  <Select
                    value={newItem.parentCategory}
                    onValueChange={(value) => setNewItem({ ...newItem, parentCategory: value, subcategory: "" })}
                  >
                    <SelectTrigger className="border-stanley-brown">
                      <SelectValue placeholder="Select Parent Category" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(menuData).map(([key, category]) => (
                        <SelectItem key={key} value={key}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select
                    value={newItem.subcategory}
                    onValueChange={(value) => setNewItem({ ...newItem, subcategory: value })}
                    disabled={!newItem.parentCategory}
                  >
                    <SelectTrigger className="border-stanley-brown">
                      <SelectValue placeholder="Select Subcategory" />
                    </SelectTrigger>
                    <SelectContent>
                      {newItem.parentCategory &&
                        Object.entries(menuData[newItem.parentCategory].subcategories).map(([key, subcategory]) => (
                          <SelectItem key={key} value={key}>
                            {subcategory.name}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
                <Textarea
                  placeholder="Item Description"
                  value={newItem.description}
                  onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                  className="border-stanley-brown mb-4"
                />
                <Button onClick={addNewMenuItem} className="stanley-button">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Menu Item
                </Button>
              </CardContent>
            </Card>

            {/* Filters and Search */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-stanley-brown/50" />
                  <Input
                    placeholder="Search menu items..."
                    value={menuSearchTerm}
                    onChange={(e) => setMenuSearchTerm(e.target.value)}
                    className="pl-10 border-stanley-brown"
                  />
                </div>
              </div>
              <Select value={selectedParentCategory} onValueChange={setSelectedParentCategory}>
                <SelectTrigger className="w-full md:w-48 border-stanley-brown">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {Object.entries(menuData).map(([key, category]) => (
                    <SelectItem key={key} value={key}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedSubcategory} onValueChange={setSelectedSubcategory}>
                <SelectTrigger className="w-full md:w-48 border-stanley-brown">
                  <SelectValue placeholder="All Subcategories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Subcategories</SelectItem>
                  {selectedParentCategory !== "all" &&
                    menuData[selectedParentCategory] &&
                    Object.entries(menuData[selectedParentCategory].subcategories).map(([key, subcategory]) => (
                      <SelectItem key={key} value={key}>
                        {subcategory.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
              <div className="flex gap-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className={viewMode === "grid" ? "stanley-button" : "border-stanley-brown text-stanley-brown"}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className={viewMode === "list" ? "stanley-button" : "border-stanley-brown text-stanley-brown"}
                >
                  <List className="h-4 w-4" />
                </Button>
                <Button
                  variant={showOutOfStock ? "default" : "outline"}
                  size="sm"
                  onClick={() => setShowOutOfStock(!showOutOfStock)}
                  className={showOutOfStock ? "stanley-button" : "border-stanley-brown text-stanley-brown"}
                >
                  {showOutOfStock ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            {/* Menu Items Display */}
            <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
              {getFilteredMenuItems().map((item) => (
                <Card
                  key={item.id}
                  className={`border-stanley-brown hover:shadow-lg transition-shadow ${!item.inStock ? "opacity-60" : ""}`}
                >
                  {viewMode === "grid" ? (
                    <>
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <CardTitle className="text-lg text-stanley-brown">{item.name}</CardTitle>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="outline" className="text-xs border-stanley-brown text-stanley-brown">
                                {item.subcategoryName}
                              </Badge>
                              {item.featured && (
                                <Badge className="text-xs bg-stanley-yellow text-stanley-brown">
                                  <Star className="h-3 w-3 mr-1" />
                                  Featured
                                </Badge>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => updateMenuItem(item.id, { featured: !item.featured })}
                              className={`text-stanley-brown hover:text-stanley-brown ${item.featured ? "text-stanley-yellow" : ""}`}
                            >
                              <Star className={`h-4 w-4 ${item.featured ? "fill-current" : ""}`} />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setEditingItem(editingItem === item.id ? null : item.id)}
                              className="text-stanley-brown hover:text-stanley-brown"
                            >
                              {editingItem === item.id ? <X className="h-4 w-4" /> : <Edit className="h-4 w-4" />}
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => deleteMenuItem(item.id)}
                              className="text-red-600 hover:text-red-800"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardHeader>

                      <CardContent>
                        <div className="mb-4">
                          <img
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            className="w-full h-48 object-cover rounded-lg"
                          />
                        </div>

                        {editingItem === item.id ? (
                          <div className="space-y-3">
                            <Input
                              value={item.name}
                              onChange={(e) => updateMenuItem(item.id, { name: e.target.value })}
                              className="border-stanley-brown"
                              placeholder="Item name"
                            />
                            <Input
                              value={item.price}
                              onChange={(e) => updateMenuItem(item.id, { price: e.target.value })}
                              className="border-stanley-brown"
                              placeholder="Price"
                            />
                            <Input
                              value={item.image}
                              onChange={(e) => updateMenuItem(item.id, { image: e.target.value })}
                              placeholder="Image URL"
                              className="border-stanley-brown"
                            />
                            <Textarea
                              value={item.description}
                              onChange={(e) => updateMenuItem(item.id, { description: e.target.value })}
                              className="border-stanley-brown"
                              placeholder="Description"
                            />
                            <div className="flex gap-2">
                              <Button
                                onClick={() => updateMenuItem(item.id, { inStock: !item.inStock })}
                                variant={item.inStock ? "default" : "outline"}
                                size="sm"
                                className={
                                  item.inStock ? "bg-green-500 hover:bg-green-600" : "border-red-300 text-red-700"
                                }
                              >
                                {item.inStock ? "In Stock" : "Out of Stock"}
                              </Button>
                              <Button onClick={() => setEditingItem(null)} className="stanley-button flex-1">
                                <Save className="h-4 w-4 mr-1" />
                                Save
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <div>
                            <p className="text-2xl font-bold text-stanley-brown mb-2">{item.price}</p>
                            <p className="text-sm text-stanley-brown/80 mb-3">{item.description}</p>
                            <div className="flex items-center justify-between">
                              <Badge
                                variant={item.inStock ? "default" : "destructive"}
                                className={item.inStock ? "bg-green-500" : "bg-red-500"}
                              >
                                {item.inStock ? "In Stock" : "Out of Stock"}
                              </Badge>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => updateMenuItem(item.id, { inStock: !item.inStock })}
                                className="border-stanley-brown text-stanley-brown hover:bg-stanley-brown hover:text-white"
                              >
                                Toggle Stock
                              </Button>
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </>
                  ) : (
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-stanley-brown">{item.name}</h3>
                            {item.featured && (
                              <Badge className="text-xs bg-stanley-yellow text-stanley-brown">
                                <Star className="h-3 w-3 mr-1" />
                                Featured
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-stanley-brown/80 mb-1">{item.description}</p>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-xs border-stanley-brown text-stanley-brown">
                              {item.subcategoryName}
                            </Badge>
                            <Badge
                              variant={item.inStock ? "default" : "destructive"}
                              className={`text-xs ${item.inStock ? "bg-green-500" : "bg-red-500"}`}
                            >
                              {item.inStock ? "In Stock" : "Out of Stock"}
                            </Badge>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-xl font-bold text-stanley-brown mb-2">{item.price}</p>
                          <div className="flex items-center space-x-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => updateMenuItem(item.id, { featured: !item.featured })}
                              className={`text-stanley-brown hover:text-stanley-brown ${item.featured ? "text-stanley-yellow" : ""}`}
                            >
                              <Star className={`h-4 w-4 ${item.featured ? "fill-current" : ""}`} />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setEditingItem(editingItem === item.id ? null : item.id)}
                              className="text-stanley-brown hover:text-stanley-brown"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => deleteMenuItem(item.id)}
                              className="text-red-600 hover:text-red-800"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  )}
                </Card>
              ))}
            </div>

            {getFilteredMenuItems().length === 0 && (
              <div className="text-center py-12">
                <ImageIcon className="h-16 w-16 text-stanley-brown/30 mx-auto mb-4" />
                <p className="text-stanley-brown text-lg">No menu items found</p>
                <p className="text-stanley-brown/70">
                  {menuSearchTerm || selectedParentCategory !== "all" || selectedSubcategory !== "all"
                    ? "Try adjusting your search criteria or filters"
                    : "Add your first menu item to get started"}
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      <style jsx>{`
        .animate-slideInFromLeft {
          animation: slideInFromLeft 1s ease-in-out;
        }
        @keyframes slideInFromLeft {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  )
}
