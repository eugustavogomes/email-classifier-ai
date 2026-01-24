# Email Classifier AI
> Classifica automaticamente emails de texto ou PDF como “Produtivo” ou “Improdutivo” usando IA Groq LLM. Interface web em React + Vite, backend Flask robusto para seu setor financeiro.

<div align="center">
  <img src="./assets/ProjectImage.png" alt="Email Classifier Image" width="600"/>
</div>


---

## Features

- **Classificação via IA:** Utiliza Groq LLM (ex: Llama 3).
- **Frontend:** React + TypeScript + Vite, experiência rápida.
- **Backend:** Python Flask REST API com suporte a PDFs.
- **CORS** habilitado.
- **Secrets e keys** sempre por variável de ambiente.

---

## Architecture

```
React (Vercel)  <--REST-->  Flask API (Render)  <--API-->  Groq LLM
```

---

## Getting Started

### Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cp .env.sample .env  # Adicione sua GROQ_API_KEY!
python app.py
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```
O frontend espera a API em `http://localhost:5001/classify` em dev.

---

## Deploy

### Backend (Render)
- ‘Root Directory’: `backend`
- Start Command: `gunicorn app:app`
- Configure env: `GROQ_API_KEY`
- URL: `https://<nome>.onrender.com/classify`

### Frontend (Vercel)
- Deploy da pasta `frontend`
- Adicione (se quiser):
    ```
    VITE_API_URL=https://<nome>.onrender.com/classify
    ```

---

## API

**POST** `/classify`

- **Body (JSON):**
    ```json
    { "texto": "email content" }
    ```
- **Body (Form):** arquivo PDF com field `"file"`
- **Response:**
    ```json
    {
      "categoria": "Produtivo",
      "confianca": 0.92,
      "motivo": "Texto indica solicitação de informações",
      "resposta": "Recebemos sua solicitação...",
      "stats": {
        "total_palavras": 12,
        "palavras_relevantes": 9,
        "idioma": "pt"
      }
    }
    ```

---

## CLI Example

```bash
curl -X POST https://<backend-url>.onrender.com/classify \
  -H "Content-Type: application/json" \
  -d '{"texto": "Preciso de informações sobre boleto."}'
```

---

## Troubleshooting

- **401 Unauthorized:** Verifique a `GROQ_API_KEY` e redeploy o backend.
- **CORS?** Verifique se o backend possui `flask_cors` e restart o serviço.
- **Frontend Not Working:** Confira se a API_URL está correta!