import { Link } from "react-router-dom";

interface NavLinkProps {
  to: string;
  children: React.ReactNode;
  onClick?: () => void;
}

export const NavLink = ({ to, children, onClick }: NavLinkProps) => (
  <Link
    to={to}
    onClick={onClick}
    className="text-sm text-white/90 hover:text-white transition-colors"
  >
    {children}
  </Link>
);