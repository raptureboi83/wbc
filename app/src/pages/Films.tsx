import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { client } from '@/lib/sanity.client'
import { filmsQuery, siteSettingsQuery } from '@/lib/queries'
import type { Film, SiteSettings } from '@/lib/types'

import Navbar from '@/sections/Navbar'
import FeaturedWork from '@/sections/FeaturedWork'

export default function FilmsPage() {
  const navigate = useNavigate()
  const [films, setFilms] = useState<Film[]>([])
  const [siteSettings, setSiteSettings] = useState<SiteSettings | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [filmsData, settings] = await Promise.all([
          client.fetch(filmsQuery),
          client.fetch(siteSettingsQuery),
        ])
        setFilms(filmsData)
        setSiteSettings(settings)
      } catch (error) {
        console.error('Error fetching films:', error)
      }
    }

    fetchData()
  }, [])

  const handleReachOut = () => {
    navigate('/', { state: { scrollToContact: true } })
  }

  return (
    <div className="min-h-screen bg-dark-bg text-foreground">
      <Navbar siteSettings={siteSettings} />

      <main className="pt-20">
        <section className="relative px-6 md:px-10 pt-20 md:pt-28 pb-14 md:pb-20 bg-dark-bg overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[70rem] h-[30rem] bg-warm-beige/5 blur-3xl rounded-full" />
          </div>

          <div className="relative max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
              <div className="lg:col-span-8">
                <p className="text-cool-gray text-xs tracking-[0.3em] uppercase font-['Inter'] mb-4">
                  Films
                </p>

                <h1 className="text-warm-beige text-4xl md:text-6xl lg:text-7xl leading-[0.95] max-w-4xl">
                  Wedding films that feel true to the people in them
                </h1>

                <p className="text-cool-gray text-base md:text-lg mt-6 max-w-2xl leading-relaxed font-['Inter']">
                  These are real wedding stories, captured quietly and edited with
                  intention. Some are emotional, some are joyful, some are both,
                  but all of them are meant to feel honest and easy to come back to.
                </p>
              </div>

              <div className="lg:col-span-4">
                <div className="border border-white/10 bg-elevated-bg/60 backdrop-blur-sm rounded-sm p-6 md:p-7">
                  <p className="text-warm-beige text-sm uppercase tracking-[0.2em] font-['Inter']">
                    Looking for your own film?
                  </p>

                  <p className="text-cool-gray text-sm md:text-base mt-4 leading-relaxed font-['Inter']">
                    If you want a wedding film that feels personal, calm, and
                    beautifully put together, this is the best place to start.
                  </p>

                  <div className="mt-6 flex flex-col sm:flex-row lg:flex-col gap-3">
                    <button
                      type="button"
                      onClick={() => navigate('/')}
                      className="inline-flex items-center justify-center px-6 py-3 rounded-sm bg-warm-beige text-dark-bg text-sm uppercase tracking-[0.1em] font-['Inter'] hover:opacity-90 transition-opacity duration-300"
                    >
                      Back to home
                    </button>

                    <button
                      type="button"
                      onClick={handleReachOut}
                      className="inline-flex items-center justify-center px-6 py-3 rounded-sm border border-white/10 text-warm-beige text-sm uppercase tracking-[0.1em] font-['Inter'] hover:bg-white/5 transition-colors duration-300"
                    >
                      Reach out
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <FeaturedWork films={films} mode="all" />
      </main>
    </div>
  )
}