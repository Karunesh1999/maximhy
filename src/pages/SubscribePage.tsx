import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Check, CheckCircle2, Circle, ArrowRight, ArrowLeft } from 'lucide-react'
import { SUBSCRIPTION_ESSENTIALS } from '../data/bundles'
import type { DeliveryFrequency } from '../types'

export const SubscribePage: React.FC = () => {
  const navigate = useNavigate()
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
    <div className="flex flex-col gap-5 p-4 pb-28">
      {/* Top Header with Back Button */}
      <div className="pt-1 flex items-center gap-3">
        <button
          type="button"
          onClick={() => {
            if (window.history.state && window.history.state.idx > 0) {
              navigate(-1)
            } else {
              navigate('/')
            }
          }}
          className="w-9 h-9 rounded-full bg-white border border-black/10 flex items-center justify-center text-neutral-800 hover:text-black hover:bg-neutral-50 shadow-2xs active:scale-95 transition-all shrink-0"
          aria-label="Go back"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div>
          <h1 className="text-base font-bold text-neutral-900 leading-tight">
            Auto-Delivery Plan
          </h1>
          <p className="text-[11px] text-neutral-500">
            Save 5% on recurring essentials
          </p>
        </div>
      </div>

      {/* Delivery Frequency Selector */}
      <div className="flex flex-col gap-2">
        <label className="text-xs font-semibold text-neutral-800">Delivery Cadence</label>
        <div className="grid grid-cols-3 gap-2">
          {(['30', '45', '60'] as DeliveryFrequency[]).map((days) => {
            const isSelected = frequency === days
            return (
              <button
                key={days}
                type="button"
                onClick={() => setFrequency(days)}
                className={`py-2.5 px-3 rounded-full text-xs font-semibold transition-all border ${
                  isSelected
                    ? 'bg-[#7A1C3A] text-white border-[#7A1C3A] hover:bg-[#61152D] shadow-xs'
                    : 'bg-white text-neutral-600 border-black/8 hover:border-black/20'
                }`}
              >
                Every {days} Days
              </button>
            )
          })}
        </div>
      </div>

      {/* Pick Essentials */}
      <div className="flex flex-col gap-2.5">
        <div className="flex items-center justify-between px-1">
          <label className="text-xs font-semibold text-neutral-800">Select Recurring Essentials (-5%)</label>
          <span className="text-[11px] text-secondary font-bold">
            {selectedItemIds.length} items chosen
          </span>
        </div>

        <div className="flex flex-col gap-3">
          {SUBSCRIPTION_ESSENTIALS.map((item) => {
            const isChecked = selectedItemIds.includes(item.id)

            return (
              <div
                key={item.id}
                onClick={() => toggleItemSelection(item.id)}
                className={`p-3.5 rounded-3xl border transition-all cursor-pointer flex items-center justify-between gap-3.5 ${
                  isChecked
                    ? 'bg-white border-neutral-900 ring-1 ring-neutral-900 shadow-2xs'
                    : 'bg-white/80 border-black/6 hover:bg-white'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  {/* Pastel rounded thumbnail */}
                  <div className="w-14 h-14 rounded-2xl bg-[#FDECEF] p-1 shrink-0 flex items-center justify-center overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-contain"
                      loading="lazy"
                    />
                  </div>

                  <div className="flex flex-col min-w-0">
                    <h4 className="text-xs font-semibold text-neutral-900 truncate">
                      {item.name}
                    </h4>
                    <p className="text-[11px] text-neutral-500 truncate mt-0.5">
                      {item.subtitle}
                    </p>
                    <div className="flex items-center gap-1.5 mt-1">
                      <span className="text-xs font-bold text-neutral-900">
                        ${item.subscriptionPrice.toFixed(2)}
                      </span>
                      <span className="text-[10px] text-neutral-400 line-through">
                        ${item.regularPrice.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="shrink-0 text-neutral-400">
                  {isChecked ? (
                    <div className="w-6 h-6 rounded-full bg-neutral-900 text-white flex items-center justify-center shadow-xs">
                      <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                    </div>
                  ) : (
                    <Circle className="w-6 h-6 text-neutral-300 stroke-[1.5]" />
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Plan Summary Bar */}
      <div className="bg-white border border-black/6 rounded-3xl p-4 shadow-2xs flex flex-col gap-2.5">
        <div className="flex items-center justify-between text-xs text-neutral-500">
          <span>Recurring Delivery</span>
          <span className="font-semibold text-neutral-800">Every {frequency} Days</span>
        </div>

        <div className="flex items-center justify-between text-xs text-neutral-500">
          <span>Subscription Savings</span>
          <span className="font-semibold text-secondary">
            Save ${totalSavedPerCycle.toFixed(2)} per delivery
          </span>
        </div>

        <div className="border-t border-black/5 pt-2 flex items-center justify-between text-sm font-bold text-neutral-900">
          <span>Cycle Total</span>
          <span className="text-base font-extrabold text-neutral-900">
            ${recurringTotal.toFixed(2)}
          </span>
        </div>

        <button
          type="button"
          disabled={selectedItems.length === 0}
          onClick={handleStartSubscription}
          className="w-full bg-[#7A1C3A] text-white py-3.5 px-4 rounded-full font-semibold text-xs shadow-md hover:bg-[#61152D] active:scale-[0.98] transition-all flex items-center justify-center gap-2 mt-1 disabled:opacity-40"
        >
          <span>Activate MyPeriodPlan</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Success Modal */}
      {isSuccessModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-md rounded-t-[36px] sm:rounded-[36px] p-6 shadow-2xl flex flex-col items-center text-center gap-3">
            <div className="w-14 h-14 rounded-full bg-secondary/15 text-secondary flex items-center justify-center animate-bounce">
              <CheckCircle2 className="w-8 h-8 stroke-[2.5]" />
            </div>
            <h3 className="font-bold text-xl text-neutral-900">
              MyPeriodPlan Activated!
            </h3>
            <p className="text-xs text-neutral-500 max-w-xs">
              Your {selectedItems.length} selected essentials will be delivered to your doorstep every {frequency} days with zero stress.
            </p>
            <button
              onClick={() => setIsSuccessModalOpen(false)}
              className="mt-3 w-full bg-[#7A1C3A] text-white py-3.5 rounded-full font-semibold text-xs hover:bg-[#61152D] transition-all"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
