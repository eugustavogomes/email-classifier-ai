import os
from dotenv import load_dotenv
from flask import Flask, request, jsonify
from flask_cors import CORS
import pdfplumber

load_dotenv()

GROQ_API_KEY = os.getenv('GROQ_API_KEY')
PORT = int(os.getenv('PORT', 5001))
LABELS = ["Produtivo", "Improdutivo"]

from groq import Groq

groq_client = None
if GROQ_API_KEY:
    groq_client = Groq(api_key=GROQ_API_KEY)

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)

def extract_text_from_pdf(file_stream):
    with pdfplumber.open(file_stream) as pdf:
        return "".join([page.extract_text() or "" for page in pdf.pages])

def classify_with_groq(texto):
    if not groq_client:
        raise Exception("GROQ_API_KEY não configurada! Preencha no .env")
    prompt = f"""Você é um assistente especializado em classificar emails corporativos do setor financeiro.

Analise o email abaixo e classifique em uma das categorias:
- Produtivo: Emails que requerem ação (solicitações, dúvidas técnicas, atualizações de casos, suporte)
- Improdutivo: Emails sem necessidade de ação imediata (felicitações, agradecimentos, mensagens casuais)

Email:
{texto}

Responda apenas em JSON, exatamente neste formato:
{{
  "categoria": "Produtivo" ou "Improdutivo",
  "confianca": 0.0 a 1.0,
  "motivo": "breve explicação"
}}
"""
    try:
        response = groq_client.chat.completions.create(
            model="llama-3.1-8b-instant",
            messages=[{"role": "user", "content": prompt}],
            temperature=0.3,
            max_tokens=200
        )
        resposta_texto = response.choices[0].message.content.strip()
        import re, json
        json_match = re.search(r'\{.*\}', resposta_texto, re.DOTALL)
        if json_match:
            resultado = json.loads(json_match.group())
        else:
            if "produtivo" in resposta_texto.lower():
                resultado = {"categoria": "Produtivo", "confianca": 0.8, "motivo": "Baseado em palavras-chave"}
            else:
                resultado = {"categoria": "Improdutivo", "confianca": 0.8, "motivo": "Baseado em palavras-chave"}
        return resultado
    except Exception as e:
        raise

def generate_response(categoria):
    if categoria == "Produtivo":
        return "Recebemos sua solicitação. Ela será analisada e responderemos em breve. Caso precise de informações adicionais, estamos à disposição."
    return "Agradecemos sua mensagem! Se precisar de suporte, abra uma nova solicitação."

@app.route("/")
def home():
    return jsonify({
        "status": "online",
        "message": "API Classificação Emails",
        "version": "Groq"
    })

@app.route("/ping")
def ping():
    return jsonify({"message": "pong"}), 200

@app.route("/health")
def health():
    return jsonify({"status": "healthy"}), 200

@app.route("/classify", methods=["POST", "OPTIONS"])
def classify():
    if request.method == "OPTIONS":
        return jsonify({"status": "ok"}), 200
    texto_email = ""
    try:
        if request.is_json and "texto" in request.json:
            texto_email = request.json["texto"]
        elif "file" in request.files:
            file = request.files["file"]
            if file.filename.lower().endswith(".pdf"):
                texto_email = extract_text_from_pdf(file)
            else:
                texto_email = file.read().decode("utf-8", errors="ignore")
        elif "texto" in request.form:
            texto_email = request.form["texto"]
        if not texto_email or not texto_email.strip():
            return jsonify({"erro": "Nenhum texto fornecido."}), 400
        resultado_classificacao = classify_with_groq(texto_email)
        categoria = resultado_classificacao.get('categoria', '')
        confianca = resultado_classificacao.get('confianca', None)
        motivo = resultado_classificacao.get('motivo', '')
        resposta = generate_response(categoria)
        return jsonify({
            "categoria": categoria,
            "confianca": confianca,
            "motivo": motivo,
            "resposta": resposta,
            "stats": {
                "total_palavras": len(texto_email.split()),
                "palavras_relevantes": len([w for w in texto_email.split() if len(w) > 3]),
                "idioma": "pt"
            }
        }), 200
    except Exception as e:
        return jsonify({
            "erro": f"Erro: {str(e)}",
            "categoria": "",
            "resposta": ""
        }), 500

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=PORT)
