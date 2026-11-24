import React from 'react'
import { NavLink } from 'react-router-dom'
import { Home, Store, Package, RefreshCw } from 'lucide-react'

export const BottomNav: React.FC = () => {
  const navItems = [
    { to: '/', label: 'Home', icon: Home },
    { to: '/shop', label: 'Shop', icon: Store },
    { to: '/bundles', label: 'Bundles', icon: Package },
    { to: '/subscribe', label: 'Auto-Delivery', icon: RefreshCw },
  ]

  return (
    <div className="fixed bottom-4 left-0 right-0 z-40 flex justify-center pointer-events-none px-4 max-w-md mx-auto">
      {/* Floating Pill Navigation */}
      <nav className="pointer-events-auto bg-white/95 backdrop-blur-xl border border-black/8 rounded-full shadow-[0_12px_32px_-6px_rgba(0,0,0,0.16),0_4px_12px_-2px_rgba(0,0,0,0.08)] px-3 py-2 flex items-center gap-1.5 sm:gap-2">
        {navItems.map((item) => {
          const Icon = item.icon
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `relative flex items-center justify-center transition-all duration-200 rounded-full ${
                  isActive
                    ? 'w-10 h-10 bg-neutral-900 text-white shadow-sm'
                    : 'w-10 h-10 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
                }`
              }
              aria-label={item.label}
            >
              <div className="relative flex items-center justify-center">
                <Icon className="w-4 h-4" />
              </div>
            </NavLink>
          )
        })}
      </nav>
    </div>
  )
}


