import React, { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Header } from './Header'
import { BottomNav } from './BottomNav'
import { NotificationToast } from './NotificationToast'

export const Layout: React.FC = () => {
  const location = useLocation()

  // Sync route changes inside iframe back to parent desktop window URL if nested
  useEffect(() => {
    if (typeof window !== 'undefined' && window.self !== window.top) {
      try {
        const fullPath = location.pathname + location.search + location.hash
        if (window.top && window.top.location.pathname + window.top.location.search + window.top.location.hash !== fullPath) {
          window.top.history.replaceState(null, '', fullPath)
        }
      } catch {
        // Cross-origin fallback safety
      }
    }
  }, [location])

  return (
    <div className="min-h-screen bg-background flex justify-center">
      <div className="w-full max-w-md min-h-screen bg-background flex flex-col pb-20 relative">
        <Header />
        <main className="flex-1">
          <Outlet />
        </main>
        <BottomNav />
        <NotificationToast />
      </div>
    </div>
  )
}
