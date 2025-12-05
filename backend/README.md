# 🐍 Python Backend for Contact Form - 100% FREE!

This Python Flask backend sends emails directly to **shrik.devs@gmail.com** using Gmail's SMTP server.

**No paid services. Completely FREE forever!**

## 🚀 Quick Setup (5 minutes)

### Step 1: Install Python Dependencies
```bash
cd backend
pip install -r requirements.txt
```

### Step 2: Get Gmail App Password

1. **Enable 2-Step Verification** on your Gmail account
   - Go to https://myaccount.google.com/security
   - Enable 2-Step Verification

2. **Generate App Password**
   - Go to https://myaccount.google.com/apppasswords
   - Select "Mail" and "Windows Computer" (or other)
   - Click "Generate"
   - Copy the 16-character password

### Step 3: Create `.env` File
```bash
cd backend
cp .env.example .env
```

Edit `.env`:
```env
GMAIL_USER=shrik.devs@gmail.com
GMAIL_APP_PASSWORD=your_16_char_app_password
```

### Step 4: Run the Backend
```bash
python server.py
```

Server will run on **http://localhost:5000**

### Step 5: Update React Frontend
The frontend is already configured to use this backend at `http://localhost:5000/api/contact`

## 🎯 How It Works

1. User fills contact form on website
2. React sends POST request to `http://localhost:5000/api/contact`
3. Python backend receives data
4. Sends email via Gmail SMTP to **shrik.devs@gmail.com**
5. Returns success/error to frontend

## 📋 API Endpoints

### POST /api/contact
Send a contact form message

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Hello from the website!"
}
```

**Success Response (200):**
```json
{
  "message": "Email sent successfully!"
}
```

**Error Response (400/500):**
```json
{
  "error": "Error message here"
}
```

### GET /api/health
Check if server is running

**Response (200):**
```json
{
  "status": "Server is running!"
}
```

## 🔒 Security

- ✅ `.env` file is gitignored
- ✅ Uses Gmail App Password (not real password)
- ✅ CORS enabled for frontend
- ✅ Input validation

## 🌐 Production Deployment

### For Production:
1. Deploy backend to a service like:
   - **Render** (free tier)
   - **Railway** (free tier)
   - **PythonAnywhere** (free tier)
   - **Heroku** (paid)

2. Update frontend API URL in `Contact.tsx`:
```typescript
const response = await fetch('https://your-backend-url.com/api/contact', {
  method: 'POST',
  // ...
});
```

## 💡 Benefits Over EmailJS

✅ **100% FREE** - No email limits
✅ **Full Control** - Your own backend
✅ **No Third-Party** - Direct Gmail SMTP
✅ **Unlimited Emails** - No monthly restrictions
✅ **More Secure** - You control everything

## 🐛 Troubleshooting

**"Authentication failed"**
- Make sure 2-Step Verification is enabled
- Use App Password, not your regular Gmail password
- Check GMAIL_USER and GMAIL_APP_PASSWORD in .env

**"Connection refused"**
- Make sure backend is running: `python server.py`
- Check port 5000 is not in use

**"CORS error"**
- Backend has CORS enabled, should work automatically
- Make sure frontend calls correct URL

---

**Questions?** Check Gmail App Password guide or open an issue!
