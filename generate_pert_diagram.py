# -*- coding: utf-8 -*-
import subprocess
import os

svg_content = """<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2200 680" width="2200" height="680" font-family="'Segoe UI', Arial, sans-serif">
  <defs>
    <!-- Arrow marker default -->
    <marker id="arr-gray" markerWidth="9" markerHeight="7" refX="8" refY="3.5" orient="auto">
      <polygon points="0 0, 9 3.5, 0 7" fill="#475569"/>
    </marker>
    <!-- Arrow marker critical (Red) -->
    <marker id="arr-red" markerWidth="10" markerHeight="8" refX="9" refY="4" orient="auto">
      <polygon points="0 0, 10 4, 0 8" fill="#DC2626"/>
    </marker>
    <filter id="node-shadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="3" stdDeviation="4" flood-color="#000000" flood-opacity="0.12"/>
    </filter>
  </defs>

  <!-- Background -->
  <rect width="2200" height="680" fill="#FFFFFF"/>

  <!-- Title bar -->
  <rect x="30" y="20" width="2140" height="60" rx="10" fill="#1E293B"/>
  <text x="60" y="56" font-size="22" font-weight="800" fill="#FFFFFF">SƠ ĐỒ MẠNG TIẾN ĐỘ DỰ ÁN UNILIFE (PERT / CPM NETWORK DIAGRAM)</text>
  <text x="1750" y="56" font-size="15" font-weight="700" fill="#38BDF8">Tổng thời gian T = 48 (ngày) • Đường găng A-C-D-E-H-G-T</text>

  <!-- Legend -->
  <rect x="30" y="95" width="2140" height="42" rx="8" fill="#F8FAFC" stroke="#E2E8F0"/>
  <line x1="60" y1="116" x2="110" y2="116" stroke="#DC2626" stroke-width="3.5" marker-end="url(#arr-red)"/>
  <text x="120" y="121" font-size="13" font-weight="700" fill="#DC2626">Đường găng (Critical Path): A → C → D → E → H → H' → G → T (Dự trữ = 0)</text>

  <line x1="720" y1="116" x2="770" y2="116" stroke="#475569" stroke-width="2" marker-end="url(#arr-gray)"/>
  <text x="780" y="121" font-size="13" font-weight="600" fill="#475569">Công việc không găng (Có dự trữ thời gian)</text>

  <line x1="1200" y1="116" x2="1250" y2="116" stroke="#DC2626" stroke-width="2.5" stroke-dasharray="6,4" marker-end="url(#arr-red)"/>
  <text x="1260" y="121" font-size="13" font-weight="600" fill="#DC2626">Cung ảo H' (t=0)</text>

  <circle cx="1500" cy="116" r="10" fill="#FFFFFF" stroke="#1E293B" stroke-width="2"/>
  <text x="1520" y="121" font-size="13" fill="#334155">Đỉnh sự kiện: [Số đỉnh] &amp; [ts / tm]</text>

  <!-- ==================== EDGES / ARROWS ==================== -->

  <!-- 0 -> 1: A(7) CRITICAL -->
  <line x1="120" y1="340" x2="310" y2="225" stroke="#DC2626" stroke-width="3.5" marker-end="url(#arr-red)"/>
  <rect x="180" y="245" width="70" height="26" rx="4" fill="#FEE2E2" stroke="#DC2626" stroke-width="1"/>
  <text x="215" y="263" text-anchor="middle" font-size="14" font-weight="800" fill="#DC2626">A (7)</text>

  <!-- 0 -> 2: B(2) NON-CRITICAL -->
  <line x1="120" y1="375" x2="475" y2="405" stroke="#475569" stroke-width="2" marker-end="url(#arr-gray)"/>
  <rect x="270" y="385" width="65" height="24" rx="4" fill="#F1F5F9" stroke="#94A3B8"/>
  <text x="302" y="402" text-anchor="middle" font-size="13" font-weight="700" fill="#475569">B (2)</text>

  <!-- 1 -> 2: C(6) CRITICAL -->
  <line x1="365" y1="240" x2="480" y2="385" stroke="#DC2626" stroke-width="3.5" marker-end="url(#arr-red)"/>
  <rect x="430" y="295" width="70" height="26" rx="4" fill="#FEE2E2" stroke="#DC2626" stroke-width="1"/>
  <text x="465" y="313" text-anchor="middle" font-size="14" font-weight="800" fill="#DC2626">C (6)</text>

  <!-- 2 -> 3: D(8) CRITICAL -->
  <line x1="535" y1="410" x2="735" y2="410" stroke="#DC2626" stroke-width="3.5" marker-end="url(#arr-red)"/>
  <rect x="605" y="375" width="70" height="26" rx="4" fill="#FEE2E2" stroke="#DC2626" stroke-width="1"/>
  <text x="640" y="393" text-anchor="middle" font-size="14" font-weight="800" fill="#DC2626">D (8)</text>

  <!-- 3 -> 4: E(5) CRITICAL -->
  <line x1="795" y1="410" x2="995" y2="410" stroke="#DC2626" stroke-width="3.5" marker-end="url(#arr-red)"/>
  <rect x="865" y="375" width="70" height="26" rx="4" fill="#FEE2E2" stroke="#DC2626" stroke-width="1"/>
  <text x="900" y="393" text-anchor="middle" font-size="14" font-weight="800" fill="#DC2626">E (5)</text>

  <!-- 4 -> 5: H(4) CRITICAL -->
  <line x1="1045" y1="385" x2="1185" y2="280" stroke="#DC2626" stroke-width="3.5" marker-end="url(#arr-red)"/>
  <rect x="1090" y="305" width="70" height="26" rx="4" fill="#FEE2E2" stroke="#DC2626" stroke-width="1"/>
  <text x="1125" y="323" text-anchor="middle" font-size="14" font-weight="800" fill="#DC2626">H (4)</text>

  <!-- 4 -> 6: F(3) NON-CRITICAL -->
  <line x1="1045" y1="435" x2="1305" y2="535" stroke="#475569" stroke-width="2" marker-end="url(#arr-gray)"/>
  <rect x="1155" y="490" width="65" height="24" rx="4" fill="#F1F5F9" stroke="#94A3B8"/>
  <text x="1187" y="507" text-anchor="middle" font-size="13" font-weight="700" fill="#475569">F (3)</text>

  <!-- 5 -> 7: H'(0) CRITICAL DUMMY -->
  <line x1="1245" y1="260" x2="1515" y2="345" stroke="#DC2626" stroke-width="2.5" stroke-dasharray="6,4" marker-end="url(#arr-red)"/>
  <rect x="1350" y="275" width="65" height="24" rx="4" fill="#FFF1F2" stroke="#DC2626" stroke-dasharray="3,3"/>
  <text x="1382" y="292" text-anchor="middle" font-size="13" font-weight="700" fill="#DC2626">H' (0)</text>

  <!-- 6 -> 7: F'(0) NON-CRITICAL DUMMY -->
  <line x1="1360" y1="520" x2="1515" y2="375" stroke="#475569" stroke-width="1.8" stroke-dasharray="5,4" marker-end="url(#arr-gray)"/>
  <rect x="1445" y="450" width="60" height="22" rx="4" fill="#F8FAFC" stroke="#94A3B8"/>
  <text x="1475" y="466" text-anchor="middle" font-size="12" font-weight="600" fill="#64748B">F' (0)</text>

  <!-- 7 -> 8: G(14) CRITICAL -->
  <line x1="1575" y1="360" x2="1775" y2="360" stroke="#DC2626" stroke-width="3.5" marker-end="url(#arr-red)"/>
  <rect x="1645" y="325" width="75" height="26" rx="4" fill="#FEE2E2" stroke="#DC2626" stroke-width="1"/>
  <text x="1682" y="343" text-anchor="middle" font-size="14" font-weight="800" fill="#DC2626">G (14)</text>

  <!-- 8 -> 9: T(4) CRITICAL -->
  <line x1="1835" y1="360" x2="2035" y2="360" stroke="#DC2626" stroke-width="3.5" marker-end="url(#arr-red)"/>
  <rect x="1905" y="325" width="70" height="26" rx="4" fill="#FEE2E2" stroke="#DC2626" stroke-width="1"/>
  <text x="1940" y="343" text-anchor="middle" font-size="14" font-weight="800" fill="#DC2626">T (4)</text>


  <!-- ==================== NODES ==================== -->

  <!-- NODE 0: Start (Square) -->
  <rect x="60" y="330" width="60" height="60" rx="8" fill="#FFFFFF" stroke="#DC2626" stroke-width="3" filter="url(#node-shadow)"/>
  <text x="90" y="367" text-anchor="middle" font-size="20" font-weight="900" fill="#0F172A">0</text>
  <rect x="60" y="295" width="60" height="26" rx="6" fill="#1E293B"/>
  <text x="90" y="313" text-anchor="middle" font-size="13" font-weight="800" fill="#FFFFFF">0 / 0</text>
  <text x="90" y="412" text-anchor="middle" font-size="12" font-weight="700" fill="#0E7C66">Bắt đầu</text>

  <!-- NODE 1 -->
  <circle cx="340" cy="205" r="30" fill="#FFFFFF" stroke="#DC2626" stroke-width="3" filter="url(#node-shadow)"/>
  <text x="340" y="213" text-anchor="middle" font-size="20" font-weight="900" fill="#0F172A">1</text>
  <rect x="310" y="140" width="60" height="26" rx="6" fill="#DC2626"/>
  <text x="340" y="158" text-anchor="middle" font-size="13" font-weight="800" fill="#FFFFFF">7 / 7</text>

  <!-- NODE 2 -->
  <circle cx="505" cy="410" r="30" fill="#FFFFFF" stroke="#DC2626" stroke-width="3" filter="url(#node-shadow)"/>
  <text x="505" y="418" text-anchor="middle" font-size="20" font-weight="900" fill="#0F172A">2</text>
  <rect x="470" y="455" width="70" height="26" rx="6" fill="#DC2626"/>
  <text x="505" y="473" text-anchor="middle" font-size="13" font-weight="800" fill="#FFFFFF">13 / 13</text>

  <!-- NODE 3 -->
  <circle cx="765" cy="410" r="30" fill="#FFFFFF" stroke="#DC2626" stroke-width="3" filter="url(#node-shadow)"/>
  <text x="765" y="418" text-anchor="middle" font-size="20" font-weight="900" fill="#0F172A">3</text>
  <rect x="730" y="455" width="70" height="26" rx="6" fill="#DC2626"/>
  <text x="765" y="473" text-anchor="middle" font-size="13" font-weight="800" fill="#FFFFFF">21 / 21</text>

  <!-- NODE 4 -->
  <circle cx="1025" cy="410" r="30" fill="#FFFFFF" stroke="#DC2626" stroke-width="3" filter="url(#node-shadow)"/>
  <text x="1025" y="418" text-anchor="middle" font-size="20" font-weight="900" fill="#0F172A">4</text>
  <rect x="990" y="455" width="70" height="26" rx="6" fill="#DC2626"/>
  <text x="1025" y="473" text-anchor="middle" font-size="13" font-weight="800" fill="#FFFFFF">26 / 26</text>

  <!-- NODE 5 -->
  <circle cx="1215" cy="250" r="30" fill="#FFFFFF" stroke="#DC2626" stroke-width="3" filter="url(#node-shadow)"/>
  <text x="1215" y="258" text-anchor="middle" font-size="20" font-weight="900" fill="#0F172A">5</text>
  <rect x="1180" y="185" width="70" height="26" rx="6" fill="#DC2626"/>
  <text x="1215" y="203" text-anchor="middle" font-size="13" font-weight="800" fill="#FFFFFF">30 / 30</text>

  <!-- NODE 6 -->
  <circle cx="1335" cy="545" r="30" fill="#FFFFFF" stroke="#64748B" stroke-width="2.5" filter="url(#node-shadow)"/>
  <text x="1335" y="553" text-anchor="middle" font-size="20" font-weight="900" fill="#0F172A">6</text>
  <rect x="1300" y="590" width="70" height="26" rx="6" fill="#475569"/>
  <text x="1335" y="608" text-anchor="middle" font-size="13" font-weight="700" fill="#FFFFFF">29 / 30</text>
  <text x="1335" y="635" text-anchor="middle" font-size="11" font-weight="700" fill="#B45309">Dự trữ R=1</text>

  <!-- NODE 7 -->
  <circle cx="1545" cy="360" r="30" fill="#FFFFFF" stroke="#DC2626" stroke-width="3" filter="url(#node-shadow)"/>
  <text x="1545" y="368" text-anchor="middle" font-size="20" font-weight="900" fill="#0F172A">7</text>
  <rect x="1510" y="405" width="70" height="26" rx="6" fill="#DC2626"/>
  <text x="1545" y="423" text-anchor="middle" font-size="13" font-weight="800" fill="#FFFFFF">30 / 30</text>

  <!-- NODE 8 -->
  <circle cx="1805" cy="360" r="30" fill="#FFFFFF" stroke="#DC2626" stroke-width="3" filter="url(#node-shadow)"/>
  <text x="1805" y="368" text-anchor="middle" font-size="20" font-weight="900" fill="#0F172A">8</text>
  <rect x="1770" y="405" width="70" height="26" rx="6" fill="#DC2626"/>
  <text x="1805" y="423" text-anchor="middle" font-size="13" font-weight="800" fill="#FFFFFF">44 / 44</text>

  <!-- NODE 9: End (Square) -->
  <rect x="2035" y="330" width="60" height="60" rx="8" fill="#FFFFFF" stroke="#DC2626" stroke-width="3" filter="url(#node-shadow)"/>
  <text x="2065" y="367" text-anchor="middle" font-size="20" font-weight="900" fill="#0F172A">9</text>
  <rect x="2030" y="295" width="70" height="26" rx="6" fill="#DC2626"/>
  <text x="2065" y="313" text-anchor="middle" font-size="13" font-weight="800" fill="#FFFFFF">48 / 48</text>
  <text x="2065" y="412" text-anchor="middle" font-size="12" font-weight="700" fill="#DC2626">Kết thúc</text>

</svg>
"""

svg_path = "D:\\24CT1-PHANTRIDUC\\docs\\pert_diagram.svg"
png_path = "D:\\24CT1-PHANTRIDUC\\docs\\pert_diagram.png"

with open(svg_path, "w", encoding="utf-8") as f:
    f.write(svg_content)

print(f"Created SVG at: {svg_path}")

# Render to PNG using Chrome headless
chrome_cmd = [
    r"C:\Program Files\Google\Chrome\Application\chrome.exe",
    "--headless",
    f"--screenshot={png_path}",
    "--window-size=2200,750",
    f"file:///{svg_path.replace(os.sep, '/')}"
]
res = subprocess.run(chrome_cmd, capture_output=True)
print("Chrome return code:", res.returncode)
print(f"Created PNG at: {png_path}, exists: {os.path.exists(png_path)}")
