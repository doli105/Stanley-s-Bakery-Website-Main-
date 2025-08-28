import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { origin, destination } = await request.json()

    if (!origin || !destination) {
      return NextResponse.json({ error: "Origin and destination are required" }, { status: 400 })
    }

    const apiKey = process.env.GOOGLE_MAPS_API_KEY

    if (!apiKey) {
      return NextResponse.json({ error: "Google Maps API key not configured" }, { status: 500 })
    }

    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&units=metric&key=${apiKey}`

    const response = await fetch(url)
    const data = await response.json()

    if (data.status !== "OK") {
      return NextResponse.json({ error: "Failed to calculate distance" }, { status: 500 })
    }

    const element = data.rows[0]?.elements[0]

    if (!element || element.status !== "OK") {
      return NextResponse.json({ error: "Could not find route between addresses" }, { status: 400 })
    }

    return NextResponse.json({
      distance: element.distance.value, // Distance in meters
      duration: element.duration.value, // Duration in seconds
      distanceText: element.distance.text,
      durationText: element.duration.text,
    })
  } catch (error) {
    console.error("Distance calculation error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
