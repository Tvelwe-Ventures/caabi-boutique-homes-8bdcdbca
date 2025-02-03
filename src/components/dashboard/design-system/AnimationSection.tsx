import { motion } from "framer-motion";
import { DesignSystemSection } from "./DesignSystemSection";

export const AnimationSection = () => {
  return (
    <DesignSystemSection 
      title="Animations" 
      description="Animation examples and guidelines for consistent motion design."
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div 
          className="p-4 bg-white rounded-lg border"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <h3 className="font-medium mb-2">Hover Scale</h3>
          <p className="text-sm text-gray-600">Subtle scale animation on hover for interactive elements</p>
        </motion.div>
        
        <motion.div 
          className="p-4 bg-white rounded-lg border"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="font-medium mb-2">Fade In</h3>
          <p className="text-sm text-gray-600">Smooth fade in animation for content appearance</p>
        </motion.div>

        <motion.div 
          className="p-4 bg-white rounded-lg border"
          animate={{ 
            scale: [1, 1.02, 1],
            transition: { 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut" 
            }
          }}
        >
          <h3 className="font-medium mb-2">Pulse</h3>
          <p className="text-sm text-gray-600">Continuous pulse animation for attention-grabbing elements</p>
        </motion.div>
      </div>
    </DesignSystemSection>
  );
};