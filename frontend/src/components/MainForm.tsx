import type { ChangeEvent, FormEvent } from "react";
import Buttons from "./Buttons";

type MainFormProps = {
  text: string;
  file: File | null;
  loading: boolean;
  onTextChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: FormEvent) => void;
  onClear: () => void;
};

export default function MainForm({
  text,
  file,
  loading,
  onTextChange,
  onFileChange,
  onSubmit,
  onClear,
}: MainFormProps) {
  return (
    <div className="card animate-slide-up mb-6">
      <form onSubmit={onSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            📝 Cole o texto do email
          </label>
          <textarea
            rows={6}
            value={text}
            onChange={onTextChange}
            disabled={!!file || loading}
            placeholder="Cole aqui o conteúdo do email para análise automática..."
            className="input-field resize-none"
          />
        </div>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-white text-gray-500 font-medium">OR</span>
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            📎 Faça upload de um arquivo
          </label>
          <div className="relative">
            <input
              type="file"
              accept=".txt,.pdf"
              onChange={onFileChange}
              disabled={!!text || loading}
              className="input-field file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 file:cursor-pointer"
            />
          </div>
          {file && (
            <p className="mt-2 text-sm text-green-600 flex items-center">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Arquivo selecionado: {file.name}
            </p>
          )}
        </div>
        <Buttons
          loading={loading}
          canSubmit={!!text || !!file}
          onClear={onClear}
          hasInput={!!text || !!file}
        />
      </form>
    </div>
  );
}