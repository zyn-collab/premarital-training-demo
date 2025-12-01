import { useEffect } from 'react';

export default function TransitionSlide({ data, onNextEnabled }) {
  useEffect(() => {
    // Start 4-second timer for demo (same as content slides)
    const timer = setTimeout(() => {
      onNextEnabled();
    }, 4000);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center">
        {data.title}
      </h2>

      {data.intro && (
        <p className="text-lg text-gray-700 mb-6 whitespace-pre-line">
          {data.intro}
        </p>
      )}

      {data.howItWorks && (
        <div className="mb-6 bg-emerald-50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-4 text-emerald-700">
            {data.howItWorks.heading}
          </h3>
          <ol className="space-y-2">
            {data.howItWorks.steps.map((step, i) => (
              <li key={i} className="text-base text-gray-700 flex gap-3">
                <span className="font-bold text-emerald-600 min-w-[24px]">
                  {i + 1}.
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </div>
      )}

      {data.footer && (
        <p className="text-center text-lg font-semibold text-emerald-600 mt-6">
          {data.footer}
        </p>
      )}
    </div>
  );
}
