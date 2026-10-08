import React from 'react';
import { Service } from '../../types';

interface ServiceCardProps {
  service: Service;
  onNavigate: (path: string) => void;
  className?: string;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service, onNavigate, className = '' }) => {
  return (
    <article
      onClick={() => onNavigate(`/services/${service.slug}`)}
      className={`group cursor-pointer flex flex-col bg-white border border-[#EAE4DC]/80 overflow-hidden transition-all duration-300 hover:border-[#D3C9BD] hover:shadow-md ${className}`}
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-[#EAE4DC]">
        <img
          src={service.heroImage}
          alt={service.name}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
        <div className="absolute bottom-4 left-4 right-4">
          <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-[#FAF8F5]/90">
            Architectural Service
          </span>
          <h3 className="text-xl sm:text-2xl font-serif text-white font-normal">
            {service.name}
          </h3>
        </div>
      </div>

      <div className="p-6 sm:p-7 flex flex-col flex-1 justify-between space-y-5">
        <p className="text-xs sm:text-sm text-[#5C5650] font-light leading-relaxed">
          {service.shortDescription}
        </p>

        {service.benefits && service.benefits.length > 0 && (
          <ul className="space-y-1.5 pt-2 border-t border-[#EAE4DC]/70">
            {service.benefits.slice(0, 3).map((benefit, idx) => (
              <li key={idx} className="flex items-start gap-2 text-xs text-[#7A746E]">
                <span className="text-[#B39366] font-serif leading-none mt-0.5">•</span>
                <span className="line-clamp-1">{benefit}</span>
              </li>
            ))}
          </ul>
        )}

        <div className="pt-2 flex items-center justify-between text-xs font-medium uppercase tracking-wider text-[#141312] group-hover:text-[#B39366] transition-colors">
          <span>Explore Service</span>
          <svg
            className="w-3.5 h-3.5 transform transition-transform duration-200 group-hover:translate-x-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </div>
      </div>
    </article>
  );
};
