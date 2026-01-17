type ButtonsProps = {
  loading: boolean;
  canSubmit: boolean;
  onClear: () => void;
  hasInput: boolean;
};

export default function Buttons({
  loading,
  canSubmit,
  onClear,
  hasInput,
}: ButtonsProps) {
  return (
    <div className="flex gap-3">
      <button
        type="submit"
        disabled={loading || !canSubmit}
        className="btn-primary flex-1 flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Analysing with AI...
          </>
        ) : (
          <>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Classify with AI
          </>
        )}
      </button>
      {hasInput && (
        <button
          type="button"
          onClick={onClear}
          className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-lg transition-all duration-300"
        >
          Clear
        </button>
      )}
    </div>
  );
}