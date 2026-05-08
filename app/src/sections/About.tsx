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
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(imageRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
        opacity: 0,
        x: -40,
        duration: 1.2,
        ease: 'power3.out',
      });
      gsap.from(textRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
        opacity: 0,
        y: 40,
        duration: 1.2,
        delay: 0.2,
        ease: 'power3.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const title = data?.title || 'Your Wedding Day,\nOur Passion';
  const imageUrl = data?.imageUrl || '/couple.jpg';
  const paragraphs = data?.paragraphs || [
    { _key: '1', _type: 'paragraph', text: 'We are Christian and Monique Breier. We specialize in providing exceptional videography services that capture the essence of your wedding day and help you cherish those beautiful moments forever.' },
    { _key: '2', _type: 'paragraph', text: 'Your wedding day is one of the most important days of your life, and it deserves to be captured in a way that you can relive those moments whenever you want. That\'s where our professional videography services come in.' },
    { _key: '3', _type: 'paragraph', text: 'We understand that every couple is unique, and we strive to personalize our services to meet your specific needs and preferences. We offer a range of videography packages that cater to different budgets, styles, and requirements.' },
    { _key: '4', _type: 'paragraph', text: 'At WeddingsByChristian, we use only the latest equipment and techniques to ensure that your videos are of the highest quality. We believe that the best videography is one that tells a story, and that\'s exactly what we aim to do with every project we take on.' },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="w-full py-24 md:py-32 px-6 md:px-10 bg-dark-bg"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          <div ref={imageRef} className="relative">
            <div className="aspect-[4/5] overflow-hidden rounded-sm">
              <img
                src={imageUrl}
                alt="Christian and Monique Breier"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 w-32 h-32 border border-cream/20 rounded-sm -z-10" />
          </div>
          <div ref={textRef}>
            <span className="text-cool-gray text-xs tracking-[0.1em] uppercase font-['Inter']">
              About Us
            </span>
            <h2 className="text-warm-beige text-3xl md:text-4xl lg:text-5xl mt-4 mb-6 leading-[1.1]" style={{ whiteSpace: 'pre-line' }}>
              {title}
            </h2>
            <div className="space-y-4 text-muted-foreground text-base md:text-lg leading-relaxed font-['Inter']">
              {paragraphs.map((p) => (
                <p key={p._key}>{p.text}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}