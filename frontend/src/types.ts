export type ApiResult = {
  categoria: string;
  resposta: string;
  confianca?: number;
  motivo?: string;
  stats?: {
    total_palavras: number;
    palavras_relevantes: number;
    idioma: string;
  };
  erro?: string;
};

export type HistoryItem = ApiResult & {
  id: number;
  timestamp: string;
  originalText: string;
};