"use client"

import { useState } from "react"

export default function WhatsAppChatWidget() {
  const [isOpen, setIsOpen] = useState(false)

  const handleWhatsAppClick = () => {
    window.open("https://wa.me/27784914587?text=Hi! I'm interested in ordering a cake from Stanley's Bakery", "_blank")
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Expanded Chat Interface */}
      {isOpen && (
        <div className="mb-4 bg-white rounded-2xl shadow-2xl border-2 border-stanley-pink/20 p-6 w-80 animate-in slide-in-from-bottom-4 duration-300 backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="relative">
              <img
                src="/images/sfiso-bakery-staff.jpg"
                alt="Sfiso - Stanley's Bakery"
                width={50}
                height={50}
                className="rounded-full object-cover border-3 border-stanley-gradient-warm shadow-lg"
              />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-3 border-white animate-pulse shadow-sm"></div>
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-stanley-brown text-lg">Sfiso</h4>
              <p className="text-sm text-stanley-pink font-medium">Stanley's Bakery Expert</p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-stanley-pink transition-colors duration-200 hover:scale-110 transform"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="bg-stanley-gradient-warm rounded-xl p-4 mb-4 shadow-inner">
            <p className="text-sm text-white font-medium leading-relaxed">
              👋 Hi there! I'm Sfiso from Stanley's Bakery.
              <br />
              <br />
              Need help with cake orders or have questions? Chat with me on WhatsApp for instant responses! 🍰✨
            </p>
          </div>

          <button
            onClick={handleWhatsAppClick}
            className="w-full bg-stanley-gradient-primary hover:shadow-xl text-white py-3 px-6 rounded-xl flex items-center justify-center gap-3 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 font-semibold text-base shadow-lg"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
            </svg>
            Chat on WhatsApp
          </button>
        </div>
      )}

      <div
        className="mb-2 bg-white rounded-2xl shadow-xl border-2 border-stanley-pink/30 p-3 flex items-center gap-3 cursor-pointer hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 bg-gradient-to-r from-white to-stanley-yellow/5"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="relative">
          <img
            src="/images/sfiso-bakery-staff.jpg"
            alt="Sfiso - Stanley's Bakery"
            width={56}
            height={56}
            className="rounded-full object-cover border-3 border-stanley-gradient-warm shadow-lg"
          />
          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-3 border-white animate-pulse shadow-lg"></div>
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-bold text-stanley-brown text-base">Sfiso</p>
          <p className="text-sm text-stanley-pink font-medium truncate">Chat with me for instant help! 💬</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-stanley-pink rounded-full animate-pulse shadow-sm"></div>
          <svg className="w-6 h-6 text-green-500 animate-bounce" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
          </svg>
        </div>
      </div>
    </div>
  )
}
