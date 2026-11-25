import React, { createContext, useContext, useState, useEffect, useMemo } from 'react'
import { PRODUCTS } from '../data/products'
import type { Product } from '../types'

interface WishlistContextType {
  wishlistIds: string[]
  wishlistProducts: Product[]
  wishlistCount: number
  isWishlisted: (productId: string) => boolean
  toggleWishlist: (productId: string) => void
  removeFromWishlist: (productId: string) => void
  clearWishlist: () => void
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined)

const STORAGE_KEY = 'maxim_wishlist'

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [wishlistIds, setWishlistIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const parsed = JSON.parse(saved)
        if (Array.isArray(parsed)) return parsed
      }
    } catch {
      // Ignore storage errors
    }
    return []
  })

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(wishlistIds))
    } catch {
      // Ignore storage errors
    }
  }, [wishlistIds])

  const isWishlisted = (productId: string) => wishlistIds.includes(productId)

  const toggleWishlist = (productId: string) => {
    setWishlistIds((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    )
  }

  const removeFromWishlist = (productId: string) => {
    setWishlistIds((prev) => prev.filter((id) => id !== productId))
  }

  const clearWishlist = () => {
    setWishlistIds([])
  }

  const wishlistProducts = useMemo(
    () => PRODUCTS.filter((p) => wishlistIds.includes(p.id)),
    [wishlistIds]
  )

  return (
    <WishlistContext.Provider
      value={{
        wishlistIds,
        wishlistProducts,
        wishlistCount: wishlistProducts.length,
        isWishlisted,
        toggleWishlist,
        removeFromWishlist,
        clearWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  )
}

export const useWishlist = (): WishlistContextType => {
  const context = useContext(WishlistContext)
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider')
  }
  return context
}
