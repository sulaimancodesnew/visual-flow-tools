
import React, { useState } from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import ToolsGrid from '@/components/ToolsGrid';
import FeaturesSection from '@/components/FeaturesSection';
import StatsSection from '@/components/StatsSection';
import TestimonialsSection from '@/components/TestimonialsSection';
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
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
        <Header onMenuClick={toggleMenu} isMenuOpen={isMenuOpen} />
        <ToolInterface toolId={selectedTool} onBack={handleBackToTools} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-muted/20 to-background">
      <Header onMenuClick={toggleMenu} isMenuOpen={isMenuOpen} />
      <HeroSection />
      <StatsSection />
      <ToolsGrid onToolSelect={handleToolSelect} />
      <FeaturesSection />
      <TestimonialsSection />
    </div>
  );
};

export default Index;
