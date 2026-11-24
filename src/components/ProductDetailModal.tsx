import React, { useState } from 'react'
import { X, Star, Check, ShieldCheck, Sparkles, ShoppingBag } from 'lucide-react'
import type { Product } from '../types'
import { useCart } from '../context/CartContext'

interface ProductDetailModalProps {
  product: Product | null
  onClose: () => void
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ product, onClose }) => {
  const { addItem } = useCart()
  const [selectedType, setSelectedType] = useState<'pack' | 'case'>('pack')
  const [quantity, setQuantity] = useState(1)

  if (!product) return null

  const handleAddToCart = () => {
    addItem(product, selectedType, quantity)
    onClose()
  }

  const activePrice = selectedType === 'pack' ? product.packPrice : product.casePrice

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-surface-container-lowest w-full max-w-md max-h-[90vh] rounded-t-2xl sm:rounded-2xl overflow-y-auto no-scrollbar shadow-2xl flex flex-col">
        {/* Sticky Header */}
        <div className="sticky top-0 z-10 bg-surface-container-lowest/95 backdrop-blur-sm px-4 py-3 border-b border-outline-variant flex items-center justify-between">
          <span className="text-xs uppercase font-bold tracking-wider text-secondary">
            {product.organicCert}
          </span>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted"
            aria-label="Close details"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Product Media & Hero */}
        <div className="p-4 flex flex-col gap-4">
          <div className="relative aspect-4/3 rounded-xl overflow-hidden bg-surface-container-low border border-outline-variant/40">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-2 left-2 bg-primary text-primary-foreground text-[10px] font-bold px-2 py-0.5 rounded-full">
              100% Organic Cotton
            </div>
            {product.isBestseller && (
              <div className="absolute top-2 right-2 bg-secondary text-secondary-foreground text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> Bestseller
              </div>
            )}
          </div>

          {/* Title, rating and tagline */}
          <div>
            <h2 className="font-headline font-bold text-2xl text-foreground">
              {product.name}
            </h2>
            <p className="text-xs text-muted-foreground font-medium mt-0.5">
              {product.tagline}
            </p>
            <div className="flex items-center gap-2 mt-2">
              <div className="flex text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-500" />
                ))}
              </div>
              <span className="text-xs font-bold text-foreground">{product.rating}</span>
              <span className="text-xs text-muted-foreground">({product.reviewsCount} verified reviews)</span>
            </div>
          </div>

          {/* Pack vs Case Toggle Selector */}
          <div className="bg-surface-container-low p-2.5 rounded-xl border border-outline-variant/60 flex flex-col gap-2">
            <span className="text-xs font-bold text-foreground">Select Quantity Option:</span>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setSelectedType('pack')}
                className={`py-2 px-2.5 rounded-lg text-left transition-all border ${
                  selectedType === 'pack'
                    ? 'bg-surface-container-lowest border-primary text-primary shadow-xs ring-1 ring-primary'
                    : 'bg-transparent border-outline-variant/60 text-muted-foreground hover:bg-surface-container'
                }`}
              >
                <div className="text-[11px] font-semibold text-muted-foreground">Single Pack</div>
                <div className="text-sm font-bold text-foreground">${product.packPrice.toFixed(2)}</div>
                <div className="text-[10px] text-muted-foreground">{product.packCount}</div>
              </button>

              <button
                type="button"
                onClick={() => setSelectedType('case')}
                className={`py-2 px-2.5 rounded-lg text-left transition-all border relative ${
                  selectedType === 'case'
                    ? 'bg-surface-container-lowest border-primary text-primary shadow-xs ring-1 ring-primary'
                    : 'bg-transparent border-outline-variant/60 text-muted-foreground hover:bg-surface-container'
                }`}
              >
                <span className="absolute -top-2 right-2 bg-secondary text-secondary-foreground text-[9px] font-bold px-1.5 py-0.2 rounded-full">
                  Save 5%
                </span>
                <div className="text-[11px] font-semibold text-muted-foreground">Case (12 Packs)</div>
                <div className="text-sm font-bold text-foreground">${product.casePrice.toFixed(2)}</div>
                <div className="text-[10px] text-muted-foreground">{product.caseCount}</div>
              </button>
            </div>
          </div>

          {/* Description */}
          <div className="text-xs text-foreground/90 leading-relaxed bg-surface-container-low/50 p-3 rounded-lg border border-outline-variant/40">
            {product.description}
          </div>

          {/* Key Product Features */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">
              Why You'll Love It
            </h3>
            <div className="flex flex-col gap-1.5">
              {product.features.map((feat, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-foreground">
                  <Check className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Ingredient Transparency */}
          <div className="bg-surface-variant/30 p-3 rounded-xl border border-outline-variant/50">
            <div className="flex items-center gap-1.5 mb-1.5 text-xs font-bold text-primary">
              <ShieldCheck className="w-4 h-4" />
              <span>Full Ingredient Transparency</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {product.ingredients.map((ing, idx) => (
                <span
                  key={idx}
                  className="bg-surface-container-lowest text-[11px] px-2 py-0.5 rounded-md border border-outline-variant/60 text-muted-foreground"
                >
                  {ing}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="sticky bottom-0 bg-surface-container-lowest border-t border-outline-variant p-4 flex items-center gap-3">
          <div className="flex items-center border border-outline-variant rounded-lg">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="px-2.5 py-2 text-sm font-bold text-muted-foreground hover:text-foreground"
            >
              -
            </button>
            <span className="px-2 text-xs font-bold">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="px-2.5 py-2 text-sm font-bold text-muted-foreground hover:text-foreground"
            >
              +
            </button>
          </div>

          <button
            onClick={handleAddToCart}
            className="flex-1 bg-primary text-primary-foreground py-3 px-4 rounded-xl font-bold text-sm shadow-md hover:bg-primary-container active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Add to Bag · ${(activePrice * quantity).toFixed(2)}</span>
          </button>
        </div>
      </div>
    </div>
  )
}
