import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

export default function ScrollToAnchor() {
  const location = useLocation()
  const lastHash = useRef('')

  useEffect(() => {
    if (location.hash) {
      lastHash.current = location.hash.replace('#', '')
    }

    if (!lastHash.current) return

    const scrollToHash = () => {
      const element = document.getElementById(lastHash.current)

      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        })
        lastHash.current = ''
        return true
      }

      return false
    }

    if (scrollToHash()) return

    const timeout = window.setTimeout(() => {
      scrollToHash()
    }, 150)

    return () => window.clearTimeout(timeout)
  }, [location])

  return null
}