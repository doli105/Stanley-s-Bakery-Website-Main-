"use client"

import { MessageCircle } from "lucide-react"
import { useState } from "react"

export default function FloatingWhatsApp() {
  const [isHovered, setIsHovered] = useState(false)

  const handleWhatsAppClick = () => {
    const whatsappNumber = "27784914587"
    const message =
      "Hi! I'm interested in ordering a cake from Stanley's Bakery. Could you please help me with more information?"
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  return (
    <button
      onClick={handleWhatsAppClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 animate-bounce"
      title="Chat on WhatsApp"
    >
      <MessageCircle className="h-6 w-6" />
      {isHovered && (
        <div className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-gray-800 text-white text-sm rounded-lg whitespace-nowrap">
          Chat with us!
        </div>
      )}
    </button>
  )
}
