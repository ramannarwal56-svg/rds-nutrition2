import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Check, ShoppingBag, ShieldCheck, Zap, Award, Sparkles, MessageSquare } from 'lucide-react';
import { Product, ProductVariant } from '../types';
import { BRAND_INFO } from '../data/products';
import { assetUrl } from '../utils/assetUrl';

interface ProductQuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, variant: ProductVariant, flavor: string, quantity: number) => void;
}

export const ProductQuickViewModal: React.FC<ProductQuickViewModalProps> = ({
  product,
  onClose,
  onAddToCart,
}) => {
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [selectedFlavor, setSelectedFlavor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    if (product) {
      const defaultIdx = product.defaultVariantIndex || 0;
      setSelectedVariantIndex(defaultIdx);
      const variant = product.variants[defaultIdx] || product.variants[0];
      setSelectedFlavor(variant ? variant.flavors[0] : '');
      setQuantity(1);
      setIsAdded(false);
    }
  }, [product?.id]);

  const currentVariant = product
    ? product.variants[selectedVariantIndex] || product.variants[0]
    : null;

  const handleVariantChange = (index: number) => {
    if (!product) return;
    setSelectedVariantIndex(index);
    const newVariant = product.variants[index];
    if (newVariant && !newVariant.flavors.includes(selectedFlavor)) {
      setSelectedFlavor(newVariant.flavors[0]);
    }
  };

  const handleAddToCart = () => {
    if (!product || !currentVariant) return;
    onAddToCart(product, currentVariant, selectedFlavor, quantity);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      onClose();
    }, 1200);
  };

  const mrp = currentVariant ? (currentVariant.mrp || Math.round(currentVariant.price * 1.4)) : 0;
  const discountPercent = currentVariant ? Math.round(((mrp - currentVariant.price) / mrp) * 100) : 0;

  const whatsappDirectOrderUrl = product && currentVariant ? `https://wa.me/${BRAND_INFO.supportWhatsappNumber}?text=${encodeURIComponent(
    `Hi RND Nutrition, I want to order:\n- Product: ${product.name}\n- Size: ${currentVariant.size}\n- Flavour: ${selectedFlavor}\n- Quantity: ${quantity}\n- Total: ₹${currentVariant.price * quantity}\nPlease confirm availability and payment details.`
  )}` : '';

  return (
    <AnimatePresence>
      {product && currentVariant && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/85 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-4xl rounded-3xl bg-neutral-900 border border-neutral-700 shadow-2xl overflow-hidden z-10 my-8"
          >
          {/* Close button */}
          <button
            id="close-quickview-btn"
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-neutral-800 text-neutral-400 hover:text-white hover:bg-neutral-700 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-6 sm:p-8">
            {/* Left: Product Packshot View */}
            <div className="md:col-span-5 flex flex-col items-center justify-center rounded-2xl bg-neutral-950 border border-neutral-800 p-6 relative overflow-hidden">
              <div className="absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30">
                <Sparkles className="w-3 h-3" />
                <span>AUTHENTIC RND BOTTLE</span>
              </div>

              {/* Ambient Glow */}
              <div
                className="absolute w-44 h-44 rounded-full blur-3xl opacity-20 pointer-events-none"
                style={{ backgroundColor: product.accentColor }}
              />

              <img
                src={assetUrl(currentVariant?.image || product.primaryImage)}
                alt={product.name}
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = assetUrl('/rnd-cre-amp.svg');
                }}
                className="max-h-72 w-auto object-contain my-4 drop-shadow-[0_20px_25px_rgba(0,0,0,0.9)]"
              />

              {product.certifiedBadges && (
                <div className="flex flex-wrap items-center justify-center gap-1.5 mt-2">
                  {product.certifiedBadges.map((badge, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-neutral-900 text-neutral-300 border border-neutral-800"
                    >
                      ✓ {badge}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Product Details & Variant Selectors */}
            <div className="md:col-span-7 flex flex-col">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-neutral-800 text-amber-400 border border-neutral-700">
                  {product.category}
                </span>
                {product.highlightBadge && (
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-400 text-neutral-950">
                    {product.highlightBadge}
                  </span>
                )}
              </div>

              {product.brandLine && (
                <span className="text-xs font-black text-amber-400 uppercase tracking-wider">
                  {product.brandLine}
                </span>
              )}

              <h2 className="text-2xl sm:text-3xl font-black text-white font-display">
                {product.name}
              </h2>
              <p className="text-sm text-neutral-300 mt-2 leading-relaxed">
                {product.fullDescription}
              </p>

              {/* Clinical Dosage Callout */}
              {product.nutritionFacts.clinicalDose && (
                <div className="mt-3 p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs font-bold text-amber-300 flex items-center gap-2">
                  <Zap className="w-4 h-4 flex-shrink-0 text-amber-400" />
                  <span>Clinical Dose: {product.nutritionFacts.clinicalDose}</span>
                </div>
              )}

              {/* Formulation Highlights */}
              <div className="mt-4 space-y-1.5">
                <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-wider">
                  Highlights &amp; Benefits
                </h4>
                {product.benefits.map((b, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-neutral-300">
                    <Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                    <span>{b}</span>
                  </div>
                ))}
              </div>

              {/* Nutrition Facts Table */}
              <div className="mt-4 p-3 rounded-xl bg-neutral-950 border border-neutral-800">
                <div className="flex items-center justify-between text-xs font-semibold text-neutral-300 border-b border-neutral-800 pb-1.5 mb-2">
                  <span>Serving Size: {product.nutritionFacts.servingSize}</span>
                  <span className="text-emerald-400 font-bold">100% Lab Tested</span>
                </div>
                <div className="grid grid-cols-4 gap-2 text-center text-xs">
                  {product.nutritionFacts.protein && (
                    <div className="p-1.5 rounded bg-neutral-900">
                      <span className="text-neutral-400 block text-[10px]">Protein</span>
                      <span className="font-bold text-white">{product.nutritionFacts.protein}</span>
                    </div>
                  )}
                  {product.nutritionFacts.bcaa && (
                    <div className="p-1.5 rounded bg-neutral-900">
                      <span className="text-neutral-400 block text-[10px]">BCAAs</span>
                      <span className="font-bold text-white">{product.nutritionFacts.bcaa}</span>
                    </div>
                  )}
                  {product.nutritionFacts.calories && (
                    <div className="p-1.5 rounded bg-neutral-900">
                      <span className="text-neutral-400 block text-[10px]">Energy</span>
                      <span className="font-bold text-white">{product.nutritionFacts.calories}</span>
                    </div>
                  )}
                  {product.nutritionFacts.carbs && (
                    <div className="p-1.5 rounded bg-neutral-900">
                      <span className="text-neutral-400 block text-[10px]">Carbs</span>
                      <span className="font-bold text-white">{product.nutritionFacts.carbs}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Size Selector */}
              <div className="mt-4">
                <label className="text-xs font-bold text-neutral-300 uppercase tracking-wider block mb-1.5">
                  Package Size:
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.variants.map((v, i) => (
                    <button
                      key={v.id}
                      type="button"
                      onClick={() => handleVariantChange(i)}
                      className={`px-3 py-1.5 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                        selectedVariantIndex === i
                          ? 'bg-amber-400 text-neutral-950 border-amber-400 shadow-md shadow-amber-400/20'
                          : 'bg-neutral-800 text-neutral-300 border-neutral-700 hover:text-white'
                      }`}
                    >
                      {v.size} — ₹{v.price}
                    </button>
                  ))}
                </div>
              </div>

              {/* Flavor Selector */}
              {currentVariant.flavors.length > 0 && currentVariant.flavors[0] !== 'Unflavoured' && (
                <div className="mt-3">
                  <label className="text-xs font-bold text-neutral-300 uppercase tracking-wider block mb-1.5">
                    Flavour:
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {currentVariant.flavors.map((flavor) => (
                      <button
                        key={flavor}
                        type="button"
                        onClick={() => setSelectedFlavor(flavor)}
                        className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                          selectedFlavor === flavor
                            ? 'bg-white text-neutral-950 font-bold border-white'
                            : 'bg-neutral-800 text-neutral-400 border-neutral-700 hover:text-white'
                        }`}
                      >
                        {flavor}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Price, Quantity, & Add to Cart Action */}
              <div className="mt-6 pt-4 border-t border-neutral-800 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-black text-white font-display">
                      ₹{(currentVariant.price * quantity).toLocaleString('en-IN')}
                    </span>
                    <span className="text-xs text-neutral-500 line-through">
                      ₹{(mrp * quantity).toLocaleString('en-IN')}
                    </span>
                    <span className="text-xs font-bold text-emerald-400">
                      {discountPercent}% OFF
                    </span>
                  </div>
                  {currentVariant.servings && (
                    <span className="text-xs text-neutral-400">{currentVariant.servings}</span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  {/* Quantity */}
                  <div className="flex items-center border border-neutral-700 rounded-xl bg-neutral-800">
                    <button
                      type="button"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-2 text-sm font-bold text-neutral-300 hover:text-white cursor-pointer"
                    >
                      -
                    </button>
                    <span className="px-2 text-sm font-bold text-white">{quantity}</span>
                    <button
                      type="button"
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3 py-2 text-sm font-bold text-neutral-300 hover:text-white cursor-pointer"
                    >
                      +
                    </button>
                  </div>

                  <button
                    id="quickview-add-to-cart"
                    type="button"
                    onClick={handleAddToCart}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm bg-amber-400 hover:bg-amber-300 text-neutral-950 shadow-md shadow-amber-400/20 transition-all cursor-pointer"
                  >
                    {isAdded ? (
                      <>
                        <Check className="w-4 h-4 stroke-[3]" />
                        <span>Added!</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4" />
                        <span>Add to Cart</span>
                      </>
                    )}
                  </button>

                  <a
                    href={whatsappDirectOrderUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Order directly via WhatsApp"
                    className="flex items-center justify-center p-2.5 rounded-xl bg-neutral-800 hover:bg-emerald-600/20 text-emerald-400 border border-neutral-700 hover:border-emerald-500/40 transition-colors cursor-pointer"
                  >
                    <MessageSquare className="w-4 h-4 fill-current" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    )}
  </AnimatePresence>
);
};
