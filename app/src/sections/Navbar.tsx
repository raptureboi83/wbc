import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import type { SiteSettings } from '@/lib/types'
import SocialIcons from '@/components/socialIcons'

interface NavbarProps {
  siteSettings: SiteSettings | null
}

const navItems = [
  { label: 'About', id: 'about' },
  { label: 'Films', id: 'films' },
  { label: 'Packages', id: 'packages' },
  { label: 'Testimonials', id: 'testimonials' },
  { label: 'Vendors', id: 'vendors' },
  { label: 'Contact', id: 'contact' },
]

const NAV_OFFSET = 96

function getBasePath() {
  const base = import.meta.env.BASE_URL || '/'
  return base.endsWith('/') ? base : `${base}/`
}

function scrollWithOffset(id: string) {
  const el = document.getElementById(id)
  if (!el) return false

  const top = el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET

  window.scrollTo({
    top,
    behavior: 'smooth',
  })

  return true
}

export default function Navbar({ siteSettings }: NavbarProps) {
  const location = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [visible, setVisible] = useState(true)
  const [mobileOpen, setMobileOpen] = useState(false)
  const lastScrollY = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY
      setScrolled(currentY > 50)

      if (currentY > lastScrollY.current && currentY > 100 && !mobileOpen) {
        setVisible(false)
      } else {
        setVisible(true)
      }

      lastScrollY.current = currentY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [mobileOpen])

  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  useEffect(() => {
    if (location.pathname !== '/') return
    if (!location.hash) return

    const id = location.hash.replace('#', '')

    const timeout = window.setTimeout(() => {
      scrollWithOffset(id)
    }, 150)

    return () => window.clearTimeout(timeout)
  }, [location])

  const goToSection = (id: string) => {
    setMobileOpen(false)

    if (location.pathname === '/') {
      scrollWithOffset(id)
      return
    }

    const base = getBasePath()
    window.location.href = `${base}#${id}`
  }

  const handleLogoClick = () => {
    setMobileOpen(false)

    if (location.pathname === '/') {
      const hero = document.getElementById('hero')

      if (hero) {
        const top = Math.max(hero.getBoundingClientRect().top + window.scrollY - 80, 0)

        window.scrollTo({
          top,
          behavior: 'smooth',
        })
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }

      return
    }

    const base = getBasePath()
    window.location.href = `${base}#hero`
  }

  const siteName = siteSettings?.siteName || 'Weddings By Christian'
  const brandingMode = siteSettings?.brandingMode || 'text'
  const logoUrl = siteSettings?.logoUrl
  const socialLinks = siteSettings?.socialLinks || []

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 flex h-20 items-center justify-between px-6 transition-all duration-500 md:px-10 ${
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
            <span className="font-['Inter'] text-xs font-medium uppercase tracking-[0.1em] text-warm-beige">
              {siteName}
            </span>
          )}
        </button>

        <div className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => goToSection(item.id)}
              className="font-['Inter'] text-xs uppercase tracking-[0.1em] text-muted-foreground transition-colors duration-300 hover:text-warm-beige"
            >
              {item.label}
            </button>
          ))}

          {socialLinks.length > 0 && (
            <div className="ml-2 border-l border-white/10 pl-4">
              <SocialIcons socialLinks={socialLinks} />
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen((prev) => !prev)}
          className="flex h-10 w-10 items-center justify-center text-warm-beige md:hidden"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
        >
          <div className="relative h-5 w-5">
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
        <div className="fixed top-20 left-0 right-0 z-40 border-t border-white/10 bg-dark-bg/95 px-6 py-6 backdrop-blur-md md:hidden">
          <div className="flex flex-col gap-5">
            {navItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => goToSection(item.id)}
                className="text-left font-['Inter'] text-sm uppercase tracking-[0.1em] text-warm-beige"
              >
                {item.label}
              </button>
            ))}

            {socialLinks.length > 0 && (
              <div className="mt-2 border-t border-white/10 pt-4">
                <SocialIcons socialLinks={socialLinks} />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}