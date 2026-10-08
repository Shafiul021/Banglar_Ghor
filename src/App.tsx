import React, { useState, useEffect } from 'react';
import { useData } from './context/DataContext';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';

// Public Pages
import { HomePage } from './pages/HomePage';
import { ServicesPage } from './pages/ServicesPage';
import { ServiceDetailPage } from './pages/ServiceDetailPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { ProjectDetailPage } from './pages/ProjectDetailPage';
import { AboutPage } from './pages/AboutPage';
import { ProcessPage } from './pages/ProcessPage';
import { ReviewsPage } from './pages/ReviewsPage';
import { ServiceAreasPage } from './pages/ServiceAreasPage';
import { FinancingPage } from './pages/FinancingPage';
import { FAQPage } from './pages/FAQPage';
import { ContactPage } from './pages/ContactPage';
import { ConsultationPage } from './pages/ConsultationPage';
import { LegalPage } from './pages/LegalPages';

// Admin CMS Views
import { AdminLayout, AdminTab } from './admin/AdminLayout';
import { AdminDashboardView } from './admin/AdminDashboardView';
import { AdminProjectsView } from './admin/AdminProjectsView';
import { AdminLeadsView } from './admin/AdminLeadsView';
import {
  AdminServicesManager,
  AdminHomepageManager,
  AdminTestimonialsManager,
  AdminFaqsManager,
  AdminSettingsManager,
  AdminMediaManager,
  AdminAuditLogManager
} from './admin/AdminContentModulesView';
import { AdminLoginView } from './admin/AdminLoginView';

