import React from 'react'
import { NavLink } from 'react-router-dom'
import { Store, Package, RefreshCw, ShoppingBag } from 'lucide-react'
import { useCart } from '../context/CartContext'

export const BottomNav: React.FC = () => {
  const { totalCount } = useCart()

  const navItems = [
    { to: '/shop', label: 'Shop', icon: Store },
    { to: '/bundles', label: 'Bundles', icon: Package },
    { to: '/subscribe', label: 'Subscribe', icon: RefreshCw },
    { to: '/cart', label: 'Cart', icon: ShoppingBag, badge: totalCount },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-surface-container-lowest/95 backdrop-blur-md border-t border-outline-variant max-w-md mx-auto">
      <div className="grid grid-cols-4 h-16 items-center px-1">
        {navItems.map((item) => {
          const Icon = item.icon
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center gap-1 py-1 transition-colors relative ${
                  isActive
                    ? 'text-primary font-bold'
                    : 'text-muted-foreground hover:text-foreground'
                }`
              }
            >
              <div className="relative">
                <Icon className="w-5 h-5" />
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="absolute -top-1.5 -right-2 bg-primary text-primary-foreground text-[10px] font-bold rounded-full h-4 min-w-[16px] px-1 flex items-center justify-center">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="text-[11px] tracking-tight">{item.label}</span>
            </NavLink>
          )
        })}
      </div>
    </nav>
  )
}
