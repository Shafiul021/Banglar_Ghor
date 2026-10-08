import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { Service, Testimonial, FAQ, ServiceArea } from '../types';

// ==============================================================================
// 1. SERVICES CMS
// ==============================================================================
export const AdminServicesManager: React.FC = () => {
  const { services, saveService } = useData();
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [saving, setSaving] = useState(false);
  const [scopeText, setScopeText] = useState('');
  const [materialsText, setMaterialsText] = useState('');

  const openService = (s: Service) => {
    setSelectedService(s);
    setScopeText((s.typicalScope || []).join('\n'));
    setMaterialsText((s.materials || []).join('\n'));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedService) return;
    setSaving(true);
    const updated = {
      ...selectedService,
      typicalScope: scopeText.split('\n').map(l => l.trim()).filter(Boolean),
      materials: materialsText.split('\n').map(l => l.trim()).filter(Boolean)
    };
    await saveService(updated);
    setSaving(false);
    setSelectedService(null);
  };

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-[#EAE4DC]">
        <h2 className="text-xl font-serif text-[#141312]">Services Content Management</h2>
        <p className="text-xs text-[#7A746E]">Edit service descriptions, hero imagery, scopes, and materials.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map(s => (
          <div key={s.id} className="bg-white border border-[#EAE4DC] p-5 space-y-4 flex flex-col justify-between">
            <div className="space-y-2">
              <img src={s.heroImage} alt={s.name} className="w-full h-32 object-cover border border-[#EAE4DC]" />
              <h3 className="font-serif text-lg text-[#141312]">{s.name}</h3>
              <p className="text-xs text-[#5C5650] line-clamp-2">{s.shortDescription}</p>
            </div>
            <button
              onClick={() => openService(s)}
              className="w-full bg-[#FAF8F5] border border-[#D3C9BD] hover:bg-[#141312] hover:text-white py-2 text-xs uppercase tracking-wider font-medium transition-colors"
            >
              Edit Service Content
            </button>
          </div>
        ))}
      </div>

      {selectedService && (
        <div className="fixed inset-0 z-50 bg-black/60 p-4 sm:p-8 flex items-center justify-center overflow-y-auto">
          <div className="bg-white border border-[#EAE4DC] w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-[#EAE4DC]">
              <h3 className="font-serif text-xl">Edit: {selectedService.name}</h3>
              <button onClick={() => setSelectedService(null)} className="text-xs uppercase tracking-wider text-[#7A746E]">✕ Close</button>
            </div>
            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-semibold">Service Name</label>
                <input
                  type="text"
                  value={selectedService.name}
                  onChange={e => setSelectedService({ ...selectedService, name: e.target.value })}
                  className="w-full border p-2 bg-[#FAF8F5]"
                  required
                />
              </div>
              <div className="space-y-1">
                <label className="font-semibold">Tagline</label>
                <input
                  type="text"
                  value={selectedService.tagline || ''}
                  onChange={e => setSelectedService({ ...selectedService, tagline: e.target.value })}
                  className="w-full border p-2 bg-[#FAF8F5]"
                />
              </div>
              <div className="space-y-1">
                <label className="font-semibold">Hero Image URL</label>
                <input
                  type="text"
                  value={selectedService.heroImage}
                  onChange={e => setSelectedService({ ...selectedService, heroImage: e.target.value })}
                  className="w-full border p-2 bg-[#FAF8F5]"
                  required
                />
              </div>
              <div className="space-y-1">
                <label className="font-semibold">Short Description</label>
                <textarea
                  rows={2}
                  value={selectedService.shortDescription}
                  onChange={e => setSelectedService({ ...selectedService, shortDescription: e.target.value })}
                  className="w-full border p-2 bg-[#FAF8F5]"
                />
              </div>
              <div className="space-y-1">
                <label className="font-semibold">Full Description</label>
                <textarea
                  rows={4}
                  value={selectedService.fullDescription}
                  onChange={e => setSelectedService({ ...selectedService, fullDescription: e.target.value })}
                  className="w-full border p-2 bg-[#FAF8F5]"
                />
              </div>
              <div className="space-y-1">
                <label className="font-semibold">Typical Scope (One line per item)</label>
                <textarea
                  rows={4}
                  value={scopeText}
                  onChange={e => setScopeText(e.target.value)}
                  className="w-full border p-2 bg-[#FAF8F5] font-mono"
                />
              </div>
              <div className="space-y-1">
                <label className="font-semibold">Materials (One line per item)</label>
                <textarea
                  rows={3}
                  value={materialsText}
                  onChange={e => setMaterialsText(e.target.value)}
                  className="w-full border p-2 bg-[#FAF8F5] font-mono"
                />
              </div>
              <div className="flex justify-end gap-3 pt-3 border-t">
                <button type="button" onClick={() => setSelectedService(null)} className="px-4 py-2 border">Cancel</button>
                <button type="submit" disabled={saving} className="px-6 py-2 bg-[#141312] text-white font-medium">
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

// ==============================================================================
// 2. HOMEPAGE EDITOR
// ==============================================================================
export const AdminHomepageManager: React.FC = () => {
  const { homepageConfig, saveHomepageConfig } = useData();
  const [formData, setFormData] = useState(homepageConfig || {} as any);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await saveHomepageConfig(formData);
    setSaving(false);
    setMsg('Homepage configuration updated successfully!');
    setTimeout(() => setMsg(''), 4000);
  };

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-[#EAE4DC]">
        <h2 className="text-xl font-serif text-[#141312]">Homepage Content CMS</h2>
        <p className="text-xs text-[#7A746E]">Edit hero text, image, atelier intro statement, and final call-to-action.</p>
      </div>

      {msg && <div className="p-3 bg-[#EBF7EE] text-[#1E7E34] text-xs font-semibold">{msg}</div>}

      <form onSubmit={handleSubmit} className="bg-white border border-[#EAE4DC] p-6 sm:p-8 space-y-5 text-xs">
        <div className="space-y-4">
          <h3 className="font-serif text-base text-[#141312] pb-1 border-b">Hero Section</h3>
          <div className="space-y-1">
            <label className="font-semibold">Eyebrow Text</label>
            <input
              type="text"
              value={formData.heroEyebrow || ''}
              onChange={e => setFormData({ ...formData, heroEyebrow: e.target.value })}
              className="w-full border p-2 bg-[#FAF8F5]"
            />
          </div>
          <div className="space-y-1">
            <label className="font-semibold">Main Heading</label>
            <input
              type="text"
              value={formData.heroHeading || ''}
              onChange={e => setFormData({ ...formData, heroHeading: e.target.value })}
              className="w-full border p-2 bg-[#FAF8F5]"
            />
          </div>
          <div className="space-y-1">
            <label className="font-semibold">Hero Supporting Text</label>
            <textarea
              rows={3}
              value={formData.heroSupportingText || ''}
              onChange={e => setFormData({ ...formData, heroSupportingText: e.target.value })}
              className="w-full border p-2 bg-[#FAF8F5]"
            />
          </div>
          <div className="space-y-1">
            <label className="font-semibold">Hero Background Image URL</label>
            <input
              type="text"
              value={formData.heroImage || ''}
              onChange={e => setFormData({ ...formData, heroImage: e.target.value })}
              className="w-full border p-2 bg-[#FAF8F5]"
            />
          </div>
        </div>

        <div className="space-y-4 pt-4 border-t">
          <h3 className="font-serif text-base text-[#141312] pb-1 border-b">Introduction / Atelier Statement</h3>
          <div className="space-y-1">
            <label className="font-semibold">Intro Heading</label>
            <input
              type="text"
              value={formData.introHeading || ''}
              onChange={e => setFormData({ ...formData, introHeading: e.target.value })}
              className="w-full border p-2 bg-[#FAF8F5]"
            />
          </div>
          <div className="space-y-1">
            <label className="font-semibold">Intro Narrative</label>
            <textarea
              rows={3}
              value={formData.introText || ''}
              onChange={e => setFormData({ ...formData, introText: e.target.value })}
              className="w-full border p-2 bg-[#FAF8F5]"
            />
          </div>
        </div>

        <div className="space-y-4 pt-4 border-t">
          <h3 className="font-serif text-base text-[#141312] pb-1 border-b">Final Call to Action</h3>
          <div className="space-y-1">
            <label className="font-semibold">CTA Heading</label>
            <input
              type="text"
              value={formData.finalCtaHeading || ''}
              onChange={e => setFormData({ ...formData, finalCtaHeading: e.target.value })}
              className="w-full border p-2 bg-[#FAF8F5]"
            />
          </div>
          <div className="space-y-1">
            <label className="font-semibold">CTA Text</label>
            <textarea
              rows={2}
              value={formData.finalCtaText || ''}
              onChange={e => setFormData({ ...formData, finalCtaText: e.target.value })}
              className="w-full border p-2 bg-[#FAF8F5]"
            />
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t">
          <button type="submit" disabled={saving} className="bg-[#141312] text-white px-6 py-2.5 font-medium uppercase tracking-wider">
            {saving ? 'Saving...' : 'Save Homepage Content'}
          </button>
        </div>
      </form>
    </div>
  );
};

// ==============================================================================
// 3. TESTIMONIALS MANAGER
// ==============================================================================
export const AdminTestimonialsManager: React.FC = () => {
  const { testimonials, saveTestimonial, deleteTestimonial } = useData();
  const [editing, setEditing] = useState<Partial<Testimonial> | null>(null);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing) return;
    await saveTestimonial(editing);
    setEditing(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center pb-4 border-b border-[#EAE4DC]">
        <div>
          <h2 className="text-xl font-serif text-[#141312]">Reviews & Testimonials</h2>
          <p className="text-xs text-[#7A746E]">Manage homeowner reviews, ratings, and featured display states.</p>
        </div>
        <button
          onClick={() => setEditing({ name: '', location: 'Manhattan, NY', projectType: 'Kitchen Remodeling', rating: 5, quote: '', featured: true, published: true, sortOrder: testimonials.length + 1 })}
          className="bg-[#141312] text-white px-4 py-2 text-xs font-medium uppercase tracking-wider"
        >
          + Add Review
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map(t => (
          <div key={t.id} className="bg-white border border-[#EAE4DC] p-5 space-y-3 text-xs flex flex-col justify-between">
            <div className="space-y-2">
              <div className="font-semibold text-sm text-[#141312]">{t.name}</div>
              <div className="text-[11px] text-[#7A746E]">{t.location} · {t.projectType} · {t.rating}★</div>
              <p className="italic text-[#5C5650] line-clamp-3">“{t.quote}”</p>
            </div>
            <div className="flex justify-between pt-3 border-t">
              <span className={`text-[10px] uppercase font-semibold ${t.published ? 'text-[#1E7E34]' : 'text-[#8A2616]'}`}>
                {t.published ? 'Published' : 'Draft'}
              </span>
              <div className="space-x-2">
                <button onClick={() => setEditing(t)} className="underline hover:text-[#B39366]">Edit</button>
                <button onClick={() => deleteTestimonial(t.id)} className="text-[#8A2616] hover:underline">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {editing && (
        <div className="fixed inset-0 z-50 bg-black/60 p-4 flex items-center justify-center">
          <div className="bg-white border p-6 w-full max-w-lg space-y-4 text-xs">
            <h3 className="font-serif text-lg">{editing.id ? 'Edit Testimonial' : 'New Testimonial'}</h3>
            <form onSubmit={handleSave} className="space-y-3">
              <div>
                <label className="font-semibold block mb-1">Client Name</label>
                <input type="text" required value={editing.name || ''} onChange={e => setEditing({ ...editing, name: e.target.value })} className="w-full border p-2 bg-[#FAF8F5]" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold block mb-1">Location</label>
                  <input type="text" value={editing.location || ''} onChange={e => setEditing({ ...editing, location: e.target.value })} className="w-full border p-2 bg-[#FAF8F5]" />
                </div>
                <div>
                  <label className="font-semibold block mb-1">Project Type</label>
                  <input type="text" value={editing.projectType || ''} onChange={e => setEditing({ ...editing, projectType: e.target.value })} className="w-full border p-2 bg-[#FAF8F5]" />
                </div>
              </div>
              <div>
                <label className="font-semibold block mb-1">Rating (1 to 5)</label>
                <input type="number" min="1" max="5" value={editing.rating || 5} onChange={e => setEditing({ ...editing, rating: Number(e.target.value) })} className="w-full border p-2 bg-[#FAF8F5]" />
              </div>
              <div>
                <label className="font-semibold block mb-1">Quote</label>
                <textarea rows={3} required value={editing.quote || ''} onChange={e => setEditing({ ...editing, quote: e.target.value })} className="w-full border p-2 bg-[#FAF8F5]" />
              </div>
              <div className="flex gap-4">
                <label className="flex items-center gap-1.5"><input type="checkbox" checked={editing.published ?? true} onChange={e => setEditing({ ...editing, published: e.target.checked })} /> Published</label>
                <label className="flex items-center gap-1.5"><input type="checkbox" checked={editing.featured ?? false} onChange={e => setEditing({ ...editing, featured: e.target.checked })} /> Featured</label>
              </div>
              <div className="flex justify-end gap-2 pt-2 border-t">
                <button type="button" onClick={() => setEditing(null)} className="px-3 py-1.5 border">Cancel</button>
                <button type="submit" className="px-4 py-1.5 bg-[#141312] text-white">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

// ==============================================================================
// 4. FAQS MANAGER
// ==============================================================================
export const AdminFaqsManager: React.FC = () => {
  const { faqs, saveFaq, deleteFaq } = useData();
  const [editing, setEditing] = useState<Partial<FAQ> | null>(null);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing) return;
    await saveFaq(editing);
    setEditing(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center pb-4 border-b border-[#EAE4DC]">
        <div>
          <h2 className="text-xl font-serif text-[#141312]">FAQ Knowledge Base</h2>
          <p className="text-xs text-[#7A746E]">Manage public questions across permitting, design, and financing.</p>
        </div>
        <button
          onClick={() => setEditing({ question: '', answer: '', category: 'General', published: true, sortOrder: faqs.length + 1 })}
          className="bg-[#141312] text-white px-4 py-2 text-xs font-medium uppercase tracking-wider"
        >
          + Add FAQ
        </button>
      </div>

      <div className="bg-white border divide-y text-xs">
        {faqs.map(f => (
          <div key={f.id} className="p-4 flex items-start justify-between gap-4">
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-bold text-[#B39366]">{f.category}</span>
              <div className="font-semibold text-sm text-[#141312]">{f.question}</div>
              <p className="text-[#5C5650] line-clamp-2">{f.answer}</p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <button onClick={() => setEditing(f)} className="underline">Edit</button>
              <button onClick={() => deleteFaq(f.id)} className="text-[#8A2616] hover:underline">Delete</button>
            </div>
          </div>
        ))}
      </div>

      {editing && (
        <div className="fixed inset-0 z-50 bg-black/60 p-4 flex items-center justify-center">
          <div className="bg-white border p-6 w-full max-w-lg space-y-4 text-xs">
            <h3 className="font-serif text-lg">{editing.id ? 'Edit FAQ' : 'New FAQ'}</h3>
            <form onSubmit={handleSave} className="space-y-3">
              <div>
                <label className="font-semibold block mb-1">Category</label>
                <select value={editing.category || 'General'} onChange={e => setEditing({ ...editing, category: e.target.value as any })} className="w-full border p-2 bg-[#FAF8F5]">
                  <option value="General">General</option>
                  <option value="Process">Process</option>
                  <option value="Pricing">Pricing</option>
                  <option value="Design">Design</option>
                  <option value="Construction">Construction</option>
                  <option value="Timeline">Timeline</option>
                  <option value="Financing">Financing</option>
                </select>
              </div>
              <div>
                <label className="font-semibold block mb-1">Question</label>
                <input type="text" required value={editing.question || ''} onChange={e => setEditing({ ...editing, question: e.target.value })} className="w-full border p-2 bg-[#FAF8F5]" />
              </div>
              <div>
                <label className="font-semibold block mb-1">Answer</label>
                <textarea rows={4} required value={editing.answer || ''} onChange={e => setEditing({ ...editing, answer: e.target.value })} className="w-full border p-2 bg-[#FAF8F5]" />
              </div>
              <div className="flex justify-end gap-2 pt-2 border-t">
                <button type="button" onClick={() => setEditing(null)} className="px-3 py-1.5 border">Cancel</button>
                <button type="submit" className="px-4 py-1.5 bg-[#141312] text-white">Save FAQ</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

// ==============================================================================
// 5. COMPANY SETTINGS
// ==============================================================================
export const AdminSettingsManager: React.FC = () => {
  const { companySettings, saveCompanySettings } = useData();
  const [formData, setFormData] = useState(companySettings || {} as any);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await saveCompanySettings(formData);
    setSaving(false);
    setMsg('Company settings saved successfully!');
    setTimeout(() => setMsg(''), 4000);
  };

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-[#EAE4DC]">
        <h2 className="text-xl font-serif text-[#141312]">Centralized Company Settings</h2>
        <p className="text-xs text-[#7A746E]">Manage company profile, contact details, licenses, and insurance.</p>
      </div>

      {msg && <div className="p-3 bg-[#EBF7EE] text-[#1E7E34] text-xs font-semibold">{msg}</div>}

      <form onSubmit={handleSubmit} className="bg-white border border-[#EAE4DC] p-6 space-y-4 text-xs">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="font-semibold block mb-1">Company Name</label>
            <input type="text" value={formData.name || ''} onChange={e => setFormData({ ...formData, name: e.target.value })} className="w-full border p-2 bg-[#FAF8F5]" />
          </div>
          <div>
            <label className="font-semibold block mb-1">Tagline</label>
            <input type="text" value={formData.tagline || ''} onChange={e => setFormData({ ...formData, tagline: e.target.value })} className="w-full border p-2 bg-[#FAF8F5]" />
          </div>
          <div>
            <label className="font-semibold block mb-1">Telephone</label>
            <input type="text" value={formData.phone || ''} onChange={e => setFormData({ ...formData, phone: e.target.value })} className="w-full border p-2 bg-[#FAF8F5]" />
          </div>
          <div>
            <label className="font-semibold block mb-1">Email</label>
            <input type="email" value={formData.email || ''} onChange={e => setFormData({ ...formData, email: e.target.value })} className="w-full border p-2 bg-[#FAF8F5]" />
          </div>
          <div>
            <label className="font-semibold block mb-1">Studio Address</label>
            <input type="text" value={formData.address || ''} onChange={e => setFormData({ ...formData, address: e.target.value })} className="w-full border p-2 bg-[#FAF8F5]" />
          </div>
          <div>
            <label className="font-semibold block mb-1">Business Hours</label>
            <input type="text" value={formData.hours || ''} onChange={e => setFormData({ ...formData, hours: e.target.value })} className="w-full border p-2 bg-[#FAF8F5]" />
          </div>
        </div>

        <div>
          <label className="font-semibold block mb-1">License Information</label>
          <input type="text" value={formData.licenseInfo || ''} onChange={e => setFormData({ ...formData, licenseInfo: e.target.value })} className="w-full border p-2 bg-[#FAF8F5]" />
        </div>

        <div>
          <label className="font-semibold block mb-1">Insurance Policy Summary</label>
          <input type="text" value={formData.insuranceInfo || ''} onChange={e => setFormData({ ...formData, insuranceInfo: e.target.value })} className="w-full border p-2 bg-[#FAF8F5]" />
        </div>

        <div>
          <label className="font-semibold block mb-1">Footer Description</label>
          <textarea rows={2} value={formData.footerDescription || ''} onChange={e => setFormData({ ...formData, footerDescription: e.target.value })} className="w-full border p-2 bg-[#FAF8F5]" />
        </div>

        <div className="flex justify-end pt-3 border-t">
          <button type="submit" disabled={saving} className="bg-[#141312] text-white px-6 py-2 uppercase tracking-wider font-medium">
            {saving ? 'Saving...' : 'Save Company Settings'}
          </button>
        </div>
      </form>
    </div>
  );
};

// ==============================================================================
// 6. MEDIA LIBRARY & AUDIT LOG
// ==============================================================================
export const AdminMediaManager: React.FC = () => {
  const { adminMedia, uploadMedia, deleteMedia } = useData();
  const [newUrl, setNewUrl] = useState('');
  const [newName, setNewName] = useState('');
  const [copied, setCopied] = useState<string | null>(null);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUrl || !newName) return;
    await uploadMedia({ name: newName, url: newUrl, category: 'projects' });
    setNewUrl('');
    setNewName('');
  };

  const copyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopied(url);
    setTimeout(() => setCopied(null), 2500);
  };

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-[#EAE4DC]">
        <h2 className="text-xl font-serif text-[#141312]">Media Library</h2>
        <p className="text-xs text-[#7A746E]">Store and reference architectural photography assets for projects and pages.</p>
      </div>

      <form onSubmit={handleUpload} className="bg-white border p-4 flex flex-col sm:flex-row gap-3 text-xs">
        <input
          type="text"
          placeholder="Media Asset Name (e.g. Tribeca Marble Island)"
          value={newName}
          onChange={e => setNewName(e.target.value)}
          className="border p-2 flex-1"
          required
        />
        <input
          type="text"
          placeholder="Image URL (https://...)"
          value={newUrl}
          onChange={e => setNewUrl(e.target.value)}
          className="border p-2 flex-1"
          required
        />
        <button type="submit" className="bg-[#141312] text-white px-5 py-2 uppercase tracking-wider font-medium">
          + Add Image Asset
        </button>
      </form>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {adminMedia.map(m => (
          <div key={m.id} className="bg-white border p-3 space-y-2 text-xs">
            <img src={m.url} alt={m.name} className="w-full h-32 object-cover border" />
            <div className="font-semibold truncate">{m.name}</div>
            <div className="flex items-center justify-between pt-1">
              <button onClick={() => copyUrl(m.url)} className="text-[10px] text-[#B39366] hover:underline">
                {copied === m.url ? '✓ Copied' : 'Copy URL'}
              </button>
              <button onClick={() => deleteMedia(m.id)} className="text-[10px] text-[#8A2616] hover:underline">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const AdminAuditLogManager: React.FC = () => {
  const { adminAuditLogs } = useData();

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-[#EAE4DC]">
        <h2 className="text-xl font-serif text-[#141312]">System Audit Log</h2>
        <p className="text-xs text-[#7A746E]">Immutable record of administrative content changes, user updates, and lead status adjustments.</p>
      </div>

      <div className="bg-white border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#FAF8F5] border-b text-[#7A746E] uppercase">
                <th className="py-2.5 px-4">Timestamp</th>
                <th className="py-2.5 px-4">User</th>
                <th className="py-2.5 px-4">Action</th>
                <th className="py-2.5 px-4">Entity</th>
                <th className="py-2.5 px-4">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {adminAuditLogs.map(log => (
                <tr key={log.id} className="hover:bg-[#FAF8F5]/60">
                  <td className="py-2.5 px-4 font-mono text-[11px] text-[#7A746E]">
                    {new Date(log.timestamp).toLocaleString()}
                  </td>
                  <td className="py-2.5 px-4 font-medium">{log.userName}</td>
                  <td className="py-2.5 px-4 font-semibold text-[#141312]">{log.action}</td>
                  <td className="py-2.5 px-4 text-[#7A746E]">{log.entity}</td>
                  <td className="py-2.5 px-4 text-[#4A4642]">{log.details}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
