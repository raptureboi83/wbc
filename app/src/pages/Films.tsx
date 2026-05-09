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
    navigate('/#contact')
  }

  return (
    <div className="min-h-screen bg-dark-bg text-foreground">
      <Navbar siteSettings={siteSettings} />

      <main className="pt-20">
        <section className="relative overflow-hidden bg-dark-bg px-6 pb-14 pt-20 md:px-10 md:pb-20 md:pt-28">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute left-1/2 top-0 h-[30rem] w-[70rem] -translate-x-1/2 rounded-full bg-warm-beige/5 blur-3xl" />
          </div>

          <div className="relative mx-auto max-w-6xl">
            <div className="grid grid-cols-1 items-end gap-10 lg:grid-cols-12">
              <div className="lg:col-span-8">
                <p className="mb-4 font-['Inter'] text-xs uppercase tracking-[0.3em] text-cool-gray">
                  Films
                </p>

                <h1 className="max-w-4xl text-4xl leading-[0.95] text-warm-beige md:text-6xl lg:text-7xl">
                  Wedding films that feel true to the people in them
                </h1>

                <p className="mt-6 max-w-2xl font-['Inter'] text-base leading-relaxed text-cool-gray md:text-lg">
                  These are real wedding stories, captured quietly and edited with
                  intention. Some are emotional, some are joyful, some are both,
                  but all of them are meant to feel honest and easy to come back to.
                </p>
              </div>

              <div className="lg:col-span-4">
                <div className="rounded-sm border border-white/10 bg-elevated-bg/60 p-6 backdrop-blur-sm md:p-7">
                  <p className="font-['Inter'] text-sm uppercase tracking-[0.2em] text-warm-beige">
                    Looking for your own film?
                  </p>

                  <p className="mt-4 font-['Inter'] text-sm leading-relaxed text-cool-gray md:text-base">
                    If you want a wedding film that feels personal, calm, and
                    beautifully put together, this is the best place to start.
                  </p>

                  <div className="mt-6 flex flex-col gap-3 sm:flex-row lg:flex-col">
                    <button
                      type="button"
                      onClick={() => navigate('/')}
                      className="inline-flex items-center justify-center rounded-sm bg-warm-beige px-6 py-3 font-['Inter'] text-sm uppercase tracking-[0.1em] text-dark-bg transition-opacity duration-300 hover:opacity-90"
                    >
                      Back to home
                    </button>

                    <button
                      type="button"
                      onClick={handleReachOut}
                      className="inline-flex items-center justify-center rounded-sm border border-white/10 px-6 py-3 font-['Inter'] text-sm uppercase tracking-[0.1em] text-warm-beige transition-colors duration-300 hover:bg-white/5"
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