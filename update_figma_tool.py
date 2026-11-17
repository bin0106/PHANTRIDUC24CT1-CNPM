# -*- coding: utf-8 -*-
import os

dir_path = "D:\\24CT1-PHANTRIDUC\\docs"

svg1 = open(os.path.join(dir_path, "Figma_CN1_DangKy.svg"), "r", encoding="utf-8").read()
svg2 = open(os.path.join(dir_path, "Figma_CN2_DangNhap.svg"), "r", encoding="utf-8").read()
svg3 = open(os.path.join(dir_path, "Figma_CN3_TimKiemPhongTro.svg"), "r", encoding="utf-8").read()
svg4 = open(os.path.join(dir_path, "Figma_CN4_DangTinPhongTro.svg"), "r", encoding="utf-8").read()
svg_pert = open(os.path.join(dir_path, "pert_diagram.svg"), "r", encoding="utf-8").read()

html = f"""<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Công cụ Dán Figma — 4 Sơ Đồ Thiết Kế UniLife & Tiến Độ PERT</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap" rel="stylesheet">
  <style>
    * {{ box-sizing: border-box; margin: 0; padding: 0; }}
    body {{
      font-family: 'Plus Jakarta Sans', sans-serif;
      background: #F6F4EE;
      color: #16192E;
      padding: 24px 20px;
      line-height: 1.5;
    }}
    .container {{ max-width: 1440px; margin: 0 auto; }}
    .header-box {{
      background: #16192E;
      color: #fff;
      padding: 24px 30px;
      border-radius: 18px;
      margin-bottom: 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 16px;
      box-shadow: 0 10px 25px rgba(22,25,46,0.15);
    }}
    .header-box h1 {{ font-size: 24px; font-weight: 800; color: #FFF; }}
    .header-box p {{ font-size: 13.5px; color: #FFC145; margin-top: 4px; }}
    .badge-author {{
      background: #FF5D3E;
      color: #fff;
      padding: 8px 16px;
      border-radius: 20px;
      font-weight: 700;
      font-size: 13px;
    }}

    .guide-banner {{
      background: #EFF6FF;
      border: 2px dashed #3B82F6;
      border-radius: 16px;
      padding: 16px 20px;
      margin-bottom: 20px;
      display: flex;
      align-items: center;
      gap: 16px;
    }}
    .guide-steps {{
      display: flex;
      gap: 16px;
      flex-wrap: wrap;
      font-size: 14px;
    }}
    .guide-step-item {{
      display: flex;
      align-items: center;
      gap: 8px;
      font-weight: 600;
      color: #1E40AF;
    }}
    .step-num {{
      width: 26px;
      height: 26px;
      border-radius: 50%;
      background: #3B82F6;
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 13px;
      font-weight: 800;
    }}

    .tabs-bar {{
      display: flex;
      gap: 8px;
      margin-bottom: 20px;
      flex-wrap: wrap;
    }}
    .tab-btn {{
      padding: 12px 18px;
      border-radius: 12px;
      border: 2px solid #ECE7D8;
      background: #FFFFFF;
      font-weight: 700;
      font-size: 13.5px;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 6px;
      color: #6B6A63;
      transition: all 0.2s ease;
    }}
    .tab-btn:hover {{ border-color: #FF5D3E; color: #FF5D3E; }}
    .tab-btn.active {{
      background: #FF5D3E;
      border-color: #FF5D3E;
      color: #FFFFFF;
      box-shadow: 0 4px 14px rgba(255, 93, 62, 0.35);
    }}

    .content-panel {{
      display: none;
      background: #FFFFFF;
      border-radius: 18px;
      border: 1px solid #ECE7D8;
      padding: 24px;
      box-shadow: 0 10px 25px rgba(0,0,0,0.05);
    }}
    .content-panel.active {{ display: block; }}

    .panel-top {{
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 16px;
      margin-bottom: 18px;
      padding-bottom: 16px;
      border-bottom: 2px solid #F6F4EE;
    }}
    .panel-title h2 {{ font-size: 20px; font-weight: 800; color: #16192E; }}
    .panel-title p {{ font-size: 13px; color: #6B6A63; margin-top: 2px; }}

    .btn-copy {{
      background: #0E7C66;
      color: #fff;
      border: none;
      padding: 13px 26px;
      border-radius: 10px;
      font-size: 14.5px;
      font-weight: 800;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 8px;
      transition: all 0.2s ease;
      box-shadow: 0 4px 14px rgba(14, 124, 102, 0.3);
    }}
    .btn-copy:hover {{
      background: #095949;
      transform: translateY(-2px);
    }}
    .btn-copy.copied {{ background: #F59E0B; }}

    .manual-box {{
      margin-bottom: 12px;
      background: #FFFBEB;
      border: 1px solid #FDE68A;
      padding: 10px 14px;
      border-radius: 10px;
      font-size: 13px;
      color: #92400E;
    }}

    .svg-textarea {{
      width: 100%;
      height: 75px;
      font-family: monospace;
      font-size: 11px;
      padding: 8px 12px;
      border-radius: 8px;
      border: 1px solid #CBD5E1;
      background: #F8FAFC;
      color: #475569;
      margin-bottom: 14px;
      resize: vertical;
    }}

    .preview-box {{
      width: 100%;
      height: 620px;
      overflow: auto;
      border-radius: 12px;
      border: 1px solid #E2E8F0;
      background: #F8FAFC;
      padding: 14px;
    }}
    .preview-box svg {{
      width: 100%;
      height: auto;
      display: block;
    }}

    #toast {{
      position: fixed;
      bottom: 24px;
      right: 24px;
      background: #16192E;
      color: #FFFFFF;
      padding: 16px 22px;
      border-radius: 12px;
      font-weight: 700;
      font-size: 14px;
      box-shadow: 0 15px 35px rgba(0,0,0,0.3);
      display: none;
      align-items: center;
      gap: 12px;
      border-left: 6px solid #10B981;
      z-index: 9999;
    }}
  </style>
</head>
<body>

<div class="container">

  <div class="header-box">
    <div>
      <h1>🎨 BỘ 4 SƠ ĐỒ THIẾT KẾ FIGMA RIÊNG BIỆT — UNILIFE</h1>
      <p>Mỗi sơ đồ độc lập gồm: User Flow (FigJam) + Wireframe phác thảo + Mockup chi tiết Design System</p>
    </div>
    <div class="badge-author">Phan Trí Đức — 24CT1</div>
  </div>

  <div class="guide-banner">
    <div style="font-size: 26px;">⚡</div>
    <div>
      <div style="font-weight: 800; font-size: 14px; color: #1E3A8A; margin-bottom: 4px;">CÁCH ĐƯA VÀO FIGMA WEB:</div>
      <div class="guide-steps">
        <div class="guide-step-item">
          <div class="step-num">1</div>
          <span>Bấm nút <b>"BẤM ĐỂ SAO CHÉP MÃ VECTOR"</b> (hoặc kéo file SVG từ thư mục docs vào Figma)</span>
        </div>
        <div class="guide-step-item">
          <div class="step-num">2</div>
          <span>Chuyển sang tab Figma của bạn</span>
        </div>
        <div class="guide-step-item">
          <div class="step-num">3</div>
          <span>Bấm <b>Ctrl + V</b> trên màn hình canvas</span>
        </div>
      </div>
    </div>
  </div>

  <div class="tabs-bar">
    <button class="tab-btn active" onclick="switchTab(0)">
      <span>1️⃣</span> Sơ đồ 1: Đăng Ký Tài Khoản
    </button>
    <button class="tab-btn" onclick="switchTab(1)">
      <span>2️⃣</span> Sơ đồ 2: Đăng Nhập & RBAC
    </button>
    <button class="tab-btn" onclick="switchTab(2)">
      <span>3️⃣</span> Sơ đồ 3: Tìm Kiếm & Lọc Trọ
    </button>
    <button class="tab-btn" onclick="switchTab(3)">
      <span>4️⃣</span> Sơ đồ 4: Đăng Tin Phòng Trọ
    </button>
    <button class="tab-btn" onclick="switchTab(4)">
      <span>📊</span> Sơ đồ Mạng PERT (Đường găng)
    </button>
  </div>

  <!-- PANEL 0 -->
  <div class="content-panel active" id="panel-0">
    <div class="panel-top">
      <div class="panel-title">
        <h2>Sơ đồ Figma Chức năng 1: Đăng ký tài khoản sinh viên</h2>
        <p>Bao gồm trọn vẹn: User Flow FigJam + Wireframe + Mockup UniLife</p>
      </div>
      <button class="btn-copy" onclick="copyTextarea('textarea-svg-0', this)">
        <span>📋</span> SAO CHÉP SƠ ĐỒ 1 VÀO FIGMA
      </button>
    </div>
    <div class="manual-box">
      <span>💡 File gốc: <b>docs/Figma_CN1_DangKy.svg</b>. Bạn có thể kéo thả trực tiếp file này vào tab Figma!</span>
    </div>
    <textarea id="textarea-svg-0" class="svg-textarea" readonly>{svg1}</textarea>
    <div class="preview-box">{svg1}</div>
  </div>

  <!-- PANEL 1 -->
  <div class="content-panel" id="panel-1">
    <div class="panel-top">
      <div class="panel-title">
        <h2>Sơ đồ Figma Chức năng 2: Đăng nhập &amp; Phân quyền RBAC</h2>
        <p>Bao gồm trọn vẹn: User Flow FigJam + Wireframe + Mockup UniLife</p>
      </div>
      <button class="btn-copy" onclick="copyTextarea('textarea-svg-1', this)">
        <span>📋</span> SAO CHÉP SƠ ĐỒ 2 VÀO FIGMA
      </button>
    </div>
    <div class="manual-box">
      <span>💡 File gốc: <b>docs/Figma_CN2_DangNhap.svg</b>. Kéo thả file này vào Figma sẽ tạo Frame thứ 2 độc lập!</span>
    </div>
    <textarea id="textarea-svg-1" class="svg-textarea" readonly>{svg2}</textarea>
    <div class="preview-box">{svg2}</div>
  </div>

  <!-- PANEL 2 -->
  <div class="content-panel" id="panel-2">
    <div class="panel-top">
      <div class="panel-title">
        <h2>Sơ đồ Figma Chức năng 3: Tìm kiếm &amp; Bộ lọc phòng trọ</h2>
        <p>Bao gồm trọn vẹn: User Flow FigJam + Wireframe + Mockup UniLife</p>
      </div>
      <button class="btn-copy" onclick="copyTextarea('textarea-svg-2', this)">
        <span>📋</span> SAO CHÉP SƠ ĐỒ 3 VÀO FIGMA
      </button>
    </div>
    <div class="manual-box">
      <span>💡 File gốc: <b>docs/Figma_CN3_TimKiemPhongTro.svg</b>. Kéo thả file này vào Figma sẽ tạo Frame thứ 3 độc lập!</span>
    </div>
    <textarea id="textarea-svg-2" class="svg-textarea" readonly>{svg3}</textarea>
    <div class="preview-box">{svg3}</div>
  </div>

  <!-- PANEL 3 -->
  <div class="content-panel" id="panel-3">
    <div class="panel-top">
      <div class="panel-title">
        <h2>Sơ đồ Figma Chức năng 4: Đăng tin cho thuê phòng trọ</h2>
        <p>Bao gồm trọn vẹn: User Flow FigJam + Wireframe + Mockup UniLife</p>
      </div>
      <button class="btn-copy" onclick="copyTextarea('textarea-svg-3', this)">
        <span>📋</span> SAO CHÉP SƠ ĐỒ 4 VÀO FIGMA
      </button>
    </div>
    <div class="manual-box">
      <span>💡 File gốc: <b>docs/Figma_CN4_DangTinPhongTro.svg</b>. Kéo thả file này vào Figma sẽ tạo Frame thứ 4 độc lập!</span>
    </div>
    <textarea id="textarea-svg-3" class="svg-textarea" readonly>{svg4}</textarea>
    <div class="preview-box">{svg4}</div>
  </div>

  <!-- PANEL 4 -->
  <div class="content-panel" id="panel-4">
    <div class="panel-top">
      <div class="panel-title">
        <h2>Sơ đồ Mạng PERT / CPM &amp; Đường găng dự án (T = 48 ngày)</h2>
        <p>Sơ đồ 10 sự kiện (0-9) và đường găng đỏ A-C-D-E-H-G-T</p>
      </div>
      <button class="btn-copy" onclick="copyTextarea('textarea-svg-4', this)">
        <span>📋</span> SAO CHÉP SƠ ĐỒ PERT VÀO FIGMA
      </button>
    </div>
    <div class="manual-box">
      <span>💡 File gốc: <b>docs/pert_diagram.svg</b>. Kéo thả file này vào Figma để trình bày sơ đồ tiến độ dự án!</span>
    </div>
    <textarea id="textarea-svg-4" class="svg-textarea" readonly>{svg_pert}</textarea>
    <div class="preview-box">{svg_pert}</div>
  </div>

</div>

<div id="toast">
  <span style="font-size: 20px;">🎉</span>
  <div>
    <div style="font-weight: 800; font-size: 14px;">ĐÃ SAO CHÉP MÃ VECTOR THÀNH CÔNG!</div>
    <div style="font-size: 12px; opacity: 0.9;">Chuyển sang tab Figma và nhấn <b>Ctrl + V</b> để dán.</div>
  </div>
</div>

<script>
  function switchTab(index) {{
    document.querySelectorAll('.tab-btn').forEach((t, i) => t.classList.toggle('active', i === index));
    document.querySelectorAll('.content-panel').forEach((p, i) => p.classList.toggle('active', i === index));
  }}

  async function copyTextarea(textareaId, btn) {{
    const ta = document.getElementById(textareaId);
    ta.focus();
    ta.select();
    
    try {{
      await navigator.clipboard.writeText(ta.value);
    }} catch (e) {{
      document.execCommand('copy');
    }}

    const oldText = btn.innerHTML;
    btn.classList.add('copied');
    btn.innerHTML = '<span>✓</span> ĐÃ SAO CHÉP THÀNH CÔNG!';
    showToast();
    setTimeout(() => {{
      btn.classList.remove('copied');
      btn.innerHTML = oldText;
    }}, 3000);
  }}

  function showToast() {{
    const t = document.getElementById('toast');
    t.style.display = 'flex';
    setTimeout(() => {{ t.style.display = 'none'; }}, 4500);
  }}
</script>

</body>
</html>"""

with open(os.path.join(dir_path, "copy_paste_to_figma.html"), "w", encoding="utf-8") as f:
    f.write(html)

print("Updated copy_paste_to_figma.html successfully!")
