import subprocess
import os

docs_dir = r"D:\24CT1-PHANTRIDUC\docs"
chrome_path = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
html_path = os.path.join(docs_dir, "so_do_tuan_tu_unilife.html")

with open(html_path, "r", encoding="utf-8") as f:
    content = f.read()

# We can split the SVGs from so_do_tuan_tu_unilife.html
import re
svgs = re.findall(r"(<svg[\s\S]*?<\/svg>)", content)
print(f"Found {len(svgs)} SVGs in so_do_tuan_tu_unilife.html")

names = [
    "sequence_timkiem_phongtro",
    "sequence_dangtin_phongtro",
    "sequence_dangky_ui",
    "sequence_dangnhap_ui"
]

for i, svg in enumerate(svgs):
    name = names[i] if i < len(names) else f"sequence_{i+1}"
    tmp_svg = os.path.join(docs_dir, f"{name}.svg")
    tmp_png = os.path.join(docs_dir, f"{name}.png")
    
    # Save standalone svg with xml declaration
    with open(tmp_svg, "w", encoding="utf-8") as f_out:
        f_out.write('<?xml version="1.0" encoding="UTF-8"?>\n' + svg)
    
    cmd = [
        chrome_path,
        "--headless=new",
        f"--screenshot={tmp_png}",
        "--window-size=1200,900",
        f"file:///{tmp_svg.replace(os.sep, '/')}"
    ]
    res = subprocess.run(cmd, capture_output=True, text=True)
    print(f"Rendered {name}.png: exists={os.path.exists(tmp_png)}, size={os.path.getsize(tmp_png) if os.path.exists(tmp_png) else 0}")
