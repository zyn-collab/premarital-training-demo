import { useEffect } from 'react';
import { getCheckpointAnswer } from '../../utils/localStorage';

export default function SummarySlide({ data, onNextEnabled }) {
  useEffect(() => {
    // Enable next button immediately
    onNextEnabled();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDownload = () => {
    alert('Download feature coming in full version');
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 text-center">
        {data.title}
      </h2>

      {data.subtitle && (
        <p className="text-lg text-gray-600 mb-6 text-center">{data.subtitle}</p>
      )}

      <div className="bg-emerald-50 rounded-lg p-6 mb-6">
        <h3 className="text-xl font-semibold mb-4 text-emerald-700">
          Your Agreed Decisions:
        </h3>

        <div className="space-y-3">
          {data.decisionsToShow.map((decision) => {
            const answer = getCheckpointAnswer(decision.number);
            return (
              <div key={decision.number} className="border-b border-emerald-200 pb-3 last:border-b-0">
                <p className="text-sm font-semibold text-gray-600">
                  {decision.number}. {decision.label}
                </p>
                <p className="text-base text-gray-800 mt-1">
                  {answer || <span className="text-gray-400 italic">Not answered</span>}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {data.footer && (
        <div className="text-center space-y-4">
          <p className="text-gray-700">{data.footer.text1}</p>
          <p className="text-gray-700">{data.footer.text2}</p>

          <button
            onClick={handleDownload}
            className="bg-emerald-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors"
          >
            {data.footer.buttonText}
          </button>

          <p className="text-sm text-gray-500 italic">{data.footer.note}</p>
        </div>
      )}
    </div>
  );
}
