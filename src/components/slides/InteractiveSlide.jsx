import { useState, useEffect } from 'react';

export default function InteractiveSlide({ data, onNextEnabled }) {
  const [inputs, setInputs] = useState({});
  const [completed, setCompleted] = useState(false);

  // Enable next button on mount for demo
  useEffect(() => {
    const timer = setTimeout(() => {
      onNextEnabled();
    }, 2000);
    return () => clearTimeout(timer);
  }, [onNextEnabled]);

  const handleInputChange = (key, value) => {
    setInputs((prev) => ({ ...prev, [key]: value }));
  };

  const handleComplete = () => {
    setCompleted(true);
    onNextEnabled();
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
        {data.title}
      </h2>

      {data.subtitle && (
        <p className="text-lg text-gray-600 mb-6">{data.subtitle}</p>
      )}

      {data.introduction && (
        <p className="text-base text-gray-700 mb-6">{data.introduction}</p>
      )}

      {/* Steps */}
      {data.steps && (
        <div className="mb-6 space-y-4">
          {data.steps.map((step, idx) => (
            <div key={idx} className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-lg mb-2">
                Step {step.stepNumber}: {step.stepTitle}
              </h3>
              {step.description && (
                <p className="text-gray-600 mb-3">{step.description}</p>
              )}
              {step.items && (
                <ul className="space-y-1 ml-4">
                  {step.items.map((item, i) => (
                    <li key={i} className="text-gray-700">• {item}</li>
                  ))}
                </ul>
              )}
              {step.fields && step.fields.map((field, i) => (
                <div key={i} className="mt-3">
                  <label className="block text-sm font-medium mb-1">
                    {field.label}
                  </label>
                  <input
                    type={field.type || 'text'}
                    value={inputs[field.name] || ''}
                    onChange={(e) => handleInputChange(field.name, e.target.value)}
                    placeholder={field.placeholder}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      )}

      {/* Tips/Notes */}
      {data.tips && (
        <div className="mb-6 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
          <h3 className="font-semibold mb-2">{data.tips.heading}</h3>
          <ul className="space-y-1 ml-4">
            {data.tips.items.map((tip, i) => (
              <li key={i} className="text-sm text-gray-700">• {tip}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Examples */}
      {data.examples && (
        <div className="mb-6">
          <h3 className="font-semibold mb-3">{data.examples.heading}</h3>
          {data.examples.scenarios && data.examples.scenarios.map((scenario, idx) => (
            <div key={idx} className="mb-3 p-3 bg-gray-50 rounded">
              <p className="font-medium text-gray-800">{scenario.title}</p>
              {scenario.details && scenario.details.map((detail, i) => (
                <p key={i} className="text-sm text-gray-600 ml-4">• {detail}</p>
              ))}
            </div>
          ))}
        </div>
      )}

      {data.closing && (
        <p className="text-center text-lg font-semibold text-emerald-600 mb-6">
          {data.closing}
        </p>
      )}

      <button
        onClick={handleComplete}
        disabled={completed}
        className="w-full bg-emerald-600 text-white py-3 rounded-lg font-semibold hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {completed ? '✓ Completed' : 'Complete Activity'}
      </button>

      {completed && (
        <div className="mt-4 p-4 bg-emerald-50 rounded-lg border-l-4 border-emerald-500">
          <p className="text-emerald-800">
            Great! This interactive activity helps you plan together.
          </p>
        </div>
      )}
    </div>
  );
}
