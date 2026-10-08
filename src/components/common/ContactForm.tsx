import React, { useState } from 'react';
import { useData } from '../../context/DataContext';

interface ContactFormProps {
  className?: string;
}

export const ContactForm: React.FC<ContactFormProps> = ({ className = '' }) => {
  const { submitContact } = useData();

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    hp_website: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMessage('Please fill in your name, email, and message.');
      return;
    }

    setLoading(true);
    const result = await submitContact(formData);
    setLoading(false);

    if (result.success) {
      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', message: '', hp_website: '' });
    } else {
      setErrorMessage(result.error || 'Something went wrong. Please try again in a moment.');
    }
  };

  if (submitted) {
    return (
      <div className={`bg-white border border-[#EAE4DC] p-8 sm:p-10 text-center space-y-4 ${className}`}>
        <div className="w-12 h-12 rounded-full bg-[#FAF8F5] border border-[#B39366]/40 flex items-center justify-center mx-auto text-[#B39366]">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-serif text-[#141312]">Message Sent Successfully</h3>
        <p className="text-xs sm:text-sm text-[#5C5650] max-w-md mx-auto leading-relaxed">
          Thank you for reaching out to Banlgar Ghor Remodeling. Our studio team will review your inquiry and respond within one business day.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="mt-4 text-xs uppercase tracking-widest text-[#141312] underline hover:text-[#B39366]"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`bg-white border border-[#EAE4DC] p-6 sm:p-8 space-y-5 ${className}`}>
      {errorMessage && (
        <div className="p-3.5 bg-[#FBEBE8] border border-[#F1C2BA] text-xs text-[#8A2616] leading-relaxed">
          {errorMessage}
        </div>
      )}

      {/* Honeypot field */}
      <input
        type="text"
        name="hp_website"
        value={formData.hp_website}
        onChange={e => setFormData({ ...formData, hp_website: e.target.value })}
        style={{ display: 'none' }}
        tabIndex={-1}
        autoComplete="off"
      />

      <div className="space-y-1.5">
        <label className="block text-xs uppercase tracking-wider font-medium text-[#141312]">
          Your Name <span className="text-[#8A2616]">*</span>
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={e => setFormData({ ...formData, name: e.target.value })}
          placeholder="Julian Montgomery"
          className="w-full bg-[#FAF8F5] border border-[#EAE4DC] p-3 text-xs sm:text-sm text-[#141312] focus:outline-none focus:border-[#141312]"
          required
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="block text-xs uppercase tracking-wider font-medium text-[#141312]">
            Email Address <span className="text-[#8A2616]">*</span>
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={e => setFormData({ ...formData, email: e.target.value })}
            placeholder="julian@example.com"
            className="w-full bg-[#FAF8F5] border border-[#EAE4DC] p-3 text-xs sm:text-sm text-[#141312] focus:outline-none focus:border-[#141312]"
            required
          />
        </div>
        <div className="space-y-1.5">
          <label className="block text-xs uppercase tracking-wider font-medium text-[#141312]">
            Phone Number
          </label>
          <input
            type="tel"
            value={formData.phone}
            onChange={e => setFormData({ ...formData, phone: e.target.value })}
            placeholder="+1 (212) 555-0198"
            className="w-full bg-[#FAF8F5] border border-[#EAE4DC] p-3 text-xs sm:text-sm text-[#141312] focus:outline-none focus:border-[#141312]"
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="block text-xs uppercase tracking-wider font-medium text-[#141312]">
          Message <span className="text-[#8A2616]">*</span>
        </label>
        <textarea
          rows={4}
          value={formData.message}
          onChange={e => setFormData({ ...formData, message: e.target.value })}
          placeholder="How can our remodeling studio assist you?"
          className="w-full bg-[#FAF8F5] border border-[#EAE4DC] p-3 text-xs sm:text-sm text-[#141312] focus:outline-none focus:border-[#141312]"
          required
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-[#141312] text-white hover:bg-[#2C2825] py-3 text-xs uppercase tracking-widest font-medium transition-all disabled:opacity-50"
      >
        {loading ? 'Sending Message...' : 'Send Message'}
      </button>
    </form>
  );
};
