import React, { useState } from 'react';
import { Sparkles, ShieldCheck, Award, Eye, ShoppingBag, CheckCircle2, ChevronRight, Maximize2, Zap } from 'lucide-react';
import { Product, ProductVariant } from '../types';
import { PRODUCTS } from '../data/products';
import { assetUrl } from '../utils/assetUrl';
import { SafeProductImage } from './SafeProductImage';

interface TitaniumShowcaseProps {
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, variant: ProductVariant, flavor: string, quantity?: number) => void;
}

export const TitaniumShowcase: React.FC<TitaniumShowcaseProps> = ({
  onSelectProduct,
  onAddToCart,
}) => {
  const [viewMode, setViewMode] = useState<'grid-visual' | 'cards'>('grid-visual');
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Retrieve the 4 Titanium Series products
  const titaniumProducts = [
    {
      prod: PRODUCTS.find((p) => p.id === 'rnd-pro-core-whey-concentrate'),
      role: 'Top-Left (WPC)',
      title2: 'CORE WPC',
      badge: 'PREMIUM WHEY CONCENTRATE',
      image: '/rnd-whey-concentrate.svg',
      desc: 'Hormone-free dairy, retain native immunoglobulins'
    },
    {
      prod: PRODUCTS.find((p) => p.id === 'rnd-iso-pure-whey-isolate'),
      role: 'Top-Right (ISO)',
      title2: 'ISO ZERO',
      badge: '100% WHEY ISOLATE',
      image: '/rnd-whey-isolate.svg',
      desc: 'Cross-flow ceramic microfiltration, 0g lactose & carbs'
    },
    {
      prod: PRODUCTS.find((p) => p.id === 'rnd-fusion-blend-whey'),
      role: 'Bottom-Left (BLEND)',
      title2: 'DUAL BLEND',
      badge: 'WHEY ISOLATE + CONCENTRATE',
      image: '/rnd-whey-blend.svg',
      desc: 'Dual-stage sustained plasma amino acid spike'
    },
    {
      prod: PRODUCTS.find((p) => p.id === 'rnd-bio-yeast-protein'),
      role: 'Bottom-Right (YEAST)',
      title2: 'YEAST POWER',
      badge: 'PREMIUM YEAST PROTEIN',
      image: '/rnd-yeast-protein.svg',
      desc: 'Hypoallergenic bio-fermented non-dairy nutrition'
    }
  ];

  return (
    <section className="relative py-12 px-4 sm:px-6 lg:px-8 bg-neutral-900/60 border-b border-neutral-800">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-xs font-bold text-amber-400 mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>FLAGSHIP PACKAGING LINEUP</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white font-display tracking-tight flex items-center gap-3">
              <span>RND TITANIUM™ SERIES</span>
              <span className="text-xs px-2.5 py-1 rounded-full bg-amber-400 text-neutral-950 font-sans font-bold">
                50% Higher Absorption
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 mt-1 max-w-2xl">
              Precision 3D packaging architecture matching the clinical lab reference: Gunmetal titanium cylindrical tubs,
              metallic gold foil chevron ribbons, cGMP verification seals, and 28g protein per serving.
            </p>
          </div>

          {/* View Switcher Toggle */}
          <div className="flex items-center bg-neutral-950 border border-neutral-800 rounded-xl p-1 self-start lg:self-end">
            <button
              type="button"
              id="titanium-view-grid-btn"
              onClick={() => setViewMode('grid-visual')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                viewMode === 'grid-visual'
                  ? 'bg-amber-400 text-neutral-950 shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Exact 2×2 Studio Layout
            </button>
            <button
              type="button"
              id="titanium-view-cards-btn"
              onClick={() => setViewMode('cards')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                viewMode === 'cards'
                  ? 'bg-amber-400 text-neutral-950 shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Individual Pack Cards
            </button>
          </div>
        </div>

        {/* View Mode 1: Exact 2x2 Studio Grid (matching the uploaded reference picture) */}
        {viewMode === 'grid-visual' ? (
          <div className="relative rounded-3xl bg-neutral-950 border border-neutral-800/90 p-4 sm:p-8 shadow-2xl overflow-hidden">
            {/* Ambient Lighting */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/10 blur-[130px] pointer-events-none rounded-full" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 blur-[130px] pointer-events-none rounded-full" />

            {/* Top Toolbar */}
            <div className="flex items-center justify-between gap-4 mb-6 pb-4 border-b border-neutral-800/80">
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-bold text-neutral-300">
                  Interactive 4-Tub Studio Packshot • Click any tub to inspect formulation
                </span>
              </div>
              <button
                type="button"
                id="titanium-open-lightbox-btn"
                onClick={() => setIsLightboxOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-neutral-900 hover:bg-neutral-800 text-neutral-300 border border-neutral-700 transition-colors cursor-pointer"
              >
                <Maximize2 className="w-3.5 h-3.5 text-amber-400" />
                <span>Full Screen</span>
              </button>
            </div>

            {/* The 2x2 Interactive Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {titaniumProducts.map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => item.prod && onSelectProduct(item.prod)}
                  className="group relative rounded-2xl bg-gradient-to-b from-neutral-900/90 to-neutral-950 border border-neutral-800 hover:border-amber-400/50 p-6 transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/10 cursor-pointer flex flex-col items-center"
                >
                  {/* Top Tag */}
                  <div className="w-full flex items-center justify-between text-xs font-bold mb-3">
                    <span className="px-2.5 py-0.5 rounded-md bg-amber-400/10 text-amber-400 border border-amber-400/20 uppercase tracking-wider text-[10px]">
                      {item.title2}
                    </span>
                    <span className="text-[11px] text-neutral-400 group-hover:text-amber-400 flex items-center gap-1 transition-colors">
                      <Eye className="w-3.5 h-3.5" />
                      <span>Inspect</span>
                    </span>
                  </div>

                  {/* 3D Product Tub Packshot */}
                  <div className="relative w-full aspect-square max-w-[280px] flex items-center justify-center my-2">
                    <SafeProductImage
                      src={item.image}
                      alt={item.prod?.name || item.title2}
                      productName={item.prod?.name || item.title2}
                      category="Protein"
                      accentColor="#eab308"
                      className="w-full h-full object-contain filter drop-shadow-[0_15px_20px_rgba(0,0,0,0.85)] group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Tub Description Footer */}
                  <div className="w-full mt-4 pt-3 border-t border-neutral-800/80 text-center">
                    <h4 className="text-base font-black text-white group-hover:text-amber-400 transition-colors">
                      TITANIUM {item.title2}
                    </h4>
                    <p className="text-[11px] text-amber-300 font-bold uppercase tracking-wider mt-0.5">
                      {item.badge}
                    </p>
                    <p className="text-xs text-neutral-400 mt-1 line-clamp-1">
                      {item.desc}
                    </p>

                    <div className="mt-3 flex items-center justify-between pt-2 border-t border-neutral-800/50">
                      <div className="text-left">
                        <span className="text-sm font-black text-white">
                          ₹{item.prod?.variants[0]?.price?.toLocaleString('en-IN') || '0'}
                        </span>
                        {item.prod?.variants[0]?.mrp && (
                          <span className="text-[10px] text-neutral-500 line-through ml-1.5">
                            ₹{item.prod.variants[0].mrp.toLocaleString('en-IN')}
                          </span>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (item.prod && item.prod.variants[0]) {
                            onAddToCart(item.prod, item.prod.variants[0], item.prod.variants[0].flavors[0] || 'Unflavoured');
                          }
                        }}
                        className="px-3 py-1.5 rounded-lg text-xs font-bold bg-amber-400 hover:bg-amber-300 text-neutral-950 flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
                      >
                        <ShoppingBag className="w-3 h-3" />
                        <span>Add</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* View Mode 2: Detailed Product Pack Cards */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {titaniumProducts.map((item, idx) => (
              <div
                key={idx}
                onClick={() => item.prod && onSelectProduct(item.prod)}
                className="group rounded-2xl bg-neutral-950 border border-neutral-800 hover:border-neutral-700 p-5 transition-all duration-200 cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-amber-400 text-neutral-950">
                      TITANIUM
                    </span>
                    <span className="text-[11px] font-bold text-emerald-400">
                      28g Protein
                    </span>
                  </div>

                  <div className="relative aspect-square flex items-center justify-center my-2 p-2">
                    <SafeProductImage
                      src={item.image}
                      alt={item.prod?.name || item.title2}
                      productName={item.prod?.name || item.title2}
                      category="Protein"
                      accentColor="#eab308"
                      className="max-h-56 w-auto object-contain drop-shadow-[0_12px_18px_rgba(0,0,0,0.85)] group-hover:scale-105 transition-transform"
                    />
                  </div>

                  <h3 className="text-base font-black text-white group-hover:text-amber-400 transition-colors mt-2">
                    TITANIUM {item.title2}
                  </h3>
                  <p className="text-xs text-neutral-400 mt-1 line-clamp-2">
                    {item.prod?.shortDescription}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-1">
                    <span className="text-[10px] px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-neutral-300">
                      50% Higher Absorption
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-neutral-300">
                      cGMP Verified
                    </span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-neutral-800 flex items-center justify-between">
                  <div>
                    <div className="text-base font-black text-white">
                      ₹{item.prod?.variants[0]?.price?.toLocaleString('en-IN') || '0'}
                    </div>
                    {item.prod?.variants[0]?.mrp && (
                      <div className="text-[10px] text-neutral-500 line-through">
                        MRP ₹{item.prod.variants[0].mrp.toLocaleString('en-IN')}
                      </div>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (item.prod && item.prod.variants[0]) {
                        onAddToCart(item.prod, item.prod.variants[0], item.prod.variants[0].flavors[0] || 'Unflavoured');
                      }
                    }}
                    className="px-3.5 py-2 rounded-xl text-xs font-bold bg-amber-400 hover:bg-amber-300 text-neutral-950 flex items-center gap-1.5 shadow-md shadow-amber-400/20 transition-all cursor-pointer"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Buy</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Full Screen Lightbox Modal */}
      {isLightboxOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
          <div className="relative max-w-4xl w-full bg-neutral-950 border border-neutral-800 rounded-3xl p-6 shadow-2xl flex flex-col items-center">
            <button
              type="button"
              id="titanium-close-lightbox-btn"
              onClick={() => setIsLightboxOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-neutral-900 hover:bg-neutral-800 text-neutral-300 cursor-pointer"
            >
              ✕
            </button>
            <h3 className="text-xl font-black text-white mb-1">
              RND TITANIUM™ SERIES • 4-PACK MASTER REFERENCE
            </h3>
            <p className="text-xs text-neutral-400 mb-4">
              Direct rendering of the 2×2 studio packaging lineup
            </p>
            <div className="max-h-[75vh] overflow-auto flex items-center justify-center">
              <img
                src={assetUrl('/rnd-titanium-4pack-grid.svg')}
                alt="RND Titanium Series 4-Pack Grid"
                referrerPolicy="no-referrer"
                className="max-h-[70vh] w-auto object-contain rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
