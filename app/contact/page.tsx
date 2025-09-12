"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react"

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState("")
  const [formData, setFormData] = useState({
    firstName: "",
    surname: "",
    email: "",
    phone: "",
    message: "",
  })

  const [visibleSections, setVisibleSections] = useState<Set<number>>(new Set())
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number.parseInt(entry.target.getAttribute("data-section") || "0")
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set([...prev, index]))
          }
        })
      },
      { threshold: 0.1, rootMargin: "50px" },
    )

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("https://formspree.io/f/movnbepe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: `${formData.firstName} ${formData.surname}`,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
        }),
      })

      if (response.ok) {
        setSubmitMessage("Thank you! Your message has been sent.")
        setFormData({
          firstName: "",
          surname: "",
          email: "",
          phone: "",
          message: "",
        })
      } else {
        setSubmitMessage("Sorry, there was an error sending your message. Please try again.")
      }
    } catch (error) {
      setSubmitMessage("Sorry, there was an error sending your message. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-gradient-to-br from-pink-50 via-orange-50 to-yellow-50 min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-20 left-10 text-4xl animate-pulse opacity-20"
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

      <div className="pt-2 pb-8 relative z-10">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-2xl md:text-4xl font-serif font-bold bg-gradient-to-r from-pink-600 via-pink-500 to-orange-500 bg-clip-text text-transparent mb-4 text-balance">
              Get in Touch
            </h1>
            <p className="text-pink-600 max-w-4xl mx-auto leading-relaxed text-pretty">
              We'd love to hear from you! Whether you have questions about our cakes, want to place a custom order, or
              simply want to say hello, we're here to help make your sweet dreams come true.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div
            ref={(el) => (sectionRefs.current[0] = el)}
            data-section="0"
            className={`transform transition-all duration-700 ${
              visibleSections.has(0) ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >
            <Card className="bg-white/90 backdrop-blur-sm border-pink-200 shadow-xl shadow-pink-100/50">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-pink-600 font-serif">Send us a Message</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-pink-600 font-medium">
                      First Name
                    </Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      className="border-pink-200 focus:border-pink-400 focus:ring-pink-400/20"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="surname" className="text-pink-600 font-medium">
                      Surname
                    </Label>
                    <Input
                      id="surname"
                      name="surname"
                      value={formData.surname}
                      onChange={handleInputChange}
                      required
                      className="border-pink-200 focus:border-pink-400 focus:ring-pink-400/20"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-pink-600 font-medium">
                      Email
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="border-pink-200 focus:border-pink-400 focus:ring-pink-400/20"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-pink-600 font-medium">
                      Phone Number
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="border-pink-200 focus:border-pink-400 focus:ring-pink-400/20"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-pink-600 font-medium">
                      Message
                    </Label>
                    <div className="mb-2 p-3 bg-pink-50 rounded-lg border border-pink-200">
                      <p className="text-pink-600 text-sm">
                        <strong>Note:</strong> Please send through your inquiries or any questions you may have. This
                        form is for questions only and not for placing orders.
                      </p>
                    </div>
                    <Textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      className="border-pink-200 focus:border-pink-400 focus:ring-pink-400/20 resize-none"
                      placeholder="Please send through your inquiries or any questions you may have. This form is for questions only and not for placing orders."
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-500 hover:to-orange-500 text-pink-800 font-bold py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>

                  {submitMessage && (
                    <div className="text-center p-4 rounded-lg bg-green-50 text-green-700 border border-green-200">
                      {submitMessage}
                    </div>
                  )}
                </form>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-8">
            <div
              ref={(el) => (sectionRefs.current[1] = el)}
              data-section="1"
              className={`transform transition-all duration-700 delay-200 ${
                visibleSections.has(1) ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
            >
              <Card className="bg-white/90 backdrop-blur-sm border-pink-200 shadow-xl shadow-pink-100/50">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-pink-600 font-serif flex items-center">
                    <Clock className="mr-3 h-6 w-6" />
                    Stanley's Bakery Hours
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-pink-600 font-medium">Monday to Sunday</span>
                    <span className="text-pink-600">9:00 a.m. to 6:30 p.m.</span>
                  </div>
                  <div className="mt-4 p-3 bg-pink-50 rounded-lg border border-pink-200">
                    <p className="text-pink-600 text-sm">
                      <strong className="font-medium">Closed on:</strong> 25 December and 1 January
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div
              ref={(el) => (sectionRefs.current[2] = el)}
              data-section="2"
              className={`transform transition-all duration-700 delay-400 ${
                visibleSections.has(2) ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
            >
              <Card className="bg-white/90 backdrop-blur-sm border-pink-200 shadow-xl shadow-pink-100/50">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-pink-600 font-serif">Contact Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <MapPin className="h-6 w-6 text-pink-600 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-pink-600 mb-1">Visit Our Bakery</h3>
                      <a
                        href="https://maps.google.com/?q=15+Turkmenistan+Crescent,+Randburg,+Gauteng"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-pink-600 leading-relaxed hover:text-pink-700 transition-colors duration-300 cursor-pointer underline"
                      >
                        15 Turkmenistan Crescent
                        <br />
                        Randburg, Gauteng
                      </a>
                      <div className="mt-4">
                        <a
                          href="https://maps.google.com/?q=15+Turkmenistan+Crescent,+Randburg,+Gauteng"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block cursor-pointer hover:opacity-90 transition-opacity duration-300"
                        >
                          <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3583.8234567890123!2d28.0123456!3d-26.1234567!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjbCsDA3JzI0LjQiUyAyOMKwMDAnNDQuNCJF!5e0!3m2!1sen!2sza!4v1234567890123!5m2!1sen!2sza&q=15+Turkmenistan+Crescent,+Randburg,+Gauteng"
                            width="100%"
                            height="200"
                            style={{ border: 0, pointerEvents: "none" }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            className="rounded-lg shadow-md"
                          ></iframe>
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <Phone className="h-6 w-6 text-pink-600 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-pink-600 mb-1">Call Us</h3>
                      <p className="text-pink-600">+27 10 335 1169</p>
                      <p className="text-pink-600 text-sm">Available during business hours</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <Mail className="h-6 w-6 text-pink-600 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-pink-600 mb-1">Email Us</h3>
                      <p className="text-pink-600">orders@stanleysbakery.co.za</p>
                      <p className="text-pink-600 text-sm">We respond within 24 hours</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <MessageCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-pink-600 mb-1">Send us a WhatsApp</h3>
                      <a
                        href="https://wa.me/27784914587"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-600 hover:text-green-700 transition-colors duration-300 underline"
                      >
                        +27 78 491 4587
                      </a>
                      <p className="text-pink-600 text-sm">Quick responses via WhatsApp</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
