
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Tool {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: string;
  isPopular?: boolean;
  isNew?: boolean;
}

interface ToolsGridProps {
  onToolSelect: (toolId: string) => void;
}

const tools: Tool[] = [
  {
    id: 'compression',
    title: 'Image Compression',
    description: 'Reduce file size while maintaining quality with advanced compression algorithms',
    icon: '🗜️',
    category: 'Optimization',
    isPopular: true
  },
  {
    id: 'format-conversion',
    title: 'Format Conversion',
    description: 'Convert between PNG, JPG, WebP, and other formats instantly',
    icon: '🔄',
    category: 'Conversion'
  },
  {
    id: 'smart-crop',
    title: 'Smart Cropping',
    description: 'Crop images for social media with perfect aspect ratios and previews',
    icon: '✂️',
    category: 'Editing',
    isPopular: true
  },
  {
    id: 'enhancement',
    title: 'Image Enhancement',
    description: 'Sharpen, denoise, and enhance your images with real-time previews',
    icon: '✨',
    category: 'Enhancement'
  },
  {
    id: 'watermark-removal',
    title: 'Watermark Removal',
    description: 'Remove unwanted watermarks with AI-powered inpainting technology',
    icon: '🎭',
    category: 'AI Tools',
    isNew: true
  },
  {
    id: 'face-blur',
    title: 'Face Blurring',
    description: 'Automatically detect and blur faces for privacy protection',
    icon: '👤',
    category: 'Privacy'
  },
  {
    id: 'color-palette',
    title: 'Color Palette Extractor',
    description: 'Extract dominant colors and get HEX codes for your designs',
    icon: '🎨',
    category: 'Analysis'
  },
  {
    id: 'ai-captions',
    title: 'AI Caption Generator',
    description: 'Generate Instagram captions, alt text, and hashtags with AI',
    icon: '🤖',
    category: 'AI Tools',
    isNew: true
  }
];

const ToolsGrid: React.FC<ToolsGridProps> = ({ onToolSelect }) => {
  const categories = Array.from(new Set(tools.map(tool => tool.category)));

  return (
    <section id="tools-section" className="py-20 bg-gradient-to-b from-background to-muted/20">
      <div className="container px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Powerful <span className="gradient-text">Image Tools</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose from our comprehensive suite of image processing tools, each designed for specific tasks
          </p>
        </div>

        <div className="mb-8 flex flex-wrap justify-center gap-3">
          {categories.map((category) => (
            <Badge key={category} variant="secondary" className="px-4 py-2">
              {category}
            </Badge>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tools.map((tool) => (
            <Card 
              key={tool.id} 
              className="group hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer relative overflow-hidden"
              onClick={() => onToolSelect(tool.id)}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-ocean-500/5 to-mint-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <CardHeader className="relative">
                <div className="flex items-start justify-between">
                  <div className="text-3xl mb-2">{tool.icon}</div>
                  <div className="flex gap-1">
                    {tool.isPopular && (
                      <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-xs">
                        Popular
                      </Badge>
                    )}
                    {tool.isNew && (
                      <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-xs">
                        New
                      </Badge>
                    )}
                  </div>
                </div>
                <CardTitle className="text-lg group-hover:text-primary transition-colors">
                  {tool.title}
                </CardTitle>
                <CardDescription>{tool.description}</CardDescription>
              </CardHeader>
              <CardContent className="relative">
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="text-xs">
                    {tool.category}
                  </Badge>
                  <Button 
                    size="sm" 
                    className="bg-gradient-to-r from-ocean-500 to-mint-500 hover:from-ocean-600 hover:to-mint-600"
                  >
                    Use Tool
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ToolsGrid;
