import React from 'react';
import { useData } from '../context/DataContext';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { ProjectCard } from '../components/common/ProjectCard';
import { FAQAccordion } from '../components/common/FAQAccordion';
import { SectionHeading } from '../components/common/SectionHeading';

interface ServiceDetailPageProps {
  slug: string;
  onNavigate: (path: string) => void;
}

export const ServiceDetailPage: React.FC<ServiceDetailPageProps> = ({ slug, onNavigate }) => {
  const { services, projects } = useData();

  const service = services.find(s => s.slug === slug);

  if (!service) {
    return (
      <div className="pt-36 pb-24 max-w-3xl mx-auto px-6 text-center space-y-6">
        <h1 className="text-3xl font-serif text-[#141312]">Service Not Found</h1>
        <p className="text-sm text-[#5C5650]">
          The architectural service you requested is not available.
        </p>
        <button
          onClick={() => onNavigate('/services')}
          className="bg-[#141312] text-white px-6 py-3 text-xs uppercase tracking-widest font-medium"
        >
          View All Services
        </button>
      </div>
    );
  }

  // Related projects
  const relatedProjects = projects.filter(p =>
    p.category.toLowerCase().includes(service.name.toLowerCase().split(' ')[0]) ||
    p.featured
  ).slice(0, 2);

  return (
    <div className="space-y-20 sm:space-y-28 pb-24">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[60vh] sm:min-h-[70vh] flex items-end overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={service.heroImage}
            alt={service.name}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#141312]/90 via-[#141312]/40 to-[#141312]/30" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 pb-16 pt-32 w-full text-white space-y-4">
          <Breadcrumbs
            items={[
              { label: 'Services', path: '/services' },
              { label: service.name }
            ]}
            onNavigate={onNavigate}
            className="text-white/70"
          />

          <span className="text-[11px] uppercase tracking-[0.25em] font-medium text-[#FAF8F5]/90 block">
            Residential Architecture & Construction
          </span>

          <h1 className="text-4xl sm:text-6xl font-serif font-normal leading-tight text-white max-w-3xl">
            {service.name}
          </h1>

          <p className="text-base sm:text-xl font-light text-[#EAE4DC] max-w-2xl leading-relaxed">
            {service.tagline || service.shortDescription}
          </p>
        </div>
      </section>

      {/* 2. OVERVIEW & NARRATIVE */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-7 space-y-6 text-[#252220] leading-relaxed">
            <h2 className="text-2xl sm:text-3xl font-serif text-[#141312]">
              Architectural Vision & Execution
            </h2>
            <p className="text-base sm:text-lg font-light text-[#5C5650] leading-relaxed">
              {service.fullDescription}
            </p>

            {/* Typical Scope of Work */}
            {service.typicalScope && service.typicalScope.length > 0 && (
              <div className="pt-6 space-y-4">
                <h3 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#141312]">
                  Typical Scope of Architectural Work
                </h3>
                <ul className="space-y-3">
                  {service.typicalScope.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-[#4A4642]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#B39366] mt-2 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Right Column: Benefits & Materials Card */}
          <div className="lg:col-span-5 space-y-8">
            {/* Benefits Box */}
            <div className="bg-[#FAF8F5] border border-[#EAE4DC] p-8 space-y-6">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#B39366] font-medium block">
                The Banlgar Ghor Advantage
              </span>
              <h3 className="text-xl font-serif text-[#141312]">
                Key Standards & Guarantees
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-[#5C5650]">
                {service.benefits.map((b, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <svg className="w-4 h-4 text-[#B39366] shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <div className="pt-2">
                <button
                  onClick={() => onNavigate('/consultation')}
                  className="w-full bg-[#141312] text-white hover:bg-[#2C2825] py-3 text-xs uppercase tracking-widest font-medium transition-all"
                >
                  Request a Free Consultation
                </button>
              </div>
            </div>

            {/* Materials Box */}
            {service.materials && service.materials.length > 0 && (
              <div className="bg-white border border-[#EAE4DC] p-8 space-y-4">
                <h3 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#141312]">
                  Curated Materials & Finishes
                </h3>
                <div className="flex flex-wrap gap-2 pt-1">
                  {service.materials.map((m, idx) => (
                    <span
                      key={idx}
                      className="text-xs text-[#5C5650] bg-[#FAF8F5] border border-[#EAE4DC] px-3 py-1.5"
                    >
                      {m}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 3. EXECUTION PROCESS */}
      {service.process && service.process.length > 0 && (
        <section className="bg-[#F3EFEA] py-20">
          <div className="max-w-7xl mx-auto px-6 lg:px-10 space-y-12">
            <SectionHeading
              eyebrow="Workflow"
              title={`Our ${service.name} Process`}
              description="A disciplined, step-by-step approach ensuring total transparency and zero surprises from design to turnover."
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {service.process.map(p => (
                <div key={p.step} className="bg-white border border-[#EAE4DC] p-7 space-y-3">
                  <div className="text-xs font-mono text-[#B39366] tracking-widest">
                    STEP 0{p.step}
                  </div>
                  <h4 className="text-lg font-serif text-[#141312]">
                    {p.title}
                  </h4>
                  <p className="text-xs text-[#5C5650] font-light leading-relaxed">
                    {p.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 4. SERVICE FAQS */}
      {service.faqs && service.faqs.length > 0 && (
        <section className="max-w-4xl mx-auto px-6 lg:px-10 space-y-8">
          <SectionHeading
            eyebrow="Common Inquiries"
            title={`${service.name} FAQ`}
            description="Answers to common questions about timelines, co-op building rules, permits, and investment ranges."
          />
          <FAQAccordion
            faqs={service.faqs.map((f, i) => ({
              id: `sf-${i}`,
              question: f.question,
              answer: f.answer,
              category: 'General',
              sortOrder: i,
              published: true,
              createdAt: '',
              updatedAt: ''
            }))}
            showCategories={false}
            showSearch={false}
          />
        </section>
      )}

      {/* 5. RELATED PROJECTS */}
      {relatedProjects.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 lg:px-10 space-y-10">
          <div className="flex items-end justify-between border-b border-[#EAE4DC] pb-4">
            <SectionHeading
              eyebrow="Portfolio"
              title={`Related ${service.name} Projects`}
            />
            <button
              onClick={() => onNavigate('/projects')}
              className="text-xs uppercase tracking-widest font-medium text-[#141312] hover:text-[#B39366] transition-colors"
            >
              All Projects →
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {relatedProjects.map(p => (
              <ProjectCard key={p.id} project={p} onNavigate={onNavigate} />
            ))}
          </div>
        </section>
      )}

      {/* 6. CALL TO ACTION */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="bg-[#252220] text-white p-10 sm:p-16 text-center max-w-4xl mx-auto space-y-6">
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#B39366] font-medium block">
            Ready to Begin?
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif text-white">
            Discuss Your {service.name}
          </h2>
          <p className="text-sm sm:text-base text-[#D3C9BD] font-light max-w-xl mx-auto leading-relaxed">
            Schedule an on-site consultation to explore your layout possibilities, structural feasibility, and budget parameters.
          </p>
          <div className="pt-2">
            <button
              onClick={() => onNavigate('/consultation')}
              className="bg-[#FAF8F5] text-[#141312] hover:bg-[#EAE4DC] px-8 py-3.5 text-xs uppercase tracking-widest font-medium transition-all"
            >
              Request a Free Consultation
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
