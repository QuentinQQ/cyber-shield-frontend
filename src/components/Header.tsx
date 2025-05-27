import { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '@/assets/logo.svg';
import { motion } from 'framer-motion';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled] = useState(false);

  const navItems = [
    { label: "Home", path: "/" },
    { label: "1.Cyber Stats", path: "/quiz" },  
    { label: "2.Net Quiz", path: "/quiz-2" },           
    { label: "3.Voices", path: "/story" },               
    { label: "4.Scenario", path: "/scenario" },         
    { label: "5.Clean Feed", path: "/clean-feed" },
    { label: "6.Text Check", path: "/text-checker" },
    { label: "7.Support", path: "/safe-people" },        
    { label: "8.Relax", path: "/relax" },             
    { label: "Get Help", path: "/get-help" },
    { label: "Privacy", path: "/privacy-policy", isSpecial: true },
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
      <div className="fixed top-41 right-72 z-50">
        {/* Toggle Button */}
        <motion.div
          className="w-20 h-20 rounded-full bg-[#F4A261] flex items-center justify-center cursor-pointer shadow-lg text-lg font-bold absolute top-0 left-0"
          onClick={() => setIsOpen(!isOpen)}
          animate={{
            scale: [1, 1.08, 1],
            boxShadow: [
              "0 0 10px rgba(244, 162, 97, 0.4), 0 0 20px rgba(244, 162, 97, 0.2)",
              "0 0 20px rgba(244, 162, 97, 0.6), 0 0 30px rgba(244, 162, 97, 0.3)",
              "0 0 10px rgba(244, 162, 97, 0.4), 0 0 20px rgba(244, 162, 97, 0.2)"
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
          const bgColor = item.isSpecial ? '#A78BFA' : `hsl(${hue}, 80%, 65%)`;
          
          // Create glow color based on background color
          const glowColor = item.isSpecial ? 'rgba(167, 139, 250, 0.6)' : `hsla(${hue}, 80%, 65%, 0.6)`;

          return (
            <Link
              key={index}
              to={item.path}
              className={`absolute w-16 h-16 rounded-full flex items-center justify-center text-black text-xs font-bold shadow-md transition-all duration-500 hover:scale-110`}
              style={{
                transform: `translate(${posX}px, ${posY}px) scale(${isOpen ? 1 : 0})`,
                opacity: isOpen ? 1 : 0,
                backgroundColor: bgColor,
                boxShadow: isOpen ? `0 0 15px ${glowColor}, 0 0 25px ${glowColor.replace('0.6', '0.3')}` : 'none',
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