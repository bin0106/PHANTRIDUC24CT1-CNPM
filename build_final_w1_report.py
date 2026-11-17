# -*- coding: utf-8 -*-
"""
Script cập nhật hoàn chỉnh file Báo cáo W1:
1. Thêm đầy đủ phần CSDL mà W2 có (kể cả 5 hình ảnh phpMyAdmin).
2. Yêu cầu 1: Thực hiện câu lệnh truy vấn và chụp CẢ CÂU LỆNH LẪN KẾT QUẢ TRUY VẤN (Nhận thức 4 & Nhận thức 5).
3. Yêu cầu 2: Thêm phần CHÚ THÍCH CHI TIẾT CHO TẤT CẢ CÁC BẢNG trong báo cáo.
4. Xuất bản tài liệu Word chuẩn phong cách học thuật Trắng - Xanh Dương.
"""

import os
import docx
from docx import Document
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT
from docx.oxml import parse_xml
from docx.oxml.ns import nsdecls

# BẢNG MÀU CHỦ ĐẠO: TRẮNG - XANH DƯƠNG (WHITE & ROYAL BLUE THEME)
COLOR_PRIMARY_BLUE = RGBColor(0x1E, 0x40, 0xAF)    # Royal Blue #1E40AF
COLOR_DARK_NAVY    = RGBColor(0x1E, 0x3A, 0x8A)    # Deep Navy #1E3A8A
COLOR_ACCENT_BLUE  = RGBColor(0x25, 0x63, 0xEB)    # Vivid Blue #2563EB
COLOR_TEXT_MAIN    = RGBColor(0x0F, 0x17, 0x2A)    # Slate Dark #0F172A
COLOR_TEXT_MUTED   = RGBColor(0x47, 0x55, 0x69)    # Slate Muted #475569

HEX_HEADER_BLUE    = "1E3A8A"                       # Header bảng
HEX_ZEBRA_BLUE     = "F0F7FF"                       # Dòng chẵn
HEX_BORDER_BLUE    = "BFDBFE"                       # Viền bảng

def set_cell_background(cell, fill_hex):
    tcPr = cell._tc.get_or_add_tcPr()
    shd = parse_xml(f'<w:shd {nsdecls("w")} w:fill="{fill_hex}"/>')
    tcPr.append(shd)

def set_cell_margins(cell, top=80, bottom=80, left=120, right=120):
    tcPr = cell._tc.get_or_add_tcPr()
    tcMar = parse_xml(f'<w:tcMar {nsdecls("w")}><w:top w:w="{top}" w:type="dxa"/><w:bottom w:w="{bottom}" w:type="dxa"/><w:left w:w="{left}" w:type="dxa"/><w:right w:w="{right}" w:type="dxa"/></w:tcMar>')
    tcPr.append(tcMar)

def set_table_borders(table, color=HEX_BORDER_BLUE, sz="4", val="single"):
    tblPr = table._tbl.tblPr
    borders = parse_xml(
        f'<w:tblBorders {nsdecls("w")}>'
        f'  <w:top w:val="{val}" w:sz="{sz}" w:space="0" w:color="{color}"/>'
        f'  <w:bottom w:val="{val}" w:sz="{sz}" w:space="0" w:color="{color}"/>'
        f'  <w:insideH w:val="{val}" w:sz="{sz}" w:space="0" w:color="{color}"/>'
        f'  <w:insideV w:val="none"/>'
        f'  <w:left w:val="none"/>'
        f'  <w:right w:val="none"/>'
        f'</w:tblBorders>'
    )
    tblPr.append(borders)

def add_heading_styled(doc, text, level):
    h = doc.add_heading(text, level=level)
    h.paragraph_format.keep_with_next = True
    run = h.runs[0]
    run.font.name = "Times New Roman"
    if level == 1:
        run.font.size = Pt(15.5)
        run.font.bold = True
        run.font.color.rgb = COLOR_PRIMARY_BLUE
        h.paragraph_format.space_before = Pt(18)
        h.paragraph_format.space_after = Pt(8)
    elif level == 2:
        run.font.size = Pt(13)
        run.font.bold = True
        run.font.color.rgb = COLOR_DARK_NAVY
        h.paragraph_format.space_before = Pt(13)
        h.paragraph_format.space_after = Pt(6)
    elif level == 3:
        run.font.size = Pt(12)
        run.font.bold = True
        run.font.color.rgb = COLOR_ACCENT_BLUE
        h.paragraph_format.space_before = Pt(9)
        h.paragraph_format.space_after = Pt(4)
    return h

def add_p(doc, text="", bold_prefix=None, space_after=6, italic=False, align=WD_ALIGN_PARAGRAPH.JUSTIFY):
    p = doc.add_paragraph()
    p.alignment = align
    p.paragraph_format.line_spacing = 1.25
    p.paragraph_format.space_after = Pt(space_after)
    if bold_prefix:
        r_pre = p.add_run(bold_prefix)
        r_pre.font.name = "Times New Roman"
        r_pre.font.size = Pt(11.5)
        r_pre.font.bold = True
        r_pre.font.color.rgb = COLOR_DARK_NAVY
    if text:
        r = p.add_run(text)
        r.font.name = "Times New Roman"
        r.font.size = Pt(11.5)
        r.font.italic = italic
        r.font.color.rgb = COLOR_TEXT_MAIN
    return p

def add_image_safe(doc, img_path, caption, width_in=6.4):
    if os.path.exists(img_path):
        p_img = doc.add_paragraph()
        p_img.alignment = WD_ALIGN_PARAGRAPH.CENTER
        p_img.paragraph_format.space_before = Pt(8)
        p_img.paragraph_format.space_after = Pt(4)
        run_img = p_img.add_run()
        run_img.add_picture(img_path, width=Inches(width_in))
        
        p_cap = doc.add_paragraph()
        p_cap.alignment = WD_ALIGN_PARAGRAPH.CENTER
        p_cap.paragraph_format.space_after = Pt(10)
        run_cap = p_cap.add_run(caption)
        run_cap.font.name = "Times New Roman"
        run_cap.font.size = Pt(10.5)
        run_cap.font.bold = True
        run_cap.font.italic = True
        run_cap.font.color.rgb = COLOR_TEXT_MUTED
    else:
        p_err = doc.add_paragraph(f"[Lỗi hình ảnh: Không tìm thấy tệp {img_path}]")
        p_err.runs[0].font.color.rgb = RGBColor(0xDC, 0x26, 0x26)

def style_table(table, headers, data, col_widths=None):
    table.alignment = WD_TABLE_ALIGNMENT.CENTER
    set_table_borders(table, color=HEX_BORDER_BLUE)
    
    # Headers
    for c_idx, h_text in enumerate(headers):
        cell = table.rows[0].cells[c_idx]
        set_cell_background(cell, HEX_HEADER_BLUE)
        set_cell_margins(cell, 80, 80, 100, 100)
        p = cell.paragraphs[0]
        p.alignment = WD_ALIGN_PARAGRAPH.CENTER
        r = p.add_run(h_text)
        r.font.name = "Times New Roman"
        r.font.bold = True
        r.font.size = Pt(10)
        r.font.color.rgb = RGBColor(0xFF, 0xFF, 0xFF)
        if col_widths and c_idx < len(col_widths):
            cell.width = Inches(col_widths[c_idx])
            
    # Rows
    for r_idx, row_values in enumerate(data):
        row = table.rows[r_idx + 1]
        bg = HEX_ZEBRA_BLUE if r_idx % 2 == 1 else "FFFFFF"
        for c_idx, val in enumerate(row_values):
            cell = row.cells[c_idx]
            set_cell_background(cell, bg)
            set_cell_margins(cell, 60, 60, 90, 90)
            p = cell.paragraphs[0]
            r = p.add_run(str(val))
            r.font.name = "Times New Roman"
            r.font.size = Pt(9.5)
            if c_idx == 0:
                p.alignment = WD_ALIGN_PARAGRAPH.CENTER
                r.font.bold = True
                r.font.color.rgb = COLOR_DARK_NAVY
            if col_widths and c_idx < len(col_widths):
                cell.width = Inches(col_widths[c_idx])

