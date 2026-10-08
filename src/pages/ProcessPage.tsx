import React from 'react';
import { useData } from '../context/DataContext';
import { Breadcrumbs } from '../components/common/Breadcrumbs';

interface ProcessPageProps {
  onNavigate: (path: string) => void;
}

export const ProcessPage: React.FC<ProcessPageProps> = ({ onNavigate }) => {
  const { processSteps } = useData();

  return (
    <div className="pt-28 sm:pt-36 pb-24 space-y-24">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 space-y-6">
        <Breadcrumbs items={[{ label: 'Our Process' }]} onNavigate={onNavigate} />

        <div className="max-w-4xl space-y-4">
          <span className="text-[11px] uppercase tracking-[0.25em] font-medium text-[#B39366]">
            The Architectural Roadmap
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-[#141312] font-normal leading-tight">
            How We Execute in New York
          </h1>
          <p className="text-base sm:text-lg text-[#5C5650] font-light leading-relaxed max-w-2xl">
            A disciplined six-stage methodology designed to eliminate renovation friction, protect your investment, and deliver museum-grade craftsmanship on schedule.
          </p>
        </div>
      </div>

      {/* 6 Steps Detailed Breakdown */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 space-y-16">
        {processSteps.map((step, idx) => (
          <div
            key={step.id}
            className={`grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center p-8 sm:p-12 bg-white border border-[#EAE4DC] ${
              idx % 2 === 1 ? 'lg:flex-row-reverse' : ''
            }`}
          >
            {/* Step Left / Content */}
            <div className="lg:col-span-7 space-y-5">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono px-3 py-1 bg-[#141312] text-white tracking-widest">
                  STAGE 0{step.stepNumber}
                </span>
                <span className="text-xs uppercase tracking-wider text-[#B39366] font-medium">
                  Estimated Timeline: {step.duration}
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-serif text-[#141312]">
                {step.title}
              </h2>
              <p className="text-xs sm:text-sm font-medium uppercase tracking-wider text-[#8A8177]">
                {step.subtitle}
              </p>

              <p className="text-sm sm:text-base text-[#4A4642] font-light leading-relaxed">
                {step.description}
              </p>

              {/* Key Deliverables */}
              {step.deliverables && step.deliverables.length > 0 && (
                <div className="pt-4 border-t border-[#EAE4DC]/80 space-y-2">
                  <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#141312] block">
                    Key Deliverables & Milestones
                  </span>
                  <ul className="space-y-2">
                    {step.deliverables.map((d, i) => (
                      <li key={i} className="flex items-center gap-2.5 text-xs text-[#5C5650]">
                        <svg className="w-3.5 h-3.5 text-[#B39366] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Step Right / Image */}
            <div className="lg:col-span-5 relative aspect-[4/3] bg-[#EAE4DC] overflow-hidden border border-[#EAE4DC]">
              <img
                src={step.imageUrl || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80'}
                alt={step.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        ))}
      </div>

      {/* CTA Box */}
      <div className="max-w-4xl mx-auto px-6 text-center space-y-6">
        <h2 className="text-3xl font-serif text-[#141312]">
          Ready to Start Stage 01?
        </h2>
        <p className="text-sm text-[#5C5650] font-light max-w-xl mx-auto">
          Contact our atelier to schedule a private on-site consultation and begin crafting your residence.
        </p>
        <button
          onClick={() => onNavigate('/consultation')}
          className="bg-[#141312] text-white hover:bg-[#2C2825] px-8 py-3.5 text-xs uppercase tracking-widest font-medium transition-all"
        >
          Request a Free Consultation
        </button>
      </div>
    </div>
  );
};
