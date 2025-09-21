import { type NextRequest, NextResponse } from "next/server"

interface ConfirmPaymentRequest {
  paymentId: string
  paymentMethod: {
    type: "card"
    card: {
      number: string
      expiry_month: number
      expiry_year: number
      cvc: string
      name: string
    }
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: ConfirmPaymentRequest = await request.json()

    // Validate required fields
    if (!body.paymentId || !body.paymentMethod) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // For development/testing, we'll simulate the Yoco payment confirmation
    // In production, you would make the actual API call to Yoco
    const simulatedConfirmationResponse = {
      id: body.paymentId,
      status: "succeeded",
      amount: 0, // This would come from the original payment intent
      currency: "ZAR",
      payment_method: {
        id: `pm_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        type: "card",
        card: {
          brand: "visa", // This would be determined by Yoco
          last4: body.paymentMethod.card.number.slice(-4),
          exp_month: body.paymentMethod.card.expiry_month,
          exp_year: body.paymentMethod.card.expiry_year,
        },
      },
      receipt_url: `https://pay.yoco.com/receipt/${body.paymentId}`,
      created: new Date().toISOString(),
    }

    // Log the payment confirmation for debugging
    console.log("[v0] Yoco payment confirmed:", {
      paymentId: body.paymentId,
      status: simulatedConfirmationResponse.status,
    })

    return NextResponse.json({
      success: true,
      payment: simulatedConfirmationResponse,
    })
  } catch (error) {
    console.error("[v0] Yoco payment confirmation failed:", error)
    return NextResponse.json({ error: "Payment confirmation failed" }, { status: 500 })
  }
}
