# -*- coding: utf-8 -*-
"""
Script cập nhật file Word (.docx) hoàn chỉnh:
- Phần 1 (Mục 4.2): Lập kế hoạch tiến độ PERT & Tìm đường găng (tính toán chi tiết + sơ đồ mạng PERT)
- Phần 2 (Mục 4.1): 4 Sơ đồ Figma riêng biệt cho 4 chức năng (mỗi chức năng gồm User Flow, Wireframe, Mockup)
Sinh viên: Phan Trí Đức - Lớp 24CT1
"""

import os
from docx import Document
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT
from docx.oxml import parse_xml
from docx.oxml.ns import nsdecls

def set_cell_background(cell, fill_hex):
    tcPr = cell._tc.get_or_add_tcPr()
    shd = parse_xml(f'<w:shd {nsdecls("w")} w:fill="{fill_hex}"/>')
    tcPr.append(shd)

def set_cell_margins(cell, top=100, bottom=100, left=150, right=150):
    tcPr = cell._tc.get_or_add_tcPr()
    tcMar = parse_xml(f'<w:tcMar {nsdecls("w")}><w:top w:w="{top}" w:type="dxa"/><w:bottom w:w="{bottom}" w:type="dxa"/><w:left w:w="{left}" w:type="dxa"/><w:right w:w="{right}" w:type="dxa"/></w:tcMar>')
    tcPr.append(tcMar)

