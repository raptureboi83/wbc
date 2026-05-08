import { useEffect, useRef, useState } from 'react';
import type { SiteSettings } from '@/lib/types';
import SocialIcons from '@/components/socialIcons';

interface NavbarProps {
  siteSettings: SiteSettings | null;
}

export default function Navbar({ siteSettings }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setScrolled(currentY > 50);

      if (currentY > lastScrollY.current && currentY > 100) {
        setVisible(false);
      } else {
        setVisible(true);
      }

      lastScrollY.current = currentY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const siteName = siteSettings?.siteName || 'Weddings By Christian';
  const brandingMode = siteSettings?.brandingMode || 'text';
  const logoUrl = siteSettings?.logoUrl;
  const socialLinks = siteSettings?.socialLinks || [];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 h-20 flex items-center justify-between px-6 md:px-10 transition-all duration-500 ${
        visible ? 'translate-y-0' : '-translate-y-full'
      } bg-dark-bg/70 backdrop-blur-md ${scrolled ? 'bg-dark-bg/90' : ''}`}
    >
      <button
        type="button"
        onClick={() => scrollTo('hero')}
        className="cursor-pointer"
        aria-label="Back to top"
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
        {[
          { label: 'Films', id: 'films' },
          { label: 'Services', id: 'packages' },
          { label: 'About', id: 'about' },
          { label: 'Contact', id: 'contact' },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => scrollTo(item.id)}
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
    </nav>
  );
}