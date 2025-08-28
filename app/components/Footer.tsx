import Link from "next/link"
import { Instagram, Facebook, Clock, MapPin, Phone, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Footer() {
  return (
    <footer className="bg-amber-50 border-t border-amber-100">
      <div className="container mx-auto px-4 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Brand */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-pink-200 to-amber-200 rounded-full flex items-center justify-center">
                <span className="text-amber-800 font-bold text-base sm:text-lg">S</span>
              </div>
              <h3 className="font-dancing-script text-xl sm:text-2xl font-bold text-amber-800">Stanley's Bakery</h3>
            </Link>
            <p className="text-amber-700 mb-4 max-w-md text-sm sm:text-base">
              Creating beautiful, delicious cakes that bring families together and make celebrations truly special.
              Every cake is made with love and artistry.
            </p>
            <div className="flex space-x-3 sm:space-x-4">
              <Button
                variant="outline"
                size="icon"
                className="border-amber-200 hover:bg-pink-50 bg-transparent h-8 w-8 sm:h-10 sm:w-10"
              >
                <Instagram className="h-3 w-3 sm:h-4 sm:w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="border-amber-200 hover:bg-pink-50 bg-transparent h-8 w-8 sm:h-10 sm:w-10"
              >
                <Facebook className="h-3 w-3 sm:h-4 sm:w-4" />
              </Button>
            </div>
          </div>

          {/* Business Hours */}
          <div>
            <h4 className="font-semibold text-amber-800 mb-3 sm:mb-4 flex items-center text-sm sm:text-base">
              <Clock className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
              Business Hours
            </h4>
            <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-amber-700">
              <div className="flex justify-between">
                <span>Monday - Sunday</span>
                <span>9:00 AM - 6:30 PM</span>
              </div>
            </div>
          </div>

          {/* Contact & Newsletter */}
          <div>
            <h4 className="font-semibold text-amber-800 mb-3 sm:mb-4 text-sm sm:text-base">Stay Connected</h4>
            <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-amber-700 mb-4">
              <div className="flex items-center">
                <Phone className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                <span>+27 10 335 1169</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                <span className="break-all">orders@stanleysbakery.co.za</span>
              </div>
              <div className="flex items-start">
                <MapPin className="h-3 w-3 sm:h-4 sm:w-4 mr-2 mt-0.5" />
                <span>
                  15 Turkmeinistan Cres
                  <br />
                  Randburg, Gauteng
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-amber-200 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center text-xs sm:text-sm text-amber-600">
          <p>&copy; 2024 Stanley's Bakery. All rights reserved. Made with ❤️ and lots of sugar.</p>
        </div>
      </div>
    </footer>
  )
}
