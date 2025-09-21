"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Calculator, Truck } from "lucide-react"
import { useCart } from "./CartContext"

interface DeliveryCalculatorProps {
  onDeliveryCostCalculated?: (cost: number) => void
}

export default function DeliveryCalculator({ onDeliveryCostCalculated }: DeliveryCalculatorProps) {
  const { deliveryOption, setDeliveryOption, deliveryAddress, setDeliveryAddress, deliveryCost, setDeliveryCost } =
    useCart()
  const [isCalculating, setIsCalculating] = useState(false)
  const [calculationError, setCalculationError] = useState("")

  const bakeryAddress = "15 Turkmeinistan Cres, Randburg, Gauteng, South Africa"

  const calculateDeliveryDistance = async () => {
    if (!deliveryAddress.trim()) {
      setCalculationError("Please enter a delivery address")
      return
    }

    setIsCalculating(true)
    setCalculationError("")

    try {
      const response = await fetch("/api/calculate-distance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          origin: bakeryAddress,
          destination: deliveryAddress,
        }),
      })

      const data = await response.json()

      if (data.error) {
        setCalculationError(data.error)
        return
      }

      const distanceKm = data.distance / 1000
      let cost = 0

      if (distanceKm <= 5) {
        cost = 50 // R50 for up to 5km
      } else if (distanceKm <= 10) {
        cost = 80 // R80 for 5-10km
      } else if (distanceKm <= 20) {
        cost = 120 // R120 for 10-20km
      } else if (distanceKm <= 30) {
        cost = 180 // R180 for 20-30km
      } else {
        cost = Math.ceil(distanceKm * 8) // R8 per km for longer distances
      }

      setDeliveryCost(cost)
      onDeliveryCostCalculated?.(cost)
    } catch (error) {
      console.error("Error calculating distance:", error)
      setCalculationError("Failed to calculate delivery distance. Please try again.")
    } finally {
      setIsCalculating(false)
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center text-amber-900">
          <Truck className="mr-2 h-5 w-5" />
          Delivery Options
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Delivery Option Selection */}
        <div className="space-y-3">
          <Label className="text-base font-medium text-amber-900">Choose delivery method:</Label>
          <div className="grid grid-cols-2 gap-3">
            <Button
              variant={deliveryOption === "pickup" ? "default" : "outline"}
              onClick={() => {
                setDeliveryOption("pickup")
                setDeliveryCost(0)
              }}
              className="h-auto p-4 flex flex-col items-center"
            >
              <MapPin className="h-6 w-6 mb-2" />
              <span className="font-medium">Pickup</span>
              <span className="text-xs opacity-75">Free</span>
            </Button>
            <Button
              variant={deliveryOption === "delivery" ? "default" : "outline"}
              onClick={() => setDeliveryOption("delivery")}
              className="h-auto p-4 flex flex-col items-center"
            >
              <Truck className="h-6 w-6 mb-2" />
              <span className="font-medium">Delivery</span>
              <span className="text-xs opacity-75">From R50</span>
            </Button>
          </div>
        </div>

        {/* Pickup Information */}
        {deliveryOption === "pickup" && (
          <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
            <h4 className="font-medium text-amber-900 mb-2">Pickup Location:</h4>
            <p className="text-sm text-amber-700">{bakeryAddress}</p>
            <p className="text-xs text-amber-600 mt-2">Pickup available Monday-Saturday: 8:00 AM - 6:00 PM</p>
          </div>
        )}

        {/* Delivery Address Input */}
        {deliveryOption === "delivery" && (
          <div className="space-y-3">
            <Label htmlFor="delivery-address" className="text-base font-medium text-amber-900">
              Delivery Address:
            </Label>
            <div className="flex gap-2">
              <Input
                id="delivery-address"
                placeholder="Enter your full delivery address..."
                value={deliveryAddress}
                onChange={(e) => setDeliveryAddress(e.target.value)}
                className="flex-1"
              />
              <Button onClick={calculateDeliveryDistance} disabled={isCalculating || !deliveryAddress.trim()} size="sm">
                <Calculator className="h-4 w-4 mr-1" />
                {isCalculating ? "Calculating..." : "Calculate"}
              </Button>
            </div>

            {calculationError && <p className="text-sm text-red-600">{calculationError}</p>}

            {deliveryCost > 0 && (
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-green-900">Delivery Cost:</span>
                  <span className="text-lg font-bold text-green-900">R{deliveryCost}</span>
                </div>
                <p className="text-xs text-green-600 mt-1">Delivery within 2-4 hours during business hours</p>
              </div>
            )}

            <div className="text-xs text-amber-600 space-y-1">
              <p>• Delivery rates: R50 (0-5km), R80 (5-10km), R120 (10-20km), R180 (20-30km)</p>
              <p>• Longer distances calculated at R8 per km</p>
              <p>• Delivery available Monday-Saturday: 9:00 AM - 5:00 PM</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
