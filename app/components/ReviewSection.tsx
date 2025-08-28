"use client"

import type React from "react"

import { useState } from "react"
import { Star, Quote, Plus, X } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

const initialReviews = [
  {
    id: 1,
    name: "Sarah Johnson",
    rating: 5,
    review:
      "Stanley created the most beautiful wedding cake for us! Not only was it stunning to look at, but it tasted absolutely incredible. Every guest asked for the recipe. The attention to detail was perfect.",
    occasion: "Wedding Cake",
    date: "2 weeks ago",
    avatar: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 2,
    name: "Mike Rodriguez",
    rating: 5,
    review:
      "My daughter's dinosaur birthday cake was a huge hit! The kids were amazed by how realistic it looked, and the chocolate cake inside was delicious. Stanley really knows how to make kids' dreams come true.",
    occasion: "Kids Birthday",
    date: "1 month ago",
    avatar: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 3,
    name: "Emily Chen",
    rating: 5,
    review:
      "I ordered cupcakes for my office party and they were absolutely perfect! Beautiful presentation and every flavor was delicious. The team at Stanley's is so professional and accommodating.",
    occasion: "Corporate Event",
    date: "3 weeks ago",
    avatar: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 4,
    name: "David Thompson",
    rating: 5,
    review:
      "The anniversary cake Stanley made for my wife and me was beyond our expectations. The design was elegant and the red velvet flavor was to die for. We'll definitely be back for future celebrations!",
    occasion: "Anniversary",
    date: "1 week ago",
    avatar: "/placeholder.svg?height=100&width=100",
  },
]

export default function ReviewSection() {
  const [reviews, setReviews] = useState(initialReviews)
  const [showForm, setShowForm] = useState(false)
  const [newReview, setNewReview] = useState({
    name: "",
    email: "",
    rating: 5,
    review: "",
    occasion: "",
  })

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault()
    const review = {
      id: reviews.length + 1,
      name: newReview.name,
      rating: newReview.rating,
      review: newReview.review,
      occasion: newReview.occasion,
      date: "Just now",
      avatar: "/placeholder.svg?height=100&width=100",
    }
    setReviews([review, ...reviews])
    setNewReview({ name: "", email: "", rating: 5, review: "", occasion: "" })
    setShowForm(false)
  }

  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          {!showForm ? (
            <Button
              onClick={() => setShowForm(true)}
              className="bg-yellow-500 hover:bg-yellow-600 text-amber-900 font-bold px-8 py-3 rounded-full text-lg shadow-lg hover:shadow-xl transition-all mb-8"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add a Review
            </Button>
          ) : (
            <Card className="max-w-2xl mx-auto bg-white shadow-xl mb-8">
              <CardContent className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-pink-600 via-rose-500 to-amber-600 bg-clip-text text-transparent">
                    Share Your Experience
                  </h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowForm(false)}
                    className="text-amber-600 hover:text-amber-800"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>
                <form onSubmit={handleSubmitReview} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-amber-700 mb-2">Your Name *</label>
                      <Input
                        type="text"
                        required
                        value={newReview.name}
                        onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                        className="border-amber-200 focus:border-amber-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-amber-700 mb-2">Email (optional)</label>
                      <Input
                        type="email"
                        value={newReview.email}
                        onChange={(e) => setNewReview({ ...newReview, email: e.target.value })}
                        className="border-amber-200 focus:border-amber-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-amber-700 mb-2">Occasion</label>
                    <Input
                      type="text"
                      placeholder="e.g., Birthday, Wedding, Corporate Event"
                      value={newReview.occasion}
                      onChange={(e) => setNewReview({ ...newReview, occasion: e.target.value })}
                      className="border-amber-200 focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-amber-700 mb-2">Rating *</label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setNewReview({ ...newReview, rating: star })}
                          className="focus:outline-none"
                        >
                          <Star
                            className={`w-8 h-8 ${
                              star <= newReview.rating ? "text-yellow-400 fill-current" : "text-gray-300"
                            } hover:text-yellow-400 transition-colors`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-amber-700 mb-2">Your Review *</label>
                    <Textarea
                      required
                      rows={4}
                      placeholder="Tell us about your experience with Stanley's Bakery..."
                      value={newReview.review}
                      onChange={(e) => setNewReview({ ...newReview, review: e.target.value })}
                      className="border-amber-200 focus:border-amber-500"
                    />
                  </div>
                  <div className="flex gap-4 justify-end">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setShowForm(false)}
                      className="border-amber-300 text-amber-700 hover:bg-amber-50"
                    >
                      Cancel
                    </Button>
                    <Button type="submit" className="bg-yellow-500 hover:bg-yellow-600 text-amber-900 font-bold px-8">
                      Submit Review
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="text-center mb-12">
          <h2 className="text-xl md:text-2xl font-semibold text-amber-700 mb-4">What Our Customers Say</h2>
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-6 h-6 ${
                    i < Math.floor(averageRating) ? "text-yellow-400 fill-current" : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-lg font-semibold text-amber-700">{averageRating.toFixed(1)} out of 5 stars</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {reviews.map((review) => (
            <Card key={review.id} className="bg-white shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={review.avatar || "/placeholder.svg"} alt={review.name} />
                    <AvatarFallback>{review.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-amber-700">{review.name}</h3>
                      <span className="text-sm text-amber-600">{review.date}</span>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < review.rating ? "text-yellow-400 fill-current" : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm font-medium text-amber-700">{review.occasion}</span>
                    </div>
                  </div>
                </div>
                <div className="relative">
                  <Quote className="absolute -top-2 -left-2 w-6 h-6 text-amber-200" />
                  <p className="text-amber-700 leading-relaxed pl-4">{review.review}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
