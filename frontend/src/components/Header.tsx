export default function Header() {
  return (
    <div className="text-center mb-8 animate-fade-in">
      <div className="inline-block p-3 bg-blue-100 rounded-full mb-4">
        <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      </div>
      <h1 className="text-4xl font-bold text-gray-800 mb-2">
        Smart Email Classifier
      </h1>
      <p className="text-gray-600 text-lg">
        Automatic AI analysis • Save time • Suggested replies
      </p>
    </div>
  );
}