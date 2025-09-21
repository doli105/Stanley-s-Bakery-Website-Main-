import { type NextRequest, NextResponse } from "next/server"

interface PaymentRequest {
  amount: number // Amount in cents (ZAR)
  currency: string
  metadata: {
    orderNumber: string
    customerName: string
    customerEmail: string
    items: Array<{
      name: string
      quantity: number
      price: number
    }>
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: PaymentRequest = await request.json()

    // Validate required fields
    if (!body.amount || !body.currency || !body.metadata) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Convert amount to cents for Yoco API
    const amountInCents = Math.round(body.amount * 100)

    // Prepare Yoco payment request
    const yocoPayload = {
      amount: amountInCents,
      currency: body.currency,
      metadata: {
        orderNumber: body.metadata.orderNumber,
        customerName: body.metadata.customerName,
        customerEmail: body.metadata.customerEmail,
        itemCount: body.metadata.items.length,
        // Add additional metadata as needed
      },
    }

    // For development/testing, we'll simulate the Yoco API response
    // In production, you would make the actual API call to Yoco
    const simulatedYocoResponse = {
      id: `pi_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      amount: amountInCents,
      currency: body.currency,
      status: "requires_payment_method",
      client_secret: `pi_${Date.now()}_secret_${Math.random().toString(36).substr(2, 16)}`,
      metadata: yocoPayload.metadata,
      created: new Date().toISOString(),
    }

    // Log the payment creation for debugging
    console.log("[v0] Yoco payment created:", {
      paymentId: simulatedYocoResponse.id,
      amount: body.amount,
      orderNumber: body.metadata.orderNumber,
    })

    return NextResponse.json({
      success: true,
      payment: simulatedYocoResponse,
    })
  } catch (error) {
    console.error("[v0] Yoco payment creation failed:", error)
    return NextResponse.json({ error: "Payment creation failed" }, { status: 500 })
  }
}
