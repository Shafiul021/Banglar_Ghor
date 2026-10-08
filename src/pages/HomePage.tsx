import React from 'react';
import { useData } from '../context/DataContext';
import { ProjectCard } from '../components/common/ProjectCard';
import { ServiceCard } from '../components/common/ServiceCard';
import { TestimonialCard } from '../components/common/TestimonialCard';
import { SectionHeading } from '../components/common/SectionHeading';

interface HomePageProps {
  onNavigate: (path: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const { homepageConfig, projects, services, testimonials, processSteps, serviceAreas } = useData();

  const featuredProjects = projects.filter(p => p.featured).slice(0, 4);
  const featuredTestimonials = testimonials.filter(t => t.featured).slice(0, 3);

  const heroImage = homepageConfig?.heroImage || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=85';

  return (
    <div className="space-y-24 sm:space-y-32">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[92vh] sm:min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Architectural Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={heroImage}
            alt="Luxury Architectural Interior"
            className="w-full h-full object-cover object-center scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#141312]/90 via-[#141312]/40 to-[#141312]/50" />
        </div>

        {/* Content Container */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-10 py-32 text-center text-white space-y-6 sm:space-y-8">
          <span className="inline-block text-[11px] sm:text-xs uppercase tracking-[0.3em] font-medium text-[#FAF8F5]/85">
            {homepageConfig?.heroEyebrow || 'NEW YORK RESIDENTIAL REMODELING'}
          </span>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-normal leading-[1.08] tracking-tight text-white max-w-4xl mx-auto">
            {homepageConfig?.heroHeading || 'Spaces Designed for the Way You Live.'}
          </h1>

          <p className="text-sm sm:text-lg lg:text-xl font-light text-[#EAE4DC] max-w-2xl mx-auto leading-relaxed">
            {homepageConfig?.heroSupportingText ||
              'Banlgar Ghor Remodeling transforms New York homes through thoughtful design, meticulous craftsmanship, and a renovation process built around your vision.'}
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onNavigate('/consultation')}
              className="w-full sm:w-auto bg-white text-[#141312] hover:bg-[#FAF8F5] px-8 py-4 text-xs uppercase tracking-widest font-medium transition-all shadow-lg"
            >
              {homepageConfig?.heroPrimaryCtaText || 'Request a Free Consultation'}
            </button>
            <button
              onClick={() => onNavigate('/projects')}
              className="w-full sm:w-auto border border-white/40 text-white hover:bg-white/10 px-8 py-4 text-xs uppercase tracking-widest font-medium transition-all"
            >
              {homepageConfig?.heroSecondaryCtaText || 'Explore Our Projects'}
            </button>
          </div>
        </div>

        {/* Subtle Scroll Hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-white/60 flex flex-col items-center gap-2 text-[10px] uppercase tracking-widest">
          <span>Scroll</span>
          <div className="w-px h-8 bg-white/40 animate-pulse" />
        </div>
      </section>

      {/* 2. BRAND INTRODUCTION / ATELIER STATEMENT */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <div className="lg:col-span-5 space-y-4">
            <span className="text-[11px] uppercase tracking-[0.25em] font-medium text-[#B39366]">
              Atelier Philosophy
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-[#141312] leading-tight">
              {homepageConfig?.introHeading || 'Thoughtful renovations. Exceptional craftsmanship.'}
            </h2>
          </div>
          <div className="lg:col-span-7 space-y-6 text-[#5C5650] font-light text-base sm:text-lg leading-relaxed border-l-0 lg:border-l border-[#EAE4DC] lg:pl-12">
            <p>
              {homepageConfig?.introText ||
                'From landmark Brooklyn brownstones to pre-war Manhattan co-ops and Westchester estates, we unite architectural rigor with quiet luxury construction. We manage co-op boards, landmark preservation, DOB permitting, and custom fabrication under one unified atelier.'}
            </p>
            <div className="pt-2 flex items-center gap-8 text-xs font-medium uppercase tracking-wider text-[#141312]">
              <button
                onClick={() => onNavigate('/about')}
                className="hover:text-[#B39366] transition-colors flex items-center gap-2"
              >
                <span>Read Studio Story</span>
                <span aria-hidden="true">→</span>
              </button>
              <button
                onClick={() => onNavigate('/process')}
                className="hover:text-[#B39366] transition-colors flex items-center gap-2"
              >
                <span>Discover Our Process</span>
                <span aria-hidden="true">→</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FEATURED PROJECTS */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 space-y-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-4 border-b border-[#EAE4DC]">
          <SectionHeading
            eyebrow="Architectural Portfolio"
            title="Selected Residential Projects"
            description="Explore our recent renovations across Manhattan lofts, historic Brooklyn brownstones, and suburban estates."
          />
          <button
            onClick={() => onNavigate('/projects')}
            className="shrink-0 text-xs uppercase tracking-widest font-medium text-[#141312] hover:text-[#B39366] transition-colors flex items-center gap-1.5"
          >
            <span>View All Projects</span>
            <span aria-hidden="true">→</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {featuredProjects.map(project => (
            <ProjectCard
              key={project.id}
              project={project}
              onNavigate={onNavigate}
            />
          ))}
        </div>
      </section>

      {/* 4. SIX MAJOR SERVICES */}
      <section className="bg-[#F3EFEA] py-24 sm:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 space-y-14">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <SectionHeading
              eyebrow="Specialized Capabilities"
              title="Comprehensive Residential Remodeling"
              description="From culinary master suites to subterranean extensions and complete historic restorations, our atelier manages every discipline."
            />
            <button
              onClick={() => onNavigate('/services')}
              className="shrink-0 text-xs uppercase tracking-widest font-medium text-[#141312] hover:text-[#B39366] transition-colors flex items-center gap-1.5"
            >
              <span>Explore All Services</span>
              <span aria-hidden="true">→</span>
            </button>
          </div>

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
      </section>

      {/* 5. WHY BANLGAR GHOR (VALUE PILLARS) */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 space-y-16">
        <SectionHeading
          centered
          eyebrow="The Banlgar Ghor Standard"
          title={homepageConfig?.whyHeading || 'Why Banlgar Ghor Remodeling'}
          description={homepageConfig?.whyDescription || 'Renovating in New York demands unmatched precision, regulatory mastery, and absolute respect for your living environment.'}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12">
          {(homepageConfig?.whyPoints || []).map((point, idx) => (
            <div
              key={idx}
              className="bg-white border border-[#EAE4DC] p-8 space-y-4 hover:border-[#D3C9BD] transition-colors"
            >
              <div className="text-xs font-mono text-[#B39366] tracking-widest">
                0{idx + 1}
              </div>
              <h3 className="text-xl font-serif text-[#141312]">
                {point.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#5C5650] font-light leading-relaxed">
                {point.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. OUR PROCESS PREVIEW */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 space-y-14">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-4 border-b border-[#EAE4DC]">
          <SectionHeading
            eyebrow="Methodology"
            title="The 6-Step Architectural Journey"
            description="A disciplined, transparent progression designed to eliminate anxiety and protect your investment at every phase."
          />
          <button
            onClick={() => onNavigate('/process')}
            className="shrink-0 text-xs uppercase tracking-widest font-medium text-[#141312] hover:text-[#B39366] transition-colors flex items-center gap-1.5"
          >
            <span>Learn More About Our Process</span>
            <span aria-hidden="true">→</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {processSteps.map(step => (
            <div
              key={step.id}
              onClick={() => onNavigate('/process')}
              className="group cursor-pointer bg-white border border-[#EAE4DC] p-7 space-y-4 hover:border-[#141312] transition-colors"
            >
              <div className="flex items-center justify-between text-xs font-mono text-[#8A8177]">
                <span>STAGE 0{step.stepNumber}</span>
                <span className="text-[11px] text-[#B39366]">{step.duration}</span>
              </div>
              <h3 className="text-lg font-serif text-[#141312] group-hover:text-[#B39366] transition-colors">
                {step.title}
              </h3>
              <p className="text-xs text-[#5C5650] font-light leading-relaxed line-clamp-3">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 7. TRUST & CREDENTIALS SECTION */}
      <section className="bg-[#141312] text-[#EAE4DC] py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-[#2C2825]">
            <div className="p-4 space-y-1.5">
              <span className="text-xl sm:text-2xl font-serif text-white block">$5,000,000</span>
              <span className="text-xs uppercase tracking-wider text-[#A99F94]">Commercial Liability Coverage</span>
            </div>
            <div className="p-4 space-y-1.5">
              <span className="text-xl sm:text-2xl font-serif text-white block">NYC DCA</span>
              <span className="text-xs uppercase tracking-wider text-[#A99F94]">Licensed Home Improvement Contractor</span>
            </div>
            <div className="p-4 space-y-1.5">
              <span className="text-xl sm:text-2xl font-serif text-white block">EPA Certified</span>
              <span className="text-xs uppercase tracking-wider text-[#A99F94]">Lead-Safe Certified Firm</span>
            </div>
            <div className="p-4 space-y-1.5">
              <span className="text-xl sm:text-2xl font-serif text-white block">100% In-House</span>
              <span className="text-xs uppercase tracking-wider text-[#A99F94]">Architectural Project Superintendence</span>
            </div>
          </div>
        </div>
      </section>

      {/* 8. CLIENT REVIEWS / TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 space-y-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-4 border-b border-[#EAE4DC]">
          <SectionHeading
            eyebrow="Client Perspectives"
            title="Enduring Trust & Quiet Luxury"
            description="Read firsthand reflections from homeowners who entrusted us with their New York residences."
          />
          <button
            onClick={() => onNavigate('/reviews')}
            className="shrink-0 text-xs uppercase tracking-widest font-medium text-[#141312] hover:text-[#B39366] transition-colors flex items-center gap-1.5"
          >
            <span>View All Reviews</span>
            <span aria-hidden="true">→</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredTestimonials.map(testimonial => (
            <TestimonialCard
              key={testimonial.id}
              testimonial={testimonial}
            />
          ))}
        </div>
      </section>

      {/* 9. SERVICE AREAS PREVIEW */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 space-y-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-4 border-b border-[#EAE4DC]">
          <SectionHeading
            eyebrow="Service Coverage"
            title="Serving New York City & Westchester"
            description="From historic Manhattan co-op corridors to Brooklyn landmark districts and Westchester country properties."
          />
          <button
            onClick={() => onNavigate('/service-areas')}
            className="shrink-0 text-xs uppercase tracking-widest font-medium text-[#141312] hover:text-[#B39366] transition-colors flex items-center gap-1.5"
          >
            <span>View All Service Areas</span>
            <span aria-hidden="true">→</span>
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {serviceAreas.map(area => (
            <button
              key={area.id}
              onClick={() => onNavigate('/service-areas')}
              className="bg-white border border-[#EAE4DC] p-5 text-center hover:border-[#141312] transition-colors space-y-1"
            >
              <div className="text-sm font-serif text-[#141312] font-semibold">{area.name}</div>
              <div className="text-[10px] uppercase tracking-wider text-[#7A746E]">{area.region}</div>
            </button>
          ))}
        </div>
      </section>

      {/* 10. FINAL EDITORIAL CTA */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 pb-16">
        <div className="relative bg-[#252220] text-white p-10 sm:p-20 overflow-hidden">
          <div className="relative z-10 max-w-3xl space-y-6">
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#B39366] font-medium block">
              Begin the Conversation
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif font-normal leading-tight text-white">
              {homepageConfig?.finalCtaHeading || 'Let’s Build a Home You’ll Love Coming Back To.'}
            </h2>
            <p className="text-sm sm:text-base font-light text-[#D3C9BD] leading-relaxed max-w-xl">
              {homepageConfig?.finalCtaText ||
                'Tell us what you’re envisioning, and let’s explore what’s possible for your New York residence.'}
            </p>
            <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
              <button
                onClick={() => onNavigate('/consultation')}
                className="w-full sm:w-auto bg-[#FAF8F5] text-[#141312] hover:bg-[#EAE4DC] px-8 py-4 text-xs uppercase tracking-widest font-medium transition-all"
              >
                {homepageConfig?.finalCtaButtonText || 'Request a Free Consultation'}
              </button>
              <button
                onClick={() => onNavigate('/projects')}
                className="w-full sm:w-auto border border-white/30 text-white hover:bg-white/10 px-8 py-4 text-xs uppercase tracking-widest font-medium transition-all"
              >
                Explore Our Work
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
