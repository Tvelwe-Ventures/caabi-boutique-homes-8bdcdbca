import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { Logo } from "./header/Logo";
import { DesktopNav } from "./header/DesktopNav";
import { MobileNav } from "./header/MobileNav";

const Header = () => {
  const location = useLocation();
  const isQuackOSRoute = location.pathname.includes('dashboard');

  if (isQuackOSRoute) {
    return (
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50 bg-[#8798CE] border-b border-primary-light/20"
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Logo />
            <Button
              variant="ghost"
              size="icon"
              onClick={handleLogout}
              className="text-white hover:text-white/80"
            >
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </motion.header>
    );
  }

  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 bg-[#8798CE] border-b border-primary-light/20"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Logo />
          <MobileNav />
          <DesktopNav />
        </div>
      </div>
    </motion.header>
  );
};

export default Header;