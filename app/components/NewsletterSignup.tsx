"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function NewsletterSignup() {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitted(true)
      setIsSubmitting(false)
      setEmail("")
    }, 1000)
  }

  if (isSubmitted) {
    return (
      <section className="py-16 bg-gradient-to-r from-pink-500 to-amber-500">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-white/90 backdrop-blur-sm rounded-lg p-8 shadow-xl">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-amber-900 mb-2">Thank you for subscribing!</h3>
              <p className="text-amber-700 mb-6">You'll be the first to know about our sweetest updates.</p>
              <Button
                onClick={() => setIsSubmitted(false)}
                className="bg-gradient-to-r from-pink-500 to-amber-500 hover:from-pink-600 hover:to-amber-600 text-white font-semibold px-6"
              >
                Subscribe Another Email
              </Button>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-gradient-to-r from-pink-500 to-amber-500">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Sweet <span className="font-dancing-script">Updates</span> & Special Offers
          </h2>
          <p className="text-pink-100 mb-8">
            Get special offers, first alerts for new cake designs, seasonal specials, and exclusive discounts!
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 bg-white border-0 text-amber-900 placeholder:text-amber-500"
            />
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-white text-pink-600 hover:bg-pink-50 font-semibold px-8"
            >
              {isSubmitting ? "Subscribing..." : "Subscribe"}
            </Button>
          </form>

          <p className="text-pink-100 text-sm mt-4">
            No spam, just sweet treats and cake inspiration! Unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  )
}
