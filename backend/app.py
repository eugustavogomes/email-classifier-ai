import os
from dotenv import load_dotenv
from flask import Flask, request, jsonify
from flask_cors import CORS

from service.nlp_preprocessing import preprocess_text
from service.groq_classifier import extract_text_from_pdf, classify_with_groq

load_dotenv()
PORT = int(os.environ.get("PORT", 5001))

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)

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

    texto_digitado = ""
    texto_arquivo = ""

    try:
        if request.is_json and "texto" in request.json:
            texto_digitado = request.json["texto"]
        elif "texto" in request.form:
            texto_digitado = request.form["texto"]

        if "file" in request.files:
            file = request.files["file"]
            if file.filename.lower().endswith(".pdf"):
                texto_arquivo = extract_text_from_pdf(file)
            else:
                texto_arquivo = file.read().decode("utf-8", errors="ignore")

        if texto_digitado and texto_arquivo:
            texto_email = f"{texto_digitado}\n---\n{texto_arquivo}"
        elif texto_digitado:
            texto_email = texto_digitado
        elif texto_arquivo:
            texto_email = texto_arquivo
        else:
            return jsonify({"erro": "Nenhum texto fornecido."}), 400

        texto_email_preprocessado = preprocess_text(texto_email)

        resultado = classify_with_groq(texto_email_preprocessado)
        categoria = resultado.get('categoria', '')
        confianca = resultado.get('confianca')
        motivo = resultado.get('motivo', '')

        from service.groq_classifier import generate_contextual_reply
        resposta = generate_contextual_reply(texto_email, categoria)

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
        print("Erro interno no backend:", e)
        return jsonify({
            "erro": f"Erro: {str(e)}",
            "categoria": "",
            "resposta": ""
        }), 500

if __name__ == "__main__":
    app.run(debug=False, host='0.0.0.0', port=PORT)