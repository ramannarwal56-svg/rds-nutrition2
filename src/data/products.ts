import { Product } from '../types';

export const PRODUCTS: Product[] = [
  {
    id: 'rnd-cre-amp-creatine',
    name: 'TITANIUM CREATINE Micronized Monohydrate',
    brandLine: 'RND TITANIUM™ CREATINE',
    category: 'performance',
    shortDescription: 'Titanium Series ultra-micronized 200 mesh pure creatine monohydrate with clinically proven 50% higher absorption.',
    fullDescription: 'RND TITANIUM CREATINE is the gold standard in strength and power supplementation. Featuring 100% pure micronised creatine monohydrate milled to 200 mesh for instantaneous dissolution, rapid cellular ATP replenishment, and clinically proven 50% higher absorption.',
    primaryImage: '/rnd-cre-amp.svg',
    alternateImages: ['/rnd-lineup-showcase.svg'],
    variants: [
      {
        id: 'cre-100g',
        size: '100 g',
        price: 400,
        mrp: 699,
        servings: '33 Servings',
        flavors: ['Unflavoured'],
        image: '/rnd-cre-amp.svg'
      },
      {
        id: 'cre-250g',
        size: '250 g',
        price: 899,
        mrp: 1499,
        servings: '83 Servings',
        flavors: ['Unflavoured'],
        image: '/rnd-cre-amp.svg'
      }
    ],
    defaultVariantIndex: 0,
    highlightBadge: 'Clinically Proven 50% Higher Absorption',
    clinicalHighlights: [
      '3g Pure Micronised Creatine',
      'Clinically Proven 50% Higher Absorption Badge',
      'Veg Dot Certified',
      '200 Mesh Ultra-Fine Mixability'
    ],
    certifiedBadges: ['Clinically Proven 50% Higher Absorption', 'Veg Dot', '200 Mesh Micronized', 'Trustified Certified'],
    benefits: [
      'Increases muscle ATP energy replenishment for explosive sets',
      'Clinically proven 50% higher digestive absorption curve',
      'Dissolves clear in water, juice, or whey shake with zero grit',
      'Third-party tested & certified for 100% purity and doping-free formula'
    ],
    nutritionFacts: {
      servingSize: '3g (1 Scoop)',
      protein: '0g',
      bcaa: '0g',
      calories: '0 kcal',
      carbs: '0g',
      fats: '0g',
      clinicalDose: '3000mg Pure Creatine Monohydrate'
    },
    accentColor: '#10b981'
  },
  {
    id: 'rnd-ignition-x-pre-workout',
    name: 'TITANIUM PRE-WORKOUT Extreme Energy Formula',
    brandLine: 'RND TITANIUM™ PRE-WORKOUT',
    category: 'performance',
    shortDescription: 'Titanium Series extreme energy pre-workout formula with clinically proven 50% higher absorption.',
    fullDescription: 'Uncompromising formulation engineered for aggressive gym sessions. RND TITANIUM PRE-WORKOUT delivers clinical dosages of pump catalysts, neuro-stimulants, and nitric oxide precursors with clinically proven 50% higher absorption.',
    primaryImage: '/rnd-ignition-x.svg',
    alternateImages: ['/rnd-lineup-showcase.svg'],
    variants: [
      {
        id: 'ign-100g',
        size: '100 g',
        price: 300,
        mrp: 599,
        servings: '12 Servings',
        flavors: ['Fruit Punch', 'Electric Berry', 'Tangy Orange', 'Green Apple'],
        image: '/rnd-ignition-x.svg'
      },
      {
        id: 'ign-300g',
        size: '300 g',
        price: 1499,
        mrp: 2999,
        servings: '38 Servings',
        flavors: ['Fruit Punch', 'Electric Berry', 'Tangy Orange', 'Green Apple'],
        image: '/rnd-ignition-x.svg'
      }
    ],
    defaultVariantIndex: 0,
    highlightBadge: 'Clinically Proven 50% Higher Absorption',
    clinicalHighlights: [
      'Extreme Energy Formula',
      'Clinically Proven 50% Higher Absorption Badge',
      'Veg Dot Certified',
      '6000mg Citrulline Malate Pump Matrix'
    ],
    certifiedBadges: ['Clinically Proven 50% Higher Absorption', 'Veg Dot', '100% Clinical Dose', 'FSSAI Approved'],
    benefits: [
      'Massive muscle pumps via high-dose 6000mg Citrulline Malate',
      'Clinically proven 50% higher absorption for rapid uptake',
      'Instant neuro-drive and focus with caffeine anhydrous matrix',
      'Refreshing natural flavors with lightning-fast solubility'
    ],
    nutritionFacts: {
      servingSize: '7.8g (1 Scoop)',
      calories: '5 kcal',
      protein: '0g',
      carbs: '1g',
      fats: '0g',
      clinicalDose: '6000mg Citrulline • 3200mg Beta-Alanine • 300mg Caffeine'
    },
    accentColor: '#f59e0b'
  },
  {
    id: 'rnd-colossus-mass-gainer',
    name: 'TITANIUM MASS GAINER Advanced Mass Building Formula',
    brandLine: 'RND TITANIUM™ MASS GAINER',
    category: 'gainers',
    shortDescription: 'Titanium Series advanced mass building formula with clinically proven 50% higher absorption and anabolic ratio.',
    fullDescription: 'Engineered for aggressive bulking and hardgainers. RND TITANIUM MASS GAINER provides high-protein anabolic nutrition enriched with micronised creatine, digestive enzymes, and clinically proven 50% higher absorption.',
    primaryImage: '/rnd-colossus.svg',
    alternateImages: ['/rnd-colossus-1kg.svg', '/rnd-lineup-showcase.svg'],
    variants: [
      {
        id: 'col-1kg',
        size: '1 kg',
        price: 600,
        mrp: 999,
        servings: '10 Servings',
        flavors: ['Chocolate', 'Vanilla', 'Kesar Pista'],
        image: '/rnd-colossus-1kg.svg'
      },
      {
        id: 'col-3kg',
        size: '3 kg',
        price: 1200,
        mrp: 2299,
        servings: '30 Servings',
        flavors: ['Chocolate', 'Vanilla', 'Kesar Pista'],
        image: '/rnd-colossus.svg'
      }
    ],
    defaultVariantIndex: 0,
    highlightBadge: 'Clinically Proven 50% Higher Absorption',
    clinicalHighlights: [
      'Advanced Mass Building Formula',
      'Clinically Proven 50% Higher Absorption Badge',
      'Veg Dot Certified',
      'Enriched with Biozyme Technology'
    ],
    certifiedBadges: ['Clinically Proven 50% Higher Absorption', 'Veg Dot', 'Advanced Mass Formula', 'Biozyme Enriched'],
    benefits: [
      'Accelerates muscular hypertrophy for hardgainers',
      'Clinically proven 50% higher digestive absorption curve',
      'Biozyme digestive enzymes ensure maximum assimilation without bloat',
      'Packed with essential aminos, glutamine, and creatine'
    ],
    nutritionFacts: {
      servingSize: '100g (2 Scoops)',
      protein: '22g (54g in 2.5 scoops)',
      calories: '380 kcal (1050 kcal full serve)',
      carbs: '74g',
      fats: '3.5g',
      clinicalDose: '54g Protein • 1050 kcal • 3g Creatine'
    },
    accentColor: '#f97316'
  },
  {
    id: 'rnd-alpha-shield-multivitamin',
    name: 'ALPHA SHIELD Athlete Multivitamin',
    brandLine: 'RND ALPHA SHIELD™',
    category: 'wellness',
    shortDescription: 'Clinically formulated 100% RDA multivitamin with 45 active ingredients, KSM-66® Ashwagandha, and testosterone support.',
    fullDescription: 'Engineered specifically for athletes under heavy physical stress. RND ALPHA SHIELD provides full spectrum 100% RDA micronutrients plus specialized botanical complexes including patented KSM-66® Ashwagandha for cortisol control, zinc-magnesium testosterone support matrix, and digestive bio-enhancers.',
    primaryImage: '/rnd-alpha-shield.svg',
    alternateImages: ['/rnd-lineup-showcase.svg'],
    variants: [
      {
        id: 'alp-60tabs',
        size: '60 Veg Tablets',
        price: 599,
        mrp: 999,
        servings: '60 Servings',
        flavors: ['Vegetarian Tablets']
      }
    ],
    defaultVariantIndex: 0,
    highlightBadge: 'KSM-66® Inside',
    clinicalHighlights: [
      '45 Active Ingredients (Vitamins, Minerals, Aminos)',
      'Patented KSM-66® Ashwagandha extract',
      'Natural Testosterone Support Matrix',
      '100% Daily RDA Coverage'
    ],
    certifiedBadges: ['100% RDA', 'KSM-66® Gold Standard', '100% Vegetarian', 'FSSAI Certified'],
    benefits: [
      'Lowers training-induced cortisol with clinically studied KSM-66®',
      'Fortifies immune defenses with Zinc, Vitamin C, and Vitamin D3',
      'Optimizes testosterone synthesis and hormone balance',
      'Boosts vitality and daily cellular metabolic energy'
    ],
    nutritionFacts: {
      servingSize: '1 Tablet Daily',
      protein: '0g',
      calories: '0 kcal',
      carbs: '0g',
      fats: '0g',
      ingredientsCount: '45 Active Ingredients',
      clinicalDose: '100% RDA + KSM-66® Ashwagandha'
    },
    accentColor: '#eab308'
  },
  {
    id: 'rnd-iso-pure-whey-isolate',
    name: 'TITANIUM PURE ISO 100% Whey Isolate',
    brandLine: 'RND TITANIUM™ PURE ISO',
    category: 'protein',
    shortDescription: 'Titanium Series 100% pure whey isolate delivering 28g protein per serve with clinically proven 50% higher absorption.',
    fullDescription: 'The crown jewel of protein purification. RND TITANIUM PURE ISO undergoes low-temperature cross-flow ceramic microfiltration, isolating native whey fractions while completely stripping away lactose, fat, and sugar. Delivers 28g of pure, ultra-rapid digesting protein per scoop with clinically proven 50% higher absorption.',
    primaryImage: '/rnd-whey-isolate.svg',
    alternateImages: ['/rnd-lineup-showcase.svg'],
    variants: [
      {
        id: 'wpi-1kg',
        size: '1 kg',
        price: 3000,
        mrp: 4499,
        servings: '33 Servings',
        flavors: ['Chocolate', 'Vanilla', 'Unflavoured'],
        image: '/rnd-whey-isolate.svg'
      }
    ],
    defaultVariantIndex: 0,
    highlightBadge: 'Clinically Proven 50% Higher Absorption',
    clinicalHighlights: [
      '28g Protein Per Serve',
      '100% whey',
      'Clinically Proven 50% Higher Absorption Badge',
      'Veg Dot Certified'
    ],
    certifiedBadges: ['28g Protein Per Serve', '100% whey', 'Clinically Proven 50% Higher Absorption', 'Veg Dot'],
    benefits: [
      '28g high-potency protein per serving for maximum anabolism',
      'Clinically proven 50% higher digestive absorption curve',
      'Virtually zero fat, carbs, or lactose — perfect for lean cutting',
      'World-sourced quality with rigorous cGMP verification'
    ],
    nutritionFacts: {
      servingSize: '32g (1 Scoop)',
      protein: '28g',
      bcaa: '6.5g',
      calories: '118 kcal',
      carbs: '0.4g',
      fats: '0.2g',
      clinicalDose: '28g 100% Whey Isolate (50% Higher Absorption)'
    },
    accentColor: '#eab308'
  },
  {
    id: 'rnd-pro-core-whey-concentrate',
    name: 'TITANIUM CORE WPC Premium Whey Concentrate',
    brandLine: 'RND TITANIUM™ CORE WPC',
    category: 'protein',
    shortDescription: 'Titanium Series premium whey concentrate delivering 28g bioavailable protein per serve with 50% higher absorption.',
    fullDescription: 'Engineered for athletes demanding consistent muscular recovery and exceptional taste. RND TITANIUM CORE WPC is sourced from hormone-free dairy and processed at low temperatures to retain native immunoglobulins. Delivers 28g protein per scoop with clinically proven 50% higher absorption.',
    primaryImage: '/rnd-whey-concentrate.svg',
    alternateImages: ['/rnd-lineup-showcase.svg'],
    variants: [
      {
        id: 'wpc-1kg',
        size: '1 kg',
        price: 1900,
        mrp: 2899,
        servings: '31 Servings',
        flavors: ['Chocolate', 'Vanilla', 'Unflavoured'],
        image: '/rnd-whey-concentrate.svg'
      }
    ],
    defaultVariantIndex: 0,
    highlightBadge: 'Clinically Proven 50% Higher Absorption',
    clinicalHighlights: [
      '28g Protein Per Serve',
      '100% whey',
      'Clinically Proven 50% Higher Absorption Badge',
      'Veg Dot Certified'
    ],
    certifiedBadges: ['28g Protein Per Serve', '100% whey', 'Clinically Proven 50% Higher Absorption', 'Veg Dot'],
    benefits: [
      '28g protein per serving ensures sustained amino acid delivery',
      'Clinically proven 50% higher absorption prevents gastrointestinal bloat',
      'Rich milkshake consistency and authentic flavor notes',
      'cGMP verified production standard for unmatched purity'
    ],
    nutritionFacts: {
      servingSize: '35g (1 Scoop)',
      protein: '28g',
      bcaa: '6.0g',
      calories: '135 kcal',
      carbs: '2.2g',
      fats: '1.5g',
      clinicalDose: '28g Premium Whey Concentrate (50% Higher Absorption)'
    },
    accentColor: '#eab308'
  },
  {
    id: 'rnd-fusion-blend-whey',
    name: 'TITANIUM DUAL BLEND Whey (Isolate + Concentrate)',
    brandLine: 'RND TITANIUM™ DUAL BLEND',
    category: 'protein',
    shortDescription: 'Titanium Series dual-stage whey isolate + concentrate blend with 28g protein per serve and 50% higher absorption.',
    fullDescription: 'The ultimate all-day anabolic matrix. RND TITANIUM DUAL BLEND marries the rapid plasma amino spike of cold-filtered Whey Isolate with the sustained amino release of Whey Concentrate. Delivers 28g complete protein per serve backed by 50% higher absorption technology.',
    primaryImage: '/rnd-whey-blend.svg',
    alternateImages: ['/rnd-lineup-showcase.svg'],
    variants: [
      {
        id: 'blend-1kg',
        size: '1 kg',
        price: 3400,
        mrp: 4999,
        servings: '30 Servings',
        flavors: ['Chocolate', 'Vanilla', 'Unflavoured'],
        image: '/rnd-whey-blend.svg'
      }
    ],
    defaultVariantIndex: 0,
    highlightBadge: 'Clinically Proven 50% Higher Absorption',
    clinicalHighlights: [
      '28g Protein Per Serve',
      '100% whey',
      'Clinically Proven 50% Higher Absorption Badge',
      'Veg Dot Certified'
    ],
    certifiedBadges: ['28g Protein Per Serve', '100% whey', 'Clinically Proven 50% Higher Absorption', 'Veg Dot'],
    benefits: [
      'Dual-rate digestion keeps amino acid levels elevated for hours',
      'Clinically proven 50% higher absorption for rapid muscle repair',
      'Rich gourmet taste with superior mouthfeel and texture',
      'Zero chalkiness and instant lump-free solubility'
    ],
    nutritionFacts: {
      servingSize: '34g (1 Scoop)',
      protein: '28g',
      bcaa: '6.2g',
      calories: '130 kcal',
      carbs: '1.8g',
      fats: '1.2g',
      clinicalDose: '28g Whey Isolate + Concentrate (50% Higher Absorption)'
    },
    accentColor: '#eab308'
  },
  {
    id: 'rnd-bio-yeast-protein',
    name: 'TITANIUM YEAST POWER Premium Clean Yeast Protein',
    brandLine: 'RND TITANIUM™ YEAST POWER',
    category: 'protein',
    shortDescription: 'Titanium Series 100% clean fermented yeast protein with 28g protein per serve and clinically proven 50% higher absorption.',
    fullDescription: 'The next frontier of clean sports nutrition. RND TITANIUM YEAST POWER is produced through natural bio-fermentation, delivering a hypoallergenic, dairy-free, soy-free protein matrix with 28g protein per serve and clinically proven 50% higher absorption.',
    primaryImage: '/rnd-yeast-protein.svg',
    alternateImages: ['/rnd-lineup-showcase.svg'],
    variants: [
      {
        id: 'yeast-1kg',
        size: '1 kg',
        price: 1500,
        mrp: 2499,
        servings: '33 Servings',
        flavors: ['Unflavoured', 'Cafe Mocha'],
        image: '/rnd-yeast-protein.svg'
      }
    ],
    defaultVariantIndex: 0,
    highlightBadge: 'Clinically Proven 50% Higher Absorption',
    clinicalHighlights: [
      '28g Protein Per Serve',
      '100% clean protein',
      'Clinically Proven 50% Higher Absorption Badge',
      'Veg Dot Certified'
    ],
    certifiedBadges: ['28g Protein Per Serve', '100% clean protein', 'Clinically Proven 50% Higher Absorption', 'Veg Dot'],
    benefits: [
      '28g bio-fermented complete protein per scoop',
      'Clinically proven 50% higher absorption with zero lactose or bloating',
      'Hypoallergenic non-dairy nutrition ideal for all body types',
      'World-sourced quality certified by cGMP standards'
    ],
    nutritionFacts: {
      servingSize: '33g (1 Scoop)',
      protein: '28g',
      bcaa: '5.6g',
      calories: '124 kcal',
      carbs: '1.5g',
      fats: '1.0g',
      clinicalDose: '28g Fermented Yeast Protein (50% Higher Absorption)'
    },
    accentColor: '#eab308'
  },
  {
    id: 'rnd-recharge-bcaa',
    name: 'TITANIUM BCAA Essential Amino Acids',
    brandLine: 'RND TITANIUM™ BCAA',
    category: 'recovery',
    shortDescription: 'Titanium Series essential amino acids 2:1:1 ratio with clinically proven 50% higher absorption.',
    fullDescription: 'Fuel your intra-workout intensity and protect hard-earned muscle. RND TITANIUM BCAA provides instantized plant-fermented branched chain amino acids in the researched 2:1:1 ratio with clinically proven 50% higher absorption.',
    primaryImage: '/rnd-bcaa.svg',
    alternateImages: ['/rnd-lineup-showcase.svg'],
    variants: [
      {
        id: 'bcaa-100g',
        size: '100 g',
        price: 500,
        mrp: 899,
        servings: '14 Servings',
        flavors: ['Watermelon Chill', 'Blue Raspberry', 'Lemon Lime'],
        image: '/rnd-bcaa.svg'
      },
      {
        id: 'bcaa-250g',
        size: '250 g',
        price: 999,
        mrp: 1699,
        servings: '35 Servings',
        flavors: ['Watermelon Chill', 'Blue Raspberry', 'Lemon Lime'],
        image: '/rnd-bcaa.svg'
      }
    ],
    defaultVariantIndex: 0,
    highlightBadge: 'Clinically Proven 50% Higher Absorption',
    clinicalHighlights: [
      'Essential Amino Acids',
      'Clinically Proven 50% Higher Absorption Badge',
      'Veg Dot Certified',
      '2:1:1 Fermented Intra-Fuel Matrix'
    ],
    certifiedBadges: ['Clinically Proven 50% Higher Absorption', 'Veg Dot', '2:1:1 Ratio', 'Fermented Vegan BCAAs'],
    benefits: [
      'Suppresses muscle protein breakdown during strenuous sessions',
      'Clinically proven 50% higher digestive absorption curve',
      'Electrolytes sustain muscular contraction and hydration',
      'Crisp, refreshing taste quenches thirst during training'
    ],
    nutritionFacts: {
      servingSize: '7g (1 Scoop)',
      bcaa: '7000mg',
      protein: '0g',
      calories: '0 kcal',
      carbs: '0g',
      fats: '0g',
      clinicalDose: '3500mg Leucine • 1750mg Isoleucine • 1750mg Valine'
    },
    accentColor: '#ec4899'
  },
  {
    id: 'rnd-pure-l-glutamine',
    name: 'TITANIUM L-GLUTAMINE Pure Recovery Amino',
    brandLine: 'RND TITANIUM™ L-GLUTAMINE',
    category: 'recovery',
    shortDescription: 'Titanium Series pure recovery amino with clinically proven 50% higher absorption.',
    fullDescription: 'Glutamine represents over 60% of free amino acid pools in skeletal muscle. Rigorous workouts deplete internal stores rapidly. RND TITANIUM L-GLUTAMINE replenishes cellular reserves with clinically proven 50% higher absorption.',
    primaryImage: '/rnd-glutamine.svg',
    alternateImages: ['/rnd-lineup-showcase.svg'],
    variants: [
      {
        id: 'gln-250g',
        size: '250 g',
        price: 500,
        mrp: 899,
        servings: '50 Servings',
        flavors: ['Unflavoured'],
        image: '/rnd-glutamine.svg'
      }
    ],
    defaultVariantIndex: 0,
    highlightBadge: 'Clinically Proven 50% Higher Absorption',
    clinicalHighlights: [
      'Pure Recovery Amino',
      'Clinically Proven 50% Higher Absorption Badge',
      'Veg Dot Certified',
      '100% Free-Form Pharmaceutical Purity'
    ],
    certifiedBadges: ['Clinically Proven 50% Higher Absorption', 'Veg Dot', 'Pharma Grade', '100% Fermented'],
    benefits: [
      'Accelerates muscular repair between consecutive training days',
      'Clinically proven 50% higher digestive absorption curve',
      'Crucial for gut lining defense and immune system resilience',
      'Completely neutral and unflavoured; blends seamlessly into any shake'
    ],
    nutritionFacts: {
      servingSize: '5g (1 Scoop)',
      protein: '5g',
      calories: '0 kcal',
      carbs: '0g',
      fats: '0g',
      clinicalDose: '5000mg Free-Form L-Glutamine'
    },
    accentColor: '#14b8a6'
  }
];

export const BRAND_INFO = {
  name: 'RND Nutrition',
  legalName: 'RND Nutrition Sports Supplements',
  tagline: 'Precision Engineered Fitness & Clinical Sports Nutrition',
  supportPhone: '9306667128',
  supportWhatsappNumber: '919306667128',
  supportEmail: 'rndnutrition285@gmail.com',
  payeeName: 'Deepanshu',
  upiId: 'deepanshugawaridia09@okicici',
  currency: '₹',
  freeShippingThreshold: 999,
  shippingFee: 50,
  paymentQrImage: '/WhatsApp Image 2026-09-15 at 12.31.29 PM.jpeg',
  // Optional background dispatch keys (or use .env VITE_CALLMEBOT_API_KEY / VITE_ORDER_WEBHOOK_URL)
  callmebotApiKey: '',
  orderWebhookUrl: ''
};
