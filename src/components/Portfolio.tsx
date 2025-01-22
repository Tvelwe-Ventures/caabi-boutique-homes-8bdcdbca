import { motion } from "framer-motion";
import { CardSpotlight } from "./ui/card-spotlight";
import { BorderBeam } from "./ui/border-beam";
import { Particles } from "./ui/particles";

const Portfolio = () => {
  const properties = [
    {
      image: "/lovable-uploads/03283004-5262-4d41-8ab5-97f7c8cc6e12.png",
      title: "Downtown Dubai Residence",
      description: "Luxury 2BR apartment with Burj Khalifa views",
    },
    {
      image: "/lovable-uploads/079ce858-92b1-4b1e-914d-8c838c3da61d.png",
      title: "Marina Waterfront",
      description: "Modern 1BR with stunning marina views",
    },
    {
      image: "/lovable-uploads/10ed4f4c-f515-4635-ab65-ce78d558f42e.png",
      title: "Business Bay Executive",
      description: "Premium studio in the heart of Business Bay",
    }
  ];

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
              <CardSpotlight className="h-full overflow-hidden">
                <BorderBeam className="rounded-xl" />
                <div className="relative z-10">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={property.image}
                      alt={property.title}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                      {property.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {property.description}
                    </p>
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