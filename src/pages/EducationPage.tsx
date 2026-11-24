import React, { useState } from 'react'
import { ShieldAlert, CheckCircle2, XCircle, BookOpen, Sparkles, ArrowLeft } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'

export const EducationPage: React.FC = () => {
  const navigate = useNavigate()
  const [selectedFlow, setSelectedFlow] = useState<'light' | 'regular' | 'heavy' | 'postpartum'>('regular')

  const flowRecommendations = {
    light: {
      tampon: 'Regular Cardboard Tampon (6-9g)',
      pad: 'Organic Pantiliners (35ct)',
      wipe: 'Intimate Wipes for daily refreshing',
      tip: 'Ideal for early cycle days, spotting, or active sports without bulky sensation.'
    },
    regular: {
      tampon: 'Cardboard or Plastic Tampons (16ct Regular)',
      pad: 'Ultra Thin Daytime Pads with Wings',
      wipe: 'Intimate Wipes after changing',
      tip: 'Our most popular setup. Organic cotton breathability prevents the heat and friction caused by plastic backings.'
    },
    heavy: {
      tampon: 'Super Tampons (9-12g absorbency)',
      pad: 'Overnight Ultra Thin Contour Pads',
      wipe: 'Intimate Wipes + MaxRelief CBD Balm',
      tip: 'Dual-protection combo ensures no accidental leaks while keeping sensitive skin 100% dry and rash-free.'
    },
    postpartum: {
      tampon: 'Not recommended for first 6 weeks postpartum',
      pad: 'Maternity Extra-Long Cushioned Pads (14ct)',
      wipe: 'Gentle Organic Wipes + MaxRelief Cramp Balm',
      tip: 'Healing episiotomy and perineal tissue needs zero chlorine and zero synthetic fragrances to heal safely.'
    }
  }

  return (
    <div className="flex flex-col gap-5 p-4 pb-28">
      {/* Page Header with Back Button */}
      <div className="pt-1 flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => {
              if (window.history.state && window.history.state.idx > 0) {
                navigate(-1)
              } else {
                navigate('/profile')
              }
            }}
            className="w-9 h-9 rounded-full bg-white border border-black/10 flex items-center justify-center text-neutral-800 hover:text-black hover:bg-neutral-50 shadow-2xs active:scale-95 transition-all shrink-0"
            aria-label="Back"
          >
            <ArrowLeft className="w-4.5 h-4.5" />
          </button>

          <div className="inline-flex items-center gap-1.5 text-[10px] font-bold text-primary uppercase tracking-widest bg-primary/10 px-2.5 py-1 rounded-full">
            <BookOpen className="w-3.5 h-3.5" /> Wellness Guide
          </div>
        </div>

        <h1 className="font-headline font-bold text-2xl text-foreground tracking-tight mt-1">
          Period Health &amp; Cotton Guide
        </h1>
        <p className="text-xs text-muted-foreground font-medium leading-relaxed">
          Understanding what goes into your body is the first step toward lifelong reproductive wellness.
        </p>
      </div>

      {/* Toxic Shock Syndrome (TSS) Education Alert */}
      <div className="bg-surface-container-low border border-outline-variant p-4 rounded-2xl flex flex-col gap-2.5">
        <div className="flex items-center gap-2 text-primary font-bold text-xs">
          <ShieldAlert className="w-5 h-5 text-primary shrink-0" />
          <span>Understanding Toxic Shock Syndrome (TSS)</span>
        </div>
        <p className="text-xs text-foreground/80 leading-relaxed">
          TSS is a rare but serious bacterial infection. Conventional tampons made with <strong>viscose rayon fibers</strong> can create dry, microscopic abrasions on vaginal walls. 100% pure organic cotton tampons are soft, do not shed synthetic fibers, and minimize mucosal irritation.
        </p>
        <div className="bg-surface-container-lowest p-2.5 rounded-lg border border-outline-variant/60 text-[11px] text-muted-foreground space-y-1">
          <div>• Always change your tampon every 4 to 8 hours</div>
          <div>• Use the lowest absorbency suitable for your flow</div>
          <div>• Alternate between organic cotton tampons and pads at night</div>
        </div>
      </div>

      {/* Side-by-Side Comparison: Maxim vs. Conventional */}
      <div className="flex flex-col gap-2">
        <h2 className="font-headline font-bold text-base text-foreground">
          Cotton vs. Synthetics Comparison
        </h2>

        <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl overflow-hidden shadow-xs text-xs">
          <div className="grid grid-cols-2 bg-surface-container-low font-bold py-2 px-3 border-b border-outline-variant">
            <span className="text-secondary flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Maxim Hygiene
            </span>
            <span className="text-muted-foreground flex items-center gap-1">
              <XCircle className="w-3.5 h-3.5 text-destructive" /> Conventional Brands
            </span>
          </div>

          <div className="divide-y divide-outline-variant/40 text-[11px]">
            <div className="grid grid-cols-2 p-2.5 gap-2">
              <span className="font-semibold text-foreground">100% Organic Cotton Core &amp; Cover</span>
              <span className="text-muted-foreground">Viscose Rayon &amp; Wood Pulp Mix</span>
            </div>
            <div className="grid grid-cols-2 p-2.5 gap-2 bg-surface-container-low/30">
              <span className="font-semibold text-foreground">Totally Chlorine Free (TCF)</span>
              <span className="text-muted-foreground">Chlorine Bleached (Produces Dioxins)</span>
            </div>
            <div className="grid grid-cols-2 p-2.5 gap-2">
              <span className="font-semibold text-foreground">Breathable Plant-based Film</span>
              <span className="text-muted-foreground">Petrochemical Plastic Barrier</span>
            </div>
            <div className="grid grid-cols-2 p-2.5 gap-2 bg-surface-container-low/30">
              <span className="font-semibold text-foreground">Zero Fragrances or Deodorants</span>
              <span className="text-muted-foreground">Synthetic Masking Perfumes</span>
            </div>
            <div className="grid grid-cols-2 p-2.5 gap-2">
              <span className="font-semibold text-foreground">Biodegradable in 6–12 months</span>
              <span className="text-muted-foreground">Takes 500+ years to decompose</span>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Flow Recommender */}
      <div className="bg-surface-container-lowest border border-outline-variant/70 rounded-2xl p-4 shadow-xs flex flex-col gap-3">
        <h2 className="font-headline font-bold text-sm text-foreground flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-secondary" />
          <span>Flow &amp; Absorbency Recommender</span>
        </h2>
        <p className="text-[11px] text-muted-foreground">
          Select your typical cycle day flow to find your tailored organic cotton regimen:
        </p>

        {/* Flow Buttons */}
        <div className="grid grid-cols-4 gap-1 bg-surface-container-low p-1 rounded-xl">
          {(['light', 'regular', 'heavy', 'postpartum'] as const).map((flow) => (
            <button
              key={flow}
              type="button"
              onClick={() => setSelectedFlow(flow)}
              className={`py-1.5 text-[11px] font-bold rounded-lg capitalize transition-colors ${
                selectedFlow === flow
                  ? 'bg-surface-container-lowest text-primary shadow-xs'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {flow}
            </button>
          ))}
        </div>

        {/* Flow Result Card */}
        <div className="bg-surface-variant/30 p-3 rounded-xl border border-outline-variant/60 text-xs space-y-1.5">
          <div>
            <span className="text-muted-foreground font-medium">Recommended Tampon: </span>
            <span className="font-bold text-foreground">{flowRecommendations[selectedFlow].tampon}</span>
          </div>
          <div>
            <span className="text-muted-foreground font-medium">Recommended Pad: </span>
            <span className="font-bold text-foreground">{flowRecommendations[selectedFlow].pad}</span>
          </div>
          <div>
            <span className="text-muted-foreground font-medium">Hygiene Pairing: </span>
            <span className="font-bold text-foreground">{flowRecommendations[selectedFlow].wipe}</span>
          </div>
          <p className="text-[11px] text-primary/90 pt-1 border-t border-outline-variant/40 italic">
            Tip: {flowRecommendations[selectedFlow].tip}
          </p>
        </div>

        <Link
          to="/shop"
          className="w-full bg-primary text-primary-foreground text-center py-2.5 rounded-xl font-bold text-xs hover:bg-primary-container transition-colors"
        >
          Shop This Regimen
        </Link>
      </div>
    </div>
  )
}
