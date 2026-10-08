import React from 'react';
import { Testimonial } from '../../types';

interface TestimonialCardProps {
  testimonial: Testimonial;
  className?: string;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial, className = '' }) => {
  return (
    <div
      className={`bg-white border border-[#EAE4DC] p-8 sm:p-9 flex flex-col justify-between space-y-6 ${className}`}
    >
      <div className="space-y-4">
        {/* Rating Stars */}
        <div className="flex items-center gap-1 text-[#B39366]" aria-label={`${testimonial.rating} out of 5 stars`}>
          {Array.from({ length: 5 }).map((_, i) => (
            <svg
              key={i}
              className={`w-3.5 h-3.5 ${i < testimonial.rating ? 'fill-current text-[#B39366]' : 'text-stone-300'}`}
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>

        {/* Editorial Quote */}
        <p className="text-base sm:text-lg font-serif italic text-[#252220] leading-relaxed">
          “{testimonial.quote}”
        </p>
      </div>

      {/* Author & Location */}
      <div className="pt-4 border-t border-[#EAE4DC]/80 flex items-center gap-3">
        {testimonial.imageUrl && (
          <img
            src={testimonial.imageUrl}
            alt={testimonial.name}
            className="w-10 h-10 rounded-full object-cover border border-[#EAE4DC]"
            loading="lazy"
          />
        )}
        <div className="space-y-0.5">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#141312]">
            {testimonial.name}
          </div>
          <div className="text-[11px] text-[#7A746E]">
            <span>{testimonial.location}</span>
            <span className="mx-1.5 select-none" aria-hidden="true">·</span>
            <span>{testimonial.projectType}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
