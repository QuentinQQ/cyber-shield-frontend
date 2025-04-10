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
  { label: "Home", path: "/" },
  { label: "What's Your Class Like?", path: "/quiz" },
  { label: "Step Into the Story", path: "/scenario" },
  { label: "Hear Their Voices", path: "/story" },
  { label: "Clean My Feed", path: "/clean-feed" },
  { label: "Someone Listens", path: "/safe-people" },
];

/**
 * NavBarProps interface
 * @interface NavBarProps
 * @description Optional props for the NavBar component
 * @property {boolean} compact - Whether to use compact styling (for side menu)
 */
interface NavBarProps {
  compact?: boolean;
}

/**
 * @component NavBar
 * @description
 * Renders a navigation bar in vertical layout where all navigation links are centered.
 * On hover, each link scales up and changes color for better user interactivity.
 * Supports a compact mode for side menu display.
 *
 * @returns {JSX.Element} A React functional component that displays the navigation list.
 */
const NavBar: React.FC<NavBarProps> = ({ compact = false }): JSX.Element => {
  return (
    <nav className={compact ? "flex flex-col w-full" : "grid grid-rows-7 h-screen w-full"}>
      {navItems.map((item, index) => (
        <Link
          key={index}
          to={item.path}
          className={compact 
            ? "flex items-center px-4 py-3 text-sm md:text-base font-medium text-white hover:bg-white/10 border-l-2 border-transparent hover:border-white transition-all duration-200 hover:translate-x-1"
            : "flex items-center justify-center text-2xl md:text-4xl font-semibold hover:bg-cyan-100 transition-all"
          }
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
};

export default NavBar;