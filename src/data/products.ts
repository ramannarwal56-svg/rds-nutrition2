import { Product } from '../types';

export const PRODUCTS: Product[] = [
  {
    id: 'rnd-cre-amp-creatine',
    name: 'CRE AMP Micronised Creatine Monohydrate',
    brandLine: 'RND CRE AMP™',
    category: 'performance',
    shortDescription: 'Ultra-micronised 200 mesh pure creatine monohydrate for explosive power, strength, and cellular ATP regeneration.',
    fullDescription: 'RND CRE AMP is the gold standard in strength supplementation. Featuring 100% pure micronised creatine monohydrate milled to 200 mesh for instantaneous dissolution and optimal bioavailability. Verified Trustified Certified for zero heavy metals, zero fillers, and guaranteed 3g active creatine per scoop.',
    primaryImage: '/rnd-cre-amp.svg',
    alternateImages: ['/Screenshot 2026-09-13 080857.jpg'],
    variants: [
      {
        id: 'cre-250g',
        size: '250 g',
        price: 899,
        mrp: 1499,
        servings: '83 Servings',
        flavors: ['Unflavoured']
      },
      {
        id: 'cre-100g',
        size: '100 g',
        price: 400,
        mrp: 699,
        servings: '33 Servings',
        flavors: ['Unflavoured']
      }
    ],
    defaultVariantIndex: 0,
    highlightBadge: 'Trustified Certified',
    clinicalHighlights: [
      '3g Pure Micronised Creatine',
      'Trustified Certified & Tested',
      '200 Mesh Ultra-Fine Mixability',
      'Zero Sugars • Zero Carbs'
    ],
    certifiedBadges: ['Trustified Certified', '200 Mesh Micronized', '100% Lab Tested', 'Dope Free'],
    benefits: [
      'Increases muscle ATP energy replenishment for explosive sets',
      'Enhances cellular intramuscular hydration & muscle fullness',
      'Dissolves clear in water, juice, or whey shake with zero grit',
      'Third-party tested & Trustified certified for 100% purity'
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
    name: 'IGNITION X Extreme Pre-Workout',
    brandLine: 'RND IGNITION X™',
    category: 'performance',
    shortDescription: '100% clinical dose extreme pre-workout with 6000mg Citrulline Malate, 3200mg Beta-Alanine, and 300mg Caffeine.',
    fullDescription: 'Uncompromising formulation engineered for aggressive gym sessions. RND IGNITION X provides clinical dosages of pump catalysts and neuro-stimulants. Delivers 6000mg L-Citrulline Malate for nitric oxide vasodilation, 3200mg Beta-Alanine to delay lactic acid build-up, and 300mg Caffeine Anhydrous for razor-sharp mental focus without the crash.',
    primaryImage: '/rnd-ignition-x.svg',
    alternateImages: ['/Screenshot 2026-09-13 080910.jpg'],
    variants: [
      {
        id: 'ign-300g',
        size: '300 g',
        price: 1499,
        mrp: 2999,
        servings: '38 Servings',
        flavors: ['Fruit Punch', 'Electric Berry', 'Tangy Orange', 'Green Apple']
      },
      {
        id: 'ign-100g',
        size: '100 g (Trial)',
        price: 300,
        mrp: 599,
        servings: '12 Servings',
        flavors: ['Fruit Punch', 'Electric Berry', 'Tangy Orange', 'Green Apple']
      }
    ],
    defaultVariantIndex: 0,
    highlightBadge: '100% Clinical Dose',
    clinicalHighlights: [
      '6000mg Citrulline Malate (Pump & Blood Flow)',
      '3200mg Beta-Alanine (Endurance & Strength)',
      '300mg Caffeine (Focus & Energy)',
      '38 Explosive Servings'
    ],
    certifiedBadges: ['100% Clinical Dose', 'No Proprietary Blends', 'FSSAI Approved', 'Product of India'],
    benefits: [
      'Massive muscle pumps via high-dose 6000mg Citrulline Malate',
      'Prolongs muscular endurance and buffers lactic acid with Beta-Alanine',
      'Instant neuro-drive and focus with 300mg caffeine matrix',
      'Refreshing natural Fruit Punch flavor with fast solubility'
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
    name: 'COLOSSUS Mega Mass Gainer',
    brandLine: 'RND COLOSSUS™',
    category: 'gainers',
    shortDescription: 'High-calorie anabolic formula with 1:5 ratio, 54g high quality protein, 1050 calories, 3g creatine, and biozymes.',
    fullDescription: 'Built for hardgainers and massive bulking phases. RND COLOSSUS delivers a precision 1:5 anabolic ratio of multi-source proteins to clean complex carbohydrates. Enriched with 3g micronised creatine, medium-chain triglycerides (MCTs), and Biozyme digestive technology to ensure rapid caloric assimilation without gastrointestinal bloat.',
    primaryImage: '/rnd-colossus.svg',
    alternateImages: ['/Screenshot 2026-09-13 080857.jpg'],
    variants: [
      {
        id: 'col-3kg',
        size: '3 kg (6.6 lbs)',
        price: 1200,
        mrp: 2299,
        servings: '30 Servings',
        flavors: ['Chocolate', 'Vanilla', 'Kesar Pista']
      },
      {
        id: 'col-1kg',
        size: '1 kg (2.2 lbs)',
        price: 600,
        mrp: 999,
        servings: '10 Servings',
        flavors: ['Chocolate', 'Vanilla', 'Kesar Pista']
      }
    ],
    defaultVariantIndex: 0,
    highlightBadge: 'Anabolic 1:5 Ratio',
    clinicalHighlights: [
      '54g High Quality Protein per serving',
      '1050 Clean Anabolic Calories',
      '3g Micronized Creatine included',
      'Enriched with Biozyme Technology'
    ],
    certifiedBadges: ['1:5 Anabolic Ratio', 'Biozyme Enriched', 'Zero Trans Fats', 'Lab Tested'],
    benefits: [
      'Accelerates muscular hypertrophy for hardgainers',
      'Multi-stage carbohydrate delivery prevents insulin spikes & crash',
      'Biozyme digestive enzymes ensure maximum absorption',
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
    alternateImages: ['/Screenshot 2026-09-13 080910.jpg'],
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
    name: 'ISO-PURE 100% Whey Protein Isolate',
    brandLine: 'RND ISO-PURE™',
    category: 'protein',
    shortDescription: 'Ultra-pure 90% cross-flow cold microfiltered whey isolate with 27g protein, 0g sugar, and zero lactose.',
    fullDescription: 'The crown jewel of protein purification. RND ISO-PURE undergoes low-temperature cross-flow ceramic microfiltration, isolating native whey fractions while completely stripping away lactose, fat, and cholesterol. Delivers 27g of pure, ultra-rapid digesting protein per scoop for instant post-workout anabolism.',
    primaryImage: '/rnd-whey-isolate.svg',
    alternateImages: ['/rnd-cre-amp.svg'],
    variants: [
      {
        id: 'wpi-1kg',
        size: '1 kg (2.2 lbs)',
        price: 3000,
        mrp: 4499,
        servings: '33 Servings',
        flavors: ['Chocolate', 'Vanilla', 'Unflavoured']
      }
    ],
    defaultVariantIndex: 0,
    highlightBadge: '90% Pure Isolate',
    clinicalHighlights: [
      '27g Pure Protein per scoop',
      '6.2g Natural BCAAs',
      'Zero Lactose • Zero Sugar',
      'Cross-Flow Microfiltered'
    ],
    certifiedBadges: ['90% Protein Purity', 'Zero Lactose', 'Cold Microfiltered', '100% Dope Free'],
    benefits: [
      'Instantaneous digestive uptake fuels immediate protein synthesis',
      'Virtually zero fat and carbohydrates — ideal for lean cutting phases',
      'Gentle on stomach for lactose-sensitive athletes',
      'Unsurpassed chocolate and vanilla gourmet flavor profiles'
    ],
    nutritionFacts: {
      servingSize: '30g (1 Scoop)',
      protein: '27g',
      bcaa: '6.2g',
      calories: '115 kcal',
      carbs: '0.5g',
      fats: '0.3g',
      clinicalDose: '27g Pure Whey Isolate'
    },
    accentColor: '#06b6d4'
  },
  {
    id: 'rnd-pro-core-whey-concentrate',
    name: 'PRO-CORE Whey Protein Concentrate',
    brandLine: 'RND PRO-CORE™',
    category: 'protein',
    shortDescription: 'Ultra-filtered premium 80% whey protein concentrate delivering 24g bioavailable protein and 5.5g BCAAs.',
    fullDescription: 'Engineered for athletes demanding consistent muscular recovery and exceptional taste. RND PRO-CORE is sourced from hormone-free dairy and processed at low temperatures to retain immunoglobulins, lactoferrin, and intact amino acid chains. Fortified with digestive enzymes for smooth digestion.',
    primaryImage: '/rnd-whey-concentrate.svg',
    alternateImages: ['/rnd-whey-isolate.svg'],
    variants: [
      {
        id: 'wpc-1kg',
        size: '1 kg (2.2 lbs)',
        price: 1900,
        mrp: 2899,
        servings: '31 Servings',
        flavors: ['Chocolate', 'Vanilla', 'Unflavoured']
      }
    ],
    defaultVariantIndex: 0,
    highlightBadge: 'Best Seller',
    clinicalHighlights: [
      '24g Bioavailable Protein',
      '5.5g Naturally Occurring BCAAs',
      'Enhanced with DigeZyme Enzymes',
      'Instantized Mixability'
    ],
    certifiedBadges: ['80% WPC Standard', 'DigeZyme Enriched', 'Grass-Fed Sourced', 'Zero Amino Spiking'],
    benefits: [
      'Provides sustained 3-4 hour amino acid release curve',
      'Enriched with multi-enzyme complex for zero bloating',
      'Decadent milkshake consistency and authentic flavor notes',
      'Cost-effective everyday foundation for strength training'
    ],
    nutritionFacts: {
      servingSize: '32g (1 Scoop)',
      protein: '24g',
      bcaa: '5.5g',
      calories: '130 kcal',
      carbs: '2.5g',
      fats: '1.8g',
      clinicalDose: '24g Whey Protein Concentrate'
    },
    accentColor: '#10b981'
  },
  {
    id: 'rnd-fusion-blend-whey',
    name: 'FUSION-BLEND Whey (Isolate + Concentrate)',
    brandLine: 'RND FUSION-BLEND™',
    category: 'protein',
    shortDescription: 'Dual-phase release protein combining rapid Whey Isolate with sustained Whey Concentrate for 25.5g protein.',
    fullDescription: 'The ultimate all-day anabolic matrix. RND FUSION-BLEND marries the rapid plasma amino spike of cold-filtered Whey Isolate with the sustained amino acid delivery of Whey Concentrate. Guarantees prolonged muscle protein synthesis after strenuous lifting sessions.',
    primaryImage: '/rnd-whey-blend.svg',
    alternateImages: ['/rnd-whey-concentrate.svg'],
    variants: [
      {
        id: 'blend-1kg',
        size: '1 kg (2.2 lbs)',
        price: 3400,
        mrp: 4999,
        servings: '30 Servings',
        flavors: ['Chocolate', 'Vanilla', 'Unflavoured']
      }
    ],
    defaultVariantIndex: 0,
    highlightBadge: 'Dual-Phase Formula',
    clinicalHighlights: [
      '25.5g Dual-Stage Protein',
      '5.8g BCAAs per scoop',
      'Isolate + Concentrate Ratio',
      'Ultra-Creamy Texture'
    ],
    certifiedBadges: ['Dual-Phase Matrix', 'Microfiltered Isolate Core', 'Zero Banned Substances'],
    benefits: [
      'Dual-rate digestion keeps amino acid levels elevated for hours',
      'Perfect for post-workout recovery or between-meal nourishment',
      'Rich gourmet taste with superior mouthfeel and texture',
      'Zero chalkiness and instant lump-free solubility'
    ],
    nutritionFacts: {
      servingSize: '33g (1 Scoop)',
      protein: '25.5g',
      bcaa: '5.8g',
      calories: '128 kcal',
      carbs: '2.0g',
      fats: '1.4g',
      clinicalDose: '25.5g Isolate/Concentrate Blend'
    },
    accentColor: '#8b5cf6'
  },
  {
    id: 'rnd-bio-yeast-protein',
    name: 'BIO-YEAST Fermented Protein',
    brandLine: 'RND BIO-YEAST™',
    category: 'protein',
    shortDescription: '100% vegan, hypoallergenic single-cell fermented protein with complete amino profile and PDCAAS 1.0.',
    fullDescription: 'The next frontier of clean sports nutrition. RND BIO-YEAST is produced through natural bio-fermentation, delivering a hypoallergenic, dairy-free, soy-free protein matrix with an exceptional PDCAAS score of 1.0. Rich in natural B-vitamins, minerals, and prebiotic dietary fiber.',
    primaryImage: '/rnd-yeast-protein.svg',
    alternateImages: ['/rnd-whey-concentrate.svg'],
    variants: [
      {
        id: 'yeast-1kg',
        size: '1 kg (2.2 lbs)',
        price: 1500,
        mrp: 2499,
        servings: '33 Servings',
        flavors: ['Unflavoured', 'Cafe Mocha']
      }
    ],
    defaultVariantIndex: 0,
    highlightBadge: '100% Bio-Fermented Vegan',
    clinicalHighlights: [
      '24g Fermented Clean Protein',
      'PDCAAS 1.0 Complete Amino Profile',
      '100% Dairy-Free & Hypoallergenic',
      'Natural B-Complex Vitamins'
    ],
    certifiedBadges: ['100% Vegan Certified', 'PDCAAS 1.0 Score', 'Eco Sustainable', 'Non-GMO'],
    benefits: [
      'Non-dairy and gentle for individuals sensitive to whey or soy',
      'High leucine content triggers optimal muscle protein synthesis',
      'Environmentally sustainable production with ultra-low carbon footprint',
      'Naturally rich in zinc, magnesium, and essential trace minerals'
    ],
    nutritionFacts: {
      servingSize: '30g (1 Scoop)',
      protein: '24g',
      bcaa: '4.8g',
      calories: '118 kcal',
      carbs: '1.8g',
      fats: '1.2g',
      clinicalDose: '24g Fermented Yeast Protein'
    },
    accentColor: '#ca8a04'
  },
  {
    id: 'rnd-recharge-bcaa',
    name: 'RECHARGE BCAA 2:1:1 Matrix',
    brandLine: 'RND RECHARGE™',
    category: 'recovery',
    shortDescription: 'Clinically proven 2:1:1 ratio of Leucine, Isoleucine, and Valine with hydration electrolytes to stop catabolism.',
    fullDescription: 'Fuel your intra-workout intensity and protect hard-earned muscle. RND RECHARGE provides instantized plant-fermented branched chain amino acids in the researched 2:1:1 ratio. Enhanced with pink Himalayan salt, potassium, and magnesium to maintain cellular hydration and prevent cramping.',
    primaryImage: '/rnd-bcaa.svg',
    alternateImages: ['/rnd-ignition-x.svg'],
    variants: [
      {
        id: 'bcaa-100g',
        size: '100 g',
        price: 500,
        mrp: 899,
        servings: '14 Servings',
        flavors: ['Watermelon Chill', 'Blue Raspberry', 'Lemon Lime']
      },
      {
        id: 'bcaa-250g',
        size: '250 g',
        price: 999,
        mrp: 1699,
        servings: '35 Servings',
        flavors: ['Watermelon Chill', 'Blue Raspberry', 'Lemon Lime']
      }
    ],
    defaultVariantIndex: 0,
    highlightBadge: '2:1:1 Intra-Fuel',
    clinicalHighlights: [
      '7g Instantized BCAAs (2:1:1 Ratio)',
      'Prevents Intra-Workout Muscle Catabolism',
      'Electrolyte Hydration Complex',
      'Zero Sugar • Zero Calories'
    ],
    certifiedBadges: ['2:1:1 Ratio', 'Fermented Vegan BCAAs', 'Electrolyte Infused', 'Zero Sugar'],
    benefits: [
      'Suppresses muscle protein breakdown during strenuous sessions',
      'Electrolytes sustain muscular contraction and hydration',
      'Crisp, refreshing taste quenches thirst during training',
      'Zero carbohydrates, artificial sugars, or calories'
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
    name: 'PURE 100% Fermented L-Glutamine',
    brandLine: 'RND PURE™',
    category: 'recovery',
    shortDescription: '100% pharmaceutical grade micronised L-Glutamine for rapid cellular recovery, gut integrity, and immune defense.',
    fullDescription: 'Glutamine represents over 60% of free amino acid pools in skeletal muscle. Rigorous workouts deplete internal stores rapidly. RND PURE 100% Fermented L-Glutamine replenishes cellular reserves, supports intestinal mucosa barrier health, and accelerates post-workout glycogen synthesis.',
    primaryImage: '/rnd-glutamine.svg',
    alternateImages: ['/rnd-cre-amp.svg'],
    variants: [
      {
        id: 'gln-250g',
        size: '250 g (0.55 lbs)',
        price: 500,
        mrp: 899,
        servings: '50 Servings',
        flavors: ['Unflavoured']
      }
    ],
    defaultVariantIndex: 0,
    highlightBadge: 'Pharma Grade Pure',
    clinicalHighlights: [
      '5g Fermented Micronised L-Glutamine',
      'Restores Intramuscular Glutamine Pools',
      'Supports Gut Microbiome Integrity',
      '100% Free-Form Pharmaceutical Purity'
    ],
    certifiedBadges: ['Pharma Grade', '100% Fermented', 'Zero Additives', 'Easily Stackable'],
    benefits: [
      'Accelerates muscular repair between consecutive training days',
      'Crucial for gut lining defense and immune system resilience',
      'Completely neutral and unflavoured; blends seamlessly into any shake',
      'Zero fillers, colors, flavors, or additives'
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
  paymentQrImage: '/WhatsApp Image 2026-09-15 at 12.31.29 PM.jpeg'
};
