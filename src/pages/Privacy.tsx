import { motion } from "framer-motion";
import Footer from "../components/Footer";
import Header from "../components/Header";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-gradient-dark">
      <Header />
      <div className="container mx-auto px-4 pt-24 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto prose prose-invert"
        >
          <h1 className="text-4xl font-bold text-gradient mb-8">Privacy Policy</h1>
          <div className="space-y-6 text-gray-300">
            <p>Last updated: {new Date().toLocaleDateString()}</p>
            
            <h2 className="text-2xl font-semibold text-gradient">1. Information We Collect</h2>
            <p>We collect information that you provide directly to us, including when you:</p>
            <ul>
              <li>Create an account</li>
              <li>Make a booking</li>
              <li>Contact our support team</li>
              <li>Subscribe to our newsletter</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gradient">2. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul>
              <li>Process your bookings</li>
              <li>Send you important updates</li>
              <li>Improve our services</li>
              <li>Comply with legal obligations</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gradient">3. Information Sharing</h2>
            <p>We do not sell your personal information. We may share your information with:</p>
            <ul>
              <li>Property owners</li>
              <li>Service providers</li>
              <li>Legal authorities when required</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gradient">4. Your Rights</h2>
            <p>You have the right to:</p>
            <ul>
              <li>Access your personal information</li>
              <li>Correct inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Opt-out of marketing communications</li>
            </ul>
          </div>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default Privacy;