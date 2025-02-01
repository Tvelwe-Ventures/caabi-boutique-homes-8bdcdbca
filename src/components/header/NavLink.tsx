import { Link } from "react-router-dom";

interface NavLinkProps {
  to: string;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export const NavLink = ({ to, children, onClick, className = "" }: NavLinkProps) => (
  <Link
    to={to}
    onClick={onClick}
    className={`text-sm transition-colors w-full ${className.includes('text-white') ? className : `text-black ${className}`}`}
  >
    {children}
  </Link>
);