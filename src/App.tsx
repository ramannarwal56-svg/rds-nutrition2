import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  ShieldCheck,
  Zap,
  Filter,
  Flame,
  Award,
  Truck,
  RotateCcw,
  Clock,
  ArrowUpDown,
  Search,
  CheckCircle2,
  Phone,
  MessageSquare
} from 'lucide-react';
import { PRODUCTS, BRAND_INFO } from './data/products';
import { Product, ProductVariant, CartItem, PlacedOrder } from './types';
import { Navbar } from './components/Navbar';
import { Hero3D } from './components/Hero3D';
import { ProductCard } from './components/ProductCard';
import { ProductQuickViewModal } from './components/ProductQuickViewModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderSuccessModal } from './components/OrderSuccessModal';
import { FloatingWhatsAppWidget } from './components/FloatingWhatsAppWidget';
import { ContactSection } from './components/ContactSection';
import { assetUrl } from './utils/assetUrl';

export default function App() {
  // Cart state with localStorage persistence
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('rnd_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // UI state
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [placedOrder, setPlacedOrder] = useState<PlacedOrder | null>(null);

  // Filters and sorting
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high'>('featured');

  // Save cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('rnd_cart', JSON.stringify(cartItems));
    } catch {
      // ignore
    }
  }, [cartItems]);

  // Cart operations
  const handleAddToCart = (
    product: Product,
    variant: ProductVariant,
    flavor: string,
    quantity: number = 1
  ) => {
    const itemId = `${product.id}-${variant.size}-${flavor}`;
    setCartItems((prev) => {
      const existingIndex = prev.findIndex((item) => item.id === itemId);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      }
      return [
        ...prev,
        {
          id: itemId,
          productId: product.id,
          productName: product.name,
          image: product.primaryImage,
          size: variant.size,
          flavor,
          price: variant.price,
          quantity,
        },
      ];
    });
  };

  const handleUpdateQuantity = (id: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(id);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: newQty } : item))
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleOrderCompleted = (order: PlacedOrder) => {
    setPlacedOrder(order);
    setCartItems([]);
    setIsCheckoutOpen(false);
    setIsCartOpen(false);
  };

  // Filtered & Sorted Products
  const filteredProducts = PRODUCTS.filter((product) => {
    const matchesCategory =
      selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (product.brandLine && product.brandLine.toLowerCase().includes(searchQuery.toLowerCase())) ||
      product.variants.some((v) =>
        v.flavors.some((f) => f.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    return matchesCategory && matchesSearch;
  }).sort((a, b) => {
    const priceA = a.variants[0].price;
    const priceB = b.variants[0].price;
    if (sortBy === 'price-low') return priceA - priceB;
    if (sortBy === 'price-high') return priceB - priceA;
    return 0;
  });

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const scrollToCatalog = () => {
    const el = document.getElementById('catalog-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen text-neutral-100 bg-neutral-950 selection:bg-amber-400/30 selection:text-amber-300">
      {/* Navigation */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      {/* Hero Showcase with Flagship Jars */}
      <Hero3D
        onExploreClick={scrollToCatalog}
        onSelectProduct={(product) => setQuickViewProduct(product)}
      />

      {/* Value Pillars Strip */}
      <section className="relative py-6 px-4 sm:px-6 lg:px-8 border-b border-neutral-800 bg-neutral-900/50">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-neutral-900 border border-neutral-800">
            <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Trustified Certified</h4>
              <p className="text-[11px] text-neutral-400">100% Lab Tested Purity</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-neutral-900 border border-neutral-800">
            <div className="p-2.5 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Instant UPI QR</h4>
              <p className="text-[11px] text-neutral-400">Zero Gateway Surcharges</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-neutral-900 border border-neutral-800">
            <div className="p-2.5 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Free Delivery</h4>
              <p className="text-[11px] text-neutral-400">On all orders above ₹999</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-neutral-900 border border-neutral-800">
            <div className="p-2.5 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">WhatsApp Dispatch</h4>
              <p className="text-[11px] text-neutral-400">Direct Tracking Support</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Catalog Section */}
      <section id="catalog-section" className="relative py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Section Heading & Category Tabs */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-xs font-bold text-amber-400 mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>COMPLETE PRODUCT CATALOG</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-white font-display tracking-tight">
                RND Sports Supplements Line
              </h2>
              <p className="text-xs sm:text-sm text-neutral-400 mt-1 max-w-xl">
                Authentic factory-direct formulations with transparent clinical dosages, zero proprietary blends,
                and direct UPI / WhatsApp ordering.
              </p>
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-3 self-start md:self-end">
              <div className="flex items-center gap-2 bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-neutral-300">
                <ArrowUpDown className="w-3.5 h-3.5 text-neutral-400" />
                <span className="text-neutral-400">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-transparent text-white font-semibold focus:outline-none cursor-pointer"
                >
                  <option value="featured" className="bg-neutral-900">Featured</option>
                  <option value="price-low" className="bg-neutral-900">Price: Low to High</option>
                  <option value="price-high" className="bg-neutral-900">Price: High to Low</option>
                </select>
              </div>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 mb-8">
            {[
              { id: 'all', label: 'All Supplements' },
              { id: 'performance', label: 'Pre-Workout & Creatine' },
              { id: 'protein', label: 'Whey & Vegan Proteins' },
              { id: 'gainers', label: 'Mass Gainers' },
              { id: 'recovery', label: 'BCAA & Glutamine' },
              { id: 'wellness', label: 'Vitamins & Health' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                id={`catalog-tab-${tab.id}`}
                onClick={() => setSelectedCategory(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedCategory === tab.id
                    ? 'bg-amber-400 text-neutral-950 shadow-md shadow-amber-400/25 scale-105'
                    : 'bg-neutral-900 text-neutral-300 hover:text-white hover:bg-neutral-800 border border-neutral-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Active Search Notification */}
          {searchQuery && (
            <div className="mb-6 flex items-center justify-between p-3 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-neutral-300">
              <span>Showing results for "{searchQuery}"</span>
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="text-amber-400 font-semibold hover:underline cursor-pointer"
              >
                Clear Search
              </button>
            </div>
          )}

          {/* Products Grid */}
          {filteredProducts.length === 0 ? (
            <div className="py-20 text-center text-neutral-400">
              <Search className="w-10 h-10 mx-auto mb-3 text-neutral-600" />
              <h3 className="text-base font-bold text-neutral-200">No supplements matched your criteria</h3>
              <p className="text-xs text-neutral-400 mt-1">Try clearing your search query or selecting another category.</p>
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory('all');
                  setSearchQuery('');
                }}
                className="mt-4 px-4 py-2 rounded-xl text-xs font-bold bg-neutral-800 hover:bg-neutral-700 text-white cursor-pointer"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 sm:gap-8">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                  onQuickView={(p) => setQuickViewProduct(p)}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* RND Manufacturing & Clinical Promise Section */}
      <section className="relative py-16 px-4 sm:px-6 lg:px-8 border-t border-neutral-800 bg-neutral-900/40">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 flex flex-col items-center justify-center p-8 rounded-3xl bg-neutral-950 border border-neutral-800 shadow-2xl">
            <img
              src={assetUrl('/rnd-ignition-x.svg')}
              alt="RND Ignition X Pre-Workout Packaging"
              referrerPolicy="no-referrer"
              className="max-h-64 w-auto object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.9)]"
            />
            <div className="mt-4 text-center">
              <strong className="block text-white text-base font-bold">100% Clinical Dosing</strong>
              <span className="text-neutral-400 text-xs">
                6000mg Citrulline Malate • 3200mg Beta-Alanine • 300mg Caffeine
              </span>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-5">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block">
              The RND Precision Commitment
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white font-display">
              Built for Athletes Who Demand Results
            </h2>
            <p className="text-sm text-neutral-300 leading-relaxed">
              Every RND Nutrition supplement is formulated to clinical specifications. We reject proprietary blends
              that hide underdosed ingredients. With certified 200-mesh micronization, Trustified purity testing, and
              bio-fermented vegan aminos, you receive exactly what is printed on the label.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3 text-xs text-neutral-300">
                <div className="p-1 rounded bg-amber-500/10 text-amber-400 mt-0.5">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <strong className="text-white block font-bold">Zero Proprietary Blends</strong>
                  <span className="text-neutral-400">Complete label transparency with exact milligram counts for every active ingredient.</span>
                </div>
              </div>

              <div className="flex items-start gap-3 text-xs text-neutral-300">
                <div className="p-1 rounded bg-amber-500/10 text-amber-400 mt-0.5">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <strong className="text-white block font-bold">Trustified &amp; FSSAI Certified</strong>
                  <span className="text-neutral-400">Stringently tested for zero heavy metals, zero banned substances, and zero amino spiking.</span>
                </div>
              </div>

              <div className="flex items-start gap-3 text-xs text-neutral-300">
                <div className="p-1 rounded bg-amber-500/10 text-amber-400 mt-0.5">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <strong className="text-white block font-bold">Direct Factory Ordering ({BRAND_INFO.supportPhone})</strong>
                  <span className="text-neutral-400">Bypass retail markups with instant UPI checkout and dedicated WhatsApp dispatch.</span>
                </div>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap gap-4">
              <button
                type="button"
                onClick={scrollToCatalog}
                className="px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider bg-amber-400 hover:bg-amber-300 text-neutral-950 shadow-md shadow-amber-400/20 cursor-pointer transition-colors"
              >
                Shop Full Catalog
              </button>

              <a
                href={`https://wa.me/${BRAND_INFO.supportWhatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-xs bg-neutral-900 hover:bg-neutral-800 text-neutral-200 border border-neutral-700 transition-colors"
              >
                <MessageSquare className="w-4 h-4 text-emerald-400 fill-current" />
                <span>Chat with Nutrition Specialist</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Support & Contact Section */}
      <ContactSection />

      {/* Sticky / Floating WhatsApp Chat Widget */}
      <FloatingWhatsAppWidget />

      {/* Cart Drawer Slide-over */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      {/* Checkout Modal with UPI QR & WhatsApp Click-to-Chat */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        onOrderCompleted={handleOrderCompleted}
      />

      {/* Order Success Celebration Modal */}
      <OrderSuccessModal
        order={placedOrder}
        onClose={() => setPlacedOrder(null)}
      />

      {/* Product Quick View Modal */}
      <ProductQuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
      />
    </div>
  );
}
