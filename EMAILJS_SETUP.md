# EmailJS Setup Guide for Shrik Contact Form

The contact form sends emails directly to **shrik.devs@gmail.com** using EmailJS.

## 📧 Setup Instructions

### 1. Create EmailJS Account
1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a **FREE** account (allows 200 emails/month)
3. Verify your email

### 2. Add Email Service
1. Go to **Email Services** in dashboard
2. Click **Add New Service**
3. Choose **Gmail** 
4. Connect your **shrik.devs@gmail.com** account
5. Note the **Service ID** (e.g., `service_xyz123`)

### 3. Create Email Template
1. Go to **Email Templates**
2. Click **Create New Template**
3. Use this template:

**Subject:**
```
New Contact Form Message from {{from_name}}
```

**Body:**
```
You received a new message from your website contact form:

Name: {{from_name}}
Email: {{from_email}}

Message:
{{message}}

---
Sent via Shrik Website Contact Form
```

4. Note the **Template ID** (e.g., `template_abc456`)

### 4. Get Public Key
1. Go to **Account** → **General**
2. Find your **Public Key** (e.g., `your_public_key_here`)

### 5. Update Contact.tsx
Open `src/components/Contact.tsx` and replace these values:

```typescript
const serviceId = 'service_shrik'; // Replace with your Service ID
const templateId = 'template_contact'; // Replace with your Template ID
const publicKey = 'YOUR_PUBLIC_KEY'; // Replace with your Public Key
```

## 🎯 Current Configuration

**Lines to update in Contact.tsx (around line 63-65):**
```typescript
const serviceId = 'YOUR_SERVICE_ID';
const templateId = 'YOUR_TEMPLATE_ID';
const publicKey = 'YOUR_PUBLIC_KEY';
```

## ✅ Testing

1. Fill out the contact form on your website
2. Click Submit
3. Check **shrik.devs@gmail.com** inbox
4. You should receive an email with the form data!

## 🔒 Security Note

EmailJS Public Key is safe to use in frontend code. It's designed for client-side use and has built-in rate limiting to prevent abuse.

## 📊 Free Tier Limits

- ✅ 200 emails per month
- ✅ Unlimited email templates
- ✅ Email attachments supported
- ✅ No credit card required

---

**Need Help?** Check EmailJS docs: https://www.emailjs.com/docs/
