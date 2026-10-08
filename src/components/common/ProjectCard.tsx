import React from 'react';
import { Project } from '../../types';

interface ProjectCardProps {
  project: Project;
  onNavigate: (path: string) => void;
  className?: string;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onNavigate, className = '' }) => {
  return (
    <article
      onClick={() => onNavigate(`/projects/${project.slug}`)}
      className={`group cursor-pointer flex flex-col bg-white border border-[#EAE4DC]/80 overflow-hidden transition-all duration-300 hover:shadow-md ${className}`}
    >
      {/* Large Project Image Container */}
      <div className="relative aspect-[4/3] sm:aspect-[16/10] overflow-hidden bg-[#EAE4DC]">
        <img
          src={project.heroImage}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content Area */}
      <div className="p-6 sm:p-7 flex flex-col flex-1 justify-between">
        <div className="space-y-2.5">
          {/* Eyebrow: Unboxed metadata according to frontend-design skill */}
          <div className="flex items-center gap-2 text-[11px] font-medium tracking-[0.2em] uppercase text-[#8A8177]">
            <span>{project.location}</span>
            <span aria-hidden="true">·</span>
            <span>{project.category}</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-serif text-[#141312] group-hover:text-[#B39366] transition-colors">
            {project.title}
          </h3>

          <p className="text-xs sm:text-sm text-[#5C5650] font-light leading-relaxed line-clamp-2">
            {project.shortDescription}
          </p>
        </div>

        {/* Footer info: budget range + interactive view project link */}
        <div className="pt-6 mt-6 border-t border-[#EAE4DC]/70 flex items-center justify-between text-xs">
          <div className="text-[#7A746E]">
            {project.budgetMin && project.budgetMax ? (
              <span>${project.budgetMin.toLocaleString()} – ${project.budgetMax.toLocaleString()}</span>
            ) : (
              <span>{project.timeline}</span>
            )}
          </div>

          <div className="flex items-center gap-1.5 font-medium uppercase tracking-wider text-[#141312] group-hover:text-[#B39366] transition-colors">
            <span>View Project</span>
            <svg
              className="w-3.5 h-3.5 transform transition-transform duration-200 group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </div>
        </div>
      </div>
    </article>
  );
};
