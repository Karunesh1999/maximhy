import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Home, Store, Package, ShoppingBag, User } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { ProfileModal } from './ProfileModal'

export const BottomNav: React.FC = () => {
  const { totalCount } = useCart()
  const [isProfileOpen, setIsProfileOpen] = useState(false)

  const navItems = [
    { to: '/', label: 'Home', icon: Home },
    { to: '/shop', label: 'Shop', icon: Store },
    { to: '/bundles', label: 'Bundles', icon: Package },
    { to: '/cart', label: 'Cart', icon: ShoppingBag, badge: totalCount },
  ]

  return (
    <>
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
                className="flex-1 flex flex-col items-center justify-center py-1 transition-all duration-200 select-none group min-w-0"
                aria-label={item.label}
              >
                {({ isActive }) => (
                  <>
                    <div
                      className={`relative flex items-center justify-center rounded-full transition-all duration-200 ${
                        isActive
                          ? 'w-8 h-8 bg-neutral-900 text-white shadow-sm'
                          : 'w-8 h-8 text-neutral-600 group-hover:text-neutral-900 group-hover:bg-neutral-100'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {Boolean(item.badge && item.badge > 0) && (
                        <span
                          className={`absolute -top-1 -right-1 min-w-4 h-4 px-1 rounded-full text-[9px] font-bold flex items-center justify-center shadow-xs transition-colors ${
                            isActive
                              ? 'bg-primary text-white ring-1 ring-white'
                              : 'bg-neutral-900 text-white'
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </div>
                    <span
                      className={`text-[9.5px] tracking-tight mt-1 leading-none transition-colors whitespace-nowrap ${
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

          {/* Profile Tab Button */}
          <button
            type="button"
            onClick={() => setIsProfileOpen(true)}
            className="flex-1 flex flex-col items-center justify-center py-1 transition-all duration-200 select-none group min-w-0"
            aria-label="Profile"
          >
            <div
              className={`relative flex items-center justify-center rounded-full transition-all duration-200 ${
                isProfileOpen
                  ? 'w-8 h-8 bg-neutral-900 text-white shadow-sm'
                  : 'w-8 h-8 text-neutral-600 group-hover:text-neutral-900 group-hover:bg-neutral-100'
              }`}
            >
              <User className="w-4 h-4" />
              <span
                className={`absolute top-0 right-0 w-2 h-2 rounded-full ${
                  isProfileOpen ? 'bg-primary ring-1 ring-white' : 'bg-primary'
                }`}
              />
            </div>
            <span
              className={`text-[9.5px] tracking-tight mt-1 leading-none transition-colors whitespace-nowrap ${
                isProfileOpen
                  ? 'font-semibold text-neutral-900'
                  : 'font-medium text-neutral-500 group-hover:text-neutral-800'
              }`}
            >
              Profile
            </span>
          </button>
        </nav>
      </div>

      {/* Profile Modal triggered by Bottom Nav Profile Tab */}
      <ProfileModal isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />
    </>
  )
}


