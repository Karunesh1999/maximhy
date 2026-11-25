import React from 'react'
import { ArrowRight } from 'lucide-react'

interface OnboardingScreenProps {
  onGetStarted: () => void
}

export const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ onGetStarted }) => {
  return (
    <div className="fixed inset-0 z-50 w-full h-full bg-[#F7F6F4] flex flex-col justify-between overflow-hidden animate-in fade-in duration-300">
      {/* Full-Screen Edge-to-Edge Ultra 4K Image */}
      <img
        src="/images/onboarding-hero.jpg"
        alt="Pure Organic Period Care"
        className="absolute inset-0 w-full h-full object-cover object-center"
        loading="eager"
      />

      {/* Top Bar: Skip on Right */}
      <div className="relative z-10 flex items-center justify-end p-4 pt-5">
        <button
          type="button"
          onClick={onGetStarted}
          className="text-xs font-semibold text-[#7A1C3A] bg-[#FCE7F3]/95 backdrop-blur-xs hover:bg-pink-200 px-4 py-1.5 rounded-full shadow-xs transition-all active:scale-95"
        >
          Skip
        </button>
      </div>

      {/* Bottom Get Started CTA */}
      <div className="relative z-10 p-5 pb-7 pt-16 bg-gradient-to-t from-black/30 via-black/10 to-transparent">
        <button
          type="button"
          onClick={onGetStarted}
          className="w-full bg-[#7A1C3A] hover:bg-[#61152D] text-white py-3.5 px-6 rounded-full font-semibold text-sm shadow-lg active:scale-[0.98] transition-all flex items-center justify-center gap-2"
        >
          <span>Get Started</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
