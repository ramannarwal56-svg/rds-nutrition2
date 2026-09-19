import React, { useState } from 'react';
import { ShoppingBag, Check, Eye, MessageSquare, ShieldCheck, Flame, Award, Sparkles } from 'lucide-react';
import { Product, ProductVariant } from '../types';
import { BRAND_INFO } from '../data/products';
import { assetUrl } from '../utils/assetUrl';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, variant: ProductVariant, flavor: string, quantity: number) => void;
  onQuickView: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onQuickView,
}) => {
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(product.defaultVariantIndex);
  const currentVariant = product.variants[selectedVariantIndex] || product.variants[0];
  const [selectedFlavor, setSelectedFlavor] = useState(currentVariant.flavors[0]);
  const [isAdded, setIsAdded] = useState(false);

  // Handle variant switch
  const handleVariantChange = (index: number) => {
    setSelectedVariantIndex(index);
    const newVariant = product.variants[index];
    if (!newVariant.flavors.includes(selectedFlavor)) {
      setSelectedFlavor(newVariant.flavors[0]);
    }
  };

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product, currentVariant, selectedFlavor, 1);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1600);
  };

  // Discount calculation
  const mrp = currentVariant.mrp || Math.round(currentVariant.price * 1.4);
  const discountPercent = Math.round(((mrp - currentVariant.price) / mrp) * 100);

  // WhatsApp quick buy URL
  const whatsappBuyUrl = `https://wa.me/${BRAND_INFO.supportWhatsappNumber}?text=${encodeURIComponent(
    `Hi RND Nutrition, I would like to order:\n- Product: ${product.name}\n- Size: ${currentVariant.size}\n- Flavour: ${selectedFlavor}\n- Price: ₹${currentVariant.price}\nPlease confirm dispatch.`
  )}`;

  return (
    <div
      id={`product-card-${product.id}`}
      onClick={() => onQuickView(product)}
      className="group relative flex flex-col h-full bg-neutral-900/90 rounded-2xl border border-neutral-800 hover:border-neutral-700 shadow-lg hover:shadow-2xl hover:shadow-black/60 transition-all duration-300 overflow-hidden cursor-pointer"
    >
      {/* Top Header Tags */}
      <div className="flex items-center justify-between gap-2 p-4 pb-0 z-10">
        <span className="text-[11px] uppercase tracking-wider font-bold px-2.5 py-0.5 rounded-full bg-neutral-800 text-neutral-300 border border-neutral-700/60">
          {product.category}
        </span>
        {product.highlightBadge && (
          <span className="text-[11px] font-bold tracking-wide px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30 flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            <span>{product.highlightBadge}</span>
          </span>
        )}
      </div>

      {/* Product Packshot Image Canvas */}
      <div className="relative flex items-center justify-center p-6 bg-gradient-to-b from-neutral-800/30 to-transparent min-h-[240px]">
        {/* Subtle Ambient Radial Glow */}
        <div
          className="absolute w-40 h-40 rounded-full blur-3xl opacity-20 pointer-events-none"
          style={{ backgroundColor: product.accentColor }}
        />

        {/* Crisp Studio Image */}
        <img
          src={assetUrl(currentVariant.image || product.primaryImage)}
          alt={product.name}
          referrerPolicy="no-referrer"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = assetUrl('/rnd-cre-amp.svg');
          }}
          className="max-h-56 w-auto object-contain transition-transform duration-300 group-hover:scale-105 drop-shadow-[0_15px_20px_rgba(0,0,0,0.8)]"
        />

        {/* Quick View Button on Hover */}
        <div className="absolute inset-x-0 bottom-2 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            id={`quick-view-btn-${product.id}`}
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-neutral-900/95 hover:bg-neutral-800 text-neutral-100 border border-neutral-600 shadow-xl cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5 text-amber-400" />
            <span>Clinical Facts</span>
          </button>
        </div>
      </div>

      {/* Product Content Details */}
      <div className="flex-1 flex flex-col p-5 pt-2">
        {/* Brand line & Title */}
        {product.brandLine && (
          <span className="text-xs font-black tracking-wider text-amber-400 uppercase mb-0.5">
            {product.brandLine}
          </span>
        )}
        <h3 className="text-base sm:text-lg font-black text-neutral-100 group-hover:text-amber-400 transition-colors line-clamp-1 leading-snug">
          {product.name}
        </h3>
        <p className="text-xs text-neutral-400 mt-1 line-clamp-2 leading-relaxed">
          {product.shortDescription}
        </p>

        {/* Clinical Highlights Strip */}
        {product.clinicalHighlights && product.clinicalHighlights.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1">
            {product.clinicalHighlights.slice(0, 2).map((highlight, idx) => (
              <span
                key={idx}
                className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-neutral-800/90 text-neutral-300 border border-neutral-700/60"
              >
                {highlight}
              </span>
            ))}
          </div>
        )}

        {/* Size / Variant Tabs */}
        {product.variants.length > 1 && (
          <div className="mt-3" onClick={(e) => e.stopPropagation()}>
            <span className="text-[11px] font-semibold text-neutral-400 block mb-1.5">
              Select Size:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {product.variants.map((v, idx) => (
                <button
                  key={v.id}
                  id={`variant-btn-${product.id}-${v.id}`}
                  type="button"
                  onClick={() => handleVariantChange(idx)}
                  className={`px-2.5 py-1 text-xs rounded-lg font-bold transition-all cursor-pointer ${
                    selectedVariantIndex === idx
                      ? 'bg-amber-400 text-neutral-950 shadow-md shadow-amber-400/20'
                      : 'bg-neutral-800 hover:bg-neutral-700 text-neutral-300 border border-neutral-700/60'
                  }`}
                >
                  {v.size}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Flavor Selector */}
        {currentVariant.flavors.length > 0 && currentVariant.flavors[0] !== 'Unflavoured' && (
          <div className="mt-3" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between text-[11px] text-neutral-400 mb-1.5">
              <span>Flavour:</span>
              <strong className="text-neutral-200">{selectedFlavor}</strong>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {currentVariant.flavors.map((flavor) => (
                <button
                  key={flavor}
                  id={`flavor-btn-${product.id}-${flavor.toLowerCase().replace(/\s+/g, '-')}`}
                  type="button"
                  onClick={() => setSelectedFlavor(flavor)}
                  className={`px-2 py-0.5 text-[11px] rounded-md font-semibold transition-all cursor-pointer ${
                    selectedFlavor === flavor
                      ? 'bg-neutral-200 text-neutral-950 font-bold'
                      : 'bg-neutral-800/80 hover:bg-neutral-700 text-neutral-400 border border-neutral-700/50'
                  }`}
                >
                  {flavor}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Pricing & Servings Info */}
        <div className="mt-4 pt-3 border-t border-neutral-800/80 flex items-baseline justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-white tracking-tight">
              ₹{currentVariant.price.toLocaleString('en-IN')}
            </span>
            <span className="text-xs text-neutral-500 line-through">
              ₹{mrp.toLocaleString('en-IN')}
            </span>
            <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
              {discountPercent}% OFF
            </span>
          </div>

          {currentVariant.servings && (
            <span className="text-[11px] text-neutral-400 font-medium">
              {currentVariant.servings}
            </span>
          )}
        </div>

        {/* Action Controls */}
        <div className="mt-4 grid grid-cols-5 gap-2" onClick={(e) => e.stopPropagation()}>
          <button
            id={`add-to-cart-btn-${product.id}`}
            type="button"
            onClick={handleAdd}
            className={`col-span-4 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              isAdded
                ? 'bg-emerald-500 text-neutral-950 shadow-md shadow-emerald-500/20'
                : 'bg-amber-400 hover:bg-amber-300 text-neutral-950 shadow-lg shadow-amber-400/20 active:scale-[0.98]'
            }`}
          >
            {isAdded ? (
              <>
                <Check className="w-4 h-4 stroke-[3]" />
                <span>Added to Cart!</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Cart</span>
              </>
            )}
          </button>

          <a
            id={`whatsapp-order-btn-${product.id}`}
            href={whatsappBuyUrl}
            target="_blank"
            rel="noopener noreferrer"
            title="Order directly on WhatsApp"
            className="col-span-1 flex items-center justify-center p-2 rounded-xl bg-neutral-800 hover:bg-emerald-600/20 text-emerald-400 border border-neutral-700 hover:border-emerald-500/40 transition-colors cursor-pointer"
          >
            <MessageSquare className="w-4 h-4 fill-current" />
          </a>
        </div>
      </div>
    </div>
  );
};
