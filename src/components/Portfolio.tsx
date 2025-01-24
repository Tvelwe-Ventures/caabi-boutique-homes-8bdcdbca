import { motion } from "framer-motion";
import { CardSpotlight } from "./ui/card-spotlight";
import { Particles } from "./ui/particles";
import { Star } from "lucide-react";

const properties = [
  {
    image: "/lovable-uploads/147ce66e-9e92-42a5-86bd-23aca1487925.png",
    title: "The Burj Khalifa Suite",
    description: "Luxury in Downtown",
    rating: 5.0,
    reviews: 10
  },
  {
    image: "/lovable-uploads/95b3bcd7-3500-409b-89b5-256673b7f92b.png",
    title: "Downtown Oasis",
    description: "Chic Luxury In the Heart of Dubai",
    rating: 5.0,
    reviews: 26
  },
  {
    image: "/lovable-uploads/d817b3ef-28fe-41c1-99bc-aa78607b4cae.png",
    title: "The Skyline Suite",
    description: "Luxury Downtown Retreat",
    rating: 4.75,
    reviews: 16
  }
];

const Portfolio = () => {
  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-b from-white via-gray-50 to-white dark:from-black dark:via-primary-dark/5 dark:to-black">
      <Particles
        className="absolute inset-0 -z-10"
        quantity={30}
        staticity={50}
        color="var(--primary)"
      />
      
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-gradient mb-6">
            Our Portfolio
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">
            Discover our collection of premium properties in Dubai's most sought-after locations
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              <CardSpotlight className="h-full overflow-hidden group">
                <div className="relative z-10">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={property.image}
                      alt={property.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-6 bg-white/90 dark:bg-black/60 backdrop-blur-sm">
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                      {property.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      {property.description}
                    </p>
                    <div className="flex items-center gap-2">
                      <Star className="w-5 h-5 text-primary fill-primary" />
                      <span className="text-gray-700 dark:text-gray-200 font-semibold">
                        {property.rating} 
                      </span>
                      <span className="text-gray-500 dark:text-gray-400">
                        ({property.reviews} reviews)
                      </span>
                    </div>
                  </div>
                </div>
              </CardSpotlight>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;