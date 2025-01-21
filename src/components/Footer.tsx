import { motion } from "framer-motion";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <motion.footer 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-primary/10 backdrop-blur-sm py-8 mt-20"
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-3 text-gradient">About Us</h3>
            <p className="text-sm text-gray-300">
              Caabi Boutique Homes specializes in luxury short-term rentals in Dubai,
              offering premium properties and exceptional service.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-3 text-gradient">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="text-gray-300 hover:text-primary transition-colors">Home</Link></li>
              <li><Link to="/calculator" className="text-gray-300 hover:text-primary transition-colors">ROI Calculator</Link></li>
              <li><Link to="#investment" className="text-gray-300 hover:text-primary transition-colors">Investment Proposal</Link></li>
              <li><Link to="/privacy" className="text-gray-300 hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-gray-300 hover:text-primary transition-colors">Terms & Conditions</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-3 text-gradient">Contact</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>Dubai, UAE</li>
              <li>Email: info@caabi.com</li>
              <li>Phone: +971 XX XXX XXXX</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-3 text-gradient">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-primary transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-primary transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-primary transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-primary transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-xs text-gray-400">
          <p>&copy; {new Date().getFullYear()} Caabi Boutique Homes. All rights reserved.</p>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;