import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronDown, ChevronUp, Mail, Phone, MessageSquare, Check, Send, ArrowLeft } from 'lucide-react'

export const FaqContactPage: React.FC = () => {
  const navigate = useNavigate()
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0)
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [inquiryData, setInquiryData] = useState({
    name: '',
    email: '',
    subject: 'product-inquiry',
    message: '',
  })

  const faqs = [
    {
      q: 'What makes Maxim Hygiene different from conventional brands?',
      a: 'We use 100% Certified Organic Cotton for both the absorbent core and cover sheets. Our products are Totally Chlorine Free (TCF), never bleached with dioxin-producing chlorine, and completely free of viscose rayon, synthetic plastics, latex, dyes, and fragrance.'
    },
    {
      q: 'How does MyPeriodPlan™ auto-delivery work?',
      a: 'You choose your delivery frequency (30, 45, or 60 days) and pick your favorite organic essentials. You save 10% on every order with free shipping. You can pause, skip, or cancel your subscription at any time without fees.'
    },
    {
      q: 'Are your tampons safe from Toxic Shock Syndrome (TSS)?',
      a: 'All tampons carry a risk of TSS. However, 100% pure organic cotton tampons do not shed synthetic fibers or create the abrasive vaginal micro-tears commonly associated with synthetic rayon blends. Always choose the lowest absorbency necessary and change every 4–8 hours.'
    },
    {
      q: 'What is the shipping cost and delivery timeframe?',
      a: 'Shipping is FREE on all orders of $39.99 or more, and free on all MyPeriodPlan subscriptions. Standard shipping on smaller orders is $5.99. Orders placed before 2pm EST ship the same business day.'
    },
    {
      q: 'Are Maxim Hygiene pads and wipes biodegradable?',
      a: 'Yes! Our organic cotton tampons, pads, and wipes are biodegradable and compostable. We avoid petrochemical polymer backings in favor of breathable plant-based cellulose biopolymers.'
    }
  ]

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index)
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setFormSubmitted(true)
  }

  return (
    <div className="flex flex-col gap-5 p-4 pb-28">
      {/* Header with Back Navigation */}
      <div className="pt-1 flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => {
              if (window.history.state && window.history.state.idx > 0) {
                navigate(-1)
              } else {
                navigate('/profile')
              }
            }}
            className="w-9 h-9 rounded-full bg-white border border-black/10 flex items-center justify-center text-neutral-800 hover:text-black hover:bg-neutral-50 shadow-2xs active:scale-95 transition-all shrink-0"
            aria-label="Back"
          >
            <ArrowLeft className="w-4.5 h-4.5" />
          </button>
          <h1 className="font-headline font-bold text-2xl text-foreground tracking-tight">
            Help &amp; Contact Us
          </h1>
        </div>
        <p className="text-xs text-muted-foreground font-medium leading-relaxed">
          Questions about our 100% organic cotton products, order tracking, or subscription care? We're here for you.
        </p>
      </div>

      {/* Quick Contact Badges */}
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div className="bg-surface-container-low p-3 rounded-xl border border-outline-variant/40 flex items-center gap-2">
          <Mail className="w-4 h-4 text-primary shrink-0" />
          <div className="truncate">
            <div className="text-[10px] text-muted-foreground">Email Support</div>
            <div className="font-bold text-foreground truncate">info@maximhy.com</div>
          </div>
        </div>

        <div className="bg-surface-container-low p-3 rounded-xl border border-outline-variant/40 flex items-center gap-2">
          <Phone className="w-4 h-4 text-secondary shrink-0" />
          <div className="truncate">
            <div className="text-[10px] text-muted-foreground">Toll-Free Phone</div>
            <div className="font-bold text-foreground">1-800-997-7443</div>
          </div>
        </div>
      </div>

      {/* Frequently Asked Questions */}
      <div>
        <h2 className="font-headline font-bold text-base text-foreground mb-2">
          Frequently Asked Questions
        </h2>
        <div className="flex flex-col gap-2">
          {faqs.map((faq, idx) => {
            const isOpen = openFaqIndex === idx
            return (
              <div
                key={idx}
                className="bg-surface-container-lowest border border-outline-variant/60 rounded-xl overflow-hidden shadow-2xs"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-3 text-left font-headline font-semibold text-xs text-foreground flex items-center justify-between gap-2 hover:bg-surface-container-low/50"
                >
                  <span>{faq.q}</span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-primary shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-muted-foreground shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-3 pb-3 pt-0 text-xs text-muted-foreground leading-relaxed border-t border-outline-variant/30 animate-in fade-in duration-150">
                    {faq.a}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Contact Form with Simulated Submission */}
      <div className="bg-surface-container-lowest border border-outline-variant/80 rounded-2xl p-4 shadow-sm flex flex-col gap-3">
        <h2 className="font-headline font-bold text-sm text-foreground flex items-center gap-1.5">
          <MessageSquare className="w-4 h-4 text-primary" />
          <span>Send Our Care Team a Message</span>
        </h2>

        {formSubmitted ? (
          <div className="bg-surface-variant/40 p-4 rounded-xl border border-outline-variant/60 text-center flex flex-col items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center">
              <Check className="w-5 h-5 stroke-[3]" />
            </div>
            <h3 className="font-headline font-bold text-sm text-foreground">
              Message Received!
            </h3>
            <p className="text-xs text-muted-foreground">
              Thank you for reaching out. One of our organic care specialists will reply to your email within 24 hours.
            </p>
            <button
              onClick={() => {
                setFormSubmitted(false)
                setInquiryData({ name: '', email: '', subject: 'product-inquiry', message: '' })
              }}
              className="text-xs text-primary font-bold hover:underline mt-1"
            >
              Send Another Inquiry
            </button>
          </div>
        ) : (
          <form onSubmit={handleFormSubmit} className="flex flex-col gap-2.5">
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-foreground">Your Name</label>
              <input
                type="text"
                required
                value={inquiryData.name}
                onChange={(e) => setInquiryData({ ...inquiryData, name: e.target.value })}
                placeholder="Jane Doe"
                className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-3 py-2 text-xs focus:ring-1 focus:ring-primary"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-bold text-foreground">Email Address</label>
              <input
                type="email"
                required
                value={inquiryData.email}
                onChange={(e) => setInquiryData({ ...inquiryData, email: e.target.value })}
                placeholder="jane@example.com"
                className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-3 py-2 text-xs focus:ring-1 focus:ring-primary"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-bold text-foreground">Topic</label>
              <select
                value={inquiryData.subject}
                onChange={(e) => setInquiryData({ ...inquiryData, subject: e.target.value })}
                className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-3 py-2 text-xs focus:ring-1 focus:ring-primary"
              >
                <option value="product-inquiry">Product &amp; Ingredient Inquiry</option>
                <option value="order-status">Order Tracking &amp; Delivery</option>
                <option value="subscription">MyPeriodPlan™ Subscription Help</option>
                <option value="wholesale">Retail &amp; Wholesale Inquiry</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-bold text-foreground">Message</label>
              <textarea
                rows={3}
                required
                value={inquiryData.message}
                onChange={(e) => setInquiryData({ ...inquiryData, message: e.target.value })}
                placeholder="How can we help your clean cycle journey?"
                className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-3 py-2 text-xs focus:ring-1 focus:ring-primary"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-primary text-primary-foreground py-2.5 rounded-xl font-bold text-xs mt-1 hover:bg-primary-container transition-colors flex items-center justify-center gap-1.5 shadow-xs"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Submit Message</span>
            </button>
          </form>
        )}
      </div>

      <div className="text-center text-[10px] text-muted-foreground pb-2">
        Maxim Hygiene Products Inc. · P.O. Box 716, New York, NY · 100% Cotton Specialists
      </div>
    </div>
  )
}
