
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Zap, Shield, Cloud, Sparkles, Clock, Users } from 'lucide-react';

const features = [
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Process images instantly with our optimized algorithms and client-side processing.'
  },
  {
    icon: Shield,
    title: 'Privacy First',
    description: 'Your images never leave your device unless you choose to save them to the cloud.'
  },
  {
    icon: Cloud,
    title: 'Cloud Storage',
    description: 'Save your processed images securely in the cloud and access them anywhere.'
  },
  {
    icon: Sparkles,
    title: 'AI Powered',
    description: 'Leverage cutting-edge AI for face detection, watermark removal, and smart cropping.'
  },
  {
    icon: Clock,
    title: 'No Waiting',
    description: 'Real-time preview and instant processing - see results as you work.'
  },
  {
    icon: Users,
    title: 'Team Ready',
    description: 'Share processed images with your team and collaborate on projects.'
  }
];

const FeaturesSection: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/30">
      <div className="container px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-4">
            Why Choose Lock The Day?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Experience the power of professional image editing with our suite of AI-powered tools
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 bg-gradient-to-br from-white to-muted/20"
            >
              <CardContent className="p-6">
                <div className="mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-electric-500 to-neon-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
