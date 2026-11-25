import React from 'react'
import { Link } from 'react-router-dom'
import { CheckCircle2, X } from 'lucide-react'
import { useCart } from '../context/CartContext'

export const NotificationToast: React.FC = () => {
  const { isNotificationOpen, lastAddedName, dismissNotification } = useCart()

  if (!isNotificationOpen) return null

  return (
    <aside
      aria-label="Cart Notification"
      className="fixed bottom-[88px] left-1/2 -translate-x-1/2 w-[90%] max-w-[330px] z-50 bg-white/95 backdrop-blur-xl border border-pink-200/80 text-neutral-900 py-2 px-2.5 rounded-full shadow-[0_12px_30px_-6px_rgba(122,28,58,0.18)] flex items-center justify-between gap-2.5 animate-in fade-in slide-in-from-bottom-3 duration-200"
    >
      <div className="flex items-center gap-2 min-w-0">
        <div className="w-7 h-7 rounded-full bg-[#FCE7F3] text-[#7A1C3A] flex items-center justify-center shrink-0">
          <CheckCircle2 className="w-4 h-4" />
        </div>
        <div className="text-xs truncate">
          <span className="font-semibold text-neutral-900">{lastAddedName}</span>{' '}
          <span className="text-neutral-500">added</span>
        </div>
      </div>

      <div className="flex items-center gap-1.5 shrink-0">
        <Link
          to="/cart"
          onClick={dismissNotification}
          className="bg-[#7A1C3A] hover:bg-[#61152D] text-white text-[11px] px-3 py-1.5 rounded-full font-semibold transition-all active:scale-95"
        >
          View Bag
        </Link>
        <button
          type="button"
          onClick={dismissNotification}
          className="w-6 h-6 rounded-full text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 flex items-center justify-center transition-colors"
          aria-label="Close notification"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </aside>
  )
}
