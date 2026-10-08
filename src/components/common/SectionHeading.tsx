import React from 'react';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  centered?: boolean;
  light?: boolean;
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  eyebrow,
  title,
  description,
  centered = false,
  light = false,
  className = ''
}) => {
  return (
    <div
      className={`space-y-3 ${centered ? 'text-center max-w-3xl mx-auto' : 'max-w-3xl'} ${className}`}
    >
      {eyebrow && (
        <span
          className={`block text-[11px] uppercase tracking-[0.25em] font-medium ${
            light ? 'text-[#B39366]' : 'text-[#8A8177]'
          }`}
        >
          {eyebrow}
        </span>
      )}
      <h2
        className={`text-2xl sm:text-3xl lg:text-4xl font-serif font-normal leading-tight ${
          light ? 'text-white' : 'text-[#141312]'
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`text-sm sm:text-base font-light leading-relaxed ${
            light ? 'text-[#D3C9BD]' : 'text-[#5C5650]'
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
};
