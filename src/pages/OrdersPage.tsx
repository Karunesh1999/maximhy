import React, { useState, useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Package,
  Truck,
  CheckCircle2,
  Clock,
  ChevronDown,
  ChevronUp,
  RotateCcw,
  ShoppingBag,
  HelpCircle,
} from 'lucide-react'

export interface OrderRecord {
  id: string
  date: string
  total: string
  status: 'Processing' | 'In Transit' | 'Delivered'
  items: string
  itemCount: number
  image: string
  deliveryEstimate: string
  shippingAddress?: string
  paymentMethod?: string
}

export const INITIAL_ORDERS: OrderRecord[] = [
  {
    id: 'MX-9031',
    date: 'Nov 23, 2026',
    total: '$21.14',
    status: 'In Transit',
    items: '2x Cardboard Tampons (16ct · Regular Pack)',
    itemCount: 2,
    image: '/images/products/tampons-cardboard-reg.jpg',
    deliveryEstimate: 'Arriving Tomorrow, Nov 26',
    shippingAddress: '742 Evergreen Terrace, Springfield, OR 97477',
    paymentMethod: 'Credit Card',
  },
  {
    id: 'MX-8924',
    date: 'Nov 12, 2026',
    total: '$16.47',
    status: 'Delivered',
    items: '1x MaxION™ Silver Ion Pads (14ct), 1x Organic Cotton Rounds (50ct)',
    itemCount: 2,
    image: '/images/products/pads-maxion.jpg',
    deliveryEstimate: 'Delivered to Doorstep',
    shippingAddress: '742 Evergreen Terrace, Springfield, OR 97477',
    paymentMethod: 'Apple Pay',
  },
  {
    id: 'MX-8410',
    date: 'Oct 15, 2026',
    total: '$32.90',
    status: 'Delivered',
    items: '1x Ultra Thin Pads (14ct), 2x Organic Pantiliners (35ct), 1x Intimate Wipes (20ct)',
    itemCount: 4,
    image: '/images/products/pads-ultrathin-day.jpg',
    deliveryEstimate: 'Delivered Oct 18',
    shippingAddress: '742 Evergreen Terrace, Springfield, OR 97477',
    paymentMethod: 'HSA / FSA',
  },
]

export function getStoredOrders(): OrderRecord[] {
  try {
    const raw = localStorage.getItem('maximhy_orders')
    if (raw) {
      const parsed = JSON.parse(raw)
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed
      }
    }
  } catch {
    // fallback to initial orders
  }
  return INITIAL_ORDERS
}

export function saveOrderToStorage(newOrder: OrderRecord): void {
  try {
    const existing = getStoredOrders()
    localStorage.setItem('maximhy_orders', JSON.stringify([newOrder, ...existing]))
  } catch {
    // ignore storage errors
  }
}

