import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, MessageSquare, ExternalLink, ArrowRight, Package, Copy, Check, Send } from 'lucide-react';
import { PlacedOrder } from '../types';
import { BRAND_INFO } from '../data/products';
import { formatWhatsAppOrderMessage, getWhatsAppUrl, launchWhatsApp } from '../utils/whatsappNotification';

interface OrderSuccessModalProps {
  order: PlacedOrder | null;
  onClose: () => void;
}

export const OrderSuccessModal: React.FC<OrderSuccessModalProps> = ({ order, onClose }) => {
  const [copied, setCopied] = useState(false);

  const receiptText = order ? formatWhatsAppOrderMessage(order) : '';
  const whatsappUrl = order ? getWhatsAppUrl(order) : '';

  useEffect(() => {
    if (order && receiptText) {
      // Auto-copy receipt text to clipboard so it's always ready to paste
      navigator.clipboard.writeText(receiptText).catch(() => {});
    }
  }, [order, receiptText]);

  const handleCopyReceipt = () => {
    if (!receiptText) return;
    navigator.clipboard.writeText(receiptText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleOpenWhatsApp = () => {
    if (whatsappUrl) {
      launchWhatsApp(whatsappUrl);
    }
  };

  return (
    <AnimatePresence>
      {order && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/85 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-lg bg-neutral-900 border border-neutral-700 rounded-3xl shadow-2xl overflow-hidden z-10 my-8 p-6 sm:p-8 text-center"
          >
            {/* Animated Success Badge */}
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto mb-4 shadow-[0_0_30px_rgba(16,185,129,0.3)]">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest block">
              Payment &amp; Order Submitted
            </span>
            <h2 className="text-2xl font-black text-white font-display mt-1">
              Thank You, {order.customer.fullName.split(' ')[0]}!
            </h2>
            <p className="text-xs text-neutral-300 mt-2">
              Your order has been recorded. Order ID: <strong className="text-emerald-400">{order.orderId}</strong>
            </p>

            {/* WhatsApp Direct Action Banner */}
            <div className="mt-6 p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 text-left space-y-3">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-emerald-500 text-neutral-950 flex-shrink-0 mt-0.5">
                  <MessageSquare className="w-4 h-4 fill-current" />
                </div>
                <div className="text-xs">
                  <h4 className="font-bold text-white">Send Details to WhatsApp</h4>
                  <p className="text-neutral-300 mt-0.5 leading-relaxed">
                    If WhatsApp did not automatically open, tap the button below to send your order receipt directly to RND Nutrition (+91 {BRAND_INFO.supportPhone}).
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleOpenWhatsApp}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl font-bold text-xs bg-emerald-500 hover:bg-emerald-400 text-neutral-950 transition-all shadow-md cursor-pointer active:scale-[0.99]"
              >
                <MessageSquare className="w-4 h-4 fill-current" />
                <span>Send Order via WhatsApp (+91 {BRAND_INFO.supportPhone})</span>
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Summary Box */}
            <div className="mt-5 p-4 rounded-2xl bg-neutral-950/70 border border-neutral-800 text-left text-xs space-y-2">
              <div className="flex justify-between text-neutral-400">
                <span>Total Amount:</span>
                <span className="font-bold text-white">₹{order.total}</span>
              </div>
              <div className="flex justify-between text-neutral-400">
                <span>UPI UTR / Ref ID:</span>
                <span className="font-mono font-bold text-emerald-400">{order.customer.paymentReference || 'N/A'}</span>
              </div>
              <div className="flex justify-between text-neutral-400">
                <span>Delivery City:</span>
                <span className="text-neutral-200">{order.customer.city}, {order.customer.pincode}</span>
              </div>
              <div className="flex justify-between text-neutral-400">
                <span>Contact:</span>
                <span className="text-neutral-200">{order.customer.phoneNumber}</span>
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-6 flex flex-col sm:flex-row gap-2.5">
              <button
                type="button"
                onClick={handleCopyReceipt}
                className="flex-1 py-3 px-4 rounded-xl font-semibold text-xs bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-neutral-700 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Receipt Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Receipt Text</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-3 px-4 rounded-xl font-bold text-xs bg-neutral-100 hover:bg-white text-neutral-900 transition-colors cursor-pointer"
              >
                Back to Store
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
