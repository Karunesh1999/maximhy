import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  User,
  Package,
  Bell,
  MapPin,
  HelpCircle,
  Info,
  RefreshCw,
  X,
  ChevronRight,
  ArrowLeft,
  Check,
  Truck,
  ShieldCheck,
  Mail,
  Phone,
  Sparkles,
  LogOut,
  ExternalLink
} from 'lucide-react'

interface ProfileModalProps {
  isOpen: boolean
  onClose: () => void
}

type ProfileView =
  | 'menu'
  | 'profile'
  | 'orders'
  | 'auto-delivery'
  | 'notifications'
  | 'addresses'
  | 'help'
  | 'about'

export const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate()
  const [activeView, setActiveView] = useState<ProfileView>('menu')

  // Mock profile details
  const [profileData, setProfileData] = useState({
    name: 'Sarah Jenkins',
    email: 'sarah.jenkins@example.com',
    phone: '+1 (555) 382-9012',
    memberTier: 'Pure Living VIP',
    memberSince: 'March 2024',
  })
  const [profileSaved, setProfileSaved] = useState(false)

  // Mock notification items
  const [notifications, setNotifications] = useState([
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

  // Mock orders
  const orders = [
    {
      id: 'MX-9031',
      date: 'Nov 23, 2026',
      total: '$19.86',
      status: 'In Transit',
      statusColor: 'text-amber-600 bg-amber-50 border-amber-200',
      items: '2x Organic Cotton Tampons (16ct)',
      deliveryEstimate: 'Arriving Tomorrow, Nov 25',
    },
    {
      id: 'MX-8924',
      date: 'Nov 12, 2026',
      total: '$24.64',
      status: 'Delivered',
      statusColor: 'text-emerald-700 bg-emerald-50 border-emerald-200',
      items: '1x MaxION™ Silver Ion Pads (14ct), 1x Makeup Ovals (50ct)',
      deliveryEstimate: 'Delivered to Doorstep',
    },
    {
      id: 'MX-8410',
      date: 'Oct 15, 2026',
      total: '$32.90',
      status: 'Delivered',
      statusColor: 'text-emerald-700 bg-emerald-50 border-emerald-200',
      items: '1x Ultra Thin Day Pads Bundle (4-Pack)',
      deliveryEstimate: 'Delivered',
    },
  ]

  if (!isOpen) return null

  const handleNavigate = (path: string) => {
    onClose()
    navigate(path)
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
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-md max-h-[90vh] rounded-t-[32px] sm:rounded-[32px] overflow-hidden shadow-2xl flex flex-col relative animate-in slide-in-from-bottom-4 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header of the Profile Modal */}
        <div className="px-5 pt-4 pb-3 border-b border-black/6 flex items-center justify-between bg-surface/50">
          <div className="flex items-center gap-2">
            {activeView !== 'menu' && (
              <button
                onClick={() => setActiveView('menu')}
                className="w-8 h-8 rounded-full bg-white border border-black/8 flex items-center justify-center text-neutral-700 hover:text-black hover:bg-neutral-50 shadow-2xs active:scale-95 transition-all"
                aria-label="Back to Profile menu"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
            )}
            <h2 className="text-base font-bold text-neutral-900 tracking-tight">
              {activeView === 'menu' && 'Account & Profile'}
              {activeView === 'profile' && 'Your Profile'}
              {activeView === 'orders' && 'Product Orders'}
              {activeView === 'auto-delivery' && 'Auto-Delivery Plan'}
              {activeView === 'notifications' && 'Notifications'}
              {activeView === 'addresses' && 'Your Addresses'}
              {activeView === 'help' && 'Help & Support'}
              {activeView === 'about' && 'About Maxim Hygiene'}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white border border-black/8 flex items-center justify-center text-neutral-600 hover:text-black hover:bg-neutral-50 shadow-2xs active:scale-95 transition-all"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Content Container */}
        <div className="overflow-y-auto no-scrollbar p-5 flex-1">
          {/* ===================== VIEW 1: MAIN MENU ===================== */}
          {activeView === 'menu' && (
            <div className="flex flex-col gap-4">
              {/* User Bio Card */}
              <div className="bg-gradient-to-br from-primary/5 via-rose-50/60 to-amber-50/40 border border-primary/15 rounded-2xl p-4 flex items-center justify-between shadow-2xs">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg shadow-sm">
                    SJ
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-sm text-neutral-900">{profileData.name}</span>
                      <span className="inline-flex items-center gap-1 text-[9px] font-bold bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                        <Sparkles className="w-2.5 h-2.5" /> VIP
                      </span>
                    </div>
                    <span className="text-xs text-neutral-500">{profileData.email}</span>
                    <span className="text-[10px] text-neutral-400 mt-0.5">
                      Member since {profileData.memberSince}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setActiveView('profile')}
                  className="text-xs font-semibold text-primary hover:underline px-2 py-1"
                >
                  Edit
                </button>
              </div>

              {/* Highlighted Auto-Delivery Feature Banner (Moved from bottom navbar) */}
              <div
                onClick={() => setActiveView('auto-delivery')}
                className="bg-neutral-900 text-white rounded-2xl p-3.5 flex items-center justify-between cursor-pointer hover:bg-neutral-800 transition-colors shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-amber-300">
                    <RefreshCw className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold">MyPeriodPlan™ Auto-Delivery</span>
                      <span className="text-[9px] bg-secondary/30 text-amber-200 font-bold px-1.5 py-0.5 rounded-full">
                        Save 5%
                      </span>
                    </div>
                    <span className="text-[11px] text-neutral-300">
                      Active: Every 30 Days · Next dispatch Dec 15
                    </span>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-neutral-400" />
              </div>

              {/* Menu List of Features */}
              <div className="bg-white border border-black/8 rounded-2xl overflow-hidden divide-y divide-black/5 shadow-2xs">
                {/* 1. Product Orders */}
                <button
                  onClick={() => setActiveView('orders')}
                  className="w-full px-4 py-3.5 flex items-center justify-between hover:bg-neutral-50 transition-colors text-left"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-sky-50 text-sky-700 flex items-center justify-center">
                      <Package className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-neutral-900">Product Orders</div>
                      <div className="text-[10px] text-neutral-500">Track shipments &amp; order history</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] bg-sky-100 text-sky-800 font-semibold px-2 py-0.5 rounded-full">
                      1 In Transit
                    </span>
                    <ChevronRight className="w-4 h-4 text-neutral-400" />
                  </div>
                </button>

                {/* 2. Notifications */}
                <button
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
                        2 new
                      </span>
                    )}
                    <ChevronRight className="w-4 h-4 text-neutral-400" />
                  </div>
                </button>

                {/* 3. Your Profile */}
                <button
                  onClick={() => setActiveView('profile')}
                  className="w-full px-4 py-3.5 flex items-center justify-between hover:bg-neutral-50 transition-colors text-left"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                      <User className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-neutral-900">Your Profile</div>
                      <div className="text-[10px] text-neutral-500">Personal info &amp; care preferences</div>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-neutral-400" />
                </button>

                {/* 4. Your Address */}
                <button
                  onClick={() => setActiveView('addresses')}
                  className="w-full px-4 py-3.5 flex items-center justify-between hover:bg-neutral-50 transition-colors text-left"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-amber-50 text-amber-700 flex items-center justify-center">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-neutral-900">Your Address</div>
                      <div className="text-[10px] text-neutral-500">Saved delivery locations (Brooklyn, NY)</div>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-neutral-400" />
                </button>

                {/* 5. Help & Support */}
                <button
                  onClick={() => setActiveView('help')}
                  className="w-full px-4 py-3.5 flex items-center justify-between hover:bg-neutral-50 transition-colors text-left"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-purple-50 text-purple-700 flex items-center justify-center">
                      <HelpCircle className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-neutral-900">Help &amp; Support</div>
                      <div className="text-[10px] text-neutral-500">FAQs, live support &amp; contact</div>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-neutral-400" />
                </button>

                {/* 6. About Us */}
                <button
                  onClick={() => setActiveView('about')}
                  className="w-full px-4 py-3.5 flex items-center justify-between hover:bg-neutral-50 transition-colors text-left"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center">
                      <Info className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-neutral-900">About Us</div>
                      <div className="text-[10px] text-neutral-500">100% Organic Cotton mission &amp; story</div>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-neutral-400" />
                </button>
              </div>

              {/* Quick Logout button */}
              <div className="pt-1 pb-2">
                <button
                  onClick={onClose}
                  className="w-full py-2.5 rounded-xl border border-black/8 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50 text-xs font-medium flex items-center justify-center gap-1.5 transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" /> Sign Out
                </button>
              </div>
            </div>
          )}

          {/* ===================== VIEW 2: YOUR PROFILE ===================== */}
          {activeView === 'profile' && (
            <form onSubmit={handleSaveProfile} className="flex flex-col gap-4">
              <div className="flex items-center gap-3.5 p-3.5 bg-neutral-50 rounded-2xl border border-black/5">
                <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg">
                  SJ
                </div>
                <div>
                  <h3 className="text-sm font-bold text-neutral-900">{profileData.name}</h3>
                  <p className="text-[11px] text-neutral-500">Member since {profileData.memberSince}</p>
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

          {/* ===================== VIEW 3: PRODUCT ORDERS ===================== */}
          {activeView === 'orders' && (
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between text-xs text-neutral-500 mb-1">
                <span>Recent Purchases ({orders.length})</span>
                <span className="text-[10px] text-primary font-semibold">Track Live</span>
              </div>

              {orders.map((order) => (
                <div
                  key={order.id}
                  className="bg-white border border-black/8 rounded-2xl p-4 flex flex-col gap-2.5 shadow-2xs hover:border-black/20 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-neutral-900">Order #{order.id}</span>
                      <span className="text-[10px] text-neutral-400">• {order.date}</span>
                    </div>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${order.statusColor}`}
                    >
                      {order.status}
                    </span>
                  </div>

                  <p className="text-xs text-neutral-700 font-medium">{order.items}</p>

                  <div className="flex items-center justify-between pt-2 border-t border-black/5 text-[11px]">
                    <div className="flex items-center gap-1.5 text-neutral-600">
                      <Truck className="w-3.5 h-3.5 text-neutral-500" />
                      <span>{order.deliveryEstimate}</span>
                    </div>
                    <span className="font-bold text-neutral-900">{order.total}</span>
                  </div>

                  <div className="flex gap-2 pt-1">
                    <button
                      onClick={() => handleNavigate('/shop')}
                      className="flex-1 py-1.5 rounded-lg border border-black/10 text-[11px] font-semibold text-neutral-700 hover:bg-neutral-50"
                    >
                      Buy Again
                    </button>
                    <button
                      onClick={() => handleNavigate('/faq')}
                      className="py-1.5 px-3 rounded-lg border border-black/10 text-[11px] font-semibold text-neutral-500 hover:bg-neutral-50"
                    >
                      Need Help?
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ===================== VIEW 4: AUTO-DELIVERY (MyPeriodPlan) ===================== */}
          {activeView === 'auto-delivery' && (
            <div className="flex flex-col gap-4">
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

              {/* Direct Link to Auto-Delivery / Subscribe page */}
              <button
                onClick={() => handleNavigate('/subscribe')}
                className="w-full py-3 bg-primary text-white rounded-xl text-xs font-bold hover:bg-primary/90 transition-all flex items-center justify-center gap-2 shadow-sm"
              >
                <span>Manage &amp; Customize Auto-Delivery</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* ===================== VIEW 5: NOTIFICATIONS ===================== */}
          {activeView === 'notifications' && (
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between text-xs text-neutral-500 mb-1">
                <span>Alerts &amp; Updates</span>
                <button
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

          {/* ===================== VIEW 6: YOUR ADDRESSES ===================== */}
          {activeView === 'addresses' && (
            <div className="flex flex-col gap-3">
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
                onClick={() => alert('New address modal would open')}
                className="w-full py-3 border border-dashed border-black/20 hover:border-black/40 rounded-2xl text-xs font-semibold text-neutral-700 hover:bg-neutral-50 transition-all flex items-center justify-center gap-2 mt-1"
              >
                <MapPin className="w-3.5 h-3.5 text-primary" /> + Add New Delivery Address
              </button>
            </div>
          )}

          {/* ===================== VIEW 7: HELP & SUPPORT ===================== */}
          {activeView === 'help' && (
            <div className="flex flex-col gap-3">
              <div className="bg-purple-50/60 border border-purple-100 rounded-2xl p-3.5">
                <h3 className="text-xs font-bold text-purple-950">We're here to assist you</h3>
                <p className="text-[11px] text-purple-900/80 mt-0.5 leading-relaxed">
                  Have questions about our 100% organic products, order tracking or cycle planning?
                </p>
              </div>

              <div className="bg-white border border-black/8 rounded-2xl overflow-hidden divide-y divide-black/5">
                <button
                  onClick={() => handleNavigate('/faq')}
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
                  onClick={() => handleNavigate('/education')}
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
            <div className="flex flex-col gap-3.5 text-neutral-800">
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
                onClick={() => handleNavigate('/education')}
                className="w-full py-2.5 bg-neutral-900 text-white rounded-xl text-xs font-bold hover:bg-black transition-all"
              >
                Explore Educational Guides
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
