import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { ProjectCard } from '../components/common/ProjectCard';
import { Breadcrumbs } from '../components/common/Breadcrumbs';

interface ProjectsPageProps {
  onNavigate: (path: string) => void;
}

export const ProjectsPage: React.FC<ProjectsPageProps> = ({ onNavigate }) => {
  const { projects } = useData();

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    'All',
    'Kitchen Remodeling',
    'Bathroom Remodeling',
    'Whole-Home Renovation',
    'Basement Finishing',
    'Home Addition',
    'Custom Renovation'
  ];

  const filteredProjects = projects.filter(p => {
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesSearch =
      searchQuery.trim() === '' ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="pt-28 sm:pt-36 pb-24 space-y-16">
      {/* Header & Intro */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 space-y-6">
        <Breadcrumbs items={[{ label: 'Projects' }]} onNavigate={onNavigate} />

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-8 border-b border-[#EAE4DC]">
          <div className="max-w-2xl space-y-4">
            <span className="text-[11px] uppercase tracking-[0.25em] font-medium text-[#B39366]">
              Portfolio of Completed Works
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-[#141312] font-normal leading-tight">
              Selected Residences
            </h1>
            <p className="text-sm sm:text-base text-[#5C5650] font-light leading-relaxed">
              Explore our architectural renovations across Manhattan, Brooklyn, Queens, and Westchester County. Every case study illustrates our rigorous design-build execution.
            </p>
          </div>

          {/* Search Box */}
          <div className="w-full lg:w-72">
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search by neighborhood, room, stone..."
              className="w-full bg-white border border-[#EAE4DC] px-4 py-2.5 text-xs text-[#141312] placeholder-[#8A8177] focus:outline-none focus:border-[#141312]"
            />
          </div>
        </div>

        {/* Category Filters (Clean Segmented Tabs per frontend-design skill) */}
        <div className="flex items-center gap-1 overflow-x-auto pb-2 scrollbar-none">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`shrink-0 px-4 py-2 text-xs uppercase tracking-wider font-medium transition-colors ${
                selectedCategory === cat
                  ? 'bg-[#141312] text-white shadow-xs'
                  : 'bg-white border border-[#EAE4DC] text-[#5C5650] hover:text-[#141312] hover:border-[#D3C9BD]'
              }`}
            >
              {cat === 'All' ? 'All Projects' : cat.replace(' Remodeling', '').replace(' Renovation', '')}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {filteredProjects.length === 0 ? (
          <div className="text-center py-20 bg-white border border-[#EAE4DC] p-8 space-y-4">
            <h3 className="text-xl font-serif text-[#141312]">No Projects Found</h3>
            <p className="text-xs text-[#7A746E]">
              We couldn’t find projects matching your search filter. Try clearing your search term.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="text-xs uppercase tracking-widest underline text-[#141312]"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10">
            {filteredProjects.map(project => (
              <ProjectCard
                key={project.id}
                project={project}
                onNavigate={onNavigate}
              />
            ))}
          </div>
        )}
      </div>

      {/* Bottom CTA */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="bg-[#FAF8F5] border border-[#EAE4DC] p-10 sm:p-14 text-center max-w-3xl mx-auto space-y-4">
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#B39366] font-medium block">
            Start Your Renovation
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif text-[#141312]">
            Envisioning a similar project for your residence?
          </h2>
          <p className="text-xs sm:text-sm text-[#5C5650] font-light max-w-md mx-auto">
            Contact our principals to arrange a private on-site architectural evaluation.
          </p>
          <div className="pt-2">
            <button
              onClick={() => onNavigate('/consultation')}
              className="bg-[#141312] text-white hover:bg-[#2C2825] px-7 py-3 text-xs uppercase tracking-widest font-medium transition-all"
            >
              Request a Free Consultation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
