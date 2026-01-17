import type { ApiResult } from "../types";

export default function Result({ result }: { result: ApiResult }) {
  if (result.erro)
    return (
      <div className="card animate-slide-up flex items-start gap-3 text-red-600">
        <svg className="w-6 h-6 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
        </svg>
        <div>
          <h3 className="font-semibold mb-1">Processing error</h3>
          <p>{result.erro}</p>
        </div>
      </div>
    );

  return (
    <div className="card animate-slide-up space-y-4">
      <div>
        <h3 className="text-sm font-semibold text-gray-600 mb-2">CLASSIFICATION</h3>
        <div className="flex items-center gap-3">
          <span className={result.categoria === "Produtivo" ? "badge-success text-lg" : "badge-warning text-lg"}>
            {result.categoria === "Produtivo" ? "✓ Productive" : "⊘ Non-Productive"}
          </span>
          {result.confianca && (
            <span className="text-sm text-gray-500">
              Confidence: {(result.confianca * 100).toFixed(0)}%
            </span>
          )}
        </div>
        {result.motivo && (
          <p className="text-sm text-gray-600 mt-2 italic">{result.motivo}</p>
        )}
      </div>
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
        <h3 className="text-sm font-semibold text-blue-900 mb-2">💬 SUGGESTED REPLY</h3>
        <p className="text-gray-800 leading-relaxed">{result.resposta}</p>
      </div>
      {result.stats && (
        <div className="grid grid-cols-3 gap-4 pt-4 border-t">
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">{result.stats.total_palavras}</p>
            <p className="text-xs text-gray-600">Words</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">{result.stats.palavras_relevantes}</p>
            <p className="text-xs text-gray-600">Relevant</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-purple-600">{result.stats.idioma.toUpperCase()}</p>
            <p className="text-xs text-gray-600">Language</p>
          </div>
        </div>
      )}
    </div>
  );
}