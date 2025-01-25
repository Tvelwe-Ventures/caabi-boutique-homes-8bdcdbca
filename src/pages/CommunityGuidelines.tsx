import { motion } from "framer-motion";
import Footer from "../components/Footer";
import Header from "../components/Header";

const CommunityGuidelines = () => {
  return (
    <div className="min-h-screen bg-gradient-dark">
      <Header />
      <div className="container mx-auto px-4 pt-24 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto prose prose-invert"
        >
          <h1 className="text-4xl font-bold text-gradient mb-8">Community Guidelines</h1>
          <div className="space-y-6 text-gray-300">
            <p>Last updated: {new Date().toLocaleDateString()}</p>
            
            <h2 className="text-2xl font-semibold text-gradient">1. Be Respectful</h2>
            <p>Treat all members with respect. No harassment, hate speech, or discriminatory behavior will be tolerated.</p>

            <h2 className="text-2xl font-semibold text-gradient">2. Keep it Professional</h2>
            <p>This is a professional community. Maintain a professional tone in all interactions.</p>

            <h2 className="text-2xl font-semibold text-gradient">3. Quality Content</h2>
            <ul>
              <li>Share relevant and valuable content</li>
              <li>Avoid spam and self-promotion</li>
              <li>Use appropriate categories for your posts</li>
              <li>Write clear and concise titles</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gradient">4. Privacy</h2>
            <p>Respect others' privacy:</p>
            <ul>
              <li>Don't share personal information without consent</li>
              <li>Don't share confidential business information</li>
              <li>Report privacy violations to moderators</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gradient">5. Moderation</h2>
            <p>Our moderators work to maintain a healthy community environment:</p>
            <ul>
              <li>Posts may be removed if they violate guidelines</li>
              <li>Repeated violations may result in account suspension</li>
              <li>Appeals can be made through proper channels</li>
            </ul>
          </div>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default CommunityGuidelines;