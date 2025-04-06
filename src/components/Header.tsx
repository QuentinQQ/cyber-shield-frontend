// Header.tsx
import React, { useState } from 'react';
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from 'framer-motion';
import PrimaryButton from './PrimaryButton';
import NavBar from './NavBar';
import { Button } from './ui/button';
import logo from '@/assets/logo.svg';


const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false); // State to manage the menu open/close

  return (
    <>
      <header className="fixed top-0 left-0 w-full px-6 py-4 flex justify-between items-center z-50 bg-transparent">
        <div className="flex items-center gap-3">
          {/* Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(!isOpen)}
            className="text-white hover:bg-white/10 z-50 p-4 md:p-2"
          >
            {isOpen
              ? <X className="h-10 w-10 md:h-8 md:w-8" />
              : <Menu className="h-10 w-10 md:h-8 md:w-8" />
            }
            <span className="sr-only">Toggle menu</span>
          </Button>

          {/* Logo */}
          <img
            src={logo}
            alt="Logo"
            className="h-10 w-auto md:h-8"
          />
        </div>

        {/* Help Button */}
        <PrimaryButton className="bg-[#F4A261] hover:bg-[#f4ad61] text-white">
          Get Help
        </PrimaryButton>
      </header>

      {/* NavBar */}
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
