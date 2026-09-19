import React, { useState, useEffect } from 'react';
import { ShoppingBag, Search, MessageSquare, Menu, X, Sparkles } from 'lucide-react';
import { BRAND_INFO } from '../data/products';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  searchQuery,
  onSearchChange,
  selectedCategory,
  onSelectCategory,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const categories = [
    { id: 'all', label: 'All Supplements' },
    { id: 'performance', label: 'Pre-Workout & Creatine' },
    { id: 'protein', label: 'Whey & Proteins' },
    { id: 'gainers', label: 'Mass Gainers' },
    { id: 'recovery', label: 'Recovery & BCAA' },
    { id: 'wellness', label: 'Vitamins & Health' },
  ];

  const handleNavCategory = (catId: string) => {
    onSelectCategory(catId);
    setMobileMenuOpen(false);
    const catalogEl = document.getElementById('catalog-section');
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToContact = () => {
    setMobileMenuOpen(false);
    const contactEl = document.getElementById('contact-section');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'py-3 bg-neutral-950/95 backdrop-blur-xl border-b border-neutral-800 shadow-2xl'
          : 'py-4 bg-neutral-950/80 backdrop-blur-md border-b border-neutral-800/60'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          {/* Brand Logo */}
          <a
            href="#"
            className="flex items-center gap-2.5 group cursor-pointer focus:outline-none"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-400 via-amber-300 to-yellow-500 p-0.5 shadow-md shadow-amber-400/25 group-hover:shadow-amber-400/40 transition-shadow">
              <div className="w-full h-full bg-neutral-950 rounded-[10px] flex items-center justify-center">
                <span className="font-display font-black text-lg tracking-wider text-amber-400">
                  RND
                </span>
              </div>
            </div>

            <div className="flex flex-col">
              <span className="font-display font-black text-lg sm:text-xl tracking-tight text-white flex items-center gap-1">
                <span>RND</span>
                <span className="text-amber-400">NUTRITION</span>
              </span>
              <span className="text-[10px] tracking-widest uppercase font-semibold text-neutral-400 -mt-1">
                Official Factory Store
              </span>
            </div>
          </a>

          {/* Desktop Navigation Category Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-neutral-900/90 p-1 rounded-xl border border-neutral-800">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleNavCategory(cat.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-amber-400 text-neutral-950 shadow-sm font-bold'
                    : 'text-neutral-300 hover:text-white hover:bg-neutral-800'
                }`}
              >
                {cat.label}
              </button>
            ))}
            <button
              type="button"
              onClick={scrollToContact}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
            >
              Support
            </button>
          </nav>

          {/* Right Controls: Search, WhatsApp Quick Link, Cart */}
          <div className="flex items-center gap-2.5">
            {/* Search Input Bar / Button */}
            <div className="relative">
              {searchOpen ? (
                <div className="flex items-center gap-1.5 bg-neutral-900 border border-neutral-700 rounded-xl px-2.5 py-1.5 shadow-lg">
                  <Search className="w-4 h-4 text-neutral-400" />
                  <input
                    type="text"
                    placeholder="Search creatine, ignition x, colossus..."
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    autoFocus
                    className="w-36 sm:w-56 bg-transparent text-xs text-white placeholder:text-neutral-500 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setSearchOpen(false);
                      onSearchChange('');
                    }}
                    className="p-1 text-neutral-400 hover:text-white"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setSearchOpen(true)}
                  className="p-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-800 transition-colors cursor-pointer"
                  title="Search catalog"
                >
                  <Search className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Direct WhatsApp Callout Pill */}
            <a
              href={`https://wa.me/${BRAND_INFO.supportWhatsappNumber}?text=${encodeURIComponent(
                'Hi RND Nutrition, I would like to order or ask a question.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-emerald-400 text-xs font-semibold transition-colors"
              title="Order on WhatsApp"
            >
              <MessageSquare className="w-3.5 h-3.5 fill-current" />
              <span>{BRAND_INFO.supportPhone}</span>
            </a>

            {/* Shopping Cart Button */}
            <button
              id="header-cart-btn"
              type="button"
              onClick={onOpenCart}
              className="relative flex items-center gap-2 px-3.5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold text-xs shadow-md shadow-amber-400/20 transition-all cursor-pointer transform active:scale-95"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden xs:inline">Cart</span>
              {cartCount > 0 && (
                <span className="px-1.5 py-0.2 rounded-full bg-neutral-950 text-amber-400 text-[11px] font-black min-w-[20px] text-center border border-amber-400/40">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl bg-neutral-900 text-neutral-300 hover:text-white lg:hidden border border-neutral-800"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="mt-4 p-4 rounded-2xl bg-neutral-900/98 border border-neutral-800 backdrop-blur-xl lg:hidden space-y-2">
            <div className="text-xs font-bold text-neutral-400 uppercase tracking-wider px-2 mb-1">
              Supplement Categories
            </div>
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleNavCategory(cat.id)}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-amber-400 text-neutral-950 font-bold'
                    : 'text-neutral-300 hover:bg-neutral-800'
                }`}
              >
                {cat.label}
              </button>
            ))}

            <div className="pt-2 border-t border-neutral-800 space-y-2">
              <button
                type="button"
                onClick={scrollToContact}
                className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-neutral-300 hover:bg-neutral-800"
              >
                Direct Support &amp; FAQ
              </button>
              <a
                href={`https://wa.me/${BRAND_INFO.supportWhatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-xs font-bold bg-emerald-500 text-neutral-950"
              >
                <MessageSquare className="w-4 h-4 fill-current" />
                <span>WhatsApp: {BRAND_INFO.supportPhone}</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
