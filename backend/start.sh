#!/bin/bash

echo ""
echo "========================================"
echo " Starting Shrik Contact Form Backend"
echo "========================================"
echo ""

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "[ERROR] Python 3 is not installed"
    echo "Please install Python from https://python.org"
    exit 1
fi

# Check if .env exists
if [ ! -f .env ]; then
    echo "[ERROR] .env file not found"
    echo ""
    echo "Please create .env file:"
    echo "  1. Copy .env.example to .env"
    echo "  2. Add your Gmail credentials"
    echo ""
    exit 1
fi

echo "[INFO] Checking dependencies..."
python3 -c "import flask, flask_cors, dotenv" 2>/dev/null
if [ $? -ne 0 ]; then
    echo "[INFO] Installing dependencies..."
    pip3 install -r requirements.txt
    if [ $? -ne 0 ]; then
        echo "[ERROR] Failed to install dependencies"
        exit 1
    fi
fi

echo "[INFO] Dependencies OK"
echo ""
echo "[INFO] Starting Flask server on http://localhost:5000"
echo "[INFO] Press Ctrl+C to stop"
echo ""

python3 server.py
