import { useState } from "react";
import type { HistoryItem, ApiResult } from "../types";

export function useHistory() {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const addHistory = (
    data: ApiResult,
    originalText: string,
    file?: File | null
  ) => {
    if (data.erro) return;
    const item: HistoryItem = {
      ...data,
      id: Date.now(),
      timestamp: new Date().toLocaleString("pt-BR"),
      originalText: originalText || (file?.name || ""),
    };
    setHistory((prev) => [item, ...prev].slice(0, 10));
  };
  return { history, addHistory };
}