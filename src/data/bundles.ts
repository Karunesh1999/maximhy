import type { BundleItem, SubscriptionItem } from '../types'

export const BUNDLES: BundleItem[] = [
  {
    id: 'bundle-pantiliners-3pack',
    title: 'Pantiliners 3-Pack',
    subtitle: '90ct · Wrapped, Unwrapped, Thong',
    price: 28.54,
    originalPrice: 29.42,
    saveAmount: 0.88,
    image: '/images/products/bundles/organic-cotton-pantiliners-combo-3-packs.jpg',
    itemsIncluded: [
      '1x Light Pantiliners Wrapped (30ct)',
      '1x Classic Contour Unwrapped (30ct)',
      '1x Organic Thong Liners (30ct)'
    ],
    description: 'The ultimate daily freshness trio. Enjoy total versatility across all lingerie and activewear with 100% pure organic cotton breathability.',
    savingsBadge: 'Save $0.88'
  },
  {
    id: 'bundle-pads-wipes-4pack',
    title: 'Pads & Wipes 4-Pack',
    subtitle: '64ct · Day, Night, Liners, Wipes',
    price: 29.90,
    originalPrice: 31.49,
    saveAmount: 1.59,
    image: '/images/products/bundles/organic-cotton-winged-pads-liners-intimate-wipes-4-packs.jpg',
    itemsIncluded: [
      '1x Ultra Thin Day Pads with Wings (14ct)',
      '1x Overnight Heavy Pads (10ct)',
      '1x Organic Pantiliners (20ct)',
      '1x Intimate Cleansing Wipes (20ct)'
    ],
    description: 'Complete cycle harmony from light spotting to heavy overnight flows, finished with pH-balanced organic cleansing wipes.',
    savingsBadge: 'Save $1.59'
  },
  {
    id: 'bundle-plastic-tampons-4pack',
    title: 'Plastic Tampons 4-Pack',
    subtitle: '60ct · Regular & Super Mix',
    price: 33.52,
    originalPrice: 35.28,
    saveAmount: 1.76,
    image: '/images/products/bundles/bundle-tampons-combo.jpg',
    itemsIncluded: [
      '2x Regular Plastic Tampons (32ct total)',
      '2x Super Plastic Tampons (28ct total)'
    ],
    description: 'Stock up for 3 full cycles with smooth comfort BPA-free applicators and 100% certified organic cotton fiber cores.',
    savingsBadge: 'Save $1.76'
  },
  {
    id: 'bundle-organic-wipes-3pack',
    title: 'Organic Wipes 3-Pack',
    subtitle: '114ct · Baby, Facial & Intimate',
    price: 10.67,
    originalPrice: 11.07,
    saveAmount: 0.40,
    image: '/images/products/bundles/organic-cotton-baby-facial-intimate-wipes-combo-3-packs.jpg',
    itemsIncluded: [
      '1x Intimate Wipes (20ct)',
      '1x Baby Gentle Clean Wipes (44ct)',
      '1x Facial Cleansing Wipes (50ct)'
    ],
    description: 'Pure water-based organic cotton wipes for the entire family. Unscented, hypoallergenic, and 100% biodegradable.',
    savingsBadge: 'Save $0.40'
  }
]

export const SUBSCRIPTION_ESSENTIALS: SubscriptionItem[] = [
  {
    id: 'sub-cardboard-tampons',
    name: 'Cardboard Tampons (16ct)',
    subtitle: '100% Organic Cotton · Regular Flow',
    regularPrice: 10.57,
    subscriptionPrice: 10.04,
    image: '/images/products/tampons/tampons-cardboard-reg.jpg',
    defaultSelected: true,
  },
  {
    id: 'sub-ultra-thin-pads',
    name: 'Ultra Thin Pads (14ct)',
    subtitle: 'Daytime with Wings · Breathable Protection',
    regularPrice: 9.38,
    subscriptionPrice: 8.91,
    image: '/images/products/pads-liners/pads-ultrathin-day.jpg',
    defaultSelected: true,
  },
  {
    id: 'sub-organic-pantiliners',
    name: 'Organic Pantiliners (35ct)',
    subtitle: 'Daily Freshness · Soft & Contour Fit',
    regularPrice: 6.71,
    subscriptionPrice: 6.37,
    image: '/images/products/pads-liners/pads-classic-maxi.jpg',
    defaultSelected: false,
  },
  {
    id: 'sub-intimate-wipes',
    name: 'Intimate Wipes (20ct)',
    subtitle: 'Unscented · pH-Balanced Botanical Infusion',
    regularPrice: 3.69,
    subscriptionPrice: 3.51,
    image: '/images/products/wipes/wipes-facial.jpg',
    defaultSelected: false,
  },
  {
    id: 'sub-makeup-ovals',
    name: 'Makeup Ovals (50ct)',
    subtitle: 'Dual-Sided Organic Cotton Facial Pads',
    regularPrice: 6.49,
    subscriptionPrice: 6.16,
    image: '/images/products/beauty/beauty-cotton-rounds.jpg',
    defaultSelected: false,
  },
  {
    id: 'sub-maxion-pads',
    name: 'MaxION™ Silver Ion Pads (14ct)',
    subtitle: 'Patented Tourmaline & Odor Control',
    regularPrice: 9.98,
    subscriptionPrice: 9.48,
    image: '/images/products/pads-liners/pads-maxion.jpg',
    defaultSelected: false,
  }
]
