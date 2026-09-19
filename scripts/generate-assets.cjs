const fs = require('fs');
const path = require('path');
const QRCode = require('qrcode');

async function main() {
  const publicDir = path.join(__dirname, '..', 'public');
  const assetsDir = path.join(publicDir, 'assets');
  if (!fs.existsSync(assetsDir)) {
    fs.mkdirSync(assetsDir, { recursive: true });
  }

  // 1. Generate QR code SVG for UPI
  const upiString = 'upi://pay?pa=9306667128@upi&pn=RDS%20Nutrition&mc=5499&tid=RDS9306667128&tr=RDSORDER&tn=RDS%20Nutrition%20Payment&cu=INR';
  const qrSvgRaw = await QRCode.toString(upiString, {
    type: 'svg',
    margin: 1,
    color: {
      dark: '#000000',
      light: '#ffffff'
    }
  });

  // Extract inner SVG content or wrap it in a sleek card
  const upiCardSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 780" width="600" height="780">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0f172a" />
      <stop offset="100%" stop-color="#020617" />
    </linearGradient>
    <linearGradient id="headerGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#10b981" />
      <stop offset="100%" stop-color="#06b6d4" />
    </linearGradient>
    <filter id="dropShadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="12" stdDeviation="16" flood-color="#000000" flood-opacity="0.5" />
    </filter>
  </defs>

  <!-- Background card -->
  <rect width="600" height="780" rx="28" fill="url(#bgGrad)" stroke="#1e293b" stroke-width="2"/>

  <!-- Brand Header -->
  <rect x="0" y="0" width="600" height="110" rx="28" fill="url(#headerGrad)"/>
  <rect x="0" y="80" width="600" height="30" fill="url(#headerGrad)"/>
  
  <text x="300" y="55" fill="#ffffff" font-family="system-ui, -apple-system, sans-serif" font-weight="900" font-size="28" text-anchor="middle" letter-spacing="2">RDS NUTRITION</text>
  <text x="300" y="85" fill="#e2e8f0" font-family="system-ui, -apple-system, sans-serif" font-weight="600" font-size="14" text-anchor="middle" letter-spacing="1">OFFICIAL UPI PAYMENT GATEWAY</text>

  <!-- Merchant Info Badge -->
  <rect x="40" y="130" width="520" height="75" rx="16" fill="#1e293b" stroke="#334155" stroke-width="1.5"/>
  <circle cx="80" cy="167" r="22" fill="#10b981" fill-opacity="0.2"/>
  <path d="M72 167 L78 173 L89 161" fill="none" stroke="#10b981" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
  <text x="115" y="160" fill="#f8fafc" font-family="system-ui, -apple-system, sans-serif" font-weight="700" font-size="18">RDS Nutrition Official Store</text>
  <text x="115" y="184" fill="#94a3b8" font-family="system-ui, -apple-system, sans-serif" font-weight="500" font-size="14">UPI ID: <tspan fill="#38bdf8" font-weight="700">9306667128@upi</tspan></text>

  <!-- QR Container White Box -->
  <g filter="url(#dropShadow)">
    <rect x="75" y="225" width="450" height="420" rx="24" fill="#ffffff"/>
  </g>
  
  <text x="300" y="260" fill="#475569" font-family="system-ui, -apple-system, sans-serif" font-weight="700" font-size="13" text-anchor="middle" letter-spacing="1">SCAN &amp; PAY WITH ANY UPI APP</text>

  <!-- QR Code Injection -->
  <g transform="translate(130, 275) scale(0.76)">
    ${qrSvgRaw.replace(/<svg[^>]*>|<\/svg>/g, '')}
  </g>

  <!-- Supported Apps Strip -->
  <g transform="translate(100, 605)">
    <text x="10" y="15" fill="#64748b" font-family="system-ui, -apple-system, sans-serif" font-weight="600" font-size="11">ACCEPTED APPS:</text>
    <rect x="110" y="2" width="65" height="22" rx="6" fill="#5f259f"/>
    <text x="142" y="17" fill="#ffffff" font-family="sans-serif" font-size="10" font-weight="bold" text-anchor="middle">PhonePe</text>
    
    <rect x="185" y="2" width="70" height="22" rx="6" fill="#1a73e8"/>
    <text x="220" y="17" fill="#ffffff" font-family="sans-serif" font-size="10" font-weight="bold" text-anchor="middle">GooglePay</text>
    
    <rect x="265" y="2" width="60" height="22" rx="6" fill="#002e6e"/>
    <text x="295" y="17" fill="#ffffff" font-family="sans-serif" font-size="10" font-weight="bold" text-anchor="middle">Paytm</text>

    <rect x="335" y="2" width="55" height="22" rx="6" fill="#e65100"/>
    <text x="362" y="17" fill="#ffffff" font-family="sans-serif" font-size="10" font-weight="bold" text-anchor="middle">BHIM</text>
  </g>

  <!-- Footer support note -->
  <text x="300" y="685" fill="#94a3b8" font-family="system-ui, -apple-system, sans-serif" font-size="13" text-anchor="middle">After payment, confirm on WhatsApp to dispatch order instantly</text>
  <text x="300" y="710" fill="#10b981" font-family="system-ui, -apple-system, sans-serif" font-weight="600" font-size="13" text-anchor="middle">Support &amp; WhatsApp: +91 9306667128</text>
</svg>`;

  // 2. Packaging 1: Screenshot 2026-09-13 080857.jpg (Whey Protein)
  const packaging1Svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="600" height="600">
  <defs>
    <linearGradient id="p1Tub" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#0f172a" />
      <stop offset="30%" stop-color="#1e293b" />
      <stop offset="70%" stop-color="#334155" />
      <stop offset="100%" stop-color="#0f172a" />
    </linearGradient>
    <linearGradient id="p1Lid" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#090d16" />
      <stop offset="40%" stop-color="#1e293b" />
      <stop offset="60%" stop-color="#334155" />
      <stop offset="100%" stop-color="#090d16" />
    </linearGradient>
    <linearGradient id="cyanStripe" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#10b981" />
      <stop offset="50%" stop-color="#06b6d4" />
      <stop offset="100%" stop-color="#3b82f6" />
    </linearGradient>
    <radialGradient id="halo" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#10b981" stop-opacity="0.35"/>
      <stop offset="100%" stop-color="#10b981" stop-opacity="0"/>
    </radialGradient>
    <filter id="tubShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="25" stdDeviation="25" flood-color="#000000" flood-opacity="0.8"/>
    </filter>
  </defs>

  <!-- Ambient Glow -->
  <circle cx="300" cy="320" r="240" fill="url(#halo)"/>

  <!-- Shadow below container -->
  <ellipse cx="300" cy="530" rx="190" ry="24" fill="#000000" fill-opacity="0.75" filter="blur(10px)"/>

  <g filter="url(#tubShadow)">
    <!-- Lid Ribs / Grip -->
    <rect x="200" y="100" width="200" height="50" rx="8" fill="url(#p1Lid)" stroke="#475569" stroke-width="1.5"/>
    <line x1="210" y1="100" x2="210" y2="150" stroke="#64748b" stroke-width="2"/>
    <line x1="230" y1="100" x2="230" y2="150" stroke="#64748b" stroke-width="2"/>
    <line x1="250" y1="100" x2="250" y2="150" stroke="#64748b" stroke-width="2"/>
    <line x1="270" y1="100" x2="270" y2="150" stroke="#64748b" stroke-width="2"/>
    <line x1="290" y1="100" x2="290" y2="150" stroke="#64748b" stroke-width="2"/>
    <line x1="310" y1="100" x2="310" y2="150" stroke="#64748b" stroke-width="2"/>
    <line x1="330" y1="100" x2="330" y2="150" stroke="#64748b" stroke-width="2"/>
    <line x1="350" y1="100" x2="350" y2="150" stroke="#64748b" stroke-width="2"/>
    <line x1="370" y1="100" x2="370" y2="150" stroke="#64748b" stroke-width="2"/>
    <line x1="390" y1="100" x2="390" y2="150" stroke="#64748b" stroke-width="2"/>

    <!-- Neck -->
    <path d="M 185 150 L 415 150 L 440 190 L 160 190 Z" fill="url(#p1Lid)"/>

    <!-- Tub Body -->
    <rect x="145" y="190" width="310" height="330" rx="24" fill="url(#p1Tub)" stroke="#334155" stroke-width="2"/>

    <!-- Metallic Specular reflection line -->
    <rect x="220" y="190" width="35" height="330" fill="#ffffff" fill-opacity="0.08"/>

    <!-- Label Banner Background -->
    <rect x="155" y="225" width="290" height="260" rx="14" fill="#090d16" stroke="#1e293b" stroke-width="1.5"/>

    <!-- Diagonal Accent -->
    <path d="M 155 270 L 445 230 L 445 250 L 155 290 Z" fill="url(#cyanStripe)"/>

    <!-- RDS Logo -->
    <text x="300" y="270" fill="#ffffff" font-family="system-ui, -apple-system, sans-serif" font-weight="900" font-size="34" text-anchor="middle" letter-spacing="4">RDS</text>
    <text x="300" y="295" fill="#38bdf8" font-family="system-ui, -apple-system, sans-serif" font-weight="700" font-size="14" text-anchor="middle" letter-spacing="2">NUTRITION</text>

    <!-- Product Title -->
    <text x="300" y="340" fill="#f8fafc" font-family="system-ui, -apple-system, sans-serif" font-weight="800" font-size="20" text-anchor="middle">WHEY PROTEIN</text>
    <text x="300" y="365" fill="#10b981" font-family="system-ui, -apple-system, sans-serif" font-weight="700" font-size="14" text-anchor="middle" letter-spacing="1">CONCENTRATE / ISOLATE</text>

    <!-- Key Metrics Grid -->
    <rect x="175" y="385" width="75" height="42" rx="8" fill="#1e293b"/>
    <text x="212" y="405" fill="#ffffff" font-family="sans-serif" font-weight="bold" font-size="13" text-anchor="middle">24G</text>
    <text x="212" y="419" fill="#94a3b8" font-family="sans-serif" font-size="9" text-anchor="middle">PROTEIN</text>

    <rect x="262" y="385" width="75" height="42" rx="8" fill="#1e293b"/>
    <text x="300" y="405" fill="#ffffff" font-family="sans-serif" font-weight="bold" font-size="13" text-anchor="middle">5.5G</text>
    <text x="300" y="419" fill="#94a3b8" font-family="sans-serif" font-size="9" text-anchor="middle">BCAA</text>

    <rect x="350" y="385" width="75" height="42" rx="8" fill="#1e293b"/>
    <text x="387" y="405" fill="#ffffff" font-family="sans-serif" font-weight="bold" font-size="13" text-anchor="middle">ZERO</text>
    <text x="387" y="419" fill="#94a3b8" font-family="sans-serif" font-size="9" text-anchor="middle">SUGAR</text>

    <text x="300" y="462" fill="#cbd5e1" font-family="system-ui, -apple-system, sans-serif" font-weight="600" font-size="12" text-anchor="middle">NET WEIGHT: 1 KG (2.2 LBS)</text>
  </g>
</svg>`;

  // 3. Packaging 2: Screenshot 2026-09-13 080910.jpg (Mass Gainer / Yeast / Supplements)
  const packaging2Svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="600" height="600">
  <defs>
    <linearGradient id="p2Tub" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#18181b" />
      <stop offset="25%" stop-color="#27272a" />
      <stop offset="75%" stop-color="#3f3f46" />
      <stop offset="100%" stop-color="#18181b" />
    </linearGradient>
    <linearGradient id="p2Lid" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#09090b" />
      <stop offset="50%" stop-color="#27272a" />
      <stop offset="100%" stop-color="#09090b" />
    </linearGradient>
    <linearGradient id="amberStripe" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#f59e0b" />
      <stop offset="50%" stop-color="#ea580c" />
      <stop offset="100%" stop-color="#e11d48" />
    </linearGradient>
    <radialGradient id="amberHalo" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#f59e0b" stop-opacity="0.3"/>
      <stop offset="100%" stop-color="#f59e0b" stop-opacity="0"/>
    </radialGradient>
    <filter id="tubShadow2" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="25" stdDeviation="25" flood-color="#000000" flood-opacity="0.8"/>
    </filter>
  </defs>

  <!-- Ambient Glow -->
  <circle cx="300" cy="320" r="240" fill="url(#amberHalo)"/>

  <!-- Shadow below container -->
  <ellipse cx="300" cy="530" rx="190" ry="24" fill="#000000" fill-opacity="0.75" filter="blur(10px)"/>

  <g filter="url(#tubShadow2)">
    <!-- Lid -->
    <rect x="200" y="100" width="200" height="50" rx="8" fill="url(#p2Lid)" stroke="#52525b" stroke-width="1.5"/>
    <line x1="220" y1="100" x2="220" y2="150" stroke="#71717a" stroke-width="2"/>
    <line x1="250" y1="100" x2="250" y2="150" stroke="#71717a" stroke-width="2"/>
    <line x1="280" y1="100" x2="280" y2="150" stroke="#71717a" stroke-width="2"/>
    <line x1="320" y1="100" x2="320" y2="150" stroke="#71717a" stroke-width="2"/>
    <line x1="350" y1="100" x2="350" y2="150" stroke="#71717a" stroke-width="2"/>
    <line x1="380" y1="100" x2="380" y2="150" stroke="#71717a" stroke-width="2"/>

    <!-- Neck -->
    <path d="M 185 150 L 415 150 L 440 190 L 160 190 Z" fill="url(#p2Lid)"/>

    <!-- Tub Body -->
    <rect x="145" y="190" width="310" height="330" rx="24" fill="url(#p2Tub)" stroke="#52525b" stroke-width="2"/>

    <!-- Specular highlight -->
    <rect x="225" y="190" width="30" height="330" fill="#ffffff" fill-opacity="0.07"/>

    <!-- Label Banner Background -->
    <rect x="155" y="225" width="290" height="260" rx="14" fill="#09090b" stroke="#27272a" stroke-width="1.5"/>

    <!-- Amber stripe -->
    <path d="M 155 240 L 445 275 L 445 295 L 155 260 Z" fill="url(#amberStripe)"/>

    <!-- RDS Logo -->
    <text x="300" y="270" fill="#ffffff" font-family="system-ui, -apple-system, sans-serif" font-weight="900" font-size="34" text-anchor="middle" letter-spacing="4">RDS</text>
    <text x="300" y="295" fill="#f59e0b" font-family="system-ui, -apple-system, sans-serif" font-weight="700" font-size="14" text-anchor="middle" letter-spacing="2">NUTRITION</text>

    <!-- Product Title -->
    <text x="300" y="340" fill="#f8fafc" font-family="system-ui, -apple-system, sans-serif" font-weight="800" font-size="20" text-anchor="middle">MASS GAINER / YEAST</text>
    <text x="300" y="365" fill="#ea580c" font-family="system-ui, -apple-system, sans-serif" font-weight="700" font-size="14" text-anchor="middle" letter-spacing="1">ANABOLIC CALORIE MATRIX</text>

    <!-- Key Metrics Grid -->
    <rect x="175" y="385" width="75" height="42" rx="8" fill="#27272a"/>
    <text x="212" y="405" fill="#ffffff" font-family="sans-serif" font-weight="bold" font-size="13" text-anchor="middle">380</text>
    <text x="212" y="419" fill="#a1a1aa" font-family="sans-serif" font-size="9" text-anchor="middle">KCAL</text>

    <rect x="262" y="385" width="75" height="42" rx="8" fill="#27272a"/>
    <text x="300" y="405" fill="#ffffff" font-family="sans-serif" font-weight="bold" font-size="13" text-anchor="middle">72G</text>
    <text x="300" y="419" fill="#a1a1aa" font-family="sans-serif" font-size="9" text-anchor="middle">CARBS</text>

    <rect x="350" y="385" width="75" height="42" rx="8" fill="#27272a"/>
    <text x="387" y="405" fill="#ffffff" font-family="sans-serif" font-weight="bold" font-size="13" text-anchor="middle">22G</text>
    <text x="387" y="419" fill="#a1a1aa" font-family="sans-serif" font-size="9" text-anchor="middle">PROTEIN</text>

    <text x="300" y="462" fill="#d4d4d8" font-family="system-ui, -apple-system, sans-serif" font-weight="600" font-size="12" text-anchor="middle">CLEAN CALORIES • MAXIMUM BULK</text>
  </g>
</svg>`;

  // Write SVG files
  fs.writeFileSync(path.join(publicDir, 'WhatsApp Image 2026-09-15 at 12.31.29 PM.jpeg'), upiCardSvg);
  fs.writeFileSync(path.join(publicDir, 'Screenshot 2026-09-13 080857.jpg'), packaging1Svg);
  fs.writeFileSync(path.join(publicDir, 'Screenshot 2026-09-13 080910.jpg'), packaging2Svg);

  fs.writeFileSync(path.join(assetsDir, 'WhatsApp Image 2026-09-15 at 12.31.29 PM.jpeg'), upiCardSvg);
  fs.writeFileSync(path.join(assetsDir, 'Screenshot 2026-09-13 080857.jpg'), packaging1Svg);
  fs.writeFileSync(path.join(assetsDir, 'Screenshot 2026-09-13 080910.jpg'), packaging2Svg);

  // Also write .svg versions for crisp vector rendering fallback
  fs.writeFileSync(path.join(publicDir, 'upi-qr.svg'), upiCardSvg);
  fs.writeFileSync(path.join(publicDir, 'packaging-whey.svg'), packaging1Svg);
  fs.writeFileSync(path.join(publicDir, 'packaging-supp.svg'), packaging2Svg);

  console.log('Asset generation complete.');
}

main().catch(console.error);
