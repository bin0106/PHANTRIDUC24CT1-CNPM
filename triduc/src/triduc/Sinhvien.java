package triduc;

import java.util.Scanner; // Quan trọng: Phải có dòng này

public class SinhVien { // Đổi chữ cái đầu thành viết hoa cho đúng chuẩn Java
    String name, maSV;
    static int SoLuong = 0;
    double diemLT, diemTH, diemTB;
    boolean kq;

    // Constructor: Tự động tạo mã sinh viên
    public SinhVien() {
        SoLuong += 1;
        if (SoLuong < 10) {
            maSV = "02512200" + SoLuong;
        } else if (SoLuong < 100) {
            maSV = "0251220" + SoLuong;
        } else {
            maSV = "025122" + SoLuong;
        }
    }

    // Nhập thông tin sinh viên
    public void NhapTT() {
        Scanner scanner = new Scanner(System.in);
        System.out.print("Nhap ten sinh vien: ");
        name = scanner.nextLine();

        System.out.print("Nhap diem ly thuyet: ");
        diemLT = scanner.nextDouble();

        System.out.print("Nhap diem thuc hanh: ");
        diemTH = scanner.nextDouble();

        diemTB = (diemLT + diemTH) / 2;
        kq = (diemTB >= 4);
    }

    // In thông tin sinh viên
    public void inTT() {
        System.out.println("---------------------------");
        System.out.println("Ten: " + name + " | MSV: " + maSV);
        System.out.println("Diem TB: " + diemTB + " | Ket qua: " + (kq ? "Dat" : "Thi lai"));
    }

    // Tìm kiếm theo tên
    public static SinhVien[] timKiem(String name, SinhVien[] m) {
        SinhVien[] ketqua = new SinhVien[SoLuong];
        int id = 0;
        for (int i = 0; i < 3; i++) { // Duyệt qua số lượng SV đã nhập (ở đây là 3)
            if (m[i] != null && m[i].name.equalsIgnoreCase(name)) {
                ketqua[id++] = m[i];
            }
        }
        return ketqua;
    }

    // Tìm kiếm SV có điểm TB >= dtb1
    public static SinhVien[] timKiem1(double dtb1, SinhVien[] m) {
        SinhVien[] ketqua = new SinhVien[SoLuong];
        int id = 0;
        for (int i = 0; i < 3; i++) {
            if (m[i] != null && m[i].diemTB >= dtb1) {
                ketqua[id++] = m[i];
            }
        }
        return ketqua;
    }

    // Tìm kiếm SV có điểm TB < dtb2
    public static SinhVien[] timKiem2(double dtb2, SinhVien[] m) {
        SinhVien[] ketqua = new SinhVien[SoLuong];
        int id = 0;
        for (int i = 0; i < 3; i++) {
            if (m[i] != null && m[i].diemTB < dtb2) {
                ketqua[id++] = m[i];
            }
        }
        return ketqua;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        SinhVien[] sv = new SinhVien[10];

        // Nhập dữ liệu cho 3 sinh viên
        for (int i = 0; i < 3; i++) {
            System.out.println("\nNhap thong tin sinh vien thu " + (i + 1) + ":");
            sv[i] = new SinhVien();
            sv[i].NhapTT();
        }

        // Xuất danh sách
        System.out.println("\n--- DANH SACH SINH VIEN ---");
        for (int i = 0; i < 3; i++) {
            sv[i].inTT();
        }

        // Tìm kiếm theo tên
        System.out.print("\nNhap ten sinh vien can tim: ");
        String tenTim = sc.nextLine();
        SinhVien[] tkTen = timKiem(tenTim, sv);
        System.out.println("Ket qua tim kiem theo ten:");
        boolean foundTen = false;
        for (SinhVien s : tkTen) {
            if (s != null) {
                s.inTT();
                foundTen = true;
            }
        }
        if (!foundTen) System.out.println("Khong tim thay!");

        // Lọc điểm >= 8.7
        System.out.println("\nKet qua sinh vien diem tb >= 8.7:");
        SinhVien[] dtb1 = timKiem1(8.7, sv);
        boolean found1 = false;
        for (SinhVien s : dtb1) {
            if (s != null) {
                s.inTT();
                found1 = true;
            }
        }
        if (!found1) System.out.println("Khong co sinh vien nao.");

        // Lọc điểm < 4.0
        System.out.println("\nKet qua sinh vien diem tb < 4.0:");
        SinhVien[] dtb2 = timKiem2(4.0, sv);
        boolean found2 = false;
        for (SinhVien s : dtb2) {
            if (s != null) {
                s.inTT();
                found2 = true;
            }
        }
        if (!found2) System.out.println("Khong co sinh vien nao.");
    }
}