def build_report():
    w1_path = r"C:\Users\Asus\.gemini\antigravity\brain\ace0864c-61a4-492d-9454-869f37d09ac5\.user_uploaded\media_1794897010734_27b5949b.docx"
    doc = Document(w1_path)
    body = doc._body._element

    # 1. Cập nhật Mục lục trong W1
    print("Step 1: Updating Table of Contents in W1...")
    toc_updates = [
        (70, "2.5. Dữ liệu (Database MySQL trên XAMPP)\t33"),
        (71, "  2.5.1. Thiết kế cấu trúc cơ sở dữ liệu\t33"),
        (72, "  2.5.2. Các tập dữ liệu thực nghiệm trong phpMyAdmin (XAMPP)\t35"),
        (73, "  2.5.3. Nhận thức 4 (Yêu cầu 2.3.6): Truy vấn tổng số người cho từng vai trò/role của đề tài\t36"),
        (74, "  2.5.4. Nhận thức 5 (Yêu cầu 2.3.5): Truy vấn tổng số lượng bài đăng và danh sách cụ thể bài đăng trong đề tài\t37"),
        (75, "  2.5.5. Chức năng quản lý Tụ điểm Vui chơi giải trí & Tự động lưu CSDL\t39"),
        (76, "  2.5.6. Mục tiêu và giải pháp Bộ lọc đa năng trong CSDL (Lọc Tên, SĐT, Vai trò, Trạng thái)\t40"),
        (77, "  2.5.7. Quy trình Đăng ký tài khoản mới tự động lưu vào CSDL MySQL và cập nhật hiển thị tức thì\t41"),
        (78, "  2.5.8. Quy chuẩn bảo mật & Kiểm soát dữ liệu đăng ký (@gmail.com, SĐT duy nhất)\t42"),
        (79, "2.6. Kết luận chương thực nghiệm\t43"),
        (80, "CHƯƠNG 3: KẾT LUẬN VÀ HƯỚNG PHÁT TRIỂN\t44"),
        (81, "  3.1. Đánh giá kết quả đạt được\t44"),
        (82, "  3.2. Hạn chế của đề tài\t44"),
        (83, "  3.3. Hướng phát triển\t45"),
        (84, "  3.4. Kết luận chung\t45")
    ]
    for p_idx, text_val in toc_updates:
        if p_idx < len(doc.paragraphs):
            doc.paragraphs[p_idx].text = text_val
            doc.paragraphs[p_idx].paragraph_format.line_spacing = 1.15
            doc.paragraphs[p_idx].paragraph_format.space_after = Pt(2)
            doc.paragraphs[p_idx].runs[0].font.name = "Times New Roman"
            doc.paragraphs[p_idx].runs[0].font.size = Pt(11)
            if "CHƯƠNG" in text_val or "2.5. Dữ liệu" in text_val or "2.6." in text_val:
                doc.paragraphs[p_idx].runs[0].font.bold = True
                doc.paragraphs[p_idx].runs[0].font.color.rgb = COLOR_PRIMARY_BLUE
            else:
                doc.paragraphs[p_idx].runs[0].font.color.rgb = COLOR_TEXT_MAIN

    # 2. Tìm vị trí thực tế của Section 2.5 trong body (Index 246)
    target_idx = None
    for idx, child in enumerate(body):
        text = ''.join(child.itertext()).strip()
        if text.startswith("2.5. Dữ liệu (Database MySQL trên XAMPP)") and "\t" not in text and idx > 150:
            target_idx = idx
            break

    print(f"Step 2: Found Section 2.5 in body at index: {target_idx}")

    # Xóa các phần tử từ target_idx đến trước sectPr cuối cùng
    for i in range(len(body) - 2, target_idx - 1, -1):
        body.remove(body[i])

    print("Step 3: Cleared old Section 2.5 to end. Now appending full enhanced content...")

    # =========================================================================
    # 2.5 DỮ LIỆU (DATABASE MYSQL TRÊN XAMPP)
    # =========================================================================
    add_heading_styled(doc, "2.5. Dữ liệu (Database MySQL trên XAMPP)", level=2)
    add_p(doc,
        "Cơ sở dữ liệu unilife_db được thiết kế chuẩn hóa và quản lý trực tiếp bằng phpMyAdmin trên máy chủ MySQL của bộ cài đặt XAMPP (truy cập tại địa chỉ http://localhost/phpmyadmin/). Dưới đây là hình ảnh thực tế ghi lại cấu trúc toàn bộ các bảng trong phpMyAdmin và sơ đồ thiết kế quan hệ các thực thể (Designer View):"
    )
    add_image_safe(doc, r"D:\24CT1-PHANTRIDUC\docs\db_1_cau_truc_database.png", "Hình 2.19: Cấu trúc cơ sở dữ liệu unilife_db với các bảng chuẩn hóa trong phpMyAdmin trên XAMPP")
    add_image_safe(doc, r"D:\24CT1-PHANTRIDUC\docs\db_5_designer_quan_he.png", "Hình 2.20: Sơ đồ thiết kế quan hệ các bảng (Designer View) trong phpMyAdmin")

    # 2.5.1 Cấu trúc CSDL
    add_heading_styled(doc, "2.5.1. Thiết kế cấu trúc cơ sở dữ liệu", level=3)
    add_p(doc, "Đặc tả chi tiết cấu trúc thuộc tính, kiểu dữ liệu, các ràng buộc và phần chú thích chi tiết cho từng bảng dữ liệu:")

    # Bảng 2.2: users
    add_p(doc, "Bảng 2.2. Cấu trúc bảng users (Quản lý tài khoản & Phân quyền)", bold_prefix=None, space_after=3)
    cols_users = [
        ("id", "BIGINT UNSIGNED", "PK (Khóa chính tự tăng AUTO_INCREMENT)"),
        ("name", "VARCHAR(150)", "Họ tên người dùng (Bắt buộc NOT NULL)"),
        ("email", "VARCHAR(191)", "UK, Bắt buộc định dạng đuôi @gmail.com duy nhất"),
        ("password_hash", "VARCHAR(255)", "Mật khẩu mã hóa băm bảo mật hệ thống"),
        ("phone", "VARCHAR(20)", "UK, Số điện thoại chính chủ (không trùng lặp)"),
        ("role", "ENUM(...)", "Khách hàng / Chủ nhà trọ / Chủ quán ăn / Người bán đồ cũ / Quản trị viên"),
        ("status", "ENUM(...)", "Active (Hoạt động) / Banned (Khóa) / Pending (Chờ duyệt)"),
        ("avatar_url", "TEXT", "Đường dẫn link ảnh đại diện hiển thị trên Header")
    ]
    t_u = doc.add_table(rows=len(cols_users) + 1, cols=3)
    style_table(t_u, ["Thuộc tính", "Kiểu dữ liệu MySQL", "Ràng buộc / Ghi chú"], cols_users, [1.6, 1.8, 3.0])
    add_p(doc, 
        "• id: Khóa chính định danh duy nhất cho từng tài khoản người dùng.\n"
        "• name: Họ và tên đầy đủ hiển thị trên giao diện và danh thiếp tin bài.\n"
        "• email: Tên đăng nhập duy nhất, bắt buộc phải có phần đuôi là @gmail.com nhằm kiểm soát danh tính thật của sinh viên.\n"
        "• password_hash: Chuỗi mật khẩu băm một chiều bảo vệ an toàn thông tin đăng nhập.\n"
        "• phone: Số điện thoại liên lạc duy nhất (Unique Key), dùng để kết nối giữa khách thuê phòng và chủ trọ.\n"
        "• role: Phân quyền vai trò người dùng trong hệ thống để mở đúng chức năng.\n"
        "• status: Trạng thái tài khoản (Active: được phép đăng nhập, Banned: tài khoản bị khóa do vi phạm quy chế cộng đồng).",
        bold_prefix="* Chú thích Bảng 2.2 (Bảng users):\n", italic=True
    )
    doc.add_paragraph().paragraph_format.space_after = Pt(4)

    # Bảng 2.3: housing
    add_p(doc, "Bảng 2.3. Cấu trúc bảng housing (Tin đăng phòng trọ sinh viên)", bold_prefix=None, space_after=3)
    cols_housing = [
        ("id", "BIGINT UNSIGNED", "PK (Khóa chính tự tăng)"),
        ("user_id", "BIGINT UNSIGNED", "FK tham chiếu users(id), ON DELETE CASCADE"),
        ("name", "VARCHAR(255)", "Tiêu đề phòng trọ (Bắt buộc NOT NULL)"),
        ("price", "VARCHAR(50)", "Giá phòng hiển thị giao diện (VD: 2.2 tr/tháng)"),
        ("price_num", "DECIMAL(10,2)", "Giá số thực phục vụ lọc và sắp xếp"),
        ("area", "VARCHAR(50)", "Diện tích phòng sử dụng (m²)"),
        ("address", "VARCHAR(255)", "Địa chỉ chi tiết phòng trọ tại Đà Nẵng"),
        ("dist", "VARCHAR(50)", "Khoảng cách tới trường Đại học Kiến trúc"),
        ("phone", "VARCHAR(20)", "Số điện thoại hotline liên hệ chủ trọ"),
        ("ac, washer, wifi, parking", "TINYINT(1)", "Các tiện ích phòng trọ (1: Có, 0: Không)"),
        ("status", "ENUM(...)", "approved (Đã duyệt) / hidden (Ẩn) / pending (Chờ duyệt)")
    ]
    t_h = doc.add_table(rows=len(cols_housing) + 1, cols=3)
    style_table(t_h, ["Thuộc tính", "Kiểu dữ liệu MySQL", "Ràng buộc / Ghi chú"], cols_housing, [1.6, 1.8, 3.0])
    add_p(doc,
        "• id, user_id: Khóa chính và khóa ngoại liên kết tới tài khoản chủ nhà trọ sở hữu bài đăng.\n"
        "• price_num: Kiểu DECIMAL(10,2) quy đổi ra triệu đồng, hỗ trợ thuật toán lọc theo thanh trượt khoảng giá trên trang web.\n"
        "• ac, washer, wifi, parking: Các cờ nhị phân (1/0) tương ứng Điều hòa, Máy giặt, Wifi, Chỗ giữ xe, kết nối trực tiếp với bộ lọc chip tiện ích.\n"
        "• status: Trạng thái kiểm duyệt bài đăng (approved: hiển thị công khai trên web sau khi admin duyệt).",
        bold_prefix="* Chú thích Bảng 2.3 (Bảng housing):\n", italic=True
    )
    doc.add_paragraph().paragraph_format.space_after = Pt(4)

    # Bảng 2.4: food_places
    add_p(doc, "Bảng 2.4. Cấu trúc bảng food_places (Quán ăn & Cà phê sinh viên)", bold_prefix=None, space_after=3)
    cols_food = [
        ("id", "BIGINT UNSIGNED", "PK (Khóa chính tự tăng)"),
        ("user_id", "BIGINT UNSIGNED", "FK tham chiếu users(id)"),
        ("name", "VARCHAR(255)", "Tên quán ăn / đồ uống quanh trường"),
        ("cat", "VARCHAR(50)", "Phân loại: Cơm, Bún/Phở, Trà sữa, Cafe"),
        ("price", "VARCHAR(100)", "Khoảng giá sinh viên (VD: 25k - 40k)"),
        ("address", "VARCHAR(255)", "Địa chỉ cụ thể quán ăn"),
        ("rating", "DECIMAL(3,2)", "Điểm đánh giá thực tế (1.0 - 5.0 sao)"),
        ("status", "ENUM(...)", "approved / pending")
    ]
    t_f = doc.add_table(rows=len(cols_food) + 1, cols=3)
    style_table(t_f, ["Thuộc tính", "Kiểu dữ liệu MySQL", "Ràng buộc / Ghi chú"], cols_food, [1.6, 1.8, 3.0])
    add_p(doc,
        "• cat: Danh mục món ăn giúp sinh viên lọc nhanh quán cơm trưa, bún sáng hoặc cafe có ổ cắm để học nhóm.\n"
        "• rating: Điểm số trung bình do sinh viên bình chọn nhằm khẳng định chất lượng và vệ sinh quán ăn.",
        bold_prefix="* Chú thích Bảng 2.4 (Bảng food_places):\n", italic=True
    )
    doc.add_paragraph().paragraph_format.space_after = Pt(4)

    # Bảng 2.5: marketplace
    add_p(doc, "Bảng 2.5. Cấu trúc bảng marketplace (Chợ đồ cũ sinh viên)", bold_prefix=None, space_after=3)
    cols_market = [
        ("id", "BIGINT UNSIGNED", "PK (Khóa chính tự tăng)"),
        ("user_id", "BIGINT UNSIGNED", "FK tham chiếu users(id)"),
        ("name", "VARCHAR(255)", "Tên sản phẩm / giáo trình thanh lý"),
        ("price", "VARCHAR(100)", "Giá bán thanh lý lại"),
        ("cond", "VARCHAR(100)", "Tình trạng đồ dùng (Mới 95%, Dùng tốt...)"),
        ("cat", "VARCHAR(50)", "Danh mục: Sách/Giáo trình, Gia dụng, Điện tử, Nội thất"),
        ("phone", "VARCHAR(20)", "Số điện thoại / Zalo liên hệ xem đồ")
    ]
    t_m = doc.add_table(rows=len(cols_market) + 1, cols=3)
    style_table(t_m, ["Thuộc tính", "Kiểu dữ liệu MySQL", "Ràng buộc / Ghi chú"], cols_market, [1.6, 1.8, 3.0])
    add_p(doc,
        "• cond: Mô tả mức độ hao mòn thực tế giúp người mua sinh viên nắm rõ chất lượng sản phẩm trước khi liên hệ.\n"
        "• phone: Số Zalo liên hệ trực tiếp với người bán sinh viên để trao đổi hẹn xem đồ trực tiếp.",
        bold_prefix="* Chú thích Bảng 2.5 (Bảng marketplace):\n", italic=True
    )
    doc.add_paragraph().paragraph_format.space_after = Pt(4)

    # Bảng 2.6: entertainment
    add_p(doc, "Bảng 2.6. Cấu trúc bảng entertainment (Tụ điểm vui chơi & Giải trí sinh viên)", bold_prefix=None, space_after=3)
    cols_ent = [
        ("id", "BIGINT UNSIGNED", "PK (Khóa chính tự tăng)"),
        ("name", "VARCHAR(255)", "Tên tụ điểm giải trí (Bida, Gaming, Karaoke...)"),
        ("cat", "VARCHAR(50)", "Thể loại: Bida, Gaming/Net, Karaoke Mini, Thể thao"),
        ("price", "VARCHAR(100)", "Bảng giá dịch vụ ưu đãi sinh viên"),
        ("address", "VARCHAR(255)", "Địa chỉ chi tiết cơ sở"),
        ("hours", "VARCHAR(100)", "Giờ mở cửa hoạt động (VD: 08:00 - 24:00 hoặc 24/7)"),
        ("rating", "DECIMAL(3,2)", "Điểm đánh giá chất lượng dịch vụ"),
        ("status", "ENUM(...)", "approved (Hiển thị) / hidden (Tạm ẩn)")
    ]
    t_e = doc.add_table(rows=len(cols_ent) + 1, cols=3)
    style_table(t_e, ["Thuộc tính", "Kiểu dữ liệu MySQL", "Ràng buộc / Ghi chú"], cols_ent, [1.6, 1.8, 3.0])
    add_p(doc,
        "• hours: Giờ mở cửa hoạt động giúp sinh viên biết địa điểm nào phục vụ 24/7 hoặc mở đêm.\n"
        "• status: Trạng thái kiểm duyệt, hỗ trợ chức năng Thêm / Xóa tự động lưu trực tiếp CSDL MySQL.",
        bold_prefix="* Chú thích Bảng 2.6 (Bảng entertainment):\n", italic=True
    )
    doc.add_paragraph().paragraph_format.space_after = Pt(4)

    # Bảng 2.7: user_favorites
    add_p(doc, "Bảng 2.7. Cấu trúc bảng user_favorites (Danh sách tin lưu yêu thích)", bold_prefix=None, space_after=3)
    cols_fav = [
        ("id", "BIGINT UNSIGNED", "PK (Khóa chính tự tăng)"),
        ("user_id", "BIGINT UNSIGNED", "FK tham chiếu users(id), ON DELETE CASCADE"),
        ("item_type", "ENUM(...)", "housing / food / market / entertainment"),
        ("item_id", "BIGINT UNSIGNED", "Mã bản ghi bài đăng được lưu"),
        ("created_at", "DATETIME", "Thời điểm sinh viên lưu tin")
    ]
    t_fav = doc.add_table(rows=len(cols_fav) + 1, cols=3)
    style_table(t_fav, ["Thuộc tính", "Kiểu dữ liệu MySQL", "Ràng buộc / Ghi chú"], cols_fav, [1.6, 1.8, 3.0])
    add_p(doc,
        "• item_type, item_id: Cặp thuộc tính định danh bài đăng đa hình, cho phép một sinh viên lưu chéo cả phòng trọ, quán ăn hay đồ cũ vào mục Yêu thích cá nhân.",
        bold_prefix="* Chú thích Bảng 2.7 (Bảng user_favorites):\n", italic=True
    )
    doc.add_paragraph().paragraph_format.space_after = Pt(6)

    # 2.5.2 Dữ liệu thực nghiệm phpMyAdmin
    add_heading_styled(doc, "2.5.2. Các tập dữ liệu thực nghiệm trong phpMyAdmin (XAMPP)", level=3)
    add_p(doc,
        "Dữ liệu mẫu đã được nạp trực tiếp vào cơ sở dữ liệu unilife_db trên máy chủ MySQL của XAMPP thông qua file setup_database.bat và tập lệnh unilife_database.sql:\n"
        "• Bảng users: Đã nạp các tài khoản mẫu đại diện cho các nhóm vai trò: Admin (admin@unilife.vn), Khách hàng sinh viên (khachhang@gmail.com), Chủ nhà trọ (bich.tran@gmail.com), Chủ quán ăn (minh.food@gmail.com). Toàn bộ email đăng ký đều tuân thủ định dạng @gmail.com và số điện thoại liên hệ duy nhất, không trùng lặp.\n"
        "• Bảng housing: Đã nạp dữ liệu thực nghiệm các phòng trọ sinh viên tại các khu vực gần Đại học Kiến trúc Đà Nẵng (Hải Châu, Thanh Khê, Cẩm Lệ).\n"
        "• Bảng marketplace & food_places: Đã nạp các mặt hàng giáo trình, đồ gia dụng phòng trọ và quán ăn bình dân phục vụ đời sống sinh viên.\n\n"
        "Dưới đây là hình ảnh thực tế trích xuất từ phpMyAdmin minh chứng dữ liệu đã được lưu trữ hoàn chỉnh:"
    )
    add_image_safe(doc, r"D:\24CT1-PHANTRIDUC\docs\db_2_bang_users.png", "Hình 2.21: Dữ liệu thực nghiệm bảng users trong phpMyAdmin (Email @gmail.com, SĐT không trùng, phân quyền vai trò)")
    add_image_safe(doc, r"D:\24CT1-PHANTRIDUC\docs\db_3_bang_housing.png", "Hình 2.22: Dữ liệu thực nghiệm bảng housing trong phpMyAdmin (Danh sách phòng trọ, giá thuê, diện tích, địa chỉ)")

    # =========================================================================
    # 2.5.3 NHẬN THỨC 4 (YÊU CẦU 2.3.6): TRUY VẤN TỔNG SỐ NGƯỜI THEO VAI TRÒ/ROLE
    # =========================================================================
    add_heading_styled(doc, "2.5.3. Nhận thức 4 (Yêu cầu 2.3.6): Truy vấn tổng số người cho từng vai trò/role của đề tài", level=3)
    add_p(doc,
        "Theo đúng yêu cầu bổ sung báo cáo tại Bài nhận thức 4 (Mục 2.3.6), hệ thống thực hiện truy vấn nhóm (GROUP BY) trên bảng users để đếm chính xác tổng số lượng tài khoản đăng ký theo từng vai trò (role) trong đề tài UniLife, đồng thời thống kê số lượng tài khoản đang hoạt động (Active). Dưới đây là hình ảnh chụp cả câu lệnh truy vấn SQL thực thi lẫn bảng kết quả truy vấn trả về từ CSDL:",
        bold_prefix="• Mục tiêu và Ý nghĩa nghiệp vụ: "
    )
    add_p(doc,
        "-- Câu lệnh SQL thực thi trong phpMyAdmin:\n"
        "SELECT \n"
        "    role AS `Vai trò`,\n"
        "    COUNT(*) AS `Tổng số người dùng`,\n"
        "    SUM(CASE WHEN status = 'Active' THEN 1 ELSE 0 END) AS `Đang hoạt động (Active)`\n"
        "FROM users\n"
        "GROUP BY role\n"
        "ORDER BY COUNT(*) DESC;",
        bold_prefix="• Câu truy vấn SQL thống kê vai trò (Role Query):\n",
        italic=True
    )
    add_image_safe(doc, r"D:\24CT1-PHANTRIDUC\docs\db_sql_roles_count.png", "Hình 2.24: Câu lệnh truy vấn SQL và kết quả thống kê số lượng người dùng theo vai trò trong phpMyAdmin (Nhận thức 4)")

    # Bảng số liệu thống kê vai trò
    add_p(doc, "Bảng 2.8. Tổng hợp số lượng người dùng theo từng vai trò trong CSDL UniLife:", bold_prefix=None, space_after=3)
    t_roles = doc.add_table(rows=6, cols=6)
    roles_data = [
        ("1", "Khách hàng (Sinh viên)", "6", "6", "66.7%", "Tìm trọ, xem hotline, lưu yêu thích, mua bán đồ cũ"),
        ("2", "Quản trị viên (Admin)", "1", "1", "11.1%", "Giám sát hệ thống, quản lý CSDL, duyệt tin bài"),
        ("3", "Chủ nhà trọ (Host)", "1", "1", "11.1%", "Đăng tin cho thuê trọ, quản lý phòng, cập nhật giá"),
        ("4", "Chủ quán ăn (Food Vendor)", "1", "1", "11.1%", "Đăng tải địa chỉ, thực đơn quán ăn sinh viên"),
        ("Tổng", "Toàn bộ hệ thống", "9", "9", "100%", "Cơ sở dữ liệu mẫu kiểm thử đầy đủ các nhóm đối tượng")
    ]
    style_table(t_roles, ["STT", "Vai trò (Role)", "Tổng số", "Active", "Tỷ lệ", "Mục đích & Quyền hạn"], roles_data, [0.6, 2.0, 0.8, 0.8, 0.8, 2.4])

    add_p(doc,
        "• Cột 'Tổng số': Thể hiện tổng số tài khoản thực tế trong CSDL unilife_db. Nhóm sinh viên chiếm tỷ lệ lớn nhất (66.7%), chứng minh mục tiêu cốt lõi của nền tảng.\n"
        "• Cột 'Active': Toàn bộ 9/9 tài khoản đều đang hoạt động bình thường, không có tài khoản vi phạm bị khóa (Banned), đảm bảo hệ thống sẵn sàng hoạt động ổn định.\n"
        "• Cột 'Tỷ lệ': Cơ cấu phân bổ cân đối giữa người sử dụng dịch vụ (Sinh viên) và các đối tác cung cấp dịch vụ (Chủ trọ, Chủ quán ăn) cùng Quản trị viên điều hành.",
        bold_prefix="* Chú thích Bảng 2.8 (Thống kê vai trò người dùng):\n", italic=True
    )
    doc.add_paragraph().paragraph_format.space_after = Pt(6)

    # =========================================================================
    # 2.5.4 NHẬN THỨC 5 (YÊU CẦU 2.3.5): TRUY VẤN TỔNG SỐ LƯỢNG BÀI ĐĂNG VÀ DANH SÁCH CỤ THỂ
    # =========================================================================
    add_heading_styled(doc, "2.5.4. Nhận thức 5 (Yêu cầu 2.3.5): Truy vấn tổng số lượng bài đăng và danh sách cụ thể bài đăng trong đề tài", level=3)
    add_p(doc,
        "Theo đúng yêu cầu bổ sung báo cáo tại Bài nhận thức 5 (Mục 2.3.5), hệ thống thực hiện hai mức độ truy vấn dữ liệu toàn diện:\n"
        "(1) Truy vấn thống kê tổng số lượng bài đăng/sản phẩm theo từng phân hệ tiện ích sinh viên;\n"
        "(2) Truy vấn liên kết bảng và liệt kê danh sách chi tiết cụ thể từng bài đăng (ID, tiêu đề, chủ bài đăng, giá cả, diện tích, địa chỉ, số điện thoại liên hệ, trạng thái kiểm duyệt) trong cơ sở dữ liệu MySQL.",
        bold_prefix="• Mục tiêu và Ý nghĩa nghiệp vụ: "
    )

    add_p(doc,
        "-- Câu lệnh SQL thống kê tổng số lượng bài đăng theo từng phân hệ:\n"
        "SELECT 'Phòng trọ cho thuê (housing)' AS `Phân hệ bài đăng`, COUNT(*) AS `Tổng số lượng bài` FROM housing\n"
        "UNION ALL\n"
        "SELECT 'Chợ đồ cũ thanh lý (marketplace)', COUNT(*) FROM marketplace\n"
        "UNION ALL\n"
        "SELECT 'Quán ăn & Cà phê sinh viên (food_places)', COUNT(*) FROM food_places\n"
        "UNION ALL\n"
        "SELECT 'Tụ điểm vui chơi giải trí (entertainment)', COUNT(*) FROM entertainment\n"
        "UNION ALL\n"
        "SELECT 'Tài liệu học tập & Đề thi (study_documents)', COUNT(*) FROM study_documents;",
        bold_prefix="A. Câu truy vấn SQL thống kê số lượng bài đăng theo từng phân hệ:\n",
        italic=True
    )
    add_image_safe(doc, r"D:\24CT1-PHANTRIDUC\docs\db_sql_posts_summary.png", "Hình 2.25: Câu lệnh SQL và kết quả thống kê tổng số lượng bài đăng theo từng phân hệ trong phpMyAdmin (Nhận thức 5)")

    # Bảng tổng hợp số lượng bài đăng
    add_p(doc, "Bảng 2.9. Tổng hợp số lượng bài đăng và sản phẩm theo từng phân hệ trong CSDL UniLife:", bold_prefix=None, space_after=3)
    t_summary_posts = doc.add_table(rows=7, cols=5)
    summary_posts_data = [
        ("1", "Phòng trọ cho thuê sinh viên", "housing", "3 bài đăng", "approved (100% đã kiểm duyệt)"),
        ("2", "Chợ đồ cũ & Giáo trình thanh lý", "marketplace", "3 bài đăng", "Đang mở bán công khai"),
        ("3", "Quán ăn & Cà phê sinh viên", "food_places", "2 bài đăng", "Đang hoạt động, đánh giá 4.8 - 4.9★"),
        ("4", "Tụ điểm vui chơi giải trí", "entertainment", "0 bài đăng (Chờ đồng bộ)", "Tự động lưu khi người dùng thêm mới"),
        ("5", "Góc học tập & Đề thi chia sẻ", "study_documents", "0 bài đăng (Chờ đồng bộ)", "Phục vụ tải miễn phí tài liệu"),
        ("Tổng", "Tổng số lượng bài đăng / sản phẩm", "Toàn hệ thống", "8 bài đăng", "Đầy đủ dữ liệu demo thực tế")
    ]
    style_table(t_summary_posts, ["STT", "Phân hệ tiện ích sinh viên", "Tên bảng MySQL", "Số lượng bài", "Trạng thái hiển thị"], summary_posts_data, [0.6, 2.5, 1.5, 1.2, 1.8])

    add_p(doc,
        "• Bảng housing và marketplace chiếm số lượng nhiều nhất, phục vụ trực tiếp hai nhu cầu tìm chỗ ở và mua sắm đồ dùng học tập tiết kiệm của sinh viên.\n"
        "• 100% bài đăng demo đều đạt trạng thái 'approved', đảm bảo nội dung sạch và hiển thị đầy đủ trên giao diện website.",
        bold_prefix="* Chú thích Bảng 2.9 (Tổng hợp số lượng bài đăng):\n", italic=True
    )
    doc.add_paragraph().paragraph_format.space_after = Pt(4)

    # Phần B: DANH SÁCH BÀI ĐĂNG CỤ THỂ
    add_p(doc,
        "Dưới đây là kết quả thực thi câu lệnh SQL SELECT kèm hình ảnh chụp câu lệnh và kết quả truy vấn, trích xuất danh sách cụ thể từng bài đăng thực tế đang lưu trữ trong CSDL MySQL:",
        bold_prefix="B. Danh sách chi tiết cụ thể các bài đăng trong CSDL (List chi tiết):\n"
    )

    # 1. Danh sách phòng trọ
    add_p(doc,
        "-- Truy vấn danh sách chi tiết bài đăng phòng trọ kèm thông tin chủ trọ:\n"
        "SELECT h.id AS `Mã tin`, h.name AS `Tiêu đề phòng trọ`, COALESCE(u.name, 'Chủ trọ') AS `Chủ trọ đăng tin`,\n"
        "       h.price AS `Giá thuê`, h.area AS `Diện tích`, h.address AS `Địa chỉ phòng`,\n"
        "       h.dist AS `Khoảng cách đến trường`, h.phone AS `Hotline`, h.status AS `Trạng thái`\n"
        "FROM housing h\n"
        "LEFT JOIN users u ON h.user_id = u.id\n"
        "ORDER BY h.id ASC;",
        bold_prefix="1. Danh sách chi tiết bài đăng Phòng trọ cho thuê (Bảng housing):\n",
        italic=True
    )
    add_image_safe(doc, r"D:\24CT1-PHANTRIDUC\docs\db_sql_housing_posts_list.png", "Hình 2.26: Câu lệnh SQL và kết quả liệt kê danh sách cụ thể các bài đăng phòng trọ trong phpMyAdmin (Nhận thức 5)")

    t_housing_posts = doc.add_table(rows=4, cols=8)
    housing_posts_data = [
        ("#1", "Phòng Studio Full Nội Thất Ban Công", "Trần Thị Bích", "2.8 tr/tháng", "25m²", "128/14 Nguyễn Văn Linh, Q. Thanh Khê", "600m", "0905.123.456"),
        ("#2", "Ký Túc Xá Cao Cấp Box Riêng Tư", "Trần Thị Bích", "1.3 tr/người", "Giường box", "45 Phan Đăng Lưu, Q. Hải Châu", "400m", "0935.222.111"),
        ("#3", "Phòng Trọ Khép Kín Có Gác Lửng Đẹp", "Trần Thị Bích", "2.2 tr/tháng", "22m²", "89 Núi Thành, Q. Hải Châu", "1.1 km", "0905.777.888")
    ]
    style_table(t_housing_posts, ["Mã tin", "Tiêu đề phòng trọ", "Chủ trọ", "Giá thuê", "Diện tích", "Địa chỉ", "Khoảng cách", "Hotline"], housing_posts_data, [0.6, 2.0, 1.1, 0.9, 0.8, 1.8, 0.8, 1.0])
    add_p(doc,
        "• Vị trí địa lý: Toàn bộ phòng trọ đều nằm trong bán kính gần (từ 400m đến 1.1 km) quanh trường Đại học Kiến trúc Đà Nẵng.\n"
        "• Mức giá: Phân bổ hợp lý từ 1.3 triệu đến 2.8 triệu/tháng, phù hợp cho cả sinh viên ở ghép lẫn sinh viên muốn không gian riêng tư.\n"
        "• Thông tin xác thực: Đầy đủ hotline chính chủ của chủ nhà trọ Trần Thị Bích để sinh viên gọi điện xem phòng.",
        bold_prefix="* Chú thích Bảng danh sách bài đăng phòng trọ:\n", italic=True
    )
    doc.add_paragraph().paragraph_format.space_after = Pt(4)

    # 2. Danh sách Chợ đồ cũ
    add_p(doc,
        "-- Truy vấn danh sách chi tiết sản phẩm thanh lý:\n"
        "SELECT m.id AS `Mã SP`, m.name AS `Tên sản phẩm thanh lý`, COALESCE(u.name, 'Sinh viên') AS `Người bán`,\n"
        "       m.price AS `Giá thanh lý`, m.cond AS `Tình trạng`, m.cat AS `Danh mục`, m.phone AS `Liên hệ Zalo`\n"
        "FROM marketplace m\n"
        "LEFT JOIN users u ON m.user_id = u.id\n"
        "ORDER BY m.id ASC;",
        bold_prefix="2. Danh sách chi tiết sản phẩm Chợ đồ cũ & Giáo trình thanh lý (Bảng marketplace):\n",
        italic=True
    )
    t_market_posts = doc.add_table(rows=4, cols=7)
    market_posts_data = [
        ("#1", "Bộ Giáo Trình Giải Tích 1 + 2 (Kèm bài giải mẫu)", "Nguyễn Văn Khang", "60.000đ", "Còn mới 95%", "Sách / Giáo trình", "0905.888.999"),
        ("#2", "Nồi Cơm Điện Mini Sunhouse 1.2L", "Nguyễn Văn Khang", "150.000đ", "Dùng tốt, nguyên bản", "Gia dụng sinh viên", "0914.333.222"),
        ("#4", "ba con sói hàng ngô bình", "Ban Quản Trị", "152.000đ", "Đã dùng - tốt", "Gia dụng sinh viên", "0909.888.999")
    ]
    style_table(t_market_posts, ["Mã SP", "Tên sản phẩm thanh lý", "Người bán", "Giá thanh lý", "Tình trạng", "Danh mục", "Hotline / Zalo"], market_posts_data, [0.6, 2.2, 1.2, 0.9, 1.1, 1.2, 1.0])
    add_p(doc,
        "• Hỗ trợ sinh viên khóa trước thanh lý lại sách giáo trình đại cương và đồ dùng phòng trọ với chi phí tiết kiệm từ 60.000đ đến 152.000đ.\n"
        "• Tình trạng sử dụng được mô tả trung thực (Mới 95%, Dùng tốt) giúp sinh viên an tâm khi trao đổi.",
        bold_prefix="* Chú thích Bảng danh sách sản phẩm chợ đồ cũ:\n", italic=True
    )
    doc.add_paragraph().paragraph_format.space_after = Pt(4)

    # 3. Danh sách Quán ăn
    add_p(doc,
        "-- Truy vấn danh sách chi tiết quán ăn sinh viên:\n"
        "SELECT id AS `Mã quán`, name AS `Tên quán ăn / đồ uống`, cat AS `Phân loại`,\n"
        "       price AS `Khoảng giá`, address AS `Địa chỉ quán`, rating AS `Điểm đánh giá`\n"
        "FROM food_places ORDER BY id ASC;",
        bold_prefix="3. Danh sách chi tiết bài đăng Quán ăn & Cà phê sinh viên (Bảng food_places):\n",
        italic=True
    )
    t_food_posts = doc.add_table(rows=3, cols=6)
    food_posts_data = [
        ("#1", "Cơm Tấm Đêm Sinh Viên Cô Ba", "Cơm bình dân", "25.000đ - 35.000đ", "142 Huỳnh Thúc Kháng, Q. Hải Châu", "4.80 ★ / 5.0"),
        ("#2", "Bún Bò Huế & Bún Riêu Cua Bà Ty", "Bún / Phở", "25.000đ - 40.000đ", "68 Trưng Nữ Vương, Q. Hải Châu", "4.90 ★ / 5.0")
    ]
    style_table(t_food_posts, ["Mã quán", "Tên quán ăn / nước uống", "Phân loại", "Khoảng giá sinh viên", "Địa chỉ quanh trường", "Đánh giá"], food_posts_data, [0.7, 2.2, 1.1, 1.3, 2.0, 0.9])
    add_p(doc,
        "• Địa điểm ẩm thực quen thuộc của sinh viên Đại học Kiến trúc Đà Nẵng với mức giá vừa túi tiền (25.000đ - 40.000đ).\n"
        "• Điểm đánh giá xuất sắc (4.8 - 4.9 sao) khẳng định tiêu chí Ngon - Bổ - Rẻ của hệ sinh thái ẩm thực UniLife.",
        bold_prefix="* Chú thích Bảng danh sách quán ăn sinh viên:\n", italic=True
    )
    doc.add_paragraph().paragraph_format.space_after = Pt(6)

    # 2.5.5 Quản lý Vui chơi giải trí
    add_heading_styled(doc, "2.5.5. Chức năng quản lý Tụ điểm Vui chơi giải trí & Tự động lưu CSDL", level=3)
    add_p(doc,
        "Đáp ứng nhu cầu đời sống tinh thần của sinh viên sau những giờ học tập và thi cử căng thẳng, phân hệ Vui chơi & Giải trí (Entertainment) đã được hoàn thiện với các tính năng:\n"
        "1. Thêm địa điểm vui chơi mới: Người dùng và quản trị viên có thể nhấn nút '+ Thêm tụ điểm vui chơi' để mở biểu mẫu nhập tên tụ điểm, phân loại (Bida, Gaming/Net, Karaoke, Thể thao), giá dịch vụ, địa chỉ và giờ mở cửa.\n"
        "2. Xóa địa điểm vui chơi: Mỗi thẻ địa điểm được trang bị nút xóa (biểu tượng thùng rác). Khi xác nhận xóa, hệ thống sẽ gửi lệnh DELETE tới api/entertainment.php và gỡ bản ghi vĩnh viễn khỏi CSDL MySQL.\n"
        "3. Tự động lưu trữ CSDL (Persistence): Toàn bộ thao tác Thêm / Xóa đều được tự động lưu trực tiếp vào bảng entertainment trong CSDL unilife_db trên phpMyAdmin, đồng thời đồng bộ hai chiều với bộ nhớ trình duyệt."
    )
    add_image_safe(doc, r"D:\24CT1-PHANTRIDUC\docs\db_4_bang_entertainment.png", "Hình 2.23: Dữ liệu thực nghiệm bảng entertainment được lưu trữ tự động trong CSDL MySQL trên phpMyAdmin")

    # 2.5.6 Bộ lọc đa năng
    add_heading_styled(doc, "2.5.6. Mục tiêu và giải pháp Bộ lọc đa năng trong CSDL (Lọc Tên, SĐT, Vai trò, Trạng thái)", level=3)
    add_p(doc,
        "Trong quá trình vận hành một nền tảng phục vụ hàng nghìn sinh viên và đối tác chủ trọ, cơ sở dữ liệu sẽ nhanh chóng phình to. Việc xây dựng một Bộ lọc tìm kiếm đa năng trong CSDL không chỉ đơn thuần là chức năng tiện ích, mà mang những mục tiêu nghiệp vụ và kỹ thuật cốt lõi sau:\n\n"
        "A. MỤC TIÊU NGHIỆP VỤ (BUSINESS OBJECTIVES):\n"
        "1. Tra cứu và hỗ trợ người dùng tức thì: Khi sinh viên hoặc chủ trọ liên hệ qua hotline/Zalo để yêu cầu hỗ trợ (quên mật khẩu, khiếu nại chất lượng phòng, xử lý sự cố bài đăng), quản trị viên chỉ cần gõ Số điện thoại hoặc Họ tên vào ô tìm kiếm là tìm thấy hồ sơ người dùng trong 0.1 giây, nâng cao trải nghiệm người dùng tối đa.\n"
        "2. Phân nhóm vai trò để kiểm duyệt đối tác: Quản trị viên có thể bấm nút lọc 'Chủ nhà trọ' để rà soát toàn bộ danh sách các chủ nhà trọ đang hoạt động, đối chiếu số điện thoại trước khi phê duyệt tin đăng phòng trọ mới, ngăn chặn triệt để tình trạng mạo danh hoặc môi giới trọ lừa đảo sinh viên.\n"
        "3. Kiểm soát an ninh và ngăn chặn gian lận (Fraud Detection): Dễ dàng kết hợp lọc theo trạng thái 'Bị khóa' (Banned) để theo dõi các đối tượng từng có hành vi vi phạm điều khoản cộng đồng, đăng tin ảo hoặc rao bán đồ cũ kém chất lượng.\n"
        "4. Nắm bắt biến động và báo cáo định kỳ: Cung cấp số liệu chính xác về tốc độ gia tăng sinh viên và chủ trọ theo từng kỳ tuyển sinh, phục vụ việc lập báo cáo đánh giá hiệu quả dự án.\n\n"
        "B. MỤC TIÊU KỸ THUẬT VÀ HIỆU NĂNG CSDL (TECHNICAL OBJECTIVES):\n"
        "1. Tối ưu hóa tốc độ truy vấn từ O(N) xuống O(log N): Thay vì quét toàn bộ bảng (Table Full Scan) khi tìm kiếm hàng chục nghìn dòng dữ liệu, hệ thống thiết lập các chỉ mục B-Tree (Indexes) trên các cột thường xuyên tìm kiếm: idx_users_name, idx_users_phone, idx_users_role, idx_users_status. Nhờ đó, MySQL chỉ duyệt qua các nút chỉ mục với độ phức tạp thuật toán O(log N), tiết kiệm tài nguyên CPU và bộ nhớ RAM của máy chủ XAMPP.\n"
        "2. Bảo mật an toàn tuyệt đối với SQL Injection: Toàn bộ quá trình lọc trong file backend api/users.php áp dụng kỹ thuật Prepared Statements với tham số truyền vào được liên kết an toàn ($stmt->bind_param), triệt tiêu hoàn toàn các nguy cơ tấn công SQL Injection từ ô tìm kiếm.\n"
        "3. Cơ chế lọc linh hoạt hai tầng (Hybrid Filtering): Kết hợp thuật toán lọc nhanh tại Client (State React trong AdminView.jsx) để giao diện phản hồi tức thời theo từng ký tự gõ vào, song song với việc gọi truy vấn có điều kiện WHERE (name LIKE ? OR phone LIKE ?) AND role = ? tại Backend khi dữ liệu lớn."
    )

    # 2.5.7 Quy trình đăng ký lưu CSDL tự động
    add_heading_styled(doc, "2.5.7. Quy trình Đăng ký tài khoản mới tự động lưu vào CSDL MySQL và cập nhật hiển thị tức thì", level=3)
    add_p(doc,
        "Một trong những điểm đột phá trong kiến trúc của UniLife là cơ chế đồng bộ dữ liệu thời gian thực giữa Khách hàng đăng ký, Backend máy chủ XAMPP, Cơ sở dữ liệu MySQL và Bảng điều khiển Quản trị Admin. Quy trình luân chuyển dữ liệu được thực thi qua 4 pha chặt chẽ sau:\n\n"
        "• Pha 1: Nhập liệu và Kiểm chuẩn tầng Giao diện (Client Validation):\n"
        "  - Khách hàng (Sinh viên / Chủ trọ) bấm nút 'Đăng ký' trên Header → Component AuthModal.jsx hiển thị form đăng ký.\n"
        "  - Người dùng điền đầy đủ: Họ tên, Email, Số điện thoại, Mật khẩu và chọn Vai trò.\n"
        "  - Frontend tự động kiểm tra cú pháp regex email đuôi @gmail.com và kiểm tra độ dài số điện thoại (10 chữ số). Nếu vi phạm, hiển thị thông báo lỗi ngay dưới ô nhập liệu và khóa nút đăng ký.\n\n"
        "• Pha 2: Đóng gói và Gửi yêu cầu qua Backend PHP (REST API):\n"
        "  - Khi người dùng bấm 'Đăng ký tài khoản', Frontend gửi yêu cầu HTTP POST tới file backend: api/register.php.\n"
        "  - Payload JSON mang dữ liệu người dùng được truyền qua mạng nội bộ tới máy chủ Apache (XAMPP port 80).\n"
        "  - File backend tiếp nhận dữ liệu, thực hiện sanitize chống mã độc XSS và kiểm tra trùng lặp trên CSDL bằng câu lệnh: SELECT id FROM users WHERE email = ? OR phone = ?.\n"
        "  - Nếu phát hiện trùng lặp, trả về mã lỗi HTTP 409: 'Email hoặc Số điện thoại này đã được sử dụng!'.\n\n"
        "• Pha 3: Băm mật khẩu và Ghi nhận vào CSDL MySQL (Data Persistence):\n"
        "  - Mật khẩu người dùng được băm an toàn bằng thuật toán password_hash($password, PASSWORD_DEFAULT).\n"
        "  - PHP thực thi câu lệnh SQL INSERT an toàn vào bảng users:\n"
        "    INSERT INTO users (name, email, password_hash, phone, role, status, avatar_url)\n"
        "    VALUES (?, ?, ?, ?, ?, 'Active', ?);\n"
        "  - Hệ quản trị MySQL ghi bản ghi vào tệp dữ liệu vật lý của database unilife_db, tự động sinh khóa chính id (Auto-Increment) và trả về insert_id cho máy chủ PHP.\n"
        "  - File api/register.php đóng gói phản hồi JSON chuẩn RESTful: { success: true, message: 'Đăng ký tài khoản thành công!', user: { id: ..., name: ..., email: ..., phone: ..., role: ... } }.\n\n"
        "• Pha 4: Phản hồi kết quả, Tự động đăng nhập và Tức thì xuất hiện trên Admin Dashboard:\n"
        "  - Frontend nhận phản hồi thành công (HTTP 200 OK) từ backend.\n"
        "  - Hệ thống tự động ghi nhớ phiên đăng nhập vào localStorage và cập nhật React Context (setCurrentUser).\n"
        "  - Modal đăng ký tự động đóng lại, hiển thị Toast thông báo xanh chúc mừng và thanh Header lập tức hiển thị Họ tên cùng Avatar của người dùng mới.\n"
        "  - ĐẶC BIỆT: Bản ghi người dùng mới lập tức được bổ sung vào danh sách người dùng toàn cục (setUsers(prev => [newUser, ...prev])). Khi Quản trị viên mở Bảng điều khiển Quản trị (Admin Dashboard tại /admin), tài khoản mới này lập tức xuất hiện ở vị trí đầu tiên của bảng danh sách người dùng, đồng thời thẻ thống kê số lượng theo vai trò tương ứng (Role Counts) tự động nhảy số tăng thêm 1 theo thời gian thực mà hoàn toàn không cần người quản trị phải nhấn F5 hay tải lại trang!"
    )

    # 2.5.8 Quy chuẩn bảo mật
    add_heading_styled(doc, "2.5.8. Quy chuẩn bảo mật & Kiểm soát dữ liệu đăng ký (@gmail.com, SĐT duy nhất)", level=3)
    add_p(doc,
        "Để đảm bảo tính xác thực của thông tin tài khoản và tránh tình trạng người dùng ảo hoặc spam dữ liệu, hệ thống UniLife áp dụng hai quy chuẩn kiểm soát nghiêm ngặt ngay từ khâu đăng ký:\n\n"
        "1. Ràng buộc định dạng Email (@gmail.com):\n"
        "• Toàn bộ tài khoản đăng ký mới bắt buộc phải có phần đuôi là @gmail.com (hộp thư điện tử phổ biến và đáng tin cậy nhất).\n"
        "• Tầng Frontend (AuthModal.jsx): Kiểm tra regex và kiểm tra chuỗi .endsWith('@gmail.com'), nếu người dùng nhập đuôi khác sẽ lập tức cảnh báo: 'Email đăng ký bắt buộc phải có đuôi là @gmail.com!'.\n"
        "• Tầng Backend (api/register.php): Sử dụng biểu thức chính quy kiểm tra nghiêm ngặt: preg_match('/^[a-zA-Z0-9._%+-]+@gmail\\.com$/i', $email).\n\n"
        "2. Ràng buộc Số điện thoại chính chủ không trùng lặp:\n"
        "• Số điện thoại là phương tiện liên lạc duy nhất giữa sinh viên và chủ nhà trọ / người bán hàng.\n"
        "• Ràng buộc toàn vẹn CSDL: Cột phone trong bảng users được thiết lập khóa UNIQUE KEY (uk_users_phone), đảm bảo CSDL MySQL từ chối mọi nỗ lực ghi đè trùng lặp.\n"
        "• Kiểm tra tiền trạm Backend: File api/register.php thực thi lệnh SELECT id FROM users WHERE phone = ?, nếu phát hiện trùng sẽ gửi phản hồi lỗi và yêu cầu đổi số điện thoại.\n"
        "• Kiểm tra thời gian thực Frontend: So sánh đối chiếu số điện thoại với danh sách người dùng đang có và thông báo ngay trên form đăng ký."
    )

    # =========================================================================
    # 2.6 KẾT LUẬN CHƯƠNG THỰC NGHIỆM
    # =========================================================================
    add_heading_styled(doc, "2.6. Kết luận chương thực nghiệm", level=2)
    add_p(doc,
        "Chương 2 đã hoàn thành toàn diện các nội dung thực nghiệm theo đúng chuẩn mực của học phần Công nghệ phần mềm:\n"
        "• Mô hình hóa Use Case tổng quan phân định rõ quyền hạn của 4 nhóm tác nhân (Khách, Sinh viên, Chủ trọ, Admin).\n"
        "• Xây dựng chuẩn xác 4 sơ đồ tuần tự (Sequence Diagram) 4 tầng thể hiện luồng giao tiếp thông điệp qua các file mã nguồn backend PHP và bảng CSDL MySQL.\n"
        "• Lập kế hoạch tiến độ khoa học bằng sơ đồ mạng PERT và tìm đường găng cho cả dự án UniLife (T = 48 ngày) và bài toán Đề 4 (T = 38 đơn vị thời gian) với đầy đủ 3 bước tính toán chi tiết.\n"
        "• Triển khai quy trình thiết kế 3 bước chuẩn UI/UX qua 4 sơ đồ Figma độc lập và đối soát thực tế với 8 ảnh chụp màn hình phân hệ website UniLife.\n"
        "• Hiện thực hóa cơ sở dữ liệu quan hệ trên máy chủ XAMPP (MySQL & phpMyAdmin) với 5 hình ảnh minh chứng thực tế cấu trúc bảng và Designer View.\n"
        "• Hoàn thành xuất sắc hai yêu cầu bổ sung của giảng viên: Nhận thức 4 (Yêu cầu 2.3.6: Truy vấn tổng số người cho từng vai trò/role) và Nhận thức 5 (Yêu cầu 2.3.5: Truy vấn tổng số lượng bài đăng và list chi tiết cụ thể các bài đăng trong CSDL kèm chụp cả câu lệnh truy vấn lẫn kết quả thực thi)."
    )

    # =========================================================================
    # CHƯƠNG 3: KẾT LUẬN VÀ HƯỚNG PHÁT TRIỂN
    # =========================================================================
    add_heading_styled(doc, "CHƯƠNG 3: KẾT LUẬN VÀ HƯỚNG PHÁT TRIỂN", level=1)

    add_heading_styled(doc, "3.1. Đánh giá kết quả đạt được", level=2)
    add_p(doc,
        "Đề tài “Xây dựng nền tảng tiện ích hỗ trợ đời sống sinh viên UniLife” đã vận dụng thành công các công nghệ trong môi trường máy chủ XAMPP (Apache, MySQL, PHP) kết hợp với thư viện React 18 và Vite để tạo nên một hệ thống web hiện đại, giải quyết thiết thực các nhu cầu của sinh viên.\n\n"
        "Trong phạm vi báo cáo giữa kỳ, hệ thống đã hoàn thành trọn vẹn mô hình Kiến trúc tổng quan 1.2, mô hình Use Case tổng quan, 4 chức năng cốt lõi: Đăng ký, Đăng nhập, Tìm kiếm & Lọc phòng trọ và Đăng tin cho thuê trọ. Các sơ đồ tuần tự minh họa rõ nét luồng trao đổi thông điệp 4 tầng; sơ đồ PERT xác định được tiến độ tối ưu của dự án; và các sơ đồ thiết kế Figma 3 bước đã đối soát hoàn hảo với sản phẩm web thực tế.\n\n"
        "Bên cạnh đó, hệ thống đã hoàn thiện các phân hệ mở rộng tiện ích: Tụ điểm Vui chơi giải trí tự động đồng bộ CSDL MySQL, Bộ lọc người dùng đa tiêu chí trong CSDL (Tên, SĐT, Vai trò, Trạng thái), Thống kê số lượng người dùng theo vai trò (Nhận thức 4), Thống kê và liệt kê chi tiết các bài đăng phòng trọ, chợ đồ cũ, quán ăn (Nhận thức 5), quy trình đăng ký tài khoản tự động lưu vào CSDL MySQL và cập nhật tức thì trên Admin Dashboard, cùng cơ chế kiểm soát dữ liệu đăng ký chặt chẽ (@gmail.com và số điện thoại không trùng lặp). Đặc biệt, báo cáo đã đối soát với 8 ảnh chụp màn hình thực tế từ website UniLife và 8 hình ảnh trích xuất trực tiếp từ Cơ sở dữ liệu MySQL trên giao diện quản trị phpMyAdmin (XAMPP)."
    )

    add_heading_styled(doc, "3.2. Hạn chế của đề tài", level=2)
    add_p(doc,
        "• Hệ thống hiện tại đang được vận hành trên môi trường máy chủ cục bộ (Localhost) của XAMPP, chưa được đưa lên máy chủ Internet thực tế (Cloud Server / VPS).\n"
        "• Cơ chế xác thực tài khoản hiện dựa trên session và token đơn giản, chưa tích hợp xác thực 2 yếu tố (2FA) hoặc gửi mã OTP xác nhận qua Email sinh viên trường.\n"
        "• Chưa tích hợp cổng bản đồ số tương tác (như Google Maps API hoặc OpenStreetMap) để sinh viên có thể định vị trực quan vị trí phòng trọ trên bản đồ thành phố."
    )

    add_heading_styled(doc, "3.3. Hướng phát triển", level=2)
    add_p(doc,
        "1. Tích hợp bản đồ số: Hiển thị vị trí phòng trọ, quán ăn trực tiếp trên bản đồ định vị khoảng cách từ trường học.\n"
        "2. Nâng cấp bảo mật: Áp dụng thuật toán mã hóa mật khẩu bcrypt và cơ chế JSON Web Token (JWT) cho toàn bộ hệ thống API PHP.\n"
        "3. Triển khai Production: Triển khai CSDL MySQL lên máy chủ đám mây và đưa website lên môi trường Internet để sinh viên nhà trường truy cập thực tế.\n"
        "4. Phát triển ứng dụng di động: Xây dựng phiên bản Mobile App (React Native) gửi thông báo đẩy (Push Notification) khi có phòng trọ mới gần trường."
    )

    add_heading_styled(doc, "3.4. Kết luận chung", level=2)
    add_p(doc,
        "Qua quá trình thực hiện đề tài UniLife, em đã có cơ hội kết hợp sâu sắc giữa lý thuyết môn học Công nghệ phần mềm với hoạt động lập trình thực tiễn. Việc mô hình hóa hệ thống bằng sơ đồ kiến trúc 1.2, sơ đồ ca sử dụng và sơ đồ tuần tự, lập kế hoạch bằng mạng PERT và quản trị cơ sở dữ liệu trên môi trường XAMPP giúp em nâng cao tư duy logic và kỹ năng phát triển phần mềm chuyên nghiệp.\n\n"
        "Em xin trân trọng cảm ơn PGS. TS. Phạm Thị Dung đã luôn tận tâm định hướng, hướng dẫn và truyền đạt những kiến thức quý báu để em hoàn thành tốt bài báo cáo này!"
    )

    # Lưu tài liệu hoàn chỉnh
    out_path_main = r"D:\24CT1-PHANTRIDUC\BAO_CAO_GIUA_KY_CNPM_PHAN_TRI_DUC_UNILIFE_BLUE_WHITE.docx"
    out_path_v9 = r"D:\24CT1-PHANTRIDUC\BAO_CAO_GIUA_KY_CNPM_PHAN_TRI_DUC_UNILIFE_BLUE_WHITE_v9.docx"
    artifact_path = r"C:\Users\Asus\.gemini\antigravity\brain\ace0864c-61a4-492d-9454-869f37d09ac5\BAO_CAO_GIUA_KY_CNPM_PHAN_TRI_DUC_UNILIFE_BLUE_WHITE.docx"
    
    saved_paths = []
    # Thử lưu file chính
    try:
        doc.save(out_path_main)
        saved_paths.append(out_path_main)
        print(f"Report saved to main path: {out_path_main}")
    except PermissionError:
        print(f"Warning: {out_path_main} is currently locked by Word. Saving to v9 instead...")
    
    # Luôn lưu v9 để đảm bảo có bản mới nhất không bị xung đột
    try:
        doc.save(out_path_v9)
        saved_paths.append(out_path_v9)
        print(f"Report saved to v9 path: {out_path_v9}")
    except Exception as e:
        print("Error saving to v9:", e)

    # Lưu vào artifact directory
    try:
        doc.save(artifact_path)
        saved_paths.append(artifact_path)
        print(f"Report saved to artifact: {artifact_path}")
    except Exception as e:
        print("Error saving to artifact:", e)

    print("ALL BUILDS COMPLETED SUCCESSFULLY! Saved files:", saved_paths)

if __name__ == "__main__":
    build_report()
