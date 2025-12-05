#!/usr/bin/env python3
"""
Quick test script to verify backend setup
Run: python test_backend.py
"""

import os
from dotenv import load_dotenv

print("🔍 Checking Backend Setup...\n")

# Load environment variables
load_dotenv()

# Check .env file exists
if os.path.exists('.env'):
    print("✅ .env file found")
else:
    print("❌ .env file NOT found")
    print("   → Create .env file from .env.example")
    exit(1)

# Check Gmail user
gmail_user = os.getenv('GMAIL_USER')
if gmail_user:
    print(f"✅ GMAIL_USER set: {gmail_user}")
else:
    print("❌ GMAIL_USER not set in .env")
    exit(1)

# Check Gmail app password
gmail_password = os.getenv('GMAIL_APP_PASSWORD')
if gmail_password:
    print(f"✅ GMAIL_APP_PASSWORD set: {'*' * len(gmail_password)}")
else:
    print("❌ GMAIL_APP_PASSWORD not set in .env")
    exit(1)

# Check dependencies
print("\n🔍 Checking Python Dependencies...\n")

try:
    import flask
    print(f"✅ Flask installed: {flask.__version__}")
except ImportError:
    print("❌ Flask not installed")
    print("   → Run: pip install -r requirements.txt")
    exit(1)

try:
    import flask_cors
    print(f"✅ Flask-CORS installed")
except ImportError:
    print("❌ Flask-CORS not installed")
    print("   → Run: pip install -r requirements.txt")
    exit(1)

try:
    import dotenv
    print(f"✅ python-dotenv installed")
except ImportError:
    print("❌ python-dotenv not installed")
    print("   → Run: pip install -r requirements.txt")
    exit(1)

# Test SMTP connection
print("\n🔍 Testing Gmail SMTP Connection...\n")

try:
    import smtplib
    server = smtplib.SMTP('smtp.gmail.com', 587)
    server.starttls()
    server.login(gmail_user, gmail_password)
    server.quit()
    print("✅ Gmail SMTP connection successful!")
    print("✅ Credentials are valid!")
except Exception as e:
    print(f"❌ Gmail SMTP connection failed: {str(e)}")
    print("\n   Possible issues:")
    print("   1. Wrong GMAIL_APP_PASSWORD (should be 16 chars, no spaces)")
    print("   2. 2-Step Verification not enabled on Gmail")
    print("   3. App Password not generated correctly")
    print("   4. Using regular password instead of App Password")
    exit(1)

print("\n" + "="*50)
print("🎉 ALL CHECKS PASSED!")
print("="*50)
print("\n✅ Your backend is ready to use!")
print("✅ Run: python server.py")
print("\n")
