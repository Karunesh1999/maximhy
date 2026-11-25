import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { User } from 'lucide-react'

export const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-40 bg-surface/95 backdrop-blur-md border-b border-black/5">
      {/* Main Bar */}
      <div className="px-4 py-2 flex items-center justify-between">
        {/* Official Maxim Hygiene Logo in Ultra HD 4K (Left Aligned) */}
        <Link to="/" className="inline-flex items-center justify-start group active:scale-95 transition-transform">
          <img
            src="/images/maxim_logo_4k.png"
            srcSet="/images/maxim_logo.png 1x, /images/maxim_logo_4k.png 2x"
            alt="Maxim Hygiene natural organic cotton feminine hygiene logo"
            className="h-10 sm:h-11 w-auto object-contain drop-shadow-2xs"
            loading="eager"
          />
        </Link>

        {/* Profile Icon (Top Right) */}
        <NavLink
          to="/profile"
          aria-label="Profile"
          className={({ isActive }) =>
            `relative w-9 h-9 rounded-full flex items-center justify-center transition-all active:scale-95 shrink-0 ${
              isActive
                ? 'bg-neutral-900 text-white shadow-sm'
                : 'bg-white border border-black/8 text-neutral-700 hover:text-neutral-900 hover:bg-neutral-50 shadow-2xs'
            }`
          }
        >
          {({ isActive }) => (
            <>
              <User className="w-4.5 h-4.5" />
              <span
                className={`absolute top-0.5 right-0.5 w-2 h-2 rounded-full bg-primary ${
                  isActive ? 'ring-1 ring-white' : ''
                }`}
              />
            </>
          )}
        </NavLink>
      </div>
    </header>
  )
}
