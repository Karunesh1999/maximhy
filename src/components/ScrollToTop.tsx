import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export const ScrollToTop: React.FC = () => {
  const { pathname, search } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior })
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0

    try {
      if (typeof window !== 'undefined' && window.self !== window.top && window.top) {
        window.top.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior })
      }
    } catch {
      // Cross-origin safety
    }
  }, [pathname, search])

  return null
}
