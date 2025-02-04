
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { FeyButton } from "@/components/ui/fey-button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    console.log("Attempting authentication...");
    
    if (isForgotPassword) {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth`,
      });

      if (error) {
        console.error("Password reset error:", error);
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Success",
          description: "Password reset instructions have been sent to your email.",
          variant: "default",
        });
        setIsForgotPassword(false);
      }
    } else if (isSignUp) {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        console.error("Signup error:", error);
        toast({
          title: "Error signing up",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Success",
          description: "Please check your email for the confirmation link.",
          variant: "default",
        });
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error("Login error:", error);
        toast({
          title: "Error signing in",
          description: error.message,
          variant: "destructive",
        });
      } else {
        console.log("Login successful");
        toast({
          title: "Success",
          description: "Successfully signed in!",
          variant: "default",
        });
        navigate("/dashboard");
      }
    }
    setLoading(false);
  };

  return (
    <BackgroundGradientAnimation interactive={true} containerClassName="min-h-screen">
      <div className="w-full h-screen flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-xl space-y-6">
            <div className="flex flex-col items-center space-y-1">
              <img 
                src="/lovable-uploads/e3dce32b-7ebc-44e2-8286-7329641c3558.png" 
                alt="QuackBoard" 
                className="h-12 mb-2"
              />
              <span className="text-base text-gray-500">Property & Revenue Management System</span>
            </div>
            
            {!isForgotPassword && (
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
            )}

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
              {!isForgotPassword && (
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
              )}
              <FeyButton 
                type="submit" 
                className="w-full h-12 rounded-xl text-lg font-medium"
                disabled={loading}
              >
                {loading 
                  ? "Processing..." 
                  : isForgotPassword 
                    ? "Send Reset Instructions"
                    : isSignUp 
                      ? "Create Account" 
                      : "Sign In"}
              </FeyButton>
            </form>

            {!isForgotPassword && !isSignUp && (
              <button
                onClick={() => setIsForgotPassword(true)}
                className="w-full text-center text-sm text-gray-500 hover:text-primary transition-colors"
              >
                Forgot your password?
              </button>
            )}

            {isForgotPassword && (
              <button
                onClick={() => setIsForgotPassword(false)}
                className="w-full text-center text-sm text-gray-500 hover:text-primary transition-colors"
              >
                Back to Sign In
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </BackgroundGradientAnimation>
  );
};

export default Auth;
