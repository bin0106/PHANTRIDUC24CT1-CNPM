import os
import subprocess
import time

chrome_path = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
docs_dir = r"D:\24CT1-PHANTRIDUC\docs"

screens = [
    ("web_1_trang_chu", "http://localhost/unilife/#/home"),
    ("web_2_tim_kiem_phong_tro", "http://localhost/unilife/#/housing"),
    ("web_3_quan_an_sinh_vien", "http://localhost/unilife/#/food"),
    ("web_4_cho_do_cu", "http://localhost/unilife/#/market"),
    ("web_5_vui_choi_giai_tri", "http://localhost/unilife/#/entertainment"),
    ("web_6_goc_hoc_tap", "http://localhost/unilife/#/study"),
    ("web_7_dang_ky_tai_khoan", "http://localhost/unilife/#/register"),
    ("web_8_admin_dashboard", "http://localhost/unilife/#/admin")
]

for name, url in screens:
    png_path = os.path.join(docs_dir, f"{name}.png")
    cmd = [
        chrome_path,
        "--headless=new",
        f"--screenshot={png_path}",
        "--window-size=1400,920",
        "--hide-scrollbars",
        url
    ]
    res = subprocess.run(cmd, capture_output=True, text=True)
    size = os.path.getsize(png_path) if os.path.exists(png_path) else 0
    print(f"Captured {name}.png: size={size} bytes, url={url}")
