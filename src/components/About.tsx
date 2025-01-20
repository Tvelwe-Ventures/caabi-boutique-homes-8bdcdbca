import { motion } from "framer-motion";

const About = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-3xl font-bold text-primary mb-6">About Caabi Boutique Homes</h2>
          <div className="space-y-4">
            <p className="text-gray-700">
              We're Caabi Boutique Homes, a small, family-run business that kicked off in May 2024 with just one property. Fast forward a bit, and we're now managing three beautiful homes, all in the heart of Downtown Dubai!
            </p>
            <p className="text-gray-700">
              What sets us apart? Well, we're all about the personal touch. We treat every property like it's part of our own family, making sure both homeowners and guests get the best experience possible.
            </p>
            <p className="text-gray-700">
              Since we're a boutique operation, we offer a level of attention and care that the bigger guys just can't match. Whether you're looking to rent out your property or stay in one of our luxurious homes, we're here to make it a smooth, stress-free experience from start to finish.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;