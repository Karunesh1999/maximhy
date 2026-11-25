import React, { useState, useEffect } from 'react'

interface SplashScreenProps {
  onComplete: () => void
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const [isFadingOut, setIsFadingOut] = useState(false)

  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      setIsFadingOut(true)
    }, 1500)

    const doneTimer = setTimeout(() => {
      onComplete()
    }, 1900)

    return () => {
      clearTimeout(fadeTimer)
      clearTimeout(doneTimer)
    }
  }, [onComplete])

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#FAF7F2] bg-gradient-to-b from-[#FAF7F2] via-[#FFF6F9] to-[#FCE7F3] transition-opacity duration-400 ${
        isFadingOut ? 'opacity-0' : 'opacity-100'
      }`}
      aria-label="Loading Maxim Hygiene"
    >
      <div className="flex flex-col items-center gap-4 px-6 animate-in fade-in zoom-in-95 duration-500">
        <img
          src="/images/maxim_logo_4k.png"
          srcSet="/images/maxim_logo.png 1x, /images/maxim_logo_4k.png 2x"
          alt="Maxim Hygiene Products"
          className="h-16 sm:h-20 w-auto object-contain drop-shadow-sm"
          loading="eager"
        />

        <div className="flex items-center gap-1.5 mt-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#7A1C3A] animate-bounce [animation-delay:-0.3s]" />
          <span className="w-1.5 h-1.5 rounded-full bg-[#7A1C3A]/75 animate-bounce [animation-delay:-0.15s]" />
          <span className="w-1.5 h-1.5 rounded-full bg-[#7A1C3A]/50 animate-bounce" />
        </div>
      </div>
    </div>
  )
}
