import React, { useState } from 'react';
import { useData } from '../../context/DataContext';

interface ConsultationFormProps {
  initialProjectType?: string;
  onSuccess?: () => void;
  onNavigateHome?: () => void;
  className?: string;
}

export const ConsultationForm: React.FC<ConsultationFormProps> = ({
  initialProjectType = 'Kitchen Remodeling',
  onSuccess,
  onNavigateHome,
  className = ''
}) => {
  const { submitConsultation } = useData();

  const [step, setStep] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Form Fields
  const [formData, setFormData] = useState({
    // Step 1: Project Parameters
    projectType: initialProjectType,
    propertyType: 'Co-op',
    estimatedBudget: '$100k–$250k',
    preferredTimeline: '1–3 Months',
    projectDetails: '',

    // Step 2: Contact & Property Location
    fullName: '',
    email: '',
    phone: '',
    zipCode: '',
    address: '',
    preferredContactMethod: 'email' as 'phone' | 'email' | 'text',

    // Anti-Spam Honeypot (hidden from humans)
    hp_website: ''
  });

  const projectTypeOptions = [
    'Kitchen Remodeling',
    'Bathroom Remodeling',
    'Basement Finishing',
    'Whole-Home Renovation',
    'Home Addition',
    'Custom Renovation',
    'Other Architectural Work'
  ];

  const propertyTypeOptions = [
    'Co-op',
    'Condo',
    'Brownstone',
    'Townhouse',
    'Single-Family Home',
    'Multi-Family Home',
    'Other'
  ];

  const budgetOptions = [
    'Under $50k',
    '$50k–$100k',
    '$100k–$250k',
    '$250k–$500k',
    '$500k+',
    'Not Sure Yet'
  ];

  const timelineOptions = [
    'ASAP',
    '1–3 Months',
    '3–6 Months',
    '6–12 Months',
    '12+ Months',
    'Just Exploring'
  ];

  const handleStep1Next = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.projectDetails.trim()) {
      setErrorMessage('Please provide a brief description of your project vision.');
      return;
    }
    setErrorMessage(null);
    setStep(2);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Validation
    if (!formData.fullName.trim() || !formData.email.trim() || !formData.phone.trim() || !formData.zipCode.trim()) {
      setErrorMessage('Please complete all required contact fields (Name, Email, Phone, and ZIP Code).');
      return;
    }

    setLoading(true);
    const result = await submitConsultation(formData);
    setLoading(false);

    if (result.success) {
      setSubmitted(true);
      if (onSuccess) onSuccess();
    } else {
      setErrorMessage(result.error || 'We couldn’t submit your request. Please check your information and try again.');
    }
  };

  if (submitted) {
    return (
      <div className={`bg-white border border-[#EAE4DC] p-8 sm:p-14 text-center max-w-2xl mx-auto space-y-6 ${className}`}>
        <div className="w-14 h-14 rounded-full bg-[#FAF8F5] border border-[#B39366]/40 flex items-center justify-center mx-auto text-[#B39366]">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <div className="space-y-3">
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#B39366] font-medium block">
            Consultation Request Received
          </span>
          <h3 className="text-2xl sm:text-3xl font-serif text-[#141312]">
            Thank You
          </h3>
          <p className="text-sm sm:text-base text-[#5C5650] font-light leading-relaxed max-w-lg mx-auto">
            Your consultation request has been received. A member of the Banlgar Ghor Remodeling team will review your project details and get in touch with you shortly.
          </p>
        </div>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => {
              if (onNavigateHome) onNavigateHome();
              else window.location.href = '/';
            }}
            className="w-full sm:w-auto bg-[#141312] text-white hover:bg-[#2C2825] px-8 py-3 text-xs uppercase tracking-widest font-medium transition-all"
          >
            Return Home
          </button>
          <button
            onClick={() => {
              setSubmitted(false);
              setStep(1);
            }}
            className="w-full sm:w-auto border border-[#D3C9BD] text-[#141312] hover:bg-[#FAF8F5] px-6 py-3 text-xs uppercase tracking-widest font-medium transition-all"
          >
            Submit Another Request
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white border border-[#EAE4DC] p-6 sm:p-10 lg:p-12 ${className}`}>
      {/* Progress Indicators */}
      <div className="flex items-center justify-between pb-8 mb-8 border-b border-[#EAE4DC] text-xs uppercase tracking-wider font-medium text-[#7A746E]">
        <div className="flex items-center gap-2">
          <span
            className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] ${
              step === 1 ? 'bg-[#141312] text-white' : 'bg-[#EAE4DC] text-[#141312]'
            }`}
          >
            1
          </span>
          <span className={step === 1 ? 'text-[#141312] font-semibold' : ''}>
            Project Parameters
          </span>
        </div>
        <div className="w-12 h-px bg-[#EAE4DC]" />
        <div className="flex items-center gap-2">
          <span
            className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] ${
              step === 2 ? 'bg-[#141312] text-white' : 'bg-[#EAE4DC] text-[#141312]'
            }`}
          >
            2
          </span>
          <span className={step === 2 ? 'text-[#141312] font-semibold' : ''}>
            Property & Contact
          </span>
        </div>
      </div>

      {errorMessage && (
        <div className="mb-6 p-4 bg-[#FBEBE8] border border-[#F1C2BA] text-xs text-[#8A2616] leading-relaxed">
          {errorMessage}
        </div>
      )}

      {/* Honeypot anti-spam (hidden) */}
      <input
        type="text"
        name="hp_website"
        value={formData.hp_website}
        onChange={e => setFormData({ ...formData, hp_website: e.target.value })}
        style={{ display: 'none' }}
        tabIndex={-1}
        autoComplete="off"
      />

      {step === 1 ? (
        <form onSubmit={handleStep1Next} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Project Type */}
            <div className="space-y-2">
              <label className="block text-xs uppercase tracking-wider font-medium text-[#141312]">
                Project Type <span className="text-[#8A2616]">*</span>
              </label>
              <select
                value={formData.projectType}
                onChange={e => setFormData({ ...formData, projectType: e.target.value })}
                className="w-full bg-[#FAF8F5] border border-[#EAE4DC] p-3 text-xs sm:text-sm text-[#141312] focus:outline-none focus:border-[#141312]"
              >
                {projectTypeOptions.map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>

            {/* Property Type */}
            <div className="space-y-2">
              <label className="block text-xs uppercase tracking-wider font-medium text-[#141312]">
                Property Type <span className="text-[#8A2616]">*</span>
              </label>
              <select
                value={formData.propertyType}
                onChange={e => setFormData({ ...formData, propertyType: e.target.value })}
                className="w-full bg-[#FAF8F5] border border-[#EAE4DC] p-3 text-xs sm:text-sm text-[#141312] focus:outline-none focus:border-[#141312]"
              >
                {propertyTypeOptions.map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>

            {/* Estimated Budget */}
            <div className="space-y-2">
              <label className="block text-xs uppercase tracking-wider font-medium text-[#141312]">
                Estimated Budget Range <span className="text-[#8A2616]">*</span>
              </label>
              <select
                value={formData.estimatedBudget}
                onChange={e => setFormData({ ...formData, estimatedBudget: e.target.value })}
                className="w-full bg-[#FAF8F5] border border-[#EAE4DC] p-3 text-xs sm:text-sm text-[#141312] focus:outline-none focus:border-[#141312]"
              >
                {budgetOptions.map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>

            {/* Preferred Timeline */}
            <div className="space-y-2">
              <label className="block text-xs uppercase tracking-wider font-medium text-[#141312]">
                Desired Construction Start <span className="text-[#8A2616]">*</span>
              </label>
              <select
                value={formData.preferredTimeline}
                onChange={e => setFormData({ ...formData, preferredTimeline: e.target.value })}
                className="w-full bg-[#FAF8F5] border border-[#EAE4DC] p-3 text-xs sm:text-sm text-[#141312] focus:outline-none focus:border-[#141312]"
              >
                {timelineOptions.map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Project Details Textarea */}
          <div className="space-y-2">
            <label className="block text-xs uppercase tracking-wider font-medium text-[#141312]">
              Project Details & Architectural Vision <span className="text-[#8A2616]">*</span>
            </label>
            <textarea
              rows={4}
              value={formData.projectDetails}
              onChange={e => setFormData({ ...formData, projectDetails: e.target.value })}
              placeholder="Tell us what you are looking to achieve: rooms involved, desired materials, co-op/condo rules, specific aesthetic directions..."
              className="w-full bg-[#FAF8F5] border border-[#EAE4DC] p-3.5 text-xs sm:text-sm text-[#141312] placeholder-[#8A8177] focus:outline-none focus:border-[#141312]"
              required
            />
          </div>

          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              className="bg-[#141312] text-white hover:bg-[#2C2825] px-8 py-3 text-xs uppercase tracking-widest font-medium transition-all"
            >
              Next Step: Contact Details →
            </button>
          </div>
        </form>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Full Name */}
            <div className="space-y-2">
              <label className="block text-xs uppercase tracking-wider font-medium text-[#141312]">
                Full Name <span className="text-[#8A2616]">*</span>
              </label>
              <input
                type="text"
                value={formData.fullName}
                onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                placeholder="Eleanor Vance"
                className="w-full bg-[#FAF8F5] border border-[#EAE4DC] p-3 text-xs sm:text-sm text-[#141312] focus:outline-none focus:border-[#141312]"
                required
              />
            </div>

            {/* Email Address */}
            <div className="space-y-2">
              <label className="block text-xs uppercase tracking-wider font-medium text-[#141312]">
                Email Address <span className="text-[#8A2616]">*</span>
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                placeholder="eleanor@example.com"
                className="w-full bg-[#FAF8F5] border border-[#EAE4DC] p-3 text-xs sm:text-sm text-[#141312] focus:outline-none focus:border-[#141312]"
                required
              />
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <label className="block text-xs uppercase tracking-wider font-medium text-[#141312]">
                Phone Number <span className="text-[#8A2616]">*</span>
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={e => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+1 (212) 555-0142"
                className="w-full bg-[#FAF8F5] border border-[#EAE4DC] p-3 text-xs sm:text-sm text-[#141312] focus:outline-none focus:border-[#141312]"
                required
              />
            </div>

            {/* ZIP Code */}
            <div className="space-y-2">
              <label className="block text-xs uppercase tracking-wider font-medium text-[#141312]">
                Property ZIP Code <span className="text-[#8A2616]">*</span>
              </label>
              <input
                type="text"
                value={formData.zipCode}
                onChange={e => setFormData({ ...formData, zipCode: e.target.value })}
                placeholder="10011"
                className="w-full bg-[#FAF8F5] border border-[#EAE4DC] p-3 text-xs sm:text-sm text-[#141312] focus:outline-none focus:border-[#141312]"
                required
              />
            </div>
          </div>

          {/* Street Address */}
          <div className="space-y-2">
            <label className="block text-xs uppercase tracking-wider font-medium text-[#141312]">
              Street Address / Building (Optional)
            </label>
            <input
              type="text"
              value={formData.address}
              onChange={e => setFormData({ ...formData, address: e.target.value })}
              placeholder="e.g. 240 West 12th St, Apt 3A"
              className="w-full bg-[#FAF8F5] border border-[#EAE4DC] p-3 text-xs sm:text-sm text-[#141312] focus:outline-none focus:border-[#141312]"
            />
          </div>

          {/* Preferred Contact Method */}
          <div className="space-y-2">
            <label className="block text-xs uppercase tracking-wider font-medium text-[#141312]">
              Preferred Contact Method
            </label>
            <div className="flex items-center gap-6 text-xs text-[#4A4642] pt-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="preferredContactMethod"
                  value="email"
                  checked={formData.preferredContactMethod === 'email'}
                  onChange={() => setFormData({ ...formData, preferredContactMethod: 'email' })}
                  className="accent-[#141312]"
                />
                <span>Email</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="preferredContactMethod"
                  value="phone"
                  checked={formData.preferredContactMethod === 'phone'}
                  onChange={() => setFormData({ ...formData, preferredContactMethod: 'phone' })}
                  className="accent-[#141312]"
                />
                <span>Phone Call</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="preferredContactMethod"
                  value="text"
                  checked={formData.preferredContactMethod === 'text'}
                  onChange={() => setFormData({ ...formData, preferredContactMethod: 'text' })}
                  className="accent-[#141312]"
                />
                <span>Text Message</span>
              </label>
            </div>
          </div>

          <div className="pt-4 flex items-center justify-between border-t border-[#EAE4DC]">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="text-xs uppercase tracking-widest text-[#7A746E] hover:text-[#141312] transition-colors"
            >
              ← Back to Project Info
            </button>
            <button
              type="submit"
              disabled={loading}
              className="bg-[#141312] text-white hover:bg-[#2C2825] px-8 py-3 text-xs uppercase tracking-widest font-medium transition-all disabled:opacity-50"
            >
              {loading ? 'Submitting Request...' : 'Submit Consultation Request'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
