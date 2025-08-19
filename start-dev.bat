@echo off
echo ========================================
echo Next.js ���ݿ����Ӧ�� - ������������
echo ========================================
echo.

echo ���ڼ�� Node.js ����...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ����: δ�ҵ� Node.js�����Ȱ�װ Node.js 18+
    pause
    exit /b 1
)

echo ���ڼ�� MySQL ����...
net start | findstr "MySQL" >nul 2>&1
if %errorlevel% neq 0 (
    echo ����: MySQL �������δ����
    echo ��ȷ�� MySQL ������������
    echo.
)

echo ���ڰ�װ����...
call npm install
if %errorlevel% neq 0 (
    echo ����: ������װʧ��
    pause
    exit /b 1
)

echo.
echo ������������������...
echo Ӧ�ý��� http://localhost:3000 ����
echo �� Ctrl+C ֹͣ������
echo.

call npm run dev

pause
