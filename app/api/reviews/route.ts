import { NextResponse } from "next/server"

export async function GET() {
  try {
    const SHEET_ID = "11v8b910JYkKajZmtIyKhMDTrvcccbtfizT_NaGTqiCk"
    const POSSIBLE_SHEET_NAMES = ["Form Responses 1", "Form responses 1", "Sheet1", "Responses"]
    const API_KEY = process.env.GOOGLE_SHEETS_API_KEY

    if (!API_KEY) {
      console.log("[v0] Google Sheets API key not found")
      return NextResponse.json({ reviews: [] })
    }

    console.log("[v0] Fetching reviews from Google Sheets")

    let data = null
    let successfulSheetName = null

    for (const sheetName of POSSIBLE_SHEET_NAMES) {
      try {
        const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${encodeURIComponent(sheetName)}?key=${API_KEY}`
        const response = await fetch(url)

        if (response.ok) {
          data = await response.json()
          successfulSheetName = sheetName
          console.log(`[v0] Successfully fetched from sheet: ${sheetName}`)
          break
        } else {
          console.log(`[v0] Failed to fetch from sheet "${sheetName}": ${response.status}`)
        }
      } catch (error) {
        console.log(`[v0] Error trying sheet "${sheetName}":`, error)
        continue
      }
    }

    if (!data) {
      console.log("[v0] Failed to fetch from any sheet name")
      return NextResponse.json({ reviews: [] })
    }

    console.log("[v0] Raw Google Sheets data:", data)

    if (!data.values || data.values.length <= 1) {
      console.log("[v0] No review data found in spreadsheet")
      return NextResponse.json({ reviews: [] })
    }

    const headers = data.values[0] || []
    console.log("[v0] Sheet headers:", headers)

    const reviews = data.values
      .slice(1)
      .filter((row: string[]) => row && row.length > 0) // Filter out empty rows
      .map((row: string[], index: number) => {
        const timestamp = row[0] || ""
        const name = row[1] || row[2] || "Anonymous" // Try different positions
        const email = row[2] || row[3] || ""
        const occasion = row[3] || row[4] || ""
        const rating = Number.parseInt(row[4] || row[5] || "5") || 5
        const review = row[5] || row[6] || row[1] || "" // Review might be in different positions

        return {
          id: index + 1,
          timestamp,
          name,
          email,
          occasion,
          rating,
          review,
          date: formatDate(timestamp),
          avatar: `/placeholder.svg?height=100&width=100&query=${encodeURIComponent(name)}`,
        }
      })
      .filter((review) => review.review && review.review.trim().length > 0) // Only include reviews with content
      .reverse() // Show newest first

    console.log("[v0] Processed reviews:", reviews.length)
    console.log("[v0] Sample review:", reviews[0])
    return NextResponse.json({ reviews })
  } catch (error) {
    console.error("[v0] Error fetching reviews:", error)
    return NextResponse.json({ reviews: [] })
  }
}

function formatDate(timestamp: string): string {
  if (!timestamp) return "Recently"

  try {
    const date = new Date(timestamp)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 1) return "1 day ago"
    if (diffDays < 7) return `${diffDays} days ago`
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`
    return `${Math.ceil(diffDays / 30)} months ago`
  } catch {
    return "Recently"
  }
}
