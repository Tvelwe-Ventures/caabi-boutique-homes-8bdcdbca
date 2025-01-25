import { motion } from "framer-motion";
import { StandardCard } from "./ui/standard-card";
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
    image: "/lovable-uploads/a436f37f-a68e-4c2f-93c0-96307cb42f16.png",
    title: "The Skyline Suite",
    description: "Luxury Downtown Retreat",
    rating: 4.75,
    reviews: 16
  },
  {
    image: "/lovable-uploads/d817b3ef-28fe-41c1-99bc-aa78607b4cae.png",
    title: "Chic Downtown Suite",
    description: "Luxury in the Heart of Dubai",
    rating: 4.9,
    reviews: 22
  },
  {
    image: "/lovable-uploads/d427a985-0bc2-49f1-90e9-75b050fc5687.png",
    title: "The Downtown Cinema Suite",
    description: "Steps from Dubai Mall",
    rating: 5.0,
    reviews: 8
  }
];

const Portfolio = () => {
  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-b from-white via-gray-50/50 to-white">
      <Particles
        className="absolute inset-0 -z-10"
        quantity={30}
        staticity={50}
        color="#1EAEDB"
      />
      
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Our Portfolio
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Discover our collection of premium properties in Dubai's most sought-after locations
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property, index) => (
            <StandardCard
              key={index}
              title={property.title}
              description={property.description}
              className="h-full"
              icon={Star}
              action={{
                label: `${property.rating} (${property.reviews} reviews)`
              }}
            >
              <div className="aspect-[4/3] overflow-hidden rounded-xl -mt-8 -mx-8 mb-6">
                <img
                  src={property.image}
                  alt={property.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
            </StandardCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;