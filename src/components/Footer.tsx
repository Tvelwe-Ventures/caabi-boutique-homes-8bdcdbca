import { motion } from "framer-motion";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <motion.footer 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-primary/10 backdrop-blur-sm py-12 mt-20"
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4 text-gradient">About Us</h3>
            <p className="text-gray-400">
              Caabi Boutique Homes specializes in luxury short-term rentals in Dubai,
              offering premium properties and exceptional service.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4 text-gradient">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/" className="text-gray-400 hover:text-primary transition-colors">Home</a></li>
              <li><a href="/calculator" className="text-gray-400 hover:text-primary transition-colors">ROI Calculator</a></li>
              <li><a href="#investment" className="text-gray-400 hover:text-primary transition-colors">Investment Proposal</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4 text-gradient">Contact</h3>
            <ul className="space-y-2 text-gray-400">
              <li>Dubai, UAE</li>
              <li>Email: info@caabi.com</li>
              <li>Phone: +971 XX XXX XXXX</li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4 text-gradient">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <Twitter className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <Linkedin className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Caabi Boutique Homes. All rights reserved.</p>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;