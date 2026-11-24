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
      <nav className="pointer-events-auto w-full bg-white/95 backdrop-blur-xl border border-black/8 rounded-full shadow-[0_12px_32px_-6px_rgba(0,0,0,0.16),0_4px_12px_-2px_rgba(0,0,0,0.08)] px-2 py-2 flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className="flex-1 flex flex-col items-center justify-center py-1 transition-all duration-200 select-none group"
              aria-label={item.label}
            >
              {({ isActive }) => (
                <>
                  <div
                    className={`flex items-center justify-center rounded-full transition-all duration-200 ${
                      isActive
                        ? 'w-8 h-8 bg-neutral-900 text-white shadow-sm'
                        : 'w-8 h-8 text-neutral-600 group-hover:text-neutral-900 group-hover:bg-neutral-100'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <span
                    className={`text-[10px] tracking-tight mt-1 leading-none transition-colors whitespace-nowrap ${
                      isActive
                        ? 'font-semibold text-neutral-900'
                        : 'font-medium text-neutral-500 group-hover:text-neutral-800'
                    }`}
                  >
                    {item.label}
                  </span>
                </>
              )}
            </NavLink>
          )
        })}
      </nav>
    </div>
  )
}


