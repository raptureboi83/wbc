import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { client } from '@/lib/sanity.client'
import { filmBySlugQuery, siteSettingsQuery } from '@/lib/queries'
import Navbar from '@/sections/Navbar'
import type { Film, SiteSettings } from '@/lib/types'

export default function FilmDetailPage() {
  const { slug } = useParams()
  const [film, setFilm] = useState<Film | null>(null)
  const [siteSettings, setSiteSettings] = useState<SiteSettings | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      if (!slug) {
        setLoading(false)
        return
      }

      try {
        const [filmData, settingsData] = await Promise.all([
          client.fetch(filmBySlugQuery, { slug }),
          client.fetch(siteSettingsQuery),
        ])

        setFilm(filmData ?? null)
        setSiteSettings(settingsData ?? null)
      } catch (error) {
        console.error('Error loading film detail page:', error)
        setFilm(null)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-bg text-warm-beige">
        {siteSettings && <Navbar siteSettings={siteSettings} />}
        <main className="pt-32 px-6 md:px-10 max-w-6xl mx-auto">
          <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground font-['Inter']">
            Loading film...
          </p>
        </main>
      </div>
    )
  }

  if (!film) {
    return (
      <div className="min-h-screen bg-dark-bg text-warm-beige">
        {siteSettings && <Navbar siteSettings={siteSettings} />}
        <main className="pt-32 px-6 md:px-10 max-w-6xl mx-auto">
          <Link
            to="/films"
            className="inline-block text-xs tracking-[0.16em] uppercase text-muted-foreground hover:text-warm-beige transition-colors duration-300 font-['Inter']"
          >
            Back to films
          </Link>

          <h1 className="mt-8 text-4xl md:text-6xl font-light tracking-[-0.03em]">
            Film not found
          </h1>

          <p className="mt-4 text-muted-foreground max-w-2xl font-['Inter']">
            This film link doesn't exist, or it hasn't been published yet.
          </p>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-dark-bg text-warm-beige">
      {siteSettings && <Navbar siteSettings={siteSettings} />}

      <main className="pt-32 px-6 md:px-10 pb-20 max-w-6xl mx-auto">
        <div className="mb-8">
          <Link
            to="/films"
            className="inline-block text-xs tracking-[0.16em] uppercase text-muted-foreground hover:text-warm-beige transition-colors duration-300 font-['Inter']"
          >
            Back to films
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.4fr_0.8fr] lg:gap-14 items-start">
          <div className="lg:pt-10">
            <div className="overflow-hidden rounded-sm bg-black">
              <video
                src={film.videoUrl}
                poster={film.posterUrl}
                controls
                playsInline
                className="w-full h-auto"
              />
            </div>
          </div>

          <aside>
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-['Inter']">
              Wedding Film
            </p>

            <h1 className="mt-3 text-4xl md:text-5xl leading-none tracking-[-0.04em] font-light">
              {film.title}
            </h1>

            {(film.eventDate || film.location) && (
              <p className="mt-4 text-sm md:text-base text-cool-gray font-['Inter']">
                {[film.eventDate, film.location].filter(Boolean).join(' • ')}
              </p>
            )}

            {film.blurb && (
              <p className="mt-6 text-sm md:text-base leading-7 text-muted-foreground max-w-xl font-['Inter']">
                {film.blurb}
              </p>
            )}
          </aside>
        </div>
      </main>
    </div>
  )
}