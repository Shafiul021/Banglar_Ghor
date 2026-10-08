import React from 'react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { ConsultationForm } from '../components/common/ConsultationForm';

interface ConsultationPageProps {
  onNavigate: (path: string) => void;
}

export const ConsultationPage: React.FC<ConsultationPageProps> = ({ onNavigate }) => {
  return (
    <div className="pt-28 sm:pt-36 pb-24 space-y-16">
      <div className="max-w-4xl mx-auto px-6 space-y-6">
        <Breadcrumbs items={[{ label: 'Request a Free Consultation' }]} onNavigate={onNavigate} />

        <div className="space-y-4">
          <span className="text-[11px] uppercase tracking-[0.25em] font-medium text-[#B39366]">
            Architectural Project Initiation
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-[#141312] font-normal leading-tight">
            Request a Free Consultation
          </h1>
          <p className="text-base sm:text-lg text-[#5C5650] font-light leading-relaxed">
            Please share the preliminary parameters of your residential renovation. A principal of Banlgar Ghor Remodeling will personally review your specifications and coordinate an architectural walkthrough.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6">
        <ConsultationForm onNavigateHome={() => onNavigate('/')} />
      </div>

      <div className="max-w-4xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center text-xs text-[#7A746E] pt-8 border-t border-[#EAE4DC]">
          <div className="space-y-1">
            <span className="font-semibold uppercase tracking-wider text-[#141312] block">No Obligation</span>
            <p>Preliminary scope review and initial feasibility discussions are complimentary.</p>
          </div>
          <div className="space-y-1">
            <span className="font-semibold uppercase tracking-wider text-[#141312] block">Strict Confidentiality</span>
            <p>Your property address and project details remain strictly private.</p>
          </div>
          <div className="space-y-1">
            <span className="font-semibold uppercase tracking-wider text-[#141312] block">Prompt Response</span>
            <p>Our project executives respond within 24 business hours.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
