import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { Testimonial } from '@/lib/types';

gsap.registerPlugin(ScrollTrigger);

interface TestimonialsProps {
  testimonials: Testimonial[];
}

export default function Testimonials({ testimonials }: TestimonialsProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const visibleTestimonials = isExpanded ? testimonials : testimonials.slice(0, 3);

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

      const cards = gridRef.current?.querySelectorAll('.testimonial-card');
      if (cards) {
        gsap.from(cards, {
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 75%',
          },
          opacity: 0,
          y: 50,
          duration: 1,
          stagger: 0.1,
          ease: 'power3.out',
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [visibleTestimonials]);

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="w-full py-24 md:py-32 px-6 md:px-10 bg-elevated-bg"
    >
      <div className="max-w-7xl mx-auto">
        <div ref={headerRef} className="text-center mb-20">
          <span className="text-cool-gray text-xs tracking-[0.1em] uppercase font-['Inter']">
            Kind Words
          </span>
          <h2 className="text-warm-beige text-3xl md:text-4xl lg:text-5xl mt-4 leading-[1.1]">
            What Clients Are Saying
          </h2>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {visibleTestimonials.map((t) => (
            <div
              key={t._id}
              className="testimonial-card p-8 md:p-10 border border-white/5 rounded-sm bg-dark-bg/30 flex flex-col justify-between"
            >
              <div>
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="text-cream/20 mb-6">
                  <path d="M10 18C10 18 8 18 8 14C8 10 10 8 10 8C6 8 4 11 4 16C4 21 6 24 10 24C12 24 14 22 14 20C14 18 12 16 10 16V18ZM22 18C22 18 20 18 20 14C20 10 22 8 22 8C18 8 16 11 16 16C16 21 18 24 22 24C24 24 26 22 26 20C26 18 24 16 22 16V18Z" fill="currentColor"/>
                </svg>
                <p className="text-warm-beige/90 text-base md:text-lg italic leading-relaxed font-['Playfair_Display']">
                  "{t.quote}"
                </p>
              </div>
              <div className="mt-8 pt-6 border-t border-white/5">
                <h4 className="text-warm-beige text-sm tracking-wide">{t.name}</h4>
                <p className="text-cool-gray text-xs uppercase tracking-wider mt-1 font-['Inter']">
                  {t.role}
                </p>
              </div>
            </div>
          ))}
        </div>

        {!isExpanded && testimonials.length > 3 && (
          <div className="mt-16 flex justify-center">
            <button
              onClick={() => setIsExpanded(true)}
              className="group flex flex-col items-center gap-4 text-warm-beige text-xs tracking-[0.2em] uppercase font-['Inter']"
            >
              <span className="border-b border-warm-beige/30 pb-1 group-hover:border-warm-beige transition-colors">
                See More Kind Words
              </span>
              <div className="w-px h-12 bg-gradient-to-b from-warm-beige/50 to-transparent transition-all group-hover:h-16" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}