import { NextResponse } from "next/server"
import { promises as fs } from "fs"
import path from "path"

const DATA_DIR = path.join(process.cwd(), "data")
const MENU_FILE = path.join(DATA_DIR, "menu.json")

// Default menu structure
const defaultMenuData = {
  "celebration-special-occasion": {
    name: "Celebration and Special Occasion Cakes",
    subcategories: {
      "bento-cakes": {
        name: "Bento Cakes",
        items: [],
      },
      "heart-shaped-cakes": {
        name: "Heart Shaped Cakes",
        items: [],
      },
      "fairyland-cakes": {
        name: "Fairyland Cakes",
        items: [],
      },
      "mickey-mouse-cakes": {
        name: "Mickey Mouse Cakes",
        items: [],
      },
      "wedding-cakes": {
        name: "Wedding Cakes",
        items: [],
      },
      "milestone-cakes": {
        name: "Milestone Cakes",
        items: [],
      },
      "baby-shower-cakes": {
        name: "Baby Shower Cakes",
        items: [],
      },
      "novelty-themed-cakes": {
        name: "Novelty Themed Cakes",
        items: [],
      },
      "corporate-custom-cakes": {
        name: "Corporate & Custom Cakes",
        items: [],
      },
    },
  },
  "cookies-pastries": {
    name: "Cookies and Pastries",
    subcategories: {
      cookies: {
        name: "Cookies",
        items: [],
      },
      pastries: {
        name: "Pastries",
        items: [],
      },
      donuts: {
        name: "Donuts",
        items: [],
      },
      muffins: {
        name: "Muffins",
        items: [],
      },
    },
  },
  "regular-treats": {
    name: "Regular treats and desserts",
    subcategories: {
      "roman-cream": {
        name: "Roman Cream",
        items: [],
      },
      "swiss-rolls": {
        name: "Swiss Rolls",
        items: [],
      },
      cupcakes: {
        name: "Cupcakes",
        items: [],
      },
      brownies: {
        name: "Brownies",
        items: [],
      },
      cheesecakes: {
        name: "Cheesecakes",
        items: [],
      },
    },
  },
  "cake-boards": {
    name: "Cake boards",
    subcategories: {
      "round-boards": {
        name: "Round Cake Boards",
        items: [],
      },
      "square-boards": {
        name: "Square Cake Boards",
        items: [],
      },
      "custom-boards": {
        name: "Custom Cake Boards",
        items: [],
      },
    },
  },
}

async function ensureDataDir() {
  try {
    await fs.access(DATA_DIR)
  } catch {
    await fs.mkdir(DATA_DIR, { recursive: true })
  }
}

async function loadMenuData() {
  try {
    await ensureDataDir()
    const data = await fs.readFile(MENU_FILE, "utf-8")
    return JSON.parse(data)
  } catch (error) {
    // If file doesn't exist, create it with default data
    await saveMenuData(defaultMenuData)
    return defaultMenuData
  }
}

async function saveMenuData(data: any) {
  try {
    await ensureDataDir()
    await fs.writeFile(MENU_FILE, JSON.stringify(data, null, 2))
  } catch (error) {
    console.error("Failed to save menu data:", error)
    throw error
  }
}

export async function GET() {
  try {
    const menuData = await loadMenuData()
    return NextResponse.json(menuData)
  } catch (error) {
    console.error("Failed to load menu data:", error)
    return NextResponse.json(defaultMenuData)
  }
}

export async function POST(request: Request) {
  try {
    const updatedMenuData = await request.json()
    await saveMenuData(updatedMenuData)
    return NextResponse.json({ success: true, data: updatedMenuData })
  } catch (error) {
    console.error("Failed to update menu data:", error)
    return NextResponse.json({ error: "Failed to update menu data" }, { status: 500 })
  }
}
