import React, { useState } from 'react'
import { Check, ChevronDown, ChevronUp, PackageCheck, Sparkles } from 'lucide-react'
import { BUNDLES } from '../data/bundles'
import type { BundleItem } from '../types'
import { useCart } from '../context/CartContext'

export const BundlesPage: React.FC = () => {
  const { addItem } = useCart()
  const [expandedBundleId, setExpandedBundleId] = useState<string | null>(null)

  const handleAddBundle = (bundle: BundleItem) => {
    addItem(bundle, 'bundle', 1)
  }

  const toggleExpand = (id: string) => {
    setExpandedBundleId(expandedBundleId === id ? null : id)
  }

  return (
    <div className="flex flex-col gap-4 p-4">
      {/* Page Title & Subtitle matching Reference 2 */}
      <div className="pt-2">
        <h1 className="font-headline font-bold text-2xl text-foreground tracking-tight">
          Bundles &amp; Combos
        </h1>
        <p className="text-xs text-muted-foreground mt-0.5 font-medium">
          Curated multi-packs with instant savings.
        </p>
      </div>

      {/* List of Bundles matching Reference 2 */}
      <div className="flex flex-col gap-3">
        {BUNDLES.map((bundle) => {
          const isExpanded = expandedBundleId === bundle.id

          return (
            <div
              key={bundle.id}
              className="bg-surface-container-lowest border border-outline-variant/70 rounded-2xl p-3.5 shadow-xs hover:border-primary/50 transition-all flex flex-col gap-3"
            >
              <div className="flex items-start gap-3">
                {/* Bundle Thumbnail */}
                <div className="w-20 h-20 rounded-xl overflow-hidden bg-surface-container-low shrink-0 border border-outline-variant/40">
                  <img
                    src={bundle.image}
                    alt={bundle.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>

                {/* Bundle Details */}
                <div className="flex-1 min-w-0">
                  {/* Green Savings Pill matching Reference 2 */}
                  <div className="inline-block bg-secondary-container text-on-secondary-container text-[11px] font-bold px-2 py-0.5 rounded-md mb-1">
                    {bundle.savingsBadge}
                  </div>

                  <h3 className="font-headline font-bold text-sm text-foreground truncate">
                    {bundle.title}
                  </h3>
                  <p className="text-[11px] text-muted-foreground font-medium line-clamp-1 mt-0.5">
                    {bundle.subtitle}
                  </p>

                  {/* Price & Add Button Row matching Reference 2 */}
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-baseline gap-1.5">
                      <span className="font-headline font-bold text-sm text-foreground">
                        ${bundle.price.toFixed(2)}
                      </span>
                      <span className="text-xs text-muted-foreground line-through">
                        ${bundle.originalPrice.toFixed(2)}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleAddBundle(bundle)}
                      className="bg-primary text-primary-foreground text-xs font-bold px-4 py-1.5 rounded-lg hover:bg-primary-container active:scale-95 transition-all shadow-xs"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>

              {/* Items in this bundle toggle */}
              <div className="border-t border-outline-variant/40 pt-2">
                <button
                  type="button"
                  onClick={() => toggleExpand(bundle.id)}
                  className="w-full flex items-center justify-between text-[11px] font-semibold text-muted-foreground hover:text-foreground"
                >
                  <span className="flex items-center gap-1">
                    <PackageCheck className="w-3.5 h-3.5 text-secondary" />
                    <span>What's inside ({bundle.itemsIncluded.length} items)</span>
                  </span>
                  {isExpanded ? (
                    <ChevronUp className="w-3.5 h-3.5" />
                  ) : (
                    <ChevronDown className="w-3.5 h-3.5" />
                  )}
                </button>

                {isExpanded && (
                  <div className="mt-2 text-xs bg-surface-container-low p-2.5 rounded-lg border border-outline-variant/40 animate-in fade-in duration-150">
                    <p className="text-muted-foreground text-[11px] mb-2 leading-relaxed">
                      {bundle.description}
                    </p>
                    <ul className="space-y-1">
                      {bundle.itemsIncluded.map((item, idx) => (
                        <li key={idx} className="flex items-center gap-1.5 text-[11px] text-foreground">
                          <Check className="w-3.5 h-3.5 text-secondary shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Free Shipping Tip */}
      <div className="bg-surface-variant/40 p-3.5 rounded-xl border border-outline-variant/60 flex items-center gap-2.5 text-xs text-primary font-medium">
        <Sparkles className="w-4 h-4 shrink-0" />
        <span>Bundles count towards the $39.99 Free Shipping threshold!</span>
      </div>
    </div>
  )
}
