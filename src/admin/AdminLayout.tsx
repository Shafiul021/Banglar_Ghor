import React, { useState } from 'react';
import { useData } from '../context/DataContext';

export type AdminTab = 
  | 'dashboard'
  | 'projects'
  | 'services'
  | 'homepage'
  | 'leads'
  | 'messages'
  | 'testimonials'
  | 'faqs'
  | 'service-areas'
  | 'settings'
  | 'financing'
  | 'media'
  | 'audit-log'
  | 'users';

interface AdminLayoutProps {
  currentTab: AdminTab;
  onTabChange: (tab: AdminTab) => void;
  onNavigateHome: () => void;
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  currentTab,
  onTabChange,
  onNavigateHome,
  children
}) => {
  const { adminUser, logoutAdmin, adminLeads, adminMessages } = useData();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const newLeadsCount = adminLeads.filter(l => l.status === 'New').length;
  const newMessagesCount = adminMessages.filter(m => m.status === 'New').length;

  const navItems: { id: AdminTab; label: string; count?: number; group?: string }[] = [
    { id: 'dashboard', label: 'Dashboard', group: 'Overview' },
    { id: 'leads', label: 'Consultation Leads', count: newLeadsCount, group: 'Operations' },
    { id: 'messages', label: 'Contact Inquiries', count: newMessagesCount, group: 'Operations' },
    { id: 'projects', label: 'Projects & Portfolio', group: 'Content Management' },
    { id: 'services', label: 'Services CMS', group: 'Content Management' },
    { id: 'homepage', label: 'Homepage Editor', group: 'Content Management' },
    { id: 'testimonials', label: 'Reviews & Testimonials', group: 'Content Management' },
    { id: 'faqs', label: 'FAQ Manager', group: 'Content Management' },
    { id: 'service-areas', label: 'Service Areas', group: 'Content Management' },
    { id: 'financing', label: 'Financing Page', group: 'Content Management' },
    { id: 'media', label: 'Media Library', group: 'Assets' },
    { id: 'settings', label: 'Company Settings', group: 'Administration' },
    { id: 'users', label: 'User Roles & Access', group: 'Administration' },
    { id: 'audit-log', label: 'System Audit Log', group: 'Administration' }
  ];

  return (
    <div className="min-h-screen bg-[#F7F5F0] text-[#141312] flex flex-col font-sans">
      {/* Top Header */}
      <header className="bg-[#141312] text-white border-b border-[#252220] px-6 py-3 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            className="lg:hidden p-1.5 text-white/80 hover:text-white focus:outline-none"
            aria-label="Toggle admin sidebar"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div className="flex items-center gap-3">
            <span className="font-serif text-lg tracking-wider text-white">BANLGAR GHOR</span>
            <span className="text-[10px] uppercase tracking-widest px-2 py-0.5 bg-[#2C2825] text-[#D3C9BD] border border-white/10">
              CMS Engine
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs">
          <button
            onClick={onNavigateHome}
            className="text-[#D3C9BD] hover:text-white transition-colors flex items-center gap-1.5"
          >
            <span>View Live Website</span>
            <span aria-hidden="true">↗</span>
          </button>

          <div className="h-4 w-px bg-white/20 hidden sm:block" />

          {/* User Profile Pill */}
          <div className="flex items-center gap-3">
            {adminUser?.avatar && (
              <img
                src={adminUser.avatar}
                alt={adminUser.name}
                className="w-7 h-7 rounded-full object-cover border border-white/20"
              />
            )}
            <div className="hidden sm:block text-left">
              <div className="font-medium text-white text-xs">{adminUser?.name}</div>
              <div className="text-[10px] text-[#A99F94]">{adminUser?.role}</div>
            </div>
            <button
              onClick={logoutAdmin}
              className="text-[11px] uppercase tracking-wider text-[#B39366] hover:text-white underline ml-2"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <aside
          className={`fixed lg:static inset-y-0 left-0 z-30 w-64 bg-white border-r border-[#EAE4DC] flex flex-col justify-between transition-transform duration-200 ${
            mobileSidebarOpen ? 'translate-x-0 top-12' : '-translate-x-full lg:translate-x-0'
          }`}
        >
          <div className="p-4 overflow-y-auto space-y-6">
            {['Overview', 'Operations', 'Content Management', 'Assets', 'Administration'].map(group => {
              const items = navItems.filter(i => i.group === group);
              if (items.length === 0) return null;
              return (
                <div key={group} className="space-y-1">
                  <div className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#8A8177] px-3 pb-1">
                    {group}
                  </div>
                  {items.map(item => {
                    const isActive = currentTab === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          onTabChange(item.id);
                          setMobileSidebarOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 text-xs font-medium rounded-xs flex items-center justify-between transition-colors ${
                          isActive
                            ? 'bg-[#141312] text-white shadow-xs'
                            : 'text-[#4A4642] hover:bg-[#FAF8F5] hover:text-[#141312]'
                        }`}
                      >
                        <span>{item.label}</span>
                        {item.count !== undefined && item.count > 0 && (
                          <span
                            className={`text-[10px] font-mono px-1.5 py-0.5 rounded-full ${
                              isActive ? 'bg-[#B39366] text-white' : 'bg-[#141312] text-white'
                            }`}
                          >
                            {item.count}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              );
            })}
          </div>

          <div className="p-4 border-t border-[#EAE4DC] bg-[#FAF8F5] text-[11px] text-[#7A746E]">
            <p className="font-semibold text-[#141312]">Live Database Sync</p>
            <p className="pt-0.5">All edits persist immediately to server storage.</p>
          </div>
        </aside>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-6 sm:p-8 lg:p-10">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};
