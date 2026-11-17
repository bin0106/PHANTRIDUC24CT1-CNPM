# -*- coding: utf-8 -*-
import os
import subprocess
import urllib.parse

chrome_path = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
docs_dir = r"D:\24CT1-PHANTRIDUC\docs"

queries = [
    (
        "db_sql_roles_count.png",
        "SELECT role AS `Vai trò`, COUNT(*) AS `Tổng số người dùng`, SUM(CASE WHEN status = 'Active' THEN 1 ELSE 0 END) AS `Đang hoạt động (Active)` FROM users GROUP BY role;"
    ),
    (
        "db_sql_housing_posts_list.png",
        "SELECT h.id AS `Mã tin`, h.name AS `Tiêu đề phòng trọ`, COALESCE(u.name, 'Chủ trọ') AS `Chủ trọ đăng tin`, h.price AS `Giá thuê`, h.area AS `Diện tích`, h.address AS `Địa chỉ phòng`, h.phone AS `Hotline`, h.status AS `Trạng thái` FROM housing h LEFT JOIN users u ON h.user_id = u.id ORDER BY h.id ASC;"
    ),
    (
        "db_sql_posts_summary.png",
        "SELECT 'Phòng trọ cho thuê (housing)' AS `Phân hệ bài đăng`, COUNT(*) AS `Tổng số lượng bài` FROM housing UNION ALL SELECT 'Chợ đồ cũ (marketplace)', COUNT(*) FROM marketplace UNION ALL SELECT 'Quán ăn sinh viên (food_places)', COUNT(*) FROM food_places UNION ALL SELECT 'Tụ điểm vui chơi (entertainment)', COUNT(*) FROM entertainment;"
    )
]

for filename, sql in queries:
    out_path = os.path.join(docs_dir, filename)
    url = "http://localhost/phpmyadmin/index.php?route=/database/sql&db=unilife_db&sql_query=" + urllib.parse.quote(sql)
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

print("All SQL screenshots captured successfully!")
