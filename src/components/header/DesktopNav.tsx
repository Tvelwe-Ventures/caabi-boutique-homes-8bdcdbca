import { NavLink } from "./NavLink";

export const DesktopNav = () => {
  return (
    <nav className="hidden md:flex items-center space-x-6">
      <NavLink href="/">Home</NavLink>
      <NavLink href="/calculator">Calculator</NavLink>
      <NavLink href="/community">Community</NavLink>
      <NavLink href="/statistics">Statistics</NavLink>
    </nav>
  );
};