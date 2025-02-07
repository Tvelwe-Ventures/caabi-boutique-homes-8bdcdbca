import { motion } from "framer-motion";
import { StandardCard } from "./ui/standard-card";
import { Particles } from "./ui/particles";
import { Star } from "lucide-react";

const properties = [
  {
    image: "/lovable-uploads/147ce66e-9e92-42a5-86bd-23aca1487925.png",
    title: "The Burj Khalifa Suite",
    description: "Luxury in Downtown",
    rating: 4.9,
    reviews: 124
  },
  {
    image: "/lovable-uploads/a210a040-aa99-4aad-a7d0-7d2b08ad0e58.png",
    title: "Downtown Oasis",
    description: "Chic Luxury In the Heart of Dubai",
    rating: 4.8,
    reviews: 98
  },
  {
    image: "/lovable-uploads/a436f37f-a68e-4c2f-93c0-96307cb42f16.png",
    title: "The Skyline Suite",
    description: "Luxury Downtown Retreat",
    rating: 4.9,
    reviews: 156
  },
  {
    image: "/lovable-uploads/d817b3ef-28fe-41c1-99bc-aa78607b4cae.png",
    title: "Chic Downtown Suite",
    description: "Luxury in the Heart of Dubai",
    rating: 4.7,
    reviews: 87
  },
  {
    image: "/lovable-uploads/d427a985-0bc2-49f1-90e9-75b050fc5687.png",
    title: "The Downtown Cinema Suite",
    description: "Steps from Dubai Mall",
    rating: 4.8,
    reviews: 142
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
              className="h-full overflow-hidden flex flex-col"
            >
              <div className="relative w-full aspect-[4/3] overflow-hidden">
                <img
                  src={property.image}
                  alt={property.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-lg font-semibold mb-2">{property.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{property.description}</p>
                <div className="flex items-center gap-2 mt-auto">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="ml-1 text-sm font-medium">{property.rating}</span>
                  </div>
                  <span className="text-sm text-gray-500">({property.reviews} reviews)</span>
                </div>
              </div>
            </StandardCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;