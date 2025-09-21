"use client"

import type React from "react"
import { ChefHat } from "lucide-react" // Added ChefHat import

import { useState, useEffect } from "react"
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
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
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
        items: [],
      },
      "heart-shaped-cakes": {
        name: "Heart Shaped Cakes",
        items: [],
      },
      "car-lovers-cakes": {
        name: "Car Lovers Cakes",
        items: [],
      },
      "fairyland-cakes": {
        name: "Fairyland Cakes",
        items: [],
      },
      "mickey-mouse-cakes": {
        name: "Mickey Mouse Cakes",
        items: [],
      },
      "wedding-cakes": {
        name: "Wedding Cakes",
        items: [],
      },
      "milestone-cakes": {
        name: "Milestone Cakes",
        items: [],
      },
      "baby-shower-cakes": {
        name: "Baby Shower Cakes",
        items: [],
      },
      "novelty-themed-cakes": {
        name: "Novelty Themed Cakes",
        items: [],
      },
      "corporate-custom-cakes": {
        name: "Corporate & Custom Cakes",
        items: [],
      },
    },
  },
  "cookies-pastries": {
    name: "Cookies and Pastries",
    subcategories: {
      cookies: {
        name: "Cookies",
        items: [],
      },
      pastries: {
        name: "Pastries",
        items: [],
      },
      donuts: {
        name: "Donuts",
        items: [],
      },
      muffins: {
        name: "Muffins",
        items: [],
      },
    },
  },
  "regular-treats": {
    name: "Regular Treats & Desserts",
    subcategories: {
      "roman-cream": {
        name: "Roman Cream",
        items: [],
      },
      "swiss-rolls": {
        name: "Swiss Rolls",
        items: [],
      },
      cupcakes: {
        name: "Cupcakes",
        items: [],
      },
    },
  },
  "cake-boards": {
    name: "Cake Boards",
    subcategories: {
      "round-boards": {
        name: "Round Cake Boards",
        items: [],
      },
      "square-boards": {
        name: "Square Cake Boards",
        items: [],
      },
      "custom-boards": {
        name: "Custom Cake Boards",
        items: [],
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

  const [showAddItemModal, setShowAddItemModal] = useState(false)
  const [editingMenuItem, setEditingMenuItem] = useState<any>(null)

  const saveMenuData = async (data: any) => {
    try {
      const response = await fetch("/api/menu", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error("Failed to save menu data")
      }

      console.log("[v0] Menu data saved successfully")
    } catch (error) {
      console.error("[v0] Failed to save menu data:", error)
      alert("Failed to save menu data. Please try again.")
    }
  }

  useEffect(() => {
    const loadMenuData = async () => {
      try {
        const response = await fetch("/api/menu")
        if (response.ok) {
          const data = await response.json()
          setMenuData(data)
          console.log("[v0] Menu data loaded from API")
        }
      } catch (error) {
        console.error("[v0] Failed to load menu data:", error)
      }
    }

    loadMenuData()
  }, [])

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

  const addNewMenuItem = async () => {
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

      await saveMenuData(newMenuData)

      setNewItem({ name: "", price: "", description: "", image: "", parentCategory: "", subcategory: "" })
      setShowAddItemModal(false)

      alert("Menu item added successfully! Changes will appear on the customer menu within moments.")
      console.log(
        "[v0] New menu item added:",
        newItemWithId.name,
        "to",
        newItem.parentCategory,
        ">",
        newItem.subcategory,
      )
    } else {
      alert("Please fill in all required fields")
    }
  }

  const updateMenuItem = async () => {
    if (editingMenuItem && editingMenuItem.name && editingMenuItem.price) {
      const newMenuData = { ...menuData }

      // Find and update the item in the correct category and subcategory
      Object.keys(newMenuData).forEach((categoryKey) => {
        Object.keys(newMenuData[categoryKey].subcategories).forEach((subcategoryKey) => {
          const itemIndex = newMenuData[categoryKey].subcategories[subcategoryKey].items.findIndex(
            (item: any) => item.id === editingMenuItem.id,
          )
          if (itemIndex !== -1) {
            newMenuData[categoryKey].subcategories[subcategoryKey].items[itemIndex] = {
              ...editingMenuItem,
            }
          }
        })
      })

      setMenuData(newMenuData)

      await saveMenuData(newMenuData)

      setEditingMenuItem(null)

      alert("Menu item updated successfully! Changes will appear on the customer menu within moments.")
      console.log("[v0] Menu item updated:", editingMenuItem.name)
    }
  }

  const deleteMenuItem = async (itemId: string) => {
    const newMenuData = { ...menuData }
    let deletedItemName = ""

    Object.keys(newMenuData).forEach((parentKey) => {
      Object.keys(newMenuData[parentKey].subcategories).forEach((subKey) => {
        const itemIndex = newMenuData[parentKey].subcategories[subKey].items.findIndex(
          (item: any) => item.id === itemId,
        )
        if (itemIndex !== -1) {
          deletedItemName = newMenuData[parentKey].subcategories[subKey].items[itemIndex].name
        }
        newMenuData[parentKey].subcategories[subKey].items = newMenuData[parentKey].subcategories[subKey].items.filter(
          (item: any) => item.id !== itemId,
        )
      })
    })

    setMenuData(newMenuData)
    await saveMenuData(newMenuData)

    alert("Menu item deleted successfully! Changes will appear on the customer menu within moments.")
    console.log("[v0] Menu item deleted:", deletedItemName)
  }

  const handleEditImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && editingMenuItem) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setEditingMenuItem({
          ...editingMenuItem,
          image: e.target?.result as string,
        })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleNewItemImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setNewItem({ ...newItem, image: e.target?.result as string })
      }
      reader.readAsDataURL(file)
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
    <div className="bg-gradient-to-br from-stanley-cream to-stanley-pink min-h-screen">
      {/* Header */}
      <div className="pt-4 pb-6 px-2 sm:px-4">
        <div className="container mx-auto">
          <div className="text-center">
            <div className="flex flex-col sm:flex-row items-center justify-between mb-4 gap-3">
              <div className="flex-1">
                <h1 className="text-xl sm:text-2xl md:text-4xl font-bold bg-gradient-to-r from-stanley-pink via-stanley-orange to-stanley-yellow bg-clip-text text-transparent font-serif animate-pulse">
                  Stanley's Bakery Admin
                </h1>
              </div>
              <Button
                onClick={handleLogout}
                variant="outline"
                size="sm"
                className="border-stanley-pink text-stanley-pink hover:bg-stanley-pink hover:text-white bg-transparent min-h-[44px] px-4"
              >
                <X className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
            <p className="text-sm sm:text-base text-stanley-brown max-w-2xl mx-auto px-2">
              Manage orders and complete cake menu from one central location
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-2 sm:px-4">
        <Tabs defaultValue="orders" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6 h-12">
            <TabsTrigger value="orders" className="text-sm sm:text-base">
              Order Management
            </TabsTrigger>
            <TabsTrigger value="menu" className="text-sm sm:text-base">
              Complete Menu Management
            </TabsTrigger>
          </TabsList>

          <TabsContent value="orders">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
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
                className={`min-h-[40px] text-xs sm:text-sm ${
                  orderFilter === "all"
                    ? "stanley-button"
                    : "border-stanley-pink text-stanley-pink hover:bg-stanley-pink/10"
                }`}
              >
                All Orders
              </Button>
              <Button
                variant={orderFilter === "paid" ? "default" : "outline"}
                size="sm"
                onClick={() => setOrderFilter("paid")}
                className={`min-h-[40px] text-xs sm:text-sm ${
                  orderFilter === "paid"
                    ? "bg-green-500 hover:bg-green-600"
                    : "border-green-300 text-green-700 hover:bg-green-50"
                }`}
              >
                <CreditCard className="h-4 w-4 mr-1" />
                Paid Orders
              </Button>
              <Button
                variant={orderFilter === "completed" ? "default" : "outline"}
                size="sm"
                onClick={() => setOrderFilter("completed")}
                className={`min-h-[40px] text-xs sm:text-sm ${
                  orderFilter === "completed"
                    ? "bg-blue-500 hover:bg-blue-600"
                    : "border-blue-300 text-blue-700 hover:bg-blue-50"
                }`}
              >
                <CheckCircle className="h-4 w-4 mr-1" />
                Completed
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

                const updateOrderPaymentStatus = (orderId: string, newPaymentStatus: string) => {
                  setOrders(
                    orders.map((order) =>
                      order.id === orderId ? { ...order, paymentStatus: newPaymentStatus } : order,
                    ),
                  )
                }

                const saveOrderChanges = (orderId: string) => {
                  setEditingOrder(null)
                }

                const deleteOrder = (orderId: string) => {
                  setOrders(orders.filter((order) => order.id !== orderId))
                }

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
                        </div>
                      </div>
                    </CardHeader>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                      <div>
                        <p className="text-xs sm:text-sm text-stanley-brown/70">Customer</p>
                        <p className="font-medium text-stanley-brown text-sm sm:text-base">{order.customerName}</p>
                        <p className="text-xs sm:text-sm text-stanley-brown/80">{order.email}</p>
                        <p className="text-xs sm:text-sm text-stanley-brown/80">{order.phone}</p>
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm text-stanley-brown/70">Cake</p>
                        <p className="font-medium text-stanley-brown text-sm sm:text-base">{order.cakeName}</p>
                        <p className="text-xs sm:text-sm text-stanley-brown/80">Total: {order.total}</p>
                      </div>
                      <div className="sm:col-span-2 lg:col-span-1">
                        <p className="text-xs sm:text-sm text-stanley-brown/70">Dates</p>
                        <p className="text-xs sm:text-sm text-stanley-brown/80">Ordered: {order.orderDate}</p>
                        <p className="text-xs sm:text-sm text-stanley-brown/80">Delivery: {order.deliveryDate}</p>
                      </div>
                    </div>

                    {order.notes && (
                      <div className="mb-4">
                        <p className="text-xs sm:text-sm text-stanley-brown/70">Notes</p>
                        <p className="text-xs sm:text-sm text-stanley-brown/80 bg-stanley-cream p-3 rounded">
                          {order.notes}
                        </p>
                      </div>
                    )}

                    {/* Status Update Controls */}
                    {editingOrder === order.id && (
                      <div className="border-t border-stanley-brown/20 pt-4 space-y-4">
                        <div>
                          <p className="text-sm font-medium text-stanley-brown mb-3">Update Payment Status:</p>
                          <div className="flex flex-wrap gap-2">
                            <Button
                              variant={order.paymentStatus === "paid" ? "default" : "outline"}
                              size="sm"
                              onClick={() => updateOrderPaymentStatus(order.id, "paid")}
                              className={`min-h-[40px] text-xs sm:text-sm ${
                                order.paymentStatus === "paid"
                                  ? "bg-green-500 hover:bg-green-600"
                                  : "border-green-300 text-green-700 hover:bg-green-50"
                              }`}
                            >
                              <CreditCard className="h-4 w-4 mr-1" />
                              Mark as Paid
                            </Button>
                            <Button
                              variant={order.paymentStatus === "pending" ? "default" : "outline"}
                              size="sm"
                              onClick={() => updateOrderPaymentStatus(order.id, "pending")}
                              className={`min-h-[40px] text-xs sm:text-sm ${
                                order.paymentStatus === "pending"
                                  ? "bg-yellow-500 hover:bg-yellow-600"
                                  : "border-yellow-300 text-yellow-700 hover:bg-yellow-50"
                              }`}
                            >
                              <Clock className="h-4 w-4 mr-1" />
                              Mark as Pending
                            </Button>
                          </div>
                        </div>

                        <div>
                          <p className="text-sm font-medium text-stanley-brown mb-3">Update Order Status:</p>
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                            {statusOptions.map((status) => {
                              const StatusIcon = status.icon
                              return (
                                <Button
                                  key={status.key}
                                  variant={order.status === status.key ? "default" : "outline"}
                                  size="sm"
                                  onClick={() => updateOrderStatus(order.id, status.key)}
                                  className={`min-h-[40px] text-xs ${
                                    order.status === status.key
                                      ? "stanley-button"
                                      : "border-stanley-pink text-stanley-pink hover:bg-stanley-pink/10"
                                  }`}
                                >
                                  <StatusIcon className="h-4 w-4 mr-1" />
                                  <span className="hidden sm:inline">{status.label}</span>
                                  <span className="sm:hidden">{status.label.split(" ")[0]}</span>
                                </Button>
                              )
                            })}
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2 pt-2">
                          <Button
                            onClick={() => setEditingOrder(null)}
                            variant="outline"
                            size="sm"
                            className="min-h-[40px] border-stanley-brown text-stanley-brown hover:bg-stanley-brown/10"
                          >
                            Cancel
                          </Button>
                          <Button
                            onClick={() => saveOrderChanges(order.id)}
                            size="sm"
                            className="stanley-button min-h-[40px]"
                          >
                            Save Changes
                          </Button>
                        </div>
                      </div>
                    )}

                    <div className="flex flex-wrap gap-2 mt-4">
                      <Button
                        onClick={() => setEditingOrder(editingOrder === order.id ? null : order.id)}
                        variant="outline"
                        size="sm"
                        className="min-h-[40px] border-stanley-brown text-stanley-brown hover:bg-stanley-brown/10"
                      >
                        <Edit className="h-4 w-4 mr-1" />
                        {editingOrder === order.id ? "Cancel" : "Edit"}
                      </Button>
                      <Button
                        onClick={() => deleteOrder(order.id)}
                        variant="outline"
                        size="sm"
                        className="min-h-[40px] border-red-300 text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Delete
                      </Button>
                    </div>
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
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
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

            <div className="flex flex-col gap-4 mb-6">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-stanley-brown/50" />
                  <Input
                    placeholder="Search menu items..."
                    value={menuSearchTerm}
                    onChange={(e) => setMenuSearchTerm(e.target.value)}
                    className="pl-10 border-stanley-brown h-12"
                  />
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <Select value={selectedParentCategory} onValueChange={setSelectedParentCategory}>
                  <SelectTrigger className="w-full sm:w-48 border-stanley-brown h-12">
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
                  <SelectTrigger className="w-full sm:w-48 border-stanley-brown h-12">
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
                    className={`min-h-[48px] px-4 ${viewMode === "grid" ? "stanley-button" : "border-stanley-brown text-stanley-brown"}`}
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className={`min-h-[48px] px-4 ${viewMode === "list" ? "stanley-button" : "border-stanley-brown text-stanley-brown"}`}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <Button
                onClick={() => setShowAddItemModal(true)}
                className="stanley-button w-full sm:w-auto min-h-[48px]"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add New Menu Item
              </Button>
            </div>

            <div
              className={
                viewMode === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6" : "space-y-4"
              }
            >
              {getFilteredMenuItems().map((item) => {
                const updateMenuItemInline = async (itemId: string, updates: any) => {
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
                  await saveMenuData(newMenuData)
                }

                const deleteMenuItemInline = async (itemId: string) => {
                  const newMenuData = { ...menuData }
                  Object.keys(newMenuData).forEach((parentKey) => {
                    Object.keys(newMenuData[parentKey].subcategories).forEach((subKey) => {
                      newMenuData[parentKey].subcategories[subKey].items = newMenuData[parentKey].subcategories[
                        subKey
                      ].items.filter((item: any) => item.id !== itemId)
                    })
                  })
                  setMenuData(newMenuData)
                  await saveMenuData(newMenuData)
                }

                return (
                  <Card
                    key={item.id}
                    className={`border-stanley-brown hover:shadow-lg transition-shadow ${
                      !item.inStock ? "opacity-60" : ""
                    }`}
                  >
                    {viewMode === "grid" ? (
                      <>
                        <CardHeader className="pb-3">
                          <div className="flex items-start justify-between">
                            <div className="flex-1 min-w-0">
                              <CardTitle className="text-base sm:text-lg text-stanley-brown truncate">
                                {item.name}
                              </CardTitle>
                              <div className="flex flex-wrap items-center gap-2 mt-1">
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
                            <div className="flex items-center space-x-1 ml-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => updateMenuItemInline(item.id, { featured: !item.featured })}
                                className={`text-stanley-brown hover:text-stanley-brown min-h-[40px] min-w-[40px] ${
                                  item.featured ? "text-stanley-yellow" : ""
                                }`}
                              >
                                <Star className={`h-4 w-4 ${item.featured ? "fill-current" : ""}`} />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => updateMenuItemInline(item.id, { inStock: !item.inStock })}
                                className={`min-h-[40px] min-w-[40px] ${
                                  item.inStock
                                    ? "text-green-600 hover:text-green-700"
                                    : "text-red-600 hover:text-red-700"
                                }`}
                              >
                                {item.inStock ? <CheckCircle className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
                              </Button>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <img
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            className="w-full h-32 sm:h-40 object-cover rounded-lg mb-3"
                          />
                          <p className="text-xs sm:text-sm text-stanley-brown/80 mb-3 line-clamp-2">
                            {item.description}
                          </p>
                          <div className="flex items-center justify-between">
                            <p className="text-lg sm:text-xl font-bold text-stanley-brown">{item.price}</p>
                            <Badge
                              variant={item.inStock ? "default" : "destructive"}
                              className={`text-xs ${item.inStock ? "bg-green-500" : "bg-red-500"}`}
                            >
                              {item.inStock ? "In Stock" : "Out of Stock"}
                            </Badge>
                          </div>
                          <div className="flex gap-2 mt-4">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setEditingMenuItem(item)}
                              className="flex-1 min-h-[40px] border-stanley-brown text-stanley-brown hover:bg-stanley-brown/10"
                            >
                              <Edit className="h-4 w-4 mr-1" />
                              Edit
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => deleteMenuItemInline(item.id)}
                              className="flex-1 min-h-[40px] border-red-300 text-red-700 hover:bg-red-50"
                            >
                              <Trash2 className="h-4 w-4 mr-1" />
                              Delete
                            </Button>
                          </div>
                        </CardContent>
                      </>
                    ) : (
                      <CardContent className="p-3 sm:p-4">
                        <div className="flex items-center gap-3 sm:gap-4">
                          <img
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg flex-shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-wrap items-center gap-2 mb-1">
                              <h3 className="font-semibold text-stanley-brown text-sm sm:text-base truncate">
                                {item.name}
                              </h3>
                              {item.featured && (
                                <Badge className="text-xs bg-stanley-yellow text-stanley-brown">
                                  <Star className="h-3 w-3 mr-1" />
                                  Featured
                                </Badge>
                              )}
                            </div>
                            <p className="text-xs sm:text-sm text-stanley-brown/80 mb-1 line-clamp-2">
                              {item.description}
                            </p>
                            <div className="flex flex-wrap items-center gap-2">
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
                          <div className="text-right flex-shrink-0">
                            <p className="text-lg sm:text-xl font-bold text-stanley-brown mb-2">{item.price}</p>
                            <div className="flex flex-col sm:flex-row items-center space-y-1 sm:space-y-0 sm:space-x-1">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => updateMenuItemInline(item.id, { featured: !item.featured })}
                                className={`text-stanley-brown hover:text-stanley-brown min-h-[36px] min-w-[36px] ${
                                  item.featured ? "text-stanley-yellow" : ""
                                }`}
                              >
                                <Star className={`h-4 w-4 ${item.featured ? "fill-current" : ""}`} />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => updateMenuItemInline(item.id, { inStock: !item.inStock })}
                                className={`min-h-[36px] min-w-[36px] ${
                                  item.inStock
                                    ? "text-green-600 hover:text-green-700"
                                    : "text-red-600 hover:text-red-700"
                                }`}
                              >
                                {item.inStock ? <CheckCircle className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setEditingMenuItem(item)}
                                className="text-stanley-brown hover:text-stanley-brown min-h-[36px] min-w-[36px]"
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => deleteMenuItemInline(item.id)}
                                className="text-red-600 hover:text-red-700 min-h-[36px] min-w-[36px]"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    )}
                  </Card>
                )
              })}
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

        {showAddItemModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-stanley-brown">Add New Menu Item</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setShowAddItemModal(false)
                    setNewItem({ name: "", price: "", description: "", image: "", parentCategory: "", subcategory: "" })
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-4">
                {/* Category Selection */}
                <div>
                  <label className="block text-sm font-medium text-stanley-brown mb-2">Main Category *</label>
                  <Select
                    value={newItem.parentCategory}
                    onValueChange={(value) => setNewItem({ ...newItem, parentCategory: value, subcategory: "" })}
                  >
                    <SelectTrigger className="border-stanley-brown">
                      <SelectValue placeholder="Select main category" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(menuData).map(([key, category]) => (
                        <SelectItem key={key} value={key}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Subcategory Selection */}
                {newItem.parentCategory && (
                  <div>
                    <label className="block text-sm font-medium text-stanley-brown mb-2">Subcategory *</label>
                    <Select
                      value={newItem.subcategory}
                      onValueChange={(value) => setNewItem({ ...newItem, subcategory: value })}
                    >
                      <SelectTrigger className="border-stanley-brown">
                        <SelectValue placeholder="Select subcategory" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Subcategories</SelectItem>
                        {Object.entries(menuData[newItem.parentCategory]?.subcategories || {}).map(
                          ([key, subcategory]) => (
                            <SelectItem key={key} value={key}>
                              {subcategory.name}
                            </SelectItem>
                          ),
                        )}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {/* Item Name */}
                <div>
                  <label className="block text-sm font-medium text-stanley-brown mb-2">Item Name *</label>
                  <Input
                    value={newItem.name}
                    onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                    placeholder="Enter item name"
                    className="border-stanley-brown"
                  />
                </div>

                {/* Price */}
                <div>
                  <label className="block text-sm font-medium text-stanley-brown mb-2">Price *</label>
                  <Input
                    value={newItem.price}
                    onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
                    placeholder="e.g., R150"
                    className="border-stanley-brown"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-stanley-brown mb-2">Description</label>
                  <textarea
                    value={newItem.description}
                    onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                    placeholder="Enter item description"
                    className="w-full p-2 border border-stanley-brown rounded-md resize-none"
                    rows={3}
                  />
                </div>

                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-medium text-stanley-brown mb-2">Item Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleNewItemImageUpload}
                    className="w-full p-2 border border-stanley-brown rounded-md"
                  />
                  {newItem.image && (
                    <div className="mt-2">
                      <img
                        src={newItem.image || "/placeholder.svg"}
                        alt="Preview"
                        className="w-20 h-20 object-cover rounded-md"
                      />
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-4">
                  <Button
                    onClick={addNewMenuItem}
                    className="stanley-button flex-1"
                    disabled={!newItem.name || !newItem.price || !newItem.parentCategory || !newItem.subcategory}
                  >
                    Add Item
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setShowAddItemModal(false)
                      setNewItem({
                        name: "",
                        price: "",
                        description: "",
                        image: "",
                        parentCategory: "",
                        subcategory: "",
                      })
                    }}
                    className="border-stanley-brown text-stanley-brown flex-1"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {editingMenuItem && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
              <h3 className="text-lg font-semibold mb-4 text-stanley-brown">Edit Menu Item</h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1 text-stanley-brown">Name</label>
                  <Input
                    value={editingMenuItem.name}
                    onChange={(e) => setEditingMenuItem({ ...editingMenuItem, name: e.target.value })}
                    placeholder="Item name"
                    className="border-stanley-brown/30 focus:border-stanley-brown"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1 text-stanley-brown">Price</label>
                  <Input
                    value={editingMenuItem.price}
                    onChange={(e) => setEditingMenuItem({ ...editingMenuItem, price: e.target.value })}
                    placeholder="R 0.00"
                    className="border-stanley-brown/30 focus:border-stanley-brown"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1 text-stanley-brown">Description</label>
                  <textarea
                    value={editingMenuItem.description}
                    onChange={(e) => setEditingMenuItem({ ...editingMenuItem, description: e.target.value })}
                    placeholder="Item description"
                    className="w-full p-2 border border-stanley-brown/30 rounded-md focus:border-stanley-brown focus:outline-none resize-none"
                    rows={3}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1 text-stanley-brown">Current Image</label>
                  {editingMenuItem.image && (
                    <img
                      src={editingMenuItem.image || "/placeholder.svg"}
                      alt={editingMenuItem.name}
                      className="w-full h-32 object-cover rounded-lg mb-2"
                    />
                  )}
                  <label className="block">
                    <span className="sr-only">Choose new image</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleEditImageUpload}
                      className="block w-full text-sm text-stanley-brown file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-stanley-pink file:text-white hover:file:bg-stanley-pink/90"
                    />
                  </label>
                </div>

                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={editingMenuItem.inStock}
                      onChange={(e) => setEditingMenuItem({ ...editingMenuItem, inStock: e.target.checked })}
                      className="rounded border-stanley-brown/30"
                    />
                    <span className="text-sm text-stanley-brown">In Stock</span>
                  </label>

                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={editingMenuItem.featured}
                      onChange={(e) => setEditingMenuItem({ ...editingMenuItem, featured: e.target.checked })}
                      className="rounded border-stanley-brown/30"
                    />
                    <span className="text-sm text-stanley-brown">Featured</span>
                  </label>
                </div>
              </div>

              <div className="flex gap-2 mt-6">
                <Button
                  onClick={() => setEditingMenuItem(null)}
                  variant="outline"
                  className="flex-1 border-stanley-brown/30 text-stanley-brown hover:bg-stanley-brown/10"
                >
                  Cancel
                </Button>
                <Button onClick={updateMenuItem} className="flex-1 stanley-button">
                  Update Item
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
