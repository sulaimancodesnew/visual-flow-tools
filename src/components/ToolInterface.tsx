import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Download, Cloud, Sparkles } from 'lucide-react';
import ImageUpload from './ImageUpload';
import { toast } from '@/hooks/use-toast';
import { useGeminiAI } from '@/hooks/useGeminiAI';

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
  const [cloudImageUrl, setCloudImageUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [enableCloudStorage, setEnableCloudStorage] = useState(false);
  const [aiResult, setAiResult] = useState<string>('');
  
  const { generateText, analyzeImage, isLoading: aiLoading } = useGeminiAI();

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

  const handleImageUpload = (file: File, cloudUrl?: string) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setUploadedImage(e.target?.result as string);
      setProcessedImage(null);
      setAiResult('');
      if (cloudUrl) {
        setCloudImageUrl(cloudUrl);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleProcessImage = async () => {
    if (!uploadedImage) return;
    
    setIsProcessing(true);
    
    if (toolId === 'ai-captions') {
      // Use Gemini AI for caption generation
      const caption = await generateText(
        "Generate 3 engaging social media captions with relevant hashtags for this image. Make them creative and attention-grabbing."
      );
      
      if (caption) {
        setAiResult(caption);
        toast({
          title: "AI Captions generated!",
          description: "Your captions have been generated successfully.",
        });
      }
    } else {
      // Simulate processing for other tools
      setTimeout(() => {
        setProcessedImage(uploadedImage);
        toast({
          title: "Processing complete!",
          description: "Your image has been processed successfully.",
        });
      }, 2000);
    }
    
    setIsProcessing(false);
  };

  const handleDownload = () => {
    if (!processedImage) return;
    
    const link = document.createElement('a');
    link.href = processedImage;
    link.download = `lock-the-day-${toolId}-${Date.now()}.png`;
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
    setCloudImageUrl(null);
    setAiResult('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="container px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="outline" onClick={onBack} className="hover:bg-foreground hover:text-background transition-all duration-300">
            <ArrowLeft size={16} className="mr-2" />
            Back to Tools
          </Button>
          <div className="flex items-center gap-3">
            <span className="text-2xl">{tool.icon}</span>
            <div>
              <h1 className="text-2xl font-bold gradient-text">{tool.title}</h1>
              <p className="text-muted-foreground">{tool.description}</p>
            </div>
            <Badge variant="secondary" className="bg-muted text-foreground">
              {tool.category}
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <Card className="border-0 shadow-lg glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  Upload Image
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setEnableCloudStorage(!enableCloudStorage)}
                    className={enableCloudStorage ? 'bg-foreground text-background' : ''}
                  >
                    <Cloud size={16} className="mr-1" />
                    {enableCloudStorage ? 'Cloud ON' : 'Cloud OFF'}
                  </Button>
                </CardTitle>
                <CardDescription>
                  Select an image to get started with {tool.title.toLowerCase()}
                  {enableCloudStorage && ' (will be saved to cloud)'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ImageUpload 
                  onImageUpload={handleImageUpload}
                  currentImage={uploadedImage}
                  onClearImage={clearImage}
                  enableCloudStorage={enableCloudStorage}
                />
              </CardContent>
            </Card>

            {uploadedImage && (
              <Card className="border-0 shadow-lg glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles size={16} />
                    Processing Options
                  </CardTitle>
                  <CardDescription>
                    Configure settings for {tool.title.toLowerCase()}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <Button 
                      onClick={handleProcessImage}
                      disabled={isProcessing || aiLoading}
                      className="btn-gradient hover:scale-105 transition-all duration-300"
                    >
                      {isProcessing || aiLoading ? 'Processing...' : `Apply ${tool.title}`}
                    </Button>
                  </div>
                  {cloudImageUrl && (
                    <div className="text-xs text-center text-muted-foreground">
                      ✓ Image saved to cloud storage
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>

          <div className="space-y-6">
            {(processedImage || aiResult) && (
              <Card className="border-0 shadow-lg glass-card">
                <CardHeader>
                  <CardTitle className="gradient-text">
                    {toolId === 'ai-captions' ? 'Generated Captions' : 'Processed Result'}
                  </CardTitle>
                  <CardDescription>
                    {toolId === 'ai-captions' 
                      ? 'AI-generated captions and hashtags for your image'
                      : 'Your image has been processed successfully'
                    }
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {toolId === 'ai-captions' && aiResult ? (
                    <Textarea 
                      value={aiResult}
                      readOnly
                      className="min-h-[200px] bg-muted/50"
                      placeholder="AI-generated captions will appear here..."
                    />
                  ) : processedImage ? (
                    <div className="relative group">
                      <img 
                        src={processedImage} 
                        alt="Processed result" 
                        className="w-full max-h-96 object-contain rounded-lg border group-hover:shadow-lg transition-shadow duration-300"
                      />
                    </div>
                  ) : null}
                  
                  {processedImage && (
                    <Button 
                      onClick={handleDownload}
                      className="w-full bg-foreground text-background hover:bg-muted-foreground hover:scale-105 transition-all duration-300"
                    >
                      <Download size={16} className="mr-2" />
                      Download Processed Image
                    </Button>
                  )}
                </CardContent>
              </Card>
            )}

            {!processedImage && !aiResult && uploadedImage && (
              <Card className="border-dashed border-2 border-muted bg-muted/20">
                <CardContent className="p-8 text-center text-muted-foreground">
                  <div className="text-4xl mb-4 animate-float">⏳</div>
                  <p>Your {toolId === 'ai-captions' ? 'AI-generated content' : 'processed image'} will appear here</p>
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
