import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, ShoppingBag, CheckCircle2, ShieldCheck, X, ChevronRight } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { saveOrderToStorage } from './OrdersPage'

export const CartPage: React.FC = () => {
  const {
    items,
    updateQuantity,
    removeItem,
    clearCart,
    subtotal,
    shippingCost,
    total,
    isFreeShipping,
    amountToFreeShipping,
    freeShippingProgress,
  } = useCart()

  const navigate = useNavigate()

  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)
  const [checkoutStep, setCheckoutStep] = useState<'shipping' | 'payment' | 'success'>('shipping')
  const [formData, setFormData] = useState({
    name: 'Sarah Jenkins',
    email: 'sarah.j@example.com',
    address: '742 Evergreen Terrace',
    city: 'Springfield',
    state: 'OR',
    zip: '97477',
    paymentMethod: 'Credit Card',
  })
  const [orderNumber, setOrderNumber] = useState('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleStartCheckout = () => {
    if (items.length === 0) return
    setCheckoutStep('shipping')
    setIsCheckoutOpen(true)
  }

  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault()
    setCheckoutStep('payment')
  }

  const handleCompleteOrder = () => {
    const randomOrder = 'MXH-' + Math.floor(100000 + Math.random() * 900000)
    const itemSummary = items.map((i) => `${i.quantity}x ${i.name} (${i.unitInfo})`).join(', ')
    const totalItemsCount = items.reduce((sum, i) => sum + i.quantity, 0)
    const todayFormatted = new Date().toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })

    saveOrderToStorage({
      id: randomOrder,
      date: todayFormatted,
      total: `$${total.toFixed(2)}`,
      status: 'Processing',
      items: itemSummary,
      itemCount: totalItemsCount,
      image: items[0]?.image || '/images/products/tampons-cardboard-reg.jpg',
      deliveryEstimate: 'Estimated 2 - 3 Business Days',
      shippingAddress: `${formData.address}, ${formData.city}, ${formData.state} ${formData.zip}`,
      paymentMethod: formData.paymentMethod,
    })

    setOrderNumber(randomOrder)
    clearCart()
    setCheckoutStep('success')
  }

  const handleTrackOrder = () => {
    setIsCheckoutOpen(false)
    navigate(`/orders?track=${orderNumber}`)
  }

  const handleFinish = () => {
    setIsCheckoutOpen(false)
    navigate('/shop')
  }

  return (
    <div className="flex flex-col gap-4 p-4 pb-28">
      {/* Top Header matching Image 1 (Screen 3) */}
      <div className="flex items-center justify-between pt-1">
        <button
          onClick={() => navigate(-1)}
          className="w-10 h-10 rounded-full bg-white shadow-xs border border-black/5 flex items-center justify-center text-neutral-800 hover:bg-neutral-50 transition-all active:scale-95"
          aria-label="Back"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <h1 className="text-base font-semibold text-neutral-900 tracking-tight">
          Shopping cart
        </h1>

        <div className="w-10" /> {/* Spacer for optical center balance */}
      </div>

      {items.length === 0 ? (
        <div className="bg-white rounded-3xl p-8 border border-black/5 text-center flex flex-col items-center gap-3 my-6 shadow-xs">
          <div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-400">
            <ShoppingBag className="w-7 h-7" />
          </div>
          <h2 className="text-lg font-bold text-neutral-900">
            Your shopping cart is empty
          </h2>
          <p className="text-xs text-neutral-500 max-w-xs">
            Discover our 100% organic cotton tampons, pads, and wipes for clean, chlorine-free period care.
          </p>
          <Link
            to="/shop"
            className="mt-3 bg-[#7A1C3A] text-white text-xs font-semibold px-6 py-3 rounded-full hover:bg-[#61152D] transition-all shadow-xs"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <>
          {/* Free Shipping Progress Box matching $39.99 live policy */}
          <div className="bg-white border border-black/6 rounded-2xl p-3.5 shadow-2xs flex flex-col gap-2">
            <div className="flex items-center justify-between text-xs font-semibold text-neutral-800">
              {isFreeShipping ? (
                <span className="text-secondary font-bold">
                  You unlocked Free Shipping!
                </span>
              ) : (
                <span>Add ${amountToFreeShipping.toFixed(2)} more for Free Shipping</span>
              )}
              <span className="text-xs text-neutral-400 font-medium">{freeShippingProgress}%</span>
            </div>

            <div className="w-full h-1.5 bg-neutral-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-secondary transition-all duration-300 rounded-full"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Cart Items List matching Image 1 (Screen 3) */}
          <div className="flex flex-col divide-y divide-black/5 bg-white rounded-3xl p-4 border border-black/6 shadow-2xs">
            {items.map((item) => (
              <div
                key={item.cartId}
                className="py-3.5 first:pt-1 last:pb-1 flex items-center justify-between gap-3.5"
              >
                {/* Rounded pastel square thumbnail matching Image 1 */}
                <div className="w-16 h-16 rounded-[22px] bg-[#FDECEF] p-1.5 shrink-0 flex items-center justify-center overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* Center Item Info matching Image 1: Title, Subtitle, 1 X $17.99 */}
                <div className="flex-1 min-w-0 flex flex-col">
                  <h4 className="text-xs sm:text-sm font-semibold text-neutral-900 truncate">
                    {item.name}
                  </h4>
                  <span className="text-[11px] text-neutral-500 truncate mt-0.5">
                    {item.unitInfo}
                  </span>
                  <span className="text-xs font-semibold text-neutral-800 mt-1">
                    {item.quantity} X ${item.price.toFixed(2)}
                  </span>
                </div>

                {/* Vertical Stepper Pill matching Image 1 (Screen 3) */}
                <div className="flex flex-col items-center justify-between bg-neutral-100 rounded-full w-7 h-16 py-1 text-neutral-700 shrink-0 shadow-2xs">
                  <button
                    type="button"
                    onClick={() => updateQuantity(item.cartId, item.quantity + 1)}
                    className="w-5 h-5 flex items-center justify-center text-neutral-800 hover:text-black font-bold text-xs active:scale-90"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                  <span className="text-[11px] font-bold text-neutral-900">
                    {item.quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      if (item.quantity === 1) {
                        removeItem(item.cartId)
                      } else {
                        updateQuantity(item.cartId, item.quantity - 1)
                      }
                    }}
                    className="w-5 h-5 flex items-center justify-center text-neutral-600 hover:text-neutral-900 font-bold text-xs active:scale-90"
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Clean Order Summary matching Image 1 */}
          <div className="flex flex-col gap-2 px-1 pt-1">
            <div className="flex items-center justify-between text-xs text-neutral-500">
              <span>Shipping</span>
              <span className={`font-semibold ${isFreeShipping ? 'text-secondary' : 'text-neutral-800'}`}>
                {isFreeShipping ? 'Free' : `$${shippingCost.toFixed(2)}`}
              </span>
            </div>

            <div className="flex items-center justify-between text-sm font-bold text-neutral-900 pt-1">
              <span>Subtotal</span>
              <span className="text-base">${total.toFixed(2)}</span>
            </div>

            <div className="flex items-center gap-1.5 text-[11px] text-secondary font-semibold pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-secondary" />
              <span>HSA/FSA Card Eligible at Checkout</span>
            </div>

            {/* Bold Full-Width Black Pill CTA matching Image 1 (Screen 3) */}
            <button
              type="button"
              onClick={handleStartCheckout}
              className="w-full bg-[#7A1C3A] text-white rounded-full py-4 px-6 text-sm font-semibold shadow-md hover:bg-[#61152D] active:scale-[0.98] transition-all flex items-center justify-center gap-2 mt-2"
            >
              <span>Proceed to checkout</span>
            </button>
          </div>
        </>
      )}

      {/* Simulated Interactive Checkout Modal */}
      {isCheckoutOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-md max-h-[92vh] rounded-t-[36px] sm:rounded-[36px] overflow-y-auto no-scrollbar shadow-2xl p-5 flex flex-col gap-4">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-black/5 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-neutral-900 text-white text-xs font-bold flex items-center justify-center">
                  {checkoutStep === 'shipping' ? '1' : checkoutStep === 'payment' ? '2' : '✓'}
                </div>
                <h3 className="font-bold text-base text-neutral-900">
                  {checkoutStep === 'shipping'
                    ? 'Shipping Address'
                    : checkoutStep === 'payment'
                    ? 'Payment & Review'
                    : 'Order Confirmed'}
                </h3>
              </div>
              <button
                onClick={() => setIsCheckoutOpen(false)}
                className="text-neutral-400 hover:text-neutral-800 p-1 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Step 1: Shipping Form */}
            {checkoutStep === 'shipping' && (
              <form onSubmit={handleProceedToPayment} className="flex flex-col gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-neutral-700">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full bg-neutral-50 border border-black/8 rounded-xl px-3.5 py-2.5 text-xs text-neutral-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-neutral-900"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-neutral-700">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full bg-neutral-50 border border-black/8 rounded-xl px-3.5 py-2.5 text-xs text-neutral-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-neutral-900"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-neutral-700">Street Address</label>
                  <input
                    type="text"
                    name="address"
                    required
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full bg-neutral-50 border border-black/8 rounded-xl px-3.5 py-2.5 text-xs text-neutral-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-neutral-900"
                  />
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div className="space-y-1 col-span-1">
                    <label className="text-[11px] font-semibold text-neutral-700">City</label>
                    <input
                      type="text"
                      name="city"
                      required
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full bg-neutral-50 border border-black/8 rounded-xl px-3 py-2 text-xs text-neutral-900"
                    />
                  </div>
                  <div className="space-y-1 col-span-1">
                    <label className="text-[11px] font-semibold text-neutral-700">State</label>
                    <input
                      type="text"
                      name="state"
                      required
                      value={formData.state}
                      onChange={handleInputChange}
                      className="w-full bg-neutral-50 border border-black/8 rounded-xl px-3 py-2 text-xs text-neutral-900"
                    />
                  </div>
                  <div className="space-y-1 col-span-1">
                    <label className="text-[11px] font-semibold text-neutral-700">ZIP</label>
                    <input
                      type="text"
                      name="zip"
                      required
                      value={formData.zip}
                      onChange={handleInputChange}
                      className="w-full bg-neutral-50 border border-black/8 rounded-xl px-3 py-2 text-xs text-neutral-900"
                    />
                  </div>
                </div>

                <div className="bg-neutral-50 p-3 rounded-2xl border border-black/6 flex items-center justify-between text-xs mt-1">
                  <span className="font-medium text-neutral-600">Shipping:</span>
                  <span className="font-bold text-secondary">
                    {isFreeShipping ? 'Standard Free (2-4 Days)' : 'Standard $4.99'}
                  </span>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#7A1C3A] text-white py-3.5 rounded-full font-semibold text-xs mt-2 hover:bg-[#61152D] transition-all flex items-center justify-center gap-1.5 shadow-sm active:scale-98"
                >
                  <span>Continue to Payment</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </form>
            )}

            {/* Step 2: Payment & Review */}
            {checkoutStep === 'payment' && (
              <div className="flex flex-col gap-3">
                <div className="bg-neutral-50 p-3 rounded-2xl border border-black/6 text-xs space-y-1">
                  <div className="flex justify-between text-neutral-500">
                    <span>Shipping to:</span>
                    <span className="font-semibold text-neutral-900">{formData.name}</span>
                  </div>
                  <div className="text-neutral-500 truncate">{formData.address}, {formData.city}, {formData.state} {formData.zip}</div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-semibold text-neutral-700">Select Payment Method</label>
                  <div className="grid grid-cols-3 gap-2">
                    {['Credit Card', 'Apple Pay', 'HSA / FSA'].map((method) => (
                      <button
                        key={method}
                        type="button"
                        onClick={() => setFormData({ ...formData, paymentMethod: method })}
                        className={`py-2 px-1 rounded-xl text-xs font-semibold border transition-all text-center ${
                          formData.paymentMethod === method
                            ? 'bg-[#7A1C3A] text-white border-[#7A1C3A] hover:bg-[#61152D] shadow-2xs'
                            : 'bg-neutral-50 border-black/6 text-neutral-600 hover:bg-white'
                        }`}
                      >
                        {method}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Summary */}
                <div className="bg-neutral-50 p-3 rounded-2xl border border-black/6 text-xs space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Items ({items.length}):</span>
                    <span className="font-semibold text-neutral-900">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Shipping:</span>
                    <span className="font-semibold text-secondary">
                      {isFreeShipping ? 'FREE' : `$${shippingCost.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between pt-1 border-t border-black/5 font-bold text-sm">
                    <span>Grand Total:</span>
                    <span className="text-neutral-900">${total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="flex gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => setCheckoutStep('shipping')}
                    className="w-1/3 py-3 rounded-full border border-black/10 text-xs font-semibold text-neutral-700 hover:bg-neutral-50"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={handleCompleteOrder}
                    className="w-2/3 bg-[#7A1C3A] text-white py-3 rounded-full font-semibold text-xs hover:bg-[#61152D] transition-all shadow-sm active:scale-98"
                  >
                    Complete Order (${total.toFixed(2)})
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Success Confirmation */}
            {checkoutStep === 'success' && (
              <div className="text-center py-4 flex flex-col items-center gap-3">
                <div className="w-14 h-14 rounded-full bg-secondary/15 text-secondary flex items-center justify-center animate-bounce">
                  <CheckCircle2 className="w-8 h-8 stroke-[2.5]" />
                </div>
                <h3 className="font-bold text-xl text-neutral-900">
                  Thank You for Your Order!
                </h3>
                <p className="text-xs text-neutral-500 max-w-xs">
                  Your 100% organic, chlorine-free period care order has been placed successfully.
                </p>

                <div className="w-full bg-neutral-50 p-3.5 rounded-2xl border border-black/6 text-xs text-left space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Order Number:</span>
                    <span className="font-mono font-bold text-neutral-900">{orderNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Confirmation sent to:</span>
                    <span className="font-semibold text-neutral-900 truncate">{formData.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Estimated Delivery:</span>
                    <span className="font-bold text-secondary">2 - 3 Business Days</span>
                  </div>
                </div>

                <div className="flex flex-col gap-2 w-full mt-2">
                  <button
                    type="button"
                    onClick={handleTrackOrder}
                    className="w-full bg-[#7A1C3A] text-white py-3.5 rounded-full font-semibold text-xs hover:bg-[#61152D] transition-all shadow-sm"
                  >
                    Track Order Status
                  </button>
                  <button
                    type="button"
                    onClick={handleFinish}
                    className="w-full bg-[#FCE7F3] text-[#7A1C3A] py-3 rounded-full font-semibold text-xs hover:bg-pink-200 transition-all"
                  >
                    Continue Shopping
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
