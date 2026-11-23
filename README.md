# Reusable AI Consulting Website Chatbot (Flask + Gemini)

This starter keeps the original website UI and adds Gemini API responses, a separate JSON knowledge file per client, and tenant-specific routes. It is a development demo, not a production-ready SaaS.

## 1. Requirements
- Python 3.10+ (Python 3.14 may work if all dependencies have compatible wheels; if installation fails, use a currently supported Python version such as 3.12 or 3.13).
- A Gemini API key with access to a free-tier model. Free-tier availability, model names and quotas can change. Check the official pricing page before use: https://ai.google.dev/gemini-api/docs/pricing

## 2. Windows CMD setup
Open CMD in this project folder:

```cmd
py -m venv .venv
.venv\Scripts\activate.bat
python -m pip install -r requirements.txt
copy .env.example .env
```

Open `.env` in VS Code and replace `GEMINI_API_KEY` with your key. Keep the key private. Do not put it in HTML, JavaScript, screenshots, GitHub, or a client website.

Run:
```cmd
python app.py
```
Open http://127.0.0.1:5000/ or http://127.0.0.1:5000/c/northstar

## 3. Add a client
1. Copy `clients/northstar.json` to `clients/client-slug.json` (use lowercase letters, numbers, hyphens or underscores).
2. Replace the sample business name, contact information, description, FAQs, and suggestions with information the business owner has approved.
3. Open `http://127.0.0.1:5000/c/client-slug`.

Each client has a separate JSON file and a separate route. The API selects that client's file from the route, not from a model-generated value. Do not place confidential or sensitive customer information in these files.

## 4. API
`POST /api/<client_id>/chat` with JSON:
```json
{
  "message": "Do you help new businesses?",
  "history": []
}
```

## 5. Important security and privacy notes
- The Gemini key stays on the Flask server in `.env`; never expose it in frontend code.
- The Gemini free tier may use submitted content to improve Google's products. Do not send confidential client/customer data. Use only approved public business facts for this demo and review the provider's current terms.
- Free quotas and model availability can change. A free tier is for testing, not a service-level guarantee for paying clients.
- Add rate limiting, abuse protection, monitoring, HTTPS, a production WSGI server, logging controls, and stronger tenant authentication before public deployment.
- This starter uses tenant IDs in URLs but has no owner login or admin permissions. It is suitable for a controlled demo with public business information only, not sensitive data or production multi-tenant hosting.
- Review every answer before presenting it to a client. AI can still make mistakes despite instructions.
