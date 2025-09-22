import { NextResponse } from "next/server"
import { promises as fs } from "fs"
import path from "path"

const DATA_DIR = path.join(process.cwd(), "data")
const ORDERS_FILE = path.join(DATA_DIR, "orders.json")

// Default orders structure
const defaultOrdersData = []

async function ensureDataDir() {
  try {
    await fs.access(DATA_DIR)
  } catch {
    await fs.mkdir(DATA_DIR, { recursive: true })
  }
}

async function loadOrdersData() {
  try {
    await ensureDataDir()
    const data = await fs.readFile(ORDERS_FILE, "utf-8")
    return JSON.parse(data)
  } catch (error) {
    // If file doesn't exist, create it with default data
    await saveOrdersData(defaultOrdersData)
    return defaultOrdersData
  }
}

async function saveOrdersData(data: any) {
  try {
    await ensureDataDir()
    await fs.writeFile(ORDERS_FILE, JSON.stringify(data, null, 2))
  } catch (error) {
    console.error("Failed to save orders data:", error)
    throw error
  }
}

export async function GET() {
  try {
    const ordersData = await loadOrdersData()
    return NextResponse.json(ordersData)
  } catch (error) {
    console.error("Failed to load orders data:", error)
    return NextResponse.json(defaultOrdersData)
  }
}

export async function POST(request: Request) {
  try {
    const updatedOrdersData = await request.json()
    await saveOrdersData(updatedOrdersData)
    return NextResponse.json({ success: true, data: updatedOrdersData })
  } catch (error) {
    console.error("Failed to update orders data:", error)
    return NextResponse.json({ error: "Failed to update orders data" }, { status: 500 })
  }
}
