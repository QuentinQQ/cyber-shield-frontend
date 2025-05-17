import { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '@/assets/logo.svg';
import { motion } from 'framer-motion';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled] = useState(false);

  // Navigation items with shorter but clear labels
  const navItems = [
    { label: "Home", path: "/" },
    { label: "Class Quiz", path: "/quiz" },            
    { label: "Voices", path: "/story" },               
    { label: "Scenarios", path: "/scenario" },         
    { label: "Clean Feed", path: "/clean-feed" },
    { label: "Support", path: "/safe-people" },        
    { label: "Relax", path: "/relax" },                // Added new Relax page
    { label: "Text Check", path: "/text-checker" },
    { label: "Get Help", path: "/get-help" },

  ];

  return (
    <>
      <header 
        className={`fixed top-0 left-0 w-full px-6 py-3 flex justify-between items-center z-40 transition-all duration-300 ${
          scrolled ? "bg-black/80 backdrop-blur-md shadow-lg" : "bg-transparent"
        }`}
      >
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center group">
            <div className="overflow-hidden">
              <img
                src={logo}
                alt="Logo"
                className="h-10 w-auto transition-transform duration-300 group-hover:scale-110"
              />
            </div>
            <span className="ml-2 font-bold text-white text-base hidden md:block">
              WordWeCreated
            </span>
          </Link>
        </div>
        
        {/* Empty div to maintain space */}
        <div></div>
      </header>

      {/* Repositioned and enlarged Circular Menu */}
      <div className="fixed top-20 right-40 z-50">
        {/* Toggle Button */}
        <motion.div
          className="w-20 h-20 rounded-full bg-[#F4A261] flex items-center justify-center cursor-pointer shadow-lg text-lg font-bold"
          onClick={() => setIsOpen(!isOpen)}
          animate={{
            scale: [1, 1.08, 1],
            boxShadow: [
              "0 0 10px rgba(0,0,0,0.2)",
              "0 0 20px rgba(0,0,0,0.3)",
              "0 0 10px rgba(0,0,0,0.2)"
            ],
            rotate: isOpen ? 45 : 0,
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div className="text-black z-10 pointer-events-none">
            {isOpen ? '×' : 'Menu'}
          </div>
        </motion.div>


        {/* Menu Items */}
        {navItems.map((item, index) => {
          const numItems = navItems.length;
          // Adjust the starting angle to place items more on the left side
          const startAngle = -30; // degrees
          const angle = (startAngle + index * (300 / (numItems - 1))) * (Math.PI / 180);
          const distanceFromCenter = isOpen ? 130 : 0; // Increased distance when open
          const posX = Math.cos(angle) * distanceFromCenter;
          const posY = Math.sin(angle) * distanceFromCenter;
          
          // Calculate background color based on index
          const hue = (index * (360 / numItems)) % 360;
          const bgColor = `hsl(${hue}, 80%, 65%)`;

          return (
            <Link
              key={index}
              to={item.path}
              className="absolute w-16 h-16 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-md transition-all duration-500"
              style={{
                transform: `translate(${posX}px, ${posY}px) scale(${isOpen ? 1 : 0})`,
                opacity: isOpen ? 1 : 0,
                backgroundColor: bgColor,
                zIndex: 40 - index,
                transitionDelay: `${index * 0.05}s`,
              }}
              onClick={() => setIsOpen(false)}
            >
              <span className="text-center px-1 text-xs">
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>

      {/* Background overlay when menu is open */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Header;