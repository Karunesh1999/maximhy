import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ShoppingBag, Menu, X, Leaf, Sparkles, BookOpen, Info, ShieldCheck } from 'lucide-react'
import { useCart } from '../context/CartContext'

export const Header: React.FC = () => {
  const { totalCount } = useCart()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 bg-surface-container-lowest/95 backdrop-blur-md border-b border-outline-variant/60 shadow-xs">
      {/* Announcement Strip */}
      <div className="bg-inverse-surface text-inverse-on-surface px-4 py-1.5 text-center text-xs tracking-wide font-medium flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-accent" />
        <span>Free Shipping $39.99+ · Same Day before 2pm EST</span>
      </div>

      {/* Main Bar */}
      <div className="px-4 py-3 flex items-center justify-between gap-3">
        {/* Menu toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted/60 rounded-md transition-colors"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-1.5 group">
          <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary/20 transition-colors">
            <Leaf className="w-4 h-4 fill-primary/30" />
          </div>
          <div className="flex flex-col">
            <span className="font-display font-bold text-xl tracking-tight text-primary leading-none">
              Maxim<span className="text-secondary font-headline">Hygiene</span>
            </span>
            <span className="text-[9px] uppercase tracking-wider text-muted-foreground font-semibold">
              100% Organic Cotton
            </span>
          </div>
        </Link>

        {/* Right actions */}
        <div className="flex items-center gap-1.5">
          <Link
            to="/cart"
            className="relative p-2 text-foreground hover:text-primary transition-colors rounded-full hover:bg-muted/40"
            aria-label="View Shopping Cart"
          >
            <ShoppingBag className="w-5 h-5" />
            {totalCount > 0 && (
              <span className="absolute top-0 right-0 w-4 h-4 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center animate-scale">
                {totalCount}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="border-t border-outline-variant bg-surface-container-lowest px-4 py-4 shadow-lg animate-in fade-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col gap-1 text-sm font-medium">
            <Link
              to="/shop"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2.5 px-3 rounded-lg hover:bg-accent/40 text-foreground flex items-center justify-between"
            >
              <span>Shop All Products</span>
              <span className="text-xs bg-muted px-2 py-0.5 rounded text-muted-foreground">10 Items</span>
            </Link>
            <Link
              to="/bundles"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2.5 px-3 rounded-lg hover:bg-accent/40 text-foreground flex items-center justify-between"
            >
              <span>Bundles &amp; Combos</span>
              <span className="text-xs text-primary font-bold">Save up to $7</span>
            </Link>
            <Link
              to="/subscribe"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2.5 px-3 rounded-lg hover:bg-accent/40 text-foreground flex items-center justify-between"
            >
              <span>MyPeriodPlan™ Auto-Delivery</span>
              <span className="text-xs text-secondary font-bold">Save 10%</span>
            </Link>
            <Link
              to="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2.5 px-3 rounded-lg hover:bg-accent/40 text-foreground flex items-center gap-2"
            >
              <Info className="w-4 h-4 text-muted-foreground" />
              <span>Our Organic Story &amp; Mission</span>
            </Link>
            <Link
              to="/education"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2.5 px-3 rounded-lg hover:bg-accent/40 text-foreground flex items-center gap-2"
            >
              <BookOpen className="w-4 h-4 text-muted-foreground" />
              <span>Period Health &amp; Cotton Guide</span>
            </Link>
            <Link
              to="/faq"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2.5 px-3 rounded-lg hover:bg-accent/40 text-foreground flex items-center gap-2"
            >
              <ShieldCheck className="w-4 h-4 text-muted-foreground" />
              <span>Help, FAQ &amp; Contact</span>
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
