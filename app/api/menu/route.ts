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
        items: [
          {
            id: "bento-pink-birthday",
            name: "Pink Birthday Bento Cake",
            description:
              "Adorable mini cake perfect for intimate celebrations. Decorated with pink frosting and birthday wishes.",
            basePrice: 150,
            image: "/pink-birthday-bento-cake.jpg",
            sizes: [
              { name: "Mini (4 inch)", price: 150, serves: "2-3 people" },
              { name: "Small (6 inch)", price: 250, serves: "4-6 people" },
            ],
            flavors: ["Vanilla", "Chocolate", "Red Velvet", "Strawberry"],
            customizable: true,
            inStock: true,
          },
          {
            id: "bento-chocolate-love",
            name: "Chocolate Love Bento",
            description: "Rich chocolate bento cake with heart decorations, perfect for expressing your love.",
            basePrice: 160,
            image: "/chocolate-heart-bento-cake.jpg",
            sizes: [{ name: "Mini (4 inch)", price: 160, serves: "2-3 people" }],
            flavors: ["Dark Chocolate", "Milk Chocolate", "White Chocolate"],
            customizable: true,
            inStock: true,
          },
          {
            id: "bento-floral-delight",
            name: "Floral Delight Bento",
            description: "Elegant bento cake adorned with beautiful buttercream flowers.",
            basePrice: 180,
            image: "/floral-buttercream-bento-cake.jpg",
            sizes: [{ name: "Mini (4 inch)", price: 180, serves: "2-3 people" }],
            flavors: ["Vanilla", "Lemon", "Earl Grey"],
            customizable: true,
            inStock: true,
          },
        ],
      },
      "heart-shaped-cakes": {
        name: "Heart Shaped Cakes",
        items: [
          {
            id: "heart-red-velvet",
            name: "Red Velvet Heart Cake",
            description: "Classic red velvet cake in a romantic heart shape with cream cheese frosting.",
            basePrice: 350,
            image: "/red-velvet-heart-shaped-cake.jpg",
            sizes: [
              { name: "Small (8 inch)", price: 350, serves: "8-10 people" },
              { name: "Medium (10 inch)", price: 500, serves: "12-15 people" },
            ],
            flavors: ["Red Velvet"],
            customizable: true,
            inStock: true,
          },
          {
            id: "heart-strawberry-dream",
            name: "Strawberry Dream Heart",
            description: "Light and fluffy strawberry cake with fresh strawberry filling and pink frosting.",
            basePrice: 380,
            image: "/strawberry-heart-shaped-cake-pink.jpg",
            sizes: [
              { name: "Small (8 inch)", price: 380, serves: "8-10 people" },
              { name: "Medium (10 inch)", price: 550, serves: "12-15 people" },
            ],
            flavors: ["Strawberry", "Vanilla Strawberry"],
            customizable: true,
            inStock: true,
          },
        ],
      },
      "car-lovers-cakes": {
        name: "Car Lovers Cakes",
        items: [
          {
            id: "car-racing-cake",
            name: "Racing Car Cake",
            description: "Exciting racing car themed cake perfect for car enthusiasts and speed lovers.",
            basePrice: 450,
            image: "/racing-car-birthday-cake.jpg",
            sizes: [
              { name: "Medium (8 inch)", price: 450, serves: "10-12 people" },
              { name: "Large (10 inch)", price: 650, serves: "15-20 people" },
            ],
            flavors: ["Chocolate", "Vanilla", "Marble"],
            customizable: true,
            inStock: true,
          },
        ],
      },
      "fairyland-cakes": {
        name: "Fairyland Cakes",
        items: [
          {
            id: "fairy-princess-castle",
            name: "Princess Castle Cake",
            description: "Magical castle cake with turrets, perfect for little princesses and fairy tale dreams.",
            basePrice: 550,
            image: "/princess-castle-birthday-cake.jpg",
            sizes: [
              { name: "Medium (8 inch)", price: 550, serves: "12-15 people" },
              { name: "Large (10 inch)", price: 750, serves: "18-22 people" },
            ],
            flavors: ["Vanilla", "Strawberry", "Funfetti"],
            customizable: true,
            inStock: true,
          },
          {
            id: "fairy-unicorn-dream",
            name: "Unicorn Dream Cake",
            description: "Enchanting unicorn cake with rainbow colors and magical decorations.",
            basePrice: 500,
            image: "/unicorn-rainbow-birthday-cake.jpg",
            sizes: [
              { name: "Medium (8 inch)", price: 500, serves: "12-15 people" },
              { name: "Large (10 inch)", price: 700, serves: "18-22 people" },
            ],
            flavors: ["Vanilla", "Funfetti", "Cotton Candy"],
            customizable: true,
            inStock: true,
          },
        ],
      },
      "mickey-mouse-cakes": {
        name: "Mickey Mouse Cakes",
        items: [
          {
            id: "mickey-classic",
            name: "Classic Mickey Mouse Cake",
            description: "Iconic Mickey Mouse design cake that brings Disney magic to your celebration.",
            basePrice: 480,
            image: "/mickey-mouse-birthday-cake.jpg",
            sizes: [
              { name: "Medium (8 inch)", price: 480, serves: "10-12 people" },
              { name: "Large (10 inch)", price: 680, serves: "15-20 people" },
            ],
            flavors: ["Chocolate", "Vanilla", "Marble"],
            customizable: true,
            inStock: true,
          },
        ],
      },
      "wedding-cakes": {
        name: "Wedding Cakes",
        items: [
          {
            id: "wedding-elegant-white",
            name: "Elegant White Wedding Cake",
            description: "Stunning multi-tier white wedding cake with elegant decorations and fresh flowers.",
            basePrice: 1500,
            priceRange: "1500-3500",
            image: "/elegant-white-wedding-cake-tiers.jpg",
            sizes: [
              { name: "2 Tier", price: 1500, serves: "40-50 people" },
              { name: "3 Tier", price: 2200, serves: "70-80 people" },
              { name: "4 Tier", price: 3500, serves: "100-120 people" },
            ],
            flavors: ["Vanilla", "Chocolate", "Red Velvet", "Lemon", "Almond"],
            customizable: true,
            inStock: true,
          },
          {
            id: "wedding-rustic-naked",
            name: "Rustic Naked Wedding Cake",
            description: "Beautiful semi-naked cake with fresh berries and flowers for a rustic wedding theme.",
            basePrice: 1400,
            priceRange: "1400-3200",
            image: "/rustic-naked-wedding-cake-berries.jpg",
            sizes: [
              { name: "2 Tier", price: 1400, serves: "40-50 people" },
              { name: "3 Tier", price: 2000, serves: "70-80 people" },
              { name: "4 Tier", price: 3200, serves: "100-120 people" },
            ],
            flavors: ["Vanilla", "Lemon", "Almond", "Carrot"],
            customizable: true,
            inStock: true,
          },
        ],
      },
      "milestone-cakes": {
        name: "Milestone Cakes",
        items: [
          {
            id: "milestone-50th-gold",
            name: "Golden 50th Birthday Cake",
            description: "Luxurious gold-themed cake perfect for celebrating 50 years of life.",
            basePrice: 550,
            image: "/golden-50th-birthday-cake-elegant.jpg",
            sizes: [
              { name: "Medium (8 inch)", price: 550, serves: "12-15 people" },
              { name: "Large (10 inch)", price: 750, serves: "18-22 people" },
            ],
            flavors: ["Chocolate", "Vanilla", "Red Velvet"],
            customizable: true,
            inStock: true,
          },
          {
            id: "milestone-21st-celebration",
            name: "21st Birthday Celebration Cake",
            description: "Fun and festive cake design perfect for celebrating coming of age.",
            basePrice: 450,
            image: "/21st-birthday-celebration-cake.jpg",
            sizes: [
              { name: "Medium (8 inch)", price: 450, serves: "12-15 people" },
              { name: "Large (10 inch)", price: 600, serves: "18-22 people" },
            ],
            flavors: ["Chocolate", "Vanilla", "Funfetti"],
            customizable: true,
            inStock: true,
          },
        ],
      },
      "baby-shower-cakes": {
        name: "Baby Shower Cakes",
        items: [
          {
            id: "baby-shower-blue",
            name: "Baby Boy Shower Cake",
            description: "Adorable blue-themed cake perfect for welcoming a baby boy.",
            basePrice: 400,
            image: "/baby-boy-shower-cake-blue.jpg",
            sizes: [
              { name: "Medium (8 inch)", price: 400, serves: "12-15 people" },
              { name: "Large (10 inch)", price: 550, serves: "18-22 people" },
            ],
            flavors: ["Vanilla", "Lemon", "Almond"],
            customizable: true,
            inStock: true,
          },
          {
            id: "baby-shower-pink",
            name: "Baby Girl Shower Cake",
            description: "Sweet pink-themed cake perfect for welcoming a baby girl.",
            basePrice: 400,
            image: "/baby-girl-shower-cake-pink.jpg",
            sizes: [
              { name: "Medium (8 inch)", price: 400, serves: "12-15 people" },
              { name: "Large (10 inch)", price: 550, serves: "18-22 people" },
            ],
            flavors: ["Vanilla", "Strawberry", "Lemon"],
            customizable: true,
            inStock: true,
          },
        ],
      },
      "novelty-themed-cakes": {
        name: "Novelty Themed Cakes",
        items: [
          {
            id: "novelty-superhero",
            name: "Superhero Action Cake",
            description: "Dynamic superhero themed cake perfect for action-packed celebrations.",
            basePrice: 500,
            image: "/placeholder.svg?height=400&width=600",
            sizes: [
              { name: "Medium (8 inch)", price: 500, serves: "12-15 people" },
              { name: "Large (10 inch)", price: 700, serves: "18-22 people" },
            ],
            flavors: ["Chocolate", "Vanilla", "Marble"],
            customizable: true,
            inStock: true,
          },
          {
            id: "novelty-sports",
            name: "Sports Theme Cake",
            description: "Exciting sports-themed cake for the athlete in your life.",
            basePrice: 480,
            image: "/placeholder.svg?height=400&width=600",
            sizes: [
              { name: "Medium (8 inch)", price: 480, serves: "12-15 people" },
              { name: "Large (10 inch)", price: 650, serves: "18-22 people" },
            ],
            flavors: ["Chocolate", "Vanilla", "Marble"],
            customizable: true,
            inStock: true,
          },
        ],
      },
      "corporate-custom-cakes": {
        name: "Corporate & Custom Cakes",
        items: [
          {
            id: "corporate-logo-cake",
            name: "Corporate Logo Cake",
            description: "Professional cake featuring your company logo, perfect for corporate events.",
            basePrice: 600,
            priceRange: "600-1200",
            image: "/placeholder.svg?height=400&width=600",
            sizes: [
              { name: "Medium (8 inch)", price: 600, serves: "12-15 people" },
              { name: "Large (10 inch)", price: 850, serves: "18-22 people" },
              { name: "Extra Large (12 inch)", price: 1200, serves: "25-30 people" },
            ],
            flavors: ["Chocolate", "Vanilla", "Red Velvet"],
            customizable: true,
            inStock: true,
          },
        ],
      },
    },
  },
  "cookies-pastries": {
    name: "Cookies and Pastries",
    subcategories: {
      cookies: {
        name: "Cookies",
        items: [
          {
            id: "cookie-chocolate-chip",
            name: "Classic Chocolate Chip Cookies",
            description: "Freshly baked chocolate chip cookies with gooey chocolate chunks.",
            basePrice: 80,
            image: "/placeholder.svg?height=400&width=600",
            sizes: [
              { name: "6 Pack", price: 80 },
              { name: "12 Pack", price: 150 },
            ],
            flavors: ["Classic Chocolate Chip"],
            customizable: false,
            inStock: true,
          },
          {
            id: "cookie-sugar",
            name: "Decorated Sugar Cookies",
            description: "Soft sugar cookies with beautiful royal icing decorations.",
            basePrice: 100,
            image: "/placeholder.svg?height=400&width=600",
            sizes: [
              { name: "6 Pack", price: 100 },
              { name: "12 Pack", price: 180 },
            ],
            flavors: ["Vanilla", "Almond"],
            customizable: true,
            inStock: true,
          },
        ],
      },
      pastries: {
        name: "Pastries",
        items: [
          {
            id: "pastry-croissant",
            name: "Butter Croissants",
            description: "Flaky, buttery croissants baked fresh daily.",
            basePrice: 25,
            image: "/placeholder.svg?height=400&width=600",
            sizes: [
              { name: "Single", price: 25 },
              { name: "4 Pack", price: 90 },
            ],
            flavors: ["Plain", "Chocolate", "Almond"],
            customizable: false,
            inStock: true,
          },
          {
            id: "pastry-danish",
            name: "Fruit Danish",
            description: "Sweet pastries topped with fresh fruit and cream cheese.",
            basePrice: 30,
            image: "/placeholder.svg?height=400&width=600",
            sizes: [
              { name: "Single", price: 30 },
              { name: "4 Pack", price: 110 },
            ],
            flavors: ["Strawberry", "Blueberry", "Apple"],
            customizable: false,
            inStock: true,
          },
        ],
      },
      donuts: {
        name: "Donuts",
        items: [
          {
            id: "donut-glazed",
            name: "Classic Glazed Donuts",
            description: "Light and fluffy donuts with sweet glaze.",
            basePrice: 20,
            image: "/placeholder.svg?height=400&width=600",
            sizes: [
              { name: "Single", price: 20 },
              { name: "6 Pack", price: 110 },
              { name: "12 Pack", price: 200 },
            ],
            flavors: ["Classic Glazed"],
            customizable: false,
            inStock: true,
          },
          {
            id: "donut-filled",
            name: "Filled Donuts",
            description: "Soft donuts filled with delicious cream or jam.",
            basePrice: 25,
            image: "/placeholder.svg?height=400&width=600",
            sizes: [
              { name: "Single", price: 25 },
              { name: "6 Pack", price: 140 },
            ],
            flavors: ["Vanilla Cream", "Chocolate Cream", "Strawberry Jam"],
            customizable: false,
            inStock: true,
          },
        ],
      },
      muffins: {
        name: "Muffins",
        items: [
          {
            id: "muffin-blueberry",
            name: "Blueberry Muffins",
            description: "Moist muffins bursting with fresh blueberries.",
            basePrice: 30,
            image: "/placeholder.svg?height=400&width=600",
            sizes: [
              { name: "Single", price: 30 },
              { name: "4 Pack", price: 110 },
            ],
            flavors: ["Blueberry"],
            customizable: false,
            inStock: true,
          },
          {
            id: "muffin-chocolate",
            name: "Double Chocolate Muffins",
            description: "Rich chocolate muffins with chocolate chips.",
            basePrice: 35,
            image: "/placeholder.svg?height=400&width=600",
            sizes: [
              { name: "Single", price: 35 },
              { name: "4 Pack", price: 130 },
            ],
            flavors: ["Double Chocolate"],
            customizable: false,
            inStock: true,
          },
        ],
      },
    },
  },
  "regular-treats": {
    name: "Regular treats and desserts",
    subcategories: {
      "roman-cream": {
        name: "Roman Cream",
        items: [
          {
            id: "roman-cream-classic",
            name: "Classic Roman Cream",
            description: "Traditional South African treat with coconut and caramel layers.",
            basePrice: 120,
            image: "/placeholder.svg?height=400&width=600",
            sizes: [
              { name: "Small Tray", price: 120, serves: "6-8 pieces" },
              { name: "Large Tray", price: 220, serves: "12-15 pieces" },
            ],
            flavors: ["Classic Coconut"],
            customizable: false,
            inStock: true,
          },
        ],
      },
      "swiss-rolls": {
        name: "Swiss Rolls",
        items: [
          {
            id: "swiss-roll-chocolate",
            name: "Chocolate Swiss Roll",
            description: "Light chocolate sponge rolled with cream filling.",
            basePrice: 150,
            image: "/placeholder.svg?height=400&width=600",
            sizes: [
              { name: "Small", price: 150, serves: "6-8 slices" },
              { name: "Large", price: 250, serves: "12-15 slices" },
            ],
            flavors: ["Chocolate", "Vanilla", "Strawberry"],
            customizable: false,
            inStock: true,
          },
        ],
      },
      cupcakes: {
        name: "Cupcakes",
        items: [
          {
            id: "cupcake-vanilla",
            name: "Vanilla Cupcakes",
            description: "Classic vanilla cupcakes with buttercream frosting.",
            basePrice: 25,
            image: "/placeholder.svg?height=400&width=600",
            sizes: [
              { name: "Single", price: 25 },
              { name: "6 Pack", price: 140 },
              { name: "12 Pack", price: 260 },
            ],
            flavors: ["Vanilla", "Chocolate", "Red Velvet", "Lemon"],
            customizable: true,
            inStock: true,
          },
          {
            id: "cupcake-decorated",
            name: "Decorated Cupcakes",
            description: "Beautifully decorated cupcakes perfect for special occasions.",
            basePrice: 35,
            image: "/placeholder.svg?height=400&width=600",
            sizes: [
              { name: "Single", price: 35 },
              { name: "6 Pack", price: 200 },
              { name: "12 Pack", price: 380 },
            ],
            flavors: ["Vanilla", "Chocolate", "Red Velvet", "Funfetti"],
            customizable: true,
            inStock: true,
          },
        ],
      },
      brownies: {
        name: "Brownies",
        items: [
          {
            id: "brownie-fudge",
            name: "Fudge Brownies",
            description: "Rich, dense chocolate brownies with a fudgy center.",
            basePrice: 30,
            image: "/placeholder.svg?height=400&width=600",
            sizes: [
              { name: "Single", price: 30 },
              { name: "4 Pack", price: 110 },
              { name: "9 Pack", price: 240 },
            ],
            flavors: ["Classic Fudge", "Walnut", "Peanut Butter"],
            customizable: false,
            inStock: true,
          },
        ],
      },
      cheesecakes: {
        name: "Cheesecakes",
        items: [
          {
            id: "cheesecake-classic",
            name: "Classic New York Cheesecake",
            description: "Creamy, rich cheesecake with graham cracker crust.",
            basePrice: 350,
            image: "/placeholder.svg?height=400&width=600",
            sizes: [
              { name: "Small (6 inch)", price: 350, serves: "6-8 people" },
              { name: "Medium (8 inch)", price: 500, serves: "10-12 people" },
            ],
            flavors: ["Plain", "Strawberry", "Blueberry", "Chocolate"],
            customizable: false,
            inStock: true,
          },
        ],
      },
    },
  },
  "cake-boards": {
    name: "Cake boards",
    subcategories: {
      "round-boards": {
        name: "Round Cake Boards",
        items: [
          {
            id: "board-round-6",
            name: "6 inch Round Cake Board",
            description: "Sturdy round cake board perfect for small cakes.",
            basePrice: 15,
            image: "/placeholder.svg?height=400&width=600",
            sizes: [
              { name: "6 inch", price: 15 },
              { name: "8 inch", price: 20 },
              { name: "10 inch", price: 25 },
              { name: "12 inch", price: 30 },
            ],
            flavors: [],
            customizable: false,
            inStock: true,
          },
        ],
      },
      "square-boards": {
        name: "Square Cake Boards",
        items: [
          {
            id: "board-square-6",
            name: "6 inch Square Cake Board",
            description: "Sturdy square cake board for modern cake designs.",
            basePrice: 15,
            image: "/placeholder.svg?height=400&width=600",
            sizes: [
              { name: "6 inch", price: 15 },
              { name: "8 inch", price: 20 },
              { name: "10 inch", price: 25 },
              { name: "12 inch", price: 30 },
            ],
            flavors: [],
            customizable: false,
            inStock: true,
          },
        ],
      },
      "custom-boards": {
        name: "Custom Cake Boards",
        items: [
          {
            id: "board-custom",
            name: "Custom Shaped Cake Board",
            description: "Custom cake board in any shape to match your cake design.",
            basePrice: 50,
            priceRange: "50-150",
            image: "/placeholder.svg?height=400&width=600",
            sizes: [
              { name: "Small (up to 8 inch)", price: 50 },
              { name: "Medium (up to 12 inch)", price: 80 },
              { name: "Large (up to 16 inch)", price: 150 },
            ],
            flavors: [],
            customizable: true,
            inStock: true,
          },
        ],
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
