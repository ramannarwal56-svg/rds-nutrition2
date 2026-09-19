import React, { useState } from 'react';
import { ShieldCheck, Zap, Award, Sparkles, ArrowRight, MessageSquare, Flame, CheckCircle2, ChevronRight } from 'lucide-react';
import { BRAND_INFO, PRODUCTS } from '../data/products';
import { Product } from '../types';
import { assetUrl } from '../utils/assetUrl';
import { SafeProductImage } from './SafeProductImage';

interface Hero3DProps {
  onExploreClick: () => void;
  onSelectProduct?: (product: Product) => void;
}

export const Hero3D: React.FC<Hero3DProps> = ({ onExploreClick, onSelectProduct }) => {
  // Flagship showcase items including the Titanium Series from the user's reference packaging
  const flagshipItems = [
    {
      id: 'titanium-iso',
      tag: '50% HIGHER ABSORPTION',
      title: 'TITANIUM ISO ZERO™ 100% Whey Isolate',
      subtitle: 'Pure Cross-Flow Microfiltered Isolate 1 kg (2.2 lb)',
      image: '/rnd-whey-isolate.svg',
      dose: '28g Protein Per Serve • 0g Lactose • cGMP',
      price: '₹3,000',
      mrp: '₹4,499',
      productId: 'rnd-iso-pure-whey-isolate',
      color: '#f59e0b'
    },
    {
      id: 'titanium-wpc',
      tag: '50% HIGHER ABSORPTION',
      title: 'TITANIUM CORE WPC™ Whey Concentrate',
      subtitle: 'Premium Bioavailable Whey Concentrate 1 kg (2.2 lb)',
      image: '/rnd-whey-concentrate.svg',
      dose: '28g Protein Per Serve • Rich Milkshake Flavor',
      price: '₹1,900',
      mrp: '₹2,899',
      productId: 'rnd-pro-core-whey-concentrate',
      color: '#d97706'
    },
    {
      id: 'titanium-blend',
      tag: '50% HIGHER ABSORPTION',
      title: 'TITANIUM DUAL BLEND™ Isolate + WPC',
      subtitle: 'Dual-Stage Sustained Absorption Matrix 1 kg (2.2 lb)',
      image: '/rnd-whey-blend.svg',
      dose: '28g Protein Per Serve • Dual-Stage Digestion',
      price: '₹3,400',
      mrp: '₹4,999',
      productId: 'rnd-fusion-blend-whey',
      color: '#eab308'
    },
    {
      id: 'titanium-yeast',
      tag: 'BIO-FERMENTED CLEAN',
      title: 'TITANIUM YEAST POWER™ Yeast Protein',
      subtitle: 'Hypoallergenic Dairy-Free Yeast Protein 1 kg (2.2 lb)',
      image: '/rnd-yeast-protein.svg',
      dose: '28g Protein Per Serve • 100% Non-Dairy • Zero Bloat',
      price: '₹1,500',
      mrp: '₹2,499',
      productId: 'rnd-bio-yeast-protein',
      color: '#ca8a04'
    },
    {
      id: 'cre-amp',
      tag: 'TRUSTIFIED CERTIFIED',
      title: 'CRE AMP™ Micronised Creatine',
      subtitle: '100% Pure Creatine Monohydrate 250g',
      image: '/rnd-cre-amp.svg',
      dose: '3g Micronized Creatine • 0 Carbs',
      price: '₹899',
      mrp: '₹1,499',
      productId: 'rnd-cre-amp-creatine',
      color: '#10b981'
    },
    {
      id: 'ignition-x',
      tag: '100% CLINICAL DOSE',
      title: 'IGNITION X™ Extreme Pre-Workout',
      subtitle: 'Advanced Performance Formula 300g (38 Servings)',
      image: '/rnd-ignition-x.svg',
      dose: '6000mg Citrulline • 3200mg Beta-Alanine • 300mg Caffeine',
      price: '₹1,499',
      mrp: '₹2,999',
      productId: 'rnd-ignition-x-pre-workout',
      color: '#f59e0b'
    }
  ];

  const [activeTab, setActiveTab] = useState(0);
  const activeProduct = flagshipItems[activeTab];

  const handleShowcaseClick = () => {
    if (onSelectProduct) {
      const found = PRODUCTS.find((p) => p.id === activeProduct.productId);
      if (found) {
        onSelectProduct(found);
        return;
      }
    }
    onExploreClick();
  };

  return (
    <section className="relative pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden bg-neutral-950 border-b border-neutral-800/80">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-amber-500/10 blur-[130px] pointer-events-none rounded-full" />
      <div className="absolute top-10 right-10 w-96 h-96 bg-emerald-500/10 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto">
        {/* Main Grid: Left Headline & Right Showcase Jar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Headlines & Brand Credentials */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Top Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30 text-xs font-bold tracking-wide">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>OFFICIAL RND NUTRITION STORE</span>
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              <span className="text-neutral-300 font-medium">Direct From Lab</span>
            </div>

            {/* Display Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white font-display tracking-tight leading-[1.1]">
              CLINICAL SPORTS NUTRITION.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-500">
                ZERO COMPROMISES.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-neutral-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Engineered with 100% clinical dosages, pharmaceutical-grade micronised aminos, and 
              Trustified Certified purity. From our explosive <strong className="text-white">IGNITION X</strong> pre-workout 
              to ultra-filtered <strong className="text-white">CRE AMP</strong> creatine and high-calorie <strong className="text-white">COLOSSUS</strong> mass gainer.
            </p>

            {/* Action CTAs */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                id="hero-explore-btn"
                type="button"
                onClick={onExploreClick}
                className="flex items-center gap-2.5 px-7 py-3.5 rounded-xl font-bold text-sm bg-amber-400 hover:bg-amber-300 text-neutral-950 shadow-lg shadow-amber-400/25 transition-all cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>Browse Product Catalog</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>

              <a
                id="hero-whatsapp-btn"
                href={`https://wa.me/${BRAND_INFO.supportWhatsappNumber}?text=${encodeURIComponent(
                  'Hi RND Nutrition, I want to inquire about your product catalog and supplements.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-semibold text-sm bg-neutral-900 hover:bg-neutral-800 text-neutral-200 border border-neutral-700 hover:border-neutral-600 transition-all cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 text-emerald-400 fill-current" />
                <span>WhatsApp Order ({BRAND_INFO.supportPhone})</span>
              </a>
            </div>

            {/* Quality Seals */}
            <div className="grid grid-cols-3 gap-3 pt-6 border-t border-neutral-800 text-left">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div className="text-xs">
                  <strong className="block text-white font-bold">Trustified Certified</strong>
                  <span className="text-neutral-400 text-[11px]">Lab Tested Pure</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  <Flame className="w-4 h-4" />
                </div>
                <div className="text-xs">
                  <strong className="block text-white font-bold">100% Clinical Dose</strong>
                  <span className="text-neutral-400 text-[11px]">No Hidden Blends</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  <Zap className="w-4 h-4" />
                </div>
                <div className="text-xs">
                  <strong className="block text-white font-bold">Instant UPI QR</strong>
                  <span className="text-neutral-400 text-[11px]">Direct Dispatch</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Featured RND Supplement Showcase */}
          <div className="lg:col-span-5 flex flex-col items-center">
            {/* Interactive Showcase Card */}
            <div 
              onClick={handleShowcaseClick}
              className="relative w-full max-w-md bg-neutral-900/95 border border-neutral-800 hover:border-neutral-700 rounded-3xl p-6 sm:p-7 shadow-2xl shadow-black/80 transition-all cursor-pointer group"
            >
              {/* Product Badge Pill */}
              <div className="flex items-center justify-between gap-2 mb-4">
                <span className="text-xs font-black tracking-wider uppercase px-3 py-1 rounded-full bg-amber-400 text-neutral-950 font-display">
                  {activeProduct.tag}
                </span>
                <span className="text-xs font-bold text-neutral-400 flex items-center gap-1 group-hover:text-amber-400 transition-colors">
                  <span>View Details</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>

              {/* Product Studio Packshot */}
              <div className="relative flex items-center justify-center min-h-[260px] my-2">
                <div
                  className="absolute w-44 h-44 rounded-full blur-3xl opacity-25 pointer-events-none"
                  style={{ backgroundColor: activeProduct.color }}
                />
                <SafeProductImage
                  src={activeProduct.image}
                  alt={activeProduct.title}
                  productName={activeProduct.title}
                  category={activeProduct.tag}
                  accentColor={activeProduct.color}
                  className="max-h-64 w-auto object-contain transition-transform duration-300 group-hover:scale-105 drop-shadow-[0_20px_25px_rgba(0,0,0,0.9)]"
                />
              </div>

              {/* Product Info Banner */}
              <div className="mt-4 pt-4 border-t border-neutral-800">
                <h3 className="text-xl font-black text-white group-hover:text-amber-400 transition-colors">
                  {activeProduct.title}
                </h3>
                <p className="text-xs text-neutral-400 mt-0.5">
                  {activeProduct.subtitle}
                </p>

                {/* Key Dose Spec */}
                <div className="mt-3 py-1.5 px-3 rounded-lg bg-neutral-950/80 border border-neutral-800 text-xs font-semibold text-neutral-300">
                  ⚡ {activeProduct.dose}
                </div>

                {/* Price Line */}
                <div className="mt-3 flex items-baseline justify-between">
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-black text-white">
                      {activeProduct.price}
                    </span>
                    <span className="text-xs text-neutral-500 line-through">
                      MRP {activeProduct.mrp}
                    </span>
                  </div>
                  <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    Direct Deal
                  </span>
                </div>
              </div>
            </div>

            {/* Tab Selectors for the 4 Reference Jars */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
              {flagshipItems.map((item, idx) => (
                <button
                  key={item.id}
                  id={`hero-tab-${item.id}`}
                  type="button"
                  onClick={() => setActiveTab(idx)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    activeTab === idx
                      ? 'bg-amber-400 text-neutral-950 shadow-md shadow-amber-400/25 scale-105'
                      : 'bg-neutral-900 hover:bg-neutral-800 text-neutral-400 border border-neutral-800'
                  }`}
                >
                  {item.title.split(' ')[0]} {item.title.split(' ')[1]}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
