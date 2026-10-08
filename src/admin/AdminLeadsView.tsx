import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { ConsultationRequest, LeadStatus } from '../types';

export const AdminLeadsView: React.FC = () => {
  const { adminLeads, updateLead, deleteLead } = useData();

  const [selectedLead, setSelectedLead] = useState<ConsultationRequest | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [notesText, setNotesText] = useState('');
  const [savingNotes, setSavingNotes] = useState(false);

  const statuses: LeadStatus[] = [
    'New',
    'Contacted',
    'Qualified',
    'Consultation Scheduled',
    'Proposal Sent',
    'Won',
    'Lost',
    'Archived'
  ];

  const filteredLeads = adminLeads.filter(lead => {
    if (filterStatus === 'All') return true;
    return lead.status === filterStatus;
  });

  const openLeadDetails = (lead: ConsultationRequest) => {
    setSelectedLead(lead);
    setNotesText(lead.internalNotes || '');
  };

  const handleSaveNotes = async () => {
    if (!selectedLead) return;
    setSavingNotes(true);
    await updateLead(selectedLead.id, { internalNotes: notesText });
    setSavingNotes(false);
    setSelectedLead({ ...selectedLead, internalNotes: notesText });
  };

  const handleStatusChange = async (leadId: string, newStatus: LeadStatus) => {
    await updateLead(leadId, { status: newStatus });
    if (selectedLead && selectedLead.id === leadId) {
      setSelectedLead({ ...selectedLead, status: newStatus });
    }
  };

  const handleDelete = async (leadId: string) => {
    if (confirm('Delete this lead record permanently?')) {
      await deleteLead(leadId);
      if (selectedLead?.id === leadId) setSelectedLead(null);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#EAE4DC]">
        <div>
          <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-[#B39366] block">
            Client Acquisition
          </span>
          <h1 className="text-2xl sm:text-3xl font-serif text-[#141312]">
            Consultation Requests & Pipeline
          </h1>
          <p className="text-xs text-[#7A746E]">
            Track luxury renovation inquiries through qualification, site visits, and proposal delivery.
          </p>
        </div>

        {/* Filter by Status */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-[#7A746E]">Status Filter:</span>
          <select
            value={filterStatus}
            onChange={e => setFilterStatus(e.target.value)}
            className="bg-white border border-[#D3C9BD] text-xs py-1.5 px-3 focus:outline-none"
          >
            <option value="All">All Leads ({adminLeads.length})</option>
            {statuses.map(s => (
              <option key={s} value={s}>
                {s} ({adminLeads.filter(l => l.status === s).length})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Leads Table */}
      <div className="bg-white border border-[#EAE4DC] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#FAF8F5] border-b border-[#EAE4DC] text-[#7A746E] uppercase tracking-wider">
                <th className="py-3 px-6 font-medium">Homeowner</th>
                <th className="py-3 px-6 font-medium">Project Scope</th>
                <th className="py-3 px-6 font-medium">Property & ZIP</th>
                <th className="py-3 px-6 font-medium">Budget</th>
                <th className="py-3 px-6 font-medium">Timeline</th>
                <th className="py-3 px-6 font-medium">Pipeline Status</th>
                <th className="py-3 px-6 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EAE4DC]/80">
              {filteredLeads.map(lead => (
                <tr key={lead.id} className="hover:bg-[#FAF8F5]/60 transition-colors">
                  <td className="py-3.5 px-6">
                    <div className="font-semibold text-[#141312]">{lead.fullName}</div>
                    <div className="text-[11px] text-[#7A746E]">{lead.email}</div>
                    <div className="text-[11px] text-[#7A746E]">{lead.phone}</div>
                  </td>
                  <td className="py-3.5 px-6">
                    <div className="font-medium text-[#141312]">{lead.projectType}</div>
                    <div className="text-[11px] text-[#7A746E] line-clamp-1 max-w-xs">{lead.projectDetails}</div>
                  </td>
                  <td className="py-3.5 px-6">
                    <div className="text-[#141312]">{lead.propertyType}</div>
                    <div className="text-[11px] text-[#7A746E]">{lead.zipCode} {lead.address ? `· ${lead.address}` : ''}</div>
                  </td>
                  <td className="py-3.5 px-6 font-medium text-[#141312]">{lead.estimatedBudget}</td>
                  <td className="py-3.5 px-6 text-[#141312]">{lead.preferredTimeline}</td>
                  <td className="py-3.5 px-6">
                    <select
                      value={lead.status}
                      onChange={e => handleStatusChange(lead.id, e.target.value as LeadStatus)}
                      className="bg-[#FAF8F5] border border-[#D3C9BD] text-xs py-1 px-2 focus:outline-none"
                    >
                      {statuses.map(st => (
                        <option key={st} value={st}>{st}</option>
                      ))}
                    </select>
                  </td>
                  <td className="py-3.5 px-6 text-right space-x-2">
                    <button
                      onClick={() => openLeadDetails(lead)}
                      className="text-xs uppercase tracking-wider text-[#141312] hover:text-[#B39366] font-medium underline"
                    >
                      Review
                    </button>
                    <button
                      onClick={() => handleDelete(lead.id)}
                      className="text-xs uppercase tracking-wider text-[#8A2616] hover:underline"
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

      {/* Lead Detail & Internal Notes Drawer/Modal */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 bg-black/60 p-4 sm:p-8 flex items-center justify-center overflow-y-auto">
          <div className="bg-white border border-[#EAE4DC] w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-[#EAE4DC]">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#B39366] block">
                  Lead Details · {selectedLead.id}
                </span>
                <h2 className="text-xl font-serif text-[#141312]">
                  {selectedLead.fullName}
                </h2>
              </div>
              <button
                onClick={() => setSelectedLead(null)}
                className="text-sm uppercase tracking-wider text-[#7A746E] hover:text-[#141312]"
              >
                ✕ Close
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs bg-[#FAF8F5] p-4 border border-[#EAE4DC]">
              <div>
                <span className="text-[#8A8177] block text-[10px] uppercase">Email</span>
                <a href={`mailto:${selectedLead.email}`} className="text-[#141312] underline font-medium">
                  {selectedLead.email}
                </a>
              </div>
              <div>
                <span className="text-[#8A8177] block text-[10px] uppercase">Phone</span>
                <a href={`tel:${selectedLead.phone}`} className="text-[#141312] underline font-medium">
                  {selectedLead.phone}
                </a>
              </div>
              <div>
                <span className="text-[#8A8177] block text-[10px] uppercase">Preferred Contact</span>
                <span className="text-[#141312] capitalize">{selectedLead.preferredContactMethod || 'Email'}</span>
              </div>
              <div>
                <span className="text-[#8A8177] block text-[10px] uppercase">ZIP Code / Address</span>
                <span className="text-[#141312]">{selectedLead.zipCode} {selectedLead.address && `(${selectedLead.address})`}</span>
              </div>
              <div>
                <span className="text-[#8A8177] block text-[10px] uppercase">Project Type</span>
                <span className="text-[#141312] font-semibold">{selectedLead.projectType}</span>
              </div>
              <div>
                <span className="text-[#8A8177] block text-[10px] uppercase">Property Type</span>
                <span className="text-[#141312]">{selectedLead.propertyType}</span>
              </div>
              <div>
                <span className="text-[#8A8177] block text-[10px] uppercase">Budget Range</span>
                <span className="text-[#141312] font-semibold">{selectedLead.estimatedBudget}</span>
              </div>
              <div>
                <span className="text-[#8A8177] block text-[10px] uppercase">Timeline</span>
                <span className="text-[#141312]">{selectedLead.preferredTimeline}</span>
              </div>
            </div>

            <div className="space-y-1.5 text-xs">
              <label className="font-semibold text-[#141312] uppercase tracking-wider text-[10px]">
                Homeowner Project Scope / Vision
              </label>
              <div className="p-4 bg-[#FAF8F5] border border-[#EAE4DC] text-xs leading-relaxed text-[#4A4642]">
                {selectedLead.projectDetails}
              </div>
            </div>

            {/* Internal Notes Editor */}
            <div className="space-y-2 text-xs">
              <label className="font-semibold text-[#141312] uppercase tracking-wider text-[10px]">
                Internal Studio Notes & Log
              </label>
              <textarea
                rows={4}
                value={notesText}
                onChange={e => setNotesText(e.target.value)}
                placeholder="Log notes from calls, alteration agreement reviews, superintendent site visits..."
                className="w-full border border-[#D3C9BD] p-3 bg-[#FAF8F5]"
              />
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleSaveNotes}
                  disabled={savingNotes}
                  className="bg-[#141312] text-white px-4 py-1.5 text-xs uppercase tracking-wider font-medium"
                >
                  {savingNotes ? 'Saving...' : 'Save Internal Notes'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
