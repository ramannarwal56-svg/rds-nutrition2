import os

def get_cap_ribs(cx, y1, y2, rx):
    ribs = []
    step = 9
    start = int(cx - rx + 10)
    end = int(cx + rx - 10)
    for x in range(start, end, step):
        dist = abs(x - cx) / rx
        groove_w = "2.4" if dist < 0.7 else "1.8"
        ribs.append(f'''        <line x1="{x}" y1="{y1}" x2="{x}" y2="{y2}" stroke="#060709" stroke-width="{groove_w}"/>
        <line x1="{x+1.5}" y1="{y1}" x2="{x+1.5}" y2="{y2}" stroke="#384252" stroke-width="1.0" opacity="0.75"/>''')
    return '\n'.join(ribs)

def generate_product_svg(cfg):
    pid = cfg['id']
    title = cfg['title']
    desc = cfg['desc']
    specs = cfg.get('specs', ['28g Protein Per Serve', '100% whey'])
    weight = cfg.get('weight', '1 kg')
    platform_type = cfg.get('platform', 'concrete_metal')
    form = cfg.get('form', '1kg_bottle')  # '1kg_bottle', '3kg_jug', 'small_bottle'

    # Platform definitions
    if platform_type == 'slate_wood':
        platform_markup = f'''
    <!-- Dark Slate and Wood Platform -->
    <g>
      <!-- Base: Rich Dark Wood Surface -->
      <path d="M 30 585 L 570 585 L 590 665 L 10 665 Z" fill="url(#woodBase_{pid})" />
      <!-- Subtle Wood Grain Lines -->
      <line x1="40" y1="605" x2="560" y2="605" stroke="#3d2817" stroke-width="1.5" opacity="0.4" />
      <line x1="25" y1="625" x2="575" y2="625" stroke="#1c120a" stroke-width="1.8" opacity="0.5" />
      <line x1="15" y1="645" x2="585" y2="645" stroke="#4a321d" stroke-width="1.2" opacity="0.3" />

      <!-- Top Slab: Dark Chiseled Slate Stone -->
      <path d="M 45 572 L 555 572 L 565 588 L 35 588 Z" fill="url(#slateTop_{pid})" />
      <line x1="45" y1="572" x2="555" y2="572" stroke="#64748b" stroke-width="1.2" opacity="0.8" />
      <line x1="35" y1="588" x2="565" y2="588" stroke="#090d16" stroke-width="1.5" />

      <!-- Soft Floor Reflection on Slate -->
      <ellipse cx="300" cy="575" rx="140" ry="7" fill="#ffffff" opacity="0.12" filter="blur(4px)" />

      <!-- Contact Occlusion Shadow -->
      <ellipse cx="300" cy="582" rx="165" ry="14" fill="#000000" fill-opacity="0.75" filter="blur(6px)"/>
      <ellipse cx="300" cy="579" rx="135" ry="5" fill="#000000" fill-opacity="0.95" filter="blur(2px)"/>
    </g>'''
    else: # concrete_metal
        platform_markup = f'''
    <!-- Grey Concrete and Brushed Metal Platform -->
    <g>
      <!-- Grey Concrete Pedestal -->
      <path d="M 30 585 L 570 585 L 590 665 L 10 665 Z" fill="url(#concreteBase_{pid})" />
      <path d="M 30 585 L 570 585 L 590 665 L 10 665 Z" fill="url(#concreteNoise_{pid})" />

      <!-- Brushed Metal Top Platform -->
      <rect x="45" y="574" width="510" height="12" rx="2" fill="url(#brushedMetal_{pid})" />
      <line x1="45" y1="574" x2="555" y2="574" stroke="#ffffff" stroke-width="1.2" opacity="0.7" />
      <line x1="45" y1="586" x2="555" y2="586" stroke="#0f172a" stroke-width="1.5" />

      <!-- Soft Floor Reflection on Brushed Metal -->
      <ellipse cx="300" cy="578" rx="145" ry="6" fill="#ffffff" opacity="0.16" filter="blur(4px)" />

      <!-- Contact Occlusion Shadow -->
      <ellipse cx="300" cy="584" rx="165" ry="14" fill="#000000" fill-opacity="0.75" filter="blur(6px)"/>
      <ellipse cx="300" cy="581" rx="135" ry="5" fill="#000000" fill-opacity="0.95" filter="blur(2px)"/>
    </g>'''

    # Form-factor geometry parameters
    if form == '3kg_jug':
        # Wider, muscular jug with heavy base
        body_path = 'M 95 200 C 95 155, 130 142, 180 142 L 420 142 C 470 142, 505 155, 505 200 L 505 540 C 505 572, 470 588, 420 588 L 180 588 C 130 588, 95 572, 95 540 Z'
        clip_path = body_path
        neck_path = 'M 170 142 L 430 142 L 410 108 L 190 108 Z'
        cap_w, cap_h = 246, 62
        cap_x, cap_y = 177, 46
        lip_w, lip_h = 254, 10
        lip_x, lip_y = 173, 100
        cx = 300
        ribs = get_cap_ribs(cx, 52, 100, 116)
        label_y1, label_y2 = 175, 558
        label_h = label_y2 - label_y1
        diag_x_top = 370
        diag_x_bot = 360
        diag_x_knee = 425
        title_size = 28
        seal_x, seal_y = 380, 342
        text_x = 138
    elif form == 'small_bottle':
        # Compact, sleek bottle for 100g/250g
        body_path = 'M 135 210 C 135 170, 160 155, 205 155 L 395 155 C 440 155, 465 170, 465 210 L 465 540 C 465 570, 435 586, 395 586 L 205 586 C 165 586, 135 570, 135 540 Z'
        clip_path = body_path
        neck_path = 'M 195 155 L 405 155 L 385 116 L 215 116 Z'
        cap_w, cap_h = 200, 58
        cap_x, cap_y = 200, 58
        lip_w, lip_h = 208, 9
        lip_x, lip_y = 196, 110
        cx = 300
        ribs = get_cap_ribs(cx, 64, 110, 94)
        label_y1, label_y2 = 185, 555
        label_h = label_y2 - label_y1
        diag_x_top = 345
        diag_x_bot = 338
        diag_x_knee = 385
        title_size = 26
        seal_x, seal_y = 340, 345
        text_x = 160
    else: # 1kg_bottle (standard)
        body_path = 'M 115 175 C 115 145, 140 135, 175 135 L 425 135 C 460 135, 485 145, 485 175 L 485 545 C 485 575, 460 590, 420 590 L 180 590 C 140 590, 115 575, 115 545 Z'
        clip_path = body_path
        neck_path = 'M 172 135 L 428 135 L 406 108 L 194 108 Z'
        cap_w, cap_h = 232, 60
        cap_x, cap_y = 184, 46
        lip_w, lip_h = 240, 9
        lip_x, lip_y = 180, 102
        cx = 300
        ribs = get_cap_ribs(cx, 52, 100, 110)
        label_y1, label_y2 = 168, 560
        label_h = label_y2 - label_y1
        diag_x_top = 350
        diag_x_bot = 348
        diag_x_knee = 406
        title_size = 30
        seal_x, seal_y = 358, 342
        text_x = 148

    # Build specs pills
    if len(specs) >= 2:
        spec_pills = f'''
      <!-- Detailed Logos and Text Specs Section -->
      <g transform="translate({text_x}, 385)">
        <rect x="0" y="0" width="128" height="28" rx="14" fill="url(#goldFoil_{pid})" filter="url(#goldEmboss_{pid})"/>
        <text x="64" y="18" fill="#090a0f" font-family="system-ui, -apple-system, sans-serif" font-weight="900" font-size="7" text-anchor="middle" letter-spacing="0.2">{specs[0]}</text>

        <rect x="134" y="0" width="94" height="28" rx="14" fill="#090a0f" stroke="url(#goldFoil_{pid})" stroke-width="1.5" filter="url(#goldEmboss_{pid})"/>
        <text x="156" y="19" fill="#ffffff" font-family="system-ui, -apple-system, sans-serif" font-weight="900" font-size="14">28g</text>
        <text x="183" y="12" fill="url(#goldTypography_{pid})" font-family="system-ui, -apple-system, sans-serif" font-weight="900" font-size="5.5" letter-spacing="0.4">PROTEIN</text>
        <text x="183" y="21" fill="#ffffff" font-family="system-ui, -apple-system, sans-serif" font-weight="800" font-size="5.5" letter-spacing="0.2">PER SERVE</text>
      </g>'''
    else:
        badge_text = specs[0] if specs else 'CLINICAL GRADE'
        spec_pills = f'''
      <!-- Detailed Specs Badge -->
      <g transform="translate({text_x}, 385)">
        <rect x="0" y="0" width="170" height="28" rx="14" fill="url(#goldFoil_{pid})" filter="url(#goldEmboss_{pid})"/>
        <text x="85" y="18" fill="#090a0f" font-family="system-ui, -apple-system, sans-serif" font-weight="900" font-size="8" text-anchor="middle" letter-spacing="0.5">{badge_text}</text>
      </g>'''

    svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 680" width="600" height="680">
  <defs>
    <!-- Softly Blurred Studio Background Gradient -->
    <radialGradient id="studioBlurredBg_{pid}" cx="50%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#374151" />
      <stop offset="45%" stop-color="#1f2937" />
      <stop offset="80%" stop-color="#111827" />
      <stop offset="100%" stop-color="#080c13" />
    </radialGradient>

    <!-- Studio Floor Soft Contact & Ambient Shadows -->
    <filter id="softContactShadow_{pid}" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur in="SourceAlpha" stdDeviation="14" />
      <feOffset dx="0" dy="20" result="offsetblur" />
      <feFlood flood-color="#000000" flood-opacity="0.65" />
      <feComposite in2="offsetblur" operator="in" />
      <feMerge>
        <feMergeNode />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>

    <!-- Brushed Metal Platform Trim Gradient -->
    <linearGradient id="brushedMetal_{pid}" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#475569" />
      <stop offset="15%" stop-color="#94a3b8" />
      <stop offset="30%" stop-color="#cbd5e1" />
      <stop offset="36%" stop-color="#f8fafc" />
      <stop offset="44%" stop-color="#94a3b8" />
      <stop offset="70%" stop-color="#64748b" />
      <stop offset="88%" stop-color="#334155" />
      <stop offset="100%" stop-color="#1e293b" />
    </linearGradient>

    <!-- Grey Concrete Base Gradient -->
    <linearGradient id="concreteBase_{pid}" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#2b323c" />
      <stop offset="25%" stop-color="#1e232a" />
      <stop offset="100%" stop-color="#0f1216" />
    </linearGradient>

    <!-- Concrete Aggregate Noise Pattern -->
    <pattern id="concreteNoise_{pid}" width="60" height="60" patternUnits="userSpaceOnUse">
      <rect width="60" height="60" fill="none"/>
      <circle cx="8" cy="12" r="0.7" fill="#ffffff" opacity="0.1" />
      <circle cx="24" cy="35" r="0.9" fill="#ffffff" opacity="0.08" />
      <circle cx="45" cy="18" r="0.6" fill="#ffffff" opacity="0.12" />
      <circle cx="52" cy="48" r="0.8" fill="#000000" opacity="0.2" />
      <circle cx="14" cy="50" r="1" fill="#000000" opacity="0.25" />
      <circle cx="36" cy="8" r="0.6" fill="#ffffff" opacity="0.09" />
    </pattern>

    <!-- Slate Top Slab Gradient -->
    <linearGradient id="slateTop_{pid}" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#181e26" />
      <stop offset="30%" stop-color="#2d3748" />
      <stop offset="60%" stop-color="#1a202c" />
      <stop offset="100%" stop-color="#0d1117" />
    </linearGradient>

    <!-- Dark Wood Pedestal Gradient -->
    <linearGradient id="woodBase_{pid}" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#2d1b0e" />
      <stop offset="50%" stop-color="#1c1007" />
      <stop offset="100%" stop-color="#0c0603" />
    </linearGradient>

    <!-- Premium Matte Black Body Cylindrical Gradient -->
    <linearGradient id="matteBlackBottle_{pid}" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#090b0e" />
      <stop offset="8%" stop-color="#13161c" />
      <stop offset="20%" stop-color="#222731" />
      <stop offset="30%" stop-color="#384151" />
      <stop offset="35%" stop-color="#556277" />
      <stop offset="42%" stop-color="#2a313e" />
      <stop offset="65%" stop-color="#161920" />
      <stop offset="85%" stop-color="#0d0f14" />
      <stop offset="100%" stop-color="#07080a" />
    </linearGradient>

    <!-- Dark Ribbed Screw Cap Gradient -->
    <linearGradient id="darkRibbedCap_{pid}" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#050608" />
      <stop offset="8%" stop-color="#101318" />
      <stop offset="22%" stop-color="#1e232b" />
      <stop offset="32%" stop-color="#313946" />
      <stop offset="36%" stop-color="#424d5e" />
      <stop offset="42%" stop-color="#222731" />
      <stop offset="75%" stop-color="#0d0f14" />
      <stop offset="100%" stop-color="#040506" />
    </linearGradient>

    <!-- Cap Top Bevel Ring Gradient -->
    <linearGradient id="capTopBevel_{pid}" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#2b3340" />
      <stop offset="100%" stop-color="#0e1116" />
    </linearGradient>

    <!-- Ultra-Luxurious Metallic Gold Foil Gradient -->
    <linearGradient id="goldFoil_{pid}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fffbeb" />
      <stop offset="18%" stop-color="#fde68a" />
      <stop offset="38%" stop-color="#fbbf24" />
      <stop offset="60%" stop-color="#d97706" />
      <stop offset="82%" stop-color="#b45309" />
      <stop offset="100%" stop-color="#78350f" />
    </linearGradient>

    <!-- Metallic Gold Typography Gradient -->
    <linearGradient id="goldTypography_{pid}" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#fbbf24" />
      <stop offset="30%" stop-color="#fef08a" />
      <stop offset="60%" stop-color="#f59e0b" />
      <stop offset="100%" stop-color="#d97706" />
    </linearGradient>

    <!-- Embossed Gold Filter -->
    <filter id="goldEmboss_{pid}" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="2.5" stdDeviation="2.5" flood-color="#000000" flood-opacity="0.55" />
    </filter>

    <!-- Cylindrical Bottle Body Clip -->
    <clipPath id="bottleClip_{pid}">
      <path d="{clip_path}" />
    </clipPath>
  </defs>

  <!-- 1. Softly Blurred Studio Background -->
  <rect width="600" height="680" rx="24" fill="url(#studioBlurredBg_{pid})" />

  <!-- Studio Depth Bokeh Lights -->
  <circle cx="120" cy="140" r="80" fill="#60a5fa" opacity="0.04" filter="blur(40px)" />
  <circle cx="480" cy="180" r="100" fill="#f59e0b" opacity="0.05" filter="blur(50px)" />

  <!-- 2. Custom Textured Platform -->
  {platform_markup}

  <!-- 3. Premium Matte Black Container Assembly -->
  <g filter="url(#softContactShadow_{pid})">

    <!-- Container Body -->
    <path d="{body_path}" fill="url(#matteBlackBottle_{pid})" stroke="#1e293b" stroke-width="1.2"/>

    <!-- Neck Collar -->
    <path d="{neck_path}" fill="url(#darkRibbedCap_{pid})" stroke="#14171f" stroke-width="1"/>

    <!-- Dark Ribbed Screw Cap -->
    <rect x="{lip_x}" y="{lip_y}" width="{lip_w}" height="{lip_h}" rx="3" fill="#0d0f14" stroke="#1f242e" stroke-width="1"/>
    <rect x="{cap_x}" y="{cap_y}" width="{cap_w}" height="{cap_h}" rx="6" fill="url(#darkRibbedCap_{pid})" stroke="#2e3746" stroke-width="1.2"/>

    <!-- Vertical Grooves on Cap -->
    <g stroke-linecap="round">
{ribs}
    </g>

    <!-- Inset Bevel Ring on Cap Top -->
    <ellipse cx="300" cy="47" rx="114" ry="7" fill="url(#capTopBevel_{pid})" stroke="#3b4554" stroke-width="1.5"/>
    <ellipse cx="300" cy="46" rx="95" ry="4" fill="#0b0d11" stroke="#1f242e" stroke-width="1"/>

    <!-- Specular Studio Sheen Stripes -->
    <path d="M 215 135 L 245 135 L 240 590 L 210 590 Z" fill="#ffffff" opacity="0.09" />
    <path d="M 226 135 L 234 135 L 232 590 L 224 590 Z" fill="#ffffff" opacity="0.18" />

    <!-- 4. Detailed Textured Label with Black & White Graphic Pattern -->
    <g clip-path="url(#bottleClip_{pid})">
      <!-- Right Section: Crisp Pure White with Hexagonal Honeycomb Pattern -->
      <rect x="90" y="{label_y1}" width="420" height="{label_h}" fill="#f8fafc" />

      <!-- Faint Light-Grey Hexagonal Honeycomb Pattern -->
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

      <!-- Left Section: Solid Deep Matte Black -->
      <path d="M 90 {label_y1} L {diag_x_top} {label_y1} L {diag_x_knee} 342 L {diag_x_bot} {label_y2} L 90 {label_y2} Z" fill="#08090c" />

      <!-- Metallic Gold Ribbon Dividing Black and White Panels -->
      <path d="M {diag_x_top} {label_y1} L {diag_x_top+18} {label_y1} L {diag_x_knee+18} 342 L {diag_x_bot+18} {label_y2} L {diag_x_bot} {label_y2} L {diag_x_knee} 342 Z"
            fill="url(#goldFoil_{pid})" filter="url(#goldEmboss_{pid})"/>

      <!-- Far Left Gold Vertical Border -->
      <rect x="115" y="{label_y1}" width="14" height="{label_h}" fill="url(#goldFoil_{pid})" />

      <!-- Brand Logo: RND NUTRITION Printed Near the Top -->
      <g transform="translate({text_x}, 194)">
        <!-- Golden Shield with Runner Silhouette -->
        <g filter="url(#goldEmboss_{pid})">
          <polygon points="12,0 24,5 24,18 12,26 0,18 0,5" fill="none" stroke="url(#goldFoil_{pid})" stroke-width="2.2"/>
          <circle cx="12" cy="7" r="2.2" fill="#ffffff"/>
          <path d="M 10 10 L 14 10 L 16 16 L 12 18 L 8 16 Z" fill="url(#goldFoil_{pid})"/>
          <path d="M 8 16 L 5 21 M 14 16 L 18 21" stroke="#ffffff" stroke-width="1.6" stroke-linecap="round"/>
        </g>

        <!-- Brand Wordmark RND -->
        <text x="32" y="18" fill="#ffffff" font-family="ui-sans-serif, system-ui, -apple-system, sans-serif" font-weight="900" font-size="24" letter-spacing="1.2">R</text>
        <text x="49" y="18" fill="url(#goldTypography_{pid})" font-family="ui-sans-serif, system-ui, -apple-system, sans-serif" font-weight="900" font-size="24" letter-spacing="1.2">ND</text>
        <text x="88" y="9" fill="url(#goldTypography_{pid})" font-family="sans-serif" font-weight="bold" font-size="8">®</text>
        
        <!-- NUTRITION Sub-text -->
        <text x="32" y="29" fill="#ffffff" font-family="ui-sans-serif, system-ui, -apple-system, sans-serif" font-weight="800" font-size="9" letter-spacing="2.8">NUTRITION</text>
      </g>

      <!-- Primary Product Name in Large Bold Metallic Gold Typography -->
      <g transform="translate({text_x}, 258)">
        <text x="0" y="0" fill="url(#goldTypography_{pid})" font-family="ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="900" font-size="{title_size}" letter-spacing="1.2" filter="url(#goldEmboss_{pid})">{title}</text>

        <!-- Clean White Product Description Below Name -->
        <text x="0" y="32" fill="#ffffff" font-family="ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="800" font-size="13.5" letter-spacing="0.6">{desc}</text>
      </g>

      <!-- Circular Metallic Gold Badge: Clinically Proven 50% Higher Absorption -->
      <g transform="translate({seal_x}, {seal_y})" filter="url(#goldEmboss_{pid})">
        <!-- Outer Glowing Gold Ring with Toothed Edge -->
        <circle cx="0" cy="0" r="42" fill="#0d0e12" stroke="url(#goldFoil_{pid})" stroke-width="3.2"/>
        <circle cx="0" cy="0" r="37" fill="none" stroke="url(#goldFoil_{pid})" stroke-width="1.4" stroke-dasharray="2.5,2"/>
        <circle cx="0" cy="0" r="34" fill="url(#goldFoil_{pid})"/>

        <!-- Top Curved Arc Text: CLINICALLY PROVEN -->
        <path id="sealArcTop_{pid}" d="M -28 -5 A 28 28 0 0 1 28 -5" fill="none"/>
        <text fill="#090a0f" font-family="system-ui, -apple-system, sans-serif" font-weight="900" font-size="5.8" letter-spacing="0.6">
          <textPath href="#sealArcTop_{pid}" startOffset="50%" text-anchor="middle">CLINICALLY PROVEN</textPath>
        </text>

        <!-- Big Bold Black: 50% -->
        <text x="0" y="8" fill="#090a0f" font-family="system-ui, -apple-system, sans-serif" font-weight="900" font-size="20" text-anchor="middle" letter-spacing="-0.5">50%</text>

        <!-- Lower Text: HIGHER -->
        <text x="0" y="19" fill="#090a0f" font-family="system-ui, -apple-system, sans-serif" font-weight="900" font-size="7.5" text-anchor="middle" letter-spacing="0.5">HIGHER</text>

        <!-- Bottom Curved Arc Text: ABSORPTION -->
        <path id="sealArcBottom_{pid}" d="M -27 12 A 28 28 0 0 0 27 12" fill="none"/>
        <text fill="#090a0f" font-family="system-ui, -apple-system, sans-serif" font-weight="900" font-size="5.5" letter-spacing="0.8">
          <textPath href="#sealArcBottom_{pid}" startOffset="50%" text-anchor="middle">ABSORPTION</textPath>
        </text>
      </g>

      {spec_pills}

      <!-- Net Weight Text Spec Near the Bottom -->
      <g transform="translate({text_x}, 442)">
        <text x="0" y="14" fill="#ffffff" font-family="ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="700" font-size="13" letter-spacing="0.5">Net Weight: {weight}</text>
      </g>

      <!-- Veg Dot (Indian Green Vegetarian Hallmark Symbol) -->
      <g transform="translate(385, 420)">
        <rect x="0" y="0" width="22" height="22" rx="4" fill="#ffffff" stroke="#16a34a" stroke-width="2"/>
        <circle cx="11" cy="11" r="5" fill="#16a34a"/>
      </g>

      <!-- Metallic Edge Highlights -->
      <line x1="90" y1="{label_y1}" x2="510" y2="{label_y1}" stroke="url(#goldFoil_{pid})" stroke-width="1.5" opacity="0.8"/>
      <line x1="90" y1="{label_y2}" x2="510" y2="{label_y2}" stroke="url(#goldFoil_{pid})" stroke-width="1.5" opacity="0.8"/>

      <!-- Specular Gloss Overlays -->
      <path d="M 215 135 L 245 135 L 240 {label_y2} L 210 {label_y2} Z" fill="#ffffff" opacity="0.08" />
      <path d="M 226 135 L 234 135 L 232 {label_y2} L 224 {label_y2} Z" fill="#ffffff" opacity="0.16" />
    </g>

    <!-- Outer Ambient Occlusion on Container Edges -->
    <path d="M 115 175 C 115 145, 140 135, 175 135 L 140 135 C 120 145, 115 175, 115 175 L 115 545 C 115 575, 130 590, 150 590 L 130 590 C 115 575, 115 545, 115 545 Z"
          fill="#000000" opacity="0.35" filter="blur(4px)"/>
    <path d="M 485 175 C 485 145, 460 135, 425 135 L 460 135 C 480 145, 485 175, 485 175 L 485 545 C 485 575, 470 590, 450 590 L 470 590 C 485 575, 485 545, 485 545 Z"
          fill="#000000" opacity="0.35" filter="blur(4px)"/>
  </g>
</svg>'''
    return svg

all_products = [
    # 1. Whey Protein Concentrate (1 kg)
    {
        'id': 'wpc',
        'file': 'public/rnd-whey-concentrate.svg',
        'title': 'TITANIUM CORE WPC',
        'desc': 'PREMIUM WHEY CONCENTRATE',
        'specs': ['100% WHEY', '28g Protein Per Serve'],
        'weight': '1 kg',
        'platform': 'concrete_metal',
        'form': '1kg_bottle'
    },
    # 2. Whey Protein Isolate (1 kg)
    {
        'id': 'iso',
        'file': 'public/rnd-whey-isolate.svg',
        'title': 'TITANIUM PURE ISO',
        'desc': '100% WHEY ISOLATE',
        'specs': ['100% WHEY', '28g Protein Per Serve'],
        'weight': '1 kg',
        'platform': 'concrete_metal',
        'form': '1kg_bottle'
    },
    # 3. Whey Protein Blend (1 kg)
    {
        'id': 'blend',
        'file': 'public/rnd-whey-blend.svg',
        'title': 'TITANIUM DUAL BLEND',
        'desc': 'WHEY ISOLATE + CONCENTRATE',
        'specs': ['100% WHEY', '28g Protein Per Serve'],
        'weight': '1 kg',
        'platform': 'concrete_metal',
        'form': '1kg_bottle'
    },
    # 4. Yeast Protein (1 kg)
    {
        'id': 'yeast',
        'file': 'public/rnd-yeast-protein.svg',
        'title': 'TITANIUM YEAST POWER',
        'desc': 'PREMIUM CLEAN YEAST PROTEIN',
        'specs': ['100% CLEAN PROTEIN', '28g Protein Per Serve'],
        'weight': '1 kg',
        'platform': 'slate_wood',
        'form': '1kg_bottle'
    },
    # 5. Mass Gainer (1 kg)
    {
        'id': 'mass_1kg',
        'file': 'public/rnd-colossus-1kg.svg',
        'title': 'TITANIUM MASS GAINER',
        'desc': 'ADVANCED MASS BUILDING FORMULA',
        'specs': ['CLINICAL GRADE FORMULA'],
        'weight': '1 kg',
        'platform': 'concrete_metal',
        'form': '1kg_bottle'
    },
    # 6. Mass Gainer (3 kg) - Large 3kg jug with wide base
    {
        'id': 'mass_3kg',
        'file': 'public/rnd-colossus.svg',
        'title': 'TITANIUM MASS GAINER',
        'desc': 'ADVANCED MASS BUILDING FORMULA',
        'specs': ['MEGA 3KG JUG FORMULA'],
        'weight': '3 kg',
        'platform': 'concrete_metal',
        'form': '3kg_jug'
    },
    # 7. Creatine Monohydrate (100 g) - Small 100g bottle
    {
        'id': 'creatine',
        'file': 'public/rnd-cre-amp.svg',
        'title': 'TITANIUM CREATINE',
        'desc': 'MICRONIZED MONOHYDRATE',
        'specs': ['200 MESH MICRONIZED'],
        'weight': '100 g',
        'platform': 'concrete_metal',
        'form': 'small_bottle'
    },
    # 8. Pre-Workout Formula (100 g) - Small 100g bottle
    {
        'id': 'preworkout',
        'file': 'public/rnd-ignition-x.svg',
        'title': 'TITANIUM PRE-WORKOUT',
        'desc': 'EXTREME ENERGY FORMULA',
        'specs': ['CLINICAL PUMP MATRIX'],
        'weight': '100 g',
        'platform': 'concrete_metal',
        'form': 'small_bottle'
    },
    # 9. Branched-Chain Amino Acids (BCAA) (100 g) - Small 100g bottle on dark slate and wood
    {
        'id': 'bcaa',
        'file': 'public/rnd-bcaa.svg',
        'title': 'TITANIUM BCAA',
        'desc': 'ESSENTIAL AMINO ACIDS',
        'specs': ['2:1:1 FERMENTED AMINOS'],
        'weight': '100 g',
        'platform': 'slate_wood',
        'form': 'small_bottle'
    },
    # 10. L-Glutamine (250 g) - Small 250g bottle
    {
        'id': 'glutamine',
        'file': 'public/rnd-glutamine.svg',
        'title': 'TITANIUM L-GLUTAMINE',
        'desc': 'PURE RECOVERY AMINO',
        'specs': ['100% PHARMA GRADE'],
        'weight': '250 g',
        'platform': 'concrete_metal',
        'form': 'small_bottle'
    }
]

os.makedirs('public', exist_ok=True)
os.makedirs('dist', exist_ok=True)
os.makedirs('docs', exist_ok=True)

for p in all_products:
    svg_code = generate_product_svg(p)
    with open(p['file'], 'w') as f:
        f.write(svg_code)
    # Also mirror to dist and docs if they exist
    with open(os.path.join('dist', os.path.basename(p['file'])), 'w') as f:
        f.write(svg_code)
    with open(os.path.join('docs', os.path.basename(p['file'])), 'w') as f:
        f.write(svg_code)
    print(f"Rendered {p['title']} -> {p['file']}")

with open('public/packaging-whey.svg', 'w') as f:
    f.write(generate_product_svg(all_products[0]))
with open('dist/packaging-whey.svg', 'w') as f:
    f.write(generate_product_svg(all_products[0]))
with open('docs/packaging-whey.svg', 'w') as f:
    f.write(generate_product_svg(all_products[0]))

print("ALL 10 TITANIUM PRODUCTS GENERATED SUCCESSFULLY!")
