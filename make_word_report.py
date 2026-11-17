# -*- coding: utf-8 -*-
"""
Script cập nhật và xuất bản tài liệu Báo cáo Giữa kỳ Công nghệ Phần mềm hoàn chỉnh:
- Bổ sung Mục 2.4.5: Liệt kê chi tiết 8 phân hệ chức năng trên Website UniLife kèm 8 ảnh chụp màn hình thực tế từ web.
- Bổ sung Mục 2.5.5: Mục tiêu nghiệp vụ & kỹ thuật của Bộ lọc tìm kiếm đa năng trong CSDL.
- Bổ sung Mục 2.5.6: Quy trình Đăng ký tài khoản mới tự động lưu vào CSDL MySQL và cập nhật hiển thị tức thì trên Admin Dashboard.
- Cập nhật Mục lục và liên kết chuẩn xác với các sơ đồ tuần tự và CSDL XAMPP.
"""

import os
from docx import Document
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT, WD_ALIGN_VERTICAL
from docx.oxml import parse_xml, OxmlElement
from docx.oxml.ns import nsdecls, qn

# BẢNG MÀU CHỦ ĐẠO: TRẮNG - XANH DƯƠNG (WHITE & ROYAL BLUE THEME)
COLOR_PRIMARY_BLUE = RGBColor(0x1E, 0x40, 0xAF)    # Royal Blue #1E40AF (Heading 1, Tiêu đề chính)
COLOR_DARK_NAVY    = RGBColor(0x1E, 0x3A, 0x8A)    # Deep Navy #1E3A8A (Heading 2, Table Header)
COLOR_ACCENT_BLUE  = RGBColor(0x25, 0x63, 0xEB)    # Vivid Blue #2563EB (Heading 3, Subtitles)
COLOR_TEXT_MAIN    = RGBColor(0x0F, 0x17, 0x2A)    # Slate Dark #0F172A (Văn bản chính, dễ đọc)
COLOR_TEXT_MUTED   = RGBColor(0x47, 0x55, 0x69)    # Slate Muted #475569 (Chú thích ảnh, ghi chú)

HEX_HEADER_BLUE    = "1E3A8A"                       # Nền Header bảng: Xanh Navy đậm
HEX_ZEBRA_BLUE     = "F0F7FF"                       # Nền dòng so le bảng: Xanh nhạt dịu mắt
HEX_BORDER_BLUE    = "BFDBFE"                       # Viền bảng: Xanh dương nhạt mỏng

def set_cell_background(cell, fill_hex):
    tcPr = cell._tc.get_or_add_tcPr()
    shd = parse_xml(f'<w:shd {nsdecls("w")} w:fill="{fill_hex}"/>')
    tcPr.append(shd)

def set_cell_margins(cell, top=120, bottom=120, left=150, right=150):
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
        r_pre.font.size = Pt(12)
        r_pre.font.bold = True
        r_pre.font.color.rgb = COLOR_DARK_NAVY
    if text:
        r = p.add_run(text)
        r.font.name = "Times New Roman"
        r.font.size = Pt(12)
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

