import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { AboutSection } from '@/lib/types';

gsap.registerPlugin(ScrollTrigger);

interface AboutProps {
  data: AboutSection | null;
}

export default function About({ data }: AboutProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(contentRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
        opacity: 0,
        x: -40,
        duration: 1.2,
        ease: 'power3.out',
      });

      gsap.from(imageRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
        opacity: 0,
        x: 40,
        duration: 1.2,
        ease: 'power3.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const title = data?.title || 'About';

  const fallbackParagraphs = [
    'We create wedding films with an editorial eye and an honest, unobtrusive approach.',
    'Our focus is on atmosphere, connection, and the details that make the day feel like yours.',
  ];

  const paragraphs =
    data?.paragraphs?.length ? data.paragraphs : fallbackParagraphs;

  const imageUrl = data?.imageUrl;

  return (
<section
  id="about"
  ref={sectionRef}
  className="scroll-mt-24 w-full py-24 md:py-32 px-6 md:px-10"
  style={{ backgroundColor: '#111111' }}
>
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
        <div ref={contentRef}>
          <span className="text-cool-gray text-xs tracking-[0.1em] uppercase font-['Inter']">
            About
          </span>
          <h2 className="text-warm-beige text-3xl md:text-4xl lg:text-5xl mt-4 leading-[1.1]">
            {title}
          </h2>

          <div className="mt-8 space-y-6">
            {paragraphs.map((paragraph, index) => {
              const text =
                typeof paragraph === 'string'
                  ? paragraph
                  : paragraph?.text || '';

              if (!text) return null;

              return (
                <p
                  key={typeof paragraph === 'string' ? index : paragraph._key || index}
                  className="text-muted-foreground text-sm md:text-base leading-relaxed font-['Inter']"
                >
                  {text}
                </p>
              );
            })}
          </div>
        </div>

        <div ref={imageRef}>
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-[500px] object-cover"
            />
          ) : (
            <div className="w-full h-[500px] bg-elevated-bg" />
          )}
        </div>
      </div>
    </section>
  );
}