export const OrdersPage: React.FC = () => {
  const navigate = useNavigate()
  const [orders] = useState<OrderRecord[]>(() => getStoredOrders())
  const [statusFilter, setStatusFilter] = useState<'all' | 'In Transit' | 'Delivered'>('all')
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null)

  const filteredOrders = useMemo(() => {
    if (statusFilter === 'all') return orders
    if (statusFilter === 'In Transit') {
      return orders.filter((o) => o.status === 'In Transit' || o.status === 'Processing')
    }
    return orders.filter((o) => o.status === statusFilter)
  }, [orders, statusFilter])

  const getStatusBadge = (status: OrderRecord['status']) => {
    switch (status) {
      case 'Processing':
        return {
          classes: 'text-sky-700 bg-sky-50 border-sky-200',
          icon: Clock,
        }
      case 'In Transit':
        return {
          classes: 'text-amber-700 bg-amber-50 border-amber-200',
          icon: Truck,
        }
      case 'Delivered':
        return {
          classes: 'text-emerald-700 bg-emerald-50 border-emerald-200',
          icon: CheckCircle2,
        }
    }
  }

  return (
    <div className="flex flex-col gap-5 p-4 pb-28">
      {/* Page Header */}
      <div className="pt-1 px-0.5">
        <h1 className="text-2xl font-bold tracking-tight text-neutral-900 font-serif">
          My Orders
        </h1>
        <p className="text-xs text-neutral-500 mt-0.5 font-medium">
          Track active deliveries and reorder your organic essentials.
        </p>
      </div>

      {/* Filter Pills */}
      <div className="flex items-center gap-2">
        {(
          [
            { key: 'all', label: `All (${orders.length})` },
            { key: 'In Transit', label: 'Active' },
            { key: 'Delivered', label: 'Delivered' },
          ] as const
        ).map((tab) => {
          const isActive = statusFilter === tab.key
          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => setStatusFilter(tab.key)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                isActive
                  ? 'bg-neutral-900 text-white shadow-xs'
                  : 'bg-white text-neutral-600 border border-black/8 hover:bg-neutral-50'
              }`}
            >
              {tab.label}
            </button>
          )
        })}
      </div>

      {/* Orders List */}
      {filteredOrders.length === 0 ? (
        <div className="bg-white rounded-3xl p-8 border border-black/5 text-center flex flex-col items-center gap-3 shadow-2xs">
          <div className="w-14 h-14 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-400">
            <Package className="w-7 h-7" />
          </div>
          <h2 className="text-base font-bold text-neutral-900">No orders in this view</h2>
          <p className="text-xs text-neutral-500 max-w-xs">
            Explore our 100% organic cotton tampons, pads, and wipes to place an order.
          </p>
          <Link
            to="/shop"
            className="mt-2 bg-neutral-900 text-white text-xs font-semibold px-6 py-2.5 rounded-full hover:bg-black transition-all shadow-xs"
          >
            Browse Products
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-3.5">
          {filteredOrders.map((order) => {
            const badge = getStatusBadge(order.status)
            const StatusIcon = badge.icon
            const isExpanded = expandedOrderId === order.id

            return (
              <div
                key={order.id}
                className="bg-white border border-black/8 rounded-3xl p-4 shadow-2xs flex flex-col gap-3 transition-all"
              >
                {/* Top Row: Order # & Status */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-neutral-900">
                      Order #{order.id}
                    </span>
                    <span className="text-[11px] text-neutral-400">• {order.date}</span>
                  </div>

                  <span
                    className={`inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${badge.classes}`}
                  >
                    <StatusIcon className="w-3 h-3" />
                    {order.status}
                  </span>
                </div>

                {/* Product Summary Row */}
                <div className="flex items-center gap-3">
                  <div className="relative w-16 h-16 rounded-2xl bg-[#FDECEF] border border-black/5 overflow-hidden shrink-0">
                    <img
                      src={order.image}
                      alt={order.items}
                      className="absolute inset-0 w-full h-full object-contain p-1.5"
                      loading="lazy"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-neutral-900 line-clamp-2 leading-snug">
                      {order.items}
                    </p>
                    <div className="flex items-center justify-between mt-1.5">
                      <span className="text-[11px] text-neutral-500">
                        {order.itemCount} {order.itemCount === 1 ? 'item' : 'items'}
                      </span>
                      <span className="text-sm font-bold text-neutral-900">
                        {order.total}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Delivery & Expandable Details */}
                <div className="border-t border-black/5 pt-2.5 flex items-center justify-between text-[11px]">
                  <div className="flex items-center gap-1.5 text-neutral-600 font-medium">
                    <Truck className="w-3.5 h-3.5 text-secondary shrink-0" />
                    <span>{order.deliveryEstimate}</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => setExpandedOrderId(isExpanded ? null : order.id)}
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-neutral-500 hover:text-neutral-900"
                  >
                    <span>Details</span>
                    {isExpanded ? (
                      <ChevronUp className="w-3.5 h-3.5" />
                    ) : (
                      <ChevronDown className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>

                {isExpanded && (
                  <div className="bg-neutral-50 rounded-2xl p-3 text-[11px] text-neutral-600 space-y-1.5 border border-black/5 animate-in fade-in duration-150">
                    {order.shippingAddress && (
                      <div>
                        <span className="font-semibold text-neutral-800">Shipping Address: </span>
                        <span>{order.shippingAddress}</span>
                      </div>
                    )}
                    {order.paymentMethod && (
                      <div>
                        <span className="font-semibold text-neutral-800">Payment: </span>
                        <span>{order.paymentMethod}</span>
                      </div>
                    )}
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex items-center gap-2 pt-0.5">
                  <button
                    type="button"
                    onClick={() => navigate('/shop')}
                    className="flex-1 bg-neutral-900 text-white text-xs font-semibold py-2 px-4 rounded-full hover:bg-black active:scale-95 transition-all flex items-center justify-center gap-1.5 shadow-2xs"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Buy Again</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => navigate('/faq')}
                    className="py-2 px-3.5 rounded-full border border-black/10 text-xs font-semibold text-neutral-600 hover:bg-neutral-50 active:scale-95 transition-all flex items-center gap-1"
                  >
                    <HelpCircle className="w-3.5 h-3.5" />
                    <span>Help</span>
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Quick Shop CTA */}
      <Link
        to="/shop"
        className="mt-1 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-semibold py-3 px-4 rounded-full border border-black/5 flex items-center justify-center gap-2 transition-all"
      >
        <ShoppingBag className="w-4 h-4" />
        <span>Place a New Order</span>
      </Link>
    </div>
  )
}
