import subprocess
import os

chrome_path = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
svg_path = r"D:\24CT1-PHANTRIDUC\docs\architecture_unilife_xampp.svg"
png_path = r"D:\24CT1-PHANTRIDUC\docs\architecture_unilife_xampp.png"

cmd = [
    chrome_path,
    "--headless=new",
    f"--screenshot={png_path}",
    "--window-size=1600,1000",
    f"file:///{svg_path.replace(os.sep, '/')}"
]
res = subprocess.run(cmd, capture_output=True, text=True)
print("Rendered architecture:", os.path.exists(png_path), "Size:", os.path.getsize(png_path) if os.path.exists(png_path) else 0)
