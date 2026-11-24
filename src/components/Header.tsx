import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Leaf, User } from 'lucide-react'
import { ProfileModal } from './ProfileModal'

export const Header: React.FC = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false)

  return (
    <>
      <header className="sticky top-0 z-40 bg-surface/90 backdrop-blur-md border-b border-black/5">
        {/* Main Bar */}
        <div className="px-4 py-2.5 flex items-center justify-between gap-3">
          {/* Left invisible spacer to keep logo centered */}
          <div className="w-9 h-9 shrink-0 pointer-events-none" aria-hidden="true" />

          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary/20 transition-colors">
              <Leaf className="w-4 h-4 fill-primary/30" />
            </div>
            <div className="flex flex-col items-center">
              <span className="font-display font-bold text-lg tracking-tight text-primary leading-none">
                Maxim<span className="text-secondary font-headline">Hygiene</span>
              </span>
              <span className="text-[8px] uppercase tracking-widest text-neutral-500 font-semibold mt-0.5">
                100% Organic Cotton
              </span>
            </div>
          </Link>

          {/* Right: Profile Icon Button */}
          <button
            onClick={() => setIsProfileOpen(true)}
            className="w-9 h-9 rounded-full bg-white/80 border border-black/6 flex items-center justify-center text-neutral-700 hover:text-black hover:bg-white shadow-2xs transition-all relative active:scale-95 shrink-0"
            aria-label="Open Account Profile & Settings"
          >
            <User className="w-4 h-4" />
            {/* Small active badge dot */}
            <span className="absolute top-0 right-0 w-2.5 h-2.5 rounded-full bg-primary ring-2 ring-white" />
          </button>
        </div>
      </header>

      {/* Profile Modal */}
      <ProfileModal isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />
    </>
  )
}
