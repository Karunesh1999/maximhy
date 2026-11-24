import React from 'react'
import { Link } from 'react-router-dom'
import { Leaf } from 'lucide-react'

export const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-40 bg-surface/90 backdrop-blur-md border-b border-black/5">
      {/* Main Bar */}
      <div className="px-4 py-2.5 flex items-center justify-center">
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
      </div>
    </header>
  )
}
