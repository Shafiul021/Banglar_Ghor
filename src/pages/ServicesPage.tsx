import React from 'react';
import { useData } from '../context/DataContext';
import { ServiceCard } from '../components/common/ServiceCard';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { SectionHeading } from '../components/common/SectionHeading';

interface ServicesPageProps {
  onNavigate: (path: string) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ onNavigate }) => {
  const { services } = useData();

  return (
    <div className="pt-28 sm:pt-36 pb-24 space-y-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 space-y-6">
        <Breadcrumbs items={[{ label: 'Services' }]} onNavigate={onNavigate} />

        <div className="max-w-4xl space-y-4">
          <span className="text-[11px] uppercase tracking-[0.25em] font-medium text-[#B39366]">
            Architectural Remodeling & Renovation
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-[#141312] font-normal leading-tight">
            Specialized Residential Disciplines
          </h1>
          <p className="text-base sm:text-lg text-[#5C5650] font-light leading-relaxed max-w-2xl">
            Banlgar Ghor Remodeling provides turnkey architectural design and general contracting services tailored to New York City pre-war co-ops, landmark brownstones, and suburban estates.
          </p>
        </div>
      </div>

      {/* Services Grid */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map(service => (
            <ServiceCard
              key={service.id}
              service={service}
              onNavigate={onNavigate}
            />
          ))}
        </div>
      </div>

      {/* Architectural Philosophy Section */}
      <section className="bg-[#F3EFEA] py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <SectionHeading
              eyebrow="The Atelier Difference"
              title="Design + Construction Under One Accountable Roof"
              description="Most New York renovations suffer from misalignment between the design architect and the general contractor. Banlgar Ghor unifies both disciplines."
            />
            <div className="space-y-4 text-xs sm:text-sm text-[#5C5650] font-light leading-relaxed">
              <p>
                From initial 3D point-cloud laser scanning and board alteration approvals through custom Italian marble fabrication and certified trade execution, our integrated process prevents cost overruns and protects your schedule.
              </p>
              <p>
                Every project is assigned a dedicated project executive and an on-site master superintendent who manages daily progress, dust-containment, and building superintendent coordination.
              </p>
            </div>
            <div className="pt-2">
              <button
                onClick={() => onNavigate('/consultation')}
                className="bg-[#141312] text-white hover:bg-[#2C2825] px-7 py-3.5 text-xs uppercase tracking-widest font-medium transition-all"
              >
                Request a Free Consultation
              </button>
            </div>
          </div>

          <div className="relative aspect-[4/3] bg-[#EAE4DC] overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
              alt="Architectural Design and Millwork Studio"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </section>
    </div>
  );
};
