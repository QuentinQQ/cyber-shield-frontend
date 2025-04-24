import { useState } from 'react';
import { Menu, X, Home, Users, BookOpen, Headphones, Shield, Heart } from "lucide-react";
import { Link, useNavigate } from 'react-router-dom';
import PrimaryButton from './PrimaryButton';
import logo from '@/assets/logo.svg';

/**
 * Custom NavBar with cool interactive effects
 */
const CoolNavBar = () => {
  // Map menu items to appropriate icons
  const navItems = [
    { label: "Home", path: "/", icon: Home },
    { label: "What's Your Class Like?", path: "/quiz", icon: Users },
    { label: "Step Into the Story", path: "/scenario", icon: BookOpen },
    { label: "Hear Their Voices", path: "/story", icon: Headphones },
    { label: "Clean My Feed", path: "/clean-feed", icon: Shield },
    { label: "Someone Listens", path: "/safe-people", icon: Heart },
  ];

  // State for the currently hovered item
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);

  return (
    <nav className="flex flex-col w-full space-y-2">
      {navItems.map((item, index) => {
        const Icon = item.icon;
        return (
          <Link
            key={index}
            to={item.path}
            className="relative overflow-hidden rounded-lg group"
            onMouseEnter={() => setHoveredItem(index)}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <div className="flex items-center px-5 py-4 transition-all duration-300 bg-white/10 hover:bg-white/20 rounded-lg">
              <div className="mr-3 flex-shrink-0">
                <Icon 
                  className={`w-5 h-5 text-white transition-all duration-300 ${
                    hoveredItem === index ? "scale-125 rotate-12" : ""
                  }`} 
                />
              </div>
              <div className="flex-1">
                {item.label.split('').map((letter, idx) => (
                  <span 
                    key={idx}
                    className={`inline-block text-white text-base font-medium transition-all duration-200 ${
                      hoveredItem === index 
                        ? "transform hover:scale-110 hover:-translate-y-1 hover:text-yellow-300" 
                        : ""
                    }`}
                    style={{ 
                      transitionDelay: hoveredItem === index ? `${idx * 30}ms` : '0ms',
                      display: letter === " " ? "inline" : "inline-block",
                      padding: letter === " " ? "0 0.15rem" : "0"
                    }}
                  >
                    {letter}
                  </span>
                ))}
              </div>
            </div>
            
            {/* Animated particles on hover */}
            {hoveredItem === index && (
              <>
                <div className="absolute top-0 left-1/4 w-1 h-1 rounded-full bg-yellow-300 animate-float-1"></div>
                <div className="absolute top-3 right-1/3 w-1 h-1 rounded-full bg-pink-300 animate-float-2"></div>
                <div className="absolute bottom-2 right-1/4 w-1 h-1 rounded-full bg-blue-300 animate-float-3"></div>
                <div className="absolute bottom-0 left-1/3 w-1 h-1 rounded-full bg-green-300 animate-float-4"></div>
              </>
            )}
          </Link>
        );
      })}
    </nav>
  );
};

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled] = useState(false);
  const navigate = useNavigate();

  const handleGetHelpClick = () => {
    navigate('/get-help');
  };

  return (
    <>
      <header 
        className={`fixed top-0 left-0 w-full px-6 py-3 flex justify-between items-center z-50 transition-all duration-300 ${
          scrolled ? "bg-black/80 backdrop-blur-md shadow-lg" : "bg-transparent"
        }`}
      >
        <div className="flex items-center gap-3">
          {/* Menu Button with animation */}
          <div
            onClick={() => setIsOpen(!isOpen)}
            className="cursor-pointer z-50 p-2 rounded-full hover:bg-[#A8EE91]/30 transition-all duration-300"
          >
            {isOpen ? (
              <X className="h-8 w-8 text-white" />
            ) : (
              <div className="relative">
                <Menu className="h-8 w-8 text-white" />
                <span className="absolute -top-1 -right-1 flex h-2 w-2">

                </span>
              </div>
            )}
          </div>
          
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
      <PrimaryButton
        className="bg-[#F4A261] hover:bg-[#f4ad61] text-black text-base px-6 py-3 cursor-pointer"
        onClick={handleGetHelpClick}
      >
        Get Help
      </PrimaryButton>
      </header>

      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div 
        className={`fixed left-0 top-0 z-40 w-[85%] md:w-[320px] h-full transform transition-all duration-500 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="h-full bg-gradient-to-br from-[#A8EE91] via-[#90dc79] to-[#68b053] overflow-hidden relative">
          {/* Background animated bubbles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="bubble bubble-1"></div>
            <div className="bubble bubble-2"></div>
            <div className="bubble bubble-3"></div>
            <div className="bubble bubble-4"></div>
          </div>
          
          <div className="relative h-full flex flex-col">
            {/* Menu header */}
            <div className="pt-20 px-4 pb-4">
              <h2 className="text-white text-lg font-bold"> </h2>
            </div>
            
            {/* Custom navigation */}
            <div className="flex-1 overflow-y-auto custom-scrollbar px-4 py-2" onClick={() => setIsOpen(false)}>
              <CoolNavBar />
            </div>
          </div>
        </div>
      </div>

      {/* Add custom CSS for animations */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 3px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: rgba(255, 255, 255, 0.3);
          border-radius: 20px;
        }
        
        /* Animated bubbles in background */
        .bubble {
          position: absolute;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(1px);
          -webkit-backdrop-filter: blur(1px);
        }
        
        .bubble-1 {
          width: 100px;
          height: 100px;
          left: -30px;
          top: 10%;
          animation: float 8s ease-in-out infinite;
        }
        
        .bubble-2 {
          width: 150px;
          height: 150px;
          right: -50px;
          top: 35%;
          animation: float 12s ease-in-out infinite;
          animation-delay: -3s;
        }
        
        .bubble-3 {
          width: 60px;
          height: 60px;
          left: 20%;
          bottom: 20%;
          animation: float 7s ease-in-out infinite;
          animation-delay: -2s;
        }
        
        .bubble-4 {
          width: 80px;
          height: 80px;
          right: 10%;
          bottom: 10%;
          animation: float 10s ease-in-out infinite;
          animation-delay: -5s;
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
          }
          25% {
            transform: translateY(-15px) translateX(10px);
          }
          50% {
            transform: translateY(5px) translateX(-10px);
          }
          75% {
            transform: translateY(10px) translateX(5px);
          }
        }
        
        /* Particle animations */
        @keyframes float-1 {
          0%, 100% { transform: translate(0, 0); opacity: 1; }
          50% { transform: translate(-10px, -15px); opacity: 0.6; }
          100% { transform: translate(0, 0); opacity: 1; }
        }
        
        @keyframes float-2 {
          0%, 100% { transform: translate(0, 0); opacity: 1; }
          50% { transform: translate(12px, -10px); opacity: 0.7; }
          100% { transform: translate(0, 0); opacity: 1; }
        }
        
        @keyframes float-3 {
          0%, 100% { transform: translate(0, 0); opacity: 1; }
          50% { transform: translate(8px, 10px); opacity: 0.8; }
          100% { transform: translate(0, 0); opacity: 1; }
        }
        
        @keyframes float-4 {
          0%, 100% { transform: translate(0, 0); opacity: 1; }
          50% { transform: translate(-12px, 8px); opacity: 0.7; }
          100% { transform: translate(0, 0); opacity: 1; }
        }
        
        .animate-float-1 { animation: float-1 3s ease-in-out infinite; }
        .animate-float-2 { animation: float-2 3.5s ease-in-out infinite; }
        .animate-float-3 { animation: float-3 4s ease-in-out infinite; }
        .animate-float-4 { animation: float-4 4.5s ease-in-out infinite; }
      `}</style>
    </>
  );
};

export default Header;