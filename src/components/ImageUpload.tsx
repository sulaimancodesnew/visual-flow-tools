
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, X, Image as ImageIcon, Cloud } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface ImageUploadProps {
  onImageUpload: (file: File, url?: string) => void;
  acceptedFormats?: string[];
  maxSize?: number;
  currentImage?: string | null;
  onClearImage?: () => void;
  enableCloudStorage?: boolean;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  onImageUpload,
  acceptedFormats = ['image/jpeg', 'image/png', 'image/webp'],
  maxSize = 10 * 1024 * 1024, // 10MB
  currentImage,
  onClearImage,
  enableCloudStorage = false
}) => {
  const [isDragActive, setIsDragActive] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const uploadToSupabase = async (file: File): Promise<string | null> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `uploads/${fileName}`;

    const { error } = await supabase.storage
      .from('images')
      .upload(filePath, file);

    if (error) {
      console.error('Upload error:', error);
      return null;
    }

    const { data } = supabase.storage
      .from('images')
      .getPublicUrl(filePath);

    return data.publicUrl;
  };

  const onDrop = useCallback(async (acceptedFiles: File[], rejectedFiles: any[]) => {
    setIsDragActive(false);
    
    if (rejectedFiles.length > 0) {
      const error = rejectedFiles[0].errors[0];
      if (error.code === 'file-too-large') {
        toast({
          title: "File too large",
          description: `Please select an image smaller than ${maxSize / (1024 * 1024)}MB`,
          variant: "destructive",
        });
      } else if (error.code === 'file-invalid-type') {
        toast({
          title: "Invalid file type",
          description: "Please select a valid image file (JPG, PNG, WebP)",
          variant: "destructive",
        });
      }
      return;
    }

    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      
      if (enableCloudStorage) {
        setIsUploading(true);
        const uploadedUrl = await uploadToSupabase(file);
        setIsUploading(false);
        
        if (uploadedUrl) {
          onImageUpload(file, uploadedUrl);
          toast({
            title: "Image uploaded successfully",
            description: `${file.name} is ready for processing and saved to cloud`,
          });
        } else {
          toast({
            title: "Upload failed",
            description: "Please try uploading again",
            variant: "destructive",
          });
        }
      } else {
        onImageUpload(file);
        toast({
          title: "Image loaded successfully",
          description: `${file.name} is ready for processing`,
        });
      }
    }
  }, [onImageUpload, maxSize, enableCloudStorage]);

  const { getRootProps, getInputProps, isDragReject } = useDropzone({
    onDrop,
    accept: acceptedFormats.reduce((acc, format) => ({ ...acc, [format]: [] }), {}),
    maxSize,
    multiple: false,
    onDragEnter: () => setIsDragActive(true),
    onDragLeave: () => setIsDragActive(false),
  });

  if (currentImage) {
    return (
      <Card className="relative group hover:shadow-lg transition-all duration-300">
        <CardContent className="p-4">
          <div className="relative">
            <img 
              src={currentImage} 
              alt="Uploaded image" 
              className="w-full max-h-96 object-contain rounded-lg"
            />
            {onClearImage && (
              <Button
                size="sm"
                variant="destructive"
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                onClick={onClearImage}
              >
                <X size={16} />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={`transition-all duration-300 ${
      isDragActive 
        ? 'border-primary bg-gradient-to-br from-electric-50 to-neon-50 scale-105 shadow-lg' 
        : isDragReject 
        ? 'border-destructive bg-destructive/5' 
        : 'border-dashed border-2 hover:border-primary/50 hover:bg-gradient-to-br hover:from-electric-50/50 hover:to-neon-50/50 hover:shadow-md'
    }`}>
      <CardContent className="p-8">
        <div 
          {...getRootProps()} 
          className="text-center cursor-pointer"
        >
          <input {...getInputProps()} />
          
          <div className="mx-auto mb-4">
            {isUploading ? (
              <div className="w-16 h-16 border-4 border-electric-500 border-t-transparent rounded-full animate-spin mx-auto" />
            ) : isDragActive ? (
              <Upload className="w-16 h-16 text-primary mx-auto animate-bounce" />
            ) : (
              <div className="relative">
                <ImageIcon className="w-16 h-16 text-muted-foreground mx-auto" />
                {enableCloudStorage && (
                  <Cloud className="w-6 h-6 text-electric-500 absolute -top-2 -right-2" />
                )}
              </div>
            )}
          </div>
          
          <h3 className="text-lg font-semibold mb-2">
            {isUploading ? 'Uploading to cloud...' : 
             isDragActive ? 'Drop your image here' : 'Upload your image'}
          </h3>
          
          <p className="text-muted-foreground mb-4">
            {isUploading ? 'Please wait while we save your image' :
             'Drag and drop your image here, or click to browse'}
          </p>
          
          {!isUploading && (
            <Button variant="outline" className="mb-4 hover:bg-gradient-to-r hover:from-electric-500 hover:to-neon-500 hover:text-white transition-all duration-300">
              Choose File
            </Button>
          )}
          
          <div className="text-xs text-muted-foreground">
            <p>Supported formats: JPG, PNG, WebP</p>
            <p>Maximum size: {maxSize / (1024 * 1024)}MB</p>
            {enableCloudStorage && (
              <p className="text-electric-600 font-medium mt-1">✓ Cloud storage enabled</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ImageUpload;
