import React, { useState } from 'react';
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from 'framer-motion';
import PrimaryButton from './PrimaryButton';
import NavBar from './NavBar';
import logo from '@/assets/logo.svg';
import { useNavigate, Link } from 'react-router-dom';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleGetHelpClick = () => {
    navigate('/get-help');
  };

  return (
    <>
      <header className="fixed top-0 left-0 w-full px-6 py-4 flex justify-between items-center z-50 bg-transparent">
        <div className="flex items-center gap-3">
          {/* Menu Button */}
          <div
            onClick={() => setIsOpen(!isOpen)}
            className="cursor-pointer z-50 p-2 rounded-full hover:bg-white/10"
          >
            {isOpen
              ? <X className="h-12 w-12 text-white" />
              : <Menu className="h-12 w-12 text-white" />
            }
            <span className="sr-only">Toggle menu</span>
          </div>

          {/* Logo wrapped in Link to navigate to homepage */}
          <Link to="/" className="flex items-center">
            <img
              src={logo}
              alt="Logo"
              className="h-12 w-auto"
            />
          </Link>
        </div>

        {/* Help Button */}
        <PrimaryButton
          className="bg-[#F4A261] hover:bg-[#f4ad61] text-white text-base px-6 py-3"
          onClick={handleGetHelpClick}
        >
          Get Help
        </PrimaryButton>

      </header>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-40 bg-[#A8EE91] p-6 flex flex-col pt-24"
          >
            <div onClick={() => setIsOpen(false)}>
              <NavBar />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
