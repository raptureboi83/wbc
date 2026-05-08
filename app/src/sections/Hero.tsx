import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import type { HeroSection } from '@/lib/types'

interface HeroProps {
  data: HeroSection | null
}

export default function Hero({ data }: HeroProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLSpanElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const ctaRef = useRef<HTMLAnchorElement>(null)

  const backgroundImage = data?.backgroundImageUrl || '/hero.jpg'
  const headline = data?.headline || 'Capturing\nYour Forever'
  const subtext = data?.subtext || 'A Love Story'

  const buttonLabel = data?.buttonLabel?.trim() ?? ''
  const buttonUrl = data?.buttonUrl?.trim() ?? ''
  const showCta = buttonLabel !== ''
  const finalButtonUrl = buttonUrl !== '' ? buttonUrl : '#films'
  const isExternalLink = finalButtonUrl.startsWith('http')

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(labelRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 0.3,
        ease: 'power3.out',
      })

      gsap.to(headingRef.current, {
        opacity: 1,
        y: 0,
        duration: 1.2,
        delay: 0.5,
        ease: 'power3.out',
      })

      if (showCta && ctaRef.current) {
        gsap.fromTo(
          ctaRef.current,
          { opacity: 0, y: 16 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            delay: 0.8,
            ease: 'power3.out',
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [showCta, buttonLabel, finalButtonUrl])

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden"
    >
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/60 via-transparent to-transparent" />

      <div className="relative z-10 h-full flex flex-col justify-end px-6 md:px-10 pb-16 md:pb-20">
        <span
          ref={labelRef}
          className="text-warm-beige text-xs tracking-[0.1em] uppercase font-['Inter'] opacity-0 translate-y-4 mb-4"
        >
          {subtext}
        </span>

        <h1
          ref={headingRef}
          className="text-warm-beige text-5xl md:text-7xl lg:text-8xl leading-[1.0] tracking-[0.04em] max-w-3xl opacity-0 translate-y-8"
          style={{ whiteSpace: 'pre-line' }}
        >
          {headline}
        </h1>

        {showCta && (
          <a
            href={finalButtonUrl}
            target={isExternalLink ? '_blank' : undefined}
            rel={isExternalLink ? 'noopener noreferrer' : undefined}
            className="absolute bottom-16 md:bottom-20 right-6 md:right-10 flex items-center gap-3 cursor-pointer group"
            ref={ctaRef}
          >
            <span className="text-warm-beige text-sm tracking-wide font-['Inter'] underline underline-offset-4 decoration-warm-beige/50 group-hover:decoration-warm-beige transition-colors">
              {buttonLabel}
            </span>
            <div className="w-8 h-8 rounded-full border border-warm-beige/50 flex items-center justify-center group-hover:border-warm-beige transition-colors">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-warm-beige">
                <path d="M3 2L9 6L3 10V2Z" fill="currentColor" />
              </svg>
            </div>
          </a>
        )}
      </div>
    </section>
  )
}