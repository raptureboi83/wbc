import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import type { SiteSettings } from '@/lib/types';
import SocialIcons from '@/components/socialIcons';

interface NavbarProps {
  siteSettings: SiteSettings | null;
}

const navItems = [
  { label: 'About', id: 'about' },
  { label: 'Films', id: 'films' },
  { label: 'Packages', id: 'packages' },
  { label: 'Testimonials', id: 'testimonials' },
  { label: 'Vendors', id: 'vendors' },
  { label: 'Contact', id: 'contact' },
];

export default function Navbar({ siteSettings }: NavbarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setScrolled(currentY > 50);

      if (currentY > lastScrollY.current && currentY > 100 && !mobileOpen) {
        setVisible(false);
      } else {
        setVisible(true);
      }

      lastScrollY.current = currentY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [mobileOpen]);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const goToSection = (id: string) => {
    setMobileOpen(false);

    if (location.pathname === '/') {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else {
      navigate(`/#${id}`);
    }
  };

  const handleLogoClick = () => {
    setMobileOpen(false);

    if (location.pathname === '/') {
      const hero = document.getElementById('hero');
      if (hero) {
        hero.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else {
      navigate('/#hero');
    }
  };

  const siteName = siteSettings?.siteName || 'Weddings By Christian';
  const brandingMode = siteSettings?.brandingMode || 'text';
  const logoUrl = siteSettings?.logoUrl;
  const socialLinks = siteSettings?.socialLinks || [];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 h-20 flex items-center justify-between px-6 md:px-10 transition-all duration-500 ${
          visible ? 'translate-y-0' : '-translate-y-full'
        } bg-dark-bg/70 backdrop-blur-md ${scrolled ? 'bg-dark-bg/90' : ''}`}
      >
        <button
          type="button"
          onClick={handleLogoClick}
          className="cursor-pointer"
          aria-label="Back to home"
        >
          {brandingMode === 'logo' && logoUrl ? (
            <img
              src={logoUrl}
              alt={siteName}
              className="h-14 w-auto object-contain"
            />
          ) : (
            <span className="text-warm-beige text-xs tracking-[0.1em] uppercase font-medium font-['Inter']">
              {siteName}
            </span>
          )}
        </button>

        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => goToSection(item.id)}
              className="text-xs tracking-[0.1em] uppercase text-muted-foreground hover:text-warm-beige transition-colors duration-300 font-['Inter']"
            >
              {item.label}
            </button>
          ))}

          {socialLinks.length > 0 && (
            <div className="ml-2 pl-4 border-l border-white/10">
              <SocialIcons socialLinks={socialLinks} />
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen((prev) => !prev)}
          className="md:hidden flex items-center justify-center w-10 h-10 text-warm-beige"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
        >
          <div className="relative w-5 h-5">
            <span
              className={`absolute left-0 top-[4px] h-px w-5 bg-current transition-all duration-300 ${
                mobileOpen ? 'translate-y-[6px] rotate-45' : ''
              }`}
            />
            <span
              className={`absolute left-0 top-[10px] h-px w-5 bg-current transition-all duration-300 ${
                mobileOpen ? 'opacity-0' : 'opacity-100'
              }`}
            />
            <span
              className={`absolute left-0 top-[16px] h-px w-5 bg-current transition-all duration-300 ${
                mobileOpen ? '-translate-y-[6px] -rotate-45' : ''
              }`}
            />
          </div>
        </button>
      </nav>

      {mobileOpen && (
        <div className="fixed top-20 left-0 right-0 z-40 md:hidden bg-dark-bg/95 backdrop-blur-md border-t border-white/10 px-6 py-6">
          <div className="flex flex-col gap-5">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => goToSection(item.id)}
                className="text-left text-sm tracking-[0.1em] uppercase text-warm-beige font-['Inter']"
              >
                {item.label}
              </button>
            ))}

            {socialLinks.length > 0 && (
              <div className="pt-4 mt-2 border-t border-white/10">
                <SocialIcons socialLinks={socialLinks} />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}