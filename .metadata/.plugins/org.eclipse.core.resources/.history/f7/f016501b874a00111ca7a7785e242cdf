package thi;

import java.util.Scanner;

public class SinhVien {
    String name, maSV;
    static int SoLuong;
    double diemLT, diemTH, diemTB;

    boolean kq;

    public SinhVien() { // tao ma sinh vien
        SoLuong += 1;

        if (SoLuong < 10) {
            maSV = "02512200" + SoLuong;
        }

        else if (SoLuong >= 10) {
            maSV = "0251220" + SoLuong;
        }

        else {
            maSV = "025122" + SoLuong;
        }
    }

    // Nhap thong tin sinh vien
    public void NhapTT() {
        Scanner scanner = new Scanner(System.in);

        System.out.print("Nhap ten sinh vien: ");
        name = scanner.nextLine();

        System.out.print("Nhap diem ly thuyet: ");
        diemLT = scanner.nextDouble();

        System.out.print("Nhap diem thuc hanh: ");
        diemTH = scanner.nextDouble();

        diemTB = (diemLT + diemTH) / 2;

        if (diemTB >= 4) {
            kq = true;
        }

        else {
            kq = false;
        }
    }

    // in thong tin sinh vien
    public void inTT() {
        System.out.println( "Ten sinh vien " + " : " + name + "\nmaSV: " + maSV + "\nDiem trung binh: " + diemTB);
        
        if (kq) {
            System.out.println("Dat");
        }

        else {
            System.out.println("Thi lai");
        }
    }

    public static SinhVien[] timKiem(String name, SinhVien[] m) { // tim kiem ten sinh vien
        SinhVien[] kq = new SinhVien[SoLuong];
        int id = 0;

        for (int i = 0; i < SoLuong; i++) {
            if (m[i].name.equalsIgnoreCase(name)) {
                kq[id] = m[i];
                id++;
            }
        }

        return kq;
    }

    public static SinhVien[] timKiem1(double dtb1, SinhVien[] m) { // tim kiem va so sanh diem tb
        SinhVien[] kq = new SinhVien[SoLuong];
        int id = 0;

        for (int i = 0; i < SoLuong; i++) {
            if (m[i].diemTB >= dtb1) {
                kq[id] = m[i];
                id++;
            }
        }

        return kq;
    }

    public static SinhVien[] timKiem2(double dtb2, SinhVien[] m) {
        SinhVien[] kq = new SinhVien[SoLuong];
        int id = 0;

        for (int i = 0; i < SoLuong; i++) {
            if (m[i].diemTB < dtb2) {
                kq[id] = m[i];
                id++;
            }
        }

        return kq;
    }

    public static void sapXep(SinhVien[] m) {
    	 for (int i = 0; i < SoLuong - 1; i++) {
    	     for (int j = i + 1; j < SoLuong; j++) {
    	    	 if (m[i].diemTB < m[j].diemTB) {
    	             SinhVien temp = m[i];
    	             m[i] = m[j];
    	             m[j] = temp;
    	    	 }
    	     }
    	 }
    }

    public static void main(String[] args) {

        // TODO Auto-generated method stub

        SinhVien[] sv = new SinhVien[10];

        for (int i = 0; i <= 2; i++) {
            System.out.print("Nhap thong tin sinh vien thu " + (i + 1) + ":\n");

            sv[i] = new SinhVien();
            sv[i].NhapTT();
        }

        for (int i = 0; i <= 2; i++) {
            sv[i].inTT();
        }

        Scanner scanner = new Scanner(System.in);

        System.out.print("Nhap ten sinh vien can tim kiem : ");
        String name = scanner.nextLine();

        System.out.print("Ket qua sinh vien tim kiem : \n");

        SinhVien tk[] = timKiem(name, sv);

        for (SinhVien i : tk) {
            if (i != null)
                i.inTT();
            	
        }

        System.out.print("Ket qua sinh vien diem tb >= 8.7 : \n");

        SinhVien dtb1[] = timKiem1(8.7, sv);

        if (dtb1 == null) {
            System.out.println("khong co sinh vien nao");
        }

        else {
            for (SinhVien i : dtb1) {
                if (i != null) {
                    i.inTT();
                    
                }
            }
        }

        System.out.print("Ket qua sinh vien diem tb < 4.0 : \n");

        SinhVien dtb2[] = timKiem2(4.0, sv);

        if (dtb2 == null) {
            System.out.println("khong co sinh vien nao");
        }

        else {
            for (SinhVien i : dtb2) {
            	if (i != null) 
                i.inTT();
        
            }
        }
    }
}