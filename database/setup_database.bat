@echo off
chcp 65001 > nul
echo ==============================================================================
echo   DANG KHOI TAO VA IMPORT CO SO DU LIEU UNILIFE VAO MYSQL (XAMPP / LARAGON)...
echo ==============================================================================

set MYSQL_BIN=C:\xampp\mysql\bin\mysql.exe
if not exist "%MYSQL_BIN%" (
    set MYSQL_BIN=C:\laragon\bin\mysql\mysql.exe
)

if not exist "%MYSQL_BIN%" (
    echo [LOI] Khong tim thay mysql.exe tai C:\xampp\mysql\bin hoac C:\laragon\bin\mysql
    pause
    exit /b 1
)

echo Dang ket noi den MySQL va khoi tao database unilife_db...
"%MYSQL_BIN%" -u root --default-character-set=utf8mb4 < "%~dp0unilife_database.sql"

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ==============================================================================
    echo [THANH CONG] Da import thanh cong toan bo 9 bang va du lieu mau vao unilife_db!
    echo Ban co the mo phpMyAdmin tai: http://localhost/phpmyadmin
    echo ==============================================================================
) else (
    echo.
    echo [LOI] Co loi xay ra trong qua trinh import!
)

pause
