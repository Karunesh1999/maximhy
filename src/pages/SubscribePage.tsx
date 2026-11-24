import React, { useState } from 'react'
import { Check, CheckCircle2, Circle, Sparkles, ArrowRight } from 'lucide-react'
import { SUBSCRIPTION_ESSENTIALS } from '../data/bundles'
import type { DeliveryFrequency } from '../types'

export const SubscribePage: React.FC = () => {
  const [frequency, setFrequency] = useState<DeliveryFrequency>('30')
  const [selectedItemIds, setSelectedItemIds] = useState<string[]>(['sub-cardboard-tampons', 'sub-ultra-thin-pads'])
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false)

  const toggleItemSelection = (id: string) => {
    setSelectedItemIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    )
  }

  // Calculate total recurring price dynamically
  const selectedItems = SUBSCRIPTION_ESSENTIALS.filter((item) =>
    selectedItemIds.includes(item.id)
  )

  const recurringTotal = selectedItems.reduce(
    (sum, item) => sum + item.subscriptionPrice,
    0
  )

  const regularTotal = selectedItems.reduce(
    (sum, item) => sum + item.regularPrice,
    0
  )

  const totalSavedPerCycle = Math.max(0, regularTotal - recurringTotal)

  const handleStartSubscription = () => {
    if (selectedItems.length === 0) return
    setIsSuccessModalOpen(true)
  }

  return (
    <div className="flex flex-col gap-4 p-4">
      {/* Page Header matching Reference 3 */}
      <div className="pt-2">
        <h1 className="font-headline font-bold text-2xl text-foreground tracking-tight">
          MyPeriodPlan
        </h1>
        <p className="text-xs text-muted-foreground mt-0.5 font-medium">
          Save 10% on auto-delivery. Pause or skip anytime.
        </p>
      </div>

      {/* Delivery Frequency Selector matching Reference 3 */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-bold text-foreground">Delivery Frequency</label>
        <div className="grid grid-cols-3 gap-2">
          {(['30', '45', '60'] as DeliveryFrequency[]).map((days) => {
            const isSelected = frequency === days
            return (
              <button
                key={days}
                type="button"
                onClick={() => setFrequency(days)}
                className={`py-2 px-3 rounded-full text-xs font-bold transition-all border ${
                  isSelected
                    ? 'bg-primary text-primary-foreground border-primary shadow-xs'
                    : 'bg-surface-container-lowest text-muted-foreground border-outline-variant hover:border-foreground/40'
                }`}
              >
                {days} Days
              </button>
            )
          })}
        </div>
      </div>

      {/* Pick Essentials (-10%) matching Reference 3 */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold text-foreground">Pick Essentials (-10%)</label>
          <span className="text-[11px] text-secondary font-semibold">
            {selectedItemIds.length} items chosen
          </span>
        </div>

        <div className="flex flex-col gap-2.5">
          {SUBSCRIPTION_ESSENTIALS.map((item) => {
            const isChecked = selectedItemIds.includes(item.id)

            return (
              <div
                key={item.id}
                onClick={() => toggleItemSelection(item.id)}
                className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                  isChecked
                    ? 'bg-surface-container-lowest border-secondary ring-1 ring-secondary shadow-xs'
                    : 'bg-surface-container-lowest border-outline-variant/70 hover:border-outline'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg overflow-hidden bg-surface-container-low shrink-0 border border-outline-variant/40">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-headline font-bold text-xs text-foreground">
                      {item.name}
                    </h4>
                    <p className="text-[11px] text-muted-foreground">
                      <span className="font-bold text-foreground">
                        ${item.subscriptionPrice.toFixed(2)}
                      </span>{' '}
                      / delivery
                    </p>
                  </div>
                </div>

                {/* Checkbox Icon matching Reference 3 */}
                <div className="shrink-0 text-secondary">
                  {isChecked ? (
                    <CheckCircle2 className="w-5 h-5 text-secondary fill-secondary-container" />
                  ) : (
                    <Circle className="w-5 h-5 text-outline-variant" />
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Subscription Summary Card matching Reference 3 */}
      <div className="bg-surface-container-lowest border border-outline-variant/80 rounded-2xl p-4 shadow-sm flex flex-col gap-3 mt-1">
        <div className="flex items-baseline justify-between">
          <span className="text-xs font-bold text-foreground">Recurring Total</span>
          <span className="font-headline font-bold text-lg text-primary">
            ${recurringTotal.toFixed(2)}{' '}
            <span className="text-xs font-normal text-muted-foreground">/ {frequency} days</span>
          </span>
        </div>

        {totalSavedPerCycle > 0 && (
          <div className="text-[11px] text-secondary font-semibold flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>You save ${totalSavedPerCycle.toFixed(2)} on every cycle</span>
          </div>
        )}

        {/* Start MyPeriodPlan Button matching Reference 3 */}
        <button
          type="button"
          onClick={handleStartSubscription}
          disabled={selectedItems.length === 0}
          className={`w-full py-3.5 px-4 rounded-xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 ${
            selectedItems.length === 0
              ? 'bg-muted text-muted-foreground cursor-not-allowed'
              : 'bg-secondary text-secondary-foreground hover:bg-secondary-container active:scale-[0.98]'
          }`}
        >
          <span>Start MyPeriodPlan</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <p className="text-[10px] text-center text-muted-foreground">
          Free shipping on all subscriptions. Modify, skip or cancel anytime with one click.
        </p>
      </div>

      {/* Simulated Subscription Activation Modal */}
      {isSuccessModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-surface-container-lowest w-full max-w-sm rounded-2xl p-5 shadow-2xl flex flex-col gap-4 text-center">
            <div className="w-12 h-12 rounded-full bg-secondary-container text-secondary mx-auto flex items-center justify-center">
              <Check className="w-6 h-6 stroke-[3]" />
            </div>

            <div>
              <h3 className="font-headline font-bold text-xl text-foreground">
                MyPeriodPlan™ Activated!
              </h3>
              <p className="text-xs text-muted-foreground mt-1">
                Your first cycle box is scheduled and will arrive within 3-5 days.
              </p>
            </div>

            <div className="bg-surface-container-low p-3 rounded-xl text-left text-xs space-y-1.5 border border-outline-variant/40">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Frequency:</span>
                <span className="font-bold text-foreground">Every {frequency} Days</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Recurring Amount:</span>
                <span className="font-bold text-primary">${recurringTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Delivery:</span>
                <span className="font-bold text-secondary">Free Guaranteed</span>
              </div>
              <div className="pt-1 border-t border-outline-variant/40">
                <span className="text-[11px] text-muted-foreground">Items: {selectedItems.map((i) => i.name).join(', ')}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsSuccessModalOpen(false)}
              className="w-full bg-primary text-primary-foreground py-2.5 rounded-xl font-bold text-xs hover:bg-primary-container transition-colors"
            >
              Back to My Dashboard
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