export function App() {
  const { loading, error, adminUser, companySettings } = useData();

  // Current URL path state
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return window.location.pathname || '/';
  });

  const [adminTab, setAdminTab] = useState<AdminTab>('dashboard');

  // Sync with browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path: string) => {
    if (path !== currentPath) {
      window.history.pushState({}, '', path);
      setCurrentPath(path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Dynamic SEO page title update
  useEffect(() => {
    const brand = companySettings?.name || 'Banlgar Ghor Remodeling';
    if (currentPath === '/') {
      document.title = `${brand} | Luxury Residential Remodeling in New York`;
    } else if (currentPath === '/services') {
      document.title = `Services | ${brand}`;
    } else if (currentPath.startsWith('/services/')) {
      const slug = currentPath.replace('/services/', '');
      const formatted = slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
      document.title = `${formatted} | ${brand}`;
    } else if (currentPath === '/projects') {
      document.title = `Portfolio & Projects | ${brand}`;
    } else if (currentPath.startsWith('/projects/')) {
      const slug = currentPath.replace('/projects/', '');
      const formatted = slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
      document.title = `${formatted} | ${brand}`;
    } else if (currentPath === '/about') {
      document.title = `About Our Atelier | ${brand}`;
    } else if (currentPath === '/process') {
      document.title = `Our Architectural Process | ${brand}`;
    } else if (currentPath === '/reviews') {
      document.title = `Client Reviews & Testimonials | ${brand}`;
    } else if (currentPath === '/service-areas') {
      document.title = `Service Areas in New York | ${brand}`;
    } else if (currentPath === '/financing') {
      document.title = `Financing Options | ${brand}`;
    } else if (currentPath === '/faq') {
      document.title = `Frequently Asked Questions | ${brand}`;
    } else if (currentPath === '/contact') {
      document.title = `Contact Studio | ${brand}`;
    } else if (currentPath === '/consultation') {
      document.title = `Request a Free Consultation | ${brand}`;
    } else if (currentPath.startsWith('/admin')) {
      document.title = `Admin CMS Portal | ${brand}`;
    }
  }, [currentPath, companySettings]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAF8F5] flex flex-col items-center justify-center space-y-4">
        <div className="font-serif text-2xl tracking-widest text-[#141312] animate-pulse">
          BANLGAR GHOR REMODELING
        </div>
        <div className="w-16 h-0.5 bg-[#B39366] animate-pulse" />
        <span className="text-[10px] uppercase tracking-[0.25em] text-[#8A8177]">
          Loading Atelier Environment...
        </span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#FAF8F5] flex flex-col items-center justify-center p-6 text-center space-y-4">
        <h1 className="text-2xl font-serif text-[#8A2616]">Unable to Load Application</h1>
        <p className="text-xs text-[#5C5650] max-w-md">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="bg-[#141312] text-white px-5 py-2 text-xs uppercase tracking-wider font-medium"
        >
          Retry
        </button>
      </div>
    );
  }

  // ----------------------------------------------------------------------------
  // ADMIN CMS ROUTE (/admin)
  // ----------------------------------------------------------------------------
  if (currentPath.startsWith('/admin')) {
    if (!adminUser) {
      return (
        <AdminLoginView
          onSuccess={() => navigate('/admin')}
          onNavigateHome={() => navigate('/')}
        />
      );
    }

    return (
      <AdminLayout
        currentTab={adminTab}
        onTabChange={setAdminTab}
        onNavigateHome={() => navigate('/')}
      >
        {adminTab === 'dashboard' && <AdminDashboardView onNavigateTab={setAdminTab} />}
        {adminTab === 'projects' && <AdminProjectsView />}
        {adminTab === 'services' && <AdminServicesManager />}
        {adminTab === 'homepage' && <AdminHomepageManager />}
        {adminTab === 'leads' && <AdminLeadsView />}
        {adminTab === 'messages' && (
          <div className="space-y-6">
            <h2 className="text-xl font-serif text-[#141312] pb-4 border-b">Contact Inquiries</h2>
            <AdminDashboardView onNavigateTab={setAdminTab} />
          </div>
        )}
        {adminTab === 'testimonials' && <AdminTestimonialsManager />}
        {adminTab === 'faqs' && <AdminFaqsManager />}
        {adminTab === 'service-areas' && (
          <div className="space-y-4">
            <h2 className="text-xl font-serif text-[#141312] pb-4 border-b">Service Areas Coverage</h2>
            <p className="text-xs text-[#5C5650]">Configure active boroughs and towns served across New York.</p>
            <AdminSettingsManager />
          </div>
        )}
        {adminTab === 'financing' && (
          <div className="space-y-4">
            <h2 className="text-xl font-serif text-[#141312] pb-4 border-b">Financing Terms Content</h2>
            <AdminHomepageManager />
          </div>
        )}
        {adminTab === 'media' && <AdminMediaManager />}
        {adminTab === 'settings' && <AdminSettingsManager />}
        {adminTab === 'users' && (
          <div className="space-y-4">
            <h2 className="text-xl font-serif text-[#141312] pb-4 border-b">Staff Access & Permissions</h2>
            <div className="p-4 bg-white border text-xs text-[#5C5650] leading-relaxed">
              Roles supported: Super Admin, Content Manager, Project Manager, Sales, Editor, Viewer.
              To add additional team accounts, contact system operations.
            </div>
            <AdminAuditLogManager />
          </div>
        )}
        {adminTab === 'audit-log' && <AdminAuditLogManager />}
      </AdminLayout>
    );
  }

  // ----------------------------------------------------------------------------
  // PUBLIC WEBSITE ROUTES
  // ----------------------------------------------------------------------------
  const renderPublicPage = () => {
    // 1. Home
    if (currentPath === '/') {
      return <HomePage onNavigate={navigate} />;
    }

    // 2. Services
    if (currentPath === '/services') {
      return <ServicesPage onNavigate={navigate} />;
    }
    if (currentPath.startsWith('/services/')) {
      const slug = currentPath.replace('/services/', '');
      return <ServiceDetailPage slug={slug} onNavigate={navigate} />;
    }

    // 3. Projects
    if (currentPath === '/projects') {
      return <ProjectsPage onNavigate={navigate} />;
    }
    if (currentPath.startsWith('/projects/')) {
      const slug = currentPath.replace('/projects/', '');
      return <ProjectDetailPage slug={slug} onNavigate={navigate} />;
    }

    // 4. About
    if (currentPath === '/about') {
      return <AboutPage onNavigate={navigate} />;
    }

    // 5. Process
    if (currentPath === '/process') {
      return <ProcessPage onNavigate={navigate} />;
    }

    // 6. Reviews
    if (currentPath === '/reviews') {
      return <ReviewsPage onNavigate={navigate} />;
    }

    // 7. Service Areas
    if (currentPath === '/service-areas') {
      return <ServiceAreasPage onNavigate={navigate} />;
    }

    // 8. Financing
    if (currentPath === '/financing') {
      return <FinancingPage onNavigate={navigate} />;
    }

    // 9. FAQ
    if (currentPath === '/faq') {
      return <FAQPage onNavigate={navigate} />;
    }

    // 10. Contact
    if (currentPath === '/contact') {
      return <ContactPage onNavigate={navigate} />;
    }

    // 11. Consultation
    if (currentPath === '/consultation') {
      return <ConsultationPage onNavigate={navigate} />;
    }

    // 12. Legal Pages
    if (currentPath === '/privacy') {
      return <LegalPage type="privacy" onNavigate={navigate} />;
    }
    if (currentPath === '/terms') {
      return <LegalPage type="terms" onNavigate={navigate} />;
    }
    if (currentPath === '/accessibility') {
      return <LegalPage type="accessibility" onNavigate={navigate} />;
    }

    // 404 Fallback
    return (
      <div className="pt-40 pb-32 max-w-xl mx-auto px-6 text-center space-y-4">
        <h1 className="text-4xl font-serif text-[#141312]">Page Not Found</h1>
        <p className="text-sm text-[#7A746E]">
          The architectural page you requested does not exist or has been moved.
        </p>
        <button
          onClick={() => navigate('/')}
          className="bg-[#141312] text-white px-6 py-3 text-xs uppercase tracking-widest font-medium"
        >
          Return Home
        </button>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#141312]">
      <Navbar currentPath={currentPath} onNavigate={navigate} />
      <main className="flex-1">
        {renderPublicPage()}
      </main>
      <Footer onNavigate={navigate} />
    </div>
  );
}

