import React, { useState, useMemo, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import { PRODUCTS } from '../data/products'
import type { Product, ProductCategory } from '../types'
import { ProductDetailModal } from '../components/ProductDetailModal'

// Featured products listed on maximhy.com homepage
const FEATURED_PRODUCT_IDS = [
  'cardboard-tampons',
  'tampons-cardboard-super',
  'cardboard-applicator-superplus-pack',
  'plastic-tampons',
  'plastic-applicator-super-pack',
  'ultra-thin-pads',
  'pads-ultra-thin-super-night-pack',
  'organic-pantiliners',
  'maxion-pads',
  'intimate-wipes',
  'baby-wipes',
  'cotton-rounds',
  'maternity-nursing',
  'period-underwear'
]

// Category-wise sections configuration for Home Page
const CATEGORY_SECTIONS: {
  key: ProductCategory
  title: string
}[] = [
  { key: 'tampons', title: 'Tampons' },
  { key: 'pads-liners', title: 'Pads & Liners' },
  { key: 'wipes', title: 'Organic Wipes' },
  { key: 'beauty', title: 'Beauty & Personal Care' },
  { key: 'maternity', title: 'Maternity & Postpartum' },
  { key: 'underwear', title: 'Period Underwear' },
]

export const HomePage: React.FC = () => {
  const [selectedProductForModal, setSelectedProductForModal] = useState<Product | null>(null)

  // Curated Featured Products matching maximhy.com homepage picks
  const displayedProducts = useMemo(() => {
    return FEATURED_PRODUCT_IDS.map((id) => PRODUCTS.find((p) => p.id === id)).filter(Boolean) as Product[]
  }, [])

  const carouselRef = useRef<HTMLDivElement>(null)
  const [activeCarouselIndex, setActiveCarouselIndex] = useState(0)

  const handleCarouselScroll = () => {
    if (!carouselRef.current) return
    const container = carouselRef.current
    const index = Math.round(container.scrollLeft / 140)
    setActiveCarouselIndex(Math.min(displayedProducts.length - 1, Math.max(0, index)))
  }

  return (
    <div className="flex flex-col gap-5 p-4 pb-28">
      {/* 3. Horizontal Promo Banner Carousel matching the uploaded image */}
      <div className="flex gap-3.5 overflow-x-auto no-scrollbar py-1 snap-x snap-mandatory">
        {/* Banner Card 1: Warm Amber/Berry Organic Cotton Card */}
        <div className="snap-start shrink-0 w-[290px] sm:w-[320px] rounded-3xl p-5 bg-gradient-to-r from-[#FDE2A7] via-[#FFD884] to-[#FCE8BD] text-neutral-900 shadow-sm relative overflow-hidden flex flex-col justify-between min-h-[160px]">
          {/* Background Decorative Graphic */}
          <div className="absolute -right-6 -bottom-6 w-36 h-36 rounded-full bg-white/30 blur-xl pointer-events-none" />

          {/* Product Cutout Image on the right matching sneaker in image */}
          <img
            src="/images/products/tampons-cardboard-reg.jpg"
            alt="Organic Cotton Tampons"
            className="absolute right-2 top-1/2 -translate-y-1/2 w-28 h-28 object-contain drop-shadow-lg pointer-events-none"
          />

          <div className="relative z-10 max-w-[62%]">
            <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-700">
              100% Certified
            </span>
            <h2 className="text-base font-extrabold text-neutral-900 leading-snug mt-0.5">
              Organic Cotton Tampons
            </h2>
            <p className="text-[11px] text-neutral-700 mt-1 leading-tight line-clamp-2">
              Smooth applicator &amp; chlorine-free leak protection.
            </p>
          </div>

          <div className="relative z-10 mt-3">
            <Link
              to="/shop"
              className="inline-block bg-neutral-900 text-white text-xs font-bold px-4 py-2 rounded-full hover:bg-black active:scale-95 transition-all shadow-xs"
            >
              Get 5% discount
            </Link>
          </div>
        </div>

        {/* Banner Card 2: Sky/Mint MaxION™ Technology Card */}
        <div className="snap-start shrink-0 w-[290px] sm:w-[320px] rounded-3xl p-5 bg-gradient-to-r from-[#D6EAF8] via-[#CFE6FA] to-[#E8F4FC] text-neutral-900 shadow-sm relative overflow-hidden flex flex-col justify-between min-h-[160px]">
          <img
            src="/images/products/pads-maxion.jpg"
            alt="MaxION Tourmaline Pads"
            className="absolute right-2 top-1/2 -translate-y-1/2 w-28 h-28 object-contain drop-shadow-lg pointer-events-none"
          />

          <div className="relative z-10 max-w-[62%]">
            <span className="text-[10px] font-bold uppercase tracking-wider text-sky-800">
              Patented MaxION™
            </span>
            <h2 className="text-base font-extrabold text-neutral-900 leading-snug mt-0.5">
              Silver &amp; Tourmaline Pads
            </h2>
            <p className="text-[11px] text-neutral-700 mt-1 leading-tight line-clamp-2">
              Negative ions naturally neutralize odor and inflammation.
            </p>
          </div>

          <div className="relative z-10 mt-3">
            <Link
              to="/shop"
              className="inline-block bg-neutral-900 text-white text-xs font-bold px-4 py-2 rounded-full hover:bg-black active:scale-95 transition-all shadow-xs"
            >
              Buy Now
            </Link>
          </div>
        </div>

        {/* Banner Card 3: Rose/Berry MyPeriodPlan Card */}
        <div className="snap-start shrink-0 w-[290px] sm:w-[320px] rounded-3xl p-5 bg-gradient-to-r from-[#FCDAE2] via-[#F8C8D4] to-[#FCE8EE] text-neutral-900 shadow-sm relative overflow-hidden flex flex-col justify-between min-h-[160px]">
          <img
            src="/images/products/bundle-tampons-combo.jpg"
            alt="MyPeriodPlan Bundle"
            className="absolute right-2 top-1/2 -translate-y-1/2 w-28 h-28 object-contain drop-shadow-lg pointer-events-none"
          />

          <div className="relative z-10 max-w-[62%]">
            <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
              Auto-Delivery
            </span>
            <h2 className="text-base font-extrabold text-neutral-900 leading-snug mt-0.5">
              MyPeriodPlan™
            </h2>
            <p className="text-[11px] text-neutral-700 mt-1 leading-tight line-clamp-2">
              Subscribe &amp; save 5% on scheduled cycle deliveries.
            </p>
          </div>

          <div className="relative z-10 mt-3">
            <Link
              to="/subscribe"
              className="inline-block bg-primary text-white text-xs font-bold px-4 py-2 rounded-full hover:bg-primary-container active:scale-95 transition-all shadow-xs"
            >
              Subscribe
            </Link>
          </div>
        </div>
      </div>

     

      {/* 5. "Featured Products" Section as Single Row Horizontal Circular Carousel */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between px-0.5">
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-neutral-900 tracking-tight">
              Featured Products
            </h2>
            <span className="text-[10px] bg-neutral-100 text-neutral-600 font-semibold px-2 py-0.5 rounded-full">
              {displayedProducts.length} items
            </span>
          </div>
        </div>

        {/* Single Row Horizontal Swipeable Carousel with Image & Name only */}
        <div
          ref={carouselRef}
          onScroll={handleCarouselScroll}
          className="flex gap-3 overflow-x-auto no-scrollbar py-2 px-0.5 snap-x snap-mandatory"
        >
          {displayedProducts.map((product) => (
            <div
              key={product.id}
              onClick={() => setSelectedProductForModal(product)}
              className="w-[124px] sm:w-[134px] shrink-0 snap-start flex flex-col items-center gap-2 group cursor-pointer select-none transition-transform active:scale-95"
            >
              {/* Product Image Card */}
              <div className="w-full aspect-square rounded-2xl bg-white border border-black/8 p-3 flex items-center justify-center shadow-2xs group-hover:shadow-xs group-hover:border-black/20 transition-all">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300 drop-shadow-2xs"
                  loading="lazy"
                />
              </div>

              {/* Product Name Below Image */}
              <span className="text-[11px] font-semibold text-neutral-800 text-center leading-snug line-clamp-2 px-1 group-hover:text-primary transition-colors">
                {product.name}
              </span>
            </div>
          ))}
        </div>

        {/* Circular Pagination Progress Dots */}
        {displayedProducts.length > 1 && (
          <div className="flex items-center justify-center gap-1 pt-0.5">
            {displayedProducts.slice(0, 10).map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  if (carouselRef.current) {
                    carouselRef.current.scrollTo({ left: idx * 140, behavior: 'smooth' })
                  }
                }}
                className={`transition-all duration-200 rounded-full ${
                  activeCarouselIndex === idx
                    ? 'w-4 h-1.5 bg-neutral-900'
                    : 'w-1.5 h-1.5 bg-neutral-300 hover:bg-neutral-400'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Category Wise Sections (2-row, 3-column layout with 3 cards each) */}
      <div className="flex flex-col gap-7 pt-1">
        {CATEGORY_SECTIONS.map((sec) => {
          const categoryProducts = PRODUCTS.filter((p) => p.category === sec.key).slice(0, 3)
          if (categoryProducts.length === 0) return null

          return (
            <section key={sec.key} className="flex flex-col gap-2.5">
              {/* Row 1: Category Header with Title & "See more" Link */}
              <div className="flex items-center justify-between">
                <h2 className="text-[15px] sm:text-base font-bold text-neutral-900 font-serif tracking-tight">
                  {sec.title}
                </h2>
                <Link
                  to={`/shop?category=${sec.key}`}
                  className="inline-flex items-center gap-0.5 text-xs font-semibold text-primary hover:text-primary/80 transition-colors"
                >
                  <span>See more</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Row 2: 3 Columns with 3 Cards (Product Image & Name only) */}
              <div className="grid grid-cols-3 gap-2.5">
                {categoryProducts.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => setSelectedProductForModal(product)}
                    className="flex flex-col items-center group cursor-pointer select-none transition-transform active:scale-95"
                  >
                    {/* Minimalist Card Box with Product Image */}
                    <div className="w-full aspect-square rounded-2xl bg-white border border-black/8 p-2.5 flex items-center justify-center shadow-2xs group-hover:shadow-xs group-hover:border-black/20 transition-all">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300 drop-shadow-2xs"
                        loading="lazy"
                      />
                    </div>

                    {/* Product Name Below Card */}
                    <span className="text-[11px] font-semibold text-neutral-800 text-center leading-snug line-clamp-2 px-0.5 mt-1.5 group-hover:text-primary transition-colors">
                      {product.name}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          )
        })}
      </div>

      {/* Interactive Product Details Modal */}
      <ProductDetailModal
        product={selectedProductForModal}
        onClose={() => setSelectedProductForModal(null)}
      />
    </div>
  )
}
