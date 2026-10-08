import React from 'react';
import { useData } from '../context/DataContext';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { FAQAccordion } from '../components/common/FAQAccordion';

interface FinancingPageProps {
  onNavigate: (path: string) => void;
}

export const FinancingPage: React.FC<FinancingPageProps> = ({ onNavigate }) => {
  const { financingContent } = useData();

  if (!financingContent) return null;

  return (
    <div className="pt-28 sm:pt-36 pb-24 space-y-24">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 space-y-6">
        <Breadcrumbs items={[{ label: 'Financing' }]} onNavigate={onNavigate} />

        <div className="max-w-4xl space-y-4">
          <span className="text-[11px] uppercase tracking-[0.25em] font-medium text-[#B39366]">
            Funding Structures
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-[#141312] font-normal leading-tight">
            {financingContent.headline || 'Structured Financing for Luxury Renovations'}
          </h1>
          <p className="text-base sm:text-lg text-[#5C5650] font-light leading-relaxed max-w-2xl">
            {financingContent.subheadline || 'Flexible, transparent funding solutions tailored to your project timeline and wealth management goals.'}
          </p>
        </div>
      </div>

      {/* Overview & Core Pillars */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 space-y-12">
        <div className="max-w-3xl space-y-4 text-sm sm:text-base text-[#4A4642] font-light leading-relaxed">
          <p>{financingContent.introParagraph}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {(financingContent.features || []).map((feat, idx) => (
            <div key={idx} className="bg-white border border-[#EAE4DC] p-8 space-y-3">
              <span className="text-xs font-mono text-[#B39366]">0{idx + 1}</span>
              <h3 className="text-lg font-serif text-[#141312]">{feat.title}</h3>
              <p className="text-xs text-[#5C5650] font-light leading-relaxed">
                {feat.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Process Steps */}
      <section className="bg-[#F3EFEA] py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 space-y-12">
          <div className="max-w-2xl space-y-2">
            <span className="text-[11px] uppercase tracking-[0.25em] font-medium text-[#B39366]">
              Simple Application
            </span>
            <h2 className="text-3xl font-serif text-[#141312]">
              How Financing Integrates With Your Build
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {(financingContent.steps || []).map(step => (
              <div key={step.step} className="bg-white border border-[#EAE4DC] p-8 space-y-3">
                <span className="text-xs font-mono text-[#B39366]">STEP 0{step.step}</span>
                <h3 className="text-lg font-serif text-[#141312]">{step.title}</h3>
                <p className="text-xs text-[#5C5650] font-light leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Financing FAQs */}
      {financingContent.faqs && financingContent.faqs.length > 0 && (
        <div className="max-w-4xl mx-auto px-6 lg:px-10 space-y-8">
          <div className="space-y-2">
            <span className="text-[11px] uppercase tracking-[0.25em] font-medium text-[#B39366]">
              Common Questions
            </span>
            <h2 className="text-3xl font-serif text-[#141312]">
              Renovation Financing FAQ
            </h2>
          </div>
          <FAQAccordion
            faqs={financingContent.faqs.map((f, i) => ({
              id: `fin-${i}`,
              question: f.question,
              answer: f.answer,
              category: 'Financing',
              sortOrder: i,
              published: true,
              createdAt: '',
              updatedAt: ''
            }))}
            showCategories={false}
            showSearch={false}
          />
        </div>
      )}

      {/* Disclaimer */}
      <div className="max-w-4xl mx-auto px-6 lg:px-10">
        <div className="p-6 bg-[#FAF8F5] border border-[#EAE4DC] text-xs text-[#7A746E] leading-relaxed space-y-2">
          <span className="font-semibold text-[#141312] uppercase tracking-wider block text-[10px]">
            Important Financial Disclaimer
          </span>
          <p>{financingContent.disclaimer}</p>
        </div>
      </div>

      {/* CTA Box */}
      <div className="max-w-4xl mx-auto px-6 text-center space-y-4">
        <h2 className="text-2xl sm:text-3xl font-serif text-[#141312]">
          Discuss Financing Options for Your Project
        </h2>
        <p className="text-xs sm:text-sm text-[#5C5650] max-w-md mx-auto">
          Contact our project advisory team to explore customized financing programs aligned with your residential scope.
        </p>
        <div className="pt-2">
          <button
            onClick={() => onNavigate('/consultation')}
            className="bg-[#141312] text-white hover:bg-[#2C2825] px-8 py-3.5 text-xs uppercase tracking-widest font-medium transition-all"
          >
            Discuss Your Project
          </button>
        </div>
      </div>
    </div>
  );
};
