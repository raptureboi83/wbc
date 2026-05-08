import { useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useLayoutEffect(() => {
    if (hash) {
      const id = hash.replace('#', '')

      const scrollToHash = () => {
        const element = document.getElementById(id)

        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }

      const timeout = window.setTimeout(scrollToHash, 100)
      return () => window.clearTimeout(timeout)
    }

    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [pathname, hash])

  return null
}