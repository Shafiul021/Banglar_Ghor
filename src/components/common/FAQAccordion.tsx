import React, { useState } from 'react';
import { FAQ } from '../../types';

interface FAQAccordionProps {
  faqs: FAQ[];
  showCategories?: boolean;
  showSearch?: boolean;
  defaultOpenIndex?: number;
  className?: string;
}

export const FAQAccordion: React.FC<FAQAccordionProps> = ({
  faqs,
  showCategories = true,
  showSearch = true,
  defaultOpenIndex = 0,
  className = ''
}) => {
  const [openIds, setOpenIds] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    if (faqs.length > 0 && defaultOpenIndex >= 0 && defaultOpenIndex < faqs.length) {
      initial[faqs[defaultOpenIndex].id] = true;
    }
    return initial;
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'General', 'Process', 'Pricing', 'Design', 'Construction', 'Timeline', 'Financing'];

  const toggleItem = (id: string) => {
    setOpenIds(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredFaqs = faqs.filter(faq => {
    const matchesCategory = selectedCategory === 'All' || faq.category === selectedCategory;
    const matchesSearch =
      searchQuery.trim() === '' ||
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className={`space-y-8 ${className}`}>
      {/* Search & Category Filter Controls */}
      {(showSearch || showCategories) && (
        <div className="space-y-4">
          {showSearch && (
            <div className="relative max-w-xl">
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search renovation questions, permits, pricing, timelines..."
                className="w-full bg-white border border-[#EAE4DC] px-4 py-3 text-sm text-[#141312] placeholder-[#8A8177] focus:outline-none focus:border-[#141312] transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs uppercase tracking-wider text-[#7A746E] hover:text-[#141312]"
                >
                  Clear
                </button>
              )}
            </div>
          )}

          {showCategories && (
            <div className="flex flex-wrap gap-2 pt-2">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 text-xs font-medium uppercase tracking-wider transition-colors ${
                    selectedCategory === cat
                      ? 'bg-[#141312] text-[#FAF8F5]'
                      : 'bg-white border border-[#EAE4DC] text-[#5C5650] hover:text-[#141312] hover:border-[#D3C9BD]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Accordion List */}
      <div className="divide-y divide-[#EAE4DC] border-y border-[#EAE4DC] bg-white">
        {filteredFaqs.length === 0 ? (
          <div className="py-12 text-center text-sm text-[#7A746E]">
            No questions match your current search criteria.
          </div>
        ) : (
          filteredFaqs.map(faq => {
            const isOpen = !!openIds[faq.id];
            return (
              <div key={faq.id} className="transition-colors">
                <button
                  onClick={() => toggleItem(faq.id)}
                  aria-expanded={isOpen}
                  className="w-full py-6 px-6 sm:px-8 text-left flex items-start justify-between gap-6 hover:bg-[#FAF8F5]/60 transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#B39366]"
                >
                  <div className="space-y-1 pr-4">
                    <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-[#B39366] block">
                      {faq.category}
                    </span>
                    <h3 className="text-base sm:text-lg font-serif text-[#141312] font-medium">
                      {faq.question}
                    </h3>
                  </div>
                  <div className="shrink-0 mt-1">
                    <div
                      className={`w-6 h-6 rounded-full border border-[#D3C9BD] flex items-center justify-center transition-transform duration-200 ${
                        isOpen ? 'rotate-180 bg-[#141312] text-white border-[#141312]' : 'text-[#7A746E]'
                      }`}
                    >
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 sm:px-8 pb-7 pt-1 text-sm sm:text-base font-light text-[#4A4642] leading-relaxed">
                    <p className="max-w-3xl">{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
