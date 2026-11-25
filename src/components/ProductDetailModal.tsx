import React, { useState } from 'react'
import { ArrowLeft, Heart, Star, Check, ShieldCheck, Plus, Minus } from 'lucide-react'
import type { Product } from '../types'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'

interface ProductDetailModalProps {
  product: Product | null
  onClose: () => void
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ product, onClose }) => {
  const { addItem } = useCart()
  const { isWishlisted: checkWishlisted, toggleWishlist } = useWishlist()
  const [selectedType, setSelectedType] = useState<'pack' | 'case'>('pack')
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState<'overview' | 'features' | 'ingredients'>('overview')

  if (!product) return null

  const isWishlisted = checkWishlisted(product.id)

  const handleAddToCart = () => {
    addItem(product, selectedType, quantity)
    onClose()
  }

  const activePrice = selectedType === 'pack' ? product.packPrice : product.casePrice

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-md max-h-[92vh] rounded-t-[36px] sm:rounded-[36px] overflow-y-auto no-scrollbar shadow-2xl flex flex-col relative">
        {/* Top Pastel Hero Section matching Image 1 (Screen 1) */}
        <div
          className={`relative w-full ${
            product.pastelBg || 'bg-[#FDECEF]'
          } p-4 pt-5 pb-6 flex flex-col items-center justify-between rounded-t-[36px] sm:rounded-t-[36px] min-h-[310px]`}
        >
          {/* Top Bar with Circle Back Arrow & Heart Button */}
          <div className="w-full flex items-center justify-between z-10 px-1">
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-white shadow-xs border border-black/5 flex items-center justify-center text-neutral-800 hover:bg-neutral-50 transition-all active:scale-95"
              aria-label="Back"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>

            <button
              onClick={() => toggleWishlist(product.id)}
              className="w-10 h-10 rounded-full bg-white shadow-xs border border-black/5 flex items-center justify-center text-neutral-800 hover:bg-neutral-50 transition-all active:scale-95"
              aria-label="Wishlist"
            >
              <Heart
                className={`w-5 h-5 transition-colors ${
                  isWishlisted ? 'fill-rose-500 text-rose-500' : 'text-neutral-700'
                }`}
              />
            </button>
          </div>

          {/* Centered Large Packaging Photo */}
          <div className="w-56 h-56 flex items-center justify-center my-1">
            <img
              src={product.image}
              alt={product.name}
              className="max-h-full max-w-full object-contain drop-shadow-md hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Carousel Indicator Dots matching Image 1 */}
          <div className="flex items-center gap-1.5 mt-2">
            <div className="w-7 h-1.5 bg-neutral-900 rounded-full" />
            <div className="w-1.5 h-1.5 bg-neutral-300 rounded-full" />
            <div className="w-1.5 h-1.5 bg-neutral-300 rounded-full" />
          </div>
        </div>

        {/* Product Details Sheet */}
        <div className="p-5 flex flex-col gap-4">
          {/* Header info */}
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 className="text-2xl font-bold text-neutral-900 tracking-tight leading-tight">
                {product.name}
              </h2>
              <p className="text-xs text-neutral-500 font-medium mt-1">
                {product.subtitle || product.tagline}
              </p>
            </div>
            {/* Reviews */}
            <div className="flex flex-col items-end shrink-0">
              <div className="flex text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-500" />
                ))}
              </div>
              <span className="text-[11px] text-neutral-400 mt-0.5">
                ({product.reviewsCount} reviews)
              </span>
            </div>
          </div>

          {/* Pack vs Case Toggle Selector */}
          <div className="bg-neutral-50 p-2 rounded-2xl border border-black/6 flex flex-col gap-2">
            <div className="flex items-center justify-between text-xs px-1">
              <span className="font-semibold text-neutral-800">Select Ordering Format:</span>
              <span className="text-[10px] text-secondary font-bold">100% Cotton Guarantee</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setSelectedType('pack')}
                className={`py-2 px-3 rounded-xl text-left transition-all border ${
                  selectedType === 'pack'
                    ? 'bg-white border-neutral-900 shadow-xs ring-1 ring-neutral-900 text-neutral-900'
                    : 'bg-transparent border-transparent text-neutral-500 hover:bg-white/60'
                }`}
              >
                <div className="text-[11px] font-medium text-neutral-500">Single Pack</div>
                <div className="text-sm font-bold text-neutral-900">${product.packPrice.toFixed(2)}</div>
                <div className="text-[10px] text-neutral-400">{product.packCount}</div>
              </button>

              <button
                type="button"
                onClick={() => setSelectedType('case')}
                className={`py-2 px-3 rounded-xl text-left transition-all border relative ${
                  selectedType === 'case'
                    ? 'bg-white border-neutral-900 shadow-xs ring-1 ring-neutral-900 text-neutral-900'
                    : 'bg-transparent border-transparent text-neutral-500 hover:bg-white/60'
                }`}
              >
                <span className="absolute -top-1.5 right-2 bg-secondary text-white text-[9px] font-bold px-1.5 py-0.2 rounded-full shadow-2xs">
                  Save 5%
                </span>
                <div className="text-[11px] font-medium text-neutral-500">Case of 12</div>
                <div className="text-sm font-bold text-neutral-900">${product.casePrice.toFixed(2)}</div>
                <div className="text-[10px] text-neutral-400">{product.caseCount}</div>
              </button>
            </div>
          </div>

          {/* Tabs: Overview, Features, Ingredients */}
          <div className="flex border-b border-black/5 gap-4 text-xs font-semibold">
            <button
              onClick={() => setActiveTab('overview')}
              className={`pb-2 transition-colors border-b-2 ${
                activeTab === 'overview'
                  ? 'border-neutral-900 text-neutral-900'
                  : 'border-transparent text-neutral-400 hover:text-neutral-700'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('features')}
              className={`pb-2 transition-colors border-b-2 ${
                activeTab === 'features'
                  ? 'border-neutral-900 text-neutral-900'
                  : 'border-transparent text-neutral-400 hover:text-neutral-700'
              }`}
            >
              Features
            </button>
            <button
              onClick={() => setActiveTab('ingredients')}
              className={`pb-2 transition-colors border-b-2 ${
                activeTab === 'ingredients'
                  ? 'border-neutral-900 text-neutral-900'
                  : 'border-transparent text-neutral-400 hover:text-neutral-700'
              }`}
            >
              Ingredients
            </button>
          </div>

          {/* Tab Content */}
          <div className="text-xs text-neutral-600 leading-relaxed min-h-[70px]">
            {activeTab === 'overview' && (
              <div className="flex flex-col gap-2">
                <p>{product.description}</p>
                <div className="flex flex-wrap gap-2 pt-1">
                  <span className="inline-flex items-center gap-1 bg-secondary/10 text-secondary font-bold text-[10px] px-2.5 py-1 rounded-full">
                    <Check className="w-3 h-3" /> {product.organicCert}
                  </span>
                  {product.hsaFsaEligible && (
                    <span className="inline-flex items-center gap-1 bg-neutral-100 text-neutral-700 font-bold text-[10px] px-2.5 py-1 rounded-full">
                      <ShieldCheck className="w-3 h-3 text-secondary" /> HSA/FSA Eligible
                    </span>
                  )}
                  {product.absorbency && (
                    <span className="inline-flex items-center gap-1 bg-neutral-100 text-neutral-700 font-bold text-[10px] px-2.5 py-1 rounded-full">
                      {product.absorbency}
                    </span>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'features' && (
              <div className="flex flex-col gap-1.5">
                {product.features.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-secondary shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'ingredients' && (
              <div className="flex flex-col gap-2">
                <p className="font-semibold text-neutral-800">Clean &amp; 100% Transparent:</p>
                <ul className="list-disc pl-4 space-y-1 text-neutral-600">
                  {product.ingredients.map((ing, idx) => (
                    <li key={idx}>{ing}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Sticky Bottom Actions */}
          <div className="sticky bottom-0 bg-white/95 backdrop-blur-md border-t border-black/8 pt-3 pb-6 px-5 -mx-5 -mb-5 flex items-center justify-between gap-2.5 z-20">
            {/* Total Price */}
            <div className="flex flex-col shrink-0">
              <span className="text-[10px] uppercase font-bold tracking-wider text-neutral-400 leading-tight">
                Total Price
              </span>
              <span className="text-xl font-bold text-neutral-900 leading-tight mt-0.5">
                ${(activePrice * quantity).toFixed(2)}
              </span>
            </div>

            {/* Stepper Pill */}
            <div className="flex items-center bg-[#FCE7F3] rounded-full p-1 gap-1 shrink-0 border border-pink-200/60">
              <button
                type="button"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-7 h-7 rounded-full flex items-center justify-center text-[#7A1C3A] hover:bg-pink-200 active:scale-90 transition-all"
                aria-label="Decrease quantity"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="w-5 text-center text-xs font-bold text-[#7A1C3A] select-none">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity(quantity + 1)}
                className="w-7 h-7 rounded-full flex items-center justify-center text-[#7A1C3A] hover:bg-pink-200 active:scale-90 transition-all"
                aria-label="Increase quantity"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Add to Cart Button */}
            <button
              type="button"
              onClick={handleAddToCart}
              className="flex-1 bg-[#7A1C3A] text-white rounded-full py-3.5 px-4 font-semibold text-xs sm:text-sm shadow-md hover:bg-[#61152D] active:scale-[0.98] transition-all flex items-center justify-center gap-1.5 whitespace-nowrap"
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
