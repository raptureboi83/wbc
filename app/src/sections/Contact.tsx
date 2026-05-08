import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { ContactSection, SiteSettings } from '@/lib/types';
import SocialIcons from '@/components/socialIcons';

gsap.registerPlugin(ScrollTrigger);

interface ContactProps {
  data: ContactSection | null;
  siteSettings: SiteSettings | null;
}

export default function Contact({ data, siteSettings }: ContactProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [formVisible, setFormVisible] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(contentRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
        opacity: 0,
        y: 40,
        duration: 1.2,
        ease: 'power3.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (formVisible && !document.getElementById('recaptcha-script')) {
      const script = document.createElement('script');
      script.id = 'recaptcha-script';
      script.src = 'https://www.google.com/recaptcha/api.js';
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
    }
  }, [formVisible]);

  const headline = data?.headline || 'Ready to talk about your wedding film?';
  const subtext =
    data?.subtext ||
    "Tell me a bit about your day, and I'll let you know my availability, pricing options, and what I can suggest based on your plans. No pressure, no hard sell.";
  const email = data?.email || 'better2b@rogers.com';
  const phone = data?.phone || '(705) 734-9971';
  const basedIn = data?.basedIn || 'Central Ontario, Canada';
  const buttonLabel = data?.buttonLabel || 'Email about your date';
  const helperText =
    data?.helperText ||
    'Include your wedding date, venue, and anything you already know about timing. You can also email directly if you prefer.';
  const footerCopyright = data?.footerCopyright || '© 2026 Weddings By Christian';

  const siteName = siteSettings?.siteName || 'Weddings By Christian';

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      id="contact"
      ref={sectionRef}
      className="w-full py-24 md:py-32 px-6 md:px-10 bg-dark-bg"
    >
      <div ref={contentRef} className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start mb-24">
          <div>
            <span className="text-cool-gray text-xs tracking-[0.1em] uppercase font-['Inter']">
              Contact
            </span>
            <h2 className="text-warm-beige text-3xl md:text-4xl lg:text-5xl mt-4 mb-6 leading-[1.1]">
              {headline}
            </h2>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed font-['Inter']">
              {subtext}
            </p>
          </div>

          <div className="p-6 md:p-8 border border-white/10 rounded-sm bg-elevated-bg/60">
            <div className="space-y-4 mb-6">
              <div>
                <div className="text-cool-gray text-xs tracking-[0.1em] uppercase mb-1 font-['Inter']">
                  Email
                </div>
                <a
                  href={`mailto:${email}`}
                  className="text-warm-beige text-base font-['Inter'] hover:text-cream transition-colors"
                >
                  {email}
                </a>
              </div>

              <div>
                <div className="text-cool-gray text-xs tracking-[0.1em] uppercase mb-1 font-['Inter']">
                  Phone
                </div>
                <a
                  href={`tel:${phone.replace(/\D/g, '')}`}
                  className="text-warm-beige text-base font-['Inter'] hover:text-cream transition-colors"
                >
                  {phone}
                </a>
              </div>

              <div>
                <div className="text-cool-gray text-xs tracking-[0.1em] uppercase mb-1 font-['Inter']">
                  Based In
                </div>
                <div className="text-warm-beige text-base font-['Inter']">
                  {basedIn}
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setFormVisible(!formVisible)}
              className="block w-full bg-cream text-dark-bg px-6 py-4 text-sm tracking-[0.1em] uppercase font-medium font-['Inter'] rounded-sm hover:bg-warm-beige transition-colors duration-300 text-center"
            >
              {buttonLabel}
            </button>

            <p className="text-cool-gray text-xs mt-4 leading-relaxed font-['Inter']">
              {helperText}
            </p>

            {formVisible && (
              <div className="mt-6 pt-6 border-t border-white/10">
                <form action="https://formspree.io/f/mqenevqw" method="POST" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-cool-gray text-xs tracking-[0.1em] uppercase mb-2 block font-['Inter']">
                        Your Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        placeholder="Jane & Alex"
                        required
                        className="w-full px-4 py-3 bg-dark-bg border border-white/10 rounded-sm text-warm-beige placeholder-cool-gray/50 font-['Inter'] text-sm focus:outline-none focus:border-cream/50"
                      />
                    </div>
                    <div>
                      <label className="text-cool-gray text-xs tracking-[0.1em] uppercase mb-2 block font-['Inter']">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        placeholder="you@email.com"
                        required
                        className="w-full px-4 py-3 bg-dark-bg border border-white/10 rounded-sm text-warm-beige placeholder-cool-gray/50 font-['Inter'] text-sm focus:outline-none focus:border-cream/50"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-cool-gray text-xs tracking-[0.1em] uppercase mb-2 block font-['Inter']">
                        Phone (Optional)
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        placeholder="(555) 555-5555"
                        className="w-full px-4 py-3 bg-dark-bg border border-white/10 rounded-sm text-warm-beige placeholder-cool-gray/50 font-['Inter'] text-sm focus:outline-none focus:border-cream/50"
                      />
                    </div>
                    <div>
                      <label className="text-cool-gray text-xs tracking-[0.1em] uppercase mb-2 block font-['Inter']">
                        Wedding Date
                      </label>
                      <input
                        type="text"
                        name="wedding-date"
                        placeholder="yyyy-mm-dd"
                        className="w-full px-4 py-3 bg-dark-bg border border-white/10 rounded-sm text-warm-beige placeholder-cool-gray/50 font-['Inter'] text-sm focus:outline-none focus:border-cream/50"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-cool-gray text-xs tracking-[0.1em] uppercase mb-2 block font-['Inter']">
                      Venue / Location
                    </label>
                    <input
                      type="text"
                      name="venue"
                      placeholder="Venue name, city"
                      className="w-full px-4 py-3 bg-dark-bg border border-white/10 rounded-sm text-warm-beige placeholder-cool-gray/50 font-['Inter'] text-sm focus:outline-none focus:border-cream/50"
                    />
                  </div>

                  <div>
                    <label className="text-cool-gray text-xs tracking-[0.1em] uppercase mb-2 block font-['Inter']">
                      Anything else you'd like to share
                    </label>
                    <textarea
                      name="message"
                      placeholder="Guest count, vibe, anything that matters to you..."
                      rows={4}
                      className="w-full px-4 py-3 bg-dark-bg border border-white/10 rounded-sm text-warm-beige placeholder-cool-gray/50 font-['Inter'] text-sm focus:outline-none focus:border-cream/50 resize-none"
                    />
                  </div>

                  <div className="g-recaptcha" data-sitekey="6LfQovEqAAAAABN5jQ7gDmJzVWi6KXB7DBnYKRlv"></div>

                  <button
                    type="submit"
                    className="w-full bg-warm-beige text-dark-bg px-6 py-3 text-sm tracking-[0.1em] uppercase font-medium font-['Inter'] rounded-sm hover:bg-cream transition-colors duration-300"
                  >
                    Send Details
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>

        <div className="pt-12 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-cool-gray text-xs font-['Inter']">
              {footerCopyright}
            </div>
            <button
              onClick={scrollToTop}
              className="text-warm-beige text-xs tracking-[0.1em] uppercase font-['Inter'] hover:text-cream transition-colors cursor-pointer"
            >
              {siteName}
            </button>
            <SocialIcons socialLinks={siteSettings?.socialLinks || []} />
          </div>
        </div>
      </div>
    </footer>
  );
}