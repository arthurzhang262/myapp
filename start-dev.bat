@echo off
echo ========================================
echo Next.js 数据库管理应用 - 开发环境启动
echo ========================================
echo.

echo 正在检查 Node.js 环境...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo 错误: 未找到 Node.js，请先安装 Node.js 18+
    pause
    exit /b 1
)

echo 正在检查 MySQL 服务...
net start | findstr "MySQL" >nul 2>&1
if %errorlevel% neq 0 (
    echo 警告: MySQL 服务可能未启动
    echo 请确保 MySQL 服务正在运行
    echo.
)

echo 正在安装依赖...
call npm install
if %errorlevel% neq 0 (
    echo 错误: 依赖安装失败
    pause
    exit /b 1
)

echo.
echo 正在启动开发服务器...
echo 应用将在 http://localhost:3000 启动
echo 按 Ctrl+C 停止服务器
echo.

call npm run dev

pause
