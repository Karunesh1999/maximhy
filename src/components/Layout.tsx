import React from 'react'
import { Outlet } from 'react-router-dom'
import { Header } from './Header'
import { BottomNav } from './BottomNav'
import { NotificationToast } from './NotificationToast'

export const Layout: React.FC = () => {
  return (
    <div className="min-h-screen bg-muted/30 flex justify-center">
      {/* Mobile-first centered frame with border styling matching reference */}
      <div className="w-full max-w-md min-h-screen bg-background border-x border-outline-variant/50 shadow-sm flex flex-col pb-20 relative">
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
