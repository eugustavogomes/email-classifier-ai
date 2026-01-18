import re
import nltk

def lazy_load_stopwords():
    try:
        sw = nltk.corpus.stopwords.words("portuguese")
    except LookupError:
        nltk.download("stopwords")
        sw = nltk.corpus.stopwords.words("portuguese")
    return set(sw)

from nltk.stem import PorterStemmer

_stopwords_pt = lazy_load_stopwords()
_stemmer = PorterStemmer()

def preprocess_text(text):
    text = re.sub(r"[^\w\s]", " ", text)
    words = text.lower().split()  
    filtered = [_stemmer.stem(w) for w in words if w not in _stopwords_pt]
    return " ".join(filtered)