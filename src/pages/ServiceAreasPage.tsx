import React from 'react';
import { useData } from '../context/DataContext';
import { Breadcrumbs } from '../components/common/Breadcrumbs';

interface ServiceAreasPageProps {
  onNavigate: (path: string) => void;
}

export const ServiceAreasPage: React.FC<ServiceAreasPageProps> = ({ onNavigate }) => {
  const { serviceAreas } = useData();

  return (
    <div className="pt-28 sm:pt-36 pb-24 space-y-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 space-y-6">
        <Breadcrumbs items={[{ label: 'Service Areas' }]} onNavigate={onNavigate} />

        <div className="max-w-4xl space-y-4">
          <span className="text-[11px] uppercase tracking-[0.25em] font-medium text-[#B39366]">
            Geographic Coverage
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-[#141312] font-normal leading-tight">
            New York City & Westchester County
          </h1>
          <p className="text-base sm:text-lg text-[#5C5650] font-light leading-relaxed max-w-2xl">
            Our atelier brings specialized architectural remodeling to historic brownstones, pre-war apartment buildings, lofts, and suburban estates across the greater New York metropolitan region.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {serviceAreas.map(area => (
            <div
              key={area.id}
              className="bg-white border border-[#EAE4DC] overflow-hidden flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <div className="relative aspect-[16/10] bg-[#EAE4DC] overflow-hidden">
                  <img
                    src={area.imageUrl}
                    alt={area.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-white/80">
                      {area.region}
                    </span>
                    <h2 className="text-2xl font-serif text-white font-normal">
                      {area.name}
                    </h2>
                  </div>
                </div>

                <div className="px-7 space-y-4">
                  <p className="text-xs sm:text-sm text-[#5C5650] font-light leading-relaxed">
                    {area.description}
                  </p>

                  {area.highlights && area.highlights.length > 0 && (
                    <div className="space-y-1.5 pt-2 border-t border-[#EAE4DC]/80">
                      <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#141312] block">
                        Prominent Neighborhoods Served
                      </span>
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {area.highlights.map((nh, i) => (
                          <span
                            key={i}
                            className="text-[11px] text-[#5C5650] bg-[#FAF8F5] border border-[#EAE4DC] px-2 py-0.5"
                          >
                            {nh}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {area.popularProjects && area.popularProjects.length > 0 && (
                    <div className="space-y-1 pt-2">
                      <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#141312] block">
                        Common Architectural Scope
                      </span>
                      <ul className="text-xs text-[#7A746E] space-y-1">
                        {area.popularProjects.map((proj, idx) => (
                          <li key={idx} className="flex items-center gap-1.5">
                            <span className="text-[#B39366]">•</span>
                            <span>{proj}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              <div className="p-7 pt-0">
                <button
                  onClick={() => onNavigate('/consultation')}
                  className="w-full bg-[#FAF8F5] text-[#141312] hover:bg-[#141312] hover:text-white py-2.5 text-xs uppercase tracking-wider font-medium border border-[#EAE4DC] transition-all"
                >
                  Inquire for {area.name}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Don't see your neighborhood? */}
      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-[#FAF8F5] border border-[#EAE4DC] p-10 text-center space-y-4">
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#B39366] font-medium block">
            Custom Inquiries
          </span>
          <h2 className="text-2xl font-serif text-[#141312]">
            Don’t see your neighborhood or town listed?
          </h2>
          <p className="text-xs sm:text-sm text-[#5C5650] max-w-lg mx-auto">
            We frequently evaluate distinctive architectural commissions in neighboring residential communities throughout New York and Connecticut. Contact us to discuss your property.
          </p>
          <div className="pt-2">
            <button
              onClick={() => onNavigate('/contact')}
              className="bg-[#141312] text-white hover:bg-[#2C2825] px-7 py-3 text-xs uppercase tracking-widest font-medium transition-all"
            >
              Contact Us to Discuss Your Project
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
