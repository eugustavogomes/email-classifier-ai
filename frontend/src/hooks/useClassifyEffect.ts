import { useState } from "react";
import type { ApiResult } from "../types";
import { classifyEmail } from "../api/classify";
import { useHistory } from "./useHistory";

export function useClassifyEffect() {
  const [result, setResult] = useState<ApiResult | null>(null);
  const [loading, setLoading] = useState(false);
  const { history, addHistory } = useHistory();

  const classify = async (text: string, file: File | null) => {
    setResult(null);
    setLoading(true);
    try {
      const data = await classifyEmail(text, file);
      setResult(data);
      addHistory(data, text, file);
    } catch {
      setResult({
        categoria: "",
        resposta: "",
        erro: "API connection error. Check if backend is running.",
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    result,
    setResult,
    loading,
    classify,
    history,
  };
}