def create_report():
    doc = Document()

    # Page setup - Margins 2cm
    for section in doc.sections:
        section.top_margin = Inches(0.8)
        section.bottom_margin = Inches(0.8)
        section.left_margin = Inches(0.8)
        section.right_margin = Inches(0.8)

    # Base font
    style = doc.styles['Normal']
    font = style.font
    font.name = 'Times New Roman'
    font.size = Pt(12)
    font.color.rgb = RGBColor(0x16, 0x19, 0x2E)

    # =========================================================================
    # TRANG BÌA (COVER PAGE)
    # =========================================================================
    p = doc.add_paragraph()
    p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    run = p.add_run("BỘ GIÁO DỤC VÀ ĐÀO TẠO\nTRƯỜNG ĐẠI HỌC KIẾN TRÚC ĐÀ NẴNG\nKHOA CÔNG NGHỆ THÔNG TIN")
    run.font.size = Pt(13)
    run.font.bold = True
    run.font.color.rgb = RGBColor(0x1E, 0x29, 0x3B)

    p_div = doc.add_paragraph()
    p_div.alignment = WD_ALIGN_PARAGRAPH.CENTER
    r_div = p_div.add_run("-------------------***-------------------")
    r_div.font.size = Pt(11)
    r_div.font.color.rgb = RGBColor(0x94, 0xA3, 0xB8)

    doc.add_paragraph().paragraph_format.space_after = Pt(40)

    p_title = doc.add_paragraph()
    p_title.alignment = WD_ALIGN_PARAGRAPH.CENTER
    r_title = p_title.add_run("BÁO CÁO BÀI TẬP LỚN\nMÔN: CÔNG NGHỆ PHẦN MỀM / THIẾT KẾ PHẦN MỀM\n")
    r_title.font.size = Pt(18)
    r_title.font.bold = True
    r_title.font.color.rgb = RGBColor(0x0E, 0x7C, 0x66)

    r_sub = p_title.add_run("ĐỀ TÀI: NỀN TẢNG HỖ TRỢ ĐỜI SỐNG SINH VIÊN UNILIFE\n")
    r_sub.font.size = Pt(15)
    r_sub.font.bold = True
    r_sub.font.color.rgb = RGBColor(0xFF, 0x5D, 0x3E)

    r_topic = p_title.add_run("(GỒM: 4.1 BỘ 4 SƠ ĐỒ THIẾT KẾ UI/UX FIGMA & 4.2 TIẾN ĐỘ DỰ ÁN PERT - ĐƯỜNG GĂNG)")
    r_topic.font.size = Pt(13)
    r_topic.font.italic = True
    r_topic.font.color.rgb = RGBColor(0x47, 0x55, 0x69)

    doc.add_paragraph().paragraph_format.space_after = Pt(80)

    # Info table
    table_info = doc.add_table(rows=4, cols=2)
    table_info.alignment = WD_TABLE_ALIGNMENT.CENTER
    info_data = [
        ("Giảng viên hướng dẫn:", "Giảng viên bộ môn Công nghệ Phần mềm"),
        ("Sinh viên thực hiện:", "PHAN TRÍ ĐỨC"),
        ("Mã lớp chuyên ngành:", "24CT1"),
        ("Năm học:", "2026")
    ]
    for i, (k, v) in enumerate(info_data):
        row = table_info.rows[i]
        c0, c1 = row.cells[0], row.cells[1]
        c0.width = Inches(2.5)
        c1.width = Inches(3.5)
        
        p0 = c0.paragraphs[0]
        r0 = p0.add_run(k)
        r0.font.bold = True
        r0.font.size = Pt(12)
        
        p1 = c1.paragraphs[0]
        r1 = p1.add_run(v)
        r1.font.bold = (i == 1 or i == 2)
        r1.font.size = Pt(12)
        if i == 1:
            r1.font.color.rgb = RGBColor(0xFF, 0x5D, 0x3E)

    doc.add_page_break()

    # =========================================================================
    # LỜI MỞ ĐẦU
    # =========================================================================
    h1 = doc.add_heading("LỜI MỞ ĐẦU", level=1)
    h1.runs[0].font.color.rgb = RGBColor(0x16, 0x19, 0x2E)
    h1.runs[0].font.size = Pt(16)
    h1.runs[0].font.bold = True

    p = doc.add_paragraph()
    p.paragraph_format.line_spacing = 1.3
    p.paragraph_format.space_after = Pt(8)
    p.add_run(
        "Báo cáo này được thực hiện trong khuôn khổ học phần Thiết kế phần mềm / Công nghệ phần mềm, "
        "tập trung giải quyết trọn vẹn 2 yêu cầu của đề tài nghiên cứu:\n"
        "1. Mục 4.2 - Lập kế hoạch tiến độ dự án bằng phương pháp PERT & Tìm đường găng (Critical Path Method - CPM): "
        "Áp dụng các công thức tính thời gian sớm nhất ts(i), thời gian muộn nhất tm(i), tính độ dự trữ sự kiện và công việc, "
        "xây dựng sơ đồ mạng PERT trực quan và xác định đường găng để tối ưu hóa tiến độ dự án UniLife.\n"
        "2. Mục 4.1 - Thiết kế phần mềm UI/UX các chức năng của đề tài: "
        "Xây dựng thành 4 SƠ ĐỒ FIGMA RIÊNG BIỆT cho 4 chức năng cốt lõi của website UniLife. Mỗi sơ đồ là một bảng thiết kế độc lập "
        "hoàn chỉnh đầy đủ 3 bước: User Flow (Luồng người dùng phong cách FigJam) → Wireframe (Phác thảo bố cục) → Mockup (Thiết kế chi tiết theo Design System)."
    )

    doc.add_paragraph().paragraph_format.space_after = Pt(12)

    # =========================================================================
    # PHẦN 1: BÀI TẬP 4.2 - LẬP TIẾN ĐỘ PERT & TÌM ĐƯỜNG GĂNG
    # =========================================================================
    h_sec1 = doc.add_heading("PHẦN 1: BÀI TẬP 4.2 — LẬP KẾ HOẠCH TIẾN ĐỘ DỰ ÁN (PERT) VÀ TÌM ĐƯỜNG GĂNG", level=1)
    h_sec1.runs[0].font.color.rgb = RGBColor(0x0E, 0x7C, 0x66)
    h_sec1.runs[0].font.size = Pt(15)
    h_sec1.runs[0].font.bold = True

    # 1.1 Đề bài
    h2 = doc.add_heading("1.1. Đề bài: Bảng công việc dự án phần mềm UniLife", level=2)
    h2.runs[0].font.color.rgb = RGBColor(0x1E, 0x29, 0x3B)
    h2.runs[0].font.size = Pt(13)

    p = doc.add_paragraph("Bảng danh mục 9 công việc chính trong dự án xây dựng hệ thống website UniLife theo đề bài:")
    p.paragraph_format.space_after = Pt(6)

    table_tasks = doc.add_table(rows=10, cols=5)
    table_tasks.alignment = WD_TABLE_ALIGNMENT.CENTER
    headers = ["STT", "Tên công việc", "Ký hiệu", "Thời gian (t)", "Công việc tiên quyết"]
    for j, h in enumerate(headers):
        cell = table_tasks.rows[0].cells[j]
        set_cell_background(cell, "1E293B")
        set_cell_margins(cell, 120, 120, 150, 150)
        p = cell.paragraphs[0]
        p.alignment = WD_ALIGN_PARAGRAPH.CENTER
        r = p.add_run(h)
        r.font.bold = True
        r.font.size = Pt(11)
        r.font.color.rgb = RGBColor(0xFF, 0xFF, 0xFF)

    tasks_raw = [
        ("1", "Tìm hiểu & Cài đặt framework", "A", "7 ngày", "-"),
        ("2", "Design giao diện framework", "B", "2 ngày", "-"),
        ("3", "Thu thập đề tài & trang mẫu", "C", "6 ngày", "A"),
        ("4", "Phân tích yêu cầu chức năng", "D", "8 ngày", "B, C"),
        ("5", "Thiết kế các sơ đồ UML", "E", "5 ngày", "C, D (sau D)"),
        ("6", "Thiết kế cơ sở dữ liệu", "F", "3 ngày", "E"),
        ("7", "Thiết kế giao diện UI/UX", "H", "4 ngày", "D, E (sau E)"),
        ("8", "Lập trình ứng dụng UniLife", "G", "14 ngày", "H (và F qua cung ảo)"),
        ("9", "Triển khai ứng dụng UniLife", "T", "4 ngày", "G"),
    ]

    for i, row_data in enumerate(tasks_raw):
        row = table_tasks.rows[i+1]
        bg_col = "F8FAFC" if i % 2 == 0 else "FFFFFF"
        for j, val in enumerate(row_data):
            cell = row.cells[j]
            set_cell_background(cell, bg_col)
            set_cell_margins(cell, 100, 100, 120, 120)
            p = cell.paragraphs[0]
            if j in [0, 2, 3]:
                p.alignment = WD_ALIGN_PARAGRAPH.CENTER
            else:
                p.alignment = WD_ALIGN_PARAGRAPH.LEFT
            r = p.add_run(val)
            r.font.size = Pt(11)
            if j == 2:
                r.font.bold = True
                r.font.color.rgb = RGBColor(0xFF, 0x5D, 0x3E)

    doc.add_paragraph().paragraph_format.space_after = Pt(12)

    # 1.2 Công thức áp dụng
    h2 = doc.add_heading("1.2. Cơ sở lý thuyết và Công thức áp dụng (Theo Slide 4.2)", level=2)
    h2.runs[0].font.color.rgb = RGBColor(0x1E, 0x29, 0x3B)
    h2.runs[0].font.size = Pt(13)

    p = doc.add_paragraph()
    p.paragraph_format.line_spacing = 1.3
    p.add_run("Áp dụng đúng các công thức trong bài giảng Slide 4.2:\n\n").font.bold = True
    
    r = p.add_run("1. Thời gian sớm nhất của mỗi đỉnh (Forward Pass từ đỉnh bắt đầu đến kết thúc):\n")
    r.font.bold = True
    r.font.color.rgb = RGBColor(0x0E, 0x7C, 0x66)
    p.add_run("• Sự kiện đỉnh bắt đầu (đỉnh 0):  ")
    p.add_run("ts(0) = 0\n").font.bold = True
    p.add_run("• Sự kiện đỉnh i (i = 1 ÷ n):  ")
    p.add_run("ts(i) = max { ts(đầu công việc) + t(công việc) }\n\n").font.bold = True

    r = p.add_run("2. Thời gian muộn nhất của mỗi đỉnh (Backward Pass từ đỉnh kết thúc về bắt đầu):\n")
    r.font.bold = True
    r.font.color.rgb = RGBColor(0x0E, 0x7C, 0x66)
    p.add_run("• Sự kiện đỉnh kết thúc (đỉnh n):  ")
    p.add_run("tm(n) = ts(n)\n").font.bold = True
    p.add_run("• Sự kiện đỉnh i:  ")
    p.add_run("tm(i) = min { tm(đỉnh cuối công việc) - t(công việc) }\n\n").font.bold = True

    r = p.add_run("3. Thời gian dự trữ của sự kiện đỉnh i:\n")
    r.font.bold = True
    p.add_run("• ")
    p.add_run("Ri = tm(i) - ts(i)\n").font.bold = True
    p.add_run("• Đỉnh găng là đỉnh có Ri = 0 (tức ts(i) = tm(i)).\n\n")

    r = p.add_run("4. Thời gian dự trữ toàn phần (Total Float - TF) của công việc (i → j):\n")
    r.font.bold = True
    p.add_run("• ")
    p.add_run("TF(ij) = tm(j) - ts(i) - tij\n").font.bold = True
    p.add_run("• Công việc găng là công việc có TF(ij) = 0.")

    doc.add_paragraph().paragraph_format.space_after = Pt(12)

    # 1.3 Tính toán chi tiết
    h2 = doc.add_heading("1.3. Các bước tính toán chi tiết từng đỉnh sự kiện", level=2)
    h2.runs[0].font.color.rgb = RGBColor(0x1E, 0x29, 0x3B)
    h2.runs[0].font.size = Pt(13)

    p_fwd = doc.add_paragraph()
    p_fwd.paragraph_format.line_spacing = 1.3
    r = p_fwd.add_run("A. Tính thời gian sớm nhất ts(i) (Forward Pass từ đỉnh 0 → 9):\n")
    r.font.bold = True
    r.font.color.rgb = RGBColor(0x1E, 0x40, 0xAF)

    steps_ts = [
        ("Đỉnh 0 (Khởi tạo bắt đầu):", "ts(0) = 0"),
        ("Đỉnh 1 (Đến từ đỉnh 0 bởi công việc A, tA = 7):", "ts(1) = ts(0) + tA = 0 + 7 = 7"),
        ("Đỉnh 2 (Đến từ 0 bởi B(2) và từ 1 bởi C(6)):", "ts(2) = max { ts(0) + tB,  ts(1) + tC } = max { 0 + 2,  7 + 6 } = max(2, 13) = 13"),
        ("Đỉnh 3 (Đến từ đỉnh 2 bởi công việc D, tD = 8):", "ts(3) = ts(2) + tD = 13 + 8 = 21"),
        ("Đỉnh 4 (Đến từ đỉnh 3 bởi công việc E, tE = 5):", "ts(4) = ts(3) + tE = 21 + 5 = 26"),
        ("Đỉnh 5 (Đến từ đỉnh 4 bởi công việc H, tH = 4):", "ts(5) = ts(4) + tH = 26 + 4 = 30"),
        ("Đỉnh 6 (Đến từ đỉnh 4 bởi công việc F, tF = 3):", "ts(6) = ts(4) + tF = 26 + 3 = 29"),
        ("Đỉnh 7 (Hội tụ cung ảo H' từ 5 và F' từ 6):", "ts(7) = max { ts(5) + tH',  ts(6) + tF' } = max { 30 + 0,  29 + 0 } = max(30, 29) = 30"),
        ("Đỉnh 8 (Đến từ đỉnh 7 bởi công việc G, tG = 14):", "ts(8) = ts(7) + tG = 30 + 14 = 44"),
        ("Đỉnh 9 (Đến từ đỉnh 8 bởi công việc T, tT = 4):", "ts(9) = ts(8) + tT = 44 + 4 = 48 (Thời gian hoàn thành dự án)")
    ]
    for desc, calc in steps_ts:
        p_item = doc.add_paragraph()
        p_item.paragraph_format.left_indent = Inches(0.2)
        p_item.paragraph_format.space_after = Pt(2)
        p_item.add_run(f"• {desc}  ")
        r_c = p_item.add_run(calc)
        r_c.font.bold = True
        r_c.font.color.rgb = RGBColor(0x0E, 0x7C, 0x66)

    doc.add_paragraph().paragraph_format.space_after = Pt(8)

    p_bwd = doc.add_paragraph()
    p_bwd.paragraph_format.line_spacing = 1.3
    r = p_bwd.add_run("B. Tính thời gian muộn nhất tm(i) (Backward Pass từ đỉnh 9 → 0):\n")
    r.font.bold = True
    r.font.color.rgb = RGBColor(0x99, 0x1B, 0x1B)

    steps_tm = [
        ("Đỉnh 9 (Sự kiện kết thúc dự án):", "tm(9) = ts(9) = 48"),
        ("Đỉnh 8 (Đi đến 9 bởi công việc T, tT = 4):", "tm(8) = tm(9) - tT = 48 - 4 = 44"),
        ("Đỉnh 7 (Đi đến 8 bởi công việc G, tG = 14):", "tm(7) = tm(8) - tG = 44 - 14 = 30"),
        ("Đỉnh 6 (Đi đến 7 bởi cung ảo F', tF' = 0):", "tm(6) = tm(7) - tF' = 30 - 0 = 30"),
        ("Đỉnh 5 (Đi đến 7 bởi cung ảo H', tH' = 0):", "tm(5) = tm(7) - tH' = 30 - 0 = 30"),
        ("Đỉnh 4 (Đi đến 5 bởi H(4) và đến 6 bởi F(3)):", "tm(4) = min { tm(5) - tH,  tm(6) - tF } = min { 30 - 4,  30 - 3 } = min(26, 27) = 26"),
        ("Đỉnh 3 (Đi đến 4 bởi công việc E, tE = 5):", "tm(3) = tm(4) - tE = 26 - 5 = 21"),
        ("Đỉnh 2 (Đi đến 3 bởi công việc D, tD = 8):", "tm(2) = tm(3) - tD = 21 - 8 = 13"),
        ("Đỉnh 1 (Đi đến 2 bởi công việc C, tC = 6):", "tm(1) = tm(2) - tC = 13 - 6 = 7"),
        ("Đỉnh 0 (Đi đến 1 bởi A(7) và đến 2 bởi B(2)):", "tm(0) = min { tm(1) - tA,  tm(2) - tB } = min { 7 - 7,  13 - 2 } = min(0, 11) = 0")
    ]
    for desc, calc in steps_tm:
        p_item = doc.add_paragraph()
        p_item.paragraph_format.left_indent = Inches(0.2)
        p_item.paragraph_format.space_after = Pt(2)
        p_item.add_run(f"• {desc}  ")
        r_c = p_item.add_run(calc)
        r_c.font.bold = True
        r_c.font.color.rgb = RGBColor(0x99, 0x1B, 0x1B)

    doc.add_paragraph().paragraph_format.space_after = Pt(12)

    # 1.4 Bảng tổng hợp
    h2 = doc.add_heading("1.4. Bảng tổng hợp các thông số tiến độ công việc và sự kiện", level=2)
    h2.runs[0].font.color.rgb = RGBColor(0x1E, 0x29, 0x3B)
    h2.runs[0].font.size = Pt(13)

    table_detail = doc.add_table(rows=12, cols=9)
    table_detail.alignment = WD_TABLE_ALIGNMENT.CENTER
    cols_name = ["Mã CV", "Cung (i-j)", "Thời gian t", "ES", "EF", "LS", "LF", "Dự trữ TF", "Trạng thái"]
    for j, h in enumerate(cols_name):
        cell = table_detail.rows[0].cells[j]
        set_cell_background(cell, "1E293B")
        set_cell_margins(cell, 100, 100, 80, 80)
        p = cell.paragraphs[0]
        p.alignment = WD_ALIGN_PARAGRAPH.CENTER
        r = p.add_run(h)
        r.font.bold = True
        r.font.size = Pt(10)
        r.font.color.rgb = RGBColor(0xFF, 0xFF, 0xFF)

    calc_rows = [
        ("A", "0 → 1", "7", "0", "7", "0", "7", "0", "GĂNG ★"),
        ("B", "0 → 2", "2", "0", "2", "11", "13", "11", "Không găng"),
        ("C", "1 → 2", "6", "7", "13", "7", "13", "0", "GĂNG ★"),
        ("D", "2 → 3", "8", "13", "21", "13", "21", "0", "GĂNG ★"),
        ("E", "3 → 4", "5", "21", "26", "21", "26", "0", "GĂNG ★"),
        ("H", "4 → 5", "4", "26", "30", "26", "30", "0", "GĂNG ★"),
        ("F", "4 → 6", "3", "26", "29", "27", "30", "1", "Không găng"),
        ("H'", "5 → 7", "0", "30", "30", "30", "30", "0", "Cung ảo găng ★"),
        ("F'", "6 → 7", "0", "29", "29", "30", "30", "1", "Cung ảo"),
        ("G", "7 → 8", "14", "30", "44", "30", "44", "0", "GĂNG ★"),
        ("T", "8 → 9", "4", "44", "48", "44", "48", "0", "GĂNG ★"),
    ]

    for i, rdata in enumerate(calc_rows):
        row = table_detail.rows[i+1]
        is_crit = "GĂNG" in rdata[8]
        bg_col = "FEE2E2" if is_crit else ("F8FAFC" if i % 2 == 0 else "FFFFFF")
        for j, val in enumerate(rdata):
            cell = row.cells[j]
            set_cell_background(cell, bg_col)
            set_cell_margins(cell, 80, 80, 80, 80)
            p = cell.paragraphs[0]
            p.alignment = WD_ALIGN_PARAGRAPH.CENTER
            r = p.add_run(val)
            r.font.size = Pt(10)
            if is_crit:
                r.font.bold = True
                if j in [0, 7, 8]:
                    r.font.color.rgb = RGBColor(0xDC, 0x26, 0x26)

    doc.add_paragraph().paragraph_format.space_after = Pt(14)

    # 1.5 Sơ đồ mạng PERT
    h2 = doc.add_heading("1.5. Sơ đồ mạng PERT trực quan của dự án UniLife", level=2)
    h2.runs[0].font.color.rgb = RGBColor(0x1E, 0x29, 0x3B)
    h2.runs[0].font.size = Pt(13)

    p_note = doc.add_paragraph("Sơ đồ mạng tiến độ được mô phỏng trực quan tương tự bản vẽ của đề tài, thể hiện rõ các đỉnh sự kiện dạng [ts / tm], các cung công việc và làm nổi bật Đường găng màu đỏ:")
    p_note.paragraph_format.space_after = Pt(8)

    pert_img_path = "D:\\24CT1-PHANTRIDUC\\docs\\pert_diagram.png"
    if os.path.exists(pert_img_path):
        p_img = doc.add_paragraph()
        p_img.alignment = WD_ALIGN_PARAGRAPH.CENTER
        p_img.add_run().add_picture(pert_img_path, width=Inches(6.8))
        
        p_cap = doc.add_paragraph()
        p_cap.alignment = WD_ALIGN_PARAGRAPH.CENTER
        r_cap = p_cap.add_run("Hình 1.1: Sơ đồ mạng PERT / CPM và Đường găng dự án UniLife")
        r_cap.font.italic = True
        r_cap.font.bold = True
        r_cap.font.size = Pt(10.5)
        r_cap.font.color.rgb = RGBColor(0x47, 0x55, 0x69)

    doc.add_paragraph().paragraph_format.space_after = Pt(12)

    # 1.6 Kết luận đường găng
    h2 = doc.add_heading("1.6. Kết luận về Đường găng và Tiến độ dự án", level=2)
    h2.runs[0].font.color.rgb = RGBColor(0x1E, 0x29, 0x3B)
    h2.runs[0].font.size = Pt(13)

    p1 = doc.add_paragraph()
    p1.paragraph_format.left_indent = Inches(0.2)
    p1.add_run("1. Chuỗi sự kiện găng: ").font.bold = True
    p1.add_run("0 → 1 → 2 → 3 → 4 → 5 → 7 → 8 → 9  (Các sự kiện đều có độ dự trữ R = 0).\n")

    p2 = doc.add_paragraph()
    p2.paragraph_format.left_indent = Inches(0.2)
    p2.add_run("2. Đường găng của dự án (Critical Path): ").font.bold = True
    r_cp = p2.add_run("A → C → D → E → H → (H') → G → T\n")
    r_cp.font.bold = True
    r_cp.font.color.rgb = RGBColor(0xDC, 0x26, 0x26)

    p3 = doc.add_paragraph()
    p3.paragraph_format.left_indent = Inches(0.2)
    p3.add_run("3. Thời gian hoàn thành dự án ngắn nhất: ").font.bold = True
    r_time = p3.add_run("T = 7 + 6 + 8 + 5 + 4 + 0 + 14 + 4 = 48 ngày (hoặc tuần).\n")
    r_time.font.bold = True
    r_time.font.color.rgb = RGBColor(0x0E, 0x7C, 0x66)

    p4 = doc.add_paragraph()
    p4.paragraph_format.left_indent = Inches(0.2)
    p4.add_run("4. Phân tích quản lý rủi ro và điều phối tài nguyên:\n").font.bold = True
    p4.add_run(
        "• Các công việc trên đường găng (A, C, D, E, H, G, T) là các công việc bắt buộc phải được theo dõi sát sao, "
        "bố trí nhân lực tối đa và không được phép trễ bất kỳ ngày nào, vì nếu bất kỳ công việc nào bị chậm thì toàn bộ dự án sẽ bị trễ tương ứng.\n"
        "• Công việc B (Design giao diện framework) có độ dự trữ TF = 11 ngày, có thể linh hoạt bắt đầu muộn từ ngày thứ 0 đến ngày thứ 11 mà không ảnh hưởng tiến độ.\n"
        "• Công việc F (Thiết kế cơ sở dữ liệu) có độ dự trữ TF = 1 ngày, cần hoàn thành trong vòng 4 ngày kể từ khi E kết thúc."
    )

    doc.add_page_break()

    # =========================================================================
    # PHẦN 2: BÀI TẬP 4.1 - 4 SƠ ĐỒ FIGMA RIÊNG BIỆT CHO 4 CHỨC NĂNG
    # =========================================================================
    h_sec2 = doc.add_heading("PHẦN 2: BÀI TẬP 4.1 — THIẾT KẾ PHẦN MỀM UI/UX: 4 SƠ ĐỒ FIGMA RIÊNG BIỆT", level=1)
    h_sec2.runs[0].font.color.rgb = RGBColor(0x0E, 0x7C, 0x66)
    h_sec2.runs[0].font.size = Pt(15)
    h_sec2.runs[0].font.bold = True

    p = doc.add_paragraph(
        "Theo yêu cầu của đề tài, Phần 2 được chia thành 4 SƠ ĐỒ THIẾT KẾ FIGMA ĐỘC LẬP tương ứng với 4 chức năng cốt lõi. "
        "Trong mỗi sơ đồ đều thể hiện đầy đủ quy trình thiết kế 3 bước chuẩn của Slide 4.1:\n"
        "• Cột 1: Bước 1 - User Flow (Sơ đồ luồng người dùng chuẩn template FigJam)\n"
        "• Cột 2: Bước 2 - Wireframe (Bản phác thảo bố cục cấu trúc)\n"
        "• Cột 3: Bước 3 - Mockup (Bản thiết kế giao diện chi tiết theo Design System UniLife)"
    )
    p.paragraph_format.space_after = Pt(14)

    # 4 SEPARATE FIGMA DIAGRAM SECTIONS
    figma_sections = [
        ("2.1. Sơ đồ Figma Chức năng 1: Đăng ký tài khoản mới (User Registration)",
         "Mô tả quy trình:\n"
         "• Bước 1 (User Flow): Người dùng nhấn nút 'Đăng nhập / Đăng ký' trên Header → Chuyển sang Tab 'Đăng ký' → Nhập Họ tên, Email sinh viên, Mật khẩu, SĐT → Chọn vai trò (Sinh viên / Chủ trọ) → Bấm nút 'Đăng ký tài khoản' → Hệ thống kiểm tra hợp lệ dữ liệu và kiểm tra trùng Email → Nếu hợp lệ, lưu vào MySQL/LocalStorage, gán Avatar ngẫu nhiên → Tự động đăng nhập và hiện Toast chúc mừng.\n"
         "• Bước 2 (Wireframe): Cấu trúc Modal Card bo tròn, thanh chuyển Tab 2 trạng thái, 4 ô Input text có icon minh họa, nhóm Radio Button chọn vai trò, nút Submit full-width, dòng link chuyển nhanh sang Đăng nhập.\n"
         "• Bước 3 (Mockup): Giao diện bo tròn 18px, đổ bóng shadow mềm mại, màu chủ đạo Coral (#FF5D3E), viền input xám mỏng (#E0DCD0), hiệu ứng focus viền cam, icon Lucide rõ nét.",
         "D:\\24CT1-PHANTRIDUC\\docs\\Figma_CN1_DangKy.png",
         "Hình 2.1: Sơ đồ Figma hoàn chỉnh Chức năng 1 — Đăng ký tài khoản (User Flow, Wireframe, Mockup)"),

        ("2.2. Sơ đồ Figma Chức năng 2: Đăng nhập hệ thống & Phân quyền (Login & RBAC)",
         "Mô tả quy trình:\n"
         "• Bước 1 (User Flow): Mở Modal Đăng nhập → Nhập Email và Mật khẩu → Hệ thống kiểm tra Email tồn tại và Mật khẩu chính xác → Kiểm tra trạng thái tài khoản (Active hay Banned) → Xác thực thành công và phân quyền vai trò: Khách hàng (mở lưu yêu thích, chat chủ trọ), Chủ trọ (mở nút Đăng tin), Admin (mở Tab Quản trị duyệt bài).\n"
         "• Bước 2 (Wireframe): Form gọn nhẹ 2 trường nhập liệu Email và Password, Checkbox 'Ghi nhớ đăng nhập', link 'Quên mật khẩu', Nút Submit màu tối, Hộp gợi ý tài khoản thử nghiệm nhanh (Demo credentials).\n"
         "• Bước 3 (Mockup): Thẻ card nền trắng tinh khiết, Avatar người dùng xuất hiện góc trên Header kèm Badge vai trò (màu Teal cho Chủ trọ, Coral cho Admin), Toast thông báo xanh nổi bật.",
         "D:\\24CT1-PHANTRIDUC\\docs\\Figma_CN2_DangNhap.png",
         "Hình 2.2: Sơ đồ Figma hoàn chỉnh Chức năng 2 — Đăng nhập & Phân quyền (User Flow, Wireframe, Mockup)"),

        ("2.3. Sơ đồ Figma Chức năng 3: Tìm kiếm & Lọc phòng trọ đa tiêu chí (Search & Filter)",
         "Mô tả quy trình:\n"
         "• Bước 1 (User Flow): Người dùng vào Tab 'Phòng trọ' → Hệ thống load danh sách mặc định → Nhập từ khóa tìm kiếm (tên đường, quận, gần trường) → Bật/tắt các FilterChip tiện ích (Máy lạnh, Máy giặt, Wifi, Chỗ giữ xe) → Kéo thanh trượt mức giá tối đa (1 - 5 triệu) → Thuật toán lọc real-time hiển thị các thẻ PlaceCard tương ứng (hoặc EmptyState nếu không có phòng nào thỏa mãn) → Người dùng nhấn vào thẻ để xem chi tiết hoặc bấm trái tim để lưu yêu thích.\n"
         "• Bước 2 (Wireframe): Thanh Navbar trên cùng, Thanh tìm kiếm lớn có nút xóa nhanh (X), Hàng Filter Bar gồm các chip viên thuốc và Range slider giá, Lưới 3 cột hiển thị các thẻ phòng trọ (khung ảnh skeleton, giá, địa chỉ, rating sao).\n"
         "• Bước 3 (Mockup): Thẻ phòng trọ PlaceCard có tag giá màu Coral (#FF5D3E) nổi bật, Badge diện tích nền tối mờ, icon trái tim yêu thích đỏ rực, rating sao vàng Marigold (#FFC145), khoảng cách đi bộ đến trường học.",
         "D:\\24CT1-PHANTRIDUC\\docs\\Figma_CN3_TimKiemPhongTro.png",
         "Hình 2.3: Sơ đồ Figma hoàn chỉnh Chức năng 3 — Tìm kiếm & Lọc phòng trọ (User Flow, Wireframe, Mockup)"),

        ("2.4. Sơ đồ Figma Chức năng 4: Đăng tin cho thuê phòng trọ (Post Housing Listing)",
         "Mô tả quy trình:\n"
         "• Bước 1 (User Flow): Chủ trọ nhấn nút '+ Đăng tin cho thuê trọ' (màu Coral trên giao diện) → Kiểm tra quyền đăng nhập → Hiển thị Form Modal Đăng tin → Điền tiêu đề, giá thuê, diện tích, địa chỉ chi tiết, khoảng cách đến trường → Tick chọn các tiện ích phòng có sẵn → Bấm 'Đăng bài cho thuê ngay' → Hệ thống validate thông tin bắt buộc → Gọi API lưu CSDL MySQL → Chèn bài đăng mới vào đầu danh sách và hiện thông báo Toast thành công.\n"
         "• Bước 2 (Wireframe): Modal popup kích thước vừa vặn, chia lưới 2 cột cho Giá và Diện tích để tối ưu không gian, 4 Checkbox tiện ích dạng lưới 2x2, nút Submit lớn nổi bật.\n"
         "• Bước 3 (Mockup): Giao diện bo góc 16px, nút bấm màu Coral viền bo cong 10px, các ô tiện ích đổi màu viền xanh Teal khi được kích hoạt, hiệu ứng chuyển động mượt mà.",
         "D:\\24CT1-PHANTRIDUC\\docs\\Figma_CN4_DangTinPhongTro.png",
         "Hình 2.4: Sơ đồ Figma hoàn chỉnh Chức năng 4 — Đăng tin phòng trọ (User Flow, Wireframe, Mockup)")
    ]

    for title, desc, img_path, caption in figma_sections:
        h2 = doc.add_heading(title, level=2)
        h2.runs[0].font.color.rgb = RGBColor(0x1E, 0x29, 0x3B)
        h2.runs[0].font.size = Pt(13)
        
        p = doc.add_paragraph(desc)
        p.paragraph_format.line_spacing = 1.3
        p.paragraph_format.space_after = Pt(8)

        if os.path.exists(img_path):
            p_img = doc.add_paragraph()
            p_img.alignment = WD_ALIGN_PARAGRAPH.CENTER
            p_img.add_run().add_picture(img_path, width=Inches(6.8))
            
            p_cap = doc.add_paragraph()
            p_cap.alignment = WD_ALIGN_PARAGRAPH.CENTER
            r_cap = p_cap.add_run(caption)
            r_cap.font.italic = True
            r_cap.font.bold = True
            r_cap.font.size = Pt(10)
            r_cap.font.color.rgb = RGBColor(0x47, 0x55, 0x69)

        doc.add_paragraph().paragraph_format.space_after = Pt(14)

    # =========================================================================
    # KẾT LUẬN CHUNG
    # =========================================================================
    h_end = doc.add_heading("KẾT LUẬN TOÀN DIỆN VÀ ĐÁNH GIÁ", level=1)
    h_end.runs[0].font.color.rgb = RGBColor(0x0E, 0x7C, 0x66)
    h_end.runs[0].font.size = Pt(15)

    p_end = doc.add_paragraph(
        "Báo cáo đã hoàn thành trọn vẹn và chuyên nghiệp cả 2 nội dung chuyên môn theo đúng đề bài và slide hướng dẫn của giảng viên:\n"
        "1. Về tiến độ dự án (PERT / CPM): Đã áp dụng chính xác công thức ts, tm, tính ra tiến độ tối ưu của dự án là 48 ngày, "
        "xác định rõ 7 công việc găng trên chuỗi A-C-D-E-H-G-T, giúp đội ngũ phát triển UniLife phân bổ nguồn lực và kiểm soát rủi ro hiệu quả.\n"
        "2. Về thiết kế phần mềm (UI/UX): Đã tách biệt thành 4 sơ đồ Figma riêng biệt cho 4 chức năng cốt lõi, "
        "mỗi sơ đồ chứa đầy đủ 3 bước (User Flow, Wireframe, Mockup) bám sát thực tế mã nguồn React/Tailwind/CSS của đồ án UniLife, "
        "tạo tiền đề vững chắc cho việc lập trình và báo cáo đồ án đạt kết quả cao nhất."
    )
    p_end.paragraph_format.line_spacing = 1.35

    out_path = "D:\\24CT1-PHANTRIDUC\\docs\\BAO_CAO_TIEN_DO_PERT_VA_THIET_KE_UIUX_UNILIFE.docx"
    doc.save(out_path)
    print(f"Successfully updated Word document at: {out_path}")

if __name__ == "__main__":
    create_report()
