
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

interface GeminiResponse {
  generatedText: string;
}

export const useGeminiAI = () => {
  const [isLoading, setIsLoading] = useState(false);

  const generateText = async (prompt: string): Promise<string | null> => {
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('gemini-ai', {
        body: { prompt, type: 'text' }
      });

      if (error) {
        console.error('Gemini AI error:', error);
        toast({
          title: "AI Error",
          description: "Failed to generate text. Please try again.",
          variant: "destructive",
        });
        return null;
      }

      return data?.generatedText || null;
    } catch (error) {
      console.error('Error calling Gemini AI:', error);
      toast({
        title: "AI Error",
        description: "Failed to connect to AI service.",
        variant: "destructive",
      });
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const analyzeImage = async (prompt: string): Promise<string | null> => {
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('gemini-ai', {
        body: { prompt, type: 'vision' }
      });

      if (error) {
        console.error('Gemini AI error:', error);
        toast({
          title: "AI Error",
          description: "Failed to analyze image. Please try again.",
          variant: "destructive",
        });
        return null;
      }

      return data?.generatedText || null;
    } catch (error) {
      console.error('Error calling Gemini AI:', error);
      toast({
        title: "AI Error",
        description: "Failed to connect to AI service.",
        variant: "destructive",
      });
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    generateText,
    analyzeImage,
    isLoading
  };
};
