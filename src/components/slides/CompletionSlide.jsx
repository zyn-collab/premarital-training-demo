export default function CompletionSlide({ data }) {
  return (
    <div className="bg-gradient-to-br from-emerald-50 to-white rounded-lg shadow-lg p-8 md:p-12 text-center">
      <div className="mb-6">
        <div className="inline-block p-4 bg-emerald-100 rounded-full mb-4">
          <svg className="w-16 h-16 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
      </div>

      <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
        {data.title}
      </h1>

      <p className="text-lg text-gray-600 mb-2">{data.subtitle}</p>
      <h2 className="text-2xl md:text-3xl font-bold text-emerald-600 mb-8">
        {data.courseTitle}
      </h2>

      <div className="max-w-2xl mx-auto mb-8">
        {data.learned && (
          <div className="mb-6 bg-white rounded-lg p-6 shadow-sm text-left">
            <h3 className="text-xl font-semibold mb-3 text-gray-800">
              {data.learned.heading}
            </h3>
            <ul className="space-y-2">
              {data.learned.items.map((item, i) => (
                <li key={i} className="text-base text-gray-700 flex items-start gap-2">
                  <span className="text-emerald-600 mt-1">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {data.created && (
          <div className="mb-6 bg-white rounded-lg p-6 shadow-sm text-left">
            <h3 className="text-xl font-semibold mb-3 text-gray-800">
              {data.created.heading}
            </h3>
            <ul className="space-y-2">
              {data.created.items.map((item, i) => (
                <li key={i} className="text-base text-gray-700 flex items-start gap-2">
                  <span className="text-emerald-600 mt-1">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {data.progress && (
        <div className="mb-6">
          <div className="inline-block bg-emerald-600 text-white px-6 py-3 rounded-full font-semibold">
            {data.progress}
          </div>
        </div>
      )}

      <p className="text-gray-600 italic">
        Use the "Restart Course" button below to start over, or the Previous button to review content.
      </p>
    </div>
  );
}
