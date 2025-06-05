
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface ImageUploadProps {
  onImageUpload: (file: File) => void;
  acceptedFormats?: string[];
  maxSize?: number;
  currentImage?: string | null;
  onClearImage?: () => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  onImageUpload,
  acceptedFormats = ['image/jpeg', 'image/png', 'image/webp'],
  maxSize = 10 * 1024 * 1024, // 10MB
  currentImage,
  onClearImage
}) => {
  const [isDragActive, setIsDragActive] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[], rejectedFiles: any[]) => {
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
      onImageUpload(acceptedFiles[0]);
      toast({
        title: "Image uploaded successfully",
        description: `${acceptedFiles[0].name} is ready for processing`,
      });
    }
  }, [onImageUpload, maxSize]);

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
      <Card className="relative">
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
                className="absolute top-2 right-2"
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
        ? 'border-primary bg-primary/5 scale-105' 
        : isDragReject 
        ? 'border-destructive bg-destructive/5' 
        : 'border-dashed border-2 hover:border-primary/50 hover:bg-primary/5'
    }`}>
      <CardContent className="p-8">
        <div 
          {...getRootProps()} 
          className="text-center cursor-pointer"
        >
          <input {...getInputProps()} />
          
          <div className="mx-auto mb-4">
            {isDragActive ? (
              <Upload className="w-16 h-16 text-primary mx-auto animate-bounce" />
            ) : (
              <ImageIcon className="w-16 h-16 text-muted-foreground mx-auto" />
            )}
          </div>
          
          <h3 className="text-lg font-semibold mb-2">
            {isDragActive ? 'Drop your image here' : 'Upload your image'}
          </h3>
          
          <p className="text-muted-foreground mb-4">
            Drag and drop your image here, or click to browse
          </p>
          
          <Button variant="outline" className="mb-4">
            Choose File
          </Button>
          
          <div className="text-xs text-muted-foreground">
            <p>Supported formats: JPG, PNG, WebP</p>
            <p>Maximum size: {maxSize / (1024 * 1024)}MB</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ImageUpload;
