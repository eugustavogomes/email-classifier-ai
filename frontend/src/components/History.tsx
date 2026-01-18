import type { HistoryItem } from "../types";

type Props = {
  history: HistoryItem[];
  show: boolean;
  setShow: (show: boolean) => void;
};

export default function History({ history, show, setShow }: Props) {
  if (!history.length) return null;
  return (
    <div className="mt-6">
      <button
        onClick={() => setShow(!show)}
        className="w-full flex items-center justify-between p-4 bg-white rounded-lg shadow hover:shadow-md transition-all duration-300"
      >
        <span className="font-semibold text-gray-700">📊 Histórico de Análises ({history.length})</span>
        <svg
          className={`w-5 h-5 text-gray-500 transform transition-transform ${show ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {show && (
        <div className="mt-4 space-y-3 animate-slide-up">
          {history.map((item) => (
            <div key={item.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-2">
                <span className={item.categoria === "Produtivo" ? "badge-success" : "badge-warning"}>
                  {item.categoria}
                </span>
                <span className="text-xs text-gray-500">{item.timestamp}</span>
              </div>
              <p className="text-sm text-gray-600 line-clamp-2">{item.originalText}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}