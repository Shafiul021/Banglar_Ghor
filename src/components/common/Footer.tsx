import React from 'react';
import { useData } from '../../context/DataContext';

interface FooterProps {
  onNavigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const { companySettings, services } = useData();

  const handleNav = (path: string) => {
    onNavigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#141312] text-[#EAE4DC] border-t border-[#2C2825] pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Top Banner / Consultation Callout */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between pb-16 mb-16 border-b border-[#2C2825] gap-8">
          <div className="max-w-2xl">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#B39366] font-medium block mb-2">
              New York Architectural Renovations
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-white font-normal">
              Begin your home’s architectural transformation.
            </h2>
            <p className="text-sm text-[#A99F94] mt-2 font-light">
              Schedule a private consultation with our New York design and construction principals.
            </p>
          </div>
          <button
            onClick={() => handleNav('/consultation')}
            className="shrink-0 bg-[#FAF8F5] text-[#141312] hover:bg-[#EAE4DC] px-7 py-3.5 text-xs uppercase tracking-widest font-medium transition-all"
          >
            Request a Free Consultation
          </button>
        </div>

        {/* 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-16 border-b border-[#2C2825]">
          {/* Column 1: Brand & Philosophy (2 cols wide on desktop) */}
          <div className="lg:col-span-2 space-y-5">
            <span className="text-2xl font-serif font-semibold text-white tracking-wider block">
              {companySettings?.name || 'Banlgar Ghor Remodeling'}
            </span>
            <p className="text-sm text-[#A99F94] font-light leading-relaxed max-w-sm">
              {companySettings?.footerDescription ||
                'Thoughtful renovations. Exceptional craftsmanship. Homes designed around the way you live across New York City and Westchester.'}
            </p>
            <div className="space-y-1.5 text-xs text-[#8A8177] pt-2">
              <div>{companySettings?.licenseInfo}</div>
              <div>{companySettings?.insuranceInfo}</div>
            </div>
            {/* Socials */}
            <div className="flex items-center gap-4 pt-3 text-xs tracking-wider uppercase text-[#B39366]">
              {companySettings?.socials.instagram && (
                <a
                  href={companySettings.socials.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Instagram
                </a>
              )}
              {companySettings?.socials.houzz && (
                <a
                  href={companySettings.socials.houzz}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Houzz
                </a>
              )}
              {companySettings?.socials.pinterest && (
                <a
                  href={companySettings.socials.pinterest}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Pinterest
                </a>
              )}
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="space-y-4">
            <h3 className="text-xs uppercase tracking-[0.2em] font-medium text-white">
              Studio
            </h3>
            <ul className="space-y-2.5 text-xs text-[#A99F94]">
              <li><button onClick={() => handleNav('/projects')} className="hover:text-white transition-colors">Projects Gallery</button></li>
              <li><button onClick={() => handleNav('/about')} className="hover:text-white transition-colors">About Our Atelier</button></li>
              <li><button onClick={() => handleNav('/process')} className="hover:text-white transition-colors">Our 6-Step Process</button></li>
              <li><button onClick={() => handleNav('/reviews')} className="hover:text-white transition-colors">Client Testimonials</button></li>
              <li><button onClick={() => handleNav('/service-areas')} className="hover:text-white transition-colors">Service Areas</button></li>
              <li><button onClick={() => handleNav('/financing')} className="hover:text-white transition-colors">Financing Options</button></li>
              <li><button onClick={() => handleNav('/faq')} className="hover:text-white transition-colors">FAQ</button></li>
              <li><button onClick={() => handleNav('/contact')} className="hover:text-white transition-colors">Contact Us</button></li>
            </ul>
          </div>

          {/* Column 3: Services Links */}
          <div className="space-y-4">
            <h3 className="text-xs uppercase tracking-[0.2em] font-medium text-white">
              Services
            </h3>
            <ul className="space-y-2.5 text-xs text-[#A99F94]">
              {services.map(s => (
                <li key={s.slug}>
                  <button
                    onClick={() => handleNav(`/services/${s.slug}`)}
                    className="hover:text-white transition-colors text-left"
                  >
                    {s.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Studio Contact & Location */}
          <div className="space-y-4">
            <h3 className="text-xs uppercase tracking-[0.2em] font-medium text-white">
              Contact
            </h3>
            <div className="space-y-2 text-xs text-[#A99F94] leading-relaxed">
              <p className="text-white font-medium">{companySettings?.address}</p>
              <p>{companySettings?.city}, {companySettings?.state} {companySettings?.zip}</p>
              <p className="pt-2">
                <a href={`tel:${companySettings?.phone}`} className="hover:text-[#B39366] transition-colors">
                  {companySettings?.phone}
                </a>
              </p>
              <p>
                <a href={`mailto:${companySettings?.email}`} className="hover:text-[#B39366] transition-colors">
                  {companySettings?.email}
                </a>
              </p>
              <p className="pt-2 text-[11px] text-[#7A746E]">
                {companySettings?.hours}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Legal */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-[11px] text-[#7A746E] gap-4">
          <p>
            {companySettings?.copyrightText || '© 2026 Banlgar Ghor Remodeling LLC. All rights reserved.'}
          </p>
          <div className="flex items-center gap-6">
            <button onClick={() => handleNav('/privacy')} className="hover:text-[#A99F94] transition-colors">
              Privacy Policy
            </button>
            <button onClick={() => handleNav('/terms')} className="hover:text-[#A99F94] transition-colors">
              Terms of Use
            </button>
            <button onClick={() => handleNav('/accessibility')} className="hover:text-[#A99F94] transition-colors">
              Accessibility
            </button>
            <button
              onClick={() => handleNav('/admin')}
              className="text-[#B39366] hover:text-white transition-colors font-medium"
            >
              Admin CMS
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