def generate_report():
    doc = Document()

    # Căn lề chuẩn văn bản học thuật
    sections = doc.sections
    for section in sections:
        section.top_margin = Inches(1.0)
        section.bottom_margin = Inches(1.0)
        section.left_margin = Inches(1.2)
        section.right_margin = Inches(1.0)

    # =========================================================================
    # TRANG BÌA (COVER PAGE) - PHONG CÁCH TRẮNG & XANH DƯƠNG CHUYÊN NGHIỆP
    # =========================================================================
    p_univ = doc.add_paragraph()
    p_univ.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_univ.paragraph_format.space_after = Pt(3)
    r = p_univ.add_run("BỘ GIÁO DỤC VÀ ĐÀO TẠO\nTRƯỜNG ĐẠI HỌC KIẾN TRÚC ĐÀ NẴNG\nKHOA CÔNG NGHỆ THÔNG TIN")
    r.font.name = "Times New Roman"
    r.font.size = Pt(12.5)
    r.font.bold = True
    r.font.color.rgb = COLOR_DARK_NAVY

    p_line = doc.add_paragraph()
    p_line.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_line.paragraph_format.space_after = Pt(36)
    r_line = p_line.add_run("━━━━━━━━━━━━━━━━━━━")
    r_line.font.bold = True
    r_line.font.color.rgb = COLOR_PRIMARY_BLUE

    p_title_pre = doc.add_paragraph()
    p_title_pre.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_title_pre.paragraph_format.space_after = Pt(6)
    r_tp = p_title_pre.add_run("BÁO CÁO GIỮA KỲ HỌC PHẦN\nCÔNG NGHỆ PHẦN MỀM")
    r_tp.font.name = "Times New Roman"
    r_tp.font.size = Pt(15)
    r_tp.font.bold = True
    r_tp.font.color.rgb = COLOR_DARK_NAVY

    p_title = doc.add_paragraph()
    p_title.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_title.paragraph_format.space_after = Pt(14)
    r_t = p_title.add_run("ĐỀ TÀI:\nXÂY DỰNG NỀN TẢNG TIỆN ÍCH HỖ TRỢ ĐỜI SỐNG\nSINH VIÊN ĐẠI HỌC KIẾN TRÚC ĐÀ NẴNG (UNILIFE)\nTRÊN MÔI TRƯỜNG MÁY CHỦ XAMPP")
    r_t.font.name = "Times New Roman"
    r_t.font.size = Pt(18)
    r_t.font.bold = True
    r_t.font.color.rgb = COLOR_PRIMARY_BLUE

    p_sub = doc.add_paragraph()
    p_sub.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_sub.paragraph_format.space_after = Pt(45)
    r_s = p_sub.add_run("HỆ THỐNG ALL-IN-ONE: TÌM TRỌ, QUÁN ĂN, CHỢ ĐỒ CŨ, VUI CHƠI VÀ GÓC HỌC TẬP\nKIẾN TRÚC CLIENT-SERVER 4 TẦNG & CƠ SỞ DỮ LIỆU MYSQL ĐỒNG BỘ THỜI GIAN THỰC")
    r_s.font.name = "Times New Roman"
    r_s.font.size = Pt(11)
    r_s.font.italic = True
    r_s.font.color.rgb = COLOR_TEXT_MUTED

    # Khung bảng thông tin giảng viên và sinh viên
    tbl_info = doc.add_table(rows=5, cols=2)
    tbl_info.alignment = WD_TABLE_ALIGNMENT.CENTER
    set_table_borders(tbl_info, color="FFFFFF") # ẩn viền
    info_data = [
        ("Giảng viên hướng dẫn:", "PGS. TS. PHẠM THỊ DUNG"),
        ("Sinh viên thực hiện:", "PHAN TRÍ ĐỨC"),
        ("Mã số sinh viên / Lớp:", "24CT1 (Khoa Công nghệ Thông tin)"),
        ("Học phần:", "Công nghệ Phần mềm - Học kỳ I"),
        ("Nền tảng triển khai:", "XAMPP 8.2 (Apache & MySQL) + React 18 Vite")
    ]
    for r_idx, (k, v) in enumerate(info_data):
        row = tbl_info.rows[r_idx]
        cell_k, cell_v = row.cells[0], row.cells[1]
        set_cell_margins(cell_k, 50, 50, 60, 60)
        set_cell_margins(cell_v, 50, 50, 60, 60)
        
        pk = cell_k.paragraphs[0]
        pk.alignment = WD_ALIGN_PARAGRAPH.RIGHT
        rk = pk.add_run(k)
        rk.font.name = "Times New Roman"
        rk.font.size = Pt(12)
        rk.font.bold = True
        rk.font.color.rgb = COLOR_DARK_NAVY
        
        pv = cell_v.paragraphs[0]
        pv.alignment = WD_ALIGN_PARAGRAPH.LEFT
        rv = pv.add_run(v)
        rv.font.name = "Times New Roman"
        rv.font.size = Pt(12)
        rv.font.bold = (r_idx in [0, 1])
        rv.font.color.rgb = COLOR_PRIMARY_BLUE if r_idx in [0, 1] else COLOR_TEXT_MAIN

    p_bottom = doc.add_paragraph()
    p_bottom.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_bottom.paragraph_format.space_before = Pt(65)
    p_bottom.paragraph_format.space_after = Pt(0)
    r_b = p_bottom.add_run("ĐÀ NẴNG, NĂM 2026")
    r_b.font.name = "Times New Roman"
    r_b.font.size = Pt(12)
    r_b.font.bold = True
    r_b.font.color.rgb = COLOR_DARK_NAVY

    doc.add_page_break()

    # =========================================================================
    # LỜI NHẬN XÉT CỦA GIẢNG VIÊN HƯỚNG DẪN
    # =========================================================================
    add_heading_styled(doc, "LỜI NHẬN XÉT CỦA NGƯỜI HƯỚNG DẪN", level=1)
    add_p(doc, "Họ và tên giảng viên hướng dẫn: PGS. TS. PHẠM THỊ DUNG", bold_prefix=None)
    add_p(doc, "Đơn vị công tác: Khoa Công nghệ Thông tin – Trường Đại học Kiến trúc Đà Nẵng", bold_prefix=None)
    add_p(doc, "Tên đề tài: Xây dựng nền tảng tiện ích hỗ trợ đời sống sinh viên Đại học Kiến trúc Đà Nẵng (UniLife) trên môi trường máy chủ XAMPP.", bold_prefix=None)
    add_p(doc, "Sinh viên thực hiện: PHAN TRÍ ĐỨC – Lớp: 24CT1", bold_prefix=None)
    add_p(doc, "\n1. Tính cấp thiết và tính thực tiễn của đề tài:")
    add_p(doc, "....................................................................................................................................................................................................")
    add_p(doc, "....................................................................................................................................................................................................")
    add_p(doc, "\n2. Đánh giá chất lượng mô hình hóa hệ thống (Sơ đồ kiến trúc 1.2, Sơ đồ Use Case, Sơ đồ tuần tự):")
    add_p(doc, "....................................................................................................................................................................................................")
    add_p(doc, "....................................................................................................................................................................................................")
    add_p(doc, "\n3. Đánh giá tiến độ dự án (Sơ đồ PERT, phương pháp đường găng CPM) và quy trình thiết kế UI/UX:")
    add_p(doc, "....................................................................................................................................................................................................")
    add_p(doc, "....................................................................................................................................................................................................")
    add_p(doc, "\n4. Đánh giá kết quả triển khai cơ sở dữ liệu trên máy chủ XAMPP (MySQL & phpMyAdmin):")
    add_p(doc, "....................................................................................................................................................................................................")
    add_p(doc, "\n5. Ý thức, thái độ học tập và năng lực thực hành của sinh viên:")
    add_p(doc, "....................................................................................................................................................................................................")
    add_p(doc, "\n6. Kết luận và Điểm đánh giá:")
    add_p(doc, "• Điểm bằng số: ....................    • Điểm bằng chữ: .............................................................................................")
    
    p_sign = doc.add_paragraph()
    p_sign.alignment = WD_ALIGN_PARAGRAPH.RIGHT
    p_sign.paragraph_format.space_before = Pt(25)
    r_s = p_sign.add_run("Đà Nẵng, ngày ...... tháng ...... năm 2026\nNgười hướng dẫn\n\n\n\nPGS. TS. PHẠM THỊ DUNG")
    r_s.font.bold = True
    r_s.font.color.rgb = COLOR_DARK_NAVY

    doc.add_page_break()

    # =========================================================================
    # LỜI NHẬN XÉT CỦA NGƯỜI PHẢN BIỆN
    # =========================================================================
    add_heading_styled(doc, "NHẬN XÉT CỦA NGƯỜI PHẢN BIỆN", level=1)
    add_p(doc, "Họ và tên người phản biện: ............................................................................................................................")
    add_p(doc, "Học hàm, học vị: .......................................................................................................................................")
    add_p(doc, "\n1. Nhận xét về cấu trúc và hình thức trình bày báo cáo:")
    add_p(doc, "....................................................................................................................................................................................................")
    add_p(doc, "\n2. Nhận xét về độ tin cậy của mô hình phân tích thiết kế phần mềm:")
    add_p(doc, "....................................................................................................................................................................................................")
    add_p(doc, "\n3. Những điểm đạt được và thiếu sót cần khắc phục:")
    add_p(doc, "....................................................................................................................................................................................................")
    add_p(doc, "\n4. Câu hỏi phỏng vấn giữa kỳ dành cho sinh viên:")
    add_p(doc, "a) .................................................................................................................................................................................................")
    add_p(doc, "b) .................................................................................................................................................................................................")
    add_p(doc, "\n5. Đánh giá chung và Điểm số:")
    add_p(doc, "• Điểm bằng số: ....................    • Điểm bằng chữ: .............................................................................................")

    p_sign2 = doc.add_paragraph()
    p_sign2.alignment = WD_ALIGN_PARAGRAPH.RIGHT
    p_sign2.paragraph_format.space_before = Pt(30)
    r_s2 = p_sign2.add_run("Đà Nẵng, ngày ...... tháng ...... năm 2026\nNgười phản biện\n\n\n\n(Ký và ghi rõ họ tên)")
    r_s2.font.bold = True
    r_s2.font.color.rgb = COLOR_DARK_NAVY

    doc.add_page_break()

    # =========================================================================
    # TÓM TẮT BÁO CÁO (ABSTRACT)
    # =========================================================================
    add_heading_styled(doc, "TÓM TẮT BÁO CÁO", level=1)
    add_p(doc,
        "Đề tài “Xây dựng nền tảng tiện ích hỗ trợ đời sống sinh viên Đại học Kiến trúc Đà Nẵng (UniLife)” là công trình nghiên cứu và thực nghiệm thuộc học phần Công nghệ Phần mềm do PGS. TS. Phạm Thị Dung trực tiếp hướng dẫn. Mục tiêu trọng tâm của dự án là giải quyết triệt để các bài toán thường nhật của sinh viên như: tìm kiếm phòng trọ an toàn giá rẻ, địa điểm ăn uống ngon bổ rẻ, thanh lý đồ dùng học tập cũ, tìm kiếm tụ điểm giải trí lành mạnh và chia sẻ tài liệu ôn thi học kỳ."
    )
    add_p(doc,
        "Hệ thống được xây dựng trên môi trường máy chủ cục bộ XAMPP (Apache Web Server & MySQL Database) kết hợp cùng Frontend React 18, Vite và Tailwind CSS hiện đại. Toàn bộ kiến trúc được mô hình hóa theo mô hình 4 tầng chuẩn mực: Khách hàng (Client UI) – Frontend Controller (Component/Modal) – Backend Router (PHP REST API) – Cơ sở dữ liệu quan hệ MySQL (unilife_db) được quản trị trực quan qua phpMyAdmin."
    )
    add_p(doc,
        "Báo cáo tập trung trình bày Kiến trúc tổng quan hệ thống trên nền tảng XAMPP (Sơ đồ 1.2); Sơ đồ ca sử dụng tổng quan (Sơ đồ 2.1 Use Case Diagram); Hệ thống 4 sơ đồ tuần tự (Sequence Diagram) chuẩn xác; Bảng tiến độ dự án theo phương pháp đường găng PERT (T = 48 ngày); Quy trình thiết kế 3 bước chuẩn UI/UX kèm 4 sơ đồ Figma độc lập (trong đó bước User Flow của Đăng ký được tối ưu hóa 5 bước trực quan dễ hiểu); Đặc tả chi tiết 8 phân hệ chức năng vận hành thực tế kèm hình ảnh minh họa chụp trực tiếp từ website UniLife; và Thiết kế chi tiết cơ sở dữ liệu MySQL gồm 6 bảng dữ liệu chuẩn hóa, tích hợp bộ đếm thống kê vai trò, bộ lọc đa năng (Tên, SĐT, Vai trò) và các ràng buộc bảo mật chặt chẽ."
    )
    add_p(doc, "Từ khóa: UniLife, Sơ đồ kiến trúc 1.2, Use Case Diagram, Sequence Diagram chuẩn, Figma User Flow trực quan, PERT 48 ngày, XAMPP, MySQL, phpMyAdmin, Bộ lọc CSDL, Đăng ký lưu CSDL tự động.", italic=True)

    doc.add_page_break()

    # =========================================================================
    # LỜI NÓI ĐẦU
    # =========================================================================
    add_heading_styled(doc, "LỜI NÓI ĐẦU", level=1)
    add_p(doc,
        "Bước vào môi trường đại học, sinh viên—đặc biệt là các bạn tân sinh viên từ các tỉnh thành khác về học tập tại Trường Đại học Kiến trúc Đà Nẵng—thường gặp muôn vàn khó khăn trong việc thích nghi với đời sống mới. Việc tìm kiếm một phòng trọ sạch sẽ, an ninh với giá cả hợp lý; tìm quán ăn hợp khẩu vị, đảm bảo vệ sinh; tìm mua sách giáo trình, dụng cụ vẽ đồ án cũ giá rẻ; hay tìm kiếm tụ điểm giải trí lành mạnh sau những giờ học căng thẳng luôn là nỗi bận tâm thường trực."
    )
    add_p(doc,
        "Xuất phát từ thực tế đó, cùng với những kiến thức tiếp thu được từ môn học Công nghệ Phần mềm do PGS. TS. Phạm Thị Dung giảng dạy, em đã nghiên cứu và phát triển dự án “Website UniLife – Nền tảng tiện ích hỗ trợ đời sống sinh viên”. Báo cáo này tổng hợp đầy đủ các giai đoạn phân tích yêu cầu, mô hình hóa kiến trúc hệ thống trên môi trường máy chủ XAMPP, thiết kế tương tác thông điệp tuần tự, hoạch định tiến độ bằng mạng PERT và hiện thực hóa cơ sở dữ liệu với kết quả trực quan trên sản phẩm thực tế."
    )

    # =========================================================================
    # LỜI CẢM ƠN
    # =========================================================================
    add_heading_styled(doc, "LỜI CẢM ƠN", level=1)
    add_p(doc,
        "Lời đầu tiên, em xin được bày tỏ lòng biết ơn sâu sắc và chân thành nhất tới PGS. TS. Phạm Thị Dung – Giảng viên hướng dẫn học phần Công nghệ Phần mềm. Trong suốt thời gian qua, Cô đã luôn tận tình truyền đạt những kiến thức chuyên môn quý báu, chỉ dẫn phương pháp tư duy khoa học, đồng thời kiên nhẫn định hướng và góp ý từng chi tiết từ sơ đồ kiến trúc, sơ đồ ca sử dụng, sơ đồ tuần tự đến quy chuẩn thiết kế Figma và quản trị cơ sở dữ liệu để em có thể hoàn thiện đề tài một cách chỉn chu nhất."
    )
    add_p(doc,
        "Em cũng xin gửi lời cảm ơn chân thành tới Ban Giám hiệu cùng quý Thầy Cô Khoa Công nghệ Thông tin – Trường Đại học Kiến trúc Đà Nẵng đã tạo điều kiện học tập tốt nhất cho chúng em. Dù đã có nhiều cố gắng, bài báo cáo khó tránh khỏi những thiếu sót nhất định. Em rất mong nhận được những lời nhận xét, góp ý quý báu của quý Thầy Cô để đồ án tiếp tục được hoàn thiện hơn nữa trong giai đoạn cuối kỳ."
    )

    doc.add_page_break()

    # =========================================================================
    # MỤC LỤC CHI TIẾT
    # =========================================================================
    add_heading_styled(doc, "MỤC LỤC", level=1)
    toc_lines = [
        ("LỜI NHẬN XÉT CỦA NGƯỜI HƯỚNG DẪN", "2"),
        ("NHẬN XÉT CỦA NGƯỜI PHẢN BIỆN", "3"),
        ("TÓM TẮT", "4"),
        ("LỜI NÓI ĐẦU", "5"),
        ("LỜI CẢM ƠN", "6"),
        ("CHƯƠNG 1: TỔNG QUAN CƠ SỞ LÝ THUYẾT", "8"),
        ("  1.1. Giới thiệu tổng quan về đề tài UniLife", "8"),
        ("  1.2. Môi trường XAMPP và Kiến trúc hệ thống (Sơ đồ 1.2)", "8"),
        ("  1.3. Ngôn ngữ và công nghệ giao diện", "10"),
        ("  1.4. Cơ sở dữ liệu MySQL trên phpMyAdmin (XAMPP)", "10"),
        ("  1.5. Công cụ và thư viện hỗ trợ", "11"),
        ("  1.6. Kết luận chương 1", "11"),
        ("CHƯƠNG 2: THỰC NGHIỆM", "12"),
        ("  2.1. Sơ đồ Ca sử dụng (Use Case Diagram)", "12"),
        ("    2.1.1. Bảng xác định Tác nhân (Actors) và Quyền hạn", "12"),
        ("    2.1.2. Sơ đồ Use Case tổng quan toàn hệ thống UniLife", "13"),
        ("    2.1.3. Bảng đặc tả các Use Case cốt lõi của đồ án", "14"),
        ("  2.2. Sơ đồ tuần tự (Sequence Diagram)", "15"),
        ("    2.2.1. Sơ đồ tuần tự chức năng Đăng ký (Register)", "15"),
        ("    2.2.2. Sơ đồ tuần tự chức năng Đăng nhập (Login)", "16"),
        ("    2.2.3. Sơ đồ tuần tự chức năng Tìm kiếm & Lọc phòng trọ (Tự chọn 1)", "17"),
        ("    2.2.4. Sơ đồ tuần tự chức năng Đăng tin cho thuê trọ (Tự chọn 2)", "18"),
        ("  2.3. Sơ đồ PERT và phương pháp đường găng", "19"),
        ("  2.4. Thiết kế và demo các chức năng (3 bước UI/UX)", "21"),
        ("    2.4.1. Bước 1 – Luồng người dùng (User Flow)", "21"),
        ("    2.4.2. Bước 2 – Phác thảo giao diện trang chủ UniLife", "22"),
        ("    2.4.3. Bước 3 – Phác thảo bốn chức năng", "23"),
        ("    2.4.4. Minh họa kết quả thực nghiệm với 4 sơ đồ Figma web UniLife", "24"),
        ("    2.4.5. Liệt kê chi tiết các phân hệ chức năng trên Website UniLife kèm hình ảnh minh họa thực tế", "26"),
        ("  2.5. Dữ liệu (Database MySQL trên XAMPP)", "31"),
        ("    2.5.1. Thiết kế cấu trúc cơ sở dữ liệu", "31"),
        ("    2.5.2. Các tập dữ liệu thực nghiệm trong phpMyAdmin", "33"),
        ("    2.5.3. Thống kê và đếm số lượng người dùng theo từng vai trò (Role Counts)", "34"),
        ("    2.5.4. Chức năng quản lý Tụ điểm Vui chơi giải trí & Tự động lưu CSDL", "35"),
        ("    2.5.5. Mục tiêu và giải pháp Bộ lọc đa năng trong CSDL (Lọc Tên, SĐT, Vai trò, Trạng thái)", "36"),
        ("    2.5.6. Quy trình Đăng ký tài khoản mới tự động lưu vào CSDL MySQL và cập nhật hiển thị tức thì", "37"),
        ("    2.5.7. Quy chuẩn bảo mật & Kiểm soát dữ liệu đăng ký (@gmail.com, SĐT duy nhất)", "38"),
        ("  2.6. Kết luận chương thực nghiệm", "39"),
        ("CHƯƠNG 3: KẾT LUẬN VÀ HƯỚNG PHÁT TRIỂN", "40"),
        ("  3.1. Đánh giá kết quả đạt được", "40"),
        ("  3.2. Hạn chế của đề tài", "40"),
        ("  3.3. Hướng phát triển", "41"),
        ("  3.4. Kết luận chung", "41")
    ]
    for title, page in toc_lines:
        p_toc = doc.add_paragraph()
        p_toc.paragraph_format.line_spacing = 1.15
        p_toc.paragraph_format.space_after = Pt(2)
        r_t = p_toc.add_run(title)
        r_t.font.name = "Times New Roman"
        r_t.font.size = Pt(11.5)
        if "CHƯƠNG" in title or "TÓM TẮT" in title or "LỜI" in title:
            r_t.font.bold = True
            r_t.font.color.rgb = COLOR_PRIMARY_BLUE
        else:
            r_t.font.color.rgb = COLOR_TEXT_MAIN
        
        # Thêm dấu chấm dẫn tới số trang
        dots_count = max(5, 78 - len(title))
        r_dots = p_toc.add_run(" " + "." * dots_count + " ")
        r_dots.font.color.rgb = COLOR_TEXT_MUTED
        
        r_p = p_toc.add_run(page)
        r_p.font.name = "Times New Roman"
        r_p.font.size = Pt(11.5)
        r_p.font.bold = True
        r_p.font.color.rgb = COLOR_DARK_NAVY

    doc.add_page_break()

    # =========================================================================
    # CHƯƠNG 1: TỔNG QUAN CƠ SỞ LÝ THUYẾT
    # =========================================================================
    add_heading_styled(doc, "CHƯƠNG 1: TỔNG QUAN CƠ SỞ LÝ THUYẾT", level=1)
    
    add_heading_styled(doc, "1.1. Giới thiệu tổng quan về đề tài UniLife", level=2)
    add_p(doc,
        "Đề tài “Xây dựng nền tảng tiện ích hỗ trợ đời sống sinh viên Đại học Kiến trúc Đà Nẵng (UniLife)” hướng tới việc kiến tạo một môi trường số hóa tích hợp đa tiện ích. Thay vì phải tìm kiếm rời rạc trên nhiều trang mạng xã hội tiềm ẩn nguy cơ thông tin giả mạo và lừa đảo, sinh viên chỉ cần truy cập UniLife để tiếp cận nguồn dữ liệu đã được chọn lọc và kiểm duyệt nghiêm ngặt."
    )

    add_heading_styled(doc, "1.2. Môi trường XAMPP và Kiến trúc hệ thống (Sơ đồ 1.2)", level=2)
    add_p(doc,
        "Toàn bộ hệ thống UniLife được triển khai và vận hành trên bộ công cụ máy chủ cục bộ XAMPP phiên bản 8.2 (bao gồm máy chủ web Apache lắng nghe cổng chuẩn 80, hệ quản trị cơ sở dữ liệu MySQL chạy trên cổng 3306 và công cụ quản trị phpMyAdmin)."
    )
    add_p(doc,
        "Mô hình Kiến trúc hệ thống UniLife trên nền tảng XAMPP được thể hiện qua Sơ đồ 1.2 dưới đây, gồm 4 tầng phân tách độc lập:"
    )
    add_p(doc,
        "1. Tầng Client (Giao diện người dùng): Trình duyệt máy tính/di động của Sinh viên, Chủ trọ và Quản trị viên, tương tác qua giao diện React SPA.\n"
        "2. Tầng Frontend (Single Page Application): Xây dựng bằng React 18, Vite và Tailwind CSS, quản lý trạng thái qua Hooks và đóng gói các Component/Modal chuyên biệt.\n"
        "3. Tầng Backend Web Server (Apache XAMPP - Port 80): Lắng nghe các HTTP Requests gửi tới các file API PHP (api/users.php, api/register.php, api/housing.php, api/entertainment.php), thực thi kiểm tra bảo mật, định dạng dữ liệu và điều phối logic.\n"
        "4. Tầng Database (MySQL Server - Port 3306): Cơ sở dữ liệu quan hệ unilife_db lưu trữ toàn vẹn các bảng dữ liệu thực nghiệm, quản lý trực tiếp bằng phpMyAdmin qua địa chỉ http://localhost/phpmyadmin/."
    )
    
    add_image_safe(doc, r"D:\24CT1-PHANTRIDUC\docs\architecture_unilife_xampp.png", "Hình 1.1: Sơ đồ 1.2 – Mô hình Kiến trúc hệ thống UniLife trên môi trường máy chủ XAMPP")

    add_heading_styled(doc, "1.3. Ngôn ngữ và công nghệ giao diện", level=2)
    add_p(doc,
        "Giao diện người dùng được phát triển bằng thư viện React 18 kết hợp với công cụ đóng gói Vite. Sự kết hợp này mang lại khả năng cập nhật trạng thái cực nhanh nhờ cơ chế DOM ảo (Virtual DOM) và tính năng Hot Module Replacement (HMR). Toàn bộ kiểu dáng giao diện được thiết kế với Tailwind CSS theo phong cách Trắng - Xanh Dương (White & Blue), tạo cảm giác hiện đại, thanh lịch và đồng bộ nhận diện thương hiệu học đường."
    )

    add_heading_styled(doc, "1.4. Cơ sở dữ liệu MySQL trên phpMyAdmin (XAMPP)", level=2)
    add_p(doc,
        "Cơ sở dữ liệu mang tên unilife_db được khởi tạo trên hệ quản trị MySQL thông qua giao diện đồ họa phpMyAdmin. Toàn bộ các bảng được cấu hình bảng mã utf8mb4_unicode_ci để hỗ trợ tiếng Việt có dấu chuẩn xác 100%. Các mối quan hệ dữ liệu được thiết lập chặt chẽ thông qua các ràng buộc Khóa chính (Primary Key), Khóa ngoại (Foreign Key) và Khóa duy nhất (Unique Key) nhằm đảm bảo tính toàn vẹn dữ liệu."
    )

    add_heading_styled(doc, "1.5. Công cụ và thư viện hỗ trợ", level=2)
    t_tools = doc.add_table(rows=6, cols=2)
    t_tools.alignment = WD_TABLE_ALIGNMENT.CENTER
    set_table_borders(t_tools, color=HEX_BORDER_BLUE)
    tool_data = [
        ("XAMPP 8.2 (Apache & MySQL)", "Môi trường máy chủ cục bộ phục vụ biên dịch PHP và lưu trữ CSDL MySQL."),
        ("phpMyAdmin (XAMPP)", "Giao diện web trực quan để quản trị CSDL MySQL, chạy truy vấn SQL và kiểm tra dữ liệu tại http://localhost/phpmyadmin/."),
        ("React 18 & Vite", "Thư viện giao diện người dùng SPA hiện đại và công cụ build siêu tốc."),
        ("Lucide React Icons", "Bộ biểu tượng vector hiện đại, sắc nét và nhẹ nhàng."),
        ("Tailwind CSS", "Framework CSS tiện ích xây dựng phong cách giao diện Trắng - Xanh Dương.")
    ]
    t_tools.rows[0].cells[0].paragraphs[0].add_run("Công cụ / Nền tảng").font.bold = True
    t_tools.rows[0].cells[1].paragraphs[0].add_run("Vai trò trong dự án UniLife").font.bold = True
    for c in t_tools.rows[0].cells:
        set_cell_background(c, HEX_HEADER_BLUE)
        c.paragraphs[0].runs[0].font.color.rgb = RGBColor(0xFF, 0xFF, 0xFF)
        set_cell_margins(c, 80, 80, 80, 80)
        
    for idx, (tool, role) in enumerate(tool_data):
        row = t_tools.rows[idx + 1]
        bg = HEX_ZEBRA_BLUE if idx % 2 == 1 else "FFFFFF"
        for c_idx, text in enumerate([tool, role]):
            cell = row.cells[c_idx]
            set_cell_background(cell, bg)
            set_cell_margins(cell, 80, 80, 80, 80)
            p = cell.paragraphs[0]
            r = p.add_run(text)
            r.font.size = Pt(10.5)
            if c_idx == 0:
                r.font.bold = True
                r.font.color.rgb = COLOR_DARK_NAVY

    add_heading_styled(doc, "1.6. Kết luận chương 1", level=2)
    add_p(doc,
        "Các công nghệ và công cụ lựa chọn trên tạo nên một hệ thống hoàn chỉnh, gọn nhẹ và dễ bảo trì. Việc kết hợp máy chủ XAMPP (Apache + MySQL) với React Vite tạo nền tảng vững chắc để triển khai các chức năng thực nghiệm trong Chương 2."
    )

    doc.add_page_break()

    # =========================================================================
    # CHƯƠNG 2: THỰC NGHIỆM
    # =========================================================================
    add_heading_styled(doc, "CHƯƠNG 2: THỰC NGHIỆM", level=1)

    # -------------------------------------------------------------------------
    # 2.1 SƠ ĐỒ USE CASE TỔNG QUAN
    # -------------------------------------------------------------------------
    add_heading_styled(doc, "2.1. Sơ đồ Ca sử dụng (Use Case Diagram)", level=2)
    add_p(doc,
        "Sơ đồ Ca sử dụng (Use Case Diagram) là công cụ nền tảng trong kỹ nghệ phần mềm nhằm trực quan hóa các yêu cầu chức năng và xác định rõ ranh giới quyền hạn giữa các đối tượng người dùng tương tác với hệ thống UniLife."
    )

    add_heading_styled(doc, "2.1.1. Bảng xác định Tác nhân (Actors) và Quyền hạn", level=3)
    t_actors = doc.add_table(rows=5, cols=3)
    t_actors.alignment = WD_TABLE_ALIGNMENT.CENTER
    set_table_borders(t_actors, color=HEX_BORDER_BLUE)
    actor_headers = ["STT", "Tác nhân (Actor)", "Mô tả vai trò & Ranh giới trách nhiệm trong hệ thống"]
    actor_data = [
        ("1", "Khách vãng lai (Guest)", "Người dùng chưa đăng nhập; có quyền xem trang chủ, tra cứu phòng trọ, quán ăn, chợ đồ cũ và yêu cầu mở form Đăng ký / Đăng nhập."),
        ("2", "Sinh viên (Student)", "Người dùng đã đăng ký tài khoản với email @gmail.com; có quyền lưu tin trọ yêu thích, đăng thanh lý đồ cũ, đánh giá quán ăn, tải tài liệu học tập."),
        ("3", "Chủ nhà trọ (Host)", "Đối tác cung cấp chỗ ở; có toàn quyền Đăng tin cho thuê trọ mới, cập nhật giá, diện tích, tiện ích và quản lý trạng thái phòng."),
        ("4", "Quản trị viên (Admin)", "Toàn quyền giám sát hệ thống; quản lý người dùng với Bộ lọc CSDL đa năng (Tên, SĐT, Vai trò), duyệt/xóa tin đăng trọ và quản lý tụ điểm vui chơi giải trí.")
    ]
    for c_idx, h_text in enumerate(actor_headers):
        cell = t_actors.rows[0].cells[c_idx]
        set_cell_background(cell, HEX_HEADER_BLUE)
        set_cell_margins(cell, 80, 80, 80, 80)
        p = cell.paragraphs[0]
        r = p.add_run(h_text)
        r.font.bold = True
        r.font.size = Pt(10.5)
        r.font.color.rgb = RGBColor(0xFF, 0xFF, 0xFF)
        if c_idx == 0:
            p.alignment = WD_ALIGN_PARAGRAPH.CENTER

    for r_idx, (stt, actor, desc) in enumerate(actor_data):
        row = t_actors.rows[r_idx + 1]
        bg = HEX_ZEBRA_BLUE if r_idx % 2 == 1 else "FFFFFF"
        for c_idx, val in enumerate([stt, actor, desc]):
            cell = row.cells[c_idx]
            set_cell_background(cell, bg)
            set_cell_margins(cell, 70, 70, 80, 80)
            p = cell.paragraphs[0]
            r = p.add_run(val)
            r.font.size = Pt(10)
            if c_idx == 0:
                p.alignment = WD_ALIGN_PARAGRAPH.CENTER
            elif c_idx == 1:
                r.font.bold = True
                r.font.color.rgb = COLOR_DARK_NAVY

    add_heading_styled(doc, "2.1.2. Sơ đồ Use Case tổng quan toàn hệ thống UniLife", level=3)
    add_p(doc,
        "Dưới đây là Sơ đồ 2.1 – Use Case Diagram thể hiện đầy đủ mối quan hệ giữa 4 Tác nhân chính (Khách vãng lai, Sinh viên, Chủ trọ, Quản trị viên) với các nhóm chức năng cốt lõi và các quan hệ phụ thuộc <<include>>, <<extend>> theo đúng chuẩn UML 2.0:"
    )
    add_image_safe(doc, r"D:\24CT1-PHANTRIDUC\docs\usecase_diagram_unilife.png", "Hình 2.1: Sơ đồ 2.1 – Use Case Diagram tổng quan toàn hệ thống UniLife")

    add_heading_styled(doc, "2.1.3. Bảng đặc tả các Use Case cốt lõi của đồ án", level=3)
    t_uc = doc.add_table(rows=5, cols=4)
    t_uc.alignment = WD_TABLE_ALIGNMENT.CENTER
    set_table_borders(t_uc, color=HEX_BORDER_BLUE)
    uc_headers = ["Mã UC", "Tên Ca sử dụng (Use Case)", "Tác nhân chính", "Mô tả tóm tắt luồng hoạt động"]
    uc_data = [
        ("UC-01", "Đăng ký tài khoản (Register)", "Khách vãng lai / Sinh viên", "Nhập họ tên, email (@gmail.com), SĐT duy nhất, mật khẩu. Gửi API lưu vào bảng users trong CSDL MySQL và tự động đăng nhập."),
        ("UC-02", "Đăng nhập hệ thống (Login)", "Tất cả tác nhân", "Xác thực email và mật khẩu qua file users.php trên XAMPP. Phân quyền và cập nhật giao diện theo vai trò."),
        ("UC-03", "Tìm kiếm & Lọc trọ (Search Housing)", "Sinh viên, Khách", "Lọc phòng trọ đa tiêu chí: khoảng giá, quận huyện, tiện ích (AC, Máy giặt, Wifi) theo thời gian thực."),
        ("UC-04", "Đăng tin cho thuê trọ (Post Housing)", "Chủ nhà trọ (Host)", "Chủ trọ mở form nhập tiêu đề, giá, diện tích, địa chỉ, tiện ích, dán link ảnh và lưu vào CSDL.")
    ]
    for c_idx, h_text in enumerate(uc_headers):
        cell = t_uc.rows[0].cells[c_idx]
        set_cell_background(cell, HEX_HEADER_BLUE)
        set_cell_margins(cell, 80, 80, 80, 80)
        p = cell.paragraphs[0]
        r = p.add_run(h_text)
        r.font.bold = True
        r.font.size = Pt(10)
        r.font.color.rgb = RGBColor(0xFF, 0xFF, 0xFF)
        if c_idx in [0, 2]:
            p.alignment = WD_ALIGN_PARAGRAPH.CENTER

    for r_idx, (code, name, actor, desc) in enumerate(uc_data):
        row = t_uc.rows[r_idx + 1]
        bg = HEX_ZEBRA_BLUE if r_idx % 2 == 1 else "FFFFFF"
        for c_idx, val in enumerate([code, name, actor, desc]):
            cell = row.cells[c_idx]
            set_cell_background(cell, bg)
            set_cell_margins(cell, 70, 70, 80, 80)
            p = cell.paragraphs[0]
            r = p.add_run(val)
            r.font.size = Pt(9.5)
            if c_idx == 0:
                p.alignment = WD_ALIGN_PARAGRAPH.CENTER
                r.font.bold = True
                r.font.color.rgb = COLOR_PRIMARY_BLUE
            elif c_idx == 1:
                r.font.bold = True
            elif c_idx == 2:
                p.alignment = WD_ALIGN_PARAGRAPH.CENTER

    # -------------------------------------------------------------------------
    # 2.2 SƠ ĐỒ TUẦN TỰ (SEQUENCE DIAGRAM)
    # -------------------------------------------------------------------------
    add_heading_styled(doc, "2.2. Sơ đồ tuần tự (Sequence Diagram)", level=2)
    add_p(doc,
        "Sơ đồ tuần tự mô hình hóa sự tương tác giữa các thành phần phần mềm theo trục thời gian từ trên xuống dưới. Nhằm phản ánh chính xác kiến trúc triển khai thực tế trên môi trường máy chủ XAMPP, mỗi sơ đồ tuần tự được xây dựng gồm 4 đường sinh mệnh (Lifelines) rõ ràng:\n"
        "• Khách hàng (Sinh viên / Chủ trọ): Tác nhân con người trực tiếp thực hiện thao tác trên màn hình.\n"
        "• Đường dẫn vào Frontend: Thành phần giao diện React SPA tiếp nhận sự kiện (VD: D:\\24CT1-PHANTRIDUC\\src\\components\\modals\\AuthModal.jsx).\n"
        "• Đường dẫn vào File Backend: Điểm cuối API PHP trên Apache XAMPP xử lý logic (VD: D:\\24CT1-PHANTRIDUC\\api\\register.php).\n"
        "• Tên CSDL / Bảng hỗ trợ: Cơ sở dữ liệu quan hệ MySQL lưu trữ lâu bền (unilife_db / users, housing)."
    )

    # 2.2.1 Đăng ký
    add_heading_styled(doc, "2.2.1. Sơ đồ tuần tự chức năng Đăng ký (Register)", level=3)
    add_p(doc, "Mô tả chi tiết các bước xử lý thông điệp theo đúng luồng yêu cầu biểu mẫu và lưu trữ CSDL:")
    add_p(doc, 
        "1. Khách hàng (Sinh viên) bấm nút yêu cầu mở form đăng ký trên giao diện UniLife.\n"
        "2. Frontend gửi yêu cầu tải biểu mẫu qua đường dẫn file backend: GET /api/register.php?action=form.\n"
        "3. File backend tiếp nhận, đọc cấu trúc form và trả file/giao diện biểu mẫu (HTTP 200 Form Template) về cho Frontend.\n"
        "4. Frontend nhận phản hồi và hiển thị Form đăng ký lên màn hình cho khách hàng nhập liệu.\n"
        "5. Khách hàng nhập các thông tin bắt buộc: Họ tên, Email (bắt buộc đuôi @gmail.com), Số điện thoại (chính chủ, không trùng lặp), Mật khẩu, Chọn vai trò (Sinh viên/Chủ trọ) & bấm 'Đăng ký tài khoản'.\n"
        "6. Frontend đóng gói dữ liệu và gửi qua đường dẫn file backend: POST /api/register.php.\n"
        "7. File backend kiểm tra định dạng @gmail.com và kiểm tra trùng lặp: SELECT id FROM users WHERE email=? OR phone=?.\n"
        "alt [Trường hợp Email hoặc SĐT đã tồn tại trong hệ thống]:\n"
        "   6a. CSDL trả về kết quả: Đã tồn tại bản ghi (num_rows > 0).\n"
        "   7a. Backend phản hồi JSON: { success: false, message: 'Email hoặc SĐT này đã được đăng ký!' }.\n"
        "   8a. Frontend hiển thị thông báo lỗi đăng ký màu đỏ trên form modal.\n"
        "alt [Trường hợp dữ liệu hợp lệ & chưa tồn tại]:\n"
        "   6b. Backend thực thi lệnh: INSERT INTO users (name, email, password_hash, phone, role, status, avatar_url) VALUES (?, ?, ?, ?, ?, ?, ?).\n"
        "   7b. CSDL lưu tài khoản thành công và trả về insert_id = newId.\n"
        "   8b. Backend phản hồi JSON: { success: true, message: 'Đăng ký tài khoản thành công!', user: {...} }.\n"
        "9. Frontend nhận phản hồi thành công từ backend, lưu thông tin vào localStorage và cập nhật state (setUsers, setCurrentUser).\n"
        "10. Frontend hiển thị thông báo 'Đăng ký thành công!' và tự động đăng nhập người dùng vào hệ thống."
    )
    add_image_safe(doc, r"D:\24CT1-PHANTRIDUC\docs\sequence_dangky_ui.png", "Hình 2.2: Sơ đồ tuần tự chức năng Đăng ký tài khoản UniLife (Chuẩn 4 đường sinh mệnh kèm file backend)")

    # 2.2.2 Đăng nhập
    add_heading_styled(doc, "2.2.2. Sơ đồ tuần tự chức năng Đăng nhập (Login)", level=3)
    add_p(doc, "Mô tả chi tiết các bước xử lý thông điệp:")
    add_p(doc,
        "1. Khách hàng bấm nút yêu cầu mở form đăng nhập trên giao diện.\n"
        "2. Frontend gửi yêu cầu tải form qua đường dẫn file backend: GET /api/users.php?action=login_form.\n"
        "3. File backend xử lý và trả cấu trúc/file form đăng nhập về cho giao diện tiếp nhận.\n"
        "4. Frontend hiển thị biểu mẫu đăng nhập lên màn hình để khách hàng điền Email và Mật khẩu.\n"
        "5. Khách hàng nhập Email (@gmail.com) và Mật khẩu rồi bấm 'Đăng nhập ngay'.\n"
        "6. Frontend gửi yêu cầu xác thực qua đường dẫn file backend: POST /api/users.php.\n"
        "7. File backend truy vấn CSDL MySQL: SELECT id, name, email, password_hash, phone, role, status FROM users WHERE email = ?.\n"
        "8a-10a. Nếu tài khoản không tồn tại, sai mật khẩu hoặc bị khóa (Banned): Backend phản hồi lỗi, Frontend thông báo cảnh báo cho khách hàng.\n"
        "8b-10b. Nếu thông tin chính xác và tài khoản Active: Backend phản hồi dữ liệu thành công kèm quyền hạn (role).\n"
        "11-12. Frontend lưu phiên làm việc (LocalStorage/State), đóng form, cập nhật Tên và Avatar người dùng lên thanh Header."
    )
    add_image_safe(doc, r"D:\24CT1-PHANTRIDUC\docs\sequence_dangnhap_ui.png", "Hình 2.3: Sơ đồ tuần tự chức năng Đăng nhập hệ thống UniLife")

    # 2.2.3 Tìm kiếm trọ
    add_heading_styled(doc, "2.2.3. Sơ đồ tuần tự chức năng Tìm kiếm & Lọc phòng trọ (Tự chọn 1)", level=3)
    add_p(doc, "Mô tả chi tiết các bước xử lý thông điệp:")
    add_p(doc,
        "1. Sinh viên nhập từ khóa tìm kiếm (tên đường, quận) hoặc chọn chip tiện ích (Điều hòa, Wifi, Máy giặt, Giá trần).\n"
        "2. HousingView.jsx tiếp nhận bộ lọc và kích hoạt hàm filteredHousing().\n"
        "3. Gửi HTTP GET tới api/housing.php để lấy danh sách phòng trọ đã duyệt (status = 'approved').\n"
        "4. PHP thực hiện truy vấn bảng housing trong CSDL MySQL unilife_db.\n"
        "5. Trả về mảng JSON dữ liệu phòng trọ kèm thông số diện tích, tiện ích và khoảng cách tới trường học.\n"
        "6. Frontend thực hiện thuật toán lọc thời gian thực và render danh sách thẻ PlaceCard.jsx tương ứng lên giao diện."
    )
    add_image_safe(doc, r"D:\24CT1-PHANTRIDUC\docs\sequence_timkiem_phongtro.png", "Hình 2.4: Sơ đồ tuần tự chức năng Tìm kiếm & Lọc phòng trọ UniLife")

    # 2.2.4 Đăng tin trọ
    add_heading_styled(doc, "2.2.4. Sơ đồ tuần tự chức năng Đăng tin cho thuê trọ (Tự chọn 2)", level=3)
    add_p(doc, "Mô tả chi tiết các bước xử lý thông điệp:")
    add_p(doc,
        "1. Chủ trọ (đã đăng nhập) bấm nút '+ Đăng tin cho thuê trọ'.\n"
        "2. Component AddHousingModal.jsx mở ra hiển thị các trường nhập liệu.\n"
        "3. Chủ trọ điền tiêu đề, giá thuê, diện tích, địa chỉ, số điện thoại, tick chọn tiện ích và dán link ảnh phòng.\n"
        "4. Nhấn nút 'Đăng bài cho thuê ngay' → Gửi HTTP POST tới api/housing.php trên XAMPP.\n"
        "5. PHP kiểm tra dữ liệu bắt buộc và thực hiện lệnh INSERT INTO housing vào CSDL MySQL.\n"
        "6. Nhận phản hồi thành công từ backend, cập nhật state setHousingList đưa bài đăng mới lên đầu danh sách và hiện Toast xanh."
    )
    add_image_safe(doc, r"D:\24CT1-PHANTRIDUC\docs\sequence_dangtin_phongtro.png", "Hình 2.5: Sơ đồ tuần tự chức năng Đăng tin cho thuê trọ UniLife")

    # -------------------------------------------------------------------------
    # 2.3 SƠ ĐỒ PERT VÀ PHƯƠNG PHÁP ĐƯỜNG GĂNG
    # -------------------------------------------------------------------------
    add_heading_styled(doc, "2.3. Sơ đồ PERT và phương pháp đường găng (Critical Path Method)", level=2)
    add_p(doc,
        "Dựa trên danh mục 9 công việc chính trong dự án xây dựng hệ thống website UniLife (Bài nhận thức 3), các mốc thời gian sớm nhất ts(i), thời gian muộn nhất tm(i) và độ dự trữ toàn phần TF(ij) được tính toán khoa học theo công thức lý thuyết Slide 4.2:"
    )

    t_pert = doc.add_table(rows=12, cols=9)
    t_pert.alignment = WD_TABLE_ALIGNMENT.CENTER
    set_table_borders(t_pert, color=HEX_BORDER_BLUE)
    pert_headers = ["Mã CV", "Cung (i-j)", "Thời gian t", "ES", "EF", "LS", "LF", "Dự trữ TF", "Trạng thái"]
    pert_rows = [
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
    for c_idx, h_text in enumerate(pert_headers):
        cell = t_pert.rows[0].cells[c_idx]
        set_cell_background(cell, HEX_HEADER_BLUE)
        set_cell_margins(cell, 80, 80, 80, 80)
        p = cell.paragraphs[0]
        p.alignment = WD_ALIGN_PARAGRAPH.CENTER
        r = p.add_run(h_text)
        r.font.bold = True
        r.font.size = Pt(10)
        r.font.color.rgb = RGBColor(0xFF, 0xFF, 0xFF)

    for r_idx, r_data in enumerate(pert_rows):
        row = t_pert.rows[r_idx + 1]
        is_crit = "GĂNG" in r_data[8]
        bg = "EFF6FF" if is_crit else (HEX_ZEBRA_BLUE if r_idx % 2 == 1 else "FFFFFF")
        for c_idx, val in enumerate(r_data):
            cell = row.cells[c_idx]
            set_cell_background(cell, bg)
            set_cell_margins(cell, 80, 80, 80, 80)
            p = cell.paragraphs[0]
            p.alignment = WD_ALIGN_PARAGRAPH.CENTER
            r = p.add_run(val)
            r.font.size = Pt(10)
            if is_crit:
                r.font.bold = True
                if c_idx in [0, 7, 8]:
                    r.font.color.rgb = COLOR_PRIMARY_BLUE

    add_p(doc, 
        "• Đường găng của dự án (Critical Path): A → C → D → E → H → H' → G → T\n"
        "• Tổng thời gian hoàn thành dự án ngắn nhất: T = 7 + 6 + 8 + 5 + 4 + 0 + 14 + 4 = 48 ngày.\n"
        "• Ý nghĩa quản lý tiến độ: Chuỗi công việc găng có độ dự trữ TF = 0, bắt buộc phải hoàn thành đúng hạn để tránh trễ hạn toàn bộ dự án. Công việc B có thể trễ tối đa 11 ngày, công việc F có thể trễ tối đa 1 ngày mà không làm thay đổi tiến độ chung."
    )
    add_image_safe(doc, r"D:\24CT1-PHANTRIDUC\docs\pert_diagram.png", "Hình 2.6: Sơ đồ mạng PERT và Đường găng dự án UniLife")

    # -------------------------------------------------------------------------
    # 2.4 THIẾT KẾ VÀ DEMO CÁC CHỨC NĂNG
    # -------------------------------------------------------------------------
    add_heading_styled(doc, "2.4. Thiết kế và demo các chức năng", level=2)
    add_p(doc,
        "Tuân thủ nghiêm ngặt định hướng của Giảng viên, quy trình thiết kế giao diện được triển khai qua 3 bước chuẩn hóa: (1) Sơ đồ luồng người dùng (User Flow); (2) Bản phác thảo giao diện trang chủ (Wireframe); (3) Bản phác thảo 4 chức năng và đối soát với kết quả thực tế trên nền web UniLife."
    )

    add_heading_styled(doc, "2.4.1. Bước 1 – Luồng người dùng (User Flow)", level=3)
    add_p(doc,
        "Mô tả chi tiết luồng luân chuyển trạng thái của 4 chức năng cốt lõi:\n"
        "• Luồng Đăng ký: Bắt đầu từ Trang chủ → Bấm nút 'Đăng ký' trên Header → Nhập thông tin form → Kiểm tra hợp lệ dữ liệu và kiểm tra trùng lặp Email → Lưu vào MySQL/LocalStorage → Tự động đăng nhập và cập nhật Avatar lên Header.\n"
        "• Luồng Đăng nhập: Mở Modal → Nhập Email và Password → Xác thực tài khoản với CSDL MySQL → Phân quyền vai trò (Admin / Host / Student) → Cập nhật thanh điều hướng và lưu phiên làm việc.\n"
        "• Luồng Tìm kiếm trọ: Vào tab Phòng trọ → Nhập từ khóa / chọn tiện ích / kéo thanh giá → Thuật toán lọc Real-time → Hiển thị kết quả dạng thẻ PlaceCard → Nhấn xem chi tiết hoặc bấm tim lưu Yêu thích.\n"
        "• Luồng Đăng tin trọ: Chủ trọ đăng nhập → Bấm nút '+ Đăng tin phòng trọ' → Nhập tiêu đề, giá, diện tích, địa chỉ, tiện ích → Bấm Đăng tin → Gọi API PHP lưu vào CSDL MySQL → Hiển thị thẻ bài đăng mới lên đầu trang."
    )

    add_heading_styled(doc, "2.4.2. Bước 2 – Phác thảo giao diện trang chủ UniLife", level=3)
    add_p(doc,
        "Bố cục trang chủ UniLife được phác thảo tinh gọn gồm các khu vực chính:\n"
        "1. Top Bar: Logo UniLife, thanh điều hướng các phân hệ (Trang chủ, Phòng trọ, Quán ăn, Chợ đồ cũ, Tài liệu) và nút Tài khoản / Đăng nhập.\n"
        "2. Hero Banner: Khẩu hiệu truyền thông sinh viên, thanh tìm kiếm toàn cầu cho phép tìm kiếm chéo giữa phòng trọ, quán ăn và sách vở.\n"
        "3. Quick Categories Bar: Hàng 5 nút danh mục nổi bật có icon màu sắc tương ứng.\n"
        "4. Feature Sections: Lưới thẻ hiển thị phòng trọ mới đăng gần trường Đại học Kiến trúc Đà Nẵng, quán ăn sinh viên được đánh giá cao và danh sách đồ cũ giá rẻ."
    )

    add_heading_styled(doc, "2.4.3. Bước 3 – Phác thảo bốn chức năng", level=3)
    add_p(doc,
        "Bản phác thảo khung lưới đen trắng (Wireframe) của 4 chức năng:\n"
        "• Form Đăng ký: Khung Card 460px căn giữa, tab chuyển trạng thái, 4 ô Input có icon, nhóm Radio Button chọn vai trò sinh viên/chủ trọ, nút Submit cam.\n"
        "• Form Đăng nhập: Form 2 ô nhập Email & Mật khẩu, checkbox 'Ghi nhớ đăng nhập', nút Submit và các chip đăng nhập nhanh tài khoản mẫu Admin/Sinh viên.\n"
        "• Giao diện Tìm kiếm phòng trọ: Thanh tìm kiếm địa chỉ, hàng filter chip tiện ích, thanh trượt giới hạn giá và lưới thẻ phòng trọ 3 cột.\n"
        "• Form Đăng tin phòng trọ: Form popup chia lưới 2 cột cho trường Giá và Diện tích, nhóm checkbox 2x2 cho tiện ích và nút Đăng tin lớn."
    )

    add_heading_styled(doc, "2.4.4. Minh họa kết quả thực nghiệm với 4 sơ đồ Figma web UniLife", level=3)
    add_p(doc, 
        "Dưới đây là 4 sơ đồ Figma hoàn chỉnh độc lập, mỗi sơ đồ thể hiện đầy đủ 3 bước (User Flow, Wireframe, Mockup) trích xuất trực tiếp từ dự án UniLife.\n"
        "Đặc biệt, ở Chức năng 1 (Đăng ký tài khoản), Bước 1 (Sơ đồ luồng người dùng - User Flow) đã được đơn giản hóa tối đa theo chuẩn trực quan 5 bước liên hoàn, sử dụng ngôn ngữ đời sống gần gũi, loại bỏ các ký hiệu thuật toán phức tạp giúp người không thuộc chuyên ngành CNTT đều có thể xem và hiểu một cách dễ dàng:"
    )

    add_image_safe(doc, r"D:\24CT1-PHANTRIDUC\docs\Figma_CN1_DangKy.png", "Hình 2.7: Sơ đồ Figma hoàn chỉnh Chức năng 1 — Đăng ký tài khoản (User Flow trực quan đơn giản hóa, Wireframe, Mockup)")
    add_image_safe(doc, r"D:\24CT1-PHANTRIDUC\docs\Figma_CN2_DangNhap.png", "Hình 2.8: Sơ đồ Figma hoàn chỉnh Chức năng 2 — Đăng nhập & Phân quyền (User Flow, Wireframe, Mockup)")
    add_image_safe(doc, r"D:\24CT1-PHANTRIDUC\docs\Figma_CN3_TimKiemPhongTro.png", "Hình 2.9: Sơ đồ Figma hoàn chỉnh Chức năng 3 — Tìm kiếm & Lọc phòng trọ (User Flow, Wireframe, Mockup)")
    add_image_safe(doc, r"D:\24CT1-PHANTRIDUC\docs\Figma_CN4_DangTinPhongTro.png", "Hình 2.10: Sơ đồ Figma hoàn chỉnh Chức năng 4 — Đăng tin phòng trọ (User Flow, Wireframe, Mockup)")

    # -------------------------------------------------------------------------
    # 2.4.5 LIỆT KÊ CHI TIẾT CÁC PHÂN HỆ CHỨC NĂNG TRÊN WEBSITE KÈM ẢNH THỰC TẾ
    # -------------------------------------------------------------------------
    add_heading_styled(doc, "2.4.5. Liệt kê chi tiết các phân hệ chức năng trên Website UniLife kèm hình ảnh minh họa thực tế", level=3)
    add_p(doc,
        "Nhằm mang đến cái nhìn trực quan và toàn diện nhất về kết quả xây dựng hệ thống phần mềm, dưới đây là bảng danh mục và đặc tả chi tiết toàn bộ 8 phân hệ chức năng cốt lõi đang vận hành trên nền tảng UniLife (chạy trên máy chủ XAMPP tại địa chỉ http://localhost/unilife/). Mỗi chức năng đều được minh họa bằng hình ảnh chụp thực tế từ màn hình giao diện sản phẩm:"
    )

    # 1. Trang chủ
    add_p(doc,
        "• Vai trò & Ý nghĩa: Là cổng thông tin trung tâm kết nối toàn bộ sinh viên Đại học Kiến trúc Đà Nẵng với hệ sinh thái tiện ích xung quanh trường học.\n"
        "• Các thành phần chính: Thanh điều hướng đa phân hệ (Navbar), Banner thông điệp chào mừng sinh viên UniLife, Thanh tìm kiếm toàn cầu đa năng (tìm kiếm phòng trọ, quán ăn, giáo trình), Hàng nút danh mục nhanh trực quan (Phòng trọ, Quán ăn, Chợ đồ cũ, Vui chơi, Góc học tập), cùng Lưới thẻ đề xuất thông minh hiển thị các phòng trọ mới nhất và quán ăn được sinh viên đánh giá cao.\n"
        "• Tương tác: Người dùng có thể điều hướng nhanh sang bất kỳ phân hệ nào chỉ với một cú nhấp chuột.",
        bold_prefix="1. Phân hệ Trang chủ tổng quan (Home Dashboard):\n"
    )
    add_image_safe(doc, r"D:\24CT1-PHANTRIDUC\docs\web_1_trang_chu.png", "Hình 2.11: Giao diện thực tế Trang chủ UniLife (chụp từ http://localhost/unilife/#/home)")

    # 2. Tìm kiếm phòng trọ
    add_p(doc,
        "• Vai trò & Ý nghĩa: Giải quyết trăn trở lớn nhất của tân sinh viên và sinh viên xa nhà khi tìm kiếm chỗ ở trọ an toàn, giá rẻ và gần trường học.\n"
        "• Các thành phần chính: Thanh tìm kiếm theo tên đường/khu vực (Hải Châu, Cẩm Lệ, Thanh Khê, Hòa Cường Nam...); Thanh trượt giới hạn mức giá linh hoạt (từ 1 triệu đến 5 triệu VNĐ); Nhóm chip lọc nhanh tiện ích phòng (Điều hòa AC, Máy giặt, Wifi tốc độ cao, Bãi đỗ xe an ninh, Tự do giờ giấc); Nút chuyển đổi nhanh chế độ lọc Đã lưu yêu thích.\n"
        "• Hiển thị: Danh sách phòng trọ trình bày dạng lưới thẻ Card chuyên nghiệp, hiển thị ảnh thực tế, mức giá thuê niêm yết, diện tích phòng (m²), khoảng cách di chuyển tới trường Đại học Kiến trúc Đà Nẵng (km) và nút gọi điện / chat Zalo trực tiếp với chủ trọ.",
        bold_prefix="2. Phân hệ Tìm kiếm & Lọc phòng trọ sinh viên thông minh (Housing Module):\n"
    )
    add_image_safe(doc, r"D:\24CT1-PHANTRIDUC\docs\web_2_tim_kiem_phong_tro.png", "Hình 2.12: Giao diện thực tế Phân hệ Tìm kiếm & Lọc phòng trọ UniLife (chụp từ http://localhost/unilife/#/housing)")

    # 3. Quán ăn sinh viên
    add_p(doc,
        "• Vai trò & Ý nghĩa: Khám phá thiên đường ẩm thực sinh viên xung quanh trường với tiêu chí 'Ngon - Bổ - Rẻ' và đảm bảo vệ sinh an toàn thực phẩm.\n"
        "• Các thành phần chính: Thanh phân loại danh mục món ăn (Cơm bình dân, Bún bò/Mì Quảng, Trà sữa giải khát, Cà phê yên tĩnh có ổ điện để học nhóm); Bộ lọc theo tầm giá sinh viên (từ 15.000đ - 45.000đ); Hệ thống sao đánh giá khách quan từ cộng đồng sinh viên.\n"
        "• Hiển thị: Mỗi thẻ quán ăn cung cấp hình ảnh món ăn đặc trưng, địa chỉ cụ thể, khoảng cách tới trường và số điện thoại đặt món mang về.",
        bold_prefix="3. Phân hệ Quán ăn & Cà phê sinh viên (Food & Drink Module):\n"
    )
    add_image_safe(doc, r"D:\24CT1-PHANTRIDUC\docs\web_3_quan_an_sinh_vien.png", "Hình 2.13: Giao diện thực tế Phân hệ Quán ăn & Cà phê sinh viên (chụp từ http://localhost/unilife/#/food)")

    # 4. Chợ đồ cũ
    add_p(doc,
        "• Vai trò & Ý nghĩa: Thúc đẩy lối sống tiết kiệm, tái sử dụng tài nguyên và tinh thần tương thân tương ái giữa các thế hệ sinh viên trong trường.\n"
        "• Các thành phần chính: Danh mục thanh lý đa dạng (Giáo trình đại cương, Sách chuyên ngành Kiến trúc - Mỹ thuật, Bàn ghế học tập, Quạt máy, Bếp từ, Đèn bàn, Vật tư vẽ đồ án); Thanh tìm kiếm vật dụng theo từ khóa; Nút Đăng bán đồ cũ nhanh.\n"
        "• Hiển thị: Thẻ sản phẩm hiển thị ảnh chụp thật, giá thanh lý lại, tình trạng hao mòn (Mới 99%, Còn tốt 85%...), mô tả vật phẩm và thông tin liên hệ Zalo của người bán.",
        bold_prefix="4. Phân hệ Chợ đồ cũ & Thanh lý giáo trình (Student Marketplace):\n"
    )
    add_image_safe(doc, r"D:\24CT1-PHANTRIDUC\docs\web_4_cho_do_cu.png", "Hình 2.14: Giao diện thực tế Phân hệ Chợ đồ cũ & Thanh lý giáo trình (chụp từ http://localhost/unilife/#/market)")

    # 5. Vui chơi giải trí
    add_p(doc,
        "• Vai trò & Ý nghĩa: Phục vụ nhu cầu thư giãn, rèn luyện thể thao và gắn kết tình bạn sau những kỳ thi và đồ án căng thẳng.\n"
        "• Các thành phần chính: Lọc theo 4 thể loại giải trí lành mạnh (Bida/Billiards, Phòng máy Cyber Gaming cấu hình cao, Phòng hát Karaoke Mini sinh viên, Sân thể thao Cầu lông/Bóng đá); Giờ mở cửa hoạt động (08:00 - 24:00 hoặc 24/7); Bảng giá dịch vụ ưu đãi cho sinh viên.\n"
        "• Đặc tính kỹ thuật mới: Tích hợp đầy đủ tính năng Thêm tụ điểm mới ('+ Thêm địa điểm') và nút Xóa địa điểm (biểu tượng thùng rác), tự động lưu trữ và đồng bộ tức thì với bảng entertainment trong CSDL MySQL trên XAMPP.",
        bold_prefix="5. Phân hệ Tụ điểm Vui chơi & Giải trí sinh viên (Entertainment Hub):\n"
    )
    add_image_safe(doc, r"D:\24CT1-PHANTRIDUC\docs\web_5_vui_choi_giai_tri.png", "Hình 2.15: Giao diện thực tế Phân hệ Vui chơi & Giải trí sinh viên (chụp từ http://localhost/unilife/#/entertainment)")

    # 6. Góc học tập
    add_p(doc,
        "• Vai trò & Ý nghĩa: Hỗ trợ sinh viên ôn thi học kỳ, chia sẻ tài liệu học tập chính thống và nâng cao kết quả học tập tại trường.\n"
        "• Các thành phần chính: Kho lưu trữ đề thi các năm trước (Toán cao cấp, Vật lý đại cương, Lập trình C/C++, Cơ sở dữ liệu, Lịch sử kiến trúc, Kết cấu công trình); Tài liệu slide bài giảng và đồ án mẫu đạt điểm cao; Nút tải file tài liệu trực tiếp.",
        bold_prefix="6. Phân hệ Góc học tập & Chia sẻ tài liệu, đề thi (Study & Exam Sharing):\n"
    )
    add_image_safe(doc, r"D:\24CT1-PHANTRIDUC\docs\web_6_goc_hoc_tap.png", "Hình 2.16: Giao diện thực tế Phân hệ Góc học tập & Chia sẻ tài liệu (chụp từ http://localhost/unilife/#/study)")

    # 7. Đăng ký tài khoản mới
    add_p(doc,
        "• Vai trò & Ý nghĩa: Cung cấp cánh cổng định danh chính thức cho người dùng tham gia vào nền tảng UniLife với tư cách Khách hàng sinh viên hoặc Đối tác Chủ trọ.\n"
        "• Các thành phần chính: Form Modal nổi bật trên nền mờ tối, gồm các trường: Họ và tên đầy đủ, Địa chỉ Email (bắt buộc đuôi @gmail.com), Số điện thoại (kiểm tra không được trùng lặp), Mật khẩu bảo mật, và Radio button lựa chọn vai trò (🎓 Sinh viên / 🏠 Chủ trọ).\n"
        "• Cơ chế lưu trữ: Dữ liệu nhập từ form được gửi qua phương thức POST tới file backend api/register.php, sau đó mã hóa mật khẩu và thực thi câu lệnh SQL INSERT trực tiếp vào bảng users trong CSDL MySQL unilife_db trên máy chủ XAMPP.",
        bold_prefix="7. Phân hệ Đăng ký tài khoản mới & Luồng lưu CSDL (Register Module):\n"
    )
    add_image_safe(doc, r"D:\24CT1-PHANTRIDUC\docs\web_7_dang_ky_tai_khoan.png", "Hình 2.17: Giao diện thực tế Form Đăng ký tài khoản mới (chụp từ http://localhost/unilife/#/register)")

    # 8. Admin Dashboard
    add_p(doc,
        "• Vai trò & Ý nghĩa: Trung tâm chỉ huy dành riêng cho Quản trị viên (Admin) để giám sát, kiểm duyệt nội dung và quản lý người dùng toàn hệ thống.\n"
        "• Các thành phần chính:\n"
        "  - Hàng thẻ Card thống kê số lượng người dùng theo thời gian thực (Role Metric Cards): Khách hàng (Sinh viên), Chủ nhà trọ, Chủ quán ăn, Người bán đồ cũ và Quản trị viên.\n"
        "  - Bộ lọc đa tiêu chí: Nhóm nút bấm lọc theo từng Vai trò (Tất cả, Khách hàng, Chủ trọ...), Thanh tìm kiếm tức thời theo Tên hoặc Số điện thoại, và Bộ lọc theo Trạng thái (Hoạt động / Bị khóa).\n"
        "  - Bảng danh sách người dùng CSDL: Hiển thị Avatar, Họ tên, Email, Số điện thoại, Vai trò, Trạng thái hoạt động, cùng các nút thao tác nghiệp vụ: Khóa tài khoản vi phạm (Khóa/Mở khóa), Xóa tài khoản hoặc Đặt lại mật khẩu.",
        bold_prefix="8. Bảng điều khiển Quản trị Admin, Thống kê vai trò & Bộ lọc CSDL (Admin Control Center):\n"
    )
    add_image_safe(doc, r"D:\24CT1-PHANTRIDUC\docs\web_8_admin_dashboard.png", "Hình 2.18: Giao diện thực tế Bảng điều khiển Quản trị Admin & Bộ lọc CSDL (chụp từ http://localhost/unilife/#/admin)")

    # -------------------------------------------------------------------------
    # 2.5 DỮ LIỆU (DATABASE MYSQL TRÊN XAMPP)
    # -------------------------------------------------------------------------
    add_heading_styled(doc, "2.5. Dữ liệu (Database MySQL trên XAMPP)", level=2)
    add_p(doc,
        "Cơ sở dữ liệu unilife_db được thiết kế chuẩn hóa và quản lý trực tiếp bằng phpMyAdmin trên máy chủ MySQL của bộ cài đặt XAMPP (truy cập tại địa chỉ http://localhost/phpmyadmin/). Dưới đây là hình ảnh thực tế cấu trúc toàn bộ các bảng trong phpMyAdmin và sơ đồ thiết kế quan hệ các thực thể (Designer View):"
    )
    add_image_safe(doc, r"D:\24CT1-PHANTRIDUC\docs\db_1_cau_truc_database.png", "Hình 2.19: Cấu trúc cơ sở dữ liệu unilife_db với 6 bảng chuẩn hóa trong phpMyAdmin trên XAMPP")
    add_image_safe(doc, r"D:\24CT1-PHANTRIDUC\docs\db_5_designer_quan_he.png", "Hình 2.20: Sơ đồ thiết kế quan hệ các bảng (Designer View) trong phpMyAdmin")

    add_heading_styled(doc, "2.5.1. Thiết kế cấu trúc cơ sở dữ liệu", level=3)
    add_p(doc, "Đặc tả chi tiết cấu trúc thuộc tính, kiểu dữ liệu và ràng buộc của từng bảng dữ liệu:")

    # Tables 2.2 - 2.7
    db_tables_spec = [
        ("Bảng 2.2. Cấu trúc bảng users (Quản lý tài khoản & Phân quyền)", [
            ("id", "BIGINT UNSIGNED", "PK (Tự tăng)"),
            ("name", "VARCHAR(150)", "Họ tên người dùng (NOT NULL)"),
            ("email", "VARCHAR(191)", "UK, Bắt buộc định dạng đuôi @gmail.com duy nhất"),
            ("password_hash", "VARCHAR(255)", "Mật khẩu bảo mật hệ thống"),
            ("phone", "VARCHAR(20)", "UK, Số điện thoại chính chủ (không trùng lặp)"),
            ("role", "ENUM(...)", "Khách hàng / Chủ nhà trọ / Chủ quán ăn / Người bán đồ cũ / Quản trị viên"),
            ("status", "ENUM(...)", "Active / Banned / Pending"),
            ("avatar_url", "TEXT", "Đường dẫn ảnh đại diện sinh viên/chủ trọ")
        ]),
        ("Bảng 2.3. Cấu trúc bảng housing (Tin đăng phòng trọ sinh viên)", [
            ("id", "BIGINT UNSIGNED", "PK (Tự tăng)"),
            ("user_id", "BIGINT UNSIGNED", "FK tham chiếu users(id)"),
            ("name", "VARCHAR(255)", "Tiêu đề phòng trọ"),
            ("price", "VARCHAR(50)", "Giá phòng hiển thị (VD: 2.2 tr/tháng)"),
            ("price_num", "DECIMAL(10,2)", "Giá số thực phục vụ lọc và sắp xếp"),
            ("area", "VARCHAR(50)", "Diện tích phòng (m²)"),
            ("address", "VARCHAR(255)", "Địa chỉ chi tiết phòng trọ"),
            ("dist", "VARCHAR(50)", "Khoảng cách tới trường Đại học"),
            ("phone", "VARCHAR(20)", "Số điện thoại liên hệ chủ trọ"),
            ("ac, washer, wifi, parking", "TINYINT(1)", "Các tiện ích phòng trọ (1: Có, 0: Không)"),
            ("status", "ENUM(...)", "approved / hidden / pending")
        ]),
        ("Bảng 2.4. Cấu trúc bảng food_places (Quán ăn & Cà phê sinh viên)", [
            ("id", "BIGINT UNSIGNED", "PK (Tự tăng)"),
            ("user_id", "BIGINT UNSIGNED", "FK tham chiếu users(id)"),
            ("name", "VARCHAR(255)", "Tên quán ăn / nước uống"),
            ("cat", "VARCHAR(50)", "Phân loại: Cơm, Bún, Trà sữa, Cafe"),
            ("price", "VARCHAR(100)", "Khoảng giá (VD: 20k - 35k)"),
            ("address", "VARCHAR(255)", "Địa chỉ quán ăn"),
            ("rating", "DECIMAL(3,2)", "Điểm đánh giá (1.0 - 5.0)"),
            ("status", "ENUM(...)", "approved / pending")
        ]),
        ("Bảng 2.5. Cấu trúc bảng marketplace (Chợ đồ cũ sinh viên)", [
            ("id", "BIGINT UNSIGNED", "PK (Tự tăng)"),
            ("user_id", "BIGINT UNSIGNED", "FK tham chiếu users(id)"),
            ("name", "VARCHAR(255)", "Tên sản phẩm / giáo trình thanh lý"),
            ("price", "VARCHAR(100)", "Giá thanh lý lại"),
            ("cond", "VARCHAR(100)", "Tình trạng đồ (Mới 90%, Đã dùng...)"),
            ("cat", "VARCHAR(50)", "Danh mục: Sách, Gia dụng, Điện tử"),
            ("phone", "VARCHAR(20)", "Số Zalo liên hệ")
        ]),
        ("Bảng 2.6. Cấu trúc bảng entertainment (Tụ điểm vui chơi & Giải trí sinh viên)", [
            ("id", "BIGINT UNSIGNED", "PK (Tự tăng)"),
            ("name", "VARCHAR(255)", "Tên tụ điểm giải trí (Bida, Gaming, Karaoke...)"),
            ("cat", "VARCHAR(50)", "Thể loại: Bida, Gaming/Net, Karaoke Mini, Thể thao"),
            ("price", "VARCHAR(100)", "Bảng giá dịch vụ sinh viên"),
            ("address", "VARCHAR(255)", "Địa chỉ chi tiết"),
            ("hours", "VARCHAR(100)", "Giờ mở cửa (VD: 08:00 - 24:00 hoặc 24/7)"),
            ("rating", "DECIMAL(3,2)", "Điểm đánh giá dịch vụ"),
            ("status", "ENUM(...)", "approved / hidden")
        ]),
        ("Bảng 2.7. Cấu trúc bảng user_favorites (Danh sách tin lưu yêu thích)", [
            ("id", "BIGINT UNSIGNED", "PK (Tự tăng)"),
            ("user_id", "BIGINT UNSIGNED", "FK tham chiếu users(id)"),
            ("item_type", "ENUM(...)", "housing / food / market / entertainment"),
            ("item_id", "BIGINT UNSIGNED", "Mã bản ghi bài đăng được lưu"),
            ("created_at", "DATETIME", "Thời điểm lưu bài")
        ])
    ]

    for tbl_title, cols in db_tables_spec:
        add_p(doc, tbl_title, bold_prefix=None, space_after=3)
        t_spec = doc.add_table(rows=len(cols) + 1, cols=3)
        t_spec.alignment = WD_TABLE_ALIGNMENT.CENTER
        set_table_borders(t_spec, color=HEX_BORDER_BLUE)
        headers = ["Thuộc tính", "Kiểu dữ liệu MySQL", "Ràng buộc / Ghi chú"]
        for c_idx, h_text in enumerate(headers):
            cell = t_spec.rows[0].cells[c_idx]
            set_cell_background(cell, HEX_HEADER_BLUE)
            set_cell_margins(cell, 80, 80, 80, 80)
            p = cell.paragraphs[0]
            r = p.add_run(h_text)
            r.font.bold = True
            r.font.size = Pt(10.5)
            r.font.color.rgb = RGBColor(0xFF, 0xFF, 0xFF)
        
        for r_idx, (col_name, col_type, col_note) in enumerate(cols):
            row = t_spec.rows[r_idx + 1]
            bg = HEX_ZEBRA_BLUE if r_idx % 2 == 1 else "FFFFFF"
            for c_idx, val in enumerate([col_name, col_type, col_note]):
                cell = row.cells[c_idx]
                set_cell_background(cell, bg)
                set_cell_margins(cell, 70, 70, 80, 80)
                p = cell.paragraphs[0]
                r = p.add_run(val)
                r.font.size = Pt(10)
                if c_idx == 0:
                    r.font.bold = True
                    r.font.color.rgb = COLOR_DARK_NAVY
        
        doc.add_paragraph().paragraph_format.space_after = Pt(8)

    add_heading_styled(doc, "2.5.2. Các tập dữ liệu thực nghiệm trong phpMyAdmin (XAMPP)", level=3)
    add_p(doc,
        "Dữ liệu mẫu đã được nạp trực tiếp vào cơ sở dữ liệu unilife_db trên máy chủ MySQL của XAMPP thông qua file setup_database.bat và tập lệnh unilife_database.sql:\n"
        "• Bảng users: Đã nạp các tài khoản mẫu đại diện cho các nhóm vai trò: Admin (admin@unilife.vn), Khách hàng sinh viên (khachhang@gmail.com), Chủ nhà trọ (bich.tran@gmail.com), Chủ quán ăn (minh.food@gmail.com). Toàn bộ email đăng ký đều tuân thủ định dạng @gmail.com và số điện thoại liên hệ duy nhất, không trùng lặp.\n"
        "• Bảng housing: Đã nạp dữ liệu thực nghiệm 12 phòng trọ đa dạng tại các khu vực quận Hải Châu, Cẩm Lệ, Thanh Khê (gần Đại học Kiến trúc Đà Nẵng) với các mức giá từ 1.2 triệu đến 3.8 triệu đồng/tháng.\n"
        "• Bảng food_places & marketplace: Đã lưu trữ danh sách các quán ăn quen thuộc và các mặt hàng giáo trình, đồ gia dụng phục vụ sinh viên.\n"
        "• Bảng entertainment: Đã lưu trữ danh sách các tụ điểm giải trí (CyberCore Gaming, Box Music Mini, CLB Bida, Sân Cầu Lông) phục vụ sinh viên giải trí sau giờ học.\n\n"
        "Dưới đây là hình ảnh chụp thực tế dữ liệu các bảng users và housing trực tiếp từ giao diện phpMyAdmin:"
    )
    add_image_safe(doc, r"D:\24CT1-PHANTRIDUC\docs\db_2_bang_users.png", "Hình 2.21: Dữ liệu thực nghiệm bảng users trong phpMyAdmin (Email @gmail.com, SĐT không trùng, phân quyền vai trò)")
    add_image_safe(doc, r"D:\24CT1-PHANTRIDUC\docs\db_3_bang_housing.png", "Hình 2.22: Dữ liệu thực nghiệm bảng housing trong phpMyAdmin (Danh sách phòng trọ, giá thuê, diện tích, địa chỉ)")

    add_heading_styled(doc, "2.5.3. Thống kê và đếm số lượng người dùng theo từng vai trò (Role Counts)", level=3)
    add_p(doc,
        "Để phục vụ công tác quản trị và nắm bắt quy mô người dùng, cơ sở dữ liệu đã bổ sung Khung nhìn (SQL View) và truy vấn nhóm tự động đếm số lượng người dùng theo từng vai trò:\n\n"
        "CREATE OR REPLACE VIEW v_user_role_counts AS\n"
        "SELECT role, COUNT(*) AS total_users, SUM(CASE WHEN status = 'Active' THEN 1 ELSE 0 END) AS active_users\n"
        "FROM users\n"
        "GROUP BY role;\n\n"
        "Truy vấn trên được tích hợp trực tiếp vào endpoint api/users.php và hiển thị theo thời gian thực trên Bảng điều khiển quản trị (Admin Dashboard) của UniLife:\n"
        "• 🎓 Khách hàng (Sinh viên): Thống kê số lượng sinh viên đăng ký để tìm kiếm phòng trọ, quán ăn, chợ đồ cũ và tài liệu học tập.\n"
        "• 🏠 Chủ nhà trọ: Thống kê số lượng đối tác cung cấp dịch vụ phòng trọ cho thuê trên hệ thống.\n"
        "• 🍜 Chủ quán ăn: Thống kê số lượng chủ hàng quán ăn uống xung quanh trường học.\n"
        "• 📦 Người bán đồ cũ: Thống kê số lượng sinh viên tham gia thanh lý sách vở, đồ dùng cá nhân.\n"
        "• 🛡️ Quản trị viên (Admin): Đảm bảo kiểm duyệt nội dung và vận hành hệ thống ổn định."
    )

    add_heading_styled(doc, "2.5.4. Chức năng quản lý Tụ điểm Vui chơi giải trí & Tự động lưu CSDL", level=3)
    add_p(doc,
        "Đáp ứng nhu cầu đời sống tinh thần của sinh viên sau những giờ học tập và thi cử căng thẳng, phân hệ Vui chơi & Giải trí (Entertainment) đã được hoàn thiện với các tính năng:\n"
        "1. Thêm địa điểm vui chơi mới: Người dùng và quản trị viên có thể nhấn nút '+ Thêm tụ điểm vui chơi' để mở biểu mẫu nhập tên tụ điểm, phân loại (Bida, Gaming/Net, Karaoke, Thể thao), giá dịch vụ, địa chỉ và giờ mở cửa.\n"
        "2. Xóa địa điểm vui chơi: Mỗi thẻ địa điểm được trang bị nút xóa (biểu tượng thùng rác). Khi xác nhận xóa, hệ thống sẽ gửi lệnh DELETE tới api/entertainment.php và gỡ bản ghi vĩnh viễn khỏi CSDL MySQL.\n"
        "3. Tự động lưu trữ CSDL (Persistence): Toàn bộ thao tác Thêm / Xóa đều được tự động lưu trực tiếp vào bảng entertainment trong CSDL unilife_db trên phpMyAdmin, đồng thời đồng bộ hai chiều với bộ nhớ trình duyệt."
    )
    add_image_safe(doc, r"D:\24CT1-PHANTRIDUC\docs\db_4_bang_entertainment.png", "Hình 2.23: Dữ liệu thực nghiệm bảng entertainment được lưu trữ tự động trong CSDL MySQL trên phpMyAdmin")

    add_heading_styled(doc, "2.5.5. Mục tiêu và giải pháp Bộ lọc đa năng trong CSDL (Lọc Tên, SĐT, Vai trò, Trạng thái)", level=3)
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

    add_heading_styled(doc, "2.5.6. Quy trình Đăng ký tài khoản mới tự động lưu vào CSDL MySQL và cập nhật hiển thị tức thì", level=3)
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

    add_heading_styled(doc, "2.5.7. Quy chuẩn bảo mật & Kiểm soát dữ liệu đăng ký (@gmail.com, SĐT duy nhất)", level=3)
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

    add_heading_styled(doc, "2.6. Kết luận chương thực nghiệm", level=2)
    add_p(doc,
        "Chương 2 đã hoàn thành toàn diện các nội dung thực nghiệm theo đúng chuẩn mực của học phần: từ việc mô hình hóa Use Case tổng quan, xây dựng sơ đồ tuần tự chi tiết 4 chức năng, lập tiến độ dự án bằng PERT với đường găng 48 ngày, triển khai quy trình thiết kế 3 bước chuẩn UI/UX, liệt kê chi tiết 8 phân hệ chức năng kèm hình ảnh minh họa chụp thực tế từ website, đến việc hiện thực hóa cơ sở dữ liệu quan hệ với 5 hình ảnh minh chứng trực quan trích xuất trực tiếp từ hệ quản trị phpMyAdmin (XAMPP) cùng cơ chế lưu trữ tự động và bộ lọc CSDL đa năng."
    )

    doc.add_page_break()

    # =========================================================================
    # CHƯƠNG 3: KẾT LUẬN VÀ HƯỚNG PHÁT TRIỂN
    # =========================================================================
    add_heading_styled(doc, "CHƯƠNG 3: KẾT LUẬN VÀ HƯỚNG PHÁT TRIỂN", level=1)

    add_heading_styled(doc, "3.1. Đánh giá kết quả đạt được", level=2)
    add_p(doc,
        "Đề tài “Xây dựng nền tảng tiện ích hỗ trợ đời sống sinh viên UniLife” đã vận dụng thành công các công nghệ trong môi trường máy chủ XAMPP (Apache, MySQL, PHP) kết hợp với thư viện React 18 và Vite để tạo nên một hệ thống web hiện đại, giải quyết thiết thực các nhu cầu của sinh viên.\n\n"
        "Trong phạm vi báo cáo giữa kỳ, hệ thống đã hoàn thành trọn vẹn mô hình Kiến trúc tổng quan 1.2, mô hình Use Case tổng quan, 4 chức năng cốt lõi: Đăng ký, Đăng nhập, Tìm kiếm & Lọc phòng trọ và Đăng tin cho thuê trọ, cùng các phân hệ mở rộng tiện ích: Tụ điểm Vui chơi giải trí tự động đồng bộ CSDL MySQL, Bộ lọc người dùng đa tiêu chí trong CSDL (Tên, SĐT, Vai trò, Trạng thái), Thống kê số lượng người dùng theo vai trò, quy trình đăng ký tài khoản tự động chạy vào CSDL MySQL và cập nhật tức thì trên Admin Dashboard, cùng cơ chế kiểm soát dữ liệu đăng ký chặt chẽ (@gmail.com và số điện thoại không trùng lặp). Đặc biệt, báo cáo đã đối soát hoàn chỉnh với 8 ảnh chụp màn hình thực tế từ website UniLife và 5 hình ảnh trích xuất trực tiếp từ Cơ sở dữ liệu MySQL trên giao diện quản trị phpMyAdmin (XAMPP)."
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

    # Lưu file Word chuẩn phong cách Trắng - Xanh Dương
    output_docx = r"D:\24CT1-PHANTRIDUC\BAO_CAO_GIUA_KY_CNPM_PHAN_TRI_DUC_UNILIFE_BLUE_WHITE.docx"
    doc.save(output_docx)
    
    # Cố gắng lưu đè lại file chính nếu không bị khóa
    try:
        doc.save(r"D:\24CT1-PHANTRIDUC\BAO_CAO_GIUA_KY_CNPM_PHAN_TRI_DUC_UNILIFE_FULL_USECASE.docx")
    except Exception:
        pass
    print("Report generated successfully at: " + output_docx)

if __name__ == "__main__":
    generate_report()
