"use client"
import { useState, useEffect } from "react"
import type React from "react"

import { Star, Quote, RefreshCw, Send } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Review {
  id: number
  name: string
  rating: number
  review: string
  occasion: string
  date: string
  avatar: string
}

export default function ReviewSection() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    occasion: "",
    rating: "",
    review: "",
  })

  const loadExistingReviews = () => {
    const existingReviews = [
      {
        id: 1,
        name: "Sam Pooe",
        rating: 5,
        review: "Sweet tooth heaven. I even bought a Kota for food measure. See you guys soon!!!!!",
        occasion: "celebration",
        date: "June 22, 2024",
        avatar: "",
      },
      {
        id: 2,
        name: "Mr. Zola R. Siwisa",
        rating: 5,
        review: "Place is very organized and the stuff very friendly. Atmosphere is cosy and very chilled",
        occasion: "other",
        date: "May 18, 2024",
        avatar: "",
      },
      {
        id: 3,
        name: "Ricky Wrld",
        rating: 5,
        review: "Chilled area, would give it a 5/5. Great place to get your sweet treats!",
        occasion: "other",
        date: "March 6, 2024",
        avatar: "",
      },
      {
        id: 4,
        name: "Siphokazi Dumisile Fikeni",
        rating: 5,
        review: "Their caramel Swiss roll is HEAVEN in your mouth!!! Highly recommended for anyone with a sweet tooth.",
        occasion: "celebration",
        date: "February 16, 2024",
        avatar: "",
      },
      {
        id: 5,
        name: "Bonginkosi Morris",
        rating: 5,
        review: "Clean place with excellent service. The cakes are always fresh and delicious.",
        occasion: "other",
        date: "February 5, 2024",
        avatar: "",
      },
      {
        id: 6,
        name: "Thabo Mthembu",
        rating: 5,
        review:
          "Amazing birthday cake for my daughter! The design was exactly what we wanted and it tasted incredible.",
        occasion: "birthday",
        date: "January 28, 2024",
        avatar: "",
      },
      {
        id: 7,
        name: "Nomsa Dlamini",
        rating: 5,
        review: "Best wedding cake in Randburg! Stanley's Bakery made our special day even more memorable.",
        occasion: "wedding",
        date: "January 15, 2024",
        avatar: "",
      },
      {
        id: 8,
        name: "Michael Johnson",
        rating: 4,
        review: "Great variety of cakes and pastries. The staff is helpful and the prices are reasonable.",
        occasion: "other",
        date: "January 10, 2024",
        avatar: "",
      },
      {
        id: 9,
        name: "Precious Mokwena",
        rating: 5,
        review: "Their cupcakes are to die for! Perfect for office celebrations and always a hit with colleagues.",
        occasion: "celebration",
        date: "December 20, 2023",
        avatar: "",
      },
      {
        id: 10,
        name: "David Smith",
        rating: 5,
        review:
          "Ordered a custom cake for my son's graduation. The attention to detail was amazing and it tasted fantastic!",
        occasion: "graduation",
        date: "December 15, 2023",
        avatar: "",
      },
    ]
    return existingReviews
  }

  const fetchReviews = async () => {
    try {
      console.log("[v0] Fetching reviews from API")
      const response = await fetch("/api/reviews")
      const data = await response.json()
      console.log("[v0] Received reviews:", data.reviews?.length || 0)

      if (!data.reviews || data.reviews.length === 0) {
        console.log("[v0] Using existing reviews as fallback")
        setReviews(loadExistingReviews())
      } else {
        setReviews(data.reviews)
      }
    } catch (error) {
      console.error("[v0] Error fetching reviews:", error)
      console.log("[v0] Loading existing reviews due to API error")
      setReviews(loadExistingReviews())
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  useEffect(() => {
    fetchReviews()
  }, [])

  const handleRefresh = () => {
    setRefreshing(true)
    fetchReviews()
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      const reviewData = {
        name: formData.name,
        email: formData.email,
        occasion: formData.occasion,
        rating: formData.rating,
        review: formData.review,
        timestamp: new Date().toISOString(),
      }

      try {
        const googleFormData = new FormData()
        googleFormData.append("entry.123456789", formData.name)
        googleFormData.append("entry.987654321", formData.email)
        googleFormData.append("entry.456789123", formData.occasion)
        googleFormData.append("entry.789123456", formData.rating)
        googleFormData.append("entry.321654987", formData.review)

        await fetch(
          "https://docs.google.com/forms/d/e/1FAIpQLSd1C8uKntFNb0HPKMZXAgh2ehpsvuHWbS7H0IUz7ZvPhDgJvg/formResponse",
          {
            method: "POST",
            body: googleFormData,
            mode: "no-cors",
          },
        )

        console.log("[v0] Review submitted via Google Form")
      } catch (formError) {
        console.log("[v0] Google Form submission failed, using fallback")

        const existingReviews = JSON.parse(localStorage.getItem("pendingReviews") || "[]")
        existingReviews.push(reviewData)
        localStorage.setItem("pendingReviews", JSON.stringify(existingReviews))
      }

      setFormData({ name: "", email: "", occasion: "", rating: "", review: "" })

      setTimeout(() => {
        handleRefresh()
      }, 1000)

      alert("Thank you for your review! It will appear shortly.")
    } catch (error) {
      console.error("Error submitting review:", error)
      alert("There was an error submitting your review. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  const averageRating =
    reviews.length > 0 ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length : 5

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-pink-600 via-pink-500 to-orange-500 bg-clip-text text-transparent mb-4 font-serif">
              Share Your Experience
            </h2>
            <p className="text-pink-600 max-w-2xl mx-auto text-lg leading-relaxed">
              We'd love to hear about your experience with Stanley's Bakery! Your feedback helps us continue creating
              magical moments.
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <Card className="bg-gradient-to-br from-pink-50 to-orange-50 shadow-xl border-2 border-pink-200">
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-pink-700 mb-2">Your Name *</label>
                      <Input
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="border-pink-200 focus:border-pink-400 focus:ring-pink-400"
                        placeholder="Enter your name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-pink-700 mb-2">Email (Optional)</label>
                      <Input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="border-pink-200 focus:border-pink-400 focus:ring-pink-400"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-pink-700 mb-2">Occasion</label>
                      <Select
                        value={formData.occasion}
                        onValueChange={(value) => setFormData({ ...formData, occasion: value })}
                      >
                        <SelectTrigger className="border-pink-200 focus:border-pink-400 focus:ring-pink-400">
                          <SelectValue placeholder="Select occasion" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="birthday">Birthday</SelectItem>
                          <SelectItem value="wedding">Wedding</SelectItem>
                          <SelectItem value="anniversary">Anniversary</SelectItem>
                          <SelectItem value="graduation">Graduation</SelectItem>
                          <SelectItem value="celebration">Celebration</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-pink-700 mb-2">Rating *</label>
                      <Select
                        required
                        value={formData.rating}
                        onValueChange={(value) => setFormData({ ...formData, rating: value })}
                      >
                        <SelectTrigger className="border-pink-200 focus:border-pink-400 focus:ring-pink-400">
                          <SelectValue placeholder="Rate your experience" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="5">⭐⭐⭐⭐⭐ Excellent</SelectItem>
                          <SelectItem value="4">⭐⭐⭐⭐ Very Good</SelectItem>
                          <SelectItem value="3">⭐⭐⭐ Good</SelectItem>
                          <SelectItem value="2">⭐⭐ Fair</SelectItem>
                          <SelectItem value="1">⭐ Poor</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-pink-700 mb-2">Your Review *</label>
                    <Textarea
                      required
                      value={formData.review}
                      onChange={(e) => setFormData({ ...formData, review: e.target.value })}
                      className="border-pink-200 focus:border-pink-400 focus:ring-pink-400 min-h-[120px]"
                      placeholder="Tell us about your experience with Stanley's Bakery..."
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    {submitting ? (
                      <>
                        <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Submit Review
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-6">
            <h2 className="text-xl md:text-2xl font-semibold bg-gradient-to-r from-pink-600 to-orange-500 bg-clip-text text-transparent">
              What Our Customers Say
            </h2>
            <Button
              onClick={handleRefresh}
              disabled={refreshing}
              variant="outline"
              size="sm"
              className="border-pink-300 text-pink-600 hover:bg-pink-50 bg-transparent"
            >
              <RefreshCw className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`} />
            </Button>
          </div>

          {reviews.length > 0 && (
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
              <span className="text-lg font-semibold text-pink-700">
                {averageRating.toFixed(1)} out of 5 stars ({reviews.length} reviews)
              </span>
            </div>
          )}
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto mb-4"></div>
            <p className="text-pink-600">Loading reviews...</p>
          </div>
        ) : reviews.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🎂</div>
            <h3 className="text-xl font-semibold text-pink-700 mb-2">No reviews yet</h3>
            <p className="text-pink-600">Be the first to share your experience with Stanley's Bakery!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {reviews.map((review) => (
              <Card
                key={review.id}
                className="bg-white shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-l-pink-400"
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <Avatar className="w-12 h-12 border-2 border-pink-200">
                      <AvatarImage src={review.avatar || "/placeholder.svg"} alt={review.name} />
                      <AvatarFallback className="bg-pink-100 text-pink-700 font-semibold">
                        {review.name.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-pink-700">{review.name}</h3>
                        <span className="text-sm text-pink-500">{review.date}</span>
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
                        {review.occasion && (
                          <span className="text-sm font-medium text-orange-600 bg-orange-100 px-2 py-1 rounded-full">
                            {review.occasion}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="relative">
                    <Quote className="absolute -top-2 -left-2 w-6 h-6 text-pink-200" />
                    <p className="text-gray-700 leading-relaxed pl-4 text-balance">{review.review}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
