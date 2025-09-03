"use client"

import { useState, useEffect, useRef } from "react"
import { ArrowLeft, ShoppingCart, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const romanCreamCookies = [
  {
    id: "vanilla",
    name: "Classic Vanilla Roman Cream",
    image: "/images/roman-cream-vanilla.jpg",
    description: "Traditional golden cookies filled with smooth vanilla cream",
  },
  {
    id: "red-velvet",
    name: "Red Velvet Roman Cream",
    image: "/images/roman-cream-red-velvet.jpg",
    description: "Rich red velvet cookies with creamy filling",
  },
  {
    id: "chocolate",
    name: "Chocolate Roman Cream",
    image: "/images/roman-cream-chocolate.jpg",
    description: "Decadent chocolate cookies with chocolate cream filling",
  },
]

const swissRolls = [
  {
    id: "chocolate",
    name: "Chocolate Swiss Roll",
    image: "/images/swiss-roll-chocolate.jpg",
    description: "Rich chocolate sponge rolled with smooth vanilla cream and chocolate drizzle",
  },
  {
    id: "strawberry",
    name: "Strawberry Coconut Swiss Roll",
    image: "/images/swiss-roll-strawberry.jpg",
    description: "Light vanilla sponge with strawberry filling and pink coconut coating",
  },
  {
    id: "chocolate-cream",
    name: "Double Chocolate Swiss Roll",
    image: "/images/swiss-roll-chocolate-cream.jpg",
    description: "Chocolate sponge with white cream filling and chocolate shavings",
  },
  {
    id: "red-velvet",
    name: "Red Velvet Swiss Roll",
    image: "/images/swiss-roll-red-velvet.jpg",
    description: "Classic red velvet sponge with cream cheese filling and red velvet crumbs",
  },
  {
    id: "carrot",
    name: "Carrot Cake Swiss Roll",
    image: "/images/swiss-roll-carrot.jpg",
    description: "Spiced carrot sponge with cream cheese frosting and decorative carrot",
  },
]

const meltingMoments = [
  {
    id: "classic",
    name: "Classic Melting Moments",
    image: "/images/melting-moments-classic.jpg",
    description: "Traditional buttery biscuits with decorative piped patterns and colorful sprinkles",
  },
  {
    id: "container-pack",
    name: "Melting Moments Container Pack",
    image: "/images/melting-moments-container.jpg",
    description: "Convenient container pack of golden melting moments biscuits perfect for sharing",
  },
]

const regularCookies = [
  {
    id: "chocolate-chip",
    name: "Chocolate Chip Cookies",
    image: "/images/cookies-chocolate-chip.jpg",
    description: "Classic golden cookies loaded with rich chocolate chips for the perfect sweet treat",
  },
  {
    id: "sugar",
    name: "Sugar Cookies",
    image: "/images/cookies-sugar.jpg",
    description: "Traditional buttery sugar cookies with a tender crumb and sweet vanilla flavor",
  },
  {
    id: "ginger-snap",
    name: "Ginger Snap Cookies",
    image: "/images/cookies-ginger-snap.jpg",
    description: "Spiced cookies with warm ginger and molasses, featuring a delightfully crackled surface",
  },
]

const snowBalls = [
  {
    id: "pink",
    name: "Pink Coconut Snow Balls",
    image: "/images/snowballs-pink.jpg",
    description: "Delicious cake balls covered in sweet pink coconut flakes for a festive treat",
  },
  {
    id: "white",
    name: "Classic White Snow Balls",
    image: "/images/snowballs-white.jpg",
    description: "Traditional coconut-covered cake balls with fluffy white coconut coating",
  },
]

const cupcakes = [
  {
    id: "vanilla-sprinkles",
    name: "Vanilla Cupcakes with Red Sprinkles",
    image: "/images/cupcakes-vanilla-sprinkles.jpg",
    description: "Elegant vanilla cupcakes topped with swirled buttercream frosting and festive red sprinkles",
  },
  {
    id: "chocolate",
    name: "Chocolate Buttercream Cupcakes",
    image: "/images/cupcakes-chocolate.jpg",
    description: "Rich chocolate or mocha flavored cupcakes with beautifully piped chocolate buttercream rosettes",
  },
  {
    id: "vanilla-chocolate",
    name: "Vanilla Cupcakes with Chocolate Centers",
    image: "/images/cupcakes-vanilla-chocolate.jpg",
    description: "Classic vanilla cupcakes with smooth buttercream frosting and chocolate piece centers",
  },
]

const pastries = [
  {
    id: "petit-fours",
    name: "Chocolate Petit Fours",
    image: "/images/pastry-petit-fours.jpg",
    description: "Elegant mini chocolate cakes with white fondant drizzle in decorative patterns",
  },
  {
    id: "baklava",
    name: "Honey Baklava",
    image: "/images/pastry-baklava.jpg",
    description: "Traditional layered pastry with nuts and honey syrup, cut into perfect squares",
  },
  {
    id: "scones",
    name: "Fresh Baked Scones",
    image: "/images/pastry-scones.jpg",
    description: "Golden, flaky scones with a buttery texture, perfect for any time of day",
  },
  {
    id: "mini-cake",
    name: "Designer Mini Cake",
    image: "/images/pastry-mini-cake.jpg",
    description: "Instagram-worthy mini cake with pink drip glaze, meringue, macaron, and colorful sprinkles",
  },
  {
    id: "donuts",
    name: "Gourmet Donuts",
    image: "/images/pastry-donuts.jpg",
    description: "Assorted glazed donuts with chocolate, strawberry, caramel, and vanilla toppings",
  },
]

const bentoCakes = [
  {
    id: "black-gold",
    name: "Black & Gold Elegance Bento",
    image: "/images/bento-black-gold.jpg",
    description:
      "Sophisticated black buttercream with gold accents, featuring personalized messages and calendar designs",
  },
  {
    id: "pink-white",
    name: "Pink & White Birthday Bento",
    image: "/images/bento-pink-white.jpg",
    description: "Elegant pink and white themed bento with pearl decorations, perfect for milestone birthdays",
  },
  {
    id: "cream-gold",
    name: "Cream & Gold Royal Bento",
    image: "/images/bento-cream-gold.jpg",
    description: "Luxurious cream buttercream with red floral accents and gold crown decorations",
  },
  {
    id: "humor-25th",
    name: "Humorous 25th Birthday Bento",
    image: "/images/bento-humor-25th.jpg",
    description: "Fun and playful bento with cartoon characters and witty birthday messages",
  },
  {
    id: "pink-birthday",
    name: "Vibrant Pink Birthday Bento",
    image: "/images/bento-pink-birthday.jpg",
    description: "Bold pink rose wreath design with gold script lettering for festive celebrations",
  },
]

const heartShapedCakes = [
  {
    id: "personalized",
    name: "Personalized Photo Heart Cake",
    image: "/images/heart-cake-personalized.jpg",
    description: "Elegant white heart cake with photo prints, black ribbon bows, and personalized birthday message",
  },
  {
    id: "gold-crown",
    name: "Royal Gold Crown Heart Cake",
    image: "/images/heart-cake-gold-crown.jpg",
    description: "Luxurious white heart cake with gold script lettering, pearl details, and golden crown topper",
  },
  {
    id: "red-calendar",
    name: "Red Calendar Heart Cake",
    image: "/images/heart-cake-red-calendar.jpg",
    description: "Vibrant red heart cake with August 2024 calendar design and white pearl decorations",
  },
  {
    id: "pink-21st",
    name: "Pink 21st Birthday Heart Cake",
    image: "/images/heart-cake-pink-21st.jpg",
    description: "Romantic pink heart cake with elaborate buttercream rosettes and ribbon bow decorations",
  },
  {
    id: "white-calendar",
    name: "White February Calendar Heart Cake",
    image: "/images/heart-cake-white-calendar.jpg",
    description: "Minimalist white heart cake with February calendar design in elegant black script lettering",
  },
]

const spiderManCakes = [
  {
    id: "petros-multi-tier",
    name: "Petros Multi-Tier Spider-Man Cake",
    image: "/images/spiderman-petros-multi-tier.jpg",
    description:
      "Spectacular multi-tiered cake with blue base, red brick wall backdrop, and various Spider-Man themed decorative elements",
  },
  {
    id: "simcelub-city",
    name: "Simcelub City Skyline Spider-Man Cake",
    image: "/images/spiderman-simcelub-city.jpg",
    description:
      "Light blue cylindrical cake with Spider-Man mask and city skyline, topped with elaborate character cutouts",
  },
  {
    id: "zwoluga-comic",
    name: "Zwoluga Comic Style Spider-Man Cake",
    image: "/images/spiderman-zwoluga-comic.jpg",
    description:
      "Blue cake with comic-style elements, city buildings, and colorful balloon decorations with Spider-Man theme",
  },
  {
    id: "ortney-web",
    name: "Ortney Web Pattern Spider-Man Cake",
    image: "/images/spiderman-ortney-web.jpg",
    description:
      "Red cylindrical cake covered in white web patterns with Spider-Man characters and birthday number topper",
  },
  {
    id: "kgalalo-balloons",
    name: "Kgalalo Balloon Cluster Spider-Man Cake",
    image: "/images/spiderman-kgalalo-balloons.jpg",
    description:
      "Blue cake with Spider-Man mask, decorated with red, blue, and black balloon clusters and character cutouts",
  },
  {
    id: "jawad-verse",
    name: "Jawad Spider-Verse Miles Morales Cake",
    image: "/images/spiderman-jawad-verse.jpg",
    description:
      "Unique weathered finish cake featuring Miles Morales design with city skyline and Spider-Verse characters",
  },
]

const cocomelonCakes = [
  {
    id: "mokuhle-rainbow",
    name: "Mokuhle Rainbow Adventure Cake",
    image: "/images/cocomelon-mokuhle-rainbow.jpg",
    description:
      "Vibrant green two-tier cake with JJ character, rainbow decorations, watermelon friend, and colorful letter base",
  },
  {
    id: "birthday-bus",
    name: "CoComelon Birthday Bus Cake",
    image: "/images/cocomelon-birthday-bus.jpg",
    description: "Two-tier cake featuring the iconic yellow CoComelon bus with characters, rainbow, and birthday theme",
  },
  {
    id: "mokuhle-garden",
    name: "Mokuhle Garden Party Cake",
    image: "/images/cocomelon-mokuhle-garden.jpg",
    description: "Whimsical cream cake with rainbow arch, JJ character, butterflies, daisies, and garden elements",
  },
  {
    id: "lina-animals",
    name: "Lina's Animal Friends Cake",
    image: "/images/cocomelon-lina-animals.jpg",
    description:
      "Pink-themed cake with JJ character and adorable CoComelon animal friends including elephant, pig, and duck",
  },
  {
    id: "mohapi-balloons",
    name: "Mohapi Balloon Celebration Cake",
    image: "/images/cocomelon-mohapi-balloons.jpg",
    description:
      "Light blue cake with rainbow topper, colorful balloon cake pops, CoComelon bus, and festive decorations",
  },
]

const frozenCakes = [
  {
    id: "gratecile-olaf",
    name: "Gratecile Olaf Winter Wonderland",
    image: "/images/frozen-gratecile-olaf.jpg",
    description:
      "Stunning blue cake featuring Olaf with outstretched arms, snowflakes, and Elsa portrait for 4th birthday",
  },
  {
    id: "zahra-elsa",
    name: "Zahra's Elegant Elsa Cake",
    image: "/images/frozen-zahra-elsa.jpg",
    description: "Sophisticated blue and white ombre cake with beautiful Elsa portrait and snowflake decorations",
  },
  {
    id: "enzo-birthday",
    name: "Enzo's Frozen Birthday Celebration",
    image: "/images/frozen-enzo-birthday.jpg",
    description: "Vibrant blue cake with elaborate Elsa decorations, balloon clusters, and birthday signage",
  },
  {
    id: "let-it-go-ombre",
    name: "Let It Go Ombre Masterpiece",
    image: "/images/frozen-let-it-go-ombre.jpg",
    description: "Spectacular three-tier ombre cake with ruffled layers, Elsa portrait, and 'Let It Go' lettering",
  },
]

const jungleCakes = [
  {
    id: "mzande-safari",
    name: "Mzande Safari Adventure Cake",
    image: "/images/jungle-mzande-safari.jpg",
    description:
      "Vibrant green two-tier cake with safari animals including monkey, lion, giraffe, zebra, and elephant with tropical leaves",
  },
  {
    id: "ugochukwu-dinosaur",
    name: "Ugochukwu Dinosaur Jungle Cake",
    image: "/images/jungle-ugochukwu-dinosaur.jpg",
    description:
      "Two-tier cake featuring dinosaur characters with palm trees, perfect for prehistoric jungle adventures",
  },
  {
    id: "dithoriso-animals",
    name: "Dithoriso Wild Animals Cake",
    image: "/images/jungle-dithoriso-animals.jpg",
    description:
      "Blue and green cake showcasing various jungle animals including lion, monkey, giraffe, tiger, and zebra",
  },
  {
    id: "oretha-lion-king",
    name: "Oretha's Lion King Cake",
    image: "/images/jungle-oretha-lion-king.jpg",
    description:
      "Authentic Lion King themed cake featuring Timon, Pumbaa, and young Simba with tropical jungle elements",
  },
  {
    id: "king-aphelele",
    name: "King Aphelele Lion King Royalty",
    image: "/images/jungle-king-aphelele.jpg",
    description:
      "Three-tier ombre cake with orange crown, young Simba character, and tropical leaves in royal Lion King style",
  },
  {
    id: "zane-mickey-safari",
    name: "Zane's Mickey Safari Cake",
    image: "/images/jungle-zane-mickey-safari.jpg",
    description:
      "Simple white cake with Mickey Mouse in safari outfit and cute painted jungle animals including giraffe and lion",
  },
]

const princessCakes = [
  {
    id: "unami-disney",
    name: "Unami's Disney Princess Castle Cake",
    image: "/images/princess-unami-disney.jpg",
    description:
      "Luxurious three-tier pink cake featuring Disney princesses with golden glittery castle, gold balloons, and butterflies",
  },
  {
    id: "okuhle-rainbow",
    name: "Okuhle's Rainbow Dreams Cake",
    image: "/images/princess-okuhle-rainbow.jpg",
    description:
      "Whimsical three-tier cake with pastel rainbows, smiling clouds, pink butterflies, and magical fairy-tale elements",
  },
  {
    id: "celokuhle-unicorn",
    name: "Celokuhle's Unicorn Princess Cake",
    image: "/images/princess-celokuhle-unicorn.jpg",
    description:
      "Enchanting three-tier cake topped with rainbow-maned unicorn, colorful flowers, mushrooms, and fantasy garden elements",
  },
  {
    id: "anathi-candy",
    name: "Anathi's Sweet Treats Princess Cake",
    image: "/images/princess-anathi-candy.jpg",
    description:
      "Elaborate multi-tier cake with ice cream cones, chocolate bars, colorful sprinkles, and candy-themed decorations",
  },
  {
    id: "dzuvha-butterfly",
    name: "Dzuvha's Butterfly Princess Cake",
    image: "/images/princess-dzuvha-butterfly.jpg",
    description:
      "Elegant four-tier ombre cake with delicate pink butterflies cascading down all tiers and pearl details",
  },
  {
    id: "azania-barbie",
    name: "Azania's Barbie Princess Cake",
    image: "/images/princess-azania-barbie.jpg",
    description:
      "Classic Barbie-themed cake with pink lollipops, stars, clouds, rainbow elements, and iconic Barbie styling",
  },
  {
    id: "owethu-crown",
    name: "Owethu's Royal Crown Cake",
    image: "/images/princess-owethu-crown.jpg",
    description:
      "Regal three-tier cake with golden crown, white quilted middle tier, and pink ruffled bottom with royal elegance",
  },
]

const carLoversCakes = [
  {
    id: "bmw-birthday",
    name: "BMW Birthday Celebration Cake",
    image: "/images/car-bmw-birthday.jpg",
    description:
      "White cylindrical cake with blue drip effect, BMW logo, racing checkered flag elements, and tire decorations",
  },
  {
    id: "bmw-luxury",
    name: "BMW Luxury Sports Cake",
    image: "/images/car-bmw-luxury.jpg",
    description:
      "Sophisticated gray cake with BMW logo, black car silhouettes, silver decorations, and metallic finish",
  },
  {
    id: "mercedes-elegant",
    name: "Mercedes-Benz Elegant Cake",
    image: "/images/car-mercedes-elegant.jpg",
    description:
      "Upscale beige cake featuring Mercedes-Benz logo, white car model, silver decorations, and luxury styling",
  },
]

const sportsmanCakes = [
  {
    id: "arsenal-noah",
    name: "Arsenal Football Club Celebration Cake",
    image: "/images/sportsman-arsenal-noah.jpg",
    description:
      "Red and white Arsenal-themed cake with club logo, player jerseys (Odegaard #8, Rice #41), and soccer ball decorations",
  },
  {
    id: "soccer-birthday",
    name: "Classic Soccer Birthday Cake",
    image: "/images/sportsman-soccer-birthday.jpg",
    description:
      "Elegant white cake with realistic soccer ball topper, green grass piping, and hexagon pattern decorations",
  },
  {
    id: "messi-argentina",
    name: "Messi Argentina Legend Cake",
    image: "/images/sportsman-messi-argentina.jpg",
    description:
      "Light blue and white cake featuring Messi #10 Argentina jersey design with soccer ball decorations and birthday theme",
  },
  {
    id: "manchester-city",
    name: "Manchester City Champions Cake",
    image: "/images/sportsman-manchester-city.jpg",
    description:
      "White and blue Manchester City themed cake with club logo, soccer balls, blue balloon clusters, and gold accents",
  },
]

const mickeyMouseCakes = [
  {
    id: "classic-head",
    name: "Classic Mickey Head Cake",
    image: "/images/mickey-classic-head.jpg",
    description: "Traditional Mickey Mouse head shape with chocolate ears",
  },
  {
    id: "clubhouse",
    name: "Mickey Clubhouse Cake",
    image: "/images/mickey-clubhouse.jpg",
    description: "Colorful clubhouse design with Mickey and friends",
  },
  {
    id: "vintage",
    name: "Vintage Mickey Cake",
    image: "/images/mickey-vintage.jpg",
    description: "Retro black and white Mickey Mouse design",
  },
  {
    id: "birthday",
    name: "Mickey Birthday Cake",
    image: "/images/mickey-birthday.jpg",
    description: "Birthday-themed with Mickey's iconic red shorts",
  },
  {
    id: "couple",
    name: "Mickey & Minnie Cake",
    image: "/images/mickey-couple.jpg",
    description: "Romantic couple cake featuring both Mickey and Minnie",
  },
  {
    id: "cupcake-tower",
    name: "Mickey Ears Cupcake Tower",
    image: "/images/mickey-cupcake-tower.jpg",
    description: "Tower of cupcakes with Mickey ear toppers",
  },
  {
    id: "3d",
    name: "3D Mickey Cake",
    image: "/images/mickey-3d.jpg",
    description: "Three-dimensional Mickey Mouse figure cake",
  },
  {
    id: "steamboat",
    name: "Mickey Steamboat Willie Cake",
    image: "/images/mickey-steamboat.jpg",
    description: "Classic steamboat Willie themed design",
  },
]

const kidsThemedCategories = {
  id: "kids-themed-cakes",
  name: "Kids' Themed Cakes",
  description: "Fun and colorful cakes designed especially for children's celebrations",
  bgColor: "bg-gradient-to-br from-purple-100 to-purple-200",
  textColor: "text-purple-800",
  borderColor: "border-purple-300",
  subcategories: [
    {
      id: "princess-cakes",
      name: "Princess Cakes",
      description: "Elegant and royal Princess Cakes",
      bgColor: "bg-gradient-to-br from-pink-100 to-pink-200",
      textColor: "text-pink-800",
      borderColor: "border-pink-300",
      items: [
        { name: "Classic Princess Cake", price: "R115", description: "Traditional creamy delight" },
        { name: "Chocolate Princess Cake", price: "R120", description: "Rich chocolate variation" },
        { name: "Strawberry Princess Cake", price: "R118", description: "Fresh strawberry flavor" },
        { name: "Vanilla Princess Cake", price: "R115", description: "Pure vanilla essence" },
        { name: "Caramel Princess Cake", price: "R122", description: "Sweet caramel swirl" },
        { name: "Coffee Princess Cake", price: "R120", description: "Rich coffee infusion" },
      ],
    },
    {
      id: "fairyland-cakes",
      name: "Fairyland Cakes",
      description: "Magical and enchanting cakes from a world of fantasy and wonder",
      bgColor: "bg-gradient-to-br from-violet-100 to-violet-200",
      textColor: "text-violet-800",
      borderColor: "border-violet-300",
      items: [
        {
          name: "Fairy Castle Cake",
          price: "R280",
          description: "Enchanted castle with towers and magical details",
        },
        {
          name: "Unicorn Dreams Cake",
          price: "R250",
          description: "Magical unicorn with rainbow mane and horn",
        },
        { name: "Fairy Garden Cake", price: "R220", description: "Whimsical garden with fairy houses and flowers" },
        { name: "Magic Wand Cake", price: "R190", description: "Sparkling wand with stars and glitter" },
        {
          name: "Enchanted Forest Cake",
          price: "R300",
          description: "Mystical forest scene with fairy lights and creatures",
        },
        { name: "Fairy Wings Cake", price: "R240", description: "Delicate butterfly wings with shimmer details" },
        { name: "Pixie Dust Cake", price: "R200", description: "Magical cake covered in edible glitter and stars" },
        { name: "Fairy Tale Book Cake", price: "R260", description: "Open storybook with fairy tale scenes" },
      ],
    },
    {
      id: "spider-man-cakes",
      name: "Spider Man Cakes",
      description: "Heroic and fun Spider Man Cakes",
      bgColor: "bg-gradient-to-br from-slate-100 to-slate-200",
      textColor: "text-slate-800",
      borderColor: "border-slate-300",
      items: [
        { name: "Classic Spider Cake", price: "R75", description: "Traditional creamy delight" },
        { name: "Chocolate Spider Cake", price: "R80", description: "Rich chocolate variation" },
        { name: "Strawberry Spider Cake", price: "R78", description: "Fresh strawberry flavor" },
        { name: "Vanilla Spider Cake", price: "R75", description: "Pure vanilla essence" },
        { name: "Caramel Spider Cake", price: "R82", description: "Sweet caramel swirl" },
        { name: "Coffee Spider Cake", price: "R80", description: "Rich coffee infusion" },
      ],
    },
    {
      id: "frozen-cakes",
      name: "Frozen Cakes",
      description: "Magical and icy Frozen Cakes",
      bgColor: "bg-gradient-to-br from-cyan-100 to-cyan-200",
      textColor: "text-cyan-800",
      borderColor: "border-cyan-300",
      items: [
        { name: "Classic Frozen Cake", price: "R95", description: "Traditional creamy delight" },
        { name: "Chocolate Frozen Cake", price: "R100", description: "Rich chocolate variation" },
        { name: "Strawberry Frozen Cake", price: "R98", description: "Fresh strawberry flavor" },
        { name: "Vanilla Frozen Cake", price: "R95", description: "Pure vanilla essence" },
        { name: "Caramel Frozen Cake", price: "R102", description: "Sweet caramel swirl" },
        { name: "Coffee Frozen Cake", price: "R100", description: "Rich coffee infusion" },
      ],
    },
    {
      id: "cocomelon-cakes",
      name: "CoComelon Cakes",
      description: "Playful and colorful CoComelon Cakes",
      bgColor: "bg-gradient-to-br from-lime-100 to-lime-200",
      textColor: "text-lime-800",
      borderColor: "border-lime-300",
      items: [
        { name: "Classic CoComelon Cake", price: "R85", description: "Traditional creamy delight" },
        { name: "Chocolate CoComelon Cake", price: "R90", description: "Rich chocolate variation" },
        { name: "Strawberry CoComelon Cake", price: "R88", description: "Fresh strawberry flavor" },
        { name: "Vanilla CoComelon Cake", price: "R85", description: "Pure vanilla essence" },
        { name: "Caramel CoComelon Cake", price: "R92", description: "Sweet caramel swirl" },
        { name: "Coffee CoComelon Cake", price: "R90", description: "Rich coffee infusion" },
      ],
    },
    {
      id: "jungle-cakes",
      name: "Jungle Cakes",
      description: "Wild and adventurous Jungle Cakes",
      bgColor: "bg-gradient-to-br from-emerald-100 to-emerald-200",
      textColor: "text-emerald-800",
      borderColor: "border-emerald-300",
      items: [
        { name: "Classic Jungle Cake", price: "R105", description: "Traditional creamy delight" },
        { name: "Chocolate Jungle Cake", price: "R110", description: "Rich chocolate variation" },
        { name: "Strawberry Jungle Cake", price: "R108", description: "Fresh strawberry flavor" },
        { name: "Vanilla Jungle Cake", price: "R105", description: "Pure vanilla essence" },
        { name: "Caramel Jungle Cake", price: "R112", description: "Sweet caramel swirl" },
        { name: "Coffee Jungle Cake", price: "R110", description: "Rich coffee infusion" },
      ],
    },
    {
      id: "mickey-mouse-cakes",
      name: "Mickey Mouse Cakes",
      description: "Magical Disney-themed cakes featuring everyone's favorite mouse",
      bgColor: "bg-gradient-to-br from-red-100 to-red-200",
      textColor: "text-red-800",
      borderColor: "border-red-300",
      items: [
        {
          name: "Classic Mickey Head Cake",
          price: "R180",
          description: "Traditional Mickey Mouse head shape with chocolate ears",
        },
        {
          name: "Mickey Clubhouse Cake",
          price: "R220",
          description: "Colorful clubhouse design with Mickey and friends",
        },
        { name: "Vintage Mickey Cake", price: "R200", description: "Retro black and white Mickey Mouse design" },
        { name: "Mickey Birthday Cake", price: "R190", description: "Birthday-themed with Mickey's iconic red shorts" },
        {
          name: "Mickey & Minnie Cake",
          price: "R250",
          description: "Romantic couple cake featuring both Mickey and Minnie",
        },
        { name: "Mickey Ears Cupcake Tower", price: "R160", description: "Tower of cupcakes with Mickey ear toppers" },
        { name: "3D Mickey Cake", price: "R280", description: "Three-dimensional Mickey Mouse figure cake" },
        { name: "Mickey Steamboat Willie Cake", price: "R240", description: "Classic steamboat Willie themed design" },
      ],
    },
  ],
}

const regularCategories = [
  {
    id: "roman-cream",
    name: "Roman Cream",
    description: "Rich and creamy Roman-style desserts",
    bgColor: "bg-gradient-to-br from-yellow-100 to-yellow-200",
    textColor: "text-yellow-800",
    borderColor: "border-yellow-300",
    items: [
      { name: "Classic Roman Cream", price: "R45", description: "Traditional creamy delight" },
      { name: "Chocolate Roman Cream", price: "R50", description: "Rich chocolate variation" },
      { name: "Strawberry Roman Cream", price: "R48", description: "Fresh strawberry flavor" },
      { name: "Vanilla Roman Cream", price: "R45", description: "Pure vanilla essence" },
      { name: "Caramel Roman Cream", price: "R52", description: "Sweet caramel swirl" },
      { name: "Coffee Roman Cream", price: "R50", description: "Rich coffee infusion" },
    ],
  },
  {
    id: "swiss-rolls",
    name: "Swiss Rolls",
    description: "Delicate and fluffy Swiss roll creations",
    bgColor: "bg-gradient-to-br from-pink-100 to-pink-200",
    textColor: "text-pink-800",
    borderColor: "border-pink-300",
    items: [
      { name: "Classic Swiss Roll", price: "R35", description: "Traditional creamy filling" },
      { name: "Chocolate Swiss Roll", price: "R40", description: "Rich chocolate indulgence" },
      { name: "Strawberry Swiss Roll", price: "R38", description: "Fresh strawberry sensation" },
      { name: "Vanilla Swiss Roll", price: "R35", description: "Pure vanilla delight" },
      { name: "Caramel Swiss Roll", price: "R42", description: "Sweet caramel swirl" },
      { name: "Coffee Swiss Roll", price: "R40", description: "Rich coffee infusion" },
    ],
  },
  {
    id: "cupcakes",
    name: "Cupcakes",
    description: "Moist and flavorful cupcakes",
    bgColor: "bg-gradient-to-br from-green-100 to-green-200",
    textColor: "text-green-800",
    borderColor: "border-green-300",
    items: [
      { name: "Classic Cupcake", price: "R25", description: "Traditional creamy delight" },
      { name: "Chocolate Cupcake", price: "R30", description: "Rich chocolate variation" },
      { name: "Strawberry Cupcake", price: "R28", description: "Fresh strawberry flavor" },
      { name: "Vanilla Cupcake", price: "R25", description: "Pure vanilla essence" },
      { name: "Caramel Cupcake", price: "R32", description: "Sweet caramel swirl" },
      { name: "Coffee Cupcake", price: "R30", description: "Rich coffee infusion" },
    ],
  },
  {
    id: "little-champs-cakes",
    name: "Little Champs Cakes",
    description: "Celebrate your little champions' achievements and victories",
    bgColor: "bg-gradient-to-br from-yellow-100 to-yellow-200",
    textColor: "text-yellow-800",
    borderColor: "border-yellow-300",
    items: [
      {
        name: "Soccer Champion Cake",
        price: "R180",
        description: "Football-themed cake for little soccer stars",
      },
      {
        name: "Basketball Hero Cake",
        price: "R190",
        description: "Basketball court design with hoops and balls",
      },
      { name: "Swimming Victory Cake", price: "R170", description: "Pool-themed cake for swimming champions" },
      { name: "Tennis Winner Cake", price: "R160", description: "Tennis court and racket design" },
      {
        name: "Track & Field Cake",
        price: "R175",
        description: "Athletic track with medals and trophies",
      },
      { name: "Graduation Champion Cake", price: "R200", description: "Academic achievement celebration cake" },
      { name: "Dance Competition Cake", price: "R185", description: "Dance floor themed with ballet or hip-hop" },
      { name: "Art Contest Winner Cake", price: "R165", description: "Colorful palette and brush design" },
    ],
  },
  {
    id: "product-themed-drip-cakes",
    name: "Product Themed/Drip Cakes",
    description: "Modern drip cakes and realistic product replicas for contemporary celebrations",
    bgColor: "bg-gradient-to-br from-slate-100 to-slate-200",
    textColor: "text-slate-800",
    borderColor: "border-slate-300",
    items: [
      {
        name: "Classic Chocolate Drip Cake",
        price: "R220",
        description: "Rich chocolate ganache drip with gold accents",
      },
      {
        name: "Caramel Drip Delight",
        price: "R240",
        description: "Salted caramel drip with vanilla buttercream",
      },
      { name: "iPhone Replica Cake", price: "R350", description: "Realistic smartphone cake with edible screen" },
      { name: "Designer Handbag Cake", price: "R380", description: "Luxury handbag replica with intricate details" },
      {
        name: "Sneaker Cake",
        price: "R320",
        description: "Popular sneaker brand replica with laces and logos",
      },
      { name: "Makeup Palette Cake", price: "R290", description: "Cosmetic palette with edible eyeshadows" },
      { name: "Gaming Console Cake", price: "R360", description: "PlayStation or Xbox replica with controllers" },
      { name: "Perfume Bottle Cake", price: "R280", description: "Elegant perfume bottle with crystal details" },
    ],
  },
]

const cakeBoardsCategories = [
  {
    id: "cake-boards",
    name: "Cake Boards",
    description: "Professional cake boards and presentation accessories for perfect cake display",
    bgColor: "bg-gradient-to-br from-slate-100 to-slate-200",
    textColor: "text-slate-800",
    borderColor: "border-slate-300",
    items: [
      {
        name: "Round Cake Boards Set",
        price: "R25",
        description: 'Professional round cake boards in various sizes (6", 8", 10", 12")',
      },
      {
        name: "Square Cake Boards Set",
        price: "R30",
        description: "Elegant square cake boards for modern cake presentations",
      },
      {
        name: "Heart-Shaped Cake Boards",
        price: "R35",
        description: "Romantic heart-shaped boards perfect for special occasions",
      },
      {
        name: "Tiered Cake Stand System",
        price: "R120",
        description: "Multi-level cake stand system for wedding and celebration cakes",
      },
      {
        name: "Cake Boxes & Transport",
        price: "R40",
        description: "Secure cake boxes with windows for safe transport and gifting",
      },
      {
        name: "Decorative Cake Pedestals",
        price: "R85",
        description: "Elegant glass and metal cake pedestals for premium presentation",
      },
    ],
  },
]

const celebrationCategories = [
  {
    id: "bento-cakes",
    name: "Bento Cakes",
    description: "Cute and compact bento-style cakes perfect for small celebrations",
    bgColor: "bg-gradient-to-br from-pink-100 to-pink-200",
    textColor: "text-pink-800",
    borderColor: "border-pink-300",
    items: [
      {
        name: "Black & Gold Elegance Bento",
        price: "R150",
        description:
          "Sophisticated black buttercream with gold accents, featuring personalized messages and calendar designs",
      },
      {
        name: "Pink & White Birthday Bento",
        price: "R140",
        description: "Elegant pink and white themed bento with pearl decorations, perfect for milestone birthdays",
      },
      {
        name: "Cream & Gold Royal Bento",
        price: "R160",
        description: "Luxurious cream buttercream with red floral accents and gold crown decorations",
      },
      {
        name: "Humorous 25th Birthday Bento",
        price: "R130",
        description: "Fun and playful bento with cartoon characters and witty birthday messages",
      },
      {
        name: "Vibrant Pink Birthday Bento",
        price: "R155",
        description: "Bold pink rose wreath design with gold script lettering for festive celebrations",
      },
    ],
  },
  {
    id: "heart-shaped-cakes",
    name: "Heart Shaped Cakes",
    description: "Romantic heart-shaped cakes for anniversaries, Valentine's Day, and special occasions",
    bgColor: "bg-gradient-to-br from-red-100 to-red-200",
    textColor: "text-red-800",
    borderColor: "border-red-300",
    items: [
      {
        name: "Personalized Photo Heart Cake",
        price: "R220",
        description: "Elegant white heart cake with photo prints, black ribbon bows, and personalized birthday message",
      },
      {
        name: "Royal Gold Crown Heart Cake",
        price: "R250",
        description: "Luxurious white heart cake with gold script lettering, pearl details, and golden crown topper",
      },
      {
        name: "Red Calendar Heart Cake",
        price: "R230",
        description: "Vibrant red heart cake with August 2024 calendar design and white pearl decorations",
      },
      {
        name: "Pink 21st Birthday Heart Cake",
        price: "R240",
        description: "Romantic pink heart cake with elaborate buttercream rosettes and ribbon bow decorations",
      },
      {
        name: "White February Calendar Heart Cake",
        price: "R210",
        description: "Minimalist white heart cake with February calendar design in elegant black script lettering",
      },
    ],
  },
  {
    id: "car-lovers-cakes",
    name: "Car Lovers Cakes",
    description: "Cakes designed for car enthusiasts, featuring popular car brands and racing themes",
    bgColor: "bg-gradient-to-br from-gray-100 to-gray-200",
    textColor: "text-gray-800",
    borderColor: "border-gray-300",
    items: [
      {
        name: "BMW Birthday Celebration Cake",
        price: "R280",
        description:
          "White cylindrical cake with blue drip effect, BMW logo, racing checkered flag elements, and tire decorations",
      },
      {
        name: "BMW Luxury Sports Cake",
        price: "R300",
        description:
          "Sophisticated gray cake with BMW logo, black car silhouettes, silver decorations, and metallic finish",
      },
      {
        name: "Mercedes-Benz Elegant Cake",
        price: "R290",
        description:
          "Upscale beige cake featuring Mercedes-Benz logo, white car model, silver decorations, and luxury styling",
      },
    ],
  },
  {
    id: "sportsman-cakes",
    name: "Sportsman Cakes",
    description: "Cakes for sports fans, featuring popular sports teams and athletic themes",
    bgColor: "bg-gradient-to-br from-green-100 to-green-200",
    textColor: "text-green-800",
    borderColor: "border-green-300",
    items: [
      {
        name: "Arsenal Football Club Celebration Cake",
        price: "R260",
        description:
          "Red and white Arsenal-themed cake with club logo, player jerseys (Odegaard #8, Rice #41), and soccer ball decorations",
      },
      {
        name: "Classic Soccer Birthday Cake",
        price: "R240",
        description:
          "Elegant white cake with realistic soccer ball topper, green grass piping, and hexagon pattern decorations",
      },
      {
        name: "Messi Argentina Legend Cake",
        price: "R270",
        description:
          "Light blue and white cake featuring Messi #10 Argentina jersey design with soccer ball decorations and birthday theme",
      },
      {
        name: "Manchester City Champions Cake",
        price: "R250",
        description:
          "White and blue Manchester City themed cake with club logo, soccer balls, blue balloon clusters, and gold accents",
      },
    ],
  },
  {
    id: "princess-cakes",
    name: "Princess Cakes",
    description: "Elegant and royal Princess Cakes for magical celebrations",
    bgColor: "bg-gradient-to-br from-pink-100 to-pink-200",
    textColor: "text-pink-800",
    borderColor: "border-pink-300",
    items: [
      { name: "Classic Princess Cake", price: "R115", description: "Traditional creamy delight" },
      { name: "Chocolate Princess Cake", price: "R120", description: "Rich chocolate variation" },
      { name: "Strawberry Princess Cake", price: "R118", description: "Fresh strawberry flavor" },
      { name: "Vanilla Princess Cake", price: "R115", description: "Pure vanilla essence" },
      { name: "Caramel Princess Cake", price: "R122", description: "Sweet caramel swirl" },
      { name: "Coffee Princess Cake", price: "R120", description: "Rich coffee infusion" },
    ],
  },
  {
    id: "fairyland-cakes",
    name: "Fairyland Cakes",
    description: "Magical and enchanting cakes from a world of fantasy and wonder",
    bgColor: "bg-gradient-to-br from-violet-100 to-violet-200",
    textColor: "text-violet-800",
    borderColor: "border-violet-300",
    items: [
      {
        name: "Fairy Castle Cake",
        price: "R280",
        description: "Enchanted castle with towers and magical details",
      },
      {
        name: "Unicorn Dreams Cake",
        price: "R250",
        description: "Magical unicorn with rainbow mane and horn",
      },
      { name: "Fairy Garden Cake", price: "R220", description: "Whimsical garden with fairy houses and flowers" },
      { name: "Magic Wand Cake", price: "R190", description: "Sparkling wand with stars and glitter" },
      {
        name: "Enchanted Forest Cake",
        price: "R300",
        description: "Mystical forest scene with fairy lights and creatures",
      },
      { name: "Fairy Wings Cake", price: "R240", description: "Delicate butterfly wings with shimmer details" },
      { name: "Pixie Dust Cake", price: "R200", description: "Magical cake covered in edible glitter and stars" },
      { name: "Fairy Tale Book Cake", price: "R260", description: "Open storybook with fairy tale scenes" },
    ],
  },
  {
    id: "spider-man-cakes",
    name: "Spider Man Cakes",
    description: "Heroic and fun Spider Man Cakes for superhero celebrations",
    bgColor: "bg-gradient-to-br from-slate-100 to-slate-200",
    textColor: "text-slate-800",
    borderColor: "border-slate-300",
    items: [
      { name: "Classic Spider Cake", price: "R75", description: "Traditional creamy delight" },
      { name: "Chocolate Spider Cake", price: "R80", description: "Rich chocolate variation" },
      { name: "Strawberry Spider Cake", price: "R78", description: "Fresh strawberry flavor" },
      { name: "Vanilla Spider Cake", price: "R75", description: "Pure vanilla essence" },
      { name: "Caramel Spider Cake", price: "R82", description: "Sweet caramel swirl" },
      { name: "Coffee Spider Cake", price: "R80", description: "Rich coffee infusion" },
    ],
  },
  {
    id: "frozen-cakes",
    name: "Frozen Cakes",
    description: "Magical and icy Frozen Cakes for winter wonderland celebrations",
    bgColor: "bg-gradient-to-br from-cyan-100 to-cyan-200",
    textColor: "text-cyan-800",
    borderColor: "border-cyan-300",
    items: [
      { name: "Classic Frozen Cake", price: "R95", description: "Traditional creamy delight" },
      { name: "Chocolate Frozen Cake", price: "R100", description: "Rich chocolate variation" },
      { name: "Strawberry Frozen Cake", price: "R98", description: "Fresh strawberry flavor" },
      { name: "Vanilla Frozen Cake", price: "R95", description: "Pure vanilla essence" },
      { name: "Caramel Frozen Cake", price: "R102", description: "Sweet caramel swirl" },
      { name: "Coffee Frozen Cake", price: "R100", description: "Rich coffee infusion" },
    ],
  },
  {
    id: "cocomelon-cakes",
    name: "CoComelon Cakes",
    description: "Playful and colorful CoComelon Cakes for children's celebrations",
    bgColor: "bg-gradient-to-br from-lime-100 to-lime-200",
    textColor: "text-lime-800",
    borderColor: "border-lime-300",
    items: [
      { name: "Classic CoComelon Cake", price: "R85", description: "Traditional creamy delight" },
      { name: "Chocolate CoComelon Cake", price: "R90", description: "Rich chocolate variation" },
      { name: "Strawberry CoComelon Cake", price: "R88", description: "Fresh strawberry flavor" },
      { name: "Vanilla CoComelon Cake", price: "R85", description: "Pure vanilla essence" },
      { name: "Caramel CoComelon Cake", price: "R92", description: "Sweet caramel swirl" },
      { name: "Coffee CoComelon Cake", price: "R90", description: "Rich coffee infusion" },
    ],
  },
  {
    id: "jungle-cakes",
    name: "Jungle Cakes",
    description: "Wild and adventurous Jungle Cakes for safari-themed celebrations",
    bgColor: "bg-gradient-to-br from-emerald-100 to-emerald-200",
    textColor: "text-emerald-800",
    borderColor: "border-emerald-300",
    items: [
      { name: "Classic Jungle Cake", price: "R105", description: "Traditional creamy delight" },
      { name: "Chocolate Jungle Cake", price: "R110", description: "Rich chocolate variation" },
      { name: "Strawberry Jungle Cake", price: "R108", description: "Fresh strawberry flavor" },
      { name: "Vanilla Jungle Cake", price: "R105", description: "Pure vanilla essence" },
      { name: "Caramel Jungle Cake", price: "R112", description: "Sweet caramel swirl" },
      { name: "Coffee Jungle Cake", price: "R110", description: "Rich coffee infusion" },
    ],
  },
  {
    id: "mickey-mouse-cakes",
    name: "Mickey Mouse Cakes",
    description: "Magical Disney-themed cakes featuring everyone's favorite mouse",
    bgColor: "bg-gradient-to-br from-red-100 to-red-200",
    textColor: "text-red-800",
    borderColor: "border-red-300",
    items: [
      {
        name: "Classic Mickey Head Cake",
        price: "R180",
        description: "Traditional Mickey Mouse head shape with chocolate ears",
      },
      {
        name: "Mickey Clubhouse Cake",
        price: "R220",
        description: "Colorful clubhouse design with Mickey and friends",
      },
      { name: "Vintage Mickey Cake", price: "R200", description: "Retro black and white Mickey Mouse design" },
      { name: "Mickey Birthday Cake", price: "R190", description: "Birthday-themed with Mickey's iconic red shorts" },
      {
        name: "Mickey & Minnie Cake",
        price: "R250",
        description: "Romantic couple cake featuring both Mickey and Minnie",
      },
      { name: "Mickey Ears Cupcake Tower", price: "R160", description: "Tower of cupcakes with Mickey ear toppers" },
      { name: "3D Mickey Cake", price: "R280", description: "Three-dimensional Mickey Mouse figure cake" },
      { name: "Mickey Steamboat Willie Cake", price: "R240", description: "Classic steamboat Willie themed design" },
    ],
  },
]

const parentCategories = [
  {
    id: "celebration-special-occasion",
    name: "Celebration & Special Occasion Cakes",
    description: "Perfect cakes for life's most memorable moments and celebrations, including kids' themed cakes",
    bgColor: "bg-gradient-to-br from-purple-100 to-purple-200",
    textColor: "text-purple-800",
    borderColor: "border-purple-300",
    subcategories: celebrationCategories,
    totalItems: celebrationCategories.reduce((sum, cat) => sum + cat.items.length, 0),
  },
  {
    id: "cookies-and-pastries",
    name: "Cookies and Pastries",
    description: "Freshly baked cookies, delicate pastries, and sweet treats",
    bgColor: "bg-gradient-to-br from-orange-100 to-rose-200",
    textColor: "text-orange-800",
    borderColor: "border-orange-300",
    subcategories: [
      {
        id: "melting-moments",
        name: "Melting Moments",
        description: "Buttery and crumbly melting moments biscuits",
        bgColor: "bg-gradient-to-br from-orange-100 to-orange-200",
        textColor: "text-orange-800",
        borderColor: "border-orange-300",
        items: [
          { name: "Classic Melting Moments", price: "R65", description: "Traditional buttery biscuits" },
          { name: "Chocolate Melting Moments", price: "R70", description: "Rich chocolate variation" },
          { name: "Vanilla Melting Moments", price: "R68", description: "Pure vanilla essence" },
        ],
      },
      {
        id: "regular-cookies",
        name: "Regular Cookies",
        description: "Classic and delicious regular cookies",
        bgColor: "bg-gradient-to-br from-yellow-100 to-yellow-200",
        textColor: "text-yellow-800",
        borderColor: "border-yellow-300",
        items: [
          { name: "Chocolate Chip Cookies", price: "R55", description: "Classic chocolate chip cookies" },
          { name: "Sugar Cookies", price: "R50", description: "Traditional buttery sugar cookies" },
          { name: "Ginger Snap Cookies", price: "R52", description: "Spiced ginger snap cookies" },
        ],
      },
      {
        id: "snow-balls",
        name: "Snow Balls",
        description: "Delicate and sweet snow ball cookies",
        bgColor: "bg-gradient-to-br from-pink-100 to-pink-200",
        textColor: "text-pink-800",
        borderColor: "border-pink-300",
        items: [
          { name: "Pink Coconut Snow Balls", price: "R75", description: "Coconut-covered cake balls" },
          { name: "Classic White Snow Balls", price: "R70", description: "Traditional coconut snow balls" },
        ],
      },
      {
        id: "pastries",
        name: "Pastries",
        description: "Assorted pastries and sweet treats",
        bgColor: "bg-gradient-to-br from-rose-100 to-rose-200",
        textColor: "text-rose-800",
        borderColor: "border-rose-300",
        items: [
          { name: "Chocolate Petit Fours", price: "R85", description: "Elegant mini chocolate cakes" },
          { name: "Honey Baklava", price: "R90", description: "Traditional layered pastry" },
          { name: "Fresh Baked Scones", price: "R88", description: "Golden, flaky scones" },
          { name: "Designer Mini Cake", price: "R92", description: "Instagram-worthy mini cake" },
          { name: "Gourmet Donuts", price: "R95", description: "Assorted glazed donuts" },
        ],
      },
    ],
    totalItems: 21,
  },
  {
    id: "regular-treats",
    name: "Regular Treats & Desserts",
    description: "Delicious everyday treats and classic bakery favorites",
    bgColor: "bg-gradient-to-br from-amber-100 to-amber-200",
    textColor: "text-amber-800",
    borderColor: "border-amber-300",
    subcategories: regularCategories,
    totalItems: regularCategories.reduce((sum, cat) => sum + cat.items.length, 0),
  },
  {
    id: "cake-boards",
    name: "Cake Boards",
    description: "Professional cake boards and presentation accessories for perfect cake display",
    bgColor: "bg-gradient-to-br from-slate-100 to-slate-200",
    textColor: "text-slate-800",
    borderColor: "border-slate-300",
    subcategories: cakeBoardsCategories,
    totalItems: cakeBoardsCategories.reduce((sum, cat) => sum + cat.items.length, 0),
  },
]

const allCategories = [celebrationCategories, kidsThemedCategories, ...regularCategories]

export default function CakesPage() {
  const [selectedParentCategory, setSelectedParentCategory] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [visibleCategories, setVisibleCategories] = useState<Set<number>>(new Set())
  const categoryRefs = useRef<(HTMLDivElement | null)[]>([])

  const categories = selectedParentCategory
    ? parentCategories.find((parent) => parent.id === selectedParentCategory)?.subcategories || []
    : []

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number.parseInt(entry.target.getAttribute("data-category-index") || "0")
          if (entry.isIntersecting) {
            setVisibleCategories((prev) => new Set([...prev, index]))
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      },
    )

    categoryRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [selectedParentCategory])

  if (selectedCategory) {
    const category = categories.find((cat) => cat.id === selectedCategory)
    if (!category) return null

    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50">
        <div className="bg-white shadow-sm border-b sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-3 sm:px-6 py-3 sm:py-4">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setSelectedCategory(null)
                }}
                className="flex items-center gap-2 text-amber-700 hover:text-amber-800 hover:bg-amber-50"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Back to Menu</span>
                <span className="sm:hidden">Back</span>
              </Button>
              <div>
                <h1 className="text-lg sm:text-2xl font-bold text-amber-800">{category.name}</h1>
                <p className="text-xs sm:text-sm text-amber-600 hidden sm:block">{category.description}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm border-b sticky top-[73px] sm:top-[89px] z-10">
          <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2">
            <div className="flex gap-2 overflow-x-auto scrollbar-hide">
              {categories.map((cat) => (
                <Button
                  key={cat.id}
                  variant={selectedCategory === cat.id ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`whitespace-nowrap text-xs sm:text-sm px-3 py-1.5 h-auto flex-shrink-0 ${
                    selectedCategory === cat.id
                      ? "bg-amber-600 text-white hover:bg-amber-700"
                      : "text-amber-700 hover:text-amber-800 hover:bg-amber-50"
                  }`}
                >
                  {cat.name}
                </Button>
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-3 sm:px-6 py-4 sm:py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
            {category.items.map((item, index) => (
              <Card
                key={item.name}
                className={`${category.bgColor} ${category.borderColor} border-2 hover:shadow-lg transition-all duration-300 transform hover:scale-105 animate-in slide-in-from-bottom-4 fade-in`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-3 sm:p-4">
                  <div className="aspect-[4/2.5] bg-white/50 rounded-lg mb-3 flex items-center justify-center overflow-hidden">
                    <img
                      src={`/abstract-geometric-shapes.png?key=5ik1h&height=120&width=160&query=${encodeURIComponent(item.name + " cake dessert")}`}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className={`font-semibold text-sm sm:text-base ${category.textColor} mb-1 sm:mb-2`}>
                    {item.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3 line-clamp-2">{item.description}</p>
                  <div className="flex items-center justify-between">
                    <Badge
                      variant="secondary"
                      className={`${category.bgColor} ${category.textColor} text-xs sm:text-sm font-bold px-2 py-1`}
                    >
                      {item.price}
                    </Badge>
                    <Button
                      size="sm"
                      className="bg-amber-600 hover:bg-amber-700 text-white text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-2 h-auto"
                      onClick={() => {
                        const message = `Hi! I'd like to order: ${item.name} (${item.price})`
                        window.open(`https://wa.me/27123456789?text=${encodeURIComponent(message)}`, "_blank")
                      }}
                    >
                      <ShoppingCart className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                      Order
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-yellow-50 to-orange-50 relative overflow-hidden">
      {/* Floating background elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div
          className="absolute top-20 left-10 text-4xl opacity-20"
          style={{ animation: "breathe 3s ease-in-out infinite" }}
        >
          🧁
        </div>
        <div
          className="absolute top-40 right-20 text-3xl opacity-15"
          style={{ animation: "breathe 4s ease-in-out infinite 0.5s" }}
        >
          🍰
        </div>
        <div
          className="absolute top-60 left-1/4 text-5xl opacity-10"
          style={{ animation: "breathe 3.5s ease-in-out infinite 1s" }}
        >
          🎂
        </div>
        <div
          className="absolute bottom-40 right-10 text-4xl opacity-20"
          style={{ animation: "breathe 4.5s ease-in-out infinite 2s" }}
        >
          🧁
        </div>
        <div
          className="absolute bottom-20 left-20 text-3xl opacity-15"
          style={{ animation: "breathe 3.2s ease-in-out infinite 0.5s" }}
        >
          🍰
        </div>
        <div
          className="absolute top-1/3 right-1/3 text-4xl opacity-10"
          style={{ animation: "breathe 4.2s ease-in-out infinite 1.5s" }}
        >
          🎂
        </div>
        <div
          className="absolute bottom-1/3 left-1/2 text-3xl opacity-20"
          style={{ animation: "breathe 3.8s ease-in-out infinite 3s" }}
        >
          🧁
        </div>
      </div>

      <style jsx>{`
        @keyframes breathe {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
        }
      `}</style>

      <div className="relative z-10">
        <div className="text-center py-8 sm:py-12 px-3 sm:px-6">
          <h1 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-pink-600 via-pink-500 to-orange-500 bg-clip-text text-transparent mb-2 font-serif animate-in fade-in slide-in-from-top-4 duration-1000">
            Our Cake Menu
          </h1>
          <p
            className="text-lg sm:text-xl text-pink-600 font-medium animate-in fade-in slide-in-from-top-6 duration-1000"
            style={{ animationDelay: "200ms" }}
          >
            Discover our delicious collection of handcrafted cakes and treats
          </p>
        </div>

        {selectedParentCategory ? (
          <>
            <div className="bg-gradient-to-br from-yellow-50 to-pink-50 border-b relative z-10">
              <div className="max-w-7xl mx-auto px-3 sm:px-6 py-3">
                <div className="flex items-center gap-3 mb-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedParentCategory(null)}
                    className="flex items-center gap-2 text-pink-600 hover:text-pink-700 hover:bg-pink-50 border border-pink-200 hover:border-pink-300"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span className="hidden sm:inline">Back to Categories</span>
                    <span className="sm:hidden">Back</span>
                  </Button>
                  <h2 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-pink-500 to-pink-600 bg-clip-text text-transparent font-serif">
                    {parentCategories.find((p) => p.id === selectedParentCategory)?.name}
                  </h2>
                </div>
                <p className="text-xs sm:text-sm text-pink-600 text-center mb-2 font-medium">
                  <span className="hidden sm:inline">
                    Slide horizontally to browse categories • Click to view full menu
                  </span>
                  <span className="sm:hidden">Slide to browse • Tap to view menu</span>
                </p>
                <div className="flex gap-2 overflow-x-auto scrollbar-hide">
                  {categories.map((category) => (
                    <Button
                      key={category.id}
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedCategory(category.id)}
                      className="whitespace-nowrap text-xs sm:text-sm px-3 py-1.5 h-auto flex-shrink-0 text-pink-600 hover:text-pink-700 hover:bg-pink-50 border border-pink-200 hover:border-pink-300"
                    >
                      {category.name}
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            <div className="max-w-7xl mx-auto px-3 sm:px-6 py-4 sm:py-8 relative z-10">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3 sm:gap-6">
                {categories.map((category, index) => (
                  <div
                    key={category.id}
                    ref={(el) => (categoryRefs.current[index] = el)}
                    data-category-index={index}
                    className={`transition-all duration-500 ease-out ${
                      visibleCategories.has(index) ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
                    }`}
                    style={{
                      transitionDelay: `${index * 100}ms`,
                    }}
                  >
                    <Card
                      className="bg-gradient-to-br from-yellow-50 to-pink-50 border-2 border-pink-300 hover:border-pink-400 cursor-pointer hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group overflow-hidden"
                      onClick={() => setSelectedCategory(category.id)}
                    >
                      <CardContent className="p-3 sm:p-4 relative">
                        <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-pink-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="absolute top-0 right-0 w-4 h-4 border-r-2 border-t-2 border-pink-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="absolute bottom-0 left-0 w-4 h-4 border-l-2 border-b-2 border-pink-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-pink-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                        <div className="aspect-[4/2.5] bg-white/50 rounded-lg mb-3 flex items-center justify-center overflow-hidden border-2 border-pink-200 group-hover:border-pink-300 transition-all duration-500">
                          <img
                            src={`/abstract-geometric-shapes.png?key=6r18z&key=xifyx&height=120&width=160&query=${encodeURIComponent(category.name + " cakes bakery display")}`}
                            alt={category.name}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                        </div>
                        <h3 className="font-bold text-base sm:text-lg text-pink-600 mb-1 sm:mb-2 font-serif group-hover:text-pink-700 transition-colors duration-300">
                          {category.name}
                        </h3>
                        <p className="text-xs sm:text-sm text-pink-500 mb-3 sm:mb-4 line-clamp-2">
                          {category.description}
                        </p>
                        <Button
                          size="sm"
                          onClick={() => setSelectedCategory(category.id)}
                          className="bg-gradient-to-r from-pink-400 to-pink-500 hover:from-pink-500 hover:to-pink-600 text-white font-bold text-xs sm:text-sm px-2 sm:px-3 py-1 h-auto rounded-lg shadow-md hover:shadow-xl transition-all duration-300 border border-pink-300 group-hover:scale-105"
                        >
                          View Menu
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="max-w-7xl mx-auto px-3 sm:px-6 py-4 sm:py-8 relative z-10">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {parentCategories.map((category, index) => (
                  <Card
                    key={category.id}
                    className="bg-gradient-to-br from-yellow-50 to-pink-50 border-2 border-pink-300 hover:border-pink-400 cursor-pointer hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group overflow-hidden animate-in fade-in slide-in-from-bottom-4"
                    style={{ animationDelay: `${index * 150}ms` }}
                    onClick={() => setSelectedParentCategory(category.id)}
                  >
                    <CardContent className="p-4 sm:p-6 relative">
                      <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-pink-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <div className="absolute top-0 right-0 w-4 h-4 border-r-2 border-t-2 border-pink-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <div className="absolute bottom-0 left-0 w-4 h-4 border-l-2 border-b-2 border-pink-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <div className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-pink-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                      <h3 className="font-bold text-xl sm:text-2xl bg-gradient-to-r from-pink-500 to-pink-600 bg-clip-text text-transparent mb-3 sm:mb-4 font-serif group-hover:from-pink-600 group-hover:to-pink-700 transition-all duration-300">
                        {category.name}
                      </h3>
                      <p className="text-sm sm:text-base text-pink-500 mb-4 sm:mb-6 line-clamp-3 font-medium">
                        {category.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <Badge className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-yellow-900 font-bold px-3 py-1 text-sm border border-yellow-300">
                          {category.totalItems} items
                        </Badge>
                        <Button
                          size="sm"
                          onClick={() => setSelectedParentCategory(category.id)}
                          className="bg-gradient-to-r from-pink-400 to-pink-500 hover:from-pink-500 hover:to-pink-600 text-white font-bold px-4 py-2 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 border border-pink-300 group-hover:scale-105"
                        >
                          View Menu
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div
              className="max-w-7xl mx-auto px-3 sm:px-6 py-8 sm:py-12 text-center relative z-10"
              style={{ animationDelay: "800ms" }}
            >
              <Card className="bg-gradient-to-r from-pink-100 to-yellow-100 border-pink-300 border-2 max-w-md mx-auto hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-4 sm:p-6">
                  <h3 className="font-bold text-lg sm:text-xl text-pink-600 mb-2 sm:mb-3 font-serif">
                    Need Help Choosing?
                  </h3>
                  <p className="text-sm sm:text-base text-pink-500 mb-3 sm:mb-4 font-medium">
                    Contact us for personalized recommendations
                  </p>
                  <Button
                    className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white w-full sm:w-auto font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                    onClick={() =>
                      window.open(
                        "https://wa.me/27123456789?text=Hi! I need help choosing from your cake menu.",
                        "_blank",
                      )
                    }
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    WhatsApp Us
                  </Button>
                </CardContent>
              </Card>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
