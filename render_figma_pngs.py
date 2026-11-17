import subprocess
import os

files = [
    "Figma_CN1_DangKy",
    "Figma_CN2_DangNhap",
    "Figma_CN3_TimKiemPhongTro",
    "Figma_CN4_DangTinPhongTro"
]

docs_dir = r"D:\24CT1-PHANTRIDUC\docs"
chrome_path = r"C:\Program Files\Google\Chrome\Application\chrome.exe"

for name in files:
    svg_path = os.path.join(docs_dir, f"{name}.svg")
    png_path = os.path.join(docs_dir, f"{name}.png")
    
    cmd = [
        chrome_path,
        "--headless=new",
        f"--screenshot={png_path}",
        "--window-size=1920,1100",
        f"file:///{svg_path.replace(os.sep, '/')}"
    ]
    res = subprocess.run(cmd, capture_output=True, text=True)
    print(f"Rendered {name}: returncode={res.returncode}, exists={os.path.exists(png_path)}, size={os.path.getsize(png_path) if os.path.exists(png_path) else 0}")
    if res.stderr:
        print("Stderr:", res.stderr)
