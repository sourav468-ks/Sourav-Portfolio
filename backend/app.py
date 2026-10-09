from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
from email.message import EmailMessage
import smtplib
import os

load_dotenv()

app = Flask(__name__)

CORS(app)

@app.after_request
def add_security_headers(response):
    response.headers["Content-Security-Policy"] = (
        "default-src 'none'; frame-ancestors 'none'; base-uri 'none'"
    )
    response.headers["X-Frame-Options"] = "DENY"
    response.headers["X-Content-Type-Options"] = "nosniff"
    response.headers["Strict-Transport-Security"] = "max-age=31536000"
    return response

EMAIL_ADDRESS = os.getenv("EMAIL_ADDRESS")
EMAIL_PASSWORD = os.getenv("EMAIL_PASSWORD")
RECEIVER_EMAIL = os.getenv("RECEIVER_EMAIL")


@app.route("/")
def home():
    return jsonify({
        "status": "online",
        "message": "Sourav Portfolio Backend is running"
    })


@app.route("/api/contact", methods=["POST"])
def contact():

    try:
        data = request.get_json()

        name = data.get("name", "").strip()
        email = data.get("email", "").strip()
        message = data.get("message", "").strip()

        if not name or not email or not message:
            return jsonify({
                "success": False,
                "message": "All fields are required."
            }), 400

        mail = EmailMessage()

        mail["Subject"] = f"New Portfolio Message from {name}"
        mail["From"] = EMAIL_ADDRESS
        mail["To"] = RECEIVER_EMAIL
        mail["Reply-To"] = email

        mail.set_content(
            f"""
New message from Sourav Portfolio

Name: {name}
Email: {email}

Message:
{message}
"""
        )

        with smtplib.SMTP_SSL("smtp.gmail.com", 465) as smtp:
            smtp.login(EMAIL_ADDRESS, EMAIL_PASSWORD)
            smtp.send_message(mail)

        return jsonify({
            "success": True,
            "message": "Message sent successfully!"
        })

    except Exception as error:

        print("ERROR:", error)

        return jsonify({
            "success": False,
            "message": "Unable to send message."
        }), 500


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))

    app.run(
        host="0.0.0.0",
        port=port
    )