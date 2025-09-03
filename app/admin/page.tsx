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
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const ADMIN_CREDENTIALS = {
  username: "orders@stanleysbakery",
  password: "Sifiso@2016",
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

const initialCakeMenu = [
  {
    id: "cake-001",
    name: "Princess Castle Cake",
    category: "Birthday Cakes",
    price: "R850",
    description: "Beautiful princess-themed castle cake perfect for little princesses",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: "cake-002",
    name: "Superhero Adventure Cake",
    category: "Birthday Cakes",
    price: "R950",
    description: "Action-packed superhero themed cake for young heroes",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: "cake-003",
    name: "Wedding Elegance Cake",
    category: "Wedding Cakes",
    price: "R2500",
    description: "Elegant multi-tier wedding cake with beautiful decorations",
    image: "/placeholder.svg?height=200&width=200",
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
  const [cakeMenu, setCakeMenu] = useState(initialCakeMenu)
  const [editingCake, setEditingCake] = useState<string | null>(null)
  const [newCake, setNewCake] = useState({
    name: "",
    category: "",
    price: "",
    description: "",
    image: "",
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
      <div className="bg-gradient-to-br from-amber-50 to-pink-50 min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md border-amber-200 shadow-lg">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-pink-600 to-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-pink-600 via-rose-500 to-amber-600 bg-clip-text text-transparent">
              Admin Login
            </CardTitle>
            <p className="text-amber-700">Enter your credentials to access the admin dashboard</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="text-sm font-medium text-amber-900 mb-2 block">Username</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-amber-600" />
                  <Input
                    type="text"
                    placeholder="Enter username"
                    value={loginForm.username}
                    onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
                    className="pl-10 border-amber-200 focus:border-pink-500"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-amber-900 mb-2 block">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-amber-600" />
                  <Input
                    type="password"
                    placeholder="Enter password"
                    value={loginForm.password}
                    onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                    className="pl-10 border-amber-200 focus:border-pink-500"
                    required
                  />
                </div>
              </div>
              {loginError && (
                <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg border border-red-200">{loginError}</div>
              )}
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-pink-600 to-amber-600 hover:from-pink-700 hover:to-amber-700 text-white font-medium py-2"
              >
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

  const updateCake = (cakeId: string, updatedCake: any) => {
    setCakeMenu(cakeMenu.map((cake) => (cake.id === cakeId ? { ...cake, ...updatedCake } : cake)))
    setEditingCake(null)
  }

  const deleteCake = (cakeId: string) => {
    setCakeMenu(cakeMenu.filter((cake) => cake.id !== cakeId))
  }

  const addNewCake = () => {
    if (newCake.name && newCake.category && newCake.price) {
      const newCakeWithId = {
        ...newCake,
        id: `cake-${Date.now()}`,
        image:
          newCake.image ||
          `/placeholder.svg?height=200&width=200&query=${newCake.name.replace(/\s+/g, "+").toLowerCase()}`,
      }
      setCakeMenu([...cakeMenu, newCakeWithId])
      setNewCake({ name: "", category: "", price: "", description: "", image: "" })
    }
  }

  return (
    <div className="bg-gradient-to-br from-amber-50 to-pink-50 min-h-screen scale-95 sm:scale-100 transition-transform duration-300">
      {/* Moved header to top with pink gradient and sliding effect */}
      <div className="pt-4 pb-8">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="flex items-center justify-between mb-4">
              <div className="flex-1">
                <h1 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-pink-600 via-rose-500 to-amber-600 bg-clip-text text-transparent font-serif animate-slideInFromLeft">
                  Admin Dashboard
                </h1>
              </div>
              <Button
                onClick={handleLogout}
                variant="outline"
                className="border-pink-300 text-pink-700 hover:bg-pink-50 bg-transparent"
              >
                <X className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
            <p className="text-amber-700 max-w-2xl mx-auto">Manage orders and cake menu from one central location</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4">
        {/* Added tabs for different admin sections */}
        <Tabs defaultValue="orders" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="orders">Order Management</TabsTrigger>
            <TabsTrigger value="menu">Cake Menu Management</TabsTrigger>
          </TabsList>

          <TabsContent value="orders">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {getStatusCounts().map((status) => {
                const IconComponent = status.icon
                return (
                  <Card
                    key={status.key}
                    className={`border-amber-200 cursor-pointer transition-all hover:shadow-md ${
                      orderFilter === status.key ? "ring-2 ring-pink-500 bg-pink-50" : ""
                    }`}
                    onClick={() => setOrderFilter(status.key === "total" ? "all" : status.key)}
                  >
                    <CardContent className="p-4 text-center">
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2 ${status.color}`}
                      >
                        <IconComponent className="h-6 w-6" />
                      </div>
                      <p className="text-2xl font-bold text-amber-900">{status.count}</p>
                      <p className="text-xs text-amber-600">{status.label}</p>
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
                    ? "bg-pink-500 hover:bg-pink-600"
                    : "border-pink-300 text-pink-700 hover:bg-pink-50"
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
                className="max-w-md border-amber-200 focus:border-yellow-500"
              />
            </div>

            {orderFilter !== "all" && (
              <div className="mb-4 p-3 bg-pink-50 border border-pink-200 rounded-lg">
                <p className="text-pink-800 text-sm font-medium">
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
                  <Card key={order.id} className="border-amber-200 hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-xl text-amber-900 font-bold">{order.id}</CardTitle>
                          <p className="text-sm text-amber-600 mt-1">Order Tracking Number</p>
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
                            className="text-amber-700 hover:text-amber-900"
                          >
                            {editingOrder === order.id ? <X className="h-4 w-4" /> : <Edit className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-amber-600">Customer</p>
                          <p className="font-medium text-amber-900">{order.customerName}</p>
                          <p className="text-sm text-amber-700">{order.email}</p>
                          <p className="text-sm text-amber-700">{order.phone}</p>
                        </div>
                        <div>
                          <p className="text-sm text-amber-600">Cake</p>
                          <p className="font-medium text-amber-900">{order.cakeName}</p>
                          <p className="text-sm text-amber-700">Total: {order.total}</p>
                        </div>
                        <div>
                          <p className="text-sm text-amber-600">Dates</p>
                          <p className="text-sm text-amber-700">Ordered: {order.orderDate}</p>
                          <p className="text-sm text-amber-700">Delivery: {order.deliveryDate}</p>
                        </div>
                      </div>

                      {order.notes && (
                        <div className="mb-4">
                          <p className="text-sm text-amber-600">Notes</p>
                          <p className="text-sm text-amber-700 bg-amber-50 p-2 rounded">{order.notes}</p>
                        </div>
                      )}

                      {/* Status Update Controls */}
                      {editingOrder === order.id && (
                        <div className="border-t border-amber-200 pt-4 space-y-4">
                          <div>
                            <p className="text-sm font-medium text-amber-900 mb-3">Update Payment Status:</p>
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

                          <div className="bg-pink-50 border border-pink-200 rounded-lg p-4">
                            <p className="text-sm font-medium text-pink-900 mb-3 flex items-center">
                              <Package className="h-4 w-4 mr-2" />
                              Update Order Status (Customer Tracking):
                            </p>
                            <p className="text-xs text-pink-700 mb-3">
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
                                        ? "bg-pink-500 hover:bg-pink-600 text-white"
                                        : "border-pink-300 text-pink-700 hover:bg-pink-50"
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
                <Package className="h-16 w-16 text-amber-300 mx-auto mb-4" />
                <p className="text-amber-700 text-lg">
                  {orderFilter === "all"
                    ? "No orders found"
                    : orderFilter === "paid"
                      ? "No paid orders found"
                      : orderFilter === "completed"
                        ? "No completed orders found"
                        : "No pending orders found"}
                </p>
                <p className="text-amber-600">
                  {searchTerm ? "Try adjusting your search criteria" : "Orders will appear here when available"}
                </p>
              </div>
            )}
          </TabsContent>

          {/* Added cake menu management tab */}
          <TabsContent value="menu">
            {/* Add New Cake Section */}
            <Card className="border-amber-200 mb-8">
              <CardHeader>
                <CardTitle className="text-amber-900 flex items-center">
                  <Plus className="h-5 w-5 mr-2" />
                  Add New Cake
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <Input
                    placeholder="Cake Name"
                    value={newCake.name}
                    onChange={(e) => setNewCake({ ...newCake, name: e.target.value })}
                    className="border-amber-200"
                  />
                  <Input
                    placeholder="Category (e.g., Birthday Cakes)"
                    value={newCake.category}
                    onChange={(e) => setNewCake({ ...newCake, category: e.target.value })}
                    className="border-amber-200"
                  />
                  <Input
                    placeholder="Price (e.g., R850)"
                    value={newCake.price}
                    onChange={(e) => setNewCake({ ...newCake, price: e.target.value })}
                    className="border-amber-200"
                  />
                  <Input
                    placeholder="Image URL (optional)"
                    value={newCake.image}
                    onChange={(e) => setNewCake({ ...newCake, image: e.target.value })}
                    className="border-amber-200"
                  />
                </div>
                <Textarea
                  placeholder="Cake Description"
                  value={newCake.description}
                  onChange={(e) => setNewCake({ ...newCake, description: e.target.value })}
                  className="border-amber-200 mb-4"
                />
                <Button onClick={addNewCake} className="bg-yellow-500 hover:bg-yellow-600 text-amber-900">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Cake
                </Button>
              </CardContent>
            </Card>

            {/* Cake Menu Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cakeMenu.map((cake) => (
                <Card key={cake.id} className="border-amber-200 hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg text-amber-900">{cake.name}</CardTitle>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setEditingCake(editingCake === cake.id ? null : cake.id)}
                          className="text-amber-700 hover:text-amber-900"
                        >
                          {editingCake === cake.id ? <X className="h-4 w-4" /> : <Edit className="h-4 w-4" />}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteCake(cake.id)}
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
                        src={cake.image || "/placeholder.svg"}
                        alt={cake.name}
                        className="w-full h-48 object-cover rounded-lg"
                      />
                    </div>

                    {editingCake === cake.id ? (
                      <div className="space-y-3">
                        <Input
                          value={cake.name}
                          onChange={(e) => updateCake(cake.id, { name: e.target.value })}
                          className="border-amber-200"
                        />
                        <Input
                          value={cake.category}
                          onChange={(e) => updateCake(cake.id, { category: e.target.value })}
                          className="border-amber-200"
                        />
                        <Input
                          value={cake.price}
                          onChange={(e) => updateCake(cake.id, { price: e.target.value })}
                          className="border-amber-200"
                        />
                        <Input
                          value={cake.image}
                          onChange={(e) => updateCake(cake.id, { image: e.target.value })}
                          placeholder="Image URL"
                          className="border-amber-200"
                        />
                        <Textarea
                          value={cake.description}
                          onChange={(e) => updateCake(cake.id, { description: e.target.value })}
                          className="border-amber-200"
                        />
                        <Button
                          onClick={() => setEditingCake(null)}
                          className="bg-yellow-500 hover:bg-yellow-600 text-amber-900 w-full"
                        >
                          Save Changes
                        </Button>
                      </div>
                    ) : (
                      <div>
                        <Badge className="mb-2 bg-pink-100 text-pink-800">{cake.category}</Badge>
                        <p className="text-2xl font-bold text-amber-900 mb-2">{cake.price}</p>
                        <p className="text-sm text-amber-700">{cake.description}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            {cakeMenu.length === 0 && (
              <div className="text-center py-12">
                <ImageIcon className="h-16 w-16 text-amber-300 mx-auto mb-4" />
                <p className="text-amber-700 text-lg">No cakes in menu</p>
                <p className="text-amber-600">Add your first cake to get started</p>
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
