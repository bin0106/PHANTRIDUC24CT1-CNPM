# -*- coding: utf-8 -*-
import subprocess, os

chrome_path = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
docs_dir = r"D:\24CT1-PHANTRIDUC\docs"

targets = [
    ("db_sql_roles_count.png", "http://localhost/phpmyadmin/index.php?route=/sql&db=unilife_db&table=v_role_counts&pos=0"),
    ("db_sql_housing_posts_list.png", "http://localhost/phpmyadmin/index.php?route=/sql&db=unilife_db&table=v_housing_posts_list&pos=0"),
    ("db_sql_posts_summary.png", "http://localhost/phpmyadmin/index.php?route=/sql&db=unilife_db&table=v_posts_summary&pos=0")
]

for filename, url in targets:
    out_path = os.path.join(docs_dir, filename)
    cmd = [
        chrome_path,
        "--headless=new",
        "--disable-gpu",
        "--no-sandbox",
        "--window-size=1440,900",
        "--virtual-time-budget=4000",
        f"--screenshot={out_path}",
        url
    ]
    subprocess.run(cmd, check=True)
    print(f"Captured {filename}: {os.path.getsize(out_path)} bytes")

print("All 3 views captured successfully!")
