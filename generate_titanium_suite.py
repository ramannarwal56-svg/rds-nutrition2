import re

# Read each of the 4 SVGs and extract their defs and body groups
tubs = [
    ('wpc', 'public/rnd-whey-concentrate.svg', 0, 0),
    ('iso', 'public/rnd-whey-isolate.svg', 600, 0),
    ('blend', 'public/rnd-whey-blend.svg', 0, 680),
    ('yeast', 'public/rnd-yeast-protein.svg', 600, 680)
]

all_defs = []
all_bodies = []

for tag, path, ox, oy in tubs:
    with open(path, 'r') as f:
        content = f.read()
    
    # Extract defs
    m_defs = re.search(r'<defs>(.*?)</defs>', content, re.DOTALL)
    if m_defs:
        all_defs.append(m_defs.group(1))
    
    # Extract all elements inside svg except defs
    body = re.sub(r'<\?xml.*?\?>', '', content)
    body = re.sub(r'<svg[^>]*>', '', body)
    body = re.sub(r'</svg>', '', body)
    body = re.sub(r'<defs>.*?</defs>', '', body, flags=re.DOTALL)
    
    all_bodies.append(f'<g transform="translate({ox}, {oy})">{body}</g>')

# Build self-contained 2x2 grid SVG
grid_svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 1360" width="1200" height="1360">
  <defs>
    <radialGradient id="gridStudioBg" cx="50%" cy="50%" r="70%">
      <stop offset="0%" stop-color="#ffffff" />
      <stop offset="70%" stop-color="#f8fafc" />
      <stop offset="100%" stop-color="#f1f5f9" />
    </radialGradient>
    {''.join(all_defs)}
  </defs>

  <!-- Clean Studio Floor Background -->
  <rect width="1200" height="1360" fill="url(#gridStudioBg)"/>

  <!-- Subtle Studio Grid Dividers -->
  <line x1="600" y1="30" x2="600" y2="1330" stroke="#cbd5e1" stroke-width="1.2" stroke-dasharray="6,6" opacity="0.7"/>
  <line x1="30" y1="680" x2="1170" y2="680" stroke="#cbd5e1" stroke-width="1.2" stroke-dasharray="6,6" opacity="0.7"/>

  <!-- 4 Tubs in 2x2 Grid -->
  {''.join(all_bodies)}
</svg>'''

with open('public/rnd-titanium-4pack-grid.svg', 'w') as f:
    f.write(grid_svg)
print("Updated self-contained public/rnd-titanium-4pack-grid.svg")

# Also create a horizontal 4-jar studio lineup showcase (1200x520) for hero / wide banners
h_bodies = []
# 4 jars side by side: scale to 0.72 and place at x=20, 310, 600, 890
h_tubs = [
    ('wpc', 'public/rnd-whey-concentrate.svg', 10, -20),
    ('iso', 'public/rnd-whey-isolate.svg', 305, -20),
    ('blend', 'public/rnd-whey-blend.svg', 600, -20),
    ('yeast', 'public/rnd-yeast-protein.svg', 895, -20)
]

for tag, path, ox, oy in h_tubs:
    with open(path, 'r') as f:
        content = f.read()
    body = re.sub(r'<\?xml.*?\?>', '', content)
    body = re.sub(r'<svg[^>]*>', '', body)
    body = re.sub(r'</svg>', '', body)
    body = re.sub(r'<defs>.*?</defs>', '', body, flags=re.DOTALL)
    h_bodies.append(f'<g transform="translate({ox}, {oy}) scale(0.72)">{body}</g>')

lineup_svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1320 520" width="1320" height="520">
  <defs>
    <radialGradient id="lineupStudioBg" cx="50%" cy="40%" r="70%">
      <stop offset="0%" stop-color="#ffffff" />
      <stop offset="70%" stop-color="#f8fafc" />
      <stop offset="100%" stop-color="#f1f5f9" />
    </radialGradient>
    {''.join(all_defs)}
  </defs>

  <rect width="1320" height="520" fill="url(#lineupStudioBg)" rx="16"/>

  <!-- Subtle Studio Horizon Line -->
  <line x1="40" y1="440" x2="1280" y2="440" stroke="#e2e8f0" stroke-width="1.5" stroke-dasharray="6,6"/>

  {''.join(h_bodies)}
</svg>'''

with open('public/rnd-lineup-showcase.svg', 'w') as f:
    f.write(lineup_svg)
print("Updated public/rnd-lineup-showcase.svg")

