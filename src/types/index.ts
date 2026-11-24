export type ProductCategory = 'all' | 'tampons' | 'pads-liners' | 'wipes' | 'beauty' | 'maternity' | 'underwear'

export interface Product {
  id: string
  name: string
  category: 'tampons' | 'pads-liners' | 'wipes' | 'beauty' | 'maternity' | 'underwear'
  tagline: string
  subtitle?: string
  packCount: string
  packPrice: number
  caseCount: string
  casePrice: number
  image: string
  pastelBg?: string
  rating: number
  reviewsCount: number
  description: string
  features: string[]
  ingredients: string[]
  organicCert: string
  absorbency?: string
  inStock: boolean
  isBestseller?: boolean
  hsaFsaEligible?: boolean
}

export interface BundleItem {
  id: string
  title: string
  subtitle: string
  price: number
  originalPrice: number
  saveAmount: number
  image: string
  itemsIncluded: string[]
  description: string
  savingsBadge: string
}

export interface SubscriptionItem {
  id: string
  name: string
  subtitle: string
  regularPrice: number
  subscriptionPrice: number
  image: string
  defaultSelected?: boolean
}

export interface CartItem {
  cartId: string
  productId: string
  name: string
  type: 'pack' | 'case' | 'bundle'
  price: number
  quantity: number
  unitInfo: string
  image: string
}

export type DeliveryFrequency = '30' | '45' | '60'
