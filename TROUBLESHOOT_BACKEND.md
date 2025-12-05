# 🔧 Backend Troubleshooting Guide

## ❌ Error: "Failed to fetch" / CORS Error

This means the **Python backend is NOT running** or can't be reached.

---

## ✅ SOLUTION - Follow These Steps:

### Step 1️⃣: Check if Backend is Running

**Open a NEW terminal** (separate from your frontend) and run:

```bash
cd s:\Projects\Shrik\Shrik-Website\Shrik\backend
python server.py
```

You should see this output:

```
============================================================
🚀 Shrik Contact Form Backend Server
============================================================
✅ Server running on: http://localhost:5000
✅ Health check: http://localhost:5000/api/health
✅ CORS enabled for all origins (development mode)
============================================================
Press Ctrl+C to stop

 * Running on all addresses (0.0.0.0)
 * Running on http://127.0.0.1:5000
 * Running on http://localhost:5000
```

**If you DON'T see this**, the backend isn't running! Keep this terminal open.

---

### Step 2️⃣: Test Backend is Working

**Open browser and go to:** http://localhost:5000/api/health

You should see:
```json
{"status": "Server is running!"}
```

**If this doesn't work:**
- Backend isn't running
- Port 5000 is blocked
- Python has an error

---

### Step 3️⃣: Check for Setup Issues

Run the test script:
```bash
cd backend
python test_backend.py
```

This will check:
- ✅ .env file exists
- ✅ Gmail credentials set
- ✅ Python packages installed
- ✅ Gmail SMTP connection works

---

## 🐛 Common Problems

### Problem 1: "python: command not found"
**Solution:**
- Install Python from https://python.org
- Or use `python3` instead of `python`:
  ```bash
  python3 server.py
  ```

### Problem 2: "ModuleNotFoundError: No module named 'flask'"
**Solution:**
```bash
cd backend
pip install -r requirements.txt
```

### Problem 3: ".env file not found"
**Solution:**
```bash
cd backend
cp .env.example .env
# Then edit .env with your Gmail credentials
```

### Problem 4: "Port 5000 already in use"
**Solution:**

**Windows:**
```bash
# Find what's using port 5000
netstat -ano | findstr :5000

# Kill the process (replace PID with actual number)
taskkill /PID <PID> /F
```

**Or change the port in server.py:**
```python
app.run(debug=True, port=5001, host='0.0.0.0')
```

Then update `Contact.tsx`:
```typescript
const response = await fetch('http://localhost:5001/api/contact', {
```

### Problem 5: "Authentication failed" (Gmail)
**Solution:**
1. Make sure 2-Step Verification is enabled
2. Use App Password (16 chars), NOT your regular password
3. Check `.env` file has correct credentials:
   ```env
   GMAIL_USER=shrik.devs@gmail.com
   GMAIL_APP_PASSWORD=abcdefghijklmnop
   ```
   (No spaces in the password!)

---

## 📋 Quick Checklist

Run through this checklist:

- [ ] Backend terminal is open and running `python server.py`
- [ ] You see the "🚀 Shrik Contact Form Backend Server" message
- [ ] http://localhost:5000/api/health returns JSON
- [ ] `.env` file exists in `backend/` folder
- [ ] `.env` has `GMAIL_USER` and `GMAIL_APP_PASSWORD`
- [ ] Test script passes: `python test_backend.py`
- [ ] No Python errors in terminal
- [ ] Frontend is running on http://localhost:8082

---

## 🆘 Still Not Working?

### Check Backend Terminal for Errors

Look for error messages like:
- `Authentication failed` → Wrong Gmail password
- `Connection refused` → Backend not running
- `Port already in use` → Port 5000 blocked
- `ModuleNotFoundError` → Missing packages

### Check Browser Console

Press `F12` in browser, look at Console tab:
- `Failed to fetch` → Backend not running
- `CORS error` → Backend needs restart
- `Network error` → Wrong URL

### Manual Test with curl

```bash
curl http://localhost:5000/api/health
```

Should return: `{"status":"Server is running!"}`

If not, backend isn't running properly.

---

## ✅ Correct Setup

You need **TWO terminals running simultaneously:**

**Terminal 1 - Backend:**
```bash
cd s:\Projects\Shrik\Shrik-Website\Shrik\backend
python server.py
# Keep this running!
```

**Terminal 2 - Frontend:**
```bash
cd s:\Projects\Shrik\Shrik-Website\Shrik
npm run dev
# Keep this running too!
```

Both must be running at the same time!

---

## 🎯 Success Indicators

When everything works, you should see:

**Backend Terminal:**
```
🚀 Shrik Contact Form Backend Server
✅ Server running on: http://localhost:5000
```

**Browser at http://localhost:5000/api/health:**
```json
{"status": "Server is running!"}
```

**Contact Form:**
- ✅ Submit button works
- ✅ No console errors
- ✅ Green success message appears
- ✅ Email arrives at shrik.devs@gmail.com

---

**Need more help?** Check the backend terminal for specific error messages!
