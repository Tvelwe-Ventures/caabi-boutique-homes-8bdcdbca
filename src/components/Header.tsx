import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-sm border-b border-white/10"
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/">
          <motion.img
            src="/lovable-uploads/19e19dba-2d9f-4ea9-90d7-a959d65d869b.png"
            alt="Caabi Boutique Homes"
            className="h-12 w-auto"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          />
        </Link>
        <nav>
          <ul className="flex items-center space-x-8">
            <li>
              <Link 
                to="/" 
                className="text-lg font-medium text-white hover:text-primary transition-colors"
              >
                Home
              </Link>
            </li>
            <li>
              <Link 
                to="/calculator" 
                className="text-lg font-medium text-white hover:text-primary transition-colors"
              >
                ROI Calculator
              </Link>
            </li>
            <li>
              <a 
                href="#investment"
                className="text-lg font-medium text-white hover:text-primary transition-colors"
              >
                Investment Proposal
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </motion.header>
  );
};

export default Header;