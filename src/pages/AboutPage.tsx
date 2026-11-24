import React, { useState } from 'react'
import { Leaf, Award, Heart, Shield, Sparkles, Check, Globe } from 'lucide-react'
import { Link } from 'react-router-dom'

export const AboutPage: React.FC = () => {
  const [monthsOfCare, setMonthsOfCare] = useState(12)

  // Environmental impact calculation:
  // Average woman uses ~20 single-use plastic containing products per month
  const plasticPoundsSaved = (monthsOfCare * 1.5).toFixed(1)
  const plasticBottlesEquivalent = Math.round(monthsOfCare * 8)
  const chemicalsAvoidedPounds = (monthsOfCare * 0.4).toFixed(1)

  return (
    <div className="flex flex-col gap-5 p-4">
      {/* Hero Header */}
      <div className="pt-2 text-center flex flex-col items-center">
        <div className="inline-flex items-center gap-1.5 text-[10px] font-bold text-secondary uppercase tracking-widest bg-secondary-container/50 px-3 py-1 rounded-full mb-2">
          <Leaf className="w-3.5 h-3.5" /> Founded in 2008
        </div>
        <h1 className="font-headline font-bold text-2xl sm:text-3xl text-foreground">
          The Maxim Hygiene Story
        </h1>
        <p className="text-xs text-muted-foreground max-w-sm mt-1 leading-relaxed">
          Pioneering 100% certified organic and chlorine-free cotton care for women who demand pure, uncompromising body wellness.
        </p>
      </div>

      {/* Founder Story Banner */}
      <div className="bg-surface-container-lowest border border-outline-variant/70 rounded-2xl p-4 shadow-xs flex flex-col gap-3">
        <div className="aspect-16/9 rounded-xl overflow-hidden bg-surface-container-low border border-outline-variant/40">
          <img
            src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&auto=format&fit=crop&q=80"
            alt="Rebecca Baum, Founder"
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h2 className="font-headline font-bold text-base text-foreground">
            A Mother &amp; Daughter Vision
          </h2>
          <p className="text-xs text-foreground/80 mt-1 leading-relaxed">
            Founded by <strong>Rebecca Baum</strong>, Maxim Hygiene was born from a personal awakening. Upon discovering that conventional tampons and pads contain synthetic plastics, wood fluff pulp, and chlorine-bleached viscose rayon, Rebecca set out to create the first complete line of 100% certified organic cotton feminine care.
          </p>
        </div>
      </div>

      {/* The 4 Core Brand Pillars */}
      <div>
        <h2 className="font-headline font-bold text-lg text-foreground mb-2.5">
          Our Clean Cotton Promise
        </h2>
        <div className="grid grid-cols-2 gap-2.5">
          <div className="bg-surface-container-low p-3 rounded-xl border border-outline-variant/40 flex flex-col gap-1.5">
            <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
              <Leaf className="w-4 h-4" />
            </div>
            <h3 className="font-headline font-bold text-xs text-foreground">100% Organic Cotton</h3>
            <p className="text-[11px] text-muted-foreground leading-snug">
              Certified pure cotton fibers with zero synthetic plastic mesh or rayon fillers.
            </p>
          </div>

          <div className="bg-surface-container-low p-3 rounded-xl border border-outline-variant/40 flex flex-col gap-1.5">
            <div className="w-8 h-8 rounded-lg bg-secondary/10 text-secondary flex items-center justify-center">
              <Shield className="w-4 h-4" />
            </div>
            <h3 className="font-headline font-bold text-xs text-foreground">Total Chlorine-Free</h3>
            <p className="text-[11px] text-muted-foreground leading-snug">
              No chlorine bleach or harmful dioxin carcinogen residues ever touch your body.
            </p>
          </div>

          <div className="bg-surface-container-low p-3 rounded-xl border border-outline-variant/40 flex flex-col gap-1.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-600 flex items-center justify-center">
              <Heart className="w-4 h-4" />
            </div>
            <h3 className="font-headline font-bold text-xs text-foreground">Hypoallergenic</h3>
            <p className="text-[11px] text-muted-foreground leading-snug">
              Breathable, skin-friendly protection engineered specifically for sensitive skin.
            </p>
          </div>

          <div className="bg-surface-container-low p-3 rounded-xl border border-outline-variant/40 flex flex-col gap-1.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
              <Globe className="w-4 h-4" />
            </div>
            <h3 className="font-headline font-bold text-xs text-foreground">Biodegradable</h3>
            <p className="text-[11px] text-muted-foreground leading-snug">
              Compostable organic fibers that decompose safely back into the earth.
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Eco-Impact Calculator */}
      <div className="bg-surface-container-lowest border border-outline-variant/80 rounded-2xl p-4 shadow-sm flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h2 className="font-headline font-bold text-sm text-foreground flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-primary" />
            <span>Your Personal Planet Impact</span>
          </h2>
          <span className="text-xs font-bold text-primary">{monthsOfCare} Months</span>
        </div>

        <p className="text-[11px] text-muted-foreground">
          See how switching to Maxim 100% Organic Cotton reduces petrochemical plastics and toxic runoff:
        </p>

        {/* Range Slider */}
        <input
          type="range"
          min="1"
          max="36"
          value={monthsOfCare}
          onChange={(e) => setMonthsOfCare(Number(e.target.value))}
          className="w-full accent-primary cursor-pointer"
        />

        <div className="grid grid-cols-3 gap-2 bg-surface-container-low p-3 rounded-xl text-center border border-outline-variant/40">
          <div>
            <div className="font-headline font-bold text-base text-secondary">{plasticBottlesEquivalent}</div>
            <div className="text-[10px] text-muted-foreground">Plastic Bottles Diverted</div>
          </div>
          <div>
            <div className="font-headline font-bold text-base text-primary">{plasticPoundsSaved} lbs</div>
            <div className="text-[10px] text-muted-foreground">Plastic Waste Saved</div>
          </div>
          <div>
            <div className="font-headline font-bold text-base text-foreground">{chemicalsAvoidedPounds} lbs</div>
            <div className="text-[10px] text-muted-foreground">Bleach Averted</div>
          </div>
        </div>
      </div>

      {/* Certifications Banner */}
      <div className="bg-surface-variant/30 p-3.5 rounded-xl border border-outline-variant/60 flex flex-col gap-2">
        <span className="text-xs font-bold text-primary flex items-center gap-1.5">
          <Award className="w-4 h-4" /> Global Certifications &amp; Standards
        </span>
        <div className="grid grid-cols-2 gap-2 text-[11px] text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Check className="w-3.5 h-3.5 text-secondary" /> GOTS Global Organic
          </div>
          <div className="flex items-center gap-1.5">
            <Check className="w-3.5 h-3.5 text-secondary" /> ICEA Certified Eco
          </div>
          <div className="flex items-center gap-1.5">
            <Check className="w-3.5 h-3.5 text-secondary" /> Cruelty-Free Leaping Bunny
          </div>
          <div className="flex items-center gap-1.5">
            <Check className="w-3.5 h-3.5 text-secondary" /> Certified B-Corp Movement
          </div>
        </div>
      </div>

      {/* CTA to Shop */}
      <div className="text-center py-2">
        <Link
          to="/shop"
          className="inline-block bg-primary text-primary-foreground font-bold text-xs px-6 py-3 rounded-xl hover:bg-primary-container transition-all shadow-md"
        >
          Explore Pure Cotton Care
        </Link>
      </div>
    </div>
  )
}
