import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ShoppingBag, Menu, X, Leaf, BookOpen, Info, ShieldCheck } from 'lucide-react'
import { useCart } from '../context/CartContext'

export const Header: React.FC = () => {
  const { totalCount } = useCart()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 bg-surface/90 backdrop-blur-md border-b border-black/5">
      {/* Main Bar */}
      <div className="px-4 py-2.5 flex items-center justify-between gap-3">
        {/* Menu toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="w-9 h-9 rounded-full bg-white/80 border border-black/6 flex items-center justify-center text-neutral-700 hover:text-black hover:bg-white shadow-2xs transition-all active:scale-95"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </button>

        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-1.5 group">
          <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary/20 transition-colors">
            <Leaf className="w-3.5 h-3.5 fill-primary/30" />
          </div>
          <div className="flex flex-col items-center">
            <span className="font-display font-bold text-lg tracking-tight text-primary leading-none">
              Maxim<span className="text-secondary font-headline">Hygiene</span>
            </span>
            <span className="text-[8px] uppercase tracking-widest text-neutral-500 font-semibold mt-0.5">
              100% Organic Cotton
            </span>
          </div>
        </Link>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          <Link
            to="/cart"
            className="w-9 h-9 rounded-full bg-white/80 border border-black/6 flex items-center justify-center text-neutral-700 hover:text-black hover:bg-white shadow-2xs transition-all relative active:scale-95"
            aria-label="View Shopping Cart"
          >
            <ShoppingBag className="w-4 h-4" />
            {totalCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-neutral-900 text-white text-[9px] font-bold flex items-center justify-center shadow-xs">
                {totalCount}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="border-t border-black/5 bg-white px-4 py-4 shadow-xl animate-in fade-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col gap-1 text-sm font-medium">
            <Link
              to="/shop"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2.5 px-3 rounded-xl hover:bg-neutral-50 text-neutral-800 flex items-center justify-between"
            >
              <span>Shop All Products</span>
              <span className="text-xs bg-neutral-100 px-2 py-0.5 rounded-full text-neutral-600 font-semibold">15 Items</span>
            </Link>
            <Link
              to="/bundles"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2.5 px-3 rounded-xl hover:bg-neutral-50 text-neutral-800 flex items-center justify-between"
            >
              <span>Bundles &amp; Combos</span>
              <span className="text-xs text-primary font-bold">Save up to $7</span>
            </Link>
            <Link
              to="/subscribe"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2.5 px-3 rounded-xl hover:bg-neutral-50 text-neutral-800 flex items-center justify-between"
            >
              <span>MyPeriodPlan™ Auto-Delivery</span>
              <span className="text-xs text-secondary font-bold">Save 5%</span>
            </Link>
            <Link
              to="/#about"
              onClick={() => {
                setMobileMenuOpen(false)
                const el = document.getElementById('about')
                if (el) el.scrollIntoView({ behavior: 'smooth' })
              }}
              className="py-2.5 px-3 rounded-xl hover:bg-neutral-50 text-neutral-800 flex items-center gap-2"
            >
              <Info className="w-4 h-4 text-neutral-400" />
              <span>Our Organic Story &amp; Mission</span>
            </Link>
            <Link
              to="/education"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2.5 px-3 rounded-xl hover:bg-neutral-50 text-neutral-800 flex items-center gap-2"
            >
              <BookOpen className="w-4 h-4 text-neutral-400" />
              <span>Period Health &amp; Cotton Guide</span>
            </Link>
            <Link
              to="/faq"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2.5 px-3 rounded-xl hover:bg-neutral-50 text-neutral-800 flex items-center gap-2"
            >
              <ShieldCheck className="w-4 h-4 text-neutral-400" />
              <span>Help, FAQ &amp; Contact</span>
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
