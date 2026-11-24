import React, { useState, useMemo } from 'react'
import { Search, Sparkles, Info, Check } from 'lucide-react'
import { PRODUCTS } from '../data/products'
import type { Product, ProductCategory } from '../types'
import { useCart } from '../context/CartContext'
import { ProductDetailModal } from '../components/ProductDetailModal'

export const ShopPage: React.FC = () => {
  const { addItem } = useCart()
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState<ProductCategory>('all')
  const [productTypeSelections, setProductTypeSelections] = useState<Record<string, 'pack' | 'case'>>({})
  const [selectedProductForModal, setSelectedProductForModal] = useState<Product | null>(null)

  const categories: { key: ProductCategory; label: string }[] = [
    { key: 'all', label: 'All' },
    { key: 'tampons', label: 'Tampons' },
    { key: 'pads-liners', label: 'Pads & Liners' },
    { key: 'wipes', label: 'Wipes' },
    { key: 'beauty', label: 'Beauty' },
  ]

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      const matchesCategory =
        activeCategory === 'all' || product.category === activeCategory
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.tagline.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesCategory && matchesSearch
    })
  }, [activeCategory, searchQuery])

  const toggleProductType = (productId: string, type: 'pack' | 'case') => {
    setProductTypeSelections((prev) => ({
      ...prev,
      [productId]: type,
    }))
  }

  const handleAddProduct = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation()
    const selectedType = productTypeSelections[product.id] || 'pack'
    addItem(product, selectedType, 1)
  }

  return (
    <div className="flex flex-col gap-4 p-4">
      {/* Search Bar matching reference */}
      <div className="relative">
        <Search className="w-4 h-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search tampons, pads, wipes..."
          className="w-full bg-surface-container-lowest border border-outline-variant/80 rounded-full pl-10 pr-4 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary placeholder:text-muted-foreground transition-all shadow-2xs"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground hover:text-foreground"
          >
            Clear
          </button>
        )}
      </div>

      {/* Hero Banner matching Reference 1 */}
      <div className="relative rounded-2xl overflow-hidden shadow-sm bg-linear-to-r from-stone-800 to-stone-700 text-white min-h-[130px] flex items-center p-4">
        {/* Background Image / Overlay */}
        <img
          src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&auto=format&fit=crop&q=80"
          alt="100% Organic Cotton Model"
          className="absolute inset-0 w-full h-full object-cover opacity-35 mix-blend-overlay"
        />
        <div className="relative z-10 flex flex-col max-w-[70%]">
          <div className="inline-flex items-center gap-1.5 text-[10px] font-bold text-accent tracking-wide uppercase mb-1">
            <Sparkles className="w-3 h-3" /> Certified Pure Care
          </div>
          <h1 className="font-headline font-bold text-lg sm:text-xl text-white leading-tight">
            100% Organic Cotton
          </h1>
          <p className="text-xs text-white/90 mt-1 font-medium">
            Chlorine-free · Pack or Case (-5%)
          </p>
        </div>
      </div>

      {/* Category Pills matching Reference 1 */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
        {categories.map((cat) => {
          const isActive = activeCategory === cat.key
          return (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-primary text-primary-foreground shadow-xs'
                  : 'bg-surface-container text-foreground/80 hover:bg-surface-container-high border border-outline-variant/40'
              }`}
            >
              {cat.label}
            </button>
          )
        })}
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs text-muted-foreground px-1">
        <span>Showing {filteredProducts.length} items</span>
        <span className="flex items-center gap-1 text-[11px] text-secondary font-semibold">
          <Check className="w-3.5 h-3.5" /> 100% TCF Chlorine Free
        </span>
      </div>

      {/* Product Grid - 2 Columns on Mobile matching Reference 1 */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-12 bg-surface-container-low rounded-xl p-6">
          <p className="text-sm font-semibold text-foreground">No products match your search</p>
          <p className="text-xs text-muted-foreground mt-1">Try another keyword or select All categories.</p>
          <button
            onClick={() => {
              setSearchQuery('')
              setActiveCategory('all')
            }}
            className="mt-3 text-xs text-primary font-bold hover:underline"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3">
          {filteredProducts.map((product) => {
            const selectedType = productTypeSelections[product.id] || 'pack'
            const activePrice =
              selectedType === 'pack' ? product.packPrice : product.casePrice

            return (
              <div
                key={product.id}
                onClick={() => setSelectedProductForModal(product)}
                className="group bg-surface-container-lowest border border-outline-variant/60 rounded-xl p-2.5 flex flex-col justify-between hover:shadow-md transition-all cursor-pointer relative"
              >
                {/* Image & Click target */}
                <div>
                  <div className="relative aspect-square w-full rounded-lg overflow-hidden bg-surface-container-low mb-2 border border-outline-variant/30">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                    <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 text-white rounded-full p-1">
                      <Info className="w-3 h-3" />
                    </div>
                  </div>

                  {/* Title & Tagline */}
                  <h3 className="font-headline font-bold text-xs text-foreground line-clamp-1 leading-snug">
                    {product.name}
                  </h3>
                  <p className="text-[10px] text-muted-foreground font-medium line-clamp-1 mt-0.5">
                    {product.packCount}
                  </p>
                </div>

                {/* Option Selector Toggle (Pack vs Case) */}
                <div className="mt-2 flex flex-col gap-2">
                  <div className="grid grid-cols-2 gap-1 bg-surface-container-low p-0.5 rounded-md border border-outline-variant/40">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleProductType(product.id, 'pack')
                      }}
                      className={`text-[10px] py-0.5 px-1 rounded font-medium transition-colors ${
                        selectedType === 'pack'
                          ? 'bg-accent/80 text-accent-foreground font-bold shadow-2xs'
                          : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      Pack
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleProductType(product.id, 'case')
                      }}
                      className={`text-[10px] py-0.5 px-1 rounded font-medium transition-colors ${
                        selectedType === 'case'
                          ? 'bg-accent/80 text-accent-foreground font-bold shadow-2xs'
                          : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      Case -5%
                    </button>
                  </div>

                  {/* Price & Add Button Row */}
                  <div className="flex items-center justify-between pt-1 border-t border-outline-variant/40">
                    <span className="font-headline font-bold text-xs text-foreground">
                      ${activePrice.toFixed(2)}
                    </span>
                    <button
                      type="button"
                      onClick={(e) => handleAddProduct(product, e)}
                      className="bg-primary text-primary-foreground text-[11px] font-bold px-3 py-1 rounded-md hover:bg-primary-container active:scale-95 transition-all shadow-xs"
                      aria-label={`Add ${product.name} to cart`}
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Interactive Product Details Modal */}
      <ProductDetailModal
        product={selectedProductForModal}
        onClose={() => setSelectedProductForModal(null)}
      />
    </div>
  )
}
