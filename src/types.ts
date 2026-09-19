export interface ProductVariant {
  id: string;
  size: string; // e.g. "1 kg", "3 kg", "100 g", "250 g", "300 g", "60 Tablets"
  price: number; // in INR (₹)
  mrp?: number; // original list price for discount calculation
  servings?: string; // e.g. "38 Servings", "30 Servings", "60 Tablets"
  flavors: string[]; // e.g. ["Fruit Punch", "Chocolate", "Vanilla", "Unflavoured"]
}

export interface Product {
  id: string;
  name: string;
  brandLine?: string; // e.g. "RND CRE AMP™", "RND IGNITION X™", "RND COLOSSUS™", "RND ALPHA SHIELD™"
  category: 'protein' | 'gainers' | 'performance' | 'recovery' | 'wellness';
  shortDescription: string;
  fullDescription: string;
  primaryImage: string;
  alternateImages?: string[];
  variants: ProductVariant[];
  defaultVariantIndex: number;
  highlightBadge?: string;
  clinicalHighlights?: string[]; // e.g. ["6000mg Citrulline Malate", "3200mg Beta-Alanine", "300mg Caffeine"]
  certifiedBadges?: string[]; // e.g. ["Trustified Certified", "100% Clinical Dose", "Biozyme Formula"]
  benefits: string[];
  nutritionFacts: {
    servingSize: string;
    protein?: string;
    bcaa?: string;
    calories?: string;
    carbs?: string;
    fats?: string;
    clinicalDose?: string;
    ingredientsCount?: string;
  };
  accentColor: string; // e.g. '#10b981' for emerald, '#f59e0b' for gold, '#06b6d4' for cyan
}

export interface CartItem {
  id: string; // unique item id: `${product.id}-${variant.size}-${flavor}`
  productId: string;
  productName: string;
  image: string;
  size: string;
  flavor: string;
  price: number;
  quantity: number;
}

export interface CheckoutFormData {
  fullName: string;
  phoneNumber: string;
  email: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  pincode: string;
  notes?: string;
  paymentReference?: string; // UPI UTR or Transaction ID
}

export interface PlacedOrder {
  orderId: string;
  createdAt: string;
  items: CartItem[];
  subtotal: number;
  shippingFee: number;
  discount: number;
  total: number;
  customer: CheckoutFormData;
  paymentStatus: 'pending_confirmation' | 'verified';
}
