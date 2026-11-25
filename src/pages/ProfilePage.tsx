import React, { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  Camera,
  User,
  Bell,
  MapPin,
  HelpCircle,
  Info,
  RefreshCw,
  ChevronRight,
  Check,
  ShieldCheck,
  Mail,
  Phone,
  LogOut,
  ExternalLink,
  Heart,
  ShoppingBag,
  Trash2
} from 'lucide-react'
import { useWishlist } from '../context/WishlistContext'
import { useCart } from '../context/CartContext'
import { ProductDetailModal } from '../components/ProductDetailModal'
import type { Product } from '../types'

type ProfileView =
  | 'menu'
  | 'profile'
  | 'wishlist'
  | 'auto-delivery'
  | 'notifications'
  | 'addresses'
  | 'help'
  | 'about'

export const ProfilePage: React.FC = () => {
  const navigate = useNavigate()
  const { wishlistProducts, wishlistCount, removeFromWishlist, clearWishlist } = useWishlist()
  const { addItem } = useCart()
  const [activeView, setActiveView] = useState<ProfileView>('menu')
  const [selectedProductForModal, setSelectedProductForModal] = useState<Product | null>(null)

  // Mock profile details
  const [profileData, setProfileData] = useState({
    name: 'Sarah Jenkins',
    email: 'sarah.jenkins@example.com',
    phone: '+1 (555) 382-9012',
    memberTier: 'Pure Living VIP',
    memberSince: 'March 2024',
  })
  const [profileSaved, setProfileSaved] = useState(false)

  // Profile picture upload state with local persistence
  const [avatarUrl, setAvatarUrl] = useState<string | null>(() => {
    try {
      return localStorage.getItem('maxim_profile_avatar')
    } catch {
      return null
    }
  })
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onloadend = () => {
      const result = reader.result as string
      setAvatarUrl(result)
      try {
        localStorage.setItem('maxim_profile_avatar', result)
      } catch {
        // LocalStorage quota safety
      }
    }
    reader.readAsDataURL(file)
  }

  const handleRemoveAvatar = (e: React.MouseEvent) => {
    e.stopPropagation()
    setAvatarUrl(null)
    try {
      localStorage.removeItem('maxim_profile_avatar')
    } catch {
      // Safety
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  // Mock notification items
  const [notifications, setNotifications] = useState([
    {
      id: 'announcement',
      title: 'Special Store Offers & Delivery',
      desc: 'Free shipping on orders over $39.99 • Same-Day dispatch before 2:00 PM EST • 5% wholesale bulk savings on cases.',
      time: 'Ongoing',
      unread: true,
    },
    {
      id: '1',
      title: 'Auto-Delivery Dispatched',
      desc: 'Your monthly MyPeriodPlan™ shipment is on its way.',
      time: '2 hours ago',
      unread: true,
    },
    {
      id: '2',
      title: 'VIP Reward Available',
      desc: 'You earned 150 Eco-Points! Redeem $5 off your next order.',
      time: '1 day ago',
      unread: true,
    },
    {
      id: '3',
      title: 'Order Delivered',
      desc: 'Order #MX-8924 was safely delivered to your doorstep.',
      time: '3 days ago',
      unread: false,
    },
  ])

  // Mock addresses
  const addresses = [
    {
      id: 'addr-1',
      label: 'Home',
      recipient: 'Sarah Jenkins',
      street: '742 Evergreen Terrace, Apt 4B',
      cityStateZip: 'Brooklyn, NY 11201',
      isDefault: true,
    },
    {
      id: 'addr-2',
      label: 'Office',
      recipient: 'Sarah Jenkins (C/O Maxim)',
      street: '120 Broadway St, Suite 1400',
      cityStateZip: 'New York, NY 10005',
      isDefault: false,
    },
  ]

  const handleBack = () => {
    if (activeView !== 'menu') {
      setActiveView('menu')
    } else {
      if (window.history.state && window.history.state.idx > 0) {
        navigate(-1)
      } else {
        navigate('/')
      }
    }
  }

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })))
  }

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault()
    setProfileSaved(true)
    setTimeout(() => setProfileSaved(false), 2500)
  }

  return (
    <div className="flex flex-col gap-4 p-4 pb-28">
      {/* Top Header Bar with prominent Back Icon Button */}
      <div className="flex items-center justify-between pb-2 border-b border-black/5">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleBack}
            className="w-9 h-9 rounded-full bg-white border border-black/10 flex items-center justify-center text-neutral-800 hover:text-black hover:bg-neutral-50 shadow-2xs active:scale-95 transition-all"
            aria-label="Back"
          >
            <ArrowLeft className="w-4.5 h-4.5" />
          </button>
          <div>
            <h1 className="text-base sm:text-lg font-bold text-neutral-900 tracking-tight leading-tight">
              {activeView === 'menu' && 'My Profile'}
              {activeView === 'profile' && 'Personal Info'}
              {activeView === 'wishlist' && 'My Wishlist'}
              {activeView === 'auto-delivery' && 'Auto-Delivery Plan'}
              {activeView === 'notifications' && 'Notifications'}
              {activeView === 'addresses' && 'Delivery Addresses'}
              {activeView === 'help' && 'Help & Support'}
              {activeView === 'about' && 'About Maxim Hygiene'}
            </h1>
            {activeView === 'menu' && (
              <p className="text-[11px] text-neutral-500">Manage account, wishlist &amp; preferences</p>
            )}
          </div>
        </div>

        {activeView === 'notifications' && notifications.some((n) => n.unread) && (
          <button
            type="button"
            onClick={markAllNotificationsRead}
            className="text-[11px] font-semibold text-primary hover:underline"
          >
            Mark all read
          </button>
        )}

        {activeView === 'wishlist' && wishlistCount > 0 && (
          <button
            type="button"
            onClick={clearWishlist}
            className="text-[11px] font-semibold text-rose-600 hover:underline"
          >
            Clear all
          </button>
        )}
      </div>

      {/* ===================== VIEW 1: MAIN MENU ===================== */}
      {activeView === 'menu' && (
        <div className="flex flex-col gap-4 animate-in fade-in duration-150">
          {/* User Bio Card */}
          <div className="bg-gradient-to-br from-primary/5 via-rose-50/60 to-amber-50/40 border border-primary/15 rounded-2xl p-4 flex items-center justify-between shadow-2xs">
            <div className="flex items-center gap-3">
              <div
                onClick={() => setActiveView('profile')}
                className="w-12 h-12 rounded-full cursor-pointer overflow-hidden shrink-0 border border-primary/20 shadow-sm"
                title="View Personal Info"
              >
                {avatarUrl ? (
                  <img
                    src={avatarUrl}
                    alt={profileData.name}
                    className="w-full h-full object-cover rounded-full"
                  />
                ) : (
                  <div className="w-full h-full bg-primary text-white flex items-center justify-center font-bold text-lg">
                    SJ
                  </div>
                )}
              </div>
              <span className="font-bold text-sm sm:text-base text-neutral-900 leading-tight">
                {profileData.name}
              </span>
            </div>

            <button
              type="button"
              onClick={() => setActiveView('profile')}
              className="text-xs font-semibold text-primary hover:underline px-2 py-1"
            >
              Edit
            </button>
          </div>

          {/* Highlighted Auto-Delivery Feature Banner with Soft Organic Background */}
          <div
            onClick={() => setActiveView('auto-delivery')}
            className="bg-gradient-to-r from-amber-50/90 via-[#FFF8F0] to-rose-50/60 border border-amber-200/70 rounded-2xl p-3.5 flex items-center justify-between cursor-pointer hover:border-amber-300 transition-all shadow-2xs group active:scale-[0.99]"
          >
            <div className="flex items-center gap-3 min-w-0 flex-1 mr-2">
              <div className="w-9 h-9 rounded-full bg-amber-100/90 text-amber-800 flex items-center justify-center shadow-2xs shrink-0 group-hover:rotate-45 transition-transform duration-300">
                <RefreshCw className="w-4 h-4" />
              </div>
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-neutral-900 whitespace-nowrap">
                    MyPeriodPlan™
                  </span>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full border border-emerald-200/60 shadow-2xs whitespace-nowrap shrink-0">
                    Save 5%
                  </span>
                </div>
                <span className="text-[11px] text-neutral-600 font-medium truncate mt-0.5">
                  Active: Every 30 Days · Next dispatch Dec 15
                </span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:text-neutral-700 transition-colors shrink-0" />
          </div>

          {/* Menu List of Features */}
          <div className="bg-white border border-black/8 rounded-2xl overflow-hidden divide-y divide-black/5 shadow-2xs">
            {/* 1. My Wishlist */}
            <button
              type="button"
              onClick={() => setActiveView('wishlist')}
              className="w-full px-4 py-3.5 flex items-center justify-between hover:bg-neutral-50 transition-colors text-left"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center">
                  <Heart className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-neutral-900">My Wishlist</div>
                  <div className="text-[10px] text-neutral-500">Saved organic essentials for later</div>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                {wishlistCount > 0 && (
                  <span className="text-[10px] bg-rose-100 text-rose-700 font-semibold px-2 py-0.5 rounded-full">
                    {wishlistCount} saved
                  </span>
                )}
                <ChevronRight className="w-4 h-4 text-neutral-400" />
              </div>
            </button>

            {/* 3. Notifications */}
            <button
              type="button"
              onClick={() => setActiveView('notifications')}
              className="w-full px-4 py-3.5 flex items-center justify-between hover:bg-neutral-50 transition-colors text-left"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center">
                  <Bell className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-neutral-900">Notifications</div>
                  <div className="text-[10px] text-neutral-500">Cycle alerts, orders &amp; offers</div>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                {notifications.some((n) => n.unread) && (
                  <span className="text-[10px] bg-rose-500 text-white font-bold px-1.5 py-0.5 rounded-full">
                    {notifications.filter((n) => n.unread).length} new
                  </span>
                )}
                <ChevronRight className="w-4 h-4 text-neutral-400" />
              </div>
            </button>

            {/* 3. Personal Info */}
            <button
              type="button"
              onClick={() => setActiveView('profile')}
              className="w-full px-4 py-3.5 flex items-center justify-between hover:bg-neutral-50 transition-colors text-left"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                  <User className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-neutral-900">Personal Info</div>
                  <div className="text-[10px] text-neutral-500">Profile name, email &amp; phone</div>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-neutral-400" />
            </button>

            {/* 4. Delivery Addresses */}
            <button
              type="button"
              onClick={() => setActiveView('addresses')}
              className="w-full px-4 py-3.5 flex items-center justify-between hover:bg-neutral-50 transition-colors text-left"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-amber-50 text-amber-700 flex items-center justify-center">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-neutral-900">Delivery Addresses</div>
                  <div className="text-[10px] text-neutral-500">Saved shipping locations (Brooklyn, NY)</div>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-neutral-400" />
            </button>

            {/* 5. Help & Support */}
            <button
              type="button"
              onClick={() => setActiveView('help')}
              className="w-full px-4 py-3.5 flex items-center justify-between hover:bg-neutral-50 transition-colors text-left"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-purple-50 text-purple-700 flex items-center justify-center">
                  <HelpCircle className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-neutral-900">Help &amp; Support</div>
                  <div className="text-[10px] text-neutral-500">FAQs, customer helpline &amp; contact</div>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-neutral-400" />
            </button>

            {/* 6. About Maxim Hygiene */}
            <button
              type="button"
              onClick={() => setActiveView('about')}
              className="w-full px-4 py-3.5 flex items-center justify-between hover:bg-neutral-50 transition-colors text-left"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center">
                  <Info className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-neutral-900">About Maxim Hygiene</div>
                  <div className="text-[10px] text-neutral-500">100% Organic Cotton mission &amp; story</div>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-neutral-400" />
            </button>
          </div>

          {/* Quick Sign Out button */}
          <div className="pt-1 pb-4">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="w-full py-2.5 rounded-xl border border-black/8 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50 text-xs font-medium flex items-center justify-center gap-1.5 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" /> Sign Out
            </button>
          </div>
        </div>
      )}

      {/* ===================== VIEW 2: PERSONAL INFO ===================== */}
      {activeView === 'profile' && (
        <form onSubmit={handleSaveProfile} className="flex flex-col gap-4 animate-in fade-in duration-150">
          {/* Hidden File Input for Avatar Upload */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
          />

          <div className="flex items-center gap-3.5 p-3.5 bg-neutral-50 rounded-2xl border border-black/5">
            {/* Clickable Profile Picture / Avatar in marked section */}
            <div
              onClick={() => fileInputRef.current?.click()}
              className="relative w-14 h-14 rounded-full cursor-pointer group active:scale-95 transition-all shrink-0"
              title="Click to upload profile picture"
            >
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt={profileData.name}
                  className="w-full h-full rounded-full object-cover border-2 border-primary/20 shadow-xs"
                />
              ) : (
                <div className="w-full h-full rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg shadow-sm border-2 border-primary/20">
                  SJ
                </div>
              )}

              {/* Camera Icon Overlay Badge */}
              <div className="absolute -bottom-0.5 -right-0.5 w-5 h-5 rounded-full bg-neutral-900 text-white flex items-center justify-center shadow-xs border-2 border-white group-hover:bg-primary transition-colors">
                <Camera className="w-2.5 h-2.5" />
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-bold text-neutral-900 truncate">{profileData.name}</h3>
              <p className="text-[11px] text-neutral-500">Member since {profileData.memberSince}</p>

              {/* Upload & Remove Action Links */}
              <div className="flex items-center gap-2.5 mt-1">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="text-[10px] font-bold text-primary hover:underline flex items-center gap-1"
                >
                  <Camera className="w-3 h-3" />
                  <span>{avatarUrl ? 'Change Photo' : 'Upload Photo'}</span>
                </button>
                {avatarUrl && (
                  <button
                    type="button"
                    onClick={handleRemoveAvatar}
                    className="text-[10px] font-semibold text-rose-500 hover:underline"
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <div>
              <label className="text-[11px] font-bold text-neutral-700 mb-1 block">Full Name</label>
              <input
                type="text"
                value={profileData.name}
                onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                className="w-full text-xs p-2.5 bg-white border border-black/10 rounded-xl focus:outline-none focus:ring-1 focus:ring-primary"
                required
              />
            </div>

            <div>
              <label className="text-[11px] font-bold text-neutral-700 mb-1 block">Email Address</label>
              <input
                type="email"
                value={profileData.email}
                onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                className="w-full text-xs p-2.5 bg-white border border-black/10 rounded-xl focus:outline-none focus:ring-1 focus:ring-primary"
                required
              />
            </div>

            <div>
              <label className="text-[11px] font-bold text-neutral-700 mb-1 block">Phone Number</label>
              <input
                type="tel"
                value={profileData.phone}
                onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                className="w-full text-xs p-2.5 bg-white border border-black/10 rounded-xl focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>

            <div>
              <label className="text-[11px] font-bold text-neutral-700 mb-1 block">Care Preference</label>
              <div className="p-2.5 bg-neutral-50 border border-black/5 rounded-xl text-xs text-neutral-700 flex items-center justify-between">
                <span>100% Chlorine-Free Organic Cotton</span>
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
              </div>
            </div>
          </div>

          {profileSaved && (
            <div className="text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-xl p-2.5 flex items-center gap-2">
              <Check className="w-4 h-4" /> Profile changes saved successfully!
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 bg-neutral-900 text-white rounded-xl text-xs font-bold hover:bg-black transition-all shadow-sm mt-2"
          >
            Save Profile
          </button>
        </form>
      )}

      {/* ===================== VIEW 3: AUTO-DELIVERY (MyPeriodPlan) ===================== */}
      {activeView === 'auto-delivery' && (
        <div className="flex flex-col gap-4 animate-in fade-in duration-150">
          <div className="bg-gradient-to-tr from-primary/10 via-rose-50 to-amber-50/70 border border-primary/20 rounded-2xl p-4 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold tracking-wider text-primary">
                MyPeriodPlan™ Service
              </span>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded-full">
                Active Subscription
              </span>
            </div>
            <h3 className="text-base font-bold text-neutral-900">
              Zero Hassle Auto-Delivery
            </h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Never run out of pure organic cotton care. Your selected essentials are delivered automatically with a built-in 5% savings.
            </p>
          </div>

          {/* Current Active Plan Details */}
          <div className="bg-white border border-black/8 rounded-2xl p-4 flex flex-col gap-3 shadow-2xs">
            <div className="flex items-center justify-between border-b border-black/5 pb-2.5">
              <span className="text-xs font-bold text-neutral-900">Frequency &amp; Schedule</span>
              <span className="text-xs font-semibold text-primary">Every 30 Days</span>
            </div>

            <div className="flex flex-col gap-1.5 text-xs text-neutral-600">
              <div className="flex justify-between">
                <span>Next Dispatch:</span>
                <strong className="text-neutral-900">December 15, 2026</strong>
              </div>
              <div className="flex justify-between">
                <span>Auto-Ship Savings:</span>
                <span className="text-emerald-700 font-bold">5% Off Retail Price</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping:</span>
                <span className="text-emerald-700 font-bold">Free Eco-Friendly</span>
              </div>
            </div>

            <div className="bg-neutral-50 rounded-xl p-3 text-[11px] text-neutral-500">
              Includes: 1x Organic Cardboard Tampons (16ct) &amp; 1x Ultra Thin Day Pads (14ct)
            </div>
          </div>

          <button
            type="button"
            onClick={() => navigate('/subscribe')}
            className="w-full py-3 bg-primary text-white rounded-xl text-xs font-bold hover:bg-primary/90 transition-all flex items-center justify-center gap-2 shadow-sm"
          >
            <span>Manage &amp; Customize Auto-Delivery</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* ===================== VIEW 5: NOTIFICATIONS ===================== */}
      {activeView === 'notifications' && (
        <div className="flex flex-col gap-3 animate-in fade-in duration-150">
          <div className="flex items-center justify-between text-xs text-neutral-500 mb-1">
            <span>Alerts &amp; Updates</span>
            <button
              type="button"
              onClick={markAllNotificationsRead}
              className="text-[10px] text-primary font-semibold hover:underline"
            >
              Mark all as read
            </button>
          </div>

          {notifications.map((n) => (
            <div
              key={n.id}
              className={`p-3.5 rounded-2xl border transition-all ${
                n.unread
                  ? 'bg-rose-50/40 border-primary/20 shadow-2xs'
                  : 'bg-white border-black/8 opacity-80'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  {n.unread && <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0" />}
                  <h4 className="text-xs font-bold text-neutral-900">{n.title}</h4>
                </div>
                <span className="text-[10px] text-neutral-400 shrink-0">{n.time}</span>
              </div>
              <p className="text-[11px] text-neutral-600 mt-1 pl-4 leading-relaxed">{n.desc}</p>
            </div>
          ))}
        </div>
      )}

      {/* ===================== VIEW 6: DELIVERY ADDRESSES ===================== */}
      {activeView === 'addresses' && (
        <div className="flex flex-col gap-3 animate-in fade-in duration-150">
          <div className="flex items-center justify-between text-xs text-neutral-500 mb-1">
            <span>Saved Shipping Locations</span>
            <span className="text-[10px] text-primary font-semibold">2 Addresses</span>
          </div>

          {addresses.map((addr) => (
            <div
              key={addr.id}
              className="bg-white border border-black/8 rounded-2xl p-4 flex flex-col gap-2 shadow-2xs relative"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-neutral-900">{addr.label}</span>
                  {addr.isDefault && (
                    <span className="text-[9px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                      Default
                    </span>
                  )}
                </div>
                <span className="text-xs font-semibold text-primary hover:underline cursor-pointer">
                  Edit
                </span>
              </div>

              <div className="text-xs text-neutral-700">
                <div className="font-medium text-neutral-900">{addr.recipient}</div>
                <div>{addr.street}</div>
                <div className="text-neutral-500">{addr.cityStateZip}</div>
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={() => alert('Add Address form would open')}
            className="w-full py-3 border border-dashed border-black/20 hover:border-black/40 rounded-2xl text-xs font-semibold text-neutral-700 hover:bg-neutral-50 transition-all flex items-center justify-center gap-2 mt-1"
          >
            <MapPin className="w-3.5 h-3.5 text-primary" /> + Add New Delivery Address
          </button>
        </div>
      )}

      {/* ===================== VIEW 7: HELP & SUPPORT ===================== */}
      {activeView === 'help' && (
        <div className="flex flex-col gap-3 animate-in fade-in duration-150">
          <div className="bg-purple-50/60 border border-purple-100 rounded-2xl p-3.5">
            <h3 className="text-xs font-bold text-purple-950">We're here to assist you</h3>
            <p className="text-[11px] text-purple-900/80 mt-0.5 leading-relaxed">
              Have questions about our 100% organic products, order tracking or cycle planning?
            </p>
          </div>

          <div className="bg-white border border-black/8 rounded-2xl overflow-hidden divide-y divide-black/5">
            <button
              type="button"
              onClick={() => navigate('/faq')}
              className="w-full p-3.5 flex items-center justify-between hover:bg-neutral-50 text-left"
            >
              <div className="flex items-center gap-3">
                <HelpCircle className="w-4 h-4 text-primary" />
                <div>
                  <div className="text-xs font-bold text-neutral-900">Frequently Asked Questions</div>
                  <div className="text-[10px] text-neutral-500">Shipping, subscriptions, ingredients</div>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-neutral-400" />
            </button>

            <button
              type="button"
              onClick={() => navigate('/education')}
              className="w-full p-3.5 flex items-center justify-between hover:bg-neutral-50 text-left"
            >
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <div>
                  <div className="text-xs font-bold text-neutral-900">Period Health &amp; Cotton Guide</div>
                  <div className="text-[10px] text-neutral-500">Why organic matters for your body</div>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-neutral-400" />
            </button>

            <a
              href="mailto:support@maximhygiene.com"
              className="w-full p-3.5 flex items-center justify-between hover:bg-neutral-50 text-left"
            >
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-secondary" />
                <div>
                  <div className="text-xs font-bold text-neutral-900">Email Support</div>
                  <div className="text-[10px] text-neutral-500">support@maximhygiene.com (24hr reply)</div>
                </div>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-neutral-400" />
            </a>

            <a
              href="tel:18005556294"
              className="w-full p-3.5 flex items-center justify-between hover:bg-neutral-50 text-left"
            >
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-sky-600" />
                <div>
                  <div className="text-xs font-bold text-neutral-900">Customer Helpline</div>
                  <div className="text-[10px] text-neutral-500">1-800-555-MAXIM (Mon-Fri 9am-6pm)</div>
                </div>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-neutral-400" />
            </a>
          </div>
        </div>
      )}

      {/* ===================== VIEW 8: ABOUT US ===================== */}
      {activeView === 'about' && (
        <div className="flex flex-col gap-3.5 text-neutral-800 animate-in fade-in duration-150">
          <div className="bg-primary/5 border border-primary/15 rounded-2xl p-4 flex flex-col gap-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-primary">
              Our Pure Mission Since 2008
            </span>
            <h3 className="text-sm font-bold text-neutral-900">
              Better for your body, better for the earth.
            </h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Maxim Hygiene was founded to revolutionize feminine hygiene with pure, pesticide-free, chlorine-free organic cotton. We believe that your most intimate care should be clean, honest, and certified.
            </p>
          </div>

          <div className="bg-white border border-black/8 rounded-2xl p-4 flex flex-col gap-2.5 shadow-2xs">
            <span className="text-xs font-bold text-neutral-900">Our Clean Standard</span>
            <div className="grid grid-cols-2 gap-2 text-[11px] text-neutral-600">
              <div className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-primary" /> 100% Organic Cotton
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-primary" /> 0% Chlorine &amp; Dioxin
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-primary" /> Hypoallergenic
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-primary" /> Cruelty-Free Certified
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => navigate('/education')}
            className="w-full py-2.5 bg-neutral-900 text-white rounded-xl text-xs font-bold hover:bg-black transition-all"
          >
            Explore Educational Guides
          </button>
        </div>
      )}

      {/* ===================== VIEW 9: WISHLIST ===================== */}
      {activeView === 'wishlist' && (
        <div className="flex flex-col gap-3 animate-in fade-in duration-150">
          {wishlistProducts.length === 0 ? (
            <div className="bg-white border border-black/8 rounded-2xl p-8 flex flex-col items-center text-center gap-3 shadow-2xs mt-2">
              <div className="w-14 h-14 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center">
                <Heart className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-neutral-900">Your wishlist is empty</h3>
                <p className="text-xs text-neutral-500 mt-1 max-w-xs">
                  Tap the heart icon on any organic cotton product in the shop to save it here for quick access.
                </p>
              </div>
              <button
                type="button"
                onClick={() => navigate('/shop')}
                className="mt-1 px-6 py-2.5 bg-neutral-900 text-white text-xs font-semibold rounded-full hover:bg-black transition-all shadow-xs"
              >
                Browse Products
              </button>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between text-xs text-neutral-500 px-0.5">
                <span>{wishlistCount} {wishlistCount === 1 ? 'item' : 'items'} saved</span>
                <button
                  type="button"
                  onClick={() => navigate('/shop')}
                  className="text-[11px] font-semibold text-primary hover:underline"
                >
                  + Add more
                </button>
              </div>

              {wishlistProducts.map((product) => (
                <div
                  key={product.id}
                  onClick={() => setSelectedProductForModal(product)}
                  className="bg-white border border-black/8 rounded-2xl p-3 flex items-center gap-3 shadow-2xs hover:border-black/15 transition-all cursor-pointer"
                >
                  <div
                    className={`w-16 h-16 rounded-xl ${
                      product.pastelBg || 'bg-[#FDECEF]'
                    } p-1.5 shrink-0 flex items-center justify-center overflow-hidden`}
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-neutral-900 truncate">{product.name}</h4>
                    <p className="text-[11px] text-neutral-500 truncate mt-0.5">
                      {product.packCount} · {product.tagline}
                    </p>
                    <div className="text-xs font-extrabold text-neutral-900 mt-1">
                      ${product.packPrice.toFixed(2)}
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        addItem(product, 'pack', 1)
                      }}
                      className="h-8 px-2.5 rounded-full bg-neutral-900 text-white text-[10px] font-semibold hover:bg-black transition-all flex items-center gap-1 active:scale-95"
                      title="Add to Cart"
                    >
                      <ShoppingBag className="w-3 h-3" />
                      <span>Add</span>
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        removeFromWishlist(product.id)
                      }}
                      className="w-8 h-8 rounded-full bg-rose-50 text-rose-500 hover:bg-rose-100 flex items-center justify-center transition-all active:scale-95"
                      aria-label={`Remove ${product.name} from wishlist`}
                      title="Remove from Wishlist"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      )}

      <ProductDetailModal
        product={selectedProductForModal}
        onClose={() => setSelectedProductForModal(null)}
      />
    </div>
  )
}
