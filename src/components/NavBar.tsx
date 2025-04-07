/**
 * @file NavBar.tsx
 * @description
 * The NavBar component renders a vertically-centered list of navigation links for the application.
 * Each item has an interactive hover animation (scale and color highlight).
 * This component is fully responsive and uses Tailwind CSS for styling.
 */

import React, { JSX } from "react";
import { Link } from "react-router-dom";

/**
 * @constant navItems
 * @description
 * An array of objects representing the navigation items. Each object contains:
 * @property {string} label - The display text of the navigation item
 * @property {string} path - The target route path for the navigation link
 */
const navItems: { label: string; path: string }[] = [
  { label: "Home page", path: "/" },
  { label: "Quiz", path: "/quiz" },
  { label: "Scenario Game", path: "/scenario" },
  { label: "Story Time", path: "/story" },
  { label: "Clean My Feed Game", path: "/clean-feed" },
  { label: "Safe People", path: "/safe-people" },
  { label: "How To Open Up", path: "/open-up" },
];

/**
 * @component NavBar
 * @description
 * Renders a navigation bar in vertical layout where all navigation links are centered.
 * On hover, each link scales up and changes color for better user interactivity.
 *
 * @returns {JSX.Element} A React functional component that displays the navigation list.
 */
const NavBar: React.FC = () => {
  return (
    <nav className="grid grid-rows-7 h-screen w-full">
      {navItems.map((item, index) => (
        <Link
          key={index}
          to={item.path}
          className="flex items-center justify-center text-2xl md:text-4xl font-semibold hover:bg-cyan-100 transition-all"
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
};


export default NavBar;
