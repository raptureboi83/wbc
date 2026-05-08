import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { Package } from '@/lib/types';

gsap.registerPlugin(ScrollTrigger);

interface PackagesProps {
  packages: Package[];
}

export default function Packages({ packages: packagesData }: PackagesProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headerRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
        opacity: 0,
        y: 40,
        duration: 1.2,
        ease: 'power3.out',
      });

      const cards = cardsRef.current?.querySelectorAll('.package-card');
      if (cards) {
        gsap.from(cards, {
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 75%',
          },
          opacity: 0,
          y: 60,
          duration: 1,
          stagger: 0.2,
          ease: 'power3.out',
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [packagesData]);

  return (
    <section
      id="packages"
      ref={sectionRef}
      className="w-full py-24 md:py-32 px-6 md:px-10 bg-elevated-bg"
    >
      <div className="max-w-6xl mx-auto">
        <div ref={headerRef} className="text-center mb-16 md:mb-20">
          <span className="text-cool-gray text-xs tracking-[0.1em] uppercase font-['Inter']">
            Services
          </span>
          <h2 className="text-warm-beige text-3xl md:text-4xl lg:text-5xl mt-4 leading-[1.1]">
            Choose a Package That's<br />Right for Your Special Day
          </h2>
          <p className="text-muted-foreground mt-6 max-w-2xl mx-auto font-['Inter']">
            With two set and available custom packages to choose from, your special day can be captured no matter what your budget is. We can also develop additional custom packages together to suit your needs.
          </p>
        </div>

        <div ref={cardsRef} className="grid md:grid-cols-2 gap-6 md:gap-8 justify-center">
          {packagesData.map((pkg) => (
            <div
              key={pkg._id}
              className="package-card p-8 md:p-10 rounded-sm border border-white/10 bg-dark-bg/50"
            >
              <div className="flex items-baseline justify-between mb-4">
                <h3 className="text-warm-beige text-xl md:text-2xl">{pkg.title}</h3>
                <span className="text-cream text-2xl md:text-3xl font-['Playfair_Display']">{pkg.price}</span>
              </div>
              <p className="text-muted-foreground text-sm mb-6 font-['Inter']">{pkg.description}</p>
              <ul className="space-y-3">
                {(pkg.features ?? []).map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-warm-beige/80 text-sm font-['Inter']">
                    <span className="text-cream mt-1">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M2 7L5.5 10.5L12 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}