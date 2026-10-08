import React from 'react';
import { useData } from '../context/DataContext';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { ContactForm } from '../components/common/ContactForm';

interface ContactPageProps {
  onNavigate: (path: string) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
  const { companySettings } = useData();

  return (
    <div className="pt-28 sm:pt-36 pb-24 space-y-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 space-y-6">
        <Breadcrumbs items={[{ label: 'Contact Studio' }]} onNavigate={onNavigate} />

        <div className="max-w-4xl space-y-4">
          <span className="text-[11px] uppercase tracking-[0.25em] font-medium text-[#B39366]">
            Get In Touch
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-[#141312] font-normal leading-tight">
            Contact Banlgar Ghor Remodeling
          </h1>
          <p className="text-base sm:text-lg text-[#5C5650] font-light leading-relaxed max-w-2xl">
            Whether inquiring about an upcoming residential commission, requesting architectural advice, or scheduling a site consultation, our studio is at your service.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Direct Details */}
          <div className="lg:col-span-5 space-y-10">
            <div className="space-y-6">
              <h2 className="text-2xl font-serif text-[#141312]">
                New York Atelier
              </h2>
              <div className="space-y-4 text-xs sm:text-sm text-[#4A4642] leading-relaxed">
                <div className="space-y-1">
                  <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#8A8177] block">
                    Studio Address
                  </span>
                  <p className="font-medium text-[#141312]">{companySettings?.address}</p>
                  <p>{companySettings?.city}, {companySettings?.state} {companySettings?.zip}</p>
                </div>

                <div className="space-y-1 pt-2">
                  <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#8A8177] block">
                    Direct Telephone
                  </span>
                  <p>
                    <a
                      href={`tel:${companySettings?.phone}`}
                      className="font-medium text-[#141312] hover:text-[#B39366] transition-colors"
                    >
                      {companySettings?.phone}
                    </a>
                  </p>
                </div>

                <div className="space-y-1 pt-2">
                  <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#8A8177] block">
                    Electronic Inquiries
                  </span>
                  <p>
                    <a
                      href={`mailto:${companySettings?.email}`}
                      className="font-medium text-[#141312] hover:text-[#B39366] transition-colors"
                    >
                      {companySettings?.email}
                    </a>
                  </p>
                </div>

                <div className="space-y-1 pt-2">
                  <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#8A8177] block">
                    Studio & Site Hours
                  </span>
                  <p>{companySettings?.hours}</p>
                </div>
              </div>
            </div>

            {/* Compliance Badge */}
            <div className="bg-[#FAF8F5] border border-[#EAE4DC] p-6 space-y-2">
              <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-[#B39366] block">
                Licensing & Insurance
              </span>
              <p className="text-xs text-[#5C5650] leading-relaxed">
                {companySettings?.licenseInfo}
              </p>
              <p className="text-xs text-[#5C5650] leading-relaxed">
                {companySettings?.insuranceInfo}
              </p>
            </div>
          </div>

          {/* Right Column: Real Contact Message Form */}
          <div className="lg:col-span-7 space-y-6">
            <h2 className="text-2xl font-serif text-[#141312]">
              Send a Message
            </h2>
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
};
