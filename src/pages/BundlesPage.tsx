import React, { useState } from 'react'
import { Check, ChevronDown, ChevronUp, PackageCheck, Sparkles, Plus } from 'lucide-react'
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
    <div className="flex flex-col gap-5 p-4 pb-28">
      {/* Page Title & Subtitle matching Image 1 */}
      <div className="pt-1 px-1">
        <div className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-primary mb-1">
          <Sparkles className="w-3 h-3 text-secondary" /> Curated Period Care
        </div>
        <h1 className="text-3xl font-medium tracking-tight text-neutral-900 leading-[1.16]">
          Bundles &amp;<br />
          <span className="font-serif italic text-primary">Value Combos</span>
        </h1>
        <p className="text-xs text-neutral-500 mt-1 font-medium">
          Multi-packs with automatic bundle discounts.
        </p>
      </div>

      {/* List of Bundles */}
      <div className="flex flex-col gap-3.5">
        {BUNDLES.map((bundle) => {
          const isExpanded = expandedBundleId === bundle.id

          return (
            <div
              key={bundle.id}
              className="bg-white border border-black/6 rounded-3xl p-4 shadow-2xs hover:shadow-xs transition-all flex flex-col gap-3"
            >
              <div className="flex items-start gap-3.5">
                {/* Bundle Thumbnail in rounded pastel box */}
                <div className="w-20 h-20 rounded-2xl bg-[#FDECEF] p-1 shrink-0 flex items-center justify-center overflow-hidden">
                  <img
                    src={bundle.image}
                    alt={bundle.title}
                    className="w-full h-full object-contain"
                    loading="lazy"
                  />
                </div>

                {/* Bundle Details */}
                <div className="flex-1 min-w-0">
                  <div className="inline-block bg-secondary/10 text-secondary text-[10px] font-bold px-2 py-0.5 rounded-full mb-1">
                    {bundle.savingsBadge}
                  </div>

                  <h3 className="text-sm font-semibold text-neutral-900 truncate">
                    {bundle.title}
                  </h3>
                  <p className="text-[11px] text-neutral-500 font-medium line-clamp-1 mt-0.5">
                    {bundle.subtitle}
                  </p>

                  {/* Price & Add Button Row */}
                  <div className="flex items-center justify-between mt-2 pt-1">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-sm font-bold text-neutral-900">
                        ${bundle.price.toFixed(2)}
                      </span>
                      <span className="text-xs text-neutral-400 line-through">
                        ${bundle.originalPrice.toFixed(2)}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleAddBundle(bundle)}
                      className="bg-neutral-900 text-white text-xs font-semibold px-4 py-1.5 rounded-full hover:bg-black active:scale-95 transition-all shadow-xs flex items-center gap-1"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Items in this bundle toggle */}
              <div className="border-t border-black/5 pt-2">
                <button
                  type="button"
                  onClick={() => toggleExpand(bundle.id)}
                  className="w-full flex items-center justify-between text-[11px] font-semibold text-neutral-500 hover:text-neutral-800"
                >
                  <span className="flex items-center gap-1.5">
                    <PackageCheck className="w-3.5 h-3.5 text-secondary" />
                    <span>Included in box ({bundle.itemsIncluded.length} items)</span>
                  </span>
                  {isExpanded ? (
                    <ChevronUp className="w-3.5 h-3.5" />
                  ) : (
                    <ChevronDown className="w-3.5 h-3.5" />
                  )}
                </button>

                {isExpanded && (
                  <div className="mt-2 pl-5 flex flex-col gap-1 text-[11px] text-neutral-600 bg-neutral-50 p-2.5 rounded-2xl animate-in fade-in duration-200">
                    <p className="font-semibold text-neutral-800 text-[10px] uppercase tracking-wider mb-0.5">
                      Items Breakdown:
                    </p>
                    {bundle.itemsIncluded.map((item, i) => (
                      <div key={i} className="flex items-center gap-1.5">
                        <Check className="w-3 h-3 text-secondary shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                    <p className="mt-1 text-[10px] text-neutral-500 italic">
                      {bundle.description}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
