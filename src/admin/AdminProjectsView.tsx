import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { Project } from '../types';

export const AdminProjectsView: React.FC = () => {
  const { projects, saveProject, deleteProject } = useData();

  const [editingProject, setEditingProject] = useState<Partial<Project> | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);
  const [materialsText, setMaterialsText] = useState('');
  const [galleryText, setGalleryText] = useState('');

  const openNewProject = () => {
    setIsNew(true);
    setEditingProject({
      title: '',
      slug: '',
      location: 'Manhattan, NY',
      neighborhood: 'Chelsea',
      category: 'Kitchen Remodeling',
      shortDescription: '',
      fullDescription: '',
      designApproach: '',
      budgetMin: 95000,
      budgetMax: 150000,
      timeline: '12 weeks',
      propertyType: 'Co-op Apartment',
      yearCompleted: 2025,
      heroImage: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1600&q=85',
      beforeImage: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1600&q=80',
      afterImage: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1600&q=85',
      galleryImages: [],
      materials: [],
      featured: false,
      published: true,
      sortOrder: projects.length + 1
    });
    setMaterialsText('');
    setGalleryText('');
  };

  const openEditProject = (proj: Project) => {
    setIsNew(false);
    setEditingProject({ ...proj });
    setMaterialsText((proj.materials || []).join('\n'));
    setGalleryText((proj.galleryImages || []).join('\n'));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject || !editingProject.title) return;

    setSaving(true);
    const materials = materialsText.split('\n').map(s => s.trim()).filter(Boolean);
    const galleryImages = galleryText.split('\n').map(s => s.trim()).filter(Boolean);

    const payload = {
      ...editingProject,
      materials,
      galleryImages
    };

    const success = await saveProject(payload);
    setSaving(false);
    if (success) {
      setEditingProject(null);
    } else {
      alert('Failed to save project. Please check fields.');
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (confirm(`Are you sure you want to delete "${title}"? This cannot be undone.`)) {
      await deleteProject(id);
    }
  };

  const togglePublish = async (proj: Project) => {
    await saveProject({ ...proj, published: !proj.published });
  };

  const toggleFeatured = async (proj: Project) => {
    await saveProject({ ...proj, featured: !proj.featured });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#EAE4DC]">
        <div>
          <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-[#B39366] block">
            Portfolio CMS
          </span>
          <h1 className="text-2xl sm:text-3xl font-serif text-[#141312]">
            Project Management
          </h1>
          <p className="text-xs text-[#7A746E]">
            Create, edit, or publish residential case studies. Changes appear immediately on the public website.
          </p>
        </div>

        <button
          onClick={openNewProject}
          className="bg-[#141312] text-white hover:bg-[#2C2825] px-5 py-2.5 text-xs font-medium uppercase tracking-wider transition-colors shrink-0"
        >
          + Add New Project
        </button>
      </div>

      {/* Projects Table */}
      <div className="bg-white border border-[#EAE4DC] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#FAF8F5] border-b border-[#EAE4DC] text-[#7A746E] uppercase tracking-wider">
                <th className="py-3 px-6 font-medium">Image</th>
                <th className="py-3 px-6 font-medium">Title & Location</th>
                <th className="py-3 px-6 font-medium">Category</th>
                <th className="py-3 px-6 font-medium">Budget</th>
                <th className="py-3 px-6 font-medium">Featured</th>
                <th className="py-3 px-6 font-medium">Status</th>
                <th className="py-3 px-6 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EAE4DC]/80">
              {projects.map(proj => (
                <tr key={proj.id} className="hover:bg-[#FAF8F5]/60 transition-colors">
                  <td className="py-3 px-6">
                    <img
                      src={proj.heroImage}
                      alt={proj.title}
                      className="w-14 h-10 object-cover border border-[#EAE4DC]"
                    />
                  </td>
                  <td className="py-3 px-6">
                    <div className="font-semibold text-[#141312]">{proj.title}</div>
                    <div className="text-[11px] text-[#7A746E]">{proj.location} · /{proj.slug}</div>
                  </td>
                  <td className="py-3 px-6 text-[#141312]">{proj.category}</td>
                  <td className="py-3 px-6 text-[#141312]">
                    ${proj.budgetMin?.toLocaleString()} – ${proj.budgetMax?.toLocaleString()}
                  </td>
                  <td className="py-3 px-6">
                    <button
                      onClick={() => toggleFeatured(proj)}
                      className={`px-2 py-0.5 text-[10px] uppercase tracking-wider font-semibold ${
                        proj.featured ? 'bg-[#FAF8F5] text-[#B39366] border border-[#B39366]/40' : 'text-[#7A746E]'
                      }`}
                    >
                      {proj.featured ? '★ Featured' : 'Standard'}
                    </button>
                  </td>
                  <td className="py-3 px-6">
                    <button
                      onClick={() => togglePublish(proj)}
                      className={`px-2.5 py-1 text-[10px] uppercase tracking-wider font-semibold ${
                        proj.published ? 'bg-[#EBF7EE] text-[#1E7E34]' : 'bg-[#FBEBE8] text-[#8A2616]'
                      }`}
                    >
                      {proj.published ? 'Published' : 'Draft'}
                    </button>
                  </td>
                  <td className="py-3 px-6 text-right space-x-2">
                    <button
                      onClick={() => openEditProject(proj)}
                      className="text-xs uppercase tracking-wider text-[#141312] hover:text-[#B39366] font-medium underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(proj.id, proj.title)}
                      className="text-xs uppercase tracking-wider text-[#8A2616] hover:underline font-medium"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit / Create Modal */}
      {editingProject && (
        <div className="fixed inset-0 z-50 bg-black/60 p-4 sm:p-8 flex items-center justify-center overflow-y-auto">
          <div className="bg-white border border-[#EAE4DC] w-full max-w-4xl max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-[#EAE4DC]">
              <h2 className="text-xl font-serif text-[#141312]">
                {isNew ? 'Create New Project' : `Edit: ${editingProject.title}`}
              </h2>
              <button
                onClick={() => setEditingProject(null)}
                className="text-sm uppercase tracking-wider text-[#7A746E] hover:text-[#141312]"
              >
                ✕ Close
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-5 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-semibold text-[#141312]">Project Title *</label>
                  <input
                    type="text"
                    required
                    value={editingProject.title || ''}
                    onChange={e => setEditingProject({ ...editingProject, title: e.target.value })}
                    className="w-full border border-[#D3C9BD] p-2 bg-[#FAF8F5]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-[#141312]">URL Slug (leave blank to auto-generate)</label>
                  <input
                    type="text"
                    value={editingProject.slug || ''}
                    onChange={e => setEditingProject({ ...editingProject, slug: e.target.value })}
                    className="w-full border border-[#D3C9BD] p-2 bg-[#FAF8F5]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-[#141312]">Location / Borough</label>
                  <input
                    type="text"
                    value={editingProject.location || ''}
                    onChange={e => setEditingProject({ ...editingProject, location: e.target.value })}
                    className="w-full border border-[#D3C9BD] p-2 bg-[#FAF8F5]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-[#141312]">Category</label>
                  <select
                    value={editingProject.category || 'Kitchen Remodeling'}
                    onChange={e => setEditingProject({ ...editingProject, category: e.target.value as any })}
                    className="w-full border border-[#D3C9BD] p-2 bg-[#FAF8F5]"
                  >
                    <option value="Kitchen Remodeling">Kitchen Remodeling</option>
                    <option value="Bathroom Remodeling">Bathroom Remodeling</option>
                    <option value="Whole-Home Renovation">Whole-Home Renovation</option>
                    <option value="Basement Finishing">Basement Finishing</option>
                    <option value="Home Addition">Home Addition</option>
                    <option value="Custom Renovation">Custom Renovation</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-[#141312]">Property Type</label>
                  <input
                    type="text"
                    value={editingProject.propertyType || ''}
                    onChange={e => setEditingProject({ ...editingProject, propertyType: e.target.value })}
                    className="w-full border border-[#D3C9BD] p-2 bg-[#FAF8F5]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-[#141312]">Timeline Duration</label>
                  <input
                    type="text"
                    value={editingProject.timeline || ''}
                    onChange={e => setEditingProject({ ...editingProject, timeline: e.target.value })}
                    className="w-full border border-[#D3C9BD] p-2 bg-[#FAF8F5]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-[#141312]">Budget Min ($)</label>
                  <input
                    type="number"
                    value={editingProject.budgetMin || 0}
                    onChange={e => setEditingProject({ ...editingProject, budgetMin: Number(e.target.value) })}
                    className="w-full border border-[#D3C9BD] p-2 bg-[#FAF8F5]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-[#141312]">Budget Max ($)</label>
                  <input
                    type="number"
                    value={editingProject.budgetMax || 0}
                    onChange={e => setEditingProject({ ...editingProject, budgetMax: Number(e.target.value) })}
                    className="w-full border border-[#D3C9BD] p-2 bg-[#FAF8F5]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-[#141312]">Short Description</label>
                <textarea
                  rows={2}
                  value={editingProject.shortDescription || ''}
                  onChange={e => setEditingProject({ ...editingProject, shortDescription: e.target.value })}
                  className="w-full border border-[#D3C9BD] p-2 bg-[#FAF8F5]"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-[#141312]">Full Architectural Case Narrative</label>
                <textarea
                  rows={4}
                  value={editingProject.fullDescription || ''}
                  onChange={e => setEditingProject({ ...editingProject, fullDescription: e.target.value })}
                  className="w-full border border-[#D3C9BD] p-2 bg-[#FAF8F5]"
                />
              </div>

              {/* Imagery Links */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="font-semibold text-[#141312]">Hero Image URL *</label>
                  <input
                    type="text"
                    required
                    value={editingProject.heroImage || ''}
                    onChange={e => setEditingProject({ ...editingProject, heroImage: e.target.value })}
                    className="w-full border border-[#D3C9BD] p-2 bg-[#FAF8F5]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-[#141312]">Before Image URL</label>
                  <input
                    type="text"
                    value={editingProject.beforeImage || ''}
                    onChange={e => setEditingProject({ ...editingProject, beforeImage: e.target.value })}
                    className="w-full border border-[#D3C9BD] p-2 bg-[#FAF8F5]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-[#141312]">After Image URL</label>
                  <input
                    type="text"
                    value={editingProject.afterImage || ''}
                    onChange={e => setEditingProject({ ...editingProject, afterImage: e.target.value })}
                    className="w-full border border-[#D3C9BD] p-2 bg-[#FAF8F5]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-semibold text-[#141312]">Specified Materials (One per line)</label>
                  <textarea
                    rows={4}
                    value={materialsText}
                    onChange={e => setMaterialsText(e.target.value)}
                    placeholder="Calacatta Vagli Marble&#10;Rift-sawn white oak&#10;Waterworks brass"
                    className="w-full border border-[#D3C9BD] p-2 bg-[#FAF8F5] font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-[#141312]">Additional Gallery Image URLs (One per line)</label>
                  <textarea
                    rows={4}
                    value={galleryText}
                    onChange={e => setGalleryText(e.target.value)}
                    placeholder="https://...&#10;https://..."
                    className="w-full border border-[#D3C9BD] p-2 bg-[#FAF8F5] font-mono"
                  />
                </div>
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingProject.published ?? true}
                    onChange={e => setEditingProject({ ...editingProject, published: e.target.checked })}
                    className="accent-[#141312]"
                  />
                  <span className="font-semibold text-[#141312]">Published Live</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingProject.featured ?? false}
                    onChange={e => setEditingProject({ ...editingProject, featured: e.target.checked })}
                    className="accent-[#141312]"
                  />
                  <span className="font-semibold text-[#141312]">Featured on Homepage</span>
                </label>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-[#EAE4DC]">
                <button
                  type="button"
                  onClick={() => setEditingProject(null)}
                  className="px-4 py-2 border border-[#D3C9BD] text-[#141312] uppercase tracking-wider"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="bg-[#141312] text-white px-6 py-2 uppercase tracking-wider font-medium hover:bg-[#2C2825]"
                >
                  {saving ? 'Saving...' : 'Save & Publish Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
