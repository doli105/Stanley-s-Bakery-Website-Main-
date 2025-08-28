import type React from "react"
import type { Metadata } from "next"
import { Inter, Dancing_Script } from "next/font/google"
import "./globals.css"
import Header from "./components/Header"
import Footer from "./components/Footer"
import { CartProvider } from "./components/CartContext"
import ConfirmationModal from "./components/ConfirmationModal"

const inter = Inter({ subsets: ["latin"] })
const dancingScript = Dancing_Script({
  subsets: ["latin"],
  variable: "--font-dancing-script",
})

export const metadata: Metadata = {
  title: "Stanley's Bakery - Artisan Cakes & Sweet Creations",
  description:
    "Create your dream cake with Stanley's Bakery. Wedding cakes, birthday cakes, and custom designs made with love.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${dancingScript.variable}`}>
        <CartProvider>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
            <ConfirmationModal />
          </div>
        </CartProvider>
      </body>
    </html>
  )
}
