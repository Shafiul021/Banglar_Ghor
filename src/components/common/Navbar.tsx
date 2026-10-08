import React, { useState, useEffect } from 'react';
import { useData } from '../../context/DataContext';

interface NavbarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPath, onNavigate }) => {
  const { companySettings, services, adminUser } = useData();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Services', path: '/services', hasDropdown: true },
    { label: 'Projects', path: '/projects' },
    { label: 'About', path: '/about' },
    { label: 'Our Process', path: '/process' },
    { label: 'Service Areas', path: '/service-areas' },
    { label: 'Financing', path: '/financing' },
    { label: 'FAQ', path: '/faq' },
    { label: 'Contact', path: '/contact' }
  ];

  const handleNavClick = (path: string) => {
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
    onNavigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isHeroPage = currentPath === '/' || currentPath.startsWith('/services/') || currentPath.startsWith('/projects/');
  const isTransparent = isHeroPage && !isScrolled && !mobileMenuOpen;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isTransparent
          ? 'bg-gradient-to-b from-[#141312]/80 via-[#141312]/45 to-transparent text-white border-b border-white/15'
          : 'bg-[#FAF8F5]/98 backdrop-blur-md text-[#141312] border-b border-[#EAE4DC] shadow-xs'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div
          className={`flex items-center justify-between transition-all duration-300 ${
            isScrolled ? 'py-3' : 'py-4.5 sm:py-5'
          }`}
        >
          {/* Brand Logo */}
          <button
            onClick={() => handleNavClick('/')}
            className="text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B39366] flex items-center gap-3"
          >
            <div
              className={`w-9 h-9 border flex items-center justify-center font-serif text-sm font-semibold tracking-wider transition-colors shrink-0 ${
                isTransparent
                  ? 'border-white/50 text-white group-hover:border-white'
                  : 'border-[#141312]/30 text-[#141312] group-hover:border-[#B39366] group-hover:text-[#B39366]'
              }`}
            >
              BG
            </div>
            <div className="flex flex-col">
              <span
                className={`text-lg sm:text-xl lg:text-2xl font-serif tracking-wider font-semibold uppercase leading-tight transition-colors ${
                  isTransparent ? 'text-white' : 'text-[#141312] group-hover:text-[#B39366]'
                }`}
              >
                {companySettings?.name || 'Banlgar Ghor'}
              </span>
              <span
                className={`text-[8.5px] sm:text-[9px] uppercase tracking-[0.25em] font-medium transition-colors ${
                  isTransparent ? 'text-white/75' : 'text-[#7A746E]'
                }`}
              >
                Residential Remodeling · New York
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links (Consistent lg:flex) */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-7 text-[12px] xl:text-[13px] tracking-wider uppercase font-medium">
            {navLinks.map(link => {
              const isActive = currentPath === link.path || (link.path !== '/' && currentPath.startsWith(link.path));

              if (link.hasDropdown) {
                return (
                  <div
                    key={link.path}
                    className="relative"
                    onMouseEnter={() => setServicesDropdownOpen(true)}
                    onMouseLeave={() => setServicesDropdownOpen(false)}
                  >
                    <button
                      onClick={() => handleNavClick('/services')}
                      className={`flex items-center gap-1.5 transition-colors py-1.5 hover:text-[#B39366] ${
                        isActive
                          ? isTransparent
                            ? 'text-white border-b border-white'
                            : 'text-[#141312] border-b border-[#141312]'
                          : isTransparent
                          ? 'text-white/90'
                          : 'text-[#4A4642]'
                      }`}
                    >
                      <span>{link.label}</span>
                      <svg
                        className={`w-3 h-3 transition-transform duration-200 ${
                          servicesDropdownOpen ? 'rotate-180' : ''
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    {/* Dropdown Menu */}
                    {servicesDropdownOpen && (
                      <div className="absolute top-full left-0 w-64 pt-2 z-50 animate-fadeIn">
                        <div className="bg-[#FAF8F5] text-[#141312] border border-[#EAE4DC] shadow-xl py-2.5 rounded-xs">
                          <button
                            onClick={() => handleNavClick('/services')}
                            className="block w-full text-left px-5 py-2 text-xs font-semibold uppercase tracking-wider text-[#B39366] hover:bg-[#F3EFEA] border-b border-[#EAE4DC]/60 mb-1"
                          >
                            All Services Overview →
                          </button>
                          {services.map(s => (
                            <button
                              key={s.slug}
                              onClick={() => handleNavClick(`/services/${s.slug}`)}
                              className="block w-full text-left px-5 py-2 text-xs text-[#252220] hover:bg-[#F3EFEA] hover:text-[#B39366] transition-colors"
                            >
                              {s.name}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <button
                  key={link.path}
                  onClick={() => handleNavClick(link.path)}
                  className={`transition-colors py-1.5 hover:text-[#B39366] ${
                    isActive
                      ? isTransparent
                        ? 'text-white border-b border-white'
                        : 'text-[#141312] border-b border-[#141312]'
                      : isTransparent
                      ? 'text-white/90'
                      : 'text-[#4A4642]'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action / CTAs */}
          <div className="hidden lg:flex items-center gap-3 xl:gap-4">
            {adminUser && (
              <button
                onClick={() => handleNavClick('/admin')}
                className={`text-[10px] xl:text-[11px] font-semibold tracking-wider uppercase px-2.5 py-1 border transition-colors ${
                  isTransparent
                    ? 'border-white/40 text-white/90 hover:bg-white/10'
                    : 'border-[#141312]/20 text-[#141312] hover:bg-[#F3EFEA]'
                }`}
              >
                CMS Portal
              </button>
            )}

            <button
              onClick={() => handleNavClick('/consultation')}
              className={`text-[11px] xl:text-xs font-medium tracking-widest uppercase px-4 xl:px-5 py-2 xl:py-2.5 transition-all duration-200 shrink-0 ${
                isTransparent
                  ? 'bg-white text-[#141312] hover:bg-[#FAF8F5] shadow-xs'
                  : 'bg-[#141312] text-[#FAF8F5] hover:bg-[#2C2825] shadow-xs'
              }`}
            >
              Request a Free Consultation
            </button>
          </div>

          {/* Mobile Navigation Trigger (Synchronized with lg:hidden) */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => handleNavClick('/consultation')}
              className={`text-[10px] sm:text-[11px] tracking-wider uppercase px-3 py-1.5 font-medium transition-colors ${
                isTransparent
                  ? 'bg-white text-[#141312]'
                  : 'bg-[#141312] text-[#FAF8F5]'
              }`}
            >
              Consultation
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 min-h-[44px] min-w-[44px] flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B39366] ${
                isTransparent ? 'text-white' : 'text-[#141312]'
              }`}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FAF8F5] text-[#141312] border-b border-[#EAE4DC] px-6 py-6 shadow-xl animate-fadeIn">
          <div className="flex flex-col gap-4 text-sm font-medium tracking-wider uppercase divide-y divide-[#EAE4DC]/60">
            <div className="flex flex-col gap-3 pb-3">
              <button
                onClick={() => handleNavClick('/services')}
                className="text-left font-semibold text-[#141312] hover:text-[#B39366]"
              >
                Services Overview
              </button>
              <div className="pl-3 flex flex-col gap-2 text-xs normal-case text-[#5C5650]">
                {services.map(s => (
                  <button
                    key={s.slug}
                    onClick={() => handleNavClick(`/services/${s.slug}`)}
                    className="text-left py-1 hover:text-[#B39366]"
                  >
                    {s.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-3 py-3">
              <button onClick={() => handleNavClick('/projects')} className="text-left hover:text-[#B39366]">Projects Gallery</button>
              <button onClick={() => handleNavClick('/about')} className="text-left hover:text-[#B39366]">About the Studio</button>
              <button onClick={() => handleNavClick('/process')} className="text-left hover:text-[#B39366]">Our Process</button>
              <button onClick={() => handleNavClick('/reviews')} className="text-left hover:text-[#B39366]">Client Reviews</button>
              <button onClick={() => handleNavClick('/service-areas')} className="text-left hover:text-[#B39366]">Service Areas</button>
              <button onClick={() => handleNavClick('/financing')} className="text-left hover:text-[#B39366]">Financing Options</button>
              <button onClick={() => handleNavClick('/faq')} className="text-left hover:text-[#B39366]">Frequently Asked Questions</button>
              <button onClick={() => handleNavClick('/contact')} className="text-left hover:text-[#B39366]">Contact Studio</button>
            </div>

            <div className="pt-4 flex flex-col gap-3">
              <button
                onClick={() => handleNavClick('/consultation')}
                className="w-full text-center bg-[#141312] text-[#FAF8F5] py-3 text-xs tracking-widest uppercase font-medium hover:bg-[#2C2825]"
              >
                Request a Free Consultation
              </button>
              <div className="flex items-center justify-between text-xs text-[#7A746E] pt-2">
                <span>{companySettings?.phone || '(212) 555-0198'}</span>
                <button
                  onClick={() => handleNavClick('/admin')}
                  className="underline hover:text-[#141312]"
                >
                  Admin CMS
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
