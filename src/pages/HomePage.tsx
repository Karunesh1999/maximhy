import React, { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import {
  Search,
  SlidersHorizontal,
  Mail,
  Bell,
  Heart,
  Star,
  Sparkles,
  Leaf,
  Layers,
  Droplets,
  Flower2,
  ShieldCheck,
  ChevronRight,
  Plus,
  Award,
  Globe,
  Shield,
  Check
} from 'lucide-react'
import { PRODUCTS } from '../data/products'
import type { Product, ProductCategory } from '../types'
import { useCart } from '../context/CartContext'
import { ProductDetailModal } from '../components/ProductDetailModal'

// Priority list of the 6 most common & essential products women require frequently
const CORE_ESSENTIAL_IDS = [
  'cardboard-tampons',
  'plastic-tampons',
  'ultra-thin-pads',
  'organic-pantiliners',
  'intimate-wipes',
  'maxion-pads'
]

export const HomePage: React.FC = () => {
  const { addItem } = useCart()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('all')
  const [wishlist, setWishlist] = useState<Record<string, boolean>>({})
  const [selectedProductForModal, setSelectedProductForModal] = useState<Product | null>(null)
  const [notificationOpen, setNotificationOpen] = useState(false)
  const [monthsOfCare, setMonthsOfCare] = useState(12)

  // Environmental impact calculation:
  const plasticPoundsSaved = (monthsOfCare * 1.5).toFixed(1)
  const plasticBottlesEquivalent = Math.round(monthsOfCare * 8)
  const chemicalsAvoidedPounds = (monthsOfCare * 0.4).toFixed(1)

  // Circular Category Icons matching the layout of the uploaded image
  const categoryIcons: { key: ProductCategory; label: string; icon: React.FC<{ className?: string }> }[] = [
    { key: 'all', label: 'All', icon: Sparkles },
    { key: 'tampons', label: 'Tampons', icon: Leaf },
    { key: 'pads-liners', label: 'Pads', icon: Layers },
    { key: 'wipes', label: 'Wipes', icon: Droplets },
    { key: 'beauty', label: 'Beauty', icon: Flower2 },
    { key: 'maternity', label: 'Maternity', icon: ShieldCheck },
  ]

  // Filtered featured products: By default, shows the 4-6 most common & important essentials
  const displayedProducts = useMemo(() => {
    if (searchQuery.trim()) {
      return PRODUCTS.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tagline.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 6)
    }

    if (selectedCategory !== 'all') {
      return PRODUCTS.filter((p) => p.category === selectedCategory).slice(0, 6)
    }

    // Default to the 6 most common everyday essentials
    return CORE_ESSENTIAL_IDS.map((id) => PRODUCTS.find((p) => p.id === id)).filter(Boolean) as Product[]
  }, [selectedCategory, searchQuery])

  const toggleWishlist = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setWishlist((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const handleQuickAdd = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation()
    addItem(product, 'pack', 1)
  }

  return (
    <div className="flex flex-col gap-5 p-4 pb-28">
      {/* 1. Top Section / Greeting Row matching the uploaded image */}
      <div className="flex items-center justify-between pt-1">
        <div className="flex flex-col">
          <span className="text-xs text-neutral-500 font-medium">Welcome,</span>
          <span className="text-lg font-bold text-neutral-900 tracking-tight">
            Pure &amp; Clean Living
          </span>
        </div>

        {/* Quick action buttons: Message & Notification with badge */}
        <div className="flex items-center gap-2">
          <Link
            to="/faq"
            className="w-10 h-10 rounded-full bg-white border border-black/8 flex items-center justify-center text-neutral-700 hover:text-black hover:bg-neutral-50 shadow-2xs transition-all active:scale-95"
            aria-label="Support &amp; FAQ"
          >
            <Mail className="w-4 h-4" />
          </Link>

          <button
            onClick={() => setNotificationOpen(!notificationOpen)}
            className="relative w-10 h-10 rounded-full bg-white border border-black/8 flex items-center justify-center text-neutral-700 hover:text-black hover:bg-neutral-50 shadow-2xs transition-all active:scale-95"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[9px] font-bold flex items-center justify-center shadow-xs">
              3
            </span>
          </button>
        </div>
      </div>

      {/* Notifications Drawer */}
      {notificationOpen && (
        <div className="bg-white border border-black/8 rounded-2xl p-3 shadow-md animate-in fade-in duration-150 text-xs flex flex-col gap-2">
          <div className="flex items-center justify-between border-b border-black/5 pb-1.5 font-bold text-neutral-900">
            <span>Special Announcements</span>
            <span className="text-[10px] text-secondary font-semibold">Active Offers</span>
          </div>
          <div className="flex flex-col gap-1.5 text-neutral-600 text-[11px]">
            <p>• <strong>Free Shipping:</strong> Automatically applied on all orders over $39.99.</p>
            <p>• <strong>Same-Day Dispatch:</strong> Orders before 2:00 PM EST ship today.</p>
            <p>• <strong>Bulk Savings:</strong> Cases of 12 include a built-in 5% wholesale discount.</p>
          </div>
        </div>
      )}

      {/* 2. Search Bar with Filter Icon matching uploaded image */}
      <div className="relative flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search organic tampons, pads, wipes..."
            className="w-full bg-white border border-black/8 rounded-full pl-10 pr-4 py-2.5 text-xs text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-neutral-900 shadow-2xs"
          />
        </div>

        <Link
          to="/shop"
          className="w-10 h-10 rounded-full bg-white border border-black/8 flex items-center justify-center text-neutral-700 hover:text-black hover:bg-neutral-50 shadow-2xs shrink-0"
          aria-label="Filter products"
        >
          <SlidersHorizontal className="w-4 h-4" />
        </Link>
      </div>

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

      {/* 4. Circular Category Icons Row matching the uploaded image */}
      <div className="flex items-center justify-between gap-1 overflow-x-auto no-scrollbar py-1">
        {categoryIcons.map((item) => {
          const Icon = item.icon
          const isSelected = selectedCategory === item.key

          return (
            <button
              key={item.key}
              onClick={() => setSelectedCategory(item.key)}
              className="flex flex-col items-center gap-1.5 min-w-[56px] transition-transform active:scale-95"
            >
              {/* Circular Icon Pill matching image */}
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                  isSelected
                    ? 'bg-neutral-900 text-white shadow-sm ring-2 ring-neutral-900/20'
                    : 'bg-white text-neutral-700 border border-black/8 hover:bg-neutral-50 shadow-2xs'
                }`}
              >
                <Icon className="w-5 h-5" />
              </div>

              {/* Label underneath */}
              <span
                className={`text-[11px] tracking-tight ${
                  isSelected ? 'font-bold text-neutral-900' : 'text-neutral-500 font-medium'
                }`}
              >
                {item.label}
              </span>
            </button>
          )
        })}
      </div>

      {/* 5. "Featured Products" Section matching the uploaded image */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between px-0.5">
          <h2 className="text-base font-bold text-neutral-900 tracking-tight">
            Featured Products
          </h2>
          <Link
            to="/shop"
            className="text-xs font-semibold text-primary hover:text-primary-container flex items-center gap-0.5"
          >
            <span>See all</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* 2-Column Product Grid matching uploaded image */}
        <div className="grid grid-cols-2 gap-3.5">
          {displayedProducts.map((product) => {
            const isWishlisted = !!wishlist[product.id]
            const discountBadge = product.isBestseller ? '20%' : '5%'
            const originalPrice = (product.packPrice * 1.15).toFixed(2)

            return (
              <div
                key={product.id}
                onClick={() => setSelectedProductForModal(product)}
                className="group bg-white border border-black/6 rounded-2xl p-3 flex flex-col justify-between shadow-2xs hover:shadow-xs transition-all cursor-pointer relative select-none"
              >
                {/* Top Row: Discount Pill Badge on left, Wishlist Heart on right matching image */}
                <div className="flex items-center justify-between w-full mb-1">
                  <span className="bg-rose-50 text-rose-600 border border-rose-200/60 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-2xs">
                    🏷️ {discountBadge}
                  </span>

                  <button
                    type="button"
                    onClick={(e) => toggleWishlist(product.id, e)}
                    className="w-7 h-7 rounded-full bg-white/80 border border-black/6 flex items-center justify-center text-neutral-500 hover:text-rose-500 shadow-2xs active:scale-90 transition-all"
                    aria-label="Wishlist"
                  >
                    <Heart
                      className={`w-3.5 h-3.5 ${
                        isWishlisted ? 'fill-rose-500 text-rose-500' : ''
                      }`}
                    />
                  </button>
                </div>

                {/* Centered Product Image matching sneaker showcase */}
                <div className="relative aspect-square w-full rounded-xl bg-neutral-50/70 p-2 flex items-center justify-center overflow-hidden my-1">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300 drop-shadow-sm"
                    loading="lazy"
                  />
                </div>

                {/* Details below matching image layout */}
                <div className="mt-1 flex flex-col">
                  <h3 className="text-xs font-bold text-neutral-900 leading-snug line-clamp-1">
                    {product.name}
                  </h3>

                  {/* Price Row: Bold current price + Strikethrough original price & Fast Add */}
                  <div className="flex items-center justify-between mt-0.5">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-sm font-bold text-neutral-900">
                        ${product.packPrice.toFixed(2)}
                      </span>
                      <span className="text-[11px] text-neutral-400 line-through">
                        ${originalPrice}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => handleQuickAdd(product, e)}
                      className="w-6 h-6 rounded-full bg-neutral-900 text-white flex items-center justify-center hover:bg-black shadow-2xs active:scale-90 transition-all shrink-0"
                      aria-label={`Add ${product.name} to cart`}
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Reviews & Sales line matching image: 4.8k reviews · 6.2k sold */}
                  <div className="flex items-center gap-1 text-[10px] text-neutral-500 mt-1">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400 shrink-0" />
                    <span className="font-bold text-neutral-800">{product.rating}</span>
                    <span className="text-neutral-400 truncate">({product.reviewsCount} reviews)</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* View All Products in Shop Button */}
        <div className="flex justify-center pt-1.5">
          <Link
            to="/shop"
            className="inline-flex items-center gap-1.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-semibold px-5 py-2.5 rounded-full border border-black/5 transition-all shadow-2xs active:scale-95"
          >
            <span>View All {PRODUCTS.length} Products in Shop</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* 6. Integrated About & Brand Trust Section with Generous Vertical Spacing & Padding */}
      <div id="about" className="flex flex-col gap-7 mt-6 pt-6 pb-4 border-t border-black/8 scroll-mt-20">
        {/* Brand Story Hero Card with proper p-5 sm:p-6 padding */}
        <div className="bg-white border border-black/6 rounded-3xl p-5 sm:p-6 shadow-2xs flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-secondary uppercase tracking-wider bg-secondary/10 px-2.5 py-1 rounded-full">
              <Leaf className="w-3.5 h-3.5" /> Founded in 2008
            </span>
            <span className="text-[11px] font-semibold text-neutral-400">Mother &amp; Daughter Vision</span>
          </div>

          <div className="aspect-16/9 rounded-2xl overflow-hidden bg-neutral-100 border border-black/5">
            <img
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&auto=format&fit=crop&q=80"
              alt="Rebecca Baum, Founder of Maxim Hygiene"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>

          <div className="space-y-1.5">
            <h3 className="text-base font-bold text-neutral-900 leading-snug">
              The Maxim Hygiene Story
            </h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Founded by <strong>Rebecca Baum</strong>, Maxim Hygiene was born from a personal awakening. Conventional pads and tampons often contain synthetic plastic mesh, wood pulp, and chlorine bleach residues. Rebecca created the first complete line of 100% certified organic cotton feminine care to give women uncompromising pure protection.
            </p>
          </div>
        </div>

        {/* 4 Clean Cotton Pillars with Breathing Room */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400 px-1">
            Our 4 Pure Cotton Promises
          </h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white p-4 rounded-2xl border border-black/6 shadow-2xs flex flex-col gap-2">
              <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                <Leaf className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-bold text-neutral-900">100% Organic Cotton</h4>
              <p className="text-[10px] text-neutral-500 leading-normal">
                Pure GOTS certified cotton core with zero synthetic plastic mesh.
              </p>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-black/6 shadow-2xs flex flex-col gap-2">
              <div className="w-8 h-8 rounded-full bg-secondary/10 text-secondary flex items-center justify-center">
                <Shield className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-bold text-neutral-900">Total Chlorine-Free</h4>
              <p className="text-[10px] text-neutral-500 leading-normal">
                Never bleached with chlorine. Zero dioxin toxins ever touch your body.
              </p>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-black/6 shadow-2xs flex flex-col gap-2">
              <div className="w-8 h-8 rounded-full bg-amber-500/10 text-amber-600 flex items-center justify-center">
                <Heart className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-bold text-neutral-900">Hypoallergenic</h4>
              <p className="text-[10px] text-neutral-500 leading-normal">
                Breathable, soft fibers prevent chafing, sweat rash, and irritation.
              </p>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-black/6 shadow-2xs flex flex-col gap-2">
              <div className="w-8 h-8 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
                <Globe className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-bold text-neutral-900">Biodegradable</h4>
              <p className="text-[10px] text-neutral-500 leading-normal">
                Naturally compostable organic fibers that decompose safely into earth.
              </p>
            </div>
          </div>
        </div>

        {/* Interactive Personal Planet Impact Calculator */}
        <div className="bg-white border border-black/6 rounded-3xl p-5 sm:p-6 shadow-2xs flex flex-col gap-3.5">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-neutral-900 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-primary" />
              <span>Your Personal Planet Impact</span>
            </h3>
            <span className="text-xs font-bold text-primary bg-primary/10 px-2.5 py-0.5 rounded-full">
              {monthsOfCare} Months
            </span>
          </div>

          <p className="text-[11px] text-neutral-500 leading-normal">
            Slide to see your plastic and chemical reduction by switching to Maxim:
          </p>

          <input
            type="range"
            min="1"
            max="36"
            value={monthsOfCare}
            onChange={(e) => setMonthsOfCare(Number(e.target.value))}
            className="w-full accent-primary cursor-pointer my-1"
          />

          <div className="grid grid-cols-3 gap-2 bg-neutral-50 p-3 rounded-2xl text-center border border-black/5 mt-1">
            <div>
              <div className="font-bold text-sm text-secondary">{plasticBottlesEquivalent}</div>
              <div className="text-[9px] text-neutral-500 mt-0.5">Bottles Diverted</div>
            </div>
            <div>
              <div className="font-bold text-sm text-primary">{plasticPoundsSaved} lbs</div>
              <div className="text-[9px] text-neutral-500 mt-0.5">Plastic Waste Saved</div>
            </div>
            <div>
              <div className="font-bold text-sm text-neutral-900">{chemicalsAvoidedPounds} lbs</div>
              <div className="text-[9px] text-neutral-500 mt-0.5">Bleach Averted</div>
            </div>
          </div>
        </div>

        {/* Certifications Strip */}
        <div className="bg-neutral-50 p-4 sm:p-5 rounded-2xl border border-black/5 flex flex-col gap-2.5">
          <span className="text-xs font-bold text-neutral-900 flex items-center gap-1.5">
            <Award className="w-4 h-4 text-primary" /> Global Certifications &amp; Standards
          </span>
          <div className="grid grid-cols-2 gap-2.5 text-[10px] text-neutral-600 font-medium pt-1">
            <div className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-secondary" /> GOTS Global Organic
            </div>
            <div className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-secondary" /> ICEA Certified Eco
            </div>
            <div className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-secondary" /> Cruelty-Free Leaping Bunny
            </div>
            <div className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-secondary" /> HSA/FSA Eligible
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Product Details Modal */}
      <ProductDetailModal
        product={selectedProductForModal}
        onClose={() => setSelectedProductForModal(null)}
      />
    </div>
  )
}
