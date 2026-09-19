const fs = require('fs');
const path = require('path');
const QRCode = require('qrcode');

async function main() {
  const publicDir = path.join(__dirname, '..', 'public');
  const assetsDir = path.join(publicDir, 'assets');
  if (!fs.existsSync(assetsDir)) {
    fs.mkdirSync(assetsDir, { recursive: true });
  }

  // 1. Generate QR code SVG for Google Pay UPI: Deepanshu (deepanshugawaridia09@okicici)
  const upiString = 'upi://pay?pa=deepanshugawaridia09@okicici&pn=Deepanshu&mc=5499&tid=RNDORDER&tr=RNDORDER&tn=RND%20Nutrition%20Payment&cu=INR';
  const qrSvgRaw = await QRCode.toString(upiString, {
    type: 'svg',
    margin: 1,
    color: {
      dark: '#000000',
      light: '#ffffff'
    }
  });

  const upiCardSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 780" width="600" height="780">
  <defs>
    <linearGradient id="gpayHeaderGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#1e293b" />
      <stop offset="100%" stop-color="#0f172a" />
    </linearGradient>
    <linearGradient id="goldAccent" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fef08a" />
      <stop offset="50%" stop-color="#f59e0b" />
      <stop offset="100%" stop-color="#d97706" />
    </linearGradient>
    <filter id="cardShadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="16" stdDeviation="20" flood-color="#000000" flood-opacity="0.6" />
    </filter>
  </defs>

  <rect width="600" height="780" rx="32" fill="#f0f4f9" stroke="#cbd5e1" stroke-width="2"/>

  <!-- Top User Profile Section -->
  <g transform="translate(60, 45)">
    <!-- Avatar circle -->
    <circle cx="36" cy="36" r="34" fill="#15803d" />
    <text x="36" y="47" fill="#ffffff" font-family="system-ui, -apple-system, sans-serif" font-weight="800" font-size="32" text-anchor="middle">D</text>

    <!-- Names -->
    <text x="88" y="32" fill="#0f172a" font-family="system-ui, -apple-system, sans-serif" font-weight="900" font-size="26">Deepanshu</text>
    <text x="88" y="56" fill="#64748b" font-family="system-ui, -apple-system, sans-serif" font-weight="600" font-size="14">RND Nutrition Official Store</text>
  </g>

  <!-- Main White Card Container with QR Code -->
  <g filter="url(#cardShadow)">
    <rect x="60" y="130" width="480" height="500" rx="24" fill="#ffffff" stroke="#e2e8f0" stroke-width="1.5"/>
  </g>

  <!-- QR Code Injection in center -->
  <g transform="translate(140, 160) scale(0.8)">
    ${qrSvgRaw.replace(/<svg[^>]*>|<\/svg>/g, '')}
  </g>

  <!-- Google Pay Center Icon on QR -->
  <g transform="translate(300, 320)">
    <circle cx="0" cy="0" r="24" fill="#ffffff" stroke="#cbd5e1" stroke-width="1"/>
    <text x="0" y="7" fill="#4285f4" font-family="system-ui, -apple-system, sans-serif" font-weight="900" font-size="20" text-anchor="middle">G</text>
  </g>

  <!-- UPI ID Strip -->
  <g transform="translate(300, 520)">
    <text x="0" y="0" fill="#64748b" font-family="system-ui, -apple-system, sans-serif" font-weight="600" font-size="14" text-anchor="middle">UPI ID: <tspan fill="#0f172a" font-weight="800">deepanshugawaridia09@okicici</tspan></text>
  </g>

  <!-- Scan with any UPI app text -->
  <g transform="translate(300, 580)">
    <rect x="-150" y="-22" width="300" height="40" rx="20" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1"/>
    <text x="0" y="3" fill="#334155" font-family="system-ui, -apple-system, sans-serif" font-weight="700" font-size="12" text-anchor="middle">Scan to pay with any UPI app</text>
  </g>

  <!-- Supported Apps Strip -->
  <g transform="translate(100, 660)">
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
  <text x="300" y="730" fill="#64748b" font-family="system-ui, -apple-system, sans-serif" font-size="13" text-anchor="middle">Direct WhatsApp Confirmation • Lab Dispatch</text>
</svg>`;

  // Read the exact user reference SVGs
  const packaging1Svg = fs.readFileSync(path.join(publicDir, 'rnd-cre-amp.svg'), 'utf-8');
  const packaging2Svg = fs.readFileSync(path.join(publicDir, 'rnd-ignition-x.svg'), 'utf-8');

  // Write SVG files
  fs.writeFileSync(path.join(publicDir, 'WhatsApp Image 2026-09-15 at 12.31.29 PM.jpeg'), upiCardSvg);
  fs.writeFileSync(path.join(publicDir, 'Screenshot 2026-09-13 080857.jpg'), packaging1Svg);
  fs.writeFileSync(path.join(publicDir, 'Screenshot 2026-09-13 080910.jpg'), packaging2Svg);

  fs.writeFileSync(path.join(assetsDir, 'WhatsApp Image 2026-09-15 at 12.31.29 PM.jpeg'), upiCardSvg);
  fs.writeFileSync(path.join(assetsDir, 'Screenshot 2026-09-13 080857.jpg'), packaging1Svg);
  fs.writeFileSync(path.join(assetsDir, 'Screenshot 2026-09-13 080910.jpg'), packaging2Svg);

  fs.writeFileSync(path.join(publicDir, 'upi-qr.svg'), upiCardSvg);
  fs.writeFileSync(path.join(publicDir, 'packaging-whey.svg'), packaging1Svg);
  fs.writeFileSync(path.join(publicDir, 'packaging-supp.svg'), packaging2Svg);

  console.log('Asset generation complete.');
}

main().catch(console.error);
