import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { FeyButton } from "@/components/ui/fey-button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    if (isSignUp) {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        toast({
          title: "Error signing up",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Success",
          description: "Please check your email for the confirmation link.",
        });
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast({
          title: "Error signing in",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Success",
          description: "Successfully signed in!",
        });
        navigate("/community");
      }
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-soft-gradient flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-xl space-y-6">
          <div className="flex flex-col items-center space-y-1">
            <img 
              src="/lovable-uploads/a5da3d5d-8a5a-4d5e-9212-80d44c6a6a88.png" 
              alt="PropOsphere" 
              className="h-40 md:h-56 w-auto"
            />
            <span className="text-base text-gray-500 -mt-8">by Caabi</span>
          </div>
          
          <div className="flex justify-center space-x-4 mb-6">
            <button
              onClick={() => setIsSignUp(false)}
              className={`px-6 py-2 rounded-full transition-all ${
                !isSignUp 
                  ? 'bg-primary text-white shadow-md' 
                  : 'text-gray-500 hover:text-primary'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setIsSignUp(true)}
              className={`px-6 py-2 rounded-full transition-all ${
                isSignUp 
                  ? 'bg-primary text-white shadow-md' 
                  : 'text-gray-500 hover:text-primary'
              }`}
            >
              Sign Up
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-12 rounded-xl bg-white/50 border-gray-200 focus:border-primary focus:ring-primary"
              />
            </div>
            <div className="space-y-2">
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="h-12 rounded-xl bg-white/50 border-gray-200 focus:border-primary focus:ring-primary"
              />
            </div>
            <FeyButton 
              type="submit" 
              className="w-full h-12 rounded-xl text-lg font-medium"
              disabled={loading}
            >
              {loading ? "Processing..." : isSignUp ? "Create Account" : "Sign In"}
            </FeyButton>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default Auth;