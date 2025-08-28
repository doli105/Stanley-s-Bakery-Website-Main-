import { Instagram } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

const instagramPosts = [
  {
    id: 1,
    image: "/placeholder.svg?height=300&width=300",
    alt: "Pink birthday cake",
  },
  {
    id: 2,
    image: "/placeholder.svg?height=300&width=300",
    alt: "Behind the scenes cake making",
  },
  {
    id: 3,
    image: "/placeholder.svg?height=300&width=300",
    alt: "Colorful cupcake display",
  },
  {
    id: 4,
    image: "/placeholder.svg?height=300&width=300",
    alt: "Cake decorating process",
  },
  {
    id: 5,
    image: "/placeholder.svg?height=300&width=300",
    alt: "Elegant white wedding cake",
  },
  {
    id: 6,
    image: "/placeholder.svg?height=300&width=300",
    alt: "Kids themed birthday cake",
  },
]

export default function InstagramFeed() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-amber-900 mb-4">
            Follow Our <span className="font-dancing-script text-pink-600">Sweet Journey</span>
          </h2>
          <p className="text-amber-700 mb-6">Get inspired by our latest creations on Instagram</p>
          <Button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600">
            <Instagram className="mr-2 h-5 w-5" />
            Follow @stanleysbakery
          </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {instagramPosts.map((post) => (
            <div key={post.id} className="group relative overflow-hidden rounded-lg aspect-square">
              <Image
                src={post.image || "/placeholder.svg"}
                alt={post.alt}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                <Instagram className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
