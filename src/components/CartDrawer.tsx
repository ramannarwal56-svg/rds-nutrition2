import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Trash2, ShoppingBag, ArrowRight, ShieldCheck, Truck } from 'lucide-react';
import { CartItem } from '../types';
import { BRAND_INFO } from '../data/products';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, newQty: number) => void;
  onRemoveItem: (id: string) => void;
  onCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
}) => {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const isFreeShipping = subtotal >= BRAND_INFO.freeShippingThreshold || subtotal === 0;
  const shippingFee = isFreeShipping ? 0 : BRAND_INFO.shippingFee;
  const total = subtotal + shippingFee;
  const amountToFreeShipping = Math.max(0, BRAND_INFO.freeShippingThreshold - subtotal);
  const freeShippingProgress = Math.min(100, (subtotal / BRAND_INFO.freeShippingThreshold) * 100);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
          />

          {/* Drawer Panel */}
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 220 }}
              className="w-screen max-w-md bg-neutral-900 border-l border-neutral-800 shadow-2xl flex flex-col"
            >
              {/* Header */}
              <div className="p-6 border-b border-neutral-800 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    <ShoppingBag className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-white font-display">Your Cart</h2>
                    <span className="text-xs text-neutral-400">
                      {items.length} {items.length === 1 ? 'item' : 'items'} selected
                    </span>
                  </div>
                </div>

                <button
                  id="close-cart-btn"
                  type="button"
                  onClick={onClose}
                  className="p-2 rounded-full text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Free Shipping Progress Indicator */}
              <div className="px-6 py-3 bg-neutral-950/60 border-b border-neutral-800/80">
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="flex items-center gap-1.5 text-neutral-300 font-medium">
                    <Truck className="w-4 h-4 text-emerald-400" />
                    {isFreeShipping ? (
                      <span className="text-emerald-400 font-semibold">You unlocked Free Shipping!</span>
                    ) : (
                      <span>
                        Add <strong className="text-emerald-400">₹{amountToFreeShipping}</strong> for FREE Shipping
                      </span>
                    )}
                  </span>
                  <span className="text-neutral-400 text-[11px]">Threshold: ₹{BRAND_INFO.freeShippingThreshold}</span>
                </div>
                <div className="w-full h-1.5 bg-neutral-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-500 to-cyan-400 transition-all duration-500 rounded-full"
                    style={{ width: `${freeShippingProgress}%` }}
                  />
                </div>
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {items.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center p-8 text-neutral-400">
                    <div className="w-16 h-16 rounded-2xl bg-neutral-800 flex items-center justify-center mb-4 text-neutral-500">
                      <ShoppingBag className="w-8 h-8" />
                    </div>
                    <h3 className="text-base font-bold text-neutral-200">Your cart is empty</h3>
                    <p className="text-xs text-neutral-400 mt-1 max-w-xs">
                      Explore our 3D sports nutrition lineup and add your favorite proteins and supplements.
                    </p>
                    <button
                      type="button"
                      onClick={onClose}
                      className="mt-6 px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider bg-emerald-500 text-neutral-950 hover:bg-emerald-400 transition-colors cursor-pointer"
                    >
                      Start Shopping
                    </button>
                  </div>
                ) : (
                  items.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="p-3.5 rounded-2xl bg-neutral-950/70 border border-neutral-800/80 flex items-center gap-3.5"
                    >
                      {/* Thumbnail */}
                      <div className="w-16 h-16 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center p-1 flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.productName}
                          referrerPolicy="no-referrer"
                          onError={(e) => {
                            (e.currentTarget as HTMLImageElement).src = '/packaging-whey.svg';
                          }}
                          className="max-h-full max-w-full object-contain"
                        />
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-bold text-neutral-100 truncate">
                          {item.productName}
                        </h4>
                        <div className="flex items-center gap-2 text-xs text-neutral-400 mt-0.5">
                          <span className="px-1.5 py-0.5 rounded bg-neutral-800 text-neutral-300 font-medium text-[11px]">
                            {item.size}
                          </span>
                          <span className="truncate text-neutral-400 text-[11px]">
                            {item.flavor}
                          </span>
                        </div>
                        <div className="text-sm font-bold text-emerald-400 mt-1">
                          ₹{item.price * item.quantity}
                        </div>
                      </div>

                      {/* Quantity & Delete */}
                      <div className="flex flex-col items-end gap-2 flex-shrink-0">
                        <button
                          type="button"
                          onClick={() => onRemoveItem(item.id)}
                          className="text-neutral-500 hover:text-red-400 transition-colors p-1 cursor-pointer"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>

                        <div className="flex items-center border border-neutral-700 rounded-lg bg-neutral-900 text-xs">
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                            className="px-2 py-1 text-neutral-400 hover:text-white cursor-pointer"
                          >
                            -
                          </button>
                          <span className="px-2 font-bold text-white text-xs">{item.quantity}</span>
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                            className="px-2 py-1 text-neutral-400 hover:text-white cursor-pointer"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>

              {/* Footer Summary & Checkout */}
              {items.length > 0 && (
                <div className="p-6 border-t border-neutral-800 bg-neutral-950/80 space-y-3">
                  <div className="space-y-1.5 text-xs">
                    <div className="flex justify-between text-neutral-400">
                      <span>Subtotal</span>
                      <span className="text-neutral-200 font-semibold">₹{subtotal}</span>
                    </div>
                    <div className="flex justify-between text-neutral-400">
                      <span>Shipping</span>
                      <span className={shippingFee === 0 ? 'text-emerald-400 font-bold' : 'text-neutral-200 font-semibold'}>
                        {shippingFee === 0 ? 'FREE' : `₹${shippingFee}`}
                      </span>
                    </div>
                    <div className="flex justify-between text-base font-bold text-white pt-2 border-t border-neutral-800">
                      <span>Total Amount</span>
                      <span className="text-emerald-400 font-display text-xl">₹{total}</span>
                    </div>
                  </div>

                  <button
                    id="cart-proceed-checkout-btn"
                    type="button"
                    onClick={onCheckout}
                    className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl font-bold text-sm bg-emerald-500 hover:bg-emerald-400 text-neutral-950 shadow-[0_5px_20px_rgba(16,185,129,0.35)] transition-all cursor-pointer"
                  >
                    <span>Proceed to UPI Checkout</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <div className="flex items-center justify-center gap-1.5 text-[11px] text-neutral-500">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Instant UPI Payment &amp; WhatsApp Order Confirmation</span>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
