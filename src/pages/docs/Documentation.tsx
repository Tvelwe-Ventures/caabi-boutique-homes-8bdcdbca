
import { motion } from "framer-motion";
import { ModuleCard } from "@/components/docs/ModuleCard";
import { documentationModules } from "@/components/docs/DocumentationModules";

const Documentation = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold mb-4">System Documentation</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Complete guide to the property management system modules and their functionalities
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {documentationModules.map((module, index) => (
          <ModuleCard key={module.title} {...module} index={index} />
        ))}
      </div>
    </div>
  );
};

export default Documentation;
