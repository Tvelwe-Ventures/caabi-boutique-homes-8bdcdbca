import { motion } from "framer-motion";
import Footer from "../components/Footer";
import Header from "../components/Header";

const Terms = () => {
  return (
    <div className="min-h-screen bg-gradient-dark">
      <Header />
      <div className="container mx-auto px-4 pt-24 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto prose prose-invert"
        >
          <h1 className="text-4xl font-bold text-gradient mb-8">Terms and Conditions</h1>
          <div className="space-y-6 text-gray-300">
            <p>Last updated: {new Date().toLocaleDateString()}</p>
            
            <h2 className="text-2xl font-semibold text-gradient">1. Acceptance of Terms</h2>
            <p>By accessing and using our services, you agree to be bound by these Terms and Conditions.</p>

            <h2 className="text-2xl font-semibold text-gradient">2. Booking and Cancellation</h2>
            <ul>
              <li>All bookings are subject to availability</li>
              <li>Cancellation policies vary by property</li>
              <li>Refunds are processed according to our refund policy</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gradient">3. Property Rules</h2>
            <p>Guests must:</p>
            <ul>
              <li>Respect quiet hours</li>
              <li>Follow building regulations</li>
              <li>Report any damages immediately</li>
              <li>Not host unauthorized events</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gradient">4. Liability</h2>
            <p>Caabi Boutique Homes is not liable for:</p>
            <ul>
              <li>Personal injuries on property</li>
              <li>Loss or damage of personal belongings</li>
              <li>Third-party service disruptions</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gradient">5. Modifications</h2>
            <p>We reserve the right to modify these terms at any time. Continued use of our services constitutes acceptance of modified terms.</p>
          </div>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default Terms;