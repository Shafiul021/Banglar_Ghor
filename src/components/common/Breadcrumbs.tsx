import React from 'react';

export interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  onNavigate: (path: string) => void;
  className?: string;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, onNavigate, className = '' }) => {
  return (
    <nav aria-label="Breadcrumb" className={`text-xs text-[#7A746E] ${className}`}>
      <ol className="flex items-center flex-wrap gap-2">
        <li>
          <button
            onClick={() => onNavigate('/')}
            className="hover:text-[#141312] transition-colors focus:outline-none focus:underline"
          >
            Home
          </button>
        </li>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={index} className="flex items-center gap-2">
              <span className="text-[#A99F94] select-none" aria-hidden="true">/</span>
              {isLast || !item.path ? (
                <span className="text-[#141312] font-medium" aria-current="page">
                  {item.label}
                </span>
              ) : (
                <button
                  onClick={() => item.path && onNavigate(item.path)}
                  className="hover:text-[#141312] transition-colors focus:outline-none focus:underline"
                >
                  {item.label}
                </button>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
