
import React from 'react';

const stats = [
  { number: '10M+', label: 'Images Processed' },
  { number: '150K+', label: 'Happy Users' },
  { number: '99.9%', label: 'Uptime' },
  { number: '24/7', label: 'Support' }
];

const StatsSection: React.FC = () => {
  return (
    <section className="py-16 animated-gradient">
      <div className="container px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center text-white">
              <div className="text-3xl md:text-4xl font-bold mb-2 animate-float" style={{ animationDelay: `${index * 0.2}s` }}>
                {stat.number}
              </div>
              <div className="text-white/80 text-sm md:text-base">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
