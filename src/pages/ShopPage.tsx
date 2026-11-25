import React, { useState, useMemo, useEffect, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'
import {
  Search,
  SlidersHorizontal,
  Heart,
  Plus,
  X,
  RotateCcw,
  LayoutGrid,
  Leaf,
  Layers,
  Droplets,
  Flower2,
  ShieldCheck,
  Feather
} from 'lucide-react'
import { PRODUCTS } from '../data/products'
import type { Product, ProductCategory } from '../types'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import { ProductDetailModal } from '../components/ProductDetailModal'

export const ShopPage: React.FC = () => {
  const { addItem } = useCart()
  const { isWishlisted: checkWishlisted, toggleWishlist: toggleWishlistItem } = useWishlist()
  const [searchParams, setSearchParams] = useSearchParams()
  const categoryParam = (searchParams.get('category') as ProductCategory) || 'all'
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState<ProductCategory>(categoryParam)
  const [showFilterSheet, setShowFilterSheet] = useState(false)
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating'>('featured')
  const [hsaOnly, setHsaOnly] = useState(false)
  const categoryContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setActiveCategory(categoryParam)
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior })
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
  }, [categoryParam])

  useEffect(() => {
    if (!categoryContainerRef.current) return
    const activeEl = categoryContainerRef.current.querySelector<HTMLElement>(`[data-category="${activeCategory}"]`)
    if (activeEl) {
      activeEl.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
    }
  }, [activeCategory])

  const handleSelectCategory = (key: ProductCategory) => {
    setActiveCategory(key)
    const newParams = new URLSearchParams(searchParams)
    if (key === 'all') {
      newParams.delete('category')
    } else {
      newParams.set('category', key)
    }
    setSearchParams(newParams, { replace: true })
  }

  const hasActiveFilters =
    sortBy !== 'featured' ||
    hsaOnly ||
    searchQuery.trim() !== '' ||
    activeCategory !== 'all'

  const handleResetAllFilters = () => {
    setSortBy('featured')
    setHsaOnly(false)
    setSearchQuery('')
    handleSelectCategory('all')
  }
  const [productTypeSelections, setProductTypeSelections] = useState<Record<string, 'pack' | 'case'>>({})
  const [selectedProductForModal, setSelectedProductForModal] = useState<Product | null>(null)

  const categoryIcons: { key: ProductCategory; label: string; icon: React.FC<{ className?: string }> }[] = [
    { key: 'all', label: 'All', icon: LayoutGrid },
    { key: 'tampons', label: 'Tampons', icon: Leaf },
    { key: 'pads-liners', label: 'Pads', icon: Layers },
    { key: 'wipes', label: 'Wipes', icon: Droplets },
    { key: 'beauty', label: 'Beauty', icon: Flower2 },
    { key: 'maternity', label: 'Maternity', icon: ShieldCheck },
    { key: 'underwear', label: 'Underwear', icon: Feather },
  ]

  const filteredProducts = useMemo(() => {
    let result = PRODUCTS.filter((product) => {
      const matchesCategory =
        activeCategory === 'all' || product.category === activeCategory
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.tagline.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesHsa = !hsaOnly || !!product.hsaFsaEligible
      return matchesCategory && matchesSearch && matchesHsa
    })

    if (sortBy === 'price-low') {
      result = [...result].sort((a, b) => a.packPrice - b.packPrice)
    } else if (sortBy === 'price-high') {
      result = [...result].sort((a, b) => b.packPrice - a.packPrice)
    } else if (sortBy === 'rating') {
      result = [...result].sort((a, b) => b.rating - a.rating)
    }

    return result
  }, [activeCategory, searchQuery, sortBy, hsaOnly])

  const toggleProductType = (productId: string, type: 'pack' | 'case', e: React.MouseEvent) => {
    e.stopPropagation()
    setProductTypeSelections((prev) => ({
      ...prev,
      [productId]: type,
    }))
  }

  const toggleWishlist = (productId: string, e: React.MouseEvent) => {
    e.stopPropagation()
    toggleWishlistItem(productId)
  }

  const handleAddProduct = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation()
    const selectedType = productTypeSelections[product.id] || 'pack'
    addItem(product, selectedType, 1)
  }

  return (
    <div className="flex flex-col gap-5 px-3 sm:px-4 py-4 pb-28">
      {/* Search Bar with Filter Icon matching design */}
      <div className="relative flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search organic tampons, pads, wipes..."
            className="w-full bg-white border border-black/8 rounded-full pl-10 pr-9 py-2.5 text-xs text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-neutral-900 shadow-2xs"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700 p-1"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <button
          type="button"
          onClick={() => setShowFilterSheet(!showFilterSheet)}
          className={`w-10 h-10 rounded-full bg-white border border-black/8 flex items-center justify-center shadow-2xs shrink-0 active:scale-95 transition-all ${
            showFilterSheet || sortBy !== 'featured' || hsaOnly
              ? 'text-primary border-primary/40 bg-primary/5'
              : 'text-neutral-700 hover:text-black hover:bg-neutral-50'
          }`}
          aria-label="Filter & Sort products"
        >
          <SlidersHorizontal className="w-4 h-4" />
        </button>
      </div>

      {/* Circular Category Icons Row matching design */}
      <div
        ref={categoryContainerRef}
        className="flex items-center gap-2.5 overflow-x-auto no-scrollbar py-1 px-0.5"
      >
        {categoryIcons.map((item) => {
          const Icon = item.icon
          const isActive = activeCategory === item.key

          return (
            <button
              key={item.key}
              data-category={item.key}
              type="button"
              onClick={() => handleSelectCategory(item.key)}
              className="flex flex-col items-center gap-1.5 min-w-[56px] shrink-0 transition-transform active:scale-95 group"
            >
              {/* Circular Icon Pill matching image */}
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                  isActive
                    ? 'border-2 border-primary text-primary bg-primary/10 shadow-sm ring-2 ring-primary/20 scale-105'
                    : 'bg-white text-neutral-700 border border-black/8 hover:bg-neutral-50 shadow-2xs group-hover:border-black/20 group-hover:text-primary'
                }`}
              >
                <Icon className="w-5 h-5" />
              </div>

              {/* Label underneath */}
              <span
                className={`text-[11px] tracking-tight transition-colors ${
                  isActive
                    ? 'text-primary font-bold'
                    : 'text-neutral-600 font-medium group-hover:text-neutral-900'
                }`}
              >
                {item.label}
              </span>
            </button>
          )
        })}
      </div>

      {/* Results Counter & Filter / Reset Control Bar */}
      <div className="flex items-center justify-between text-xs text-neutral-500 px-1">
        <span className="font-medium">{filteredProducts.length} Products Available</span>

        {/* Dynamic Reset & Filter Controls at marked section */}
        <div className="flex items-center gap-1.5">
          {/* Reset Button: SHOWS when any filter is active, HIDES when no filter applied */}
          {hasActiveFilters && (
            <button
              type="button"
              onClick={handleResetAllFilters}
              className="inline-flex items-center gap-1 text-[11px] font-bold text-rose-600 bg-rose-50 hover:bg-rose-100 border border-rose-200/80 px-2.5 py-1 rounded-full shadow-2xs active:scale-95 transition-all animate-in fade-in"
              title="Reset all active filters"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          )}

          {/* Filter Toggle Button */}
          <button
            type="button"
            onClick={() => setShowFilterSheet(!showFilterSheet)}
            className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-full border transition-all active:scale-95 ${
              showFilterSheet
                ? 'bg-neutral-900 text-white border-neutral-900 shadow-2xs'
                : sortBy !== 'featured' || hsaOnly
                ? 'bg-primary/10 text-primary border-primary/30 font-bold shadow-2xs'
                : 'bg-white text-neutral-700 border-black/8 hover:bg-neutral-50 shadow-2xs'
            }`}
          >
            <SlidersHorizontal className="w-3 h-3" />
            <span>Filter</span>
            {(sortBy !== 'featured' || hsaOnly) && (
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            )}
          </button>
        </div>
      </div>

      {/* Filter / Sort Drawer (shows/hides right at the marked section!) */}
      {showFilterSheet && (
        <div className="bg-white border border-black/8 rounded-2xl p-3 shadow-md animate-in fade-in slide-in-from-top-2 duration-150 flex flex-col gap-2">
          <div className="flex items-center justify-between border-b border-black/5 pb-1.5 font-bold text-neutral-900 text-xs">
            <span>Filter & Sort Products</span>
            <div className="flex items-center gap-2">
              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={handleResetAllFilters}
                  className="text-[10px] text-rose-600 hover:underline font-semibold"
                >
                  Reset All
                </button>
              )}
              <button
                type="button"
                onClick={() => setShowFilterSheet(false)}
                className="text-neutral-400 hover:text-neutral-700 p-0.5"
                aria-label="Close filters"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            {[
              { id: 'featured', label: 'Featured' },
              { id: 'price-low', label: 'Price: Low to High' },
              { id: 'price-high', label: 'Price: High to Low' },
              { id: 'rating', label: 'Top Rated ★' },
            ].map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => setSortBy(opt.id as any)}
                className={`text-[11px] px-3 py-1 rounded-full font-semibold transition-all ${
                  sortBy === opt.id
                    ? 'bg-primary text-white shadow-2xs'
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                }`}
              >
                {opt.label}
              </button>
            ))}
            <button
              type="button"
              onClick={() => setHsaOnly(!hsaOnly)}
              className={`text-[11px] px-3 py-1 rounded-full font-semibold transition-all ${
                hsaOnly
                  ? 'bg-secondary text-white shadow-2xs'
                  : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
              }`}
            >
              ✓ HSA/FSA Only
            </button>
          </div>
        </div>
      )}

      {/* Product Grid - 3 Columns on Mobile as requested */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-3xl p-6 border border-black/5 shadow-xs">
          <p className="text-sm font-semibold text-neutral-800">No products found</p>
          <p className="text-xs text-neutral-500 mt-1">Try another search keyword or switch categories.</p>
          <button
            onClick={() => {
              setSearchQuery('')
              handleSelectCategory('all')
            }}
            className="mt-4 text-xs bg-neutral-900 text-white px-5 py-2 rounded-full font-semibold hover:bg-black"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:gap-3.5">
          {filteredProducts.map((product) => {
            const selectedType = productTypeSelections[product.id] || 'pack'
            const activePrice = selectedType === 'pack' ? product.packPrice : product.casePrice
            const isWishlisted = checkWishlisted(product.id)

            return (
              <div
                key={product.id}
                onClick={() => setSelectedProductForModal(product)}
                className="group flex flex-col justify-between cursor-pointer select-none"
              >
                {/* Pastel Box matching Image 1 */}
                <div
                  className={`relative aspect-square w-full ${
                    product.pastelBg || 'bg-[#FDECEF]'
                  } rounded-2xl p-2.5 flex items-center justify-center overflow-hidden shadow-2xs transition-transform duration-200 group-hover:-translate-y-0.5`}
                >
                  {/* Wishlist Heart Button in circle */}
                  <button
                    type="button"
                    onClick={(e) => toggleWishlist(product.id, e)}
                    className="absolute top-2 right-2 z-10 w-7 h-7 rounded-full bg-white/85 backdrop-blur-xs flex items-center justify-center text-neutral-500 hover:text-rose-500 hover:bg-white shadow-2xs transition-all active:scale-90"
                    aria-label="Save to wishlist"
                  >
                    <Heart
                      className={`w-3.5 h-3.5 transition-colors ${
                        isWishlisted ? 'fill-rose-500 text-rose-500' : ''
                      }`}
                    />
                  </button>

                  {/* Authentic Packaging Product Image */}
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain p-1 group-hover:scale-105 transition-transform duration-300 drop-shadow-2xs"
                    loading="lazy"
                  />
                </div>

                {/* Information below pastel box */}
                <div className="mt-2 px-0.5 flex flex-col flex-1 justify-between">
                  <div>
                    {/* Title with min-h for consistent 2-line alignment */}
                    <h3 className="text-xs font-semibold text-neutral-900 leading-snug line-clamp-2 min-h-[32px]">
                      {product.name}
                    </h3>
                    <p className="text-[11px] text-neutral-500 line-clamp-1 mt-0.5">
                      {selectedType === 'pack' ? product.packCount : product.caseCount}
                    </p>
                  </div>

                  {/* Pack vs Case Selector Pills */}
                  <div className="mt-2 grid grid-cols-2 gap-1 bg-neutral-100 p-0.5 rounded-full border border-black/5 text-[10px]">
                    <button
                      type="button"
                      onClick={(e) => toggleProductType(product.id, 'pack', e)}
                      className={`py-0.5 px-1 rounded-full font-medium text-center transition-all ${
                        selectedType === 'pack'
                          ? 'bg-white text-neutral-900 shadow-2xs font-bold'
                          : 'text-neutral-500 hover:text-neutral-800'
                      }`}
                    >
                      Pack
                    </button>
                    <button
                      type="button"
                      onClick={(e) => toggleProductType(product.id, 'case', e)}
                      className={`py-0.5 px-1 rounded-full font-medium text-center transition-all truncate ${
                        selectedType === 'case'
                          ? 'bg-white text-neutral-900 shadow-2xs font-bold'
                          : 'text-neutral-500 hover:text-neutral-800'
                      }`}
                      title="Case (-5%)"
                    >
                      Case -5%
                    </button>
                  </div>

                  {/* Price & Fast Add Action */}
                  <div className="flex items-center justify-between mt-2 pt-0.5">
                    <span className="text-sm font-bold text-neutral-900">
                      ${activePrice.toFixed(2)}
                    </span>
                    <button
                      type="button"
                      onClick={(e) => handleAddProduct(product, e)}
                      className="w-7 h-7 rounded-full bg-neutral-900 text-white flex items-center justify-center hover:bg-black shadow-xs transition-all active:scale-90 shrink-0"
                      aria-label={`Add ${product.name} to cart`}
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Interactive Product Details Modal matching Image 1 */}
      <ProductDetailModal
        product={selectedProductForModal}
        onClose={() => setSelectedProductForModal(null)}
      />
    </div>
  )
}
