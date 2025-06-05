
import React, { useState } from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import ToolsGrid from '@/components/ToolsGrid';
import ToolInterface from '@/components/ToolInterface';

const Index = () => {
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleToolSelect = (toolId: string) => {
    setSelectedTool(toolId);
  };

  const handleBackToTools = () => {
    setSelectedTool(null);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  if (selectedTool) {
    return (
      <div className="min-h-screen bg-background">
        <Header onMenuClick={toggleMenu} isMenuOpen={isMenuOpen} />
        <ToolInterface toolId={selectedTool} onBack={handleBackToTools} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header onMenuClick={toggleMenu} isMenuOpen={isMenuOpen} />
      <HeroSection />
      <ToolsGrid onToolSelect={handleToolSelect} />
    </div>
  );
};

export default Index;
