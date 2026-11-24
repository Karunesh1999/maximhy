import React from 'react'
import { Link } from 'react-router-dom'

export const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-40 bg-surface/95 backdrop-blur-md border-b border-black/5">
      {/* Main Bar */}
      <div className="px-4 py-2 flex items-center justify-center">
        {/* Official Maxim Hygiene Logo in Ultra HD 4K */}
        <Link to="/" className="inline-flex items-center justify-center group active:scale-95 transition-transform">
          <img
            src="/images/maxim_logo_4k.png"
            srcSet="/images/maxim_logo.png 1x, /images/maxim_logo_4k.png 2x"
            alt="Maxim Hygiene natural organic cotton feminine hygiene logo"
            className="h-10 sm:h-11 w-auto object-contain drop-shadow-2xs"
            loading="eager"
          />
        </Link>
      </div>
    </header>
  )
}
