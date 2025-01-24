import { motion } from "framer-motion";
import { Particles } from "./ui/particles";

const About = () => {
  return (
    <section className="relative py-20 bg-gradient-to-br from-[#8394ca] to-[#a2d4f4] dark:from-[#0c1114] dark:to-[#355ad1]">
      <Particles
        className="absolute inset-0 -z-10"
        quantity={50}
        staticity={50}
        color="var(--primary)"
      />
      
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-3xl font-bold text-white dark:text-gradient mb-8">About Caabi Boutique Homes</h2>
          <div className="space-y-6">
            <p className="text-lg text-white dark:text-gray-200 leading-relaxed">
              We're Caabi Boutique Homes, a small, family-run business that kicked off in May 2024 with just one property. Fast forward a bit, and we're now managing three beautiful homes, all in the heart of Downtown Dubai!
            </p>
            <p className="text-lg text-white dark:text-gray-200 leading-relaxed">
              What sets us apart? Well, we're all about the personal touch. We treat every property like it's part of our own family, making sure both homeowners and guests get the best experience possible.
            </p>
            <p className="text-lg text-white dark:text-gray-200 leading-relaxed">
              Since we're a boutique operation, we offer a level of attention and care that the bigger guys just can't match. Whether you're looking to rent out your property or stay in one of our luxurious homes, we're here to make it a smooth, stress-free experience from start to finish.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;