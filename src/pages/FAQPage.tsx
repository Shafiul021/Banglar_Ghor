import React from 'react';
import { useData } from '../context/DataContext';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { FAQAccordion } from '../components/common/FAQAccordion';

interface FAQPageProps {
  onNavigate: (path: string) => void;
}

export const FAQPage: React.FC<FAQPageProps> = ({ onNavigate }) => {
  const { faqs } = useData();

  return (
    <div className="pt-28 sm:pt-36 pb-24 space-y-16">
      <div className="max-w-4xl mx-auto px-6 space-y-6">
        <Breadcrumbs items={[{ label: 'FAQ' }]} onNavigate={onNavigate} />

        <div className="space-y-4">
          <span className="text-[11px] uppercase tracking-[0.25em] font-medium text-[#B39366]">
            Frequently Asked Questions
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-[#141312] font-normal leading-tight">
            Renovation Inquiries & Insights
          </h1>
          <p className="text-base sm:text-lg text-[#5C5650] font-light leading-relaxed">
            Detailed guidance on NYC Department of Buildings (DOB) permitting, landmark LPC rules, pre-war co-op alterations, pricing parameters, and our architectural project management methodology.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6">
        <FAQAccordion faqs={faqs} showCategories={true} showSearch={true} />
      </div>

      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-[#FAF8F5] border border-[#EAE4DC] p-10 text-center space-y-4">
          <h2 className="text-2xl font-serif text-[#141312]">
            Have a Specific Question About Your Building?
          </h2>
          <p className="text-xs sm:text-sm text-[#5C5650] max-w-lg mx-auto">
            Every New York co-op, condo, and historic brownstone has distinct architectural and regulatory requirements. Our team is available to review your alteration agreement.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onNavigate('/contact')}
              className="bg-[#141312] text-white hover:bg-[#2C2825] px-7 py-3 text-xs uppercase tracking-widest font-medium transition-all"
            >
              Contact Our Studio
            </button>
            <button
              onClick={() => onNavigate('/consultation')}
              className="border border-[#D3C9BD] text-[#141312] hover:bg-white px-7 py-3 text-xs uppercase tracking-widest font-medium transition-all"
            >
              Request a Free Consultation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
