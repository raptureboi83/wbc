import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { VendorCategory } from '@/lib/types';

gsap.registerPlugin(ScrollTrigger);

interface VendorsProps {
  vendorCategories: VendorCategory[];
}

export default function Vendors({ vendorCategories }: VendorsProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const [visibleCategoryCount, setVisibleCategoryCount] = useState(1);

  useEffect(() => {
    setVisibleCategoryCount(1);
  }, [vendorCategories]);

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

      const categories = listRef.current?.querySelectorAll('.vendor-category');
      if (categories) {
        gsap.from(categories, {
          scrollTrigger: {
            trigger: listRef.current,
            start: 'top 75%',
          },
          opacity: 0,
          y: 40,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [vendorCategories, visibleCategoryCount]);

  const visibleCategories = vendorCategories.slice(0, visibleCategoryCount);
  const hasMoreCategories = visibleCategoryCount < vendorCategories.length;

  return (
<section
  id="vendors"
  ref={sectionRef}
  className="scroll-mt-24 w-full py-24 md:py-32 px-6 md:px-10"
  style={{ backgroundColor: '#202020' }}
>
      <div className="max-w-6xl mx-auto">
        <div ref={headerRef} className="text-center mb-16 md:mb-20">
          <span className="text-cool-gray text-xs tracking-[0.1em] uppercase font-['Inter']">
            Partners
          </span>
          <h2 className="text-warm-beige text-3xl md:text-4xl lg:text-5xl mt-4 leading-[1.1]">
            Our Preferred Vendors
          </h2>
          <p className="text-muted-foreground mt-6 max-w-2xl mx-auto font-['Inter']">
            If you would like to connect with anyone, please click their name for a website.
          </p>
        </div>

        <div ref={listRef} className="space-y-8">
          {visibleCategories.map((category) => (
            <div key={category._id} className="vendor-category">
              <h3 className="text-cream text-lg md:text-xl mb-4 pb-2 border-b border-white/10">
                {category.name}
              </h3>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {(category.vendors ?? []).map((vendor, idx) => (
                  <div
                    key={idx}
                    className="p-4 border border-white/5 rounded-sm hover:border-cream/20 transition-colors"
                  >
                    <h4 className="text-warm-beige text-sm font-medium mb-1 font-['Inter']">
                      {vendor.website ? (
                        <a
                          href={vendor.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-cream transition-colors"
                        >
                          {vendor.name}
                        </a>
                      ) : (
                        vendor.name
                      )}
                    </h4>

                    {vendor.phone && (
                      <p className="text-cool-gray text-xs mb-2 font-['Inter']">
                        {vendor.phone}
                      </p>
                    )}

                    {vendor.description && (
                      <p className="text-muted-foreground text-xs leading-relaxed font-['Inter']">
                        {vendor.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {hasMoreCategories && (
          <div className="mt-16 flex justify-center">
            <button
              type="button"
              onClick={() => setVisibleCategoryCount((prev) => prev + 1)}
              className="group flex flex-col items-center gap-4 text-warm-beige text-xs tracking-[0.2em] uppercase font-['Inter']"
            >
              <span className="border-b border-warm-beige/30 pb-1 group-hover:border-warm-beige transition-colors">
                See More Vendors
              </span>
              <div className="w-px h-12 bg-gradient-to-b from-warm-beige/50 to-transparent transition-all group-hover:h-16" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}