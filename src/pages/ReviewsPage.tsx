import React from 'react';
import { useData } from '../context/DataContext';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { TestimonialCard } from '../components/common/TestimonialCard';

interface ReviewsPageProps {
  onNavigate: (path: string) => void;
}

export const ReviewsPage: React.FC<ReviewsPageProps> = ({ onNavigate }) => {
  const { testimonials } = useData();

  return (
    <div className="pt-28 sm:pt-36 pb-24 space-y-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 space-y-6">
        <Breadcrumbs items={[{ label: 'Client Reviews' }]} onNavigate={onNavigate} />

        <div className="max-w-4xl space-y-4">
          <span className="text-[11px] uppercase tracking-[0.25em] font-medium text-[#B39366]">
            Homeowner Reflections
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-[#141312] font-normal leading-tight">
            Client Testimonials & Experiences
          </h1>
          <p className="text-base sm:text-lg text-[#5C5650] font-light leading-relaxed max-w-2xl">
            Hear directly from New York homeowners, architects, and designers who collaborated with Banlgar Ghor Remodeling on their residential transformations.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map(testimonial => (
            <TestimonialCard
              key={testimonial.id}
              testimonial={testimonial}
            />
          ))}
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 text-center space-y-4">
        <h2 className="text-2xl sm:text-3xl font-serif text-[#141312]">
          Experience the Banlgar Ghor Difference
        </h2>
        <p className="text-xs sm:text-sm text-[#5C5650] max-w-lg mx-auto">
          We invite you to discuss your project with our design principals and review building references across Manhattan and Brooklyn.
        </p>
        <div className="pt-2">
          <button
            onClick={() => onNavigate('/consultation')}
            className="bg-[#141312] text-white hover:bg-[#2C2825] px-8 py-3.5 text-xs uppercase tracking-widest font-medium transition-all"
          >
            Request a Free Consultation
          </button>
        </div>
      </div>
    </div>
  );
};
