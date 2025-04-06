// NavBar.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const navItems = [
  { label: 'Home page', path: '/' },
  { label: 'Quiz', path: '/quiz' },
  { label: 'Scenario Game', path: '/scenario' },
  { label: 'Story Time', path: '/story' },
  { label: 'Clean My Feed Game', path: '/clean-feed' },
  { label: 'Safe People', path: '/safe-people' },
  { label: 'How To Open Up', path: '/open-up' },
];

const NavBar: React.FC = () => {
  return (
    <nav className="flex flex-col gap-4">
      {navItems.map((item, index) => (
        <Link
          key={index}
          to={item.path}
          className="text-black text-2xl font-semibold hover:underline"
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
};

export default NavBar;
