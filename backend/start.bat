@echo off
echo.
echo ========================================
echo  Starting Shrik Contact Form Backend
echo ========================================
echo.

REM Check if Python is installed
python --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Python is not installed or not in PATH
    echo Please install Python from https://python.org
    pause
    exit /b 1
)

REM Check if .env exists
if not exist .env (
    echo [ERROR] .env file not found
    echo.
    echo Please create .env file:
    echo   1. Copy .env.example to .env
    echo   2. Add your Gmail credentials
    echo.
    pause
    exit /b 1
)

echo [INFO] Checking dependencies...
python -c "import flask, flask_cors, dotenv" >nul 2>&1
if errorlevel 1 (
    echo [INFO] Installing dependencies...
    pip install -r requirements.txt
    if errorlevel 1 (
        echo [ERROR] Failed to install dependencies
        pause
        exit /b 1
    )
)

echo [INFO] Dependencies OK
echo.
echo [INFO] Starting Flask server on http://localhost:5000
echo [INFO] Press Ctrl+C to stop
echo.

python server.py
