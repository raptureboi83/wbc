import { useEffect, useState } from 'react'
import { client } from '@/lib/sanity.client'
import { contactSectionQuery, siteSettingsQuery } from '@/lib/queries'
import type { ContactSection, SiteSettings } from '@/lib/types'

import Navbar from '@/sections/Navbar'
import Contact from '@/sections/Contact'

export default function ContactPage() {
  const [contactData, setContactData] = useState<ContactSection | null>(null)
  const [siteSettings, setSiteSettings] = useState<SiteSettings | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [contactSection, settings] = await Promise.all([
          client.fetch(contactSectionQuery),
          client.fetch(siteSettingsQuery),
        ])

        setContactData(contactSection)
        setSiteSettings(settings)
      } catch (error) {
        console.error('Error fetching contact page data:', error)
      }
    }

    fetchData()
  }, [])

  return (
    <div className="min-h-screen bg-dark-bg text-foreground">
      <Navbar siteSettings={siteSettings} />

      <main className="pt-20 bg-dark-bg">
        <section className="relative overflow-hidden bg-dark-bg px-6 pb-6 pt-20 md:px-10 md:pb-8 md:pt-28">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute left-1/2 top-0 h-[30rem] w-[70rem] -translate-x-1/2 rounded-full bg-warm-beige/5 blur-3xl" />
          </div>

          <div className="relative mx-auto max-w-6xl">
            <div className="max-w-4xl">
              <p className="mb-4 font-['Inter'] text-xs uppercase tracking-[0.3em] text-cool-gray">
                Contact
              </p>

              <h1 className="text-4xl leading-[0.95] text-warm-beige md:text-6xl lg:text-7xl">
                Let’s talk about your wedding film
              </h1>

              <p className="mt-6 max-w-2xl font-['Inter'] text-base leading-relaxed text-cool-gray md:text-lg">
                Share a few details about your day and I’ll let you know
                availability, pricing, and what I’d suggest based on your plans.
              </p>
            </div>
          </div>
        </section>

        <Contact
          data={contactData}
          siteSettings={siteSettings}
          showIntro={false}
        />
      </main>
    </div>
  )
}