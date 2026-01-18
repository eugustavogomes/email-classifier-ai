import os
import pdfplumber
from groq import Groq

GROQ_API_KEY = os.getenv("GROQ_API_KEY")
groq_client = Groq(api_key=GROQ_API_KEY) if GROQ_API_KEY else None

def extract_text_from_pdf(file_stream):
    with pdfplumber.open(file_stream) as pdf:
        return "".join(page.extract_text() or "" for page in pdf.pages)

def classify_with_groq(texto):
    if not groq_client:
        raise ValueError("GROQ_API_KEY não configurada! Preencha no painel/env.")

    prompt = f"""
    Você é um assistente especializado em classificar emails corporativos do setor financeiro.

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

    response = groq_client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.3,
        max_tokens=200
    )
    resposta_texto = response.choices[0].message.content.strip()
    import json, re
    json_match = re.search(r'\{.*\}', resposta_texto, re.DOTALL)
    if json_match:
        return json.loads(json_match.group())
    if "produtivo" in resposta_texto.lower():
        return {"categoria": "Produtivo", "confianca": 0.8, "motivo": "Baseado em palavras-chave"}
    return {"categoria": "Improdutivo", "confianca": 0.8, "motivo": "Baseado em palavras-chave"}