# Email Classifier AI

This is a fullstack application with a React + TypeScript + Vite frontend and a Python Flask backend.  
It classifies emails (plain text or PDF) as "Produtivo" (Action Required) or "Improdutivo" (No Action) in Portuguese, using the Groq LLM API.  
The backend exposes a REST API, and the frontend provides an interface for users to upload or paste email content.

---

## Features

- **Frontend:** React + TypeScript + Vite for a fast UI.
- **Backend:** Flask Python API to classify emails (with PDF support).
- **AI Model:** Uses Groq LLM API (such as Llama3 or similar large language models).
- **CORS enabled** for development.
- **Environment Variables:** Secrets and keys **never** live in versioned code.

---

## How to run

### 1. Backend

- Requirements: `python >= 3.8`
- Install dependencies:
  ```bash
  pip install -r backend/requirements.txt
  ```
- Copy `.env.sample` to `.env` in the backend folder and add your [Groq API Key](https://console.groq.com/keys):
  ```
  GROQ_API_KEY=your-groq-api-key
  PORT=5001
  ```
- Start backend:
  ```bash
  python backend/app.py
  ```

### 2. Frontend

- Requirements: `node >= 16`
- Install dependencies:
  ```bash
  cd frontend
  npm install
  ```
- Start dev server:
  ```bash
  npm run dev
  ```
- By default, the frontend expects the backend at `http://localhost:5001`.

---

## Deploy

- Edit production environment variables through your cloud provider (e.g., Vercel).
- **Never commit secrets in code or in config files!**
- For Vercel, set up the env vars in the dashboard.

---

## API

- **POST** `/classify`
  - Content-Type: JSON or multipart/form for files
  - Body (JSON): `{ "texto": "email content" }` or attach a PDF file
  - Response:
    ```json
    {
      "categoria": "Produtivo" | "Improdutivo",
      "confianca": 0.0..1.0,
      "motivo": "short explanation",
      "resposta": "auto-reply text",
      "stats": { ... }
    }
    ```

---