import { Link } from "react-router-dom";

interface NavLinkProps {
  to: string;
  children: React.ReactNode;
  onClick?: () => void;
}

export const NavLink = ({ to, children, onClick }: NavLinkProps) => (
  <Link 
    to={to} 
    className="text-lg font-medium text-white hover:text-secondary-light transition-colors"
    onClick={onClick}
  >
    {children}
  </Link>
);