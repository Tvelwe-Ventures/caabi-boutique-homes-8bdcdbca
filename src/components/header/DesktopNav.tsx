import { NavLink } from "./NavLink";

export const DesktopNav = () => (
  <div className="hidden md:flex items-center gap-8">
    <nav>
      <ul className="flex items-center space-x-8">
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/calculator">ROI Calculator</NavLink></li>
        <li><NavLink to="/investment">Investment Proposal</NavLink></li>
        <li><NavLink to="/statistics">Statistics</NavLink></li>
        <li><NavLink to="/chat">Chat</NavLink></li>
        <li><NavLink to="/community">Community</NavLink></li>
      </ul>
    </nav>
  </div>
);