import { useEffect } from 'react';

export default function ContentSlide({ data, onNextEnabled }) {
  useEffect(() => {
    // Start 4-second timer for demo
    const timer = setTimeout(() => {
      onNextEnabled();
    }, 4000);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
        {data.title}
      </h2>

      {/* Render sections if present */}
      {data.sections && data.sections.map((section, idx) => (
        <div key={idx} className="mb-6">
          <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
            {section.symbol && <span className="text-2xl">{section.symbol}</span>}
            {section.heading}
          </h3>
          <ul className="space-y-2 ml-8">
            {section.items.map((item, i) => (
              <li key={i} className="text-base md:text-lg text-gray-700">
                {section.symbol} {item}
              </li>
            ))}
          </ul>
        </div>
      ))}

      {/* Render steps if present (slide 4) */}
      {data.steps && data.steps.map((step, idx) => (
        <div key={idx} className="mb-6">
          <h3 className="text-lg font-semibold mb-2">
            {step.number}. {step.title}
          </h3>
          <ul className="space-y-1 ml-6">
            {step.items.map((item, i) => (
              <li key={i} className="text-base text-gray-700">• {item}</li>
            ))}
          </ul>
        </div>
      ))}

      {/* Warning signs (slide 6) */}
      {data.warningSignsHeading && (
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-3 text-amber-600">
            {data.warningSignsHeading}
          </h3>
          <ul className="space-y-2 ml-6">
            {data.warningSigns.map((sign, i) => (
              <li key={i} className="text-base text-gray-700">• {sign}</li>
            ))}
          </ul>
        </div>
      )}

      {/* PAUSE technique (slide 6) */}
      {data.techniqueTitle && (
        <div className="mb-6 bg-emerald-50 p-4 rounded-lg border-l-4 border-emerald-500">
          <h3 className="text-xl font-bold mb-3 text-emerald-700">
            {data.techniqueTitle}
          </h3>
          <div className="space-y-2">
            {data.technique.map((item, i) => (
              <div key={i} className="flex gap-3">
                <span className="text-xl font-bold text-emerald-600 min-w-[24px]">
                  {item.letter}
                </span>
                <span className="text-base text-gray-700">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Footer or formula */}
      {data.footer && (
        <p className="mt-6 text-center text-lg font-semibold text-emerald-600">
          {data.footer}
        </p>
      )}
      {data.formula && (
        <p className="mt-6 p-4 bg-emerald-50 rounded border-l-4 border-emerald-500 italic text-base">
          {data.formula}
        </p>
      )}
    </div>
  );
}
