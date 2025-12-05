from flask import Flask, request, jsonify
from flask_cors import CORS
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = Flask(__name__)

# Configure CORS to allow all origins (development only)
CORS(app, resources={
    r"/*": {
        "origins": "*",
        "methods": ["GET", "POST", "OPTIONS"],
        "allow_headers": ["Content-Type", "Authorization"],
        "supports_credentials": False
    }
})

@app.route('/api/contact', methods=['POST'])
def send_email():
    try:
        # Get form data
        data = request.json
        name = data.get('name')
        email = data.get('email')
        message = data.get('message')
        
        # Validate data
        if not all([name, email, message]):
            return jsonify({'error': 'All fields are required'}), 400
        
        # Email configuration
        GMAIL_USER = os.getenv('GMAIL_USER')  # Your Gmail address
        GMAIL_APP_PASSWORD = os.getenv('GMAIL_APP_PASSWORD')  # Gmail App Password
        RECIPIENT_EMAIL = 'shrik.devs@gmail.com'
        
        # Create email
        msg = MIMEMultipart()
        msg['From'] = GMAIL_USER
        msg['To'] = RECIPIENT_EMAIL
        msg['Subject'] = f'Contact Form: Message from {name}'
        
        # Email body
        body = f"""
New message from Shrik Website Contact Form:

Name: {name}
Email: {email}

Message:
{message}

---
Sent from Shrik Website
"""
        
        msg.attach(MIMEText(body, 'plain'))
        
        # Send email via Gmail SMTP
        with smtplib.SMTP('smtp.gmail.com', 587) as server:
            server.starttls()
            server.login(GMAIL_USER, GMAIL_APP_PASSWORD)
            server.send_message(msg)
        
        return jsonify({'message': 'Email sent successfully!'}), 200
        
    except Exception as e:
        print(f'Error: {str(e)}')
        return jsonify({'error': 'Failed to send email'}), 500

@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'Server is running!'}), 200

if __name__ == '__main__':
    print("\n" + "="*60)
    print("🚀 Shrik Contact Form Backend Server")
    print("="*60)
    print(f"✅ Server running on: http://localhost:5000")
    print(f"✅ Health check: http://localhost:5000/api/health")
    print(f"✅ CORS enabled for all origins (development mode)")
    print("="*60)
    print("Press Ctrl+C to stop\n")
    
    app.run(debug=True, port=5000, host='0.0.0.0')
