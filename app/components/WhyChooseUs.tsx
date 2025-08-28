import { Heart, Clock, Award, Users } from "lucide-react"

const features = [
  {
    icon: Heart,
    title: "Made with Love",
    description: "Every cake is crafted with passion and attention to detail",
  },
  {
    icon: Clock,
    title: "Fresh Daily",
    description: "All our cakes are baked fresh daily using premium ingredients",
  },
  {
    icon: Award,
    title: "Award Winning",
    description: "Recognized as the best bakery in the district for 3 years running",
  },
  {
    icon: Users,
    title: "Custom Designs",
    description: "We work with you to create the perfect cake for your special occasion",
  },
]

export default function WhyChooseUs() {
  return (
    <section className="py-12 sm:py-16 bg-gradient-to-br from-amber-50 to-pink-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-amber-900 mb-4">
            Why Choose <span className="font-dancing-script text-pink-600">Stanley's?</span>
          </h2>
          <p className="text-amber-700 max-w-2xl mx-auto text-sm sm:text-base">
            We're not just a bakery - we're cake artists dedicated to making your celebrations unforgettable
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center group">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-md group-hover:shadow-lg transition-shadow">
                <feature.icon className="h-6 w-6 sm:h-8 sm:w-8 text-pink-500" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-amber-900 mb-2">{feature.title}</h3>
              <p className="text-amber-600 text-sm sm:text-base">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
