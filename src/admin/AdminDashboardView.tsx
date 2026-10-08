import React from 'react';
import { useData } from '../context/DataContext';
import { AdminTab } from './AdminLayout';

interface AdminDashboardViewProps {
  onNavigateTab: (tab: AdminTab) => void;
}

export const AdminDashboardView: React.FC<AdminDashboardViewProps> = ({ onNavigateTab }) => {
  const { projects, services, testimonials, faqs, adminLeads, adminMessages, updateLead, updateMessage } = useData();

  const totalProjects = projects.length;
  const publishedProjects = projects.filter(p => p.published).length;
  const totalLeads = adminLeads.length;
  const newLeads = adminLeads.filter(l => l.status === 'New').length;
  const newMessages = adminMessages.filter(m => m.status === 'New').length;

  return (
    <div className="space-y-10">
      {/* Page Title & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#EAE4DC]">
        <div>
          <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-[#B39366] block">
            Executive Overview
          </span>
          <h1 className="text-2xl sm:text-3xl font-serif text-[#141312]">
            Studio Operations Dashboard
          </h1>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => onNavigateTab('projects')}
            className="bg-[#141312] text-white hover:bg-[#2C2825] px-4 py-2 text-xs font-medium uppercase tracking-wider transition-colors"
          >
            + Add Project
          </button>
          <button
            onClick={() => onNavigateTab('leads')}
            className="bg-white border border-[#EAE4DC] text-[#141312] hover:bg-[#FAF8F5] px-4 py-2 text-xs font-medium uppercase tracking-wider transition-colors"
          >
            View Leads ({newLeads} New)
          </button>
        </div>
      </div>

      {/* Metrics Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        <div
          onClick={() => onNavigateTab('projects')}
          className="cursor-pointer bg-white border border-[#EAE4DC] p-5 sm:p-6 space-y-1 hover:border-[#141312] transition-colors"
        >
          <div className="text-[11px] uppercase tracking-wider text-[#8A8177]">Projects</div>
          <div className="text-2xl sm:text-3xl font-serif text-[#141312] font-semibold">{totalProjects}</div>
          <div className="text-[11px] text-[#7A746E]">{publishedProjects} published live</div>
        </div>

        <div
          onClick={() => onNavigateTab('leads')}
          className="cursor-pointer bg-white border border-[#EAE4DC] p-5 sm:p-6 space-y-1 hover:border-[#141312] transition-colors"
        >
          <div className="text-[11px] uppercase tracking-wider text-[#8A8177]">Consultation Leads</div>
          <div className="text-2xl sm:text-3xl font-serif text-[#141312] font-semibold">{totalLeads}</div>
          <div className="text-[11px] text-[#B39366] font-medium">{newLeads} require follow-up</div>
        </div>

        <div
          onClick={() => onNavigateTab('messages')}
          className="cursor-pointer bg-white border border-[#EAE4DC] p-5 sm:p-6 space-y-1 hover:border-[#141312] transition-colors"
        >
          <div className="text-[11px] uppercase tracking-wider text-[#8A8177]">Inquiries</div>
          <div className="text-2xl sm:text-3xl font-serif text-[#141312] font-semibold">{adminMessages.length}</div>
          <div className="text-[11px] text-[#7A746E]">{newMessages} unread messages</div>
        </div>

        <div
          onClick={() => onNavigateTab('services')}
          className="cursor-pointer bg-white border border-[#EAE4DC] p-5 sm:p-6 space-y-1 hover:border-[#141312] transition-colors"
        >
          <div className="text-[11px] uppercase tracking-wider text-[#8A8177]">Active Services</div>
          <div className="text-2xl sm:text-3xl font-serif text-[#141312] font-semibold">{services.length}</div>
          <div className="text-[11px] text-[#7A746E]">{testimonials.length} reviews · {faqs.length} FAQs</div>
        </div>
      </div>

      {/* Recent Consultation Leads Table */}
      <div className="bg-white border border-[#EAE4DC] overflow-hidden space-y-4">
        <div className="p-6 pb-2 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-serif text-[#141312]">Recent Consultation Requests</h2>
            <p className="text-xs text-[#7A746E]">Real-time leads submitted via public quote forms.</p>
          </div>
          <button
            onClick={() => onNavigateTab('leads')}
            className="text-xs uppercase tracking-wider text-[#B39366] font-medium hover:underline"
          >
            Manage All Leads →
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#FAF8F5] border-y border-[#EAE4DC] text-[#7A746E] uppercase tracking-wider">
                <th className="py-3 px-6 font-medium">Client</th>
                <th className="py-3 px-6 font-medium">Project</th>
                <th className="py-3 px-6 font-medium">Budget</th>
                <th className="py-3 px-6 font-medium">Timeline</th>
                <th className="py-3 px-6 font-medium">Status</th>
                <th className="py-3 px-6 font-medium text-right">Quick Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EAE4DC]/80">
              {adminLeads.slice(0, 5).map(lead => (
                <tr key={lead.id} className="hover:bg-[#FAF8F5]/60 transition-colors">
                  <td className="py-3.5 px-6">
                    <div className="font-medium text-[#141312]">{lead.fullName}</div>
                    <div className="text-[#7A746E] text-[11px]">{lead.email} · {lead.phone}</div>
                  </td>
                  <td className="py-3.5 px-6">
                    <div className="text-[#141312]">{lead.projectType}</div>
                    <div className="text-[#7A746E] text-[11px]">{lead.propertyType} ({lead.zipCode})</div>
                  </td>
                  <td className="py-3.5 px-6 text-[#141312]">{lead.estimatedBudget}</td>
                  <td className="py-3.5 px-6 text-[#141312]">{lead.preferredTimeline}</td>
                  <td className="py-3.5 px-6">
                    <select
                      value={lead.status}
                      onChange={e => updateLead(lead.id, { status: e.target.value as any })}
                      className="bg-[#FAF8F5] border border-[#D3C9BD] text-xs py-1 px-2 focus:outline-none"
                    >
                      <option value="New">New</option>
                      <option value="Contacted">Contacted</option>
                      <option value="Qualified">Qualified</option>
                      <option value="Consultation Scheduled">Consultation Scheduled</option>
                      <option value="Proposal Sent">Proposal Sent</option>
                      <option value="Won">Won</option>
                      <option value="Lost">Lost</option>
                      <option value="Archived">Archived</option>
                    </select>
                  </td>
                  <td className="py-3.5 px-6 text-right">
                    <button
                      onClick={() => onNavigateTab('leads')}
                      className="text-xs uppercase tracking-wider text-[#141312] hover:text-[#B39366] font-medium underline"
                    >
                      Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Contact Messages */}
      <div className="bg-white border border-[#EAE4DC] p-6 space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-[#EAE4DC]">
          <div>
            <h2 className="text-lg font-serif text-[#141312]">Recent Inquiries</h2>
            <p className="text-xs text-[#7A746E]">Messages submitted through the studio contact page.</p>
          </div>
          <button
            onClick={() => onNavigateTab('messages')}
            className="text-xs uppercase tracking-wider text-[#B39366] font-medium hover:underline"
          >
            All Messages →
          </button>
        </div>

        <div className="space-y-3">
          {adminMessages.slice(0, 3).map(msg => (
            <div
              key={msg.id}
              className="p-4 bg-[#FAF8F5] border border-[#EAE4DC] flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-xs text-[#141312]">{msg.name}</span>
                  <span className="text-[11px] text-[#7A746E]">({msg.email} · {msg.phone})</span>
                </div>
                <p className="text-xs text-[#4A4642] line-clamp-2">{msg.message}</p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <select
                  value={msg.status}
                  onChange={e => updateMessage(msg.id, { status: e.target.value as any })}
                  className="bg-white border border-[#D3C9BD] text-xs py-1 px-2 focus:outline-none"
                >
                  <option value="New">New</option>
                  <option value="Read">Read</option>
                  <option value="Responded">Responded</option>
                  <option value="Archived">Archived</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
