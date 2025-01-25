import { motion } from "framer-motion";
import { Particles } from "./ui/particles";
import { StandardCard } from "./ui/standard-card";
import { Info } from "lucide-react";

const About = () => {
  return (
    <section className="relative py-20 bg-gradient-to-b from-white via-gray-50/50 to-white">
      <Particles
        className="absolute inset-0 -z-10 opacity-20"
        quantity={30}
        staticity={90}
        color="#1EAEDB"
      />
      
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <StandardCard
            icon={Info}
            title="About Caabi Boutique Homes"
            description="We're Caabi Boutique Homes, a small, family-run business that kicked off in May 2024 with just one property. Fast forward a bit, and we're now managing three beautiful homes, all in the heart of Downtown Dubai! What sets us apart? Well, we're all about the personal touch. We treat every property like it's part of our own family, making sure both homeowners and guests get the best experience possible. Since we're a boutique operation, we offer a level of attention and care that the bigger guys just can't match. Whether you're looking to rent out your property or stay in one of our luxurious homes, we're here to make it a smooth, stress-free experience from start to finish."
          />
        </motion.div>
      </div>
    </section>
  );
};

export default About;