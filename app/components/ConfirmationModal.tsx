"use client"

import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useCart } from "./CartContext"

export default function ConfirmationModal() {
  const { showConfirmation, setShowConfirmation } = useCart()

  if (!showConfirmation) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white border-amber-200 shadow-xl">
        <CardContent className="p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="h-8 w-8 text-green-600" />
          </div>

          <h3 className="text-xl font-bold text-amber-900 mb-2">Success!</h3>
          <p className="text-amber-700 mb-6">Item added successfully.</p>

          <Button
            onClick={() => setShowConfirmation(false)}
            className="bg-yellow-500 hover:bg-yellow-600 text-amber-900 font-bold px-8"
          >
            OK
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
