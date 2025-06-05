
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowDown } from 'lucide-react';

const HeroSection: React.FC = () => {
  const scrollToTools = () => {
    const toolsSection = document.getElementById('tools-section');
    if (toolsSection) {
      toolsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-[80vh] flex items-center justify-center gradient-bg">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="container px-4 py-20 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
            Professional
            <span className="gradient-text"> Image Tools</span>
            <br />
            Made Simple
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 animate-fade-in max-w-2xl mx-auto">
            Transform, enhance, and optimize your images with our suite of powerful AI-powered tools. 
            No downloads required, works entirely in your browser.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-fade-in">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-ocean-500 to-mint-500 hover:from-ocean-600 hover:to-mint-600 text-lg px-8 py-6"
              onClick={scrollToTools}
            >
              Explore Tools
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6">
              Watch Demo
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
            <Card className="glass-card animate-scale-in">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-ocean-500 to-mint-500 flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold">AI</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">AI-Powered</h3>
                <p className="text-muted-foreground">Advanced algorithms for face detection, caption generation, and smart enhancement</p>
              </CardContent>
            </Card>

            <Card className="glass-card animate-scale-in">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-mint-500 to-ocean-500 flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold">⚡</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">Lightning Fast</h3>
                <p className="text-muted-foreground">Process images instantly with client-side processing and optimized algorithms</p>
              </CardContent>
            </Card>

            <Card className="glass-card animate-scale-in">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-ocean-500 to-mint-500 flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold">🔒</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">100% Private</h3>
                <p className="text-muted-foreground">Your images never leave your device. All processing happens locally in your browser</p>
              </CardContent>
            </Card>
          </div>
        </div>
        
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={scrollToTools}
            className="rounded-full p-2"
          >
            <ArrowDown size={24} />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
