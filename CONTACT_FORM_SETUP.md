# 📧 Contact Form Setup - Quick Start

The contact form is **ready to use** but needs EmailJS configuration to send emails directly to **shrik.devs@gmail.com**.

## 🚀 Quick Setup (5 minutes)

### Step 1: Create `.env` file
Copy the example file:
```bash
cp .env.example .env
```

### Step 2: Get EmailJS Credentials
1. Go to [EmailJS.com](https://www.emailjs.com/) and create a FREE account
2. Add Gmail service and connect **shrik.devs@gmail.com**
3. Create an email template
4. Get your Service ID, Template ID, and Public Key

### Step 3: Add to `.env`
```env
VITE_EMAILJS_SERVICE_ID=service_xyz123
VITE_EMAILJS_TEMPLATE_ID=template_abc456
VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
```

### Step 4: Restart Dev Server
```bash
npm run dev
```

## 📝 Detailed Instructions

See **EMAILJS_SETUP.md** for complete step-by-step guide with screenshots.

## ✨ What Works Now

✅ **Form Validation** - Name, email, and message required
✅ **Error Messages** - Clear error feedback
✅ **Loading States** - Animated spinner while sending  
✅ **Success Notifications** - Confirmation when email sent
✅ **Email Delivery** - Direct to shrik.devs@gmail.com
✅ **Form Reset** - Auto-clears after successful submission

## 🎯 How It Works

1. User fills out form
2. Client-side validation
3. EmailJS sends email to **shrik.devs@gmail.com**
4. User sees success message
5. Form clears automatically

## 🔒 Security

- `.env` file is gitignored (never committed)
- EmailJS Public Key is safe for frontend use
- Rate limiting built-in to prevent spam

## 🆓 Free Tier

- 200 emails per month (EmailJS free tier)
- More than enough for a contact form
- No credit card required

---

**Questions?** Check EMAILJS_SETUP.md for detailed instructions!
