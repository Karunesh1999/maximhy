import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ShoppingBag, ArrowRight, CheckCircle2, ShieldCheck, Truck, Sparkles, X, ChevronRight, Trash2 } from 'lucide-react'
import { useCart } from '../context/CartContext'

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
    setOrderNumber(randomOrder)
    setCheckoutStep('success')
  }

  const handleFinish = () => {
    setIsCheckoutOpen(false)
    clearCart()
    navigate('/shop')
  }

  return (
    <div className="flex flex-col gap-4 p-4">
      {/* Title matching Reference 4 */}
      <div className="pt-2">
        <h1 className="font-headline font-bold text-2xl text-foreground tracking-tight">
          Your Order
        </h1>
      </div>

      {items.length === 0 ? (
        <div className="bg-surface-container-lowest rounded-2xl p-8 border border-outline-variant/60 text-center flex flex-col items-center gap-3">
          <div className="w-16 h-16 rounded-full bg-surface-container flex items-center justify-center text-muted-foreground">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <h2 className="font-headline font-bold text-lg text-foreground">
            Your shopping bag is empty
          </h2>
          <p className="text-xs text-muted-foreground max-w-xs">
            Explore our 100% organic cotton tampons, pads, and wipes to start your clean cycle journey.
          </p>
          <Link
            to="/shop"
            className="mt-2 bg-primary text-primary-foreground text-xs font-bold px-6 py-2.5 rounded-xl hover:bg-primary-container transition-all"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <>
          {/* Free Shipping Progress Box matching Reference 4 */}
          <div className="bg-surface-container-lowest border border-outline-variant/70 rounded-2xl p-3.5 shadow-xs flex flex-col gap-2">
            <div className="flex items-center justify-between text-xs font-bold text-foreground">
              {isFreeShipping ? (
                <span className="text-secondary flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" /> You've unlocked Free Shipping!
                </span>
              ) : (
                <span>Add ${amountToFreeShipping.toFixed(2)} for Free Shipping</span>
              )}
              <span className="text-xs text-muted-foreground">{freeShippingProgress}%</span>
            </div>

            {/* Green progress bar matching Reference 4 */}
            <div className="w-full h-2 bg-surface-container rounded-full overflow-hidden">
              <div
                className="h-full bg-secondary transition-all duration-300 rounded-full"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* List of Cart Items matching Reference 4 */}
          <div className="flex flex-col gap-2.5">
            {items.map((item) => (
              <div
                key={item.cartId}
                className="bg-surface-container-lowest border border-outline-variant/70 rounded-2xl p-3 shadow-xs flex items-center justify-between gap-3"
              >
                {/* Product thumbnail */}
                <div className="w-14 h-14 rounded-lg overflow-hidden bg-surface-container-low shrink-0 border border-outline-variant/40">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="font-headline font-bold text-xs text-foreground truncate">
                      {item.name}
                    </h4>
                    <button
                      onClick={() => removeItem(item.cartId)}
                      className="text-muted-foreground/60 hover:text-destructive p-1"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <p className="text-[11px] text-muted-foreground mt-0.5">
                    {item.unitInfo} -{' '}
                    <span className="font-bold text-foreground">${item.price.toFixed(2)}</span>
                  </p>
                </div>

                {/* Quantity Controls matching Reference 4: - [number] + (with primary colored button) */}
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => updateQuantity(item.cartId, item.quantity - 1)}
                    className="w-7 h-7 rounded-full bg-surface-container hover:bg-surface-container-high text-foreground font-bold flex items-center justify-center text-xs transition-colors"
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                  <button
                    type="button"
                    onClick={() => updateQuantity(item.cartId, item.quantity + 1)}
                    className="w-7 h-7 rounded-full bg-primary hover:bg-primary-container text-primary-foreground font-bold flex items-center justify-center text-xs transition-colors shadow-2xs"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary Box matching Reference 4 */}
          <div className="bg-surface-container-lowest border border-outline-variant/70 rounded-2xl p-4 shadow-xs flex flex-col gap-2.5 mt-1">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Subtotal</span>
              <span className="font-bold text-foreground">${subtotal.toFixed(2)}</span>
            </div>

            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Shipping</span>
              <span className={`font-bold ${isFreeShipping ? 'text-secondary' : 'text-foreground'}`}>
                {isFreeShipping ? 'FREE' : `$${shippingCost.toFixed(2)}`}
              </span>
            </div>

            <div className="border-t border-outline-variant/60 my-1 pt-2 flex items-center justify-between">
              <span className="font-headline font-bold text-sm text-foreground">Total</span>
              <span className="font-headline font-bold text-base text-primary">
                ${total.toFixed(2)}
              </span>
            </div>

            {/* Place Order CTA matching Reference 4 */}
            <button
              type="button"
              onClick={handleStartCheckout}
              className="w-full bg-primary text-primary-foreground py-3.5 px-4 rounded-xl font-bold text-sm shadow-md hover:bg-primary-container active:scale-[0.98] transition-all flex items-center justify-center gap-2 mt-1"
            >
              <span>Place Order</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-4 text-[10px] text-muted-foreground mt-1">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-secondary" /> 256-bit Secure
              </span>
              <span className="flex items-center gap-1">
                <Truck className="w-3.5 h-3.5 text-secondary" /> Fast Carbon-Neutral Ship
              </span>
            </div>
          </div>
        </>
      )}

      {/* Simulated Interactive Checkout Modal */}
      {isCheckoutOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
          <div className="bg-surface-container-lowest w-full max-w-md max-h-[92vh] rounded-t-2xl sm:rounded-2xl overflow-y-auto no-scrollbar shadow-2xl p-5 flex flex-col gap-4">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-outline-variant pb-3">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">
                  {checkoutStep === 'shipping' ? '1' : checkoutStep === 'payment' ? '2' : '✓'}
                </div>
                <h3 className="font-headline font-bold text-base text-foreground">
                  {checkoutStep === 'shipping'
                    ? 'Shipping Address'
                    : checkoutStep === 'payment'
                    ? 'Payment & Review'
                    : 'Order Confirmed'}
                </h3>
              </div>
              <button
                onClick={() => setIsCheckoutOpen(false)}
                className="text-muted-foreground hover:text-foreground p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Step 1: Shipping Form */}
            {checkoutStep === 'shipping' && (
              <form onSubmit={handleProceedToPayment} className="flex flex-col gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-foreground">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-3 py-2 text-xs focus:ring-1 focus:ring-primary"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-foreground">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-3 py-2 text-xs focus:ring-1 focus:ring-primary"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-foreground">Street Address</label>
                  <input
                    type="text"
                    name="address"
                    required
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-3 py-2 text-xs focus:ring-1 focus:ring-primary"
                  />
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div className="space-y-1 col-span-1">
                    <label className="text-[11px] font-bold text-foreground">City</label>
                    <input
                      type="text"
                      name="city"
                      required
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-3 py-2 text-xs"
                    />
                  </div>
                  <div className="space-y-1 col-span-1">
                    <label className="text-[11px] font-bold text-foreground">State</label>
                    <input
                      type="text"
                      name="state"
                      required
                      value={formData.state}
                      onChange={handleInputChange}
                      className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-3 py-2 text-xs"
                    />
                  </div>
                  <div className="space-y-1 col-span-1">
                    <label className="text-[11px] font-bold text-foreground">ZIP</label>
                    <input
                      type="text"
                      name="zip"
                      required
                      value={formData.zip}
                      onChange={handleInputChange}
                      className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-3 py-2 text-xs"
                    />
                  </div>
                </div>

                <div className="bg-surface-variant/30 p-2.5 rounded-lg border border-outline-variant/60 flex items-center justify-between text-xs text-foreground mt-1">
                  <span className="font-medium">Shipping Option:</span>
                  <span className="font-bold text-secondary">
                    {isFreeShipping ? 'Standard Free (2-4 business days)' : 'Standard $5.99'}
                  </span>
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary text-primary-foreground py-3 rounded-xl font-bold text-xs mt-2 hover:bg-primary-container transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>Continue to Payment</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </form>
            )}

            {/* Step 2: Payment & Review */}
            {checkoutStep === 'payment' && (
              <div className="flex flex-col gap-3">
                <div className="bg-surface-container-low p-3 rounded-xl border border-outline-variant/60 text-xs space-y-1">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Shipping to:</span>
                    <span className="font-bold text-foreground">{formData.name}</span>
                  </div>
                  <div className="text-muted-foreground truncate">{formData.address}, {formData.city}, {formData.state} {formData.zip}</div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-foreground">Select Payment Method (Demo)</label>
                  <div className="grid grid-cols-3 gap-2">
                    {['Credit Card', 'Apple Pay', 'PayPal'].map((method) => (
                      <button
                        key={method}
                        type="button"
                        onClick={() => setFormData({ ...formData, paymentMethod: method })}
                        className={`py-2 px-2 rounded-lg text-xs font-semibold border transition-all ${
                          formData.paymentMethod === method
                            ? 'bg-accent/80 border-primary text-primary ring-1 ring-primary'
                            : 'bg-surface-container-low border-outline-variant text-muted-foreground'
                        }`}
                      >
                        {method}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Summary */}
                <div className="bg-surface-container-low p-3 rounded-xl border border-outline-variant/60 text-xs space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Items ({items.length}):</span>
                    <span className="font-bold text-foreground">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping:</span>
                    <span className="font-bold text-secondary">
                      {isFreeShipping ? 'FREE' : `$${shippingCost.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between pt-1 border-t border-outline-variant/60 font-bold text-sm">
                    <span>Grand Total:</span>
                    <span className="text-primary">${total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setCheckoutStep('shipping')}
                    className="w-1/3 py-2.5 rounded-xl border border-outline-variant text-xs font-semibold hover:bg-muted"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={handleCompleteOrder}
                    className="w-2/3 bg-primary text-primary-foreground py-2.5 rounded-xl font-bold text-xs hover:bg-primary-container transition-colors shadow-xs"
                  >
                    Complete Order (${total.toFixed(2)})
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Success Confirmation */}
            {checkoutStep === 'success' && (
              <div className="text-center py-4 flex flex-col items-center gap-3">
                <div className="w-14 h-14 rounded-full bg-secondary-container text-secondary flex items-center justify-center animate-bounce">
                  <CheckCircle2 className="w-8 h-8 stroke-[2.5]" />
                </div>
                <h3 className="font-headline font-bold text-xl text-foreground">
                  Thank You for Your Order!
                </h3>
                <p className="text-xs text-muted-foreground max-w-xs">
                  Your clean, chlorine-free period care is being prepared at our certified eco-facility.
                </p>

                <div className="w-full bg-surface-container-low p-3.5 rounded-xl border border-outline-variant/60 text-xs text-left space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Order Number:</span>
                    <span className="font-mono font-bold text-foreground">{orderNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Confirmation sent to:</span>
                    <span className="font-bold text-foreground truncate">{formData.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Estimated Delivery:</span>
                    <span className="font-bold text-secondary">In 2 - 3 Days</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleFinish}
                  className="w-full bg-primary text-primary-foreground py-3 rounded-xl font-bold text-xs hover:bg-primary-container transition-colors mt-2"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
