import React from 'react';
import PrimaryButton from './PrimaryButton';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { Button } from './ui/button';
import { Menu } from "lucide-react";

interface HeaderProps {

}

const Header: React.FC<HeaderProps> = () => {
  return (
    // <header className="flex justify-between items-center p-4 w-full">
    <header className="fixed top-0 left-0 w-full px-6 py-4 flex justify-between items-center z-50 bg-transparent">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[240px] sm:w-[300px]">
          <nav className="flex flex-col gap-4 mt-8">
            {/* Todo: Change the items */}
            <a href="/" className="text-lg font-medium hover:text-blue-500 transition-colors">Home</a>
            <a href="/features" className="text-lg font-medium hover:text-blue-500 transition-colors">Features</a>
            <a href="/about" className="text-lg font-medium hover:text-blue-500 transition-colors">About</a>
            <a href="/contact" className="text-lg font-medium hover:text-blue-500 transition-colors">Contact</a>
          </nav>
        </SheetContent>
      </Sheet>
      
      <PrimaryButton className="bg-orange-500 hover:bg-orange-600 text-white">
        Get Help
      </PrimaryButton>
    </header>
  );
};

export default Header;