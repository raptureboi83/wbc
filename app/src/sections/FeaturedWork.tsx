import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { Film } from '@/lib/types';

gsap.registerPlugin(ScrollTrigger);

interface FeaturedWorkProps {
  films: Film[];
  mode: 'home' | 'all';
}

export default function FeaturedWork({ films, mode }: FeaturedWorkProps) {
  const navigate = useNavigate();
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const [activeFilm, setActiveFilm] = useState<Film | null>(null);

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

      const cards = gridRef.current?.querySelectorAll('.film-card');
      if (cards) {
        gsap.from(cards, {
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 75%',
          },
          opacity: 0,
          y: 60,
          duration: 1,
          stagger: 0.15,
          ease: 'power3.out',
        });
      }

      if (buttonRef.current) {
        gsap.from(buttonRef.current, {
          scrollTrigger: {
            trigger: buttonRef.current,
            start: 'top 90%',
          },
          opacity: 0,
          y: 20,
          duration: 1,
          ease: 'power3.out',
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [films]);

  return (
    <>
      <section
        id="films"
        ref={sectionRef}
        className="w-full py-24 md:py-32 px-6 md:px-10 bg-dark-bg"
      >
        <div className="max-w-7xl mx-auto">
          <div ref={headerRef} className="mb-16">
            <span className="text-cool-gray text-xs tracking-[0.1em] uppercase font-['Inter']">
              {mode === 'home' ? 'Selected Work' : 'Cinematography'}
            </span>
            <h2 className="text-warm-beige text-3xl md:text-4xl lg:text-5xl mt-4 leading-[1.1]">
              {mode === 'home' ? 'Featured Films' : 'All Films'}
            </h2>
          </div>

          <div
            ref={gridRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10"
          >
            {films.map((film) => (
              <div
                key={film._id}
                className="film-card group cursor-pointer"
                onClick={() => setActiveFilm(film)}
              >
                <div className="aspect-[16/9] overflow-hidden rounded-sm relative bg-elevated-bg">
                  {film.posterUrl ? (
                    <img
                      src={film.posterUrl}
                      alt={film.posterAlt || film.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full bg-elevated-bg" />
                  )}

                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />

                  <div className="absolute inset-x-0 bottom-0 p-5 md:p-6 bg-gradient-to-t from-black/80 via-black/35 to-transparent">
                    <h3 className="text-warm-beige text-lg md:text-xl font-light tracking-wide">
                      {film.title}
                    </h3>
                  </div>

                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-12 h-12 rounded-full border border-white/50 flex items-center justify-center backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="white">
                        <path d="M4 3l9 5-9 5V3z" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="mt-5">
                  <div className="flex flex-col gap-2">
                    {film.eventDate && (
                      <p className="text-cool-gray text-xs uppercase tracking-[0.1em] font-['Inter']">
                        {film.eventDate}
                      </p>
                    )}

                    {film.location && (
                      <p className="text-cool-gray text-xs uppercase tracking-[0.1em] font-['Inter']">
                        {film.location}
                      </p>
                    )}

                    {mode === 'all' && film.blurb && (
                      <p className="text-muted-foreground text-sm md:text-base leading-relaxed font-['Inter'] mt-2">
                        {film.blurb}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {mode === 'home' && (
            <div ref={buttonRef} className="mt-20 flex justify-center">
              <button
                onClick={() => navigate('/films')}
                className="group flex flex-col items-center gap-4 text-warm-beige text-xs tracking-[0.2em] uppercase font-['Inter']"
              >
                <span className="border-b border-warm-beige/30 pb-1 group-hover:border-warm-beige transition-colors">
                  See More Films
                </span>
                <div className="w-px h-12 bg-gradient-to-b from-warm-beige/50 to-transparent transition-all group-hover:h-16" />
              </button>
            </div>
          )}
        </div>
      </section>

      {activeFilm && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 bg-black/95 backdrop-blur-sm"
          onClick={() => setActiveFilm(null)}
        >
          <div
            className="relative w-full max-w-6xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setActiveFilm(null)}
              className="absolute -top-12 right-0 text-warm-beige text-sm uppercase tracking-[0.1em] font-['Inter'] hover:text-cream transition-colors"
            >
              Close
            </button>

            <div className="bg-black rounded-sm overflow-hidden shadow-2xl">
              <video
                key={activeFilm.videoUrl}
                controls
                autoPlay
                playsInline
                preload="metadata"
                poster={activeFilm.posterUrl}
                className="w-full h-auto max-h-[80vh] bg-black"
              >
                <source src={activeFilm.videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>

            <div className="mt-6">
              <h3 className="text-warm-beige text-2xl md:text-3xl font-light">
                {activeFilm.title}
              </h3>

              <div className="mt-2 flex flex-col gap-1">
                {activeFilm.eventDate && (
                  <p className="text-cool-gray text-sm md:text-base font-['Inter']">
                    {activeFilm.eventDate}
                  </p>
                )}

                {activeFilm.location && (
                  <p className="text-cool-gray text-sm md:text-base font-['Inter']">
                    {activeFilm.location}
                  </p>
                )}
              </div>

              {activeFilm.blurb && (
                <p className="text-muted-foreground text-sm md:text-base mt-4 max-w-3xl leading-relaxed font-['Inter']">
                  {activeFilm.blurb}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}