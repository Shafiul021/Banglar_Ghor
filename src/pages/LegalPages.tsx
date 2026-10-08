import React from 'react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';

interface LegalPageProps {
  type: 'privacy' | 'terms' | 'accessibility';
  onNavigate: (path: string) => void;
}

export const LegalPage: React.FC<LegalPageProps> = ({ type, onNavigate }) => {
  if (type === 'privacy') {
    return (
      <div className="pt-28 sm:pt-36 pb-24 max-w-4xl mx-auto px-6 space-y-8">
        <Breadcrumbs items={[{ label: 'Privacy Policy' }]} onNavigate={onNavigate} />
        <div className="space-y-4">
          <span className="text-[11px] uppercase tracking-[0.25em] font-medium text-[#B39366]">Legal</span>
          <h1 className="text-3xl sm:text-4xl font-serif text-[#141312]">Privacy Policy</h1>
          <p className="text-xs text-[#7A746E]">Last updated: January 1, 2026</p>
        </div>
        <div className="space-y-6 text-sm text-[#4A4642] font-light leading-relaxed">
          <p>
            Banlgar Ghor Remodeling LLC (“Banlgar Ghor”, “we”, “our”, or “us”) respects the privacy of our website visitors and clients. This Privacy Policy describes how we collect, use, and protect information submitted through our website.
          </p>
          <h2 className="text-lg font-serif text-[#141312]">Information We Collect</h2>
          <p>
            When you submit a consultation request or contact message, we collect personal contact information (including your name, email address, phone number, and property address) as well as renovation parameters (project type, budget range, and timeline).
          </p>
          <h2 className="text-lg font-serif text-[#141312]">How We Use Your Information</h2>
          <p>
            We use this information exclusively to communicate regarding your residential renovation inquiry, provide preliminary architectural assessments, coordinate site visits, and prepare project proposals. We never sell, rent, or disclose client information to unauthorized third-party marketers.
          </p>
          <h2 className="text-lg font-serif text-[#141312]">Data Security</h2>
          <p>
            We maintain technical safeguards to protect all submitted data. For questions regarding our privacy practices, contact us at inquiries@banlgarghor.com.
          </p>
        </div>
      </div>
    );
  }

  if (type === 'terms') {
    return (
      <div className="pt-28 sm:pt-36 pb-24 max-w-4xl mx-auto px-6 space-y-8">
        <Breadcrumbs items={[{ label: 'Terms of Use' }]} onNavigate={onNavigate} />
        <div className="space-y-4">
          <span className="text-[11px] uppercase tracking-[0.25em] font-medium text-[#B39366]">Legal</span>
          <h1 className="text-3xl sm:text-4xl font-serif text-[#141312]">Terms of Use</h1>
          <p className="text-xs text-[#7A746E]">Last updated: January 1, 2026</p>
        </div>
        <div className="space-y-6 text-sm text-[#4A4642] font-light leading-relaxed">
          <p>
            Welcome to the Banlgar Ghor Remodeling website. By accessing or using this site, you agree to comply with and be bound by the following terms and conditions.
          </p>
          <h2 className="text-lg font-serif text-[#141312]">Content & Intellectual Property</h2>
          <p>
            All architectural photography, case study narratives, text, logos, and graphics displayed on this website are the property of Banlgar Ghor Remodeling LLC and are protected by applicable copyright and trademark laws.
          </p>
          <h2 className="text-lg font-serif text-[#141312]">Contractual Scope</h2>
          <p>
            Informational content, project budgets, and timelines presented on this website are illustrative and do not constitute a binding legal contract or guaranteed estimate until an executed written contract is signed between the homeowner and Banlgar Ghor Remodeling LLC.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-28 sm:pt-36 pb-24 max-w-4xl mx-auto px-6 space-y-8">
      <Breadcrumbs items={[{ label: 'Accessibility Statement' }]} onNavigate={onNavigate} />
      <div className="space-y-4">
        <span className="text-[11px] uppercase tracking-[0.25em] font-medium text-[#B39366]">Commitment</span>
        <h1 className="text-3xl sm:text-4xl font-serif text-[#141312]">Accessibility Statement</h1>
      </div>
      <div className="space-y-6 text-sm text-[#4A4642] font-light leading-relaxed">
        <p>
          Banlgar Ghor Remodeling is dedicated to facilitating the accessibility and usability of its website for all people, including those with visual, auditory, cognitive, and motor impairments.
        </p>
        <h2 className="text-lg font-serif text-[#141312]">Standards & Compliance</h2>
        <p>
          We strive to comply with the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA specifications. If you encounter any difficulty navigating or accessing content on this site, please contact us at inquiries@banlgarghor.com or call (212) 555-0198 and our staff will assist you.
        </p>
      </div>
    </div>
  );
};
