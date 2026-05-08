import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

type PackageBox = {
  _key: string
  _type: 'packageBox'
  title?: string
  price?: string
  description?: string
  features?: string[]
}

type FullSpanBox = {
  _key: string
  _type: 'fullSpanBox'
  title?: string
  items?: string[]
}

type PackageItem = PackageBox | FullSpanBox

interface PackagesProps {
  packages: PackageItem[]
}

export default function Packages({ packages }: PackagesProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

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
      })

      const cards = cardsRef.current?.querySelectorAll('.package-card')
      if (cards) {
        gsap.from(cards, {
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 75%',
          },
          opacity: 0,
          y: 60,
          duration: 1,
          stagger: 0.15,
          ease: 'power3.out',
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [packages])

  return (
    <section
      id="packages"
      ref={sectionRef}
      className="scroll-mt-24 w-full py-24 md:py-32 px-6 md:px-10"
      style={{ backgroundColor: '#111111' }}
    >
      <div className="max-w-7xl mx-auto">
        <div ref={headerRef} className="text-center mb-16">
          <span className="text-cool-gray text-xs tracking-[0.1em] uppercase font-['Inter']">
            Services
          </span>
          <h2 className="text-warm-beige text-3xl md:text-4xl lg:text-5xl mt-4 leading-[1.1]">
            Wedding Film Collections
          </h2>
        </div>

        <div
          ref={cardsRef}
          className="flex flex-wrap justify-center gap-8 md:gap-10"
        >
          {packages.map((pkg) => {
            if (pkg._type === 'fullSpanBox') {
              return (
                <div
                  key={pkg._key}
                  className="package-card w-full max-w-[1120px] mx-auto"
                >
                  <div className="border border-white/10 p-8 md:p-10 bg-dark-bg/40">
                    <h3 className="text-warm-beige text-2xl md:text-3xl font-light mb-8">
                      {pkg.title}
                    </h3>

                    {pkg.items?.length ? (
                      <ul className="space-y-3">
                        {pkg.items.map((item, index) => (
                          <li
                            key={index}
                            className="text-warm-beige text-sm md:text-base font-['Inter'] flex items-start gap-3"
                          >
                            <span className="text-cool-gray mt-[2px]">+</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                </div>
              )
            }

            return (
              <div
                key={pkg._key}
                className="package-card w-full md:w-[calc(50%-1.25rem)] max-w-[540px]"
              >
                <div className="border border-white/10 p-8 md:p-10 bg-dark-bg/40 h-full">
                  <div className="flex items-start justify-between gap-6 mb-8">
                    <div>
                      <h3 className="text-warm-beige text-2xl md:text-3xl font-light">
                        {pkg.title}
                      </h3>
                      {pkg.price && (
                        <p className="text-cool-gray text-sm uppercase tracking-[0.1em] mt-3 font-['Inter']">
                          {pkg.price}
                        </p>
                      )}
                    </div>
                  </div>

                  {pkg.description && (
                    <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-8 font-['Inter']">
                      {pkg.description}
                    </p>
                  )}

                  {pkg.features?.length ? (
                    <ul className="space-y-3">
                      {pkg.features.map((feature, index) => (
                        <li
                          key={index}
                          className="text-warm-beige text-sm md:text-base font-['Inter'] flex items-start gap-3"
                        >
                          <span className="text-cool-gray mt-[2px]">+</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}