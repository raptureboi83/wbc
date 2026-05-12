import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { ContactSection, SiteSettings } from '@/lib/types'
import SocialIcons from '@/components/socialIcons'

declare global {
  interface Window {
    grecaptcha?: {
      reset: () => void
    }
  }
}

gsap.registerPlugin(ScrollTrigger)

interface ContactProps {
  data: ContactSection | null
  siteSettings: SiteSettings | null
  showIntro?: boolean
}

export default function Contact({
  data,
  siteSettings,
  showIntro = true,
}: ContactProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [formVisible, setFormVisible] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState('')

  useEffect(() => {
    const ctx = gsap.context(() => {
      const section = sectionRef.current
      const content = contentRef.current

      if (section && content) {
        gsap.from(content, {
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
          },
          opacity: 0,
          y: 40,
          duration: 1.2,
          ease: 'power3.out',
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [data])

  useEffect(() => {
    if (formVisible && !document.getElementById('recaptcha-script')) {
      const script = document.createElement('script')
      script.id = 'recaptcha-script'
      script.src = 'https://www.google.com/recaptcha/api.js'
      script.async = true
      script.defer = true
      document.body.appendChild(script)
    }
  }, [formVisible])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError('')

    const form = e.currentTarget
    const formData = new FormData(form)

    try {
      const response = await fetch('https://formspree.io/f/mqenevqw', {
        method: 'POST',
        body: formData,
        headers: {
          Accept: 'application/json',
        },
      })

      if (response.ok) {
        form.reset()
        setSubmitSuccess(true)

        if (window.grecaptcha) {
          window.grecaptcha.reset()
        }
      } else {
        const result = await response.json()
        if (result?.errors?.length) {
          setSubmitError(
            result.errors.map((err: { message: string }) => err.message).join(', ')
          )
        } else {
          setSubmitError('Something went wrong. Please try again.')
        }
      }
    } catch {
      setSubmitError('Network error. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const headline = data?.headline || 'Ready to talk about your wedding film?'
  const subtext =
    data?.subtext ||
    "Tell me a bit about your day, and I'll let you know my availability, pricing options, and what I can suggest based on your plans. No pressure, no hard sell."
  const email = data?.email || 'better2b@rogers.com'
  const phone = data?.phone || '(705) 734-9971'
  const basedIn = data?.basedIn || 'Barrie, Ontario, Canada'
  const buttonLabel = data?.buttonLabel || 'Email about your date'
  const helperText =
    data?.helperText ||
    'Include your wedding date, venue, and anything you already know about timing. You can also email directly if you prefer.'
  const footerCopyright = data?.footerCopyright || '© 2026 Weddings By Christian'

  const siteName = siteSettings?.siteName || 'Weddings By Christian'

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const contactCard = (
    <div className="rounded-sm border border-white/10 bg-elevated-bg/60 p-6 md:p-8">
      <div className="mb-6 space-y-4">
        <div>
          <div className="mb-1 font-['Inter'] text-xs uppercase tracking-[0.1em] text-cool-gray">
            Email
          </div>
          <a
            href={`mailto:${email}`}
            className="font-['Inter'] text-base text-warm-beige transition-colors hover:text-cream"
          >
            {email}
          </a>
        </div>

        <div>
          <div className="mb-1 font-['Inter'] text-xs uppercase tracking-[0.1em] text-cool-gray">
            Phone
          </div>
          <a
            href={`tel:${phone.replace(/\D/g, '')}`}
            className="font-['Inter'] text-base text-warm-beige transition-colors hover:text-cream"
          >
            {phone}
          </a>
        </div>

        <div>
          <div className="mb-1 font-['Inter'] text-xs uppercase tracking-[0.1em] text-cool-gray">
            Based In
          </div>
          <div className="font-['Inter'] text-base text-warm-beige">
            {basedIn}
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={() => setFormVisible(!formVisible)}
        className="block w-full rounded-sm bg-cream px-6 py-4 text-center font-['Inter'] text-sm uppercase tracking-[0.1em] text-dark-bg transition-colors duration-300 hover:bg-warm-beige"
      >
        {buttonLabel}
      </button>

      <p className="mt-4 font-['Inter'] text-xs leading-relaxed text-cool-gray">
        {helperText}
      </p>

      {formVisible && (
        <div className="mt-6 border-t border-white/10 pt-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block font-['Inter'] text-xs uppercase tracking-[0.1em] text-cool-gray">
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Jane & Alex"
                  required
                  className="w-full rounded-sm border border-white/10 bg-dark-bg px-4 py-3 font-['Inter'] text-sm text-warm-beige placeholder-cool-gray/50 focus:border-cream/50 focus:outline-none"
                />
              </div>
              <div>
                <label className="mb-2 block font-['Inter'] text-xs uppercase tracking-[0.1em] text-cool-gray">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="you@email.com"
                  required
                  className="w-full rounded-sm border border-white/10 bg-dark-bg px-4 py-3 font-['Inter'] text-sm text-warm-beige placeholder-cool-gray/50 focus:border-cream/50 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block font-['Inter'] text-xs uppercase tracking-[0.1em] text-cool-gray">
                  Phone (Optional)
                </label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="(555) 555-5555"
                  className="w-full rounded-sm border border-white/10 bg-dark-bg px-4 py-3 font-['Inter'] text-sm text-warm-beige placeholder-cool-gray/50 focus:border-cream/50 focus:outline-none"
                />
              </div>
              <div>
                <label className="mb-2 block font-['Inter'] text-xs uppercase tracking-[0.1em] text-cool-gray">
                  Wedding Date
                </label>
                <input
                  type="text"
                  name="wedding-date"
                  placeholder="yyyy-mm-dd"
                  className="w-full rounded-sm border border-white/10 bg-dark-bg px-4 py-3 font-['Inter'] text-sm text-warm-beige placeholder-cool-gray/50 focus:border-cream/50 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block font-['Inter'] text-xs uppercase tracking-[0.1em] text-cool-gray">
                Venue / Location
              </label>
              <input
                type="text"
                name="venue"
                placeholder="Venue name, city"
                className="w-full rounded-sm border border-white/10 bg-dark-bg px-4 py-3 font-['Inter'] text-sm text-warm-beige placeholder-cool-gray/50 focus:border-cream/50 focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-2 block font-['Inter'] text-xs uppercase tracking-[0.1em] text-cool-gray">
                Anything else you'd like to share
              </label>
              <textarea
                name="message"
                placeholder="Guest count, vibe, anything that matters to you..."
                rows={4}
                className="w-full resize-none rounded-sm border border-white/10 bg-dark-bg px-4 py-3 font-['Inter'] text-sm text-warm-beige placeholder-cool-gray/50 focus:border-cream/50 focus:outline-none"
              />
            </div>

            <div
              className="g-recaptcha"
              data-sitekey="6LdWReAsAAAAADAUoZRvyWJs5VPTKZ1TcmymE_xK"
            ></div>

            {submitSuccess ? (
              <div className="w-full rounded-sm border border-green-500/30 bg-green-500/10 px-6 py-4 text-center font-['Inter'] text-sm tracking-[0.05em] text-warm-beige">
                Thanks. Your message has been sent.
              </div>
            ) : (
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-sm bg-warm-beige px-6 py-3 font-['Inter'] text-sm uppercase tracking-[0.1em] text-dark-bg transition-colors duration-300 hover:bg-cream disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? 'Sending...' : 'Send Details'}
              </button>
            )}

            {submitError && (
              <p className="font-['Inter'] text-sm text-red-300">
                {submitError}
              </p>
            )}
          </form>
        </div>
      )}
    </div>
  )

  return (
    <footer
      id="contact"
      ref={sectionRef}
      className={`scroll-mt-24 w-full px-6 md:px-10 ${
        showIntro ? 'py-24 md:py-32' : 'bg-dark-bg pt-8 pb-24 md:pt-10 md:pb-32'
      }`}
    >
      <div ref={contentRef} className="mx-auto max-w-6xl">
        {showIntro ? (
          <div className="mb-24 grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <span className="font-['Inter'] text-xs uppercase tracking-[0.1em] text-cool-gray">
                Contact
              </span>
              <h2 className="mt-4 mb-6 text-3xl leading-[1.1] text-warm-beige md:text-4xl lg:text-5xl">
                {headline}
              </h2>
              <p className="font-['Inter'] text-base leading-relaxed text-muted-foreground md:text-lg">
                {subtext}
              </p>
            </div>

            <div>{contactCard}</div>
          </div>
        ) : (
          <div className="mb-24">
            <div className="max-w-3xl">
              {contactCard}
            </div>
          </div>
        )}

        <div className="border-t border-white/10 pt-12">
          <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-3">
            <div className="text-center md:text-left">
              <a
                href="https://wbc.sanity.studio/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-['Inter'] text-xs text-cool-gray transition-colors hover:text-warm-beige"
              >
                {footerCopyright}
              </a>
            </div>

            <div className="text-center">
              <button
                onClick={scrollToTop}
                className="cursor-pointer font-['Inter'] text-xs uppercase tracking-[0.1em] text-warm-beige transition-colors hover:text-cream"
              >
                {siteName}
              </button>
            </div>

            <div className="flex justify-center md:justify-end">
              <SocialIcons socialLinks={siteSettings?.socialLinks || []} />
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}