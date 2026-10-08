import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Project,
  Service,
  Testimonial,
  FAQ,
  ServiceArea,
  ProcessStep,
  TeamMember,
  CompanySettings,
  HomepageConfig,
  FinancingContent,
  ConsultationRequest,
  ContactMessage,
  AdminUser,
  MediaItem,
  AuditLog
} from '../types';

interface DataContextType {
  loading: boolean;
  error: string | null;
  projects: Project[];
  services: Service[];
  testimonials: Testimonial[];
  faqs: FAQ[];
  serviceAreas: ServiceArea[];
  processSteps: ProcessStep[];
  teamMembers: TeamMember[];
  companySettings: CompanySettings | null;
  homepageConfig: HomepageConfig | null;
  financingContent: FinancingContent | null;
  
  // Public Form Submissions
  submitConsultation: (data: Partial<ConsultationRequest> & { hp_website?: string }) => Promise<{ success: boolean; error?: string }>;
  submitContact: (data: Partial<ContactMessage> & { hp_website?: string }) => Promise<{ success: boolean; error?: string }>;
  
  // Refresh live data
  refreshData: () => Promise<void>;

  // Admin Auth
  adminUser: AdminUser | null;
  adminToken: string | null;
  loginAdmin: (email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  logoutAdmin: () => void;

  // Admin Data & Actions
  adminLeads: ConsultationRequest[];
  adminMessages: ContactMessage[];
  adminMedia: MediaItem[];
  adminAuditLogs: AuditLog[];
  adminUsersList: AdminUser[];
  refreshAdminData: () => Promise<void>;
  
  // CRUD Actions
  saveProject: (proj: Partial<Project>) => Promise<boolean>;
  deleteProject: (id: string) => Promise<boolean>;
  saveService: (srv: Partial<Service>) => Promise<boolean>;
  saveTestimonial: (t: Partial<Testimonial>) => Promise<boolean>;
  deleteTestimonial: (id: string) => Promise<boolean>;
  saveFaq: (f: Partial<FAQ>) => Promise<boolean>;
  deleteFaq: (id: string) => Promise<boolean>;
  saveServiceArea: (a: Partial<ServiceArea>) => Promise<boolean>;
  deleteServiceArea: (id: string) => Promise<boolean>;
  saveCompanySettings: (settings: Partial<CompanySettings>) => Promise<boolean>;
  saveHomepageConfig: (config: Partial<HomepageConfig>) => Promise<boolean>;
  saveFinancingContent: (content: Partial<FinancingContent>) => Promise<boolean>;
  updateLead: (id: string, updates: Partial<ConsultationRequest>) => Promise<boolean>;
  deleteLead: (id: string) => Promise<boolean>;
  updateMessage: (id: string, updates: Partial<ContactMessage>) => Promise<boolean>;
  deleteMessage: (id: string) => Promise<boolean>;
  uploadMedia: (media: { name: string; url: string; category: string }) => Promise<boolean>;
  deleteMedia: (id: string) => Promise<boolean>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [projects, setProjects] = useState<Project[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [serviceAreas, setServiceAreas] = useState<ServiceArea[]>([]);
  const [processSteps, setProcessSteps] = useState<ProcessStep[]>([]);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [companySettings, setCompanySettings] = useState<CompanySettings | null>(null);
  const [homepageConfig, setHomepageConfig] = useState<HomepageConfig | null>(null);
  const [financingContent, setFinancingContent] = useState<FinancingContent | null>(null);

  // Admin states
  const [adminUser, setAdminUser] = useState<AdminUser | null>(() => {
    try {
      const stored = localStorage.getItem('bg_admin_user');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });
  const [adminToken, setAdminToken] = useState<string | null>(() => {
    try {
      return localStorage.getItem('bg_admin_token') || null;
    } catch {
      return null;
    }
  });

  const [adminLeads, setAdminLeads] = useState<ConsultationRequest[]>([]);
  const [adminMessages, setAdminMessages] = useState<ContactMessage[]>([]);
  const [adminMedia, setAdminMedia] = useState<MediaItem[]>([]);
  const [adminAuditLogs, setAdminAuditLogs] = useState<AuditLog[]>([]);
  const [adminUsersList, setAdminUsersList] = useState<AdminUser[]>([]);

  const fetchPublicData = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch('/api/public-data');
      if (!res.ok) throw new Error('Failed to fetch public data');
      const data = await res.json();
      
      setCompanySettings(data.companySettings);
      setHomepageConfig(data.homepageConfig);
      setFinancingContent(data.financingContent);
      setProjects(data.projects || []);
      setServices(data.services || []);
      setTestimonials(data.testimonials || []);
      setFaqs(data.faqs || []);
      setServiceAreas(data.serviceAreas || []);
      setProcessSteps(data.processSteps || []);
      setTeamMembers(data.teamMembers || []);
    } catch (err: any) {
      console.error('Error fetching data:', err);
      setError(err.message || 'Could not load website data');
    } finally {
      setLoading(false);
    }
  };

  const refreshAdminData = async () => {
    if (!adminUser) return;
    try {
      const [leadsRes, msgsRes, mediaRes, auditRes, usersRes] = await Promise.all([
        fetch('/api/consultation-requests'),
        fetch('/api/contact-messages'),
        fetch('/api/media'),
        fetch('/api/audit-logs'),
        fetch('/api/admin/users')
      ]);

      if (leadsRes.ok) setAdminLeads(await leadsRes.json());
      if (msgsRes.ok) setAdminMessages(await msgsRes.json());
      if (mediaRes.ok) setAdminMedia(await mediaRes.json());
      if (auditRes.ok) setAdminAuditLogs(await auditRes.json());
      if (usersRes.ok) setAdminUsersList(await usersRes.json());
    } catch (err) {
      console.error('Error refreshing admin data:', err);
    }
  };

  useEffect(() => {
    fetchPublicData();
  }, []);

  useEffect(() => {
    if (adminUser) {
      refreshAdminData();
    }
  }, [adminUser]);

  // Auth operations
  const loginAdmin = async (email: string, pass: string) => {
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password: pass })
      });
      const data = await res.json();
      if (!res.ok) {
        return { success: false, error: data.error || 'Login failed' };
      }
      setAdminUser(data.user);
      setAdminToken(data.token);
      localStorage.setItem('bg_admin_user', JSON.stringify(data.user));
      localStorage.setItem('bg_admin_token', data.token);
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || 'Network error' };
    }
  };

  const logoutAdmin = () => {
    setAdminUser(null);
    setAdminToken(null);
    localStorage.removeItem('bg_admin_user');
    localStorage.removeItem('bg_admin_token');
  };

  // Public Form Submissions
  const submitConsultation = async (data: Partial<ConsultationRequest> & { hp_website?: string }) => {
    try {
      const res = await fetch('/api/consultation-requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      const result = await res.json();
      if (!res.ok) return { success: false, error: result.error || 'Submission failed' };
      if (adminUser) refreshAdminData();
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || 'Network error' };
    }
  };

  const submitContact = async (data: Partial<ContactMessage> & { hp_website?: string }) => {
    try {
      const res = await fetch('/api/contact-messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      const result = await res.json();
      if (!res.ok) return { success: false, error: result.error || 'Submission failed' };
      if (adminUser) refreshAdminData();
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || 'Network error' };
    }
  };

  // Admin CRUD operations
  const saveProject = async (proj: Partial<Project>) => {
    try {
      const url = proj.id ? `/api/projects/${proj.id}` : '/api/projects';
      const method = proj.id ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...proj,
          _adminName: adminUser?.name,
          _adminRole: adminUser?.role
        })
      });
      if (res.ok) {
        await fetchPublicData();
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  const deleteProject = async (id: string) => {
    try {
      const res = await fetch(`/api/projects/${id}?adminName=${encodeURIComponent(adminUser?.name || '')}&adminRole=${encodeURIComponent(adminUser?.role || '')}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        await fetchPublicData();
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  const saveService = async (srv: Partial<Service>) => {
    try {
      const url = srv.id ? `/api/services/${srv.id}` : '/api/services';
      const method = srv.id ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...srv,
          _adminName: adminUser?.name,
          _adminRole: adminUser?.role
        })
      });
      if (res.ok) {
        await fetchPublicData();
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  const saveTestimonial = async (t: Partial<Testimonial>) => {
    try {
      const url = t.id ? `/api/testimonials/${t.id}` : '/api/testimonials';
      const method = t.id ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...t, _adminName: adminUser?.name, _adminRole: adminUser?.role })
      });
      if (res.ok) {
        await fetchPublicData();
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  const deleteTestimonial = async (id: string) => {
    try {
      const res = await fetch(`/api/testimonials/${id}`, { method: 'DELETE' });
      if (res.ok) {
        await fetchPublicData();
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  const saveFaq = async (f: Partial<FAQ>) => {
    try {
      const url = f.id ? `/api/faqs/${f.id}` : '/api/faqs';
      const method = f.id ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...f, _adminName: adminUser?.name, _adminRole: adminUser?.role })
      });
      if (res.ok) {
        await fetchPublicData();
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  const deleteFaq = async (id: string) => {
    try {
      const res = await fetch(`/api/faqs/${id}`, { method: 'DELETE' });
      if (res.ok) {
        await fetchPublicData();
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  const saveServiceArea = async (a: Partial<ServiceArea>) => {
    try {
      const url = a.id ? `/api/service-areas/${a.id}` : '/api/service-areas';
      const method = a.id ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(a)
      });
      if (res.ok) {
        await fetchPublicData();
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  const deleteServiceArea = async (id: string) => {
    try {
      const res = await fetch(`/api/service-areas/${id}`, { method: 'DELETE' });
      if (res.ok) {
        await fetchPublicData();
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  const saveCompanySettings = async (settings: Partial<CompanySettings>) => {
    try {
      const res = await fetch('/api/company-settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...settings, _adminName: adminUser?.name, _adminRole: adminUser?.role })
      });
      if (res.ok) {
        await fetchPublicData();
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  const saveHomepageConfig = async (config: Partial<HomepageConfig>) => {
    try {
      const res = await fetch('/api/homepage-config', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...config, _adminName: adminUser?.name, _adminRole: adminUser?.role })
      });
      if (res.ok) {
        await fetchPublicData();
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  const saveFinancingContent = async (content: Partial<FinancingContent>) => {
    try {
      const res = await fetch('/api/financing-content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...content, _adminName: adminUser?.name, _adminRole: adminUser?.role })
      });
      if (res.ok) {
        await fetchPublicData();
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  const updateLead = async (id: string, updates: Partial<ConsultationRequest>) => {
    try {
      const res = await fetch(`/api/consultation-requests/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...updates, _adminName: adminUser?.name, _adminRole: adminUser?.role })
      });
      if (res.ok) {
        await refreshAdminData();
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  const deleteLead = async (id: string) => {
    try {
      const res = await fetch(`/api/consultation-requests/${id}`, { method: 'DELETE' });
      if (res.ok) {
        await refreshAdminData();
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  const updateMessage = async (id: string, updates: Partial<ContactMessage>) => {
    try {
      const res = await fetch(`/api/contact-messages/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...updates, _adminName: adminUser?.name, _adminRole: adminUser?.role })
      });
      if (res.ok) {
        await refreshAdminData();
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  const deleteMessage = async (id: string) => {
    try {
      const res = await fetch(`/api/contact-messages/${id}`, { method: 'DELETE' });
      if (res.ok) {
        await refreshAdminData();
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  const uploadMedia = async (media: { name: string; url: string; category: string }) => {
    try {
      const res = await fetch('/api/media', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...media, _adminName: adminUser?.name, _adminRole: adminUser?.role })
      });
      if (res.ok) {
        await refreshAdminData();
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  const deleteMedia = async (id: string) => {
    try {
      const res = await fetch(`/api/media/${id}`, { method: 'DELETE' });
      if (res.ok) {
        await refreshAdminData();
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  return (
    <DataContext.Provider
      value={{
        loading,
        error,
        projects,
        services,
        testimonials,
        faqs,
        serviceAreas,
        processSteps,
        teamMembers,
        companySettings,
        homepageConfig,
        financingContent,
        submitConsultation,
        submitContact,
        refreshData: fetchPublicData,
        adminUser,
        adminToken,
        loginAdmin,
        logoutAdmin,
        adminLeads,
        adminMessages,
        adminMedia,
        adminAuditLogs,
        adminUsersList,
        refreshAdminData,
        saveProject,
        deleteProject,
        saveService,
        saveTestimonial,
        deleteTestimonial,
        saveFaq,
        deleteFaq,
        saveServiceArea,
        deleteServiceArea,
        saveCompanySettings,
        saveHomepageConfig,
        saveFinancingContent,
        updateLead,
        deleteLead,
        updateMessage,
        deleteMessage,
        uploadMedia,
        deleteMedia
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) throw new Error('useData must be used within a DataProvider');
  return context;
};
