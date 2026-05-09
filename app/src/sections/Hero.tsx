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

  const backgroundImage = data?.backgroundImageUrl?.trim() ?? ''
  const headline = data?.headline || 'Capturing\nYour Forever'
  const subtext = data?.subtext || 'A Love Story'

  const buttonLabel = data?.buttonLabel?.trim() ?? ''
  const buttonUrl = data?.buttonUrl?.trim() ?? ''
  const showCta = buttonLabel !== ''
  const finalButtonUrl = buttonUrl !== '' ? buttonUrl : '#films'
  const isExternalLink = finalButtonUrl.startsWith('http')

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (labelRef.current) {
        gsap.to(labelRef.current, {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: 0.3,
          ease: 'power3.out',
        })
      }

      if (headingRef.current) {
        gsap.to(headingRef.current, {
          opacity: 1,
          y: 0,
          duration: 1.2,
          delay: 0.5,
          ease: 'power3.out',
        })
      }

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
      className="relative h-screen w-full overflow-hidden bg-dark-bg"
    >
      {backgroundImage && (
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url("${backgroundImage}")` }}
        />
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/60 via-transparent to-transparent" />

      <div className="relative z-10 flex h-full flex-col justify-end px-6 pb-16 md:px-10 md:pb-20">
        <span
          ref={labelRef}
          className="mb-4 translate-y-4 font-['Inter'] text-xs uppercase tracking-[0.1em] text-warm-beige opacity-0"
        >
          {subtext}
        </span>

        <h1
          ref={headingRef}
          className="max-w-3xl translate-y-8 text-5xl leading-[1.0] tracking-[0.04em] text-warm-beige opacity-0 md:text-7xl lg:text-8xl"
          style={{ whiteSpace: 'pre-line' }}
        >
          {headline}
        </h1>

        {showCta && (
          <a
            href={finalButtonUrl}
            target={isExternalLink ? '_blank' : undefined}
            rel={isExternalLink ? 'noopener noreferrer' : undefined}
            className="group absolute bottom-16 right-6 flex cursor-pointer items-center gap-3 md:bottom-20 md:right-10"
            ref={ctaRef}
          >
            <span className="font-['Inter'] text-sm tracking-wide text-warm-beige underline underline-offset-4 decoration-warm-beige/50 transition-colors group-hover:decoration-warm-beige">
              {buttonLabel}
            </span>
            <div className="flex h-8 w-8 items-center justify-center rounded-full border border-warm-beige/50 transition-colors group-hover:border-warm-beige">
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