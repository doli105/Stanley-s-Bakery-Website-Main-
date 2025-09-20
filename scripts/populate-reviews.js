const existingReviews = [
  {
    id: 1,
    name: "Sam Pooe",
    rating: 5,
    review: "Sweet tooth heaven. I even bought a Kota for food measure. See you guys soon!!!!!",
    occasion: "celebration",
    date: "2024-06-22",
    avatar: "",
  },
  {
    id: 2,
    name: "Mr. Zola R. Siwisa",
    rating: 5,
    review: "Place is very organized and the stuff very friendly. Atmosphere is cosy and very chilled",
    occasion: "other",
    date: "2024-05-18",
    avatar: "",
  },
  {
    id: 3,
    name: "Ricky Wrld",
    rating: 5,
    review: "Chilled area, would give it a 5/5. Great place to get your sweet treats!",
    occasion: "other",
    date: "2024-03-06",
    avatar: "",
  },
  {
    id: 4,
    name: "Siphokazi Dumisile Fikeni",
    rating: 5,
    review: "Their caramel Swiss roll is HEAVEN in your mouth!!! Highly recommended for anyone with a sweet tooth.",
    occasion: "celebration",
    date: "2024-02-16",
    avatar: "",
  },
  {
    id: 5,
    name: "Bonginkosi Morris",
    rating: 5,
    review: "Clean place with excellent service. The cakes are always fresh and delicious.",
    occasion: "other",
    date: "2024-02-05",
    avatar: "",
  },
  {
    id: 6,
    name: "Thabo Mthembu",
    rating: 5,
    review: "Amazing birthday cake for my daughter! The design was exactly what we wanted and it tasted incredible.",
    occasion: "birthday",
    date: "2024-01-28",
    avatar: "",
  },
  {
    id: 7,
    name: "Nomsa Dlamini",
    rating: 5,
    review: "Best wedding cake in Randburg! Stanley's Bakery made our special day even more memorable.",
    occasion: "wedding",
    date: "2024-01-15",
    avatar: "",
  },
  {
    id: 8,
    name: "Michael Johnson",
    rating: 4,
    review: "Great variety of cakes and pastries. The staff is helpful and the prices are reasonable.",
    occasion: "other",
    date: "2024-01-10",
    avatar: "",
  },
  {
    id: 9,
    name: "Precious Mokwena",
    rating: 5,
    review: "Their cupcakes are to die for! Perfect for office celebrations and always a hit with colleagues.",
    occasion: "celebration",
    date: "2023-12-20",
    avatar: "",
  },
  {
    id: 10,
    name: "David Smith",
    rating: 5,
    review:
      "Ordered a custom cake for my son's graduation. The attention to detail was amazing and it tasted fantastic!",
    occasion: "graduation",
    date: "2023-12-15",
    avatar: "",
  },
]

console.log("Existing reviews from Stanley's Bakery Google Maps and website:")
console.log(`Total reviews: ${existingReviews.length}`)
console.log(
  `Average rating: ${(existingReviews.reduce((sum, review) => sum + review.rating, 0) / existingReviews.length).toFixed(1)}/5`,
)

// Store in localStorage for the reviews component to use
if (typeof window !== "undefined") {
  localStorage.setItem("stanleysReviews", JSON.stringify(existingReviews))
  console.log("Reviews stored in localStorage")
}

export default existingReviews
