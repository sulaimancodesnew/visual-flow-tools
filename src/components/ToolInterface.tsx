
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Download } from 'lucide-react';
import ImageUpload from './ImageUpload';
import { toast } from '@/hooks/use-toast';

interface ToolInterfaceProps {
  toolId: string;
  onBack: () => void;
}

const toolData = {
  'compression': {
    title: 'Image Compression',
    description: 'Reduce file size while maintaining visual quality',
    icon: '🗜️',
    category: 'Optimization'
  },
  'format-conversion': {
    title: 'Format Conversion',
    description: 'Convert between different image formats',
    icon: '🔄',
    category: 'Conversion'
  },
  'smart-crop': {
    title: 'Smart Cropping',
    description: 'Crop images for social media platforms',
    icon: '✂️',
    category: 'Editing'
  },
  'enhancement': {
    title: 'Image Enhancement',
    description: 'Enhance image quality with filters',
    icon: '✨',
    category: 'Enhancement'
  },
  'watermark-removal': {
    title: 'Watermark Removal',
    description: 'Remove watermarks using AI',
    icon: '🎭',
    category: 'AI Tools'
  },
  'face-blur': {
    title: 'Face Blurring',
    description: 'Automatically blur faces for privacy',
    icon: '👤',
    category: 'Privacy'
  },
  'color-palette': {
    title: 'Color Palette Extractor',
    description: 'Extract colors from your image',
    icon: '🎨',
    category: 'Analysis'
  },
  'ai-captions': {
    title: 'AI Caption Generator',
    description: 'Generate captions and hashtags',
    icon: '🤖',
    category: 'AI Tools'
  }
};

const ToolInterface: React.FC<ToolInterfaceProps> = ({ toolId, onBack }) => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processedImage, setProcessedImage] = useState<string | null>(null);

  const tool = toolData[toolId as keyof typeof toolData];

  if (!tool) {
    return (
      <div className="container px-4 py-20">
        <Card>
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Tool Not Found</h2>
            <Button onClick={onBack}>Go Back</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setUploadedImage(e.target?.result as string);
      setProcessedImage(null);
    };
    reader.readAsDataURL(file);
  };

  const handleProcessImage = async () => {
    if (!uploadedImage) return;
    
    setIsProcessing(true);
    
    // Simulate processing
    setTimeout(() => {
      setProcessedImage(uploadedImage); // For demo, use same image
      setIsProcessing(false);
      toast({
        title: "Processing complete!",
        description: "Your image has been processed successfully.",
      });
    }, 2000);
  };

  const handleDownload = () => {
    if (!processedImage) return;
    
    const link = document.createElement('a');
    link.href = processedImage;
    link.download = `processed-image-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "Download started",
      description: "Your processed image is being downloaded.",
    });
  };

  const clearImage = () => {
    setUploadedImage(null);
    setProcessedImage(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="container px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="outline" onClick={onBack}>
            <ArrowLeft size={16} className="mr-2" />
            Back to Tools
          </Button>
          <div className="flex items-center gap-3">
            <span className="text-2xl">{tool.icon}</span>
            <div>
              <h1 className="text-2xl font-bold">{tool.title}</h1>
              <p className="text-muted-foreground">{tool.description}</p>
            </div>
            <Badge variant="secondary">{tool.category}</Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Upload Image</CardTitle>
                <CardDescription>
                  Select an image to get started with {tool.title.toLowerCase()}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ImageUpload 
                  onImageUpload={handleImageUpload}
                  currentImage={uploadedImage}
                  onClearImage={clearImage}
                />
              </CardContent>
            </Card>

            {uploadedImage && (
              <Card>
                <CardHeader>
                  <CardTitle>Processing Options</CardTitle>
                  <CardDescription>
                    Configure settings for {tool.title.toLowerCase()}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <Button 
                      onClick={handleProcessImage}
                      disabled={isProcessing}
                      className="bg-gradient-to-r from-ocean-500 to-mint-500 hover:from-ocean-600 hover:to-mint-600"
                    >
                      {isProcessing ? 'Processing...' : `Apply ${tool.title}`}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          <div className="space-y-6">
            {processedImage && (
              <Card>
                <CardHeader>
                  <CardTitle>Processed Result</CardTitle>
                  <CardDescription>
                    Your image has been processed successfully
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="relative">
                    <img 
                      src={processedImage} 
                      alt="Processed result" 
                      className="w-full max-h-96 object-contain rounded-lg border"
                    />
                  </div>
                  <Button 
                    onClick={handleDownload}
                    className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                  >
                    <Download size={16} className="mr-2" />
                    Download Processed Image
                  </Button>
                </CardContent>
              </Card>
            )}

            {!processedImage && uploadedImage && (
              <Card className="border-dashed">
                <CardContent className="p-8 text-center text-muted-foreground">
                  <div className="text-4xl mb-4">⏳</div>
                  <p>Your processed image will appear here</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolInterface;
