"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Heart, Award, Users, Clock, ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function About() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [visibleSections, setVisibleSections] = useState<Set<number>>(new Set())
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([])

  const slideshowImages = [
    {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-08-13%20at%2011.24.08_84ebfc3e.jpg-91x12RM8FKSyoRPHbNH5xxjsz0uI63.jpeg",
      alt: "Stanley's Bakery Team",
      caption: "Our dedicated team of bakers working together to create exceptional treats",
    },
    {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-08-13%20at%2011.19.42_530d56d5.jpg-VhGy1cz3ZKYWYGlqrRwPPkK00vogLC.jpeg",
      alt: "Sifiso in the bakery",
      caption: "Master Baker Sifiso showcasing our fresh daily selection of baked goods",
    },
    {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-08-13%20at%2011.19.42_f23bb3dc.jpg-8si4hK32ygHttoOTIjjy1NdUUuJiph.jpeg",
      alt: "Team member with baked goods",
      caption: "Freshly baked pastries and cookies ready for our valued customers",
    },
    {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-08-13%20at%2011.24.08_976600e9.jpg-K08ZKtEunsebM0GfAioQDKqnPJRTSv.jpeg",
      alt: "Sifiso with cake display",
      caption: "Our beautiful cake display featuring custom-made celebration cakes",
    },
    {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-08-13%20at%2011.19.42_a46681cb.jpg-5HgZHj7dV3E5BngpAvDHj8Y24WV384.jpeg",
      alt: "Team with custom cake",
      caption: "Celebrating a special milestone with our custom 60th birthday cake creation",
    },
    {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-08-13%20at%2011.19.44_8a841faa.jpg-211ncPMONYrVn04k4hAAIl5SpNsUXJ.jpeg",
      alt: "Baker decorating cakes",
      caption: "Behind the scenes: Our skilled baker carefully decorating red velvet cakes",
    },
  ]

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

  // Auto-play slideshow
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slideshowImages.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [slideshowImages.length])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slideshowImages.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slideshowImages.length) % slideshowImages.length)
  }

  return (
    <div className="min-h-screen relative bg-white overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
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

      <div className="pt-2 pb-8 relative z-10">
        <div className="container mx-auto px-3">
          <div className="text-center">
            <h1 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-pink-600 via-pink-500 to-orange-500 bg-clip-text text-transparent mb-2 font-serif">
              Our Story
            </h1>
            <p className="text-sm md:text-lg text-pink-600 max-w-3xl mx-auto font-medium mb-4">
              Baking with love since 2016
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-3 relative z-10">
        <div
          ref={(el) => (sectionRefs.current[0] = el)}
          data-section="0"
          className={`grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16 transition-all duration-1000 ${
            visibleSections.has(0) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="space-y-6">
            <Card className="bg-gradient-to-br from-white to-pink-50/30 border-pink-200 shadow-lg hover:shadow-xl transition-all duration-300 border-2">
              <CardContent className="p-8">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-orange-500 bg-clip-text text-transparent mb-6 font-serif">
                  Our Story — Baking with love since 2016
                </h2>
                <div className="space-y-4 text-pink-700 leading-relaxed">
                  <p>
                    Baking is our passion and family tradition. Founded in 2016 by Master Baker Sifiso Stanley Linda,
                    our home-based bakery started from our small kitchen and then expanded to a bigger structure. Our
                    bakery is a small neighbourhood shop with big dreams. Over the years, we have grown into a beloved
                    local spot known for fresh handcrafted baked goods made with the finest ingredients.
                  </p>
                  <p>
                    Our team is dedicated to creating delicious treats and custom-made cakes that bring joy to every
                    customer. Whether it's a delicate pastry or a custom-made cake for a specific occasion, we put love
                    and care into everything we bake.
                  </p>
                  <p>
                    Our mission is to serve our community with high-quality, fresh baked goods that brighten your day.
                    We believe in using local, organic ingredients whenever possible and support sustainable practices.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="bg-white border-gray-200 shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
              <CardContent className="p-0">
                <div className="relative">
                  <div className="relative h-96 overflow-hidden">
                    {slideshowImages.map((image, index) => (
                      <div
                        key={index}
                        className={`absolute inset-0 transition-all duration-1000 ${
                          index === currentSlide ? "opacity-100 scale-100" : "opacity-0 scale-105"
                        }`}
                      >
                        <Image
                          src={image.src || "/placeholder.svg"}
                          alt={image.alt}
                          width={600}
                          height={400}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                          <p className="text-white text-sm font-medium leading-relaxed">
                            {image.caption.replace("80th birthday cake", "60th birthday cake")}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={prevSlide}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg transition-all duration-200 hover:scale-110"
                  >
                    <ChevronLeft className="h-6 w-6 text-amber-900" />
                  </button>
                  <button
                    onClick={nextSlide}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg transition-all duration-200 hover:scale-110"
                  >
                    <ChevronRight className="h-6 w-6 text-amber-900" />
                  </button>

                  <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {slideshowImages.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-200 ${
                          index === currentSlide ? "bg-white scale-125" : "bg-white/50"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div
          ref={(el) => (sectionRefs.current[1] = el)}
          data-section="1"
          className={`mb-16 transition-all duration-1000 delay-200 ${
            visibleSections.has(1) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Updated "What Makes Us Special" heading with Stanley's pink gradient */}
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-pink-600 to-orange-500 bg-clip-text text-transparent text-center mb-12 font-serif">
            What Makes Us Special
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="bg-gradient-to-br from-white to-pink-50/20 border-pink-200 shadow-lg text-center hover:shadow-xl transition-all duration-300 border-2 hover:border-pink-300">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Heart className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-pink-700 mb-3 font-serif">Made with Love</h3>
                <p className="text-pink-600 leading-relaxed">
                  Every cake is crafted with genuine care and attention, using only the finest ingredients and
                  time-honored techniques.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-white to-yellow-50/20 border-yellow-200 shadow-lg text-center hover:shadow-xl transition-all duration-300 border-2 hover:border-yellow-300">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Award className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-orange-700 mb-3 font-serif">Award-Winning Quality</h3>
                <p className="text-orange-600 leading-relaxed">
                  Recognized for excellence in both taste and design, our cakes have won hearts and awards throughout
                  the community.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-white to-pink-50/20 border-pink-200 shadow-lg text-center hover:shadow-xl transition-all duration-300 border-2 hover:border-pink-300">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-orange-400 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-pink-700 mb-3 font-serif">Community Focused</h3>
                <p className="text-pink-600 leading-relaxed">
                  We're proud to be part of your celebrations, from intimate gatherings to grand occasions that bring
                  people together.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-white to-yellow-50/20 border-yellow-200 shadow-lg text-center hover:shadow-xl transition-all duration-300 border-2 hover:border-yellow-300">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Clock className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-orange-700 mb-3 font-serif">Always Fresh</h3>
                <p className="text-orange-600 leading-relaxed text-sm">
                  We bake fresh daily and never compromise on quality, ensuring every bite is as perfect as the first.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        <div
          ref={(el) => (sectionRefs.current[2] = el)}
          data-section="2"
          className={`text-center transition-all duration-1000 delay-400 ${
            visibleSections.has(2) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Updated "Meet Our Sweet Team" heading with Stanley's pink gradient */}
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-pink-600 to-orange-500 bg-clip-text text-transparent mb-8 font-serif">
            Meet Our Sweet Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="bg-gradient-to-br from-white to-pink-50/20 border-pink-200 shadow-lg hover:shadow-xl transition-all duration-300 border-2 hover:border-pink-300">
              <CardContent className="p-6 text-center">
                {/* Updated team member image border with Stanley's gradient colors */}
                <div className="w-40 h-40 rounded-full mx-auto mb-4 overflow-hidden border-4 border-pink-400 hover:border-pink-500 transition-all duration-300 shadow-lg">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-08-13%20at%2011.19.42_530d56d5.jpg-VhGy1cz3ZKYWYGlqrRwPPkK00vogLC.jpeg"
                    alt="Sifiso Stanley Linda - Founder and Master Baker"
                    width={160}
                    height={160}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold text-pink-700 mb-2 font-serif">Sifiso Stanley Linda</h3>
                <p className="text-pink-600 font-medium mb-3">Founder & Master Baker</p>
                <p className="text-pink-600 leading-relaxed text-sm">
                  The creative force behind our handcrafted treats, combining tradition with artistry.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-white to-yellow-50/20 border-yellow-200 shadow-lg hover:shadow-xl transition-all duration-300 border-2 hover:border-yellow-300">
              <CardContent className="p-6 text-center">
                {/* Updated team member image border with Stanley's gradient colors */}
                <div className="w-40 h-40 rounded-full mx-auto mb-4 overflow-hidden border-4 border-yellow-400 hover:border-yellow-500 transition-all duration-300 shadow-lg">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-08-13%20at%2011.19.42_f23bb3dc.jpg-8si4hK32ygHttoOTIjjy1NdUUuJiph.jpeg"
                    alt="Noluvuyo Linda - Manager"
                    width={160}
                    height={160}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold text-orange-700 mb-2 font-serif">Noluvuyo Linda</h3>
                <p className="text-orange-600 font-medium mb-3">Co-founder & Manager</p>
                <p className="text-orange-600 leading-relaxed text-sm">
                  Ensuring every detail runs smoothly so our customers always leave with a smile.
                </p>
              </CardContent>
            </Card>
          </div>
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
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 6.988 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
          </svg>
        </a>
      </div>

      <div className="bg-gradient-to-r from-pink-50 to-orange-50 py-12 mt-16">
        <div className="container mx-auto px-3 text-center">
          {/* Updated "Ready to Order Your Perfect Cake?" heading with Stanley's pink gradient */}
          <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-pink-600 to-orange-500 bg-clip-text text-transparent mb-4 font-serif">
            Ready to Order Your Perfect Cake?
          </h2>
          <p className="text-pink-600 mb-6 max-w-2xl mx-auto">
            Browse our full menu and place your order today. We can't wait to create something special for you!
          </p>
          <Link href="/cakes">
            <Button className="bg-gradient-to-r from-pink-500 to-orange-400 hover:from-pink-600 hover:to-orange-500 text-white font-bold py-3 px-8 text-lg rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-pink-400">
              Order Now
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
