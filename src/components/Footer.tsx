import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Github, Star, Users } from "lucide-react";

export interface FooterProps {
  logo?: React.ReactNode;
  brandName?: string;
  socialLinks?: Array<{
    icon: React.ReactNode;
    href: string;
    label: string;
  }>;
  mainLinks?: Array<{
    href: string;
    label: string;
  }>;
  legalLinks?: Array<{
    href: string;
    label: string;
  }>;
  copyright?: {
    text: string;
    license?: string;
  };
}

const defaultProps: FooterProps = {
  logo: <img src="/lovable-uploads/84797c58-4f93-470b-b0d1-f07546eba52b.png" alt="Caabi" className="h-8 w-auto" />,
  brandName: "Caabi Boutique Homes",
  socialLinks: [
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
  ],
  mainLinks: [
    { href: "/", label: "Caabi Boutique Homes" },
    { href: "/community", label: "PropOsphere" },
    { href: "/statistics", label: "Statistics" }
  ],
  legalLinks: [
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms of Service" }
  ],
  copyright: {
    text: "© 2024 Caabi Boutique Homes. All rights reserved.",
  }
};

export function Footer({
  logo = defaultProps.logo,
  brandName = defaultProps.brandName,
  socialLinks = defaultProps.socialLinks,
  mainLinks = defaultProps.mainLinks,
  legalLinks = defaultProps.legalLinks,
  copyright = defaultProps.copyright,
}: FooterProps) {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="pb-6 pt-16 lg:pb-8 lg:pt-24"
    >
      <div className="px-4 lg:px-8">
        <div className="md:flex md:items-start md:justify-between">
          <a
            href="/"
            className="flex items-center gap-x-2"
            aria-label={brandName}
          >
            {logo}
            <span className="font-bold text-xl">{brandName}</span>
          </a>
          <ul className="flex list-none mt-6 md:mt-0 space-x-3">
            {socialLinks.map((link, i) => (
              <li key={i}>
                <Button
                  variant="secondary"
                  size="icon"
                  className="h-10 w-10 rounded-full"
                  asChild
                >
                  <a href={link.href} target="_blank" aria-label={link.label}>
                    {link.icon}
                  </a>
                </Button>
              </li>
            ))}
          </ul>
        </div>
        <div className="border-t mt-6 pt-6 md:mt-4 md:pt-8 lg:grid lg:grid-cols-10">
          <nav className="lg:mt-0 lg:col-[4/11]">
            <ul className="list-none flex flex-wrap -my-1 -mx-2 lg:justify-end">
              {mainLinks.map((link, i) => (
                <li key={i} className="my-1 mx-2 shrink-0">
                  <a
                    href={link.href}
                    className="text-sm text-primary underline-offset-4 hover:underline"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="mt-6 lg:mt-0 lg:col-[4/11]">
            <ul className="list-none flex flex-wrap -my-1 -mx-3 lg:justify-end">
              {legalLinks.map((link, i) => (
                <li key={i} className="my-1 mx-3 shrink-0">
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground underline-offset-4 hover:underline"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-6 text-sm leading-6 text-muted-foreground whitespace-nowrap lg:mt-0 lg:row-[1/3] lg:col-[1/4]">
            <div>{copyright.text}</div>
            {copyright.license && <div>{copyright.license}</div>}
          </div>
        </div>
      </div>
    </motion.footer>
  );
}

export default Footer;