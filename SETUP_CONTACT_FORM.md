# 📧 Contact Form Setup - FREE Python Backend

Your contact form now uses a **FREE Python Flask backend** that sends emails directly to **shrik.devs@gmail.com** using Gmail's SMTP.

**No paid services. No monthly limits. Completely FREE forever!** ✅

---

## 🚀 Quick Start (5 minutes)

### 1️⃣ Install Python Dependencies
```bash
cd backend
pip install -r requirements.txt
```

### 2️⃣ Get Gmail App Password

**Enable 2-Step Verification:**
1. Go to https://myaccount.google.com/security
2. Click "2-Step Verification" → Turn it ON
3. Verify with your phone

**Generate App Password:**
1. Go to https://myaccount.google.com/apppasswords
2. App: Select "Mail"
3. Device: Select "Windows Computer" (or Other)
4. Click "Generate"
5. **Copy the 16-character password** (looks like: `abcd efgh ijkl mnop`)

### 3️⃣ Configure Backend
```bash
cd backend
cp .env.example .env
```

Edit `backend/.env`:
```env
GMAIL_USER=shrik.devs@gmail.com
GMAIL_APP_PASSWORD=abcdefghijklmnop
```
*(Use the 16-character password from step 2, no spaces)*

### 4️⃣ Run Backend Server
```bash
cd backend
python server.py
```

You should see:
```
* Running on http://127.0.0.1:5000
```

### 5️⃣ Run Frontend (New Terminal)
```bash
# In the main project directory
npm run dev
```

### 6️⃣ Test It!
1. Open http://localhost:5173 in browser
2. Scroll to Contact section
3. Fill out the form
4. Click Submit
5. Check **shrik.devs@gmail.com** inbox! 📬

---

## 📁 Project Structure

```
Shrik/
├── backend/              # Python Flask server
│   ├── server.py        # Main backend code
│   ├── requirements.txt # Python dependencies
│   ├── .env            # Your Gmail credentials (gitignored)
│   └── README.md       # Backend documentation
├── src/
│   └── components/
│       └── Contact.tsx  # Contact form (already configured)
└── SETUP_CONTACT_FORM.md  # This file
```

---

## 🔧 How It Works

```
User fills form
      ↓
React Frontend (port 3000/5173)
      ↓
HTTP POST → http://localhost:5000/api/contact
      ↓
Python Flask Backend (port 5000)
      ↓
Gmail SMTP Server
      ↓
📧 Email arrives at shrik.devs@gmail.com
```

---

## ✅ What's Included

**Frontend (React):**
- ✅ Form validation
- ✅ Loading spinner
- ✅ Success/error messages
- ✅ Auto-clear after submit
- ✅ Beautiful UI

**Backend (Python):**
- ✅ Flask REST API
- ✅ Gmail SMTP integration
- ✅ CORS enabled
- ✅ Input validation
- ✅ Error handling

---

## 🐛 Troubleshooting

### "Authentication failed" Error
**Problem:** Gmail won't accept password

**Solution:**
1. Make sure you're using the **App Password**, NOT your regular Gmail password
2. Verify 2-Step Verification is enabled
3. The app password has no spaces: `abcdefghijklmnop`
4. Check `.env` file has correct `GMAIL_USER` and `GMAIL_APP_PASSWORD`

### "Connection refused" Error
**Problem:** Frontend can't reach backend

**Solution:**
1. Make sure Python backend is running: `python server.py`
2. Check it's running on port 5000
3. Try accessing: http://localhost:5000/api/health (should return JSON)

### "CORS Error" in Browser
**Problem:** Browser blocks request

**Solution:**
- Flask-CORS is already installed and configured
- If still happens, check `pip list` shows `Flask-Cors`
- Restart backend server

### Port 5000 Already in Use
**Problem:** Another app using port 5000

**Solution:**
```python
# In server.py, change last line:
if __name__ == '__main__':
    app.run(debug=True, port=5001)  # Use different port
```

Then update `Contact.tsx`:
```typescript
const response = await fetch('http://localhost:5001/api/contact', {
```

---

## 🌐 Production Deployment

### Deploy Backend to Cloud (FREE Options):

**1. Render.com** (Recommended)
```bash
# Render will auto-detect Python and run server.py
# Add environment variables in Render dashboard
```

**2. Railway.app**
```bash
railway up
```

**3. PythonAnywhere** (Free tier)
```bash
# Follow PythonAnywhere Flask guide
```

### Update Frontend API URL:
In `src/components/Contact.tsx`, change:
```typescript
const response = await fetch('https://your-backend.onrender.com/api/contact', {
```

---

## 💰 Cost Comparison

| Service | Cost | Emails/Month | Setup Time |
|---------|------|--------------|------------|
| **This Solution** | **FREE** | **Unlimited** | **5 min** |
| EmailJS | Free → $10/mo | 200 → Unlimited | 5 min |
| SendGrid | Free → $20/mo | 100 → Unlimited | 10 min |
| AWS SES | Pay per email | Unlimited | 30 min |

---

## 🔒 Security Notes

✅ **App Password** is revocable anytime
✅ **`.env` is gitignored** - credentials never committed
✅ **CORS enabled** - only your frontend can access
✅ **Input validation** - prevents malicious data
✅ **Rate limiting** - Gmail prevents spam (500 emails/day limit)

---

## 📚 Additional Resources

- **Backend README:** `backend/README.md`
- **Gmail App Passwords:** https://support.google.com/accounts/answer/185833
- **Flask Documentation:** https://flask.palletsprojects.com/
- **SMTP with Python:** https://docs.python.org/3/library/smtplib.html

---

## 🎉 You're Done!

Your contact form is now:
- ✅ **100% FREE**
- ✅ **Unlimited emails**
- ✅ **Fully functional**
- ✅ **Professional**
- ✅ **Under your control**

**Test it now and check shrik.devs@gmail.com!** 📬
