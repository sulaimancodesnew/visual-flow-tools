
import React from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, Lock } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

interface HeaderProps {
  onMenuClick: () => void;
  isMenuOpen: boolean;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick, isMenuOpen }) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
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
            <div className="w-8 h-8 rounded-lg bg-foreground flex items-center justify-center">
              <Lock className="text-background w-4 h-4" />
            </div>
            <h1 className="text-xl font-bold gradient-text">Lock The Day</h1>
          </div>
        </div>
        
        <nav className="hidden md:flex items-center gap-6">
          <Button variant="ghost" size="sm">
            Tools
          </Button>
          <Button variant="ghost" size="sm">
            Gallery
          </Button>
          <Button variant="ghost" size="sm">
            Pricing
          </Button>
          <Button variant="ghost" size="sm">
            About
          </Button>
          <ThemeToggle />
          <Button size="sm" className="btn-gradient">
            Get Started
          </Button>
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <Button size="sm" className="btn-gradient">
            Get Started
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
