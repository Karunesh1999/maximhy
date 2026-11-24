import React, { useState, useMemo, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Search, Heart, Plus, Check, X } from 'lucide-react'
import { PRODUCTS } from '../data/products'
import type { Product, ProductCategory } from '../types'
import { useCart } from '../context/CartContext'
import { ProductDetailModal } from '../components/ProductDetailModal'

export const ShopPage: React.FC = () => {
  const { addItem } = useCart()
  const [searchParams] = useSearchParams()
  const categoryParam = (searchParams.get('category') as ProductCategory) || 'all'
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState<ProductCategory>(categoryParam)

  useEffect(() => {
    if (categoryParam) {
      setActiveCategory(categoryParam)
    }
  }, [categoryParam])
  const [productTypeSelections, setProductTypeSelections] = useState<Record<string, 'pack' | 'case'>>({})
  const [wishlist, setWishlist] = useState<Record<string, boolean>>({})
  const [selectedProductForModal, setSelectedProductForModal] = useState<Product | null>(null)

  const categories: { key: ProductCategory; label: string }[] = [
    { key: 'all', label: 'All' },
    { key: 'tampons', label: 'Tampons' },
    { key: 'pads-liners', label: 'Pads & Liners' },
    { key: 'wipes', label: 'Wipes' },
    { key: 'beauty', label: 'Beauty' },
    { key: 'maternity', label: 'Maternity' },
    { key: 'underwear', label: 'Underwear' },
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

  const toggleProductType = (productId: string, type: 'pack' | 'case', e: React.MouseEvent) => {
    e.stopPropagation()
    setProductTypeSelections((prev) => ({
      ...prev,
      [productId]: type,
    }))
  }

  const toggleWishlist = (productId: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setWishlist((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }))
  }

  const handleAddProduct = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation()
    const selectedType = productTypeSelections[product.id] || 'pack'
    addItem(product, selectedType, 1)
  }

  return (
    <div className="flex flex-col gap-5 p-4 pb-28">
      {/* Minimal Search Pill matching Image 1 */}
      <div className="relative">
        <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search tampons, pads, wipes, beauty..."
          className="w-full bg-white/90 border border-black/8 rounded-full pl-10 pr-9 py-2.5 text-xs text-neutral-800 focus:outline-none focus:ring-1 focus:ring-neutral-900 focus:bg-white placeholder:text-neutral-400 transition-all shadow-2xs"
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

      {/* Category Pills matching Image 1 */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5 -mx-1 px-1">
        {categories.map((cat) => {
          const isActive = activeCategory === cat.key
          return (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all active:scale-95 ${
                isActive
                  ? 'bg-neutral-900 text-white shadow-xs'
                  : 'bg-white/80 text-neutral-600 hover:text-neutral-900 hover:bg-white border border-black/6 shadow-2xs'
              }`}
            >
              {cat.label}
            </button>
          )
        })}
      </div>

      {/* Results Counter & Free Shipping Notification */}
      <div className="flex items-center justify-between text-xs text-neutral-500 px-1">
        <span>{filteredProducts.length} Products Available</span>
        <span className="flex items-center gap-1 text-[11px] text-secondary font-semibold">
          <Check className="w-3.5 h-3.5 text-secondary" /> HSA/FSA Eligible
        </span>
      </div>

      {/* Product Grid - 2 Columns on Mobile matching Image 1 */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-3xl p-6 border border-black/5 shadow-xs">
          <p className="text-sm font-semibold text-neutral-800">No products found</p>
          <p className="text-xs text-neutral-500 mt-1">Try another search keyword or switch categories.</p>
          <button
            onClick={() => {
              setSearchQuery('')
              setActiveCategory('all')
            }}
            className="mt-4 text-xs bg-neutral-900 text-white px-5 py-2 rounded-full font-semibold hover:bg-black"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3.5">
          {filteredProducts.map((product) => {
            const selectedType = productTypeSelections[product.id] || 'pack'
            const activePrice = selectedType === 'pack' ? product.packPrice : product.casePrice
            const isWishlisted = !!wishlist[product.id]

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
                  } rounded-[28px] p-3 flex items-center justify-center overflow-hidden shadow-2xs transition-transform duration-200 group-hover:-translate-y-1`}
                >
                  {/* Wishlist Heart Button in circle matching Image 1 */}
                  <button
                    type="button"
                    onClick={(e) => toggleWishlist(product.id, e)}
                    className="absolute top-2.5 right-2.5 z-10 w-7 h-7 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center text-neutral-500 hover:text-rose-500 hover:bg-white shadow-2xs transition-all active:scale-90"
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
                    className="w-full h-full object-contain p-1 group-hover:scale-105 transition-transform duration-300 drop-shadow-sm"
                    loading="lazy"
                  />
                </div>

                {/* Information below pastel box matching Image 1 */}
                <div className="mt-2.5 px-0.5 flex flex-col">
                  <h3 className="text-xs sm:text-sm font-semibold text-neutral-900 leading-snug line-clamp-1">
                    {product.name}
                  </h3>
                  <p className="text-[11px] text-neutral-500 line-clamp-1 mt-0.5">
                    {selectedType === 'pack' ? product.packCount : product.caseCount}
                  </p>

                  {/* Pack vs Case 12 Selector Pills */}
                  <div className="mt-2 grid grid-cols-2 gap-1 bg-neutral-100 p-0.5 rounded-full border border-black/5">
                    <button
                      type="button"
                      onClick={(e) => toggleProductType(product.id, 'pack', e)}
                      className={`text-[9px] py-0.5 px-1.5 rounded-full font-semibold transition-all ${
                        selectedType === 'pack'
                          ? 'bg-white text-neutral-900 shadow-2xs'
                          : 'text-neutral-500 hover:text-neutral-800'
                      }`}
                    >
                      Pack
                    </button>
                    <button
                      type="button"
                      onClick={(e) => toggleProductType(product.id, 'case', e)}
                      className={`text-[9px] py-0.5 px-1.5 rounded-full font-semibold transition-all ${
                        selectedType === 'case'
                          ? 'bg-white text-neutral-900 shadow-2xs'
                          : 'text-neutral-500 hover:text-neutral-800'
                      }`}
                    >
                      Case -5%
                    </button>
                  </div>

                  {/* Price & Fast Add Action */}
                  <div className="flex items-center justify-between mt-2 pt-1">
                    <span className="text-sm font-bold text-neutral-900">
                      ${activePrice.toFixed(2)}
                    </span>
                    <button
                      type="button"
                      onClick={(e) => handleAddProduct(product, e)}
                      className="w-7 h-7 rounded-full bg-neutral-900 text-white flex items-center justify-center hover:bg-black shadow-xs transition-all active:scale-90"
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
