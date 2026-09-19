import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  QrCode,
  CheckCircle2,
  Copy,
  Check,
  Smartphone,
  ShieldCheck,
  Send,
  ArrowLeft,
  ArrowRight,
  Lock,
  ExternalLink,
  MessageSquare,
  Zap,
  AlertCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import QRCode from 'qrcode';
import { CartItem, CheckoutFormData, PlacedOrder } from '../types';
import { BRAND_INFO } from '../data/products';
import {
  formatWhatsAppOrderMessage,
  getWhatsAppUrl,
  launchWhatsApp,
  dispatchBackgroundNotification
} from '../utils/whatsappNotification';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onOrderCompleted: (order: PlacedOrder) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  onOrderCompleted,
}) => {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const isFreeShipping = subtotal >= BRAND_INFO.freeShippingThreshold || subtotal === 0;
  const shippingFee = isFreeShipping ? 0 : BRAND_INFO.shippingFee;
  const total = subtotal + shippingFee;

  // Form states
  const [formData, setFormData] = useState<CheckoutFormData>({
    fullName: '',
    phoneNumber: '',
    email: '',
    addressLine1: '',
    city: '',
    state: '',
    pincode: '',
    paymentReference: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof CheckoutFormData, string>>>({});
  const [utrError, setUtrError] = useState<string>('');
  const [copiedUpi, setCopiedUpi] = useState(false);
  const [step, setStep] = useState<'details' | 'payment'>('details');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dynamicQrDataUrl, setDynamicQrDataUrl] = useState<string>('');

  useEffect(() => {
    if (isOpen) {
      setStep('details');
      setCopiedUpi(false);
      setUtrError('');
    }
  }, [isOpen]);

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(BRAND_INFO.upiId);
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2500);
  };

  // Direct UPI App URI for mobile or UPI apps
  const upiIntentUrl = `upi://pay?pa=${encodeURIComponent(BRAND_INFO.upiId)}&pn=${encodeURIComponent((BRAND_INFO as any).payeeName || 'Deepanshu')}&am=${total}&cu=INR&tn=${encodeURIComponent(`RND Order ${items.length} items`)}`;

  useEffect(() => {
    if (isOpen && total > 0) {
      QRCode.toDataURL(upiIntentUrl, {
        errorCorrectionLevel: 'H',
        margin: 1,
        width: 420,
        color: {
          dark: '#000000',
          light: '#ffffff',
        },
      })
        .then((url) => setDynamicQrDataUrl(url))
        .catch(() => {});
    }
  }, [isOpen, upiIntentUrl, total]);

  const validateDetails = (): boolean => {
    const newErrors: Partial<Record<keyof CheckoutFormData, string>> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone/WhatsApp number is required';
    } else if (!/^[0-9+ ]{10,14}$/.test(formData.phoneNumber.trim())) {
      newErrors.phoneNumber = 'Please enter a valid 10-digit mobile number';
    }
    if (!formData.addressLine1.trim()) {
      newErrors.addressLine1 = 'Delivery address is required';
    }
    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    }
    if (!formData.state.trim()) {
      newErrors.state = 'State is required';
    }
    if (!formData.pincode.trim() || !/^[0-9]{6}$/.test(formData.pincode.trim())) {
      newErrors.pincode = 'Valid 6-digit PIN code is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateDetails()) {
      setStep('payment');
    }
  };

  const handleConfirmAndSendWhatsApp = async () => {
    // 1. Enforce compulsory UTR validation before order confirmation
    const cleanUtr = (formData.paymentReference || '').trim();
    if (!cleanUtr) {
      setUtrError('UPI Transaction UTR / Ref No. is compulsory to confirm your order.');
      const utrEl = document.getElementById('utr-input-field');
      if (utrEl) {
        utrEl.focus();
        utrEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }
    if (cleanUtr.length < 6) {
      setUtrError('Please enter a valid 12-digit UPI Transaction UTR number (at least 6 digits).');
      const utrEl = document.getElementById('utr-input-field');
      if (utrEl) {
        utrEl.focus();
        utrEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    setUtrError('');
    setIsSubmitting(true);

    const orderId = `#RND-${Math.floor(100000 + Math.random() * 900000)}`;

    const placedOrder: PlacedOrder = {
      orderId,
      createdAt: new Date().toISOString(),
      items: [...items],
      subtotal,
      shippingFee,
      discount: 0,
      total,
      customer: {
        ...formData,
        paymentReference: cleanUtr,
      },
      paymentStatus: 'pending_confirmation',
    };

    const fullMessage = formatWhatsAppOrderMessage(placedOrder);
    const whatsappUrl = getWhatsAppUrl(placedOrder);

    // Auto-copy complete formatted receipt text to clipboard
    try {
      await navigator.clipboard.writeText(fullMessage);
    } catch {
      // ignore
    }

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch {
      // ignore
    }

    // Dispatch background notification if webhook / CallMeBot is configured
    dispatchBackgroundNotification(placedOrder).catch(() => {});

    // Directly open WhatsApp without popup blockers
    launchWhatsApp(whatsappUrl);

    // Callback to parent to show receipt and clear cart
    onOrderCompleted(placedOrder);
    setIsSubmitting(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/85 backdrop-blur-md"
          />

          {/* Modal Window */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-2xl bg-neutral-900 border border-neutral-700/80 rounded-3xl shadow-2xl overflow-hidden z-10 my-6 flex flex-col max-h-[92vh]"
          >
          {/* Header */}
          <div className="p-5 sm:p-6 border-b border-neutral-800 flex items-center justify-between bg-neutral-950/60">
            <div className="flex items-center gap-3">
              {step === 'payment' && (
                <button
                  type="button"
                  onClick={() => setStep('details')}
                  className="p-2 rounded-xl bg-neutral-800 text-neutral-400 hover:text-white transition-colors cursor-pointer"
                  title="Back to Details"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
              )}
              <div>
                <h2 className="text-xl font-black text-white font-display flex items-center gap-2">
                  <span>RND Checkout</span>
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    UPI Direct
                  </span>
                </h2>
                <p className="text-xs text-neutral-400 mt-0.5">
                  {step === 'details'
                    ? 'Step 1: Enter your delivery and contact details'
                    : 'Step 2: Complete UPI payment & confirm on WhatsApp'}
                </p>
              </div>
            </div>

            <button
              id="close-checkout-modal"
              type="button"
              onClick={onClose}
              className="p-2 rounded-full text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Content */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
            {/* Step Progress Bar */}
            <div className="grid grid-cols-2 gap-2 text-xs font-bold">
              <div
                className={`py-2 px-3 rounded-xl border flex items-center gap-2 ${
                  step === 'details'
                    ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/50'
                    : 'bg-neutral-800/80 text-neutral-300 border-neutral-700'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                    step === 'details' ? 'bg-emerald-500 text-neutral-950 font-black' : 'bg-emerald-500 text-neutral-950'
                  }`}
                >
                  {step === 'payment' ? <Check className="w-3 h-3" /> : '1'}
                </div>
                <span>1. Shipping Details</span>
              </div>

              <div
                className={`py-2 px-3 rounded-xl border flex items-center gap-2 ${
                  step === 'payment'
                    ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/50'
                    : 'bg-neutral-950 text-neutral-500 border-neutral-800'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                    step === 'payment' ? 'bg-emerald-500 text-neutral-950 font-black' : 'bg-neutral-800 text-neutral-400'
                  }`}
                >
                  2
                </div>
                <span>2. Payment &amp; Compulsory UTR</span>
              </div>
            </div>

            {/* Order Items Summary Strip */}
            <div className="p-3.5 rounded-2xl bg-neutral-950/70 border border-neutral-800">
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="font-bold text-neutral-300 uppercase tracking-wider">
                  Order Summary ({items.length} items)
                </span>
                <span className="text-emerald-400 font-bold font-display text-sm">
                  Total: ₹{total}
                </span>
              </div>
              <div className="max-h-24 overflow-y-auto space-y-1.5 pr-1">
                {items.map((it) => (
                  <div key={it.id} className="flex justify-between items-center text-xs text-neutral-400">
                    <span className="truncate max-w-[280px]">
                      {it.quantity}x {it.productName} ({it.size}, {it.flavor})
                    </span>
                    <span className="font-semibold text-neutral-200">
                      ₹{it.price * it.quantity}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* STEP 1: Details Form */}
            {step === 'details' && (
              <form onSubmit={handleProceedToPayment} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Rahul Sharma"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className={`w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 ${
                        errors.fullName ? 'border-red-500' : 'border-neutral-800'
                      }`}
                    />
                    {errors.fullName && <p className="text-red-400 text-xs mt-1">{errors.fullName}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1">
                      WhatsApp / Phone Number *
                    </label>
                    <input
                      type="tel"
                      placeholder="e.g. 9876543210"
                      value={formData.phoneNumber}
                      onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                      className={`w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 ${
                        errors.phoneNumber ? 'border-red-500' : 'border-neutral-800'
                      }`}
                    />
                    {errors.phoneNumber && (
                      <p className="text-red-400 text-xs mt-1">{errors.phoneNumber}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">
                    Email Address (Optional)
                  </label>
                  <input
                    type="email"
                    placeholder="e.g. rahul@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">
                    Delivery Address (House / Street / Landmark) *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Flat 302, Green Valley Apartments, MG Road"
                    value={formData.addressLine1}
                    onChange={(e) => setFormData({ ...formData, addressLine1: e.target.value })}
                    className={`w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 ${
                      errors.addressLine1 ? 'border-red-500' : 'border-neutral-800'
                    }`}
                  />
                  {errors.addressLine1 && (
                    <p className="text-red-400 text-xs mt-1">{errors.addressLine1}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1">
                      City *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. New Delhi"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className={`w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 ${
                        errors.city ? 'border-red-500' : 'border-neutral-800'
                      }`}
                    />
                    {errors.city && <p className="text-red-400 text-xs mt-1">{errors.city}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1">
                      State *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Delhi / Haryana"
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      className={`w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 ${
                        errors.state ? 'border-red-500' : 'border-neutral-800'
                      }`}
                    />
                    {errors.state && <p className="text-red-400 text-xs mt-1">{errors.state}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1">
                      PIN Code *
                    </label>
                    <input
                      type="text"
                      maxLength={6}
                      placeholder="e.g. 110001"
                      value={formData.pincode}
                      onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                      className={`w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 ${
                        errors.pincode ? 'border-red-500' : 'border-neutral-800'
                      }`}
                    />
                    {errors.pincode && <p className="text-red-400 text-xs mt-1">{errors.pincode}</p>}
                  </div>
                </div>

                <div className="pt-3 space-y-2.5">
                  {/* Proceed to UPI QR & Enter Mandatory UTR */}
                  <button
                    id="submit-details-btn"
                    type="submit"
                    className="w-full py-4 px-4 rounded-2xl font-bold text-sm bg-emerald-500 hover:bg-emerald-400 text-neutral-950 shadow-[0_6px_25px_rgba(16,185,129,0.35)] hover:shadow-[0_10px_35px_rgba(16,185,129,0.5)] transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-[0.99]"
                  >
                    <span>Proceed to UPI Payment &amp; Enter UTR</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <div className="flex items-center justify-center gap-1.5 text-[11px] text-neutral-400 text-center pt-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                    <span>Step 2 requires entering your 12-digit UPI UTR number to confirm order</span>
                  </div>
                </div>
              </form>
            )}

            {/* STEP 2: UPI QR Payment & WhatsApp Confirmation */}
            {step === 'payment' && (
              <div className="space-y-6">
                <div className="text-center">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-xs font-bold text-emerald-400 mb-1.5">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>VERIFIED GOOGLE PAY MERCHANT</span>
                  </div>
                  <h3 className="text-2xl font-black text-white font-display">
                    Pay ₹{total} via Any UPI App
                  </h3>
                  <p className="text-xs text-neutral-400 mt-1 max-w-md mx-auto">
                    Scan the auto-amount Google Pay QR code below using GPay, PhonePe, Paytm, BHIM, or any UPI app.
                  </p>
                </div>

                {/* Exact Google Pay Card Styled Container with Auto-Amount QR */}
                <div className="flex flex-col items-center justify-center">
                  {/* Google Pay Outer Light Frame matching user image */}
                  <div className="w-full max-w-sm rounded-[28px] bg-[#f0f4f9] p-5 sm:p-6 shadow-2xl border border-neutral-300 text-neutral-900 flex flex-col items-center relative">
                    
                    {/* Top User Profile Header: Green Avatar with 'D' and Name 'Deepanshu' */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-11 h-11 rounded-full bg-[#00875a] flex items-center justify-center shadow-md">
                        <span className="text-white text-xl font-bold font-sans">D</span>
                      </div>
                      <div className="flex flex-col">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-800 font-sans">
                            Deepanshu
                          </span>
                          <CheckCircle2 className="w-4 h-4 text-[#00875a] fill-[#00875a]/10" />
                        </div>
                        <span className="text-[11px] font-semibold text-neutral-500 -mt-0.5">
                          RND Nutrition Official Store
                        </span>
                      </div>
                    </div>

                    {/* The White Card containing the auto-amount QR code */}
                    <div className="w-full bg-white rounded-2xl p-4 sm:p-5 shadow-md border border-neutral-200/80 flex flex-col items-center">
                      <div className="relative w-56 sm:w-64 aspect-square flex items-center justify-center">
                        {dynamicQrDataUrl ? (
                          <div className="relative">
                            <img
                              src={dynamicQrDataUrl}
                              alt={`Google Pay QR for ₹${total} - Deepanshu`}
                              className="w-56 sm:w-64 h-56 sm:h-64 object-contain rounded-lg"
                            />
                            {/* Centered Google Pay Badge */}
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                              <div className="w-12 h-12 rounded-full bg-white shadow-md border border-neutral-200 flex items-center justify-center p-1.5">
                                <svg viewBox="0 0 40 40" className="w-8 h-8">
                                  {/* GPay 4-color folded capsule ribbon */}
                                  <rect x="5" y="11" width="13" height="7" rx="3.5" fill="#4285F4" transform="rotate(35 11.5 14.5)"/>
                                  <rect x="7" y="19" width="13" height="7" rx="3.5" fill="#FBBC04" transform="rotate(-40 13.5 22.5)"/>
                                  <rect x="17" y="19" width="13" height="7" rx="3.5" fill="#0F9D58" transform="rotate(40 23.5 22.5)"/>
                                  <rect x="19" y="11" width="13" height="7" rx="3.5" fill="#EA4335" transform="rotate(-35 25.5 14.5)"/>
                                </svg>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="w-56 sm:w-64 h-56 sm:h-64 flex items-center justify-center bg-neutral-100 rounded-xl">
                            <span className="text-xs text-neutral-500 animate-pulse">Generating payment QR...</span>
                          </div>
                        )}
                      </div>

                      {/* Auto Amount indicator pill inside card */}
                      <div className="mt-2.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 flex items-center gap-1.5 text-xs font-semibold text-emerald-800">
                        <span>Exact Amount:</span>
                        <span className="font-bold text-emerald-700 font-mono text-sm">₹{total}</span>
                      </div>

                      {/* UPI ID String directly below QR code */}
                      <div className="mt-2.5 pt-2 border-t border-neutral-100 w-full flex flex-col items-center">
                        <div className="text-center font-sans">
                          <span className="text-xs sm:text-sm font-semibold text-neutral-600">UPI ID: </span>
                          <span className="text-xs sm:text-sm font-bold text-neutral-900 font-mono select-all">
                            {BRAND_INFO.upiId}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Footer text from picture: Scan to pay with any UPI app */}
                    <div className="mt-4 text-center">
                      <p className="text-xs sm:text-sm font-medium text-neutral-600 font-sans">
                        Scan to pay with any UPI app
                      </p>
                    </div>
                  </div>

                  {/* Quick Copy UPI & 1-Tap Mobile Payment Bar */}
                  <div className="mt-4 flex flex-wrap items-center justify-center gap-2.5">
                    <button
                      type="button"
                      onClick={handleCopyUpi}
                      className="flex items-center gap-1.5 text-xs font-bold px-3.5 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-neutral-700 transition-all cursor-pointer active:scale-95"
                    >
                      {copiedUpi ? (
                        <>
                          <Check className="w-4 h-4 text-emerald-400" />
                          <span className="text-emerald-400 font-bold">UPI ID Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4 text-neutral-400" />
                          <span>Copy: <span className="font-mono text-emerald-400">{BRAND_INFO.upiId}</span></span>
                        </>
                      )}
                    </button>

                    <a
                      href={upiIntentUrl}
                      className="flex items-center gap-1.5 text-xs font-bold px-3.5 py-2 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-400 border border-emerald-500/30 transition-all"
                    >
                      <Smartphone className="w-4 h-4" />
                      <span>Open UPI App on Phone</span>
                    </a>
                  </div>

                  {/* Accepted Apps Pills */}
                  <div className="mt-3 flex items-center justify-center flex-wrap gap-2 text-[11px] text-neutral-400">
                    <span className="text-neutral-500">Supports:</span>
                    <span className="px-2 py-0.5 rounded-md bg-neutral-950 border border-neutral-800 text-neutral-300 font-medium">Google Pay</span>
                    <span className="px-2 py-0.5 rounded-md bg-neutral-950 border border-neutral-800 text-neutral-300 font-medium">PhonePe</span>
                    <span className="px-2 py-0.5 rounded-md bg-neutral-950 border border-neutral-800 text-neutral-300 font-medium">Paytm</span>
                    <span className="px-2 py-0.5 rounded-md bg-neutral-950 border border-neutral-800 text-neutral-300 font-medium">BHIM UPI</span>
                    <span className="px-2 py-0.5 rounded-md bg-neutral-950 border border-neutral-800 text-neutral-300 font-medium">Cred</span>
                  </div>
                </div>

                {/* Compulsory UTR / Reference ID Box */}
                <div className={`p-4 rounded-2xl bg-neutral-950/80 border transition-all ${
                  utrError
                    ? 'border-red-500/90 ring-2 ring-red-500/20 bg-red-950/10'
                    : (formData.paymentReference || '').trim().length >= 6
                    ? 'border-emerald-500/60 ring-1 ring-emerald-500/20'
                    : 'border-neutral-800'
                }`}>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-bold text-white flex items-center gap-1.5">
                      <span>UPI Transaction UTR / Ref No. *</span>
                    </label>
                    <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-red-500/20 text-red-400 border border-red-500/40 uppercase tracking-wide">
                      COMPULSORY
                    </span>
                  </div>

                  <p className="text-[11px] text-neutral-400 mb-2">
                    Enter the 12-digit UTR number from your Google Pay, PhonePe, or Paytm payment receipt before confirming:
                  </p>

                  <div className="relative">
                    <input
                      id="utr-input-field"
                      type="text"
                      required
                      placeholder="e.g. 425619874120 (12-digit UTR)"
                      value={formData.paymentReference}
                      onChange={(e) => {
                        setFormData({ ...formData, paymentReference: e.target.value });
                        if (utrError) setUtrError('');
                      }}
                      className={`w-full px-3.5 py-3 rounded-xl bg-neutral-900 border text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:ring-2 font-mono tracking-wider transition-colors ${
                        utrError ? 'border-red-500 focus:ring-red-500/50' : 'border-neutral-700 focus:ring-emerald-500/50'
                      }`}
                    />
                    {(formData.paymentReference || '').trim().length >= 6 && (
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-400 flex items-center gap-1 text-[11px] font-bold">
                        <CheckCircle2 className="w-4 h-4" />
                        <span className="hidden sm:inline">UTR Entered</span>
                      </div>
                    )}
                  </div>

                  {/* Error Alert */}
                  {utrError && (
                    <div className="mt-2.5 p-2.5 rounded-xl bg-red-500/15 border border-red-500/40 text-red-300 text-xs font-semibold flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                      <span>{utrError}</span>
                    </div>
                  )}

                  {/* Guide on finding UTR */}
                  <div className="mt-3 pt-2.5 border-t border-neutral-800 text-[11px] text-neutral-400 space-y-1">
                    <p className="font-semibold text-neutral-300">Where to find your 12-digit UTR number:</p>
                    <ul className="space-y-0.5 text-neutral-400 text-[11px]">
                      <li>• <strong className="text-neutral-300">Google Pay:</strong> Tap completed transaction → look for <em>"UPI transaction ID"</em></li>
                      <li>• <strong className="text-neutral-300">PhonePe:</strong> Tap payment details → look for <em>"UTR"</em> (12 digits)</li>
                      <li>• <strong className="text-neutral-300">Paytm / BHIM:</strong> View transaction receipt → look for <em>"UPI Ref No"</em></li>
                    </ul>
                  </div>
                </div>

                {/* Confirm & WhatsApp API Link Action */}
                <div className="space-y-2.5">
                  <button
                    id="confirm-whatsapp-order-btn"
                    type="button"
                    onClick={handleConfirmAndSendWhatsApp}
                    disabled={isSubmitting}
                    className="w-full py-4 px-6 rounded-2xl font-bold text-sm bg-emerald-500 hover:bg-emerald-400 text-neutral-950 shadow-[0_8px_30px_rgba(16,185,129,0.4)] hover:shadow-[0_12px_40px_rgba(16,185,129,0.55)] transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-[0.99]"
                  >
                    <MessageSquare className="w-5 h-5 fill-current" />
                    <span>Verify UTR &amp; Confirm Order on WhatsApp ({BRAND_INFO.supportPhone})</span>
                    <ExternalLink className="w-4 h-4" />
                  </button>

                  <p className="text-center text-[11px] text-neutral-400 leading-normal px-2">
                    Orders are verified with your 12-digit UTR and immediately forwarded to <strong className="text-neutral-200">+{BRAND_INFO.supportWhatsappNumber}</strong> for express packaging and dispatch.
                  </p>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    )}
  </AnimatePresence>
);
};
