import { Github, Star, Users } from "lucide-react";
import Footer from "../Footer";

export const DashboardFooter = () => {
  const socialLinks = [
    {
      icon: <Github className="h-5 w-5" />,
      href: "https://github.com/caabi",
      label: "GitHub"
    },
    {
      icon: <Star className="h-5 w-5" />,
      href: "/statistics",
      label: "Statistics"
    },
    {
      icon: <Users className="h-5 w-5" />,
      href: "/community",
      label: "Community"
    }
  ];

  const mainLinks = [
    { href: "/", label: "Caabi Boutique Homes" },
    { href: "/community", label: "PropOsphere" },
    { href: "/statistics", label: "Statistics" }
  ];

  const legalLinks = [
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms of Service" }
  ];

  return (
    <Footer
      logo={<img src="/lovable-uploads/6ebca0aa-680c-4f81-af6c-65d297c5c9a5.png" alt="QuackOS" className="h-8 w-auto" />}
      brandName="QuackOS"
      socialLinks={socialLinks}
      mainLinks={mainLinks}
      legalLinks={legalLinks}
      copyright={{
        text: "© 2024 Caabi Boutique Homes. All rights reserved.",
      }}
    />
  );
};