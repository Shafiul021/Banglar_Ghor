import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { BeforeAfterSlider } from '../components/common/BeforeAfterSlider';
import { ProjectCard } from '../components/common/ProjectCard';

interface ProjectDetailPageProps {
  slug: string;
  onNavigate: (path: string) => void;
}

export const ProjectDetailPage: React.FC<ProjectDetailPageProps> = ({ slug, onNavigate }) => {
  const { projects } = useData();
  const [selectedGalleryImg, setSelectedGalleryImg] = useState<string | null>(null);

  const project = projects.find(p => p.slug === slug || p.id === slug);

  if (!project) {
    return (
      <div className="pt-36 pb-24 max-w-3xl mx-auto px-6 text-center space-y-6">
        <h1 className="text-3xl font-serif text-[#141312]">Project Not Found</h1>
        <p className="text-sm text-[#5C5650]">
          We couldn’t find the project case study you were looking for.
        </p>
        <button
          onClick={() => onNavigate('/projects')}
          className="bg-[#141312] text-white px-6 py-3 text-xs uppercase tracking-widest font-medium"
        >
          Back to Projects
        </button>
      </div>
    );
  }

  const relatedProjects = projects
    .filter(p => p.id !== project.id && (p.category === project.category || p.published))
    .slice(0, 3);

  const galleryImages = [
    project.heroImage,
    ...(project.galleryImages || [])
  ].filter((v, i, a) => a.indexOf(v) === i);

  return (
    <div className="space-y-20 sm:space-y-28 pb-24">
      {/* 1. CINEMATIC HERO */}
      <section className="relative min-h-[70vh] sm:min-h-[85vh] flex items-end overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={project.heroImage}
            alt={project.title}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#141312]/95 via-[#141312]/40 to-[#141312]/30" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 pb-16 pt-32 w-full text-white space-y-4">
          <Breadcrumbs
            items={[
              { label: 'Projects', path: '/projects' },
              { label: project.title }
            ]}
            onNavigate={onNavigate}
            className="text-white/70"
          />

          <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.25em] text-[#FAF8F5]/85 font-medium">
            <span>{project.location}</span>
            <span aria-hidden="true">·</span>
            <span>{project.category}</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-normal leading-[1.08] text-white max-w-4xl">
            {project.title}
          </h1>

          <p className="text-base sm:text-xl font-light text-[#EAE4DC] max-w-2xl leading-relaxed">
            {project.shortDescription}
          </p>
        </div>
      </section>

      {/* 2. PROJECT METADATA STRIP */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 py-8 border-y border-[#EAE4DC] text-xs">
          <div className="space-y-1">
            <span className="text-[#8A8177] uppercase tracking-wider block text-[10px]">Location</span>
            <span className="font-medium text-[#141312]">{project.location}</span>
          </div>
          <div className="space-y-1">
            <span className="text-[#8A8177] uppercase tracking-wider block text-[10px]">Project Category</span>
            <span className="font-medium text-[#141312]">{project.category}</span>
          </div>
          <div className="space-y-1">
            <span className="text-[#8A8177] uppercase tracking-wider block text-[10px]">Property Type</span>
            <span className="font-medium text-[#141312]">{project.propertyType || 'Residential'}</span>
          </div>
          <div className="space-y-1">
            <span className="text-[#8A8177] uppercase tracking-wider block text-[10px]">Investment Range</span>
            <span className="font-medium text-[#141312]">
              {project.budgetMin && project.budgetMax
                ? `$${project.budgetMin.toLocaleString()} – $${project.budgetMax.toLocaleString()}`
                : 'Custom Investment'}
            </span>
          </div>
          <div className="space-y-1">
            <span className="text-[#8A8177] uppercase tracking-wider block text-[10px]">Timeline</span>
            <span className="font-medium text-[#141312]">{project.timeline || '12 weeks'}</span>
          </div>
          <div className="space-y-1">
            <span className="text-[#8A8177] uppercase tracking-wider block text-[10px]">Completed</span>
            <span className="font-medium text-[#141312]">{project.yearCompleted || 2025}</span>
          </div>
        </div>
      </section>

      {/* 3. CASE STUDY NARRATIVE & SPECIFIED MATERIALS */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Main Story Narrative */}
          <div className="lg:col-span-8 space-y-8 text-[#252220] leading-relaxed">
            <div className="space-y-4">
              <span className="text-[11px] uppercase tracking-[0.25em] font-medium text-[#B39366] block">
                Project Narrative
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif text-[#141312]">
                Architectural Intent & Transformation
              </h2>
            </div>

            <div className="text-base sm:text-lg font-light text-[#4A4642] leading-relaxed space-y-5">
              <p>{project.fullDescription}</p>
            </div>

            {project.designApproach && (
              <div className="bg-[#FAF8F5] border-l-2 border-[#B39366] p-6 space-y-2">
                <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-[#B39366]">
                  Design Approach
                </span>
                <p className="text-sm sm:text-base font-serif italic text-[#141312]">
                  “{project.designApproach}”
                </p>
              </div>
            )}
          </div>

          {/* Sidebar: Curated Materials & Finishes */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-[#FAF8F5] border border-[#EAE4DC] p-7 space-y-5">
              <span className="text-[10px] uppercase tracking-[0.25em] font-medium text-[#B39366] block">
                Specifications
              </span>
              <h3 className="text-lg font-serif text-[#141312]">
                Specified Materials & Joinery
              </h3>
              <ul className="space-y-3">
                {(project.materials || []).map((mat, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-[#5C5650] leading-relaxed">
                    <span className="text-[#B39366] mt-0.5">•</span>
                    <span>{mat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Inquire Box */}
            <div className="bg-white border border-[#EAE4DC] p-7 space-y-4 text-center">
              <h4 className="text-base font-serif text-[#141312]">
                Envisioning a Similar Residence?
              </h4>
              <p className="text-xs text-[#7A746E]">
                Discuss your architectural objectives with our principals.
              </p>
              <button
                onClick={() => onNavigate('/consultation')}
                className="w-full bg-[#141312] text-white hover:bg-[#2C2825] py-3 text-xs uppercase tracking-widest font-medium transition-all"
              >
                Request a Free Consultation
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. BEFORE & AFTER COMPARISON SLIDER */}
      {project.beforeImage && project.afterImage && (
        <section className="max-w-7xl mx-auto px-6 lg:px-10 space-y-6">
          <div className="space-y-2">
            <span className="text-[11px] uppercase tracking-[0.25em] font-medium text-[#B39366]">
              Visual Comparison
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif text-[#141312]">
              Before & After Transformation
            </h2>
            <p className="text-xs sm:text-sm text-[#7A746E]">
              Drag the slider or use left/right arrow keys to compare the original conditions with the completed renovation.
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <BeforeAfterSlider
              beforeImage={project.beforeImage}
              afterImage={project.afterImage}
              beforeLabel="Original Condition"
              afterLabel="Completed Architecture"
              aspectRatio="aspect-[16/10]"
            />
          </div>
        </section>
      )}

      {/* 5. EDITORIAL GALLERY */}
      {galleryImages.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 lg:px-10 space-y-8">
          <div className="space-y-2">
            <span className="text-[11px] uppercase tracking-[0.25em] font-medium text-[#B39366]">
              Project Gallery
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif text-[#141312]">
              Architectural Details & Perspectives
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryImages.map((imgUrl, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedGalleryImg(imgUrl)}
                className="group cursor-pointer relative aspect-[4/3] bg-[#EAE4DC] overflow-hidden border border-[#EAE4DC]"
              >
                <img
                  src={imgUrl}
                  alt={`${project.title} detail ${idx + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs uppercase tracking-widest font-medium">
                  Enlarge View
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Lightbox Modal */}
      {selectedGalleryImg && (
        <div
          onClick={() => setSelectedGalleryImg(null)}
          className="fixed inset-0 z-50 bg-black/90 p-4 sm:p-10 flex items-center justify-center backdrop-blur-xs cursor-zoom-out"
        >
          <div className="relative max-w-5xl max-h-[90vh]">
            <img
              src={selectedGalleryImg}
              alt="Expanded architectural preview"
              className="max-h-[85vh] w-auto object-contain mx-auto"
            />
            <button
              onClick={() => setSelectedGalleryImg(null)}
              className="absolute -top-10 right-0 text-white text-xs uppercase tracking-widest hover:text-[#B39366]"
            >
              Close [ESC]
            </button>
          </div>
        </div>
      )}

      {/* 6. RELATED PROJECTS */}
      {relatedProjects.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 lg:px-10 space-y-10">
          <div className="flex items-end justify-between border-b border-[#EAE4DC] pb-4">
            <h3 className="text-2xl font-serif text-[#141312]">
              Related Residential Works
            </h3>
            <button
              onClick={() => onNavigate('/projects')}
              className="text-xs uppercase tracking-widest font-medium text-[#141312] hover:text-[#B39366] transition-colors"
            >
              All Projects →
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedProjects.map(p => (
              <ProjectCard key={p.id} project={p} onNavigate={onNavigate} />
            ))}
          </div>
        </section>
      )}

      {/* 7. FINAL CTA */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="bg-[#252220] text-white p-10 sm:p-16 text-center max-w-4xl mx-auto space-y-6">
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#B39366] font-medium block">
            Have a Similar Project in Mind?
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif text-white">
            Let’s Discuss Your Residence
          </h2>
          <p className="text-sm sm:text-base text-[#D3C9BD] font-light max-w-xl mx-auto leading-relaxed">
            Our architectural team evaluates site parameters, building alteration agreements, and budget parameters with complete discretion.
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
