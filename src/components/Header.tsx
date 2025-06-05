
import React from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

interface HeaderProps {
  onMenuClick: () => void;
  isMenuOpen: boolean;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick, isMenuOpen }) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onMenuClick}
            className="md:hidden"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-ocean-500 to-mint-500 flex items-center justify-center">
              <span className="text-white font-bold text-sm">N</span>
            </div>
            <h1 className="text-xl font-bold gradient-text">NextImageTools</h1>
          </div>
        </div>
        
        <nav className="hidden md:flex items-center gap-6">
          <Button variant="ghost" size="sm">
            Tools
          </Button>
          <Button variant="ghost" size="sm">
            About
          </Button>
          <Button variant="ghost" size="sm">
            Help
          </Button>
          <Button size="sm" className="bg-gradient-to-r from-ocean-500 to-mint-500 hover:from-ocean-600 hover:to-mint-600">
            Get Started
          </Button>
        </nav>

        <Button size="sm" className="md:hidden bg-gradient-to-r from-ocean-500 to-mint-500 hover:from-ocean-600 hover:to-mint-600">
          Get Started
        </Button>
      </div>
    </header>
  );
};

export default Header;
