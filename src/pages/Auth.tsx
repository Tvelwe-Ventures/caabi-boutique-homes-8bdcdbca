
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";
import { Mail, Key, LogIn, UserPlus } from "lucide-react";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [sessionChecked, setSessionChecked] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const redirectPath = location.state?.from || "/dashboard";

  // Check if user is already authenticated
  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate(redirectPath, { replace: true });
      }
      setSessionChecked(true);
    };
    
    checkSession();
  }, [navigate, redirectPath]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;
        toast({
          title: "Success!",
          description: "Please check your email to verify your account. For development, you can also continue directly.",
        });
        // For development purposes, redirect anyway
        navigate("/dashboard");
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        
        if (data.session) {
          toast({
            title: "Welcome back!",
            description: "Successfully logged in.",
          });
          navigate(redirectPath);
        }
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
      
      // For development purposes, allow access even after error
      console.log("Authentication error but allowing access for development:", error);
      navigate("/dashboard");
    } finally {
      setLoading(false);
    }
  };

  // Skip authentication for development purposes
  const skipAuth = () => {
    toast({
      title: "Development Mode",
      description: "Bypassing authentication for development purposes.",
    });
    navigate("/dashboard");
  };

  // Don't render anything until we've checked if the user is already logged in
  if (!sessionChecked) {
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-soft-gradient p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
      >
        <div className="text-center mb-8">
          <img
            src="/lovable-uploads/05a25d35-9cba-4184-8637-313d262535f1.png"
            alt="PropOSphere"
            className="h-12 mx-auto mb-4 cursor-pointer"
            onClick={() => navigate("/")}
          />
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            {isSignUp ? "Create an Account" : "Welcome Back"}
          </h2>
          <p className="text-gray-600">
            {isSignUp
              ? "Join our community of property investors"
              : "Sign in to access your account"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10"
                required
              />
            </div>
          </div>
          <div>
            <div className="relative">
              <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10"
                required
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-[#8798CE] hover:bg-[#8798CE]/90"
            disabled={loading}
          >
            {loading ? (
              "Loading..."
            ) : isSignUp ? (
              <span className="flex items-center gap-2">
                <UserPlus className="h-5 w-5" />
                Sign Up
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <LogIn className="h-5 w-5" />
                Sign In
              </span>
            )}
          </Button>

          {/* Development bypass button */}
          <Button
            type="button"
            className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 mt-2"
            onClick={skipAuth}
          >
            Development: Skip Authentication
          </Button>

          <div className="text-center mt-4">
            <button
              type="button"
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-[#8798CE] hover:underline"
            >
              {isSignUp
                ? "Already have an account? Sign In"
                : "Don't have an account? Sign Up"}
            </button>
          </div>

          {!isSignUp && (
            <div className="text-center mt-2">
              <button
                type="button"
                onClick={() => navigate("/forgot-password")}
                className="text-sm text-gray-600 hover:text-[#8798CE]"
              >
                Forgot your password?
              </button>
            </div>
          )}
        </form>
      </motion.div>
    </div>
  );
};

export default Auth;
