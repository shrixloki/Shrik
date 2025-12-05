# 🚀 QUICK SETUP - Follow These 3 Steps!

## ❌ Problem Found: `.env` file is missing!

The backend can't run without Gmail credentials.

---

## ✅ Step 1: Create .env File

**Copy and paste this into PowerShell:**

```powershell
cd s:\Projects\Shrik\Shrik-Website\Shrik\backend
Copy-Item .env.example .env
notepad .env
```

This will:
1. Navigate to the backend folder
2. Copy the example file to `.env`
3. Open it in Notepad

---

## ✅ Step 2: Get Gmail App Password

### Option A: Use shrik.devs@gmail.com (Recommended)

1. **Go to:** https://myaccount.google.com/security
2. **Enable 2-Step Verification** (if not already on)
3. **Go to:** https://myaccount.google.com/apppasswords
4. **Select:** App: Mail, Device: Windows Computer
5. **Click "Generate"**
6. **Copy** the 16-character password (like: `abcd efgh ijkl mnop`)

### Option B: Use a different Gmail account

Follow the same steps above with any Gmail account. Emails from the contact form will be **forwarded** to that account, not sent from it.

---

## ✅ Step 3: Edit .env File

In the Notepad that opened, add these two lines:

```env
GMAIL_USER=shrik.devs@gmail.com
GMAIL_APP_PASSWORD=abcdefghijklmnop
```

**Replace:**
- `shrik.devs@gmail.com` with your Gmail address
- `abcdefghijklmnop` with your 16-character App Password (remove spaces!)

**Save and close Notepad** (Ctrl+S)

---

## ✅ Step 4: Install Dependencies

```powershell
cd s:\Projects\Shrik\Shrik-Website\Shrik\backend
pip install -r requirements.txt
```

---

## ✅ Step 5: Start Backend

```powershell
cd s:\Projects\Shrik\Shrik-Website\Shrik\backend
python server.py
```

**Keep this window open!** You should see:

```
============================================================
🚀 Shrik Contact Form Backend Server
============================================================
✅ Server running on: http://localhost:5000
```

---

## ✅ Step 6: Test It!

**Open browser:** http://localhost:5000/api/health

Should show: `{"status":"Server is running!"}`

**Then test the contact form on your website!**

---

## 🎯 Quick Copy-Paste Commands

**All in one (PowerShell):**

```powershell
# 1. Create .env
cd s:\Projects\Shrik\Shrik-Website\Shrik\backend
Copy-Item .env.example .env
notepad .env

# 2. After editing .env, install dependencies
pip install -r requirements.txt

# 3. Start server
python server.py
```

---

## ❓ Common Issues

### "pip is not recognized"
Install Python from https://python.org and check "Add to PATH"

### "Module not found"
```powershell
pip install flask flask-cors python-dotenv
```

### "Authentication failed"
- Use the App Password (16 chars), NOT your regular Gmail password
- Make sure 2-Step Verification is enabled
- Remove spaces from the password in .env

---

## ✨ After Setup

You need **2 terminals running**:

**Terminal 1 - Backend:**
```powershell
cd s:\Projects\Shrik\Shrik-Website\Shrik\backend
python server.py
```

**Terminal 2 - Frontend:**
```powershell
cd s:\Projects\Shrik\Shrik-Website\Shrik
npm run dev
```

Both must run at the same time!

---

**Start with Step 1 above!** 👆
