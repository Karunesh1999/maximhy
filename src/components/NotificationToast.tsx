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
      className="fixed bottom-20 left-1/2 -translate-x-1/2 w-[90%] max-w-sm z-50 bg-inverse-surface text-inverse-on-surface p-3.5 rounded-xl shadow-xl flex items-center justify-between gap-3 animate-in fade-in slide-in-from-bottom-3 duration-200"
    >
      <div className="flex items-center gap-2.5 overflow-hidden">
        <CheckCircle2 className="w-5 h-5 text-secondary shrink-0" />
        <div className="text-xs truncate">
          <span className="font-bold">{lastAddedName}</span> added to bag!
        </div>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <Link
          to="/cart"
          onClick={dismissNotification}
          className="bg-primary text-primary-foreground text-xs px-2.5 py-1 rounded-md font-semibold hover:opacity-90 transition-opacity"
        >
          View Bag
        </Link>
        <button
          onClick={dismissNotification}
          className="text-inverse-on-surface/70 hover:text-inverse-on-surface p-0.5"
          aria-label="Close notification"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </aside>
  )
}
