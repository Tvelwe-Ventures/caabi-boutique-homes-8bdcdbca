"use client"

import { motion } from "framer-motion"
import { Star } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

interface Review {
  id: number
  name: string
  date: string
  rating: number
  content: string
  image?: string
  stayType?: string
}

const reviews: Review[] = [
  {
    id: 1,
    name: "Galia",
    date: "January 2025",
    rating: 5,
    content: "Unfortunately, our trip was canceled at the last minute due to illness, but all along the way communication with Cat & Abby was pleasant, efficient and quick. We received an excellent guidance.",
    image: "/lovable-uploads/7735099b-27f5-488d-9635-ed9d7980213e.png"
  },
  {
    id: 2,
    name: "Prateek",
    date: "January 2025",
    rating: 5,
    content: "You can't beat the view! just book it for the view, everything else is a bonus. perfect location. we walked everywhere. place was very clean and comfortable.",
    image: "/lovable-uploads/4b19d16c-cb7e-4b02-a270-ffae2fbbac71.png"
  },
  {
    id: 3,
    name: "Zayda",
    date: "January 2025",
    rating: 5,
    content: "The stay at Cat and Abi's was amazing. The location is perfect especially for a short stay and the flat was lovely. You can find anything you need in the house (Adapter, Crib, extras).",
    image: "/lovable-uploads/ac9e6f0c-d4b8-4934-a60c-8ffa2a619611.png"
  },
  {
    id: 4,
    name: "Naomi",
    date: "January 2025",
    rating: 5,
    content: "Fantastic hosts, brilliant location and lovely flat. Thanks for a great stay!",
    image: "/lovable-uploads/b28399a3-2c84-4d6e-b280-ec48363c4017.png"
  }
]

const Feedback = () => {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-radial from-primary/5 via-transparent to-transparent dark:from-primary-dark/10" />
      
      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gradient mb-6">
            What Our Guests Say
          </h2>
          <p className="text-gray-700 dark:text-gray-300 max-w-2xl mx-auto text-lg">
            Read authentic reviews from our valued guests who have experienced our hospitality firsthand.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="relative overflow-hidden rounded-2xl border border-primary/10 bg-background/80 backdrop-blur-sm p-6 transition-all hover:shadow-lg hover:shadow-primary/5 md:p-8 group">
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-radial from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="relative z-10">
                  <div className="absolute right-6 top-6 text-6xl font-serif text-muted-foreground/20">
                    "
                  </div>

                  <div className="flex flex-col gap-4">
                    <div className="flex gap-1">
                      {Array.from({ length: review.rating }).map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className="fill-yellow-400 text-yellow-400"
                        />
                      ))}
                    </div>

                    <p className="text-pretty text-base text-muted-foreground">
                      {review.content}
                    </p>

                    <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarImage src={review.image} alt={review.name} />
                        <AvatarFallback>{review.name[0]}</AvatarFallback>
                      </Avatar>

                      <div className="flex flex-col">
                        <h3 className="font-semibold text-foreground">{review.name}</h3>
                        <p className="text-sm text-muted-foreground">{review.date}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Feedback