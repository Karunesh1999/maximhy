import React, { createContext, useContext, useState, useEffect } from 'react'
import type { CartItem, Product, BundleItem } from '../types'

interface CartContextType {
  items: CartItem[]
  addItem: (product: Product | BundleItem, type: 'pack' | 'case' | 'bundle', customQty?: number) => void
  removeItem: (cartId: string) => void
  updateQuantity: (cartId: string, quantity: number) => void
  clearCart: () => void
  totalCount: number
  subtotal: number
  shippingCost: number
  isFreeShipping: boolean
  freeShippingThreshold: number
  amountToFreeShipping: number
  freeShippingProgress: number
  total: number
  isNotificationOpen: boolean
  lastAddedName: string
  dismissNotification: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

const FREE_SHIPPING_THRESHOLD = 39.99
const STANDARD_SHIPPING = 5.99

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([
    {
      cartId: 'cardboard-tampons-pack',
      productId: 'cardboard-tampons',
      name: 'Cardboard Tampons',
      type: 'pack',
      price: 10.57,
      quantity: 1,
      unitInfo: 'Single Pack (16ct)',
      image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&auto=format&fit=crop&q=80'
    },
    {
      cartId: 'bundle-pantiliners-3pack-bundle',
      productId: 'bundle-pantiliners-3pack',
      name: 'Pantiliners 3-Pack',
      type: 'bundle',
      price: 28.54,
      quantity: 1,
      unitInfo: 'Bundle (Save $0.88)',
      image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&auto=format&fit=crop&q=80'
    }
  ])

  const [isNotificationOpen, setIsNotificationOpen] = useState(false)
  const [lastAddedName, setLastAddedName] = useState('')

  const addItem = (product: Product | BundleItem, type: 'pack' | 'case' | 'bundle', customQty = 1) => {
    let price = 0
    let unitInfo = ''
    const name = 'name' in product ? product.name : product.title

    if (type === 'bundle') {
      const b = product as BundleItem
      price = b.price
      unitInfo = `Bundle (${b.savingsBadge})`
    } else {
      const p = product as Product
      if (type === 'pack') {
        price = p.packPrice
        unitInfo = `Single Pack (${p.packCount})`
      } else {
        price = p.casePrice
        unitInfo = p.caseCount
      }
    }

    const cartId = `${product.id}-${type}`
    setLastAddedName(name)
    setIsNotificationOpen(true)

    setItems((prev) => {
      const existing = prev.find((item) => item.cartId === cartId)
      if (existing) {
        return prev.map((item) =>
          item.cartId === cartId ? { ...item, quantity: item.quantity + customQty } : item
        )
      }
      return [
        ...prev,
        {
          cartId,
          productId: product.id,
          name,
          type,
          price,
          quantity: customQty,
          unitInfo,
          image: product.image,
        },
      ]
    })
  }

  const removeItem = (cartId: string) => {
    setItems((prev) => prev.filter((item) => item.cartId !== cartId))
  }

  const updateQuantity = (cartId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(cartId)
      return
    }
    setItems((prev) =>
      prev.map((item) => (item.cartId === cartId ? { ...item, quantity } : item))
    )
  }

  const clearCart = () => {
    setItems([])
  }

  const dismissNotification = () => {
    setIsNotificationOpen(false)
  }

  const totalCount = items.reduce((sum, item) => sum + item.quantity, 0)
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const isFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD
  const shippingCost = isFreeShipping || items.length === 0 ? 0 : STANDARD_SHIPPING
  const amountToFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal)
  const freeShippingProgress = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100))
  const total = subtotal + shippingCost

  useEffect(() => {
    if (isNotificationOpen) {
      const timer = setTimeout(() => {
        setIsNotificationOpen(false)
      }, 3500)
      return () => clearTimeout(timer)
    }
  }, [isNotificationOpen])

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalCount,
        subtotal,
        shippingCost,
        isFreeShipping,
        freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
        amountToFreeShipping,
        freeShippingProgress,
        total,
        isNotificationOpen,
        lastAddedName,
        dismissNotification,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
