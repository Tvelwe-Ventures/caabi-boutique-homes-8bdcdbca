import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ThemeToggle } from "./ThemeToggle";
import { Menu } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 bg-[#1EAEDB] dark:bg-[#221F26] border-b border-[#33C3F0] dark:border-gray-800"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/">
            <motion.img
              src="/lovable-uploads/19e19dba-2d9f-4ea9-90d7-a959d65d869b.png"
              alt="Caabi Boutique Homes"
              className="h-8 md:h-12 w-auto"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            />
          </Link>
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden p-2 text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="h-6 w-6" />
          </button>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center gap-8">
            <nav>
              <ul className="flex items-center space-x-8">
                <li>
                  <Link 
                    to="/" 
                    className="text-lg font-medium text-white hover:text-[#C8C8C9] transition-colors"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/calculator" 
                    className="text-lg font-medium text-white hover:text-[#C8C8C9] transition-colors"
                  >
                    ROI Calculator
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/investment"
                    className="text-lg font-medium text-white hover:text-[#C8C8C9] transition-colors"
                  >
                    Investment Proposal
                  </Link>
                </li>
              </ul>
            </nav>
            <ThemeToggle />
          </div>
        </div>

        {/* Mobile navigation */}
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden mt-4"
          >
            <nav className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className="text-lg font-medium text-white hover:text-[#C8C8C9] transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/calculator" 
                className="text-lg font-medium text-white hover:text-[#C8C8C9] transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                ROI Calculator
              </Link>
              <Link 
                to="/investment"
                className="text-lg font-medium text-white hover:text-[#C8C8C9] transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Investment Proposal
              </Link>
            </nav>
            <div className="mt-4 pb-2">
              <ThemeToggle />
            </div>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
};

export default Header;