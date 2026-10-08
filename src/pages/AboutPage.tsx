import React from 'react';
import { useData } from '../context/DataContext';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { SectionHeading } from '../components/common/SectionHeading';

interface AboutPageProps {
  onNavigate: (path: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  const { teamMembers, companySettings } = useData();

  return (
    <div className="pt-28 sm:pt-36 pb-24 space-y-24">
      {/* 1. Header & Atelier Story */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 space-y-8">
        <Breadcrumbs items={[{ label: 'About Our Atelier' }]} onNavigate={onNavigate} />

        <div className="max-w-4xl space-y-4">
          <span className="text-[11px] uppercase tracking-[0.25em] font-medium text-[#B39366]">
            Architectural Design & Construction
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-[#141312] font-normal leading-tight">
            Craftsmanship Rooted in New York Living
          </h1>
          <p className="text-base sm:text-lg text-[#5C5650] font-light leading-relaxed max-w-2xl">
            Banlgar Ghor Remodeling was founded to bring architectural clarity, honest budgeting, and bespoke artisanal craft to New York’s most demanding residences.
          </p>
        </div>

        {/* Narrative Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-6 items-center">
          <div className="lg:col-span-7 space-y-5 text-sm sm:text-base font-light text-[#4A4642] leading-relaxed">
            <p>
              Renovating a home in New York is an undertaking unlike any other. Historical pre-war buildings, landmark preservation commissions, rigid co-op alteration packets, and spatial constraints demand more than general building knowledge—they require deep architectural intuition and diplomatic building superintendence.
            </p>
            <p>
              At Banlgar Ghor, we eliminate the friction between the design desk and the job site. By uniting licensed architects, master carpenters, and MEP superintendents in one cohesive atelier, every joint, stone veining alignment, and mechanical chase is engineered before the first hammer swings.
            </p>
            <p>
              We view our clients as collaborators. Through scheduled weekly walkthroughs, digitized progress dashboards, and fixed-price line items, we replace renovation anxiety with creative fulfillment.
            </p>
          </div>

          <div className="lg:col-span-5 relative aspect-[4/3] bg-[#EAE4DC] border border-[#EAE4DC]">
            <img
              src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80"
              alt="Banlgar Ghor Architectural Craftsmanship"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </div>

      {/* 2. Philosophy & Four Pillars */}
      <section className="bg-[#F3EFEA] py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 space-y-12">
          <SectionHeading
            eyebrow="Our Foundation"
            title="Core Architectural Convictions"
            description="The values that guide every drawing, stone slab selection, and jobsite interaction."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white border border-[#EAE4DC] p-8 space-y-3">
              <span className="text-xs font-mono text-[#B39366]">01</span>
              <h3 className="text-lg font-serif text-[#141312]">Architectural Rigor</h3>
              <p className="text-xs text-[#5C5650] font-light leading-relaxed">
                Design is not decorative styling; it is spatial problem solving, acoustic dampening, and lighting harmony.
              </p>
            </div>
            <div className="bg-white border border-[#EAE4DC] p-8 space-y-3">
              <span className="text-xs font-mono text-[#B39366]">02</span>
              <h3 className="text-lg font-serif text-[#141312]">Artisanal Integrity</h3>
              <p className="text-xs text-[#5C5650] font-light leading-relaxed">
                We partner directly with European quarries, American hardwood mills, and local metal artisans who share our obsession with detail.
              </p>
            </div>
            <div className="bg-white border border-[#EAE4DC] p-8 space-y-3">
              <span className="text-xs font-mono text-[#B39366]">03</span>
              <h3 className="text-lg font-serif text-[#141312]">Respect for the Home</h3>
              <p className="text-xs text-[#5C5650] font-light leading-relaxed">
                Immaculate HEPA dust containment, hallway protection, and courtesy for neighbors and building staff are non-negotiable standards.
              </p>
            </div>
            <div className="bg-white border border-[#EAE4DC] p-8 space-y-3">
              <span className="text-xs font-mono text-[#B39366]">04</span>
              <h3 className="text-lg font-serif text-[#141312]">Transparent Contracts</h3>
              <p className="text-xs text-[#5C5650] font-light leading-relaxed">
                Guaranteed line-item pricing without surprise allowances or deceptive estimates. What we quote is what we deliver.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Leadership & Atelier Team */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 space-y-12">
        <SectionHeading
          eyebrow="Leadership"
          title="Principals & Atelier Craftsmen"
          description="Experienced architects, master joiners, and project executives dedicated to your New York residence."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map(member => (
            <div key={member.id} className="bg-white border border-[#EAE4DC] overflow-hidden space-y-4">
              <div className="relative aspect-[4/5] bg-[#EAE4DC] overflow-hidden">
                <img
                  src={member.imageUrl}
                  alt={member.name}
                  className="w-full h-full object-cover grayscale contrast-110"
                  loading="lazy"
                />
              </div>
              <div className="p-6 space-y-2">
                <h3 className="text-lg font-serif text-[#141312]">{member.name}</h3>
                <div className="text-[11px] uppercase tracking-wider text-[#B39366] font-medium">{member.role}</div>
                <div className="text-[10px] text-[#8A8177] font-mono">{member.credentials}</div>
                <p className="text-xs text-[#5C5650] font-light leading-relaxed pt-2">
                  {member.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Credentials & Insurance Callout */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="bg-[#141312] text-white p-10 sm:p-14 border border-[#2C2825] flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2 max-w-xl">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#B39366] font-medium">
              Verified Compliance
            </span>
            <h3 className="text-2xl font-serif text-white">
              Licensed, Insured & Co-op Board Approved
            </h3>
            <p className="text-xs sm:text-sm text-[#A99F94] font-light leading-relaxed">
              {companySettings?.licenseInfo} | {companySettings?.insuranceInfo}
            </p>
          </div>
          <button
            onClick={() => onNavigate('/consultation')}
            className="shrink-0 bg-[#FAF8F5] text-[#141312] hover:bg-[#EAE4DC] px-8 py-3.5 text-xs uppercase tracking-widest font-medium transition-all"
          >
            Request a Free Consultation
          </button>
        </div>
      </section>
    </div>
  );
};
