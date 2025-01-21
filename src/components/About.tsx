import { motion } from "framer-motion";
import { CardSpotlight } from "./ui/card-spotlight";
import { BorderBeam } from "./ui/border-beam";
import { Particles } from "./ui/particles";

const About = () => {
  return (
    <section className="relative py-20 section-dark">
      <Particles
        className="absolute inset-0 -z-10"
        quantity={50}
        staticity={50}
        color="var(--primary-light)"
      />
      
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-3xl font-bold text-gradient mb-6">About Caabi Boutique Homes</h2>
          <CardSpotlight className="relative p-6">
            <BorderBeam duration={15} />
            <div className="relative z-10">
              <div className="space-y-4">
                <p className="text-gray-300">
                  We're Caabi Boutique Homes, a small, family-run business that kicked off in May 2024 with just one property. Fast forward a bit, and we're now managing three beautiful homes, all in the heart of Downtown Dubai!
                </p>
                <p className="text-gray-300">
                  What sets us apart? Well, we're all about the personal touch. We treat every property like it's part of our own family, making sure both homeowners and guests get the best experience possible.
                </p>
                <p className="text-gray-300">
                  Since we're a boutique operation, we offer a level of attention and care that the bigger guys just can't match. Whether you're looking to rent out your property or stay in one of our luxurious homes, we're here to make it a smooth, stress-free experience from start to finish.
                </p>
              </div>
            </div>
          </CardSpotlight>
        </motion.div>
      </div>
    </section>
  );
};

export default About;