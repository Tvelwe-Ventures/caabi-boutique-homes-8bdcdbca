import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";

const CallToAction = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Agents Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl bg-[#0F1729] text-white p-12"
        >
          <span className="absolute top-8 left-8 px-4 py-2 rounded-full border border-white/20 text-sm">
            Agents
          </span>
          <div className="mt-20 space-y-6">
            <h3 className="text-4xl font-bold leading-tight">
              Maximize your earnings as an agent with us
            </h3>
            <p className="text-lg text-white/80">
              Discover how we can help you earn AED
            </p>
            <div className="flex gap-4">
              <Button variant="outline" className="bg-white text-black hover:bg-white/90">
                Contact us <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline" className="border-white/20 hover:bg-white/10">
                Download PDF <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Area Guides Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="relative overflow-hidden rounded-3xl bg-[#4169E1] text-white p-12"
        >
          <span className="absolute top-8 left-8 px-4 py-2 rounded-full border border-white/20 text-sm">
            Area Guides
          </span>
          <div className="mt-20 space-y-6">
            <h3 className="text-4xl font-bold leading-tight">
              Explore our area guides
            </h3>
            <p className="text-lg text-white/80">
              Leading to area guide resources
            </p>
            <Button variant="outline" className="bg-white text-black hover:bg-white/90">
              Explore now <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CallToAction;