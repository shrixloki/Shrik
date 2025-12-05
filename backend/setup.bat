@echo off
echo.
echo ========================================
echo  Shrik Backend Setup Wizard
echo ========================================
echo.

REM Check if .env already exists
if exist .env (
    echo [INFO] .env file already exists
    choice /C YN /M "Do you want to recreate it"
    if errorlevel 2 goto :skip_env
)

REM Create .env from example
echo [STEP 1/4] Creating .env file...
if not exist .env.example (
    echo [ERROR] .env.example not found!
    pause
    exit /b 1
)

copy .env.example .env >nul
echo [OK] .env file created

:skip_env

echo.
echo ========================================
echo  IMPORTANT: Configure Gmail Credentials
echo ========================================
echo.
echo You need to add your Gmail App Password to .env
echo.
echo 1. Go to: https://myaccount.google.com/apppasswords
echo 2. Generate an App Password
echo 3. Copy the 16-character password
echo.
echo Opening .env file in Notepad...
echo.
pause

notepad .env

echo.
echo [STEP 2/4] Checking Python...
python --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Python is not installed
    echo Please install from: https://python.org
    pause
    exit /b 1
)
echo [OK] Python found

echo.
echo [STEP 3/4] Installing dependencies...
pip install -r requirements.txt
if errorlevel 1 (
    echo [ERROR] Failed to install dependencies
    pause
    exit /b 1
)
echo [OK] Dependencies installed

echo.
echo [STEP 4/4] Testing configuration...
python test_backend.py
if errorlevel 1 (
    echo.
    echo [ERROR] Configuration test failed
    echo Please fix the issues above
    pause
    exit /b 1
)

echo.
echo ========================================
echo  ✅ Setup Complete!
echo ========================================
echo.
echo To start the backend server, run:
echo   python server.py
echo.
echo Or just run: start.bat
echo.
pause
