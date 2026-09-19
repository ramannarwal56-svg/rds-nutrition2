import os

def get_cap_ribs():
    ribs = []
    for x in range(194, 412, 10):
        ribs.append(f'<line x1="{x}" y1="52" x2="{x}" y2="100" stroke="#0d0e12" stroke-width="2.2"/>\n      <line x1="{x+1.5}" y1="52" x2="{x+1.5}" y2="100" stroke="#4b5563" stroke-width="1" opacity="0.6"/>')
    return "\n      ".join(ribs)

CAP_RIBS = get_cap_ribs()

def generate_jar_svg(product_type, title_line2, subtitle, pill1_text):
    """
    Generates a photorealistic 3D vector jar SVG matching the user's uploaded reference image.
    product_type: 'wpc', 'iso', 'blend', 'yeast'
    """
    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 680" width="600" height="680">
  <defs>
    <!-- Studio Ambient Lighting / Floor Shadow -->
    <filter id="softContactShadow_{product_type}" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur in="SourceAlpha" stdDeviation="16" />
      <feOffset dx="0" dy="24" result="offsetblur" />
      <feFlood flood-color="#000000" flood-opacity="0.45" />
      <feComposite in2="offsetblur" operator="in" />
      <feMerge>
        <feMergeNode />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>

    <!-- Metallic Titanium Body Gradient (Realistic Cylindrical Light Distribution) -->
    <linearGradient id="tiBodyGrad_{product_type}" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#182026" />
      <stop offset="6%" stop-color="#243038" />
      <stop offset="16%" stop-color="#3d4d59" />
      <stop offset="26%" stop-color="#7b8e9b" />
      <stop offset="31%" stop-color="#c4d1db" />
      <stop offset="35%" stop-color="#e9f1f7" />
      <stop offset="40%" stop-color="#9bb0be" />
      <stop offset="55%" stop-color="#475663" />
      <stop offset="78%" stop-color="#2a353d" />
      <stop offset="92%" stop-color="#1e262c" />
      <stop offset="100%" stop-color="#13191d" />
    </linearGradient>

    <!-- Screw Cap Matte Black Cylindrical Gradient -->
    <linearGradient id="tiCapGrad_{product_type}" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#0a0b0d" />
      <stop offset="8%" stop-color="#17191d" />
      <stop offset="22%" stop-color="#282c33" />
      <stop offset="32%" stop-color="#3f454f" />
      <stop offset="36%" stop-color="#555d6b" />
      <stop offset="42%" stop-color="#2c3038" />
      <stop offset="75%" stop-color="#14161a" />
      <stop offset="100%" stop-color="#090a0c" />
    </linearGradient>

    <!-- Cap Top Bevel Ring Gradient -->
    <linearGradient id="tiCapTopGrad_{product_type}" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#3d434d" />
      <stop offset="100%" stop-color="#14161a" />
    </linearGradient>

    <!-- Ultra-Luxurious Metallic Gold Foil Gradient -->
    <linearGradient id="tiGoldFoil_{product_type}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fffbeb" />
      <stop offset="18%" stop-color="#fde68a" />
      <stop offset="38%" stop-color="#fbbf24" />
      <stop offset="60%" stop-color="#d97706" />
      <stop offset="82%" stop-color="#b45309" />
      <stop offset="100%" stop-color="#78350f" />
    </linearGradient>

    <!-- Horizontal Gold Stripe Gradient for Typography -->
    <linearGradient id="tiGoldText_{product_type}" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#fbbf24" />
      <stop offset="35%" stop-color="#fef08a" />
      <stop offset="70%" stop-color="#f59e0b" />
      <stop offset="100%" stop-color="#d97706" />
    </linearGradient>

    <!-- Embossed Gold Border Filter -->
    <filter id="goldGleam_{product_type}" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="2" stdDeviation="2" flood-color="#000000" flood-opacity="0.4" />
    </filter>

    <!-- Clip Path for Cylindrical Jar Body -->
    <clipPath id="jarBodyClip_{product_type}">
      <path d="M 115 175 C 115 145, 140 135, 175 135 L 425 135 C 460 135, 485 145, 485 175 L 485 550 C 485 580, 460 595, 420 595 L 180 595 C 140 595, 115 580, 115 550 Z" />
    </clipPath>
  </defs>

  <!-- 1. Studio Floor Shadows -->
  <g>
    <!-- Wide soft ambient floor shadow -->
    <ellipse cx="300" cy="610" rx="220" ry="26" fill="#000000" fill-opacity="0.32" filter="blur(18px)"/>
    <!-- Medium contact shadow -->
    <ellipse cx="300" cy="605" rx="175" ry="14" fill="#000000" fill-opacity="0.55" filter="blur(6px)"/>
    <!-- Tight dark contact occlusion line -->
    <ellipse cx="300" cy="600" rx="145" ry="5" fill="#000000" fill-opacity="0.8" filter="blur(2px)"/>
  </g>

  <!-- 2. Main Jar Assembly with Soft Shadow -->
  <g filter="url(#softContactShadow_{product_type})">

    <!-- Tub Body Base & Shoulder -->
    <path d="M 115 175 C 115 145, 140 135, 175 135 L 425 135 C 460 135, 485 145, 485 175 L 485 550 C 485 580, 460 595, 420 595 L 180 595 C 140 595, 115 580, 115 550 Z"
          fill="url(#tiBodyGrad_{product_type})" stroke="#334155" stroke-width="1.2"/>

    <!-- Tapered Neck Collar Transition -->
    <path d="M 172 135 L 428 135 L 406 108 L 194 108 Z" fill="url(#tiCapGrad_{product_type})" stroke="#1f242d" stroke-width="1"/>

    <!-- Screw Cap Lid -->
    <!-- Cap Rim Bottom Lip -->
    <rect x="180" y="102" width="240" height="9" rx="3" fill="#14171c" stroke="#252b36" stroke-width="1"/>
    
    <!-- Main Ribbed Cap Body -->
    <rect x="184" y="46" width="232" height="60" rx="6" fill="url(#tiCapGrad_{product_type})" stroke="#38404e" stroke-width="1.2"/>

    <!-- Cap Vertical Ribbing (Precision Cylindrical Grooves) -->
    <g stroke-linecap="round">
      {CAP_RIBS}
    </g>

    <!-- Cap Top Beveled Inset Ring -->
    <ellipse cx="300" cy="47" rx="114" ry="7" fill="url(#tiCapTopGrad_{product_type})" stroke="#475161" stroke-width="1.5"/>
    <ellipse cx="300" cy="46" rx="95" ry="4" fill="#171a20" stroke="#2a303c" stroke-width="1"/>

    <!-- Specular Highlight Stripe across the Entire Jar (Shoulder + Body) -->
    <path d="M 215 135 L 245 135 L 240 595 L 210 595 Z" fill="#ffffff" opacity="0.12" />
    <path d="M 226 135 L 234 135 L 232 595 L 224 595 Z" fill="#ffffff" opacity="0.22" />

    <!-- 3. Cylindrical Label Wrap (Clipped to body) -->
    <g clip-path="url(#jarBodyClip_{product_type})">
      <!-- Right Half: Crisp White Background with Chemical Honeycomb Lattice -->
      <rect x="110" y="168" width="380" height="397" fill="#f8fafc" />

      <!-- Chemical Hexagonal Honeycomb Matrix Watermark -->
      <g stroke="#cbd5e1" stroke-width="1.2" fill="none" opacity="0.8">
        <polygon points="415,195 430,186 445,195 445,212 430,221 415,212" />
        <polygon points="430,221 445,212 460,221 460,238 445,247 430,238" />
        <polygon points="400,221 415,212 430,221 430,238 415,247 400,238" />
        <polygon points="415,247 430,238 445,247 445,264 430,273 415,264" />
        <polygon points="430,273 445,264 460,273 460,290 445,299 430,290" />
        <polygon points="445,299 460,290 475,299 475,316 460,325 445,316" />
        <polygon points="405,395 420,386 435,395 435,412 420,421 405,412" />
        <polygon points="420,421 435,412 450,421 450,438 435,447 420,438" />
        <polygon points="390,421 405,412 420,421 420,438 405,447 390,438" />
        <polygon points="405,447 420,438 435,447 435,464 420,473 405,464" />
        <polygon points="435,447 450,438 465,447 465,464 450,473 435,464" />
      </g>

      <!-- Left Main Section: Matte Dark Charcoal/Black with Diagonal Right Slash -->
      <path d="M 110 168 L 332 168 L 412 342 L 372 565 L 110 565 Z" fill="#090a0e" />

      <!-- Metallic Gold Foil Diagonal Transition Ribbon -->
      <path d="M 332 168 L 350 168 L 430 342 L 390 565 L 372 565 L 412 342 Z"
            fill="url(#tiGoldFoil_{product_type})" filter="url(#goldGleam_{product_type})"/>

      <!-- Thin White Pinstripe Accent next to Gold Ribbon -->
      <line x1="353" y1="168" x2="433" y2="342" stroke="#ffffff" stroke-width="1.2" opacity="0.45"/>
      <line x1="433" y1="342" x2="393" y2="565" stroke="#ffffff" stroke-width="1.2" opacity="0.45"/>

      <!-- Far Left Vertical Gold Foil Ribbon -->
      <rect x="115" y="168" width="18" height="397" fill="url(#tiGoldFoil_{product_type})" />

      <!-- Vertical Text "WORLD SOURCED QUALITY" on Left Gold Bar -->
      <g transform="translate(127, 305) rotate(-90)">
        <text x="0" y="0" fill="#090a0e" font-family="ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="900" font-size="7.5" letter-spacing="1.6">WORLD SOURCED QUALITY</text>
      </g>

      <!-- cGMP Verified Square Badge on Left Gold Bar -->
      <g transform="translate(117, 360)">
        <rect x="0" y="0" width="14" height="42" rx="2" fill="#090a0e" />
        <g transform="translate(10.5, 38) rotate(-90)">
          <text x="0" y="0" fill="#fbbf24" font-family="sans-serif" font-weight="900" font-size="7" letter-spacing="0.5">cGMP</text>
        </g>
      </g>

      <!-- BRAND HEADER (Top Left) -->
      <g transform="translate(148, 192)">
        <!-- Golden Shield with Runner Silhouette -->
        <g filter="url(#goldGleam_{product_type})">
          <polygon points="12,0 24,5 24,18 12,26 0,18 0,5" fill="none" stroke="url(#tiGoldFoil_{product_type})" stroke-width="2.2"/>
          <circle cx="12" cy="7" r="2.2" fill="#ffffff"/>
          <path d="M 10 10 L 14 10 L 16 16 L 12 18 L 8 16 Z" fill="url(#tiGoldFoil_{product_type})"/>
          <path d="M 8 16 L 5 21 M 14 16 L 18 21" stroke="#ffffff" stroke-width="1.6" stroke-linecap="round"/>
        </g>

        <!-- Brand Wordmark "RND" -->
        <text x="32" y="18" fill="#ffffff" font-family="ui-sans-serif, system-ui, -apple-system, sans-serif" font-weight="900" font-size="25" letter-spacing="1.2">R</text>
        <text x="49" y="18" fill="url(#tiGoldText_{product_type})" font-family="ui-sans-serif, system-ui, -apple-system, sans-serif" font-weight="900" font-size="25" letter-spacing="1.2">ND</text>
        <text x="89" y="9" fill="url(#tiGoldText_{product_type})" font-family="sans-serif" font-weight="bold" font-size="8">®</text>
        
        <!-- NUTRITION Sub-text -->
        <text x="32" y="29" fill="#ffffff" font-family="ui-sans-serif, system-ui, -apple-system, sans-serif" font-weight="800" font-size="9" letter-spacing="2.8">NUTRITION</text>
      </g>

      <!-- PRODUCT TITLE SECTION -->
      <g transform="translate(148, 258)">
        <!-- Line 1: TITANIUM (Bold White Athletic Font) -->
        <text x="0" y="0" fill="#ffffff" font-family="ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="900" font-size="33" letter-spacing="1.8">TITANIUM</text>

        <!-- Line 2: SUB-NAME in Brilliant Gold -->
        <text x="0" y="36" fill="url(#tiGoldText_{product_type})" font-family="ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="900" font-size="33" letter-spacing="1.8" filter="url(#goldGleam_{product_type})">{title_line2}</text>

        <!-- Line 3: Product Subtitle in White Clean Uppercase -->
        <text x="0" y="63" fill="#ffffff" font-family="ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="800" font-size="13.5" letter-spacing="0.8">{subtitle}</text>
      </g>

      <!-- CLINICALLY PROVEN 50% HIGHER ABSORPTION GOLD SEAL (Right Side) -->
      <g transform="translate(345, 345)" filter="url(#goldGleam_{product_type})">
        <!-- Outer Glowing Gold Ring -->
        <circle cx="0" cy="0" r="41" fill="#0d0e12" stroke="url(#tiGoldFoil_{product_type})" stroke-width="3"/>
        
        <!-- Toothed/Notched Inner Ring -->
        <circle cx="0" cy="0" r="36" fill="none" stroke="url(#tiGoldFoil_{product_type})" stroke-width="1.2" stroke-dasharray="2.5,2"/>
        <circle cx="0" cy="0" r="33.5" fill="none" stroke="url(#tiGoldFoil_{product_type})" stroke-width="0.8" opacity="0.6"/>

        <!-- Top Curved Arc Text: CLINICALLY PROVEN -->
        <path id="sealArcTop_{product_type}" d="M -30 -6 A 31 31 0 0 1 30 -6" fill="none"/>
        <text fill="url(#tiGoldText_{product_type})" font-family="system-ui, -apple-system, sans-serif" font-weight="800" font-size="6.2" letter-spacing="0.8">
          <textPath href="#sealArcTop_{product_type}" startOffset="50%" text-anchor="middle">CLINICALLY PROVEN</textPath>
        </text>

        <!-- Big Bold Gold: 50% -->
        <text x="0" y="7" fill="url(#tiGoldText_{product_type})" font-family="system-ui, -apple-system, sans-serif" font-weight="900" font-size="22" text-anchor="middle" letter-spacing="-0.5">50%</text>

        <!-- Lower Text: HIGHER ABSORPTION -->
        <text x="0" y="19" fill="url(#tiGoldText_{product_type})" font-family="system-ui, -apple-system, sans-serif" font-weight="900" font-size="7.8" text-anchor="middle" letter-spacing="0.5">HIGHER</text>
        <text x="0" y="28" fill="url(#tiGoldText_{product_type})" font-family="system-ui, -apple-system, sans-serif" font-weight="800" font-size="6.8" text-anchor="middle" letter-spacing="0.6">ABSORPTION</text>
      </g>

      <!-- BOTTOM FEATURE PILLS SECTION -->
      <g transform="translate(148, 396)">
        <!-- Pill 1: Solid Gold Foil Badge -->
        <rect x="0" y="0" width="126" height="28" rx="14" fill="url(#tiGoldFoil_{product_type})" filter="url(#goldGleam_{product_type})"/>
        <rect x="1" y="1" width="124" height="26" rx="13" fill="none" stroke="#ffffff" stroke-width="0.8" opacity="0.4"/>
        <text x="63" y="17.5" fill="#090a0f" font-family="system-ui, -apple-system, sans-serif" font-weight="900" font-size="7" text-anchor="middle" letter-spacing="0.1">{pill1_text}</text>

        <!-- Pill 2: Black Badge with Gold Trim: 28g PROTEIN PER SERVE -->
        <rect x="134" y="0" width="94" height="28" rx="14" fill="#090a0f" stroke="url(#tiGoldFoil_{product_type})" stroke-width="1.5" filter="url(#goldGleam_{product_type})"/>
        <!-- Large 28g -->
        <text x="156" y="19.5" fill="#ffffff" font-family="system-ui, -apple-system, sans-serif" font-weight="900" font-size="14.5">28g</text>
        <!-- Stacked text -->
        <text x="184" y="12" fill="url(#tiGoldText_{product_type})" font-family="system-ui, -apple-system, sans-serif" font-weight="900" font-size="5.8" letter-spacing="0.4">PROTEIN</text>
        <text x="184" y="21" fill="#ffffff" font-family="system-ui, -apple-system, sans-serif" font-weight="800" font-size="5.8" letter-spacing="0.2">PER SERVE</text>
      </g>

      <!-- Bottom Weight Declaration -->
      <g transform="translate(148, 448)">
        <text x="0" y="14" fill="#ffffff" font-family="system-ui, -apple-system, sans-serif" font-weight="700" font-size="12.5" letter-spacing="0.5">Net Weight: 1 kg (2.2 lb)</text>
      </g>

      <!-- Indian Green Vegetarian Hallmark Symbol (Bottom Right) -->
      <g transform="translate(435, 430)">
        <rect x="0" y="0" width="24" height="24" rx="4" fill="#ffffff" stroke="#16a34a" stroke-width="2.2"/>
        <circle cx="12" cy="12" r="5.5" fill="#16a34a"/>
      </g>

      <!-- Fine Top & Bottom Edge Metallic Rims for the Label -->
      <line x1="110" y1="168" x2="490" y2="168" stroke="url(#tiGoldFoil_{product_type})" stroke-width="1.5" opacity="0.8"/>
      <line x1="110" y1="565" x2="490" y2="565" stroke="url(#tiGoldFoil_{product_type})" stroke-width="1.5" opacity="0.8"/>

      <!-- Label Cylindrical Gloss Overlays (Curved Light Highlights) -->
      <path d="M 215 168 L 245 168 L 240 565 L 210 565 Z" fill="#ffffff" opacity="0.1" />
      <path d="M 226 168 L 234 168 L 232 565 L 224 565 Z" fill="#ffffff" opacity="0.18" />
    </g>

    <!-- Overall Soft Studio Ambient Vignette along Left and Right Edges of Tub -->
    <path d="M 115 175 C 115 145, 140 135, 175 135 L 140 135 C 120 145, 115 175, 115 175 L 115 550 C 115 580, 130 595, 150 595 L 130 595 C 115 580, 115 550, 115 550 Z"
          fill="#000000" opacity="0.3" filter="blur(4px)"/>
    <path d="M 485 175 C 485 145, 460 135, 425 135 L 460 135 C 480 145, 485 175, 485 175 L 485 550 C 485 580, 470 595, 450 595 L 470 595 C 485 580, 485 550, 485 550 Z"
          fill="#000000" opacity="0.3" filter="blur(4px)"/>
  </g>
</svg>'''

# Generate all 4 individual packaging files
tubs = [
    {
        'file': 'public/rnd-whey-concentrate.svg',
        'type': 'wpc',
        'title2': 'CORE WPC',
        'subtitle': 'PREMIUM WHEY CONCENTRATE',
        'pill1': 'PREMIUM WHEY CONCENTRATE'
    },
    {
        'file': 'public/rnd-whey-isolate.svg',
        'type': 'iso',
        'title2': 'ISO ZERO',
        'subtitle': '100% WHEY ISOLATE',
        'pill1': '100% WHEY ISOLATE'
    },
    {
        'file': 'public/rnd-whey-blend.svg',
        'type': 'blend',
        'title2': 'DUAL BLEND',
        'subtitle': 'WHEY ISOLATE + CONCENTRATE',
        'pill1': 'WHEY ISOLATE + CONCENTRATE BLEND'
    },
    {
        'file': 'public/rnd-yeast-protein.svg',
        'type': 'yeast',
        'title2': 'YEAST POWER',
        'subtitle': 'PREMIUM YEAST PROTEIN',
        'pill1': 'PREMIUM YEAST PROTEIN'
    }
]

for t in tubs:
    svg_content = generate_jar_svg(t['type'], t['title2'], t['subtitle'], t['pill1'])
    with open(t['file'], 'w') as f:
        f.write(svg_content)
    print(f"Generated {t['file']}")

with open('public/packaging-whey.svg', 'w') as f:
    f.write(generate_jar_svg('iso', 'ISO ZERO', '100% WHEY ISOLATE', '100% WHEY ISOLATE'))
print("Updated public/packaging-whey.svg")

# Also generate the 2x2 Grid composite SVG matching the uploaded image exactly!
# The uploaded image is 2 rows x 2 columns on a pure white / studio backdrop!
grid_svg = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 1360" width="1200" height="1360">
  <defs>
    <!-- Background studio subtle gradient -->
    <radialGradient id="gridStudioBg" cx="50%" cy="50%" r="70%">
      <stop offset="0%" stop-color="#ffffff" />
      <stop offset="70%" stop-color="#f8fafc" />
      <stop offset="100%" stop-color="#f1f5f9" />
    </radialGradient>
  </defs>

  <!-- Clean Studio Floor Background -->
  <rect width="1200" height="1360" fill="url(#gridStudioBg)"/>

  <!-- Subtle Studio Grid Dividers -->
  <line x1="600" y1="40" x2="600" y2="1320" stroke="#e2e8f0" stroke-width="1.5" stroke-dasharray="8,8" opacity="0.6"/>
  <line x1="40" y1="680" x2="1160" y2="680" stroke="#e2e8f0" stroke-width="1.5" stroke-dasharray="8,8" opacity="0.6"/>

  <!-- Top-Left: TITANIUM CORE WPC -->
  <g transform="translate(0, 0)">
    <image href="/rnd-whey-concentrate.svg" x="0" y="0" width="600" height="680" />
  </g>

  <!-- Top-Right: TITANIUM ISO ZERO -->
  <g transform="translate(600, 0)">
    <image href="/rnd-whey-isolate.svg" x="0" y="0" width="600" height="680" />
  </g>

  <!-- Bottom-Left: TITANIUM DUAL BLEND -->
  <g transform="translate(0, 680)">
    <image href="/rnd-whey-blend.svg" x="0" y="0" width="680" height="680" />
  </g>

  <!-- Bottom-Right: TITANIUM YEAST POWER -->
  <g transform="translate(600, 680)">
    <image href="/rnd-yeast-protein.svg" x="0" y="0" width="600" height="680" />
  </g>
</svg>'''

with open('public/rnd-titanium-4pack-grid.svg', 'w') as f:
    f.write(grid_svg)
print("Generated public/rnd-titanium-4pack-grid.svg")

