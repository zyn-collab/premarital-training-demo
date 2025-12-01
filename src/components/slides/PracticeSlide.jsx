import { useState } from 'react';

export default function PracticeSlide({ data, onNextEnabled }) {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleAnswerChange = (exerciseNum, value) => {
    setAnswers((prev) => ({ ...prev, [exerciseNum]: value }));
  };

  const handleCheckAnswer = () => {
    setSubmitted(true);
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

      {data.instructions && (
        <p className="text-sm italic text-gray-500 mb-4">{data.instructions}</p>
      )}

      {data.helpText && (
        <div className="mb-6 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
          <p className="text-sm text-gray-700">{data.helpText}</p>
        </div>
      )}

      {/* Exercises */}
      <div className="space-y-6 mb-6">
        {data.exercises.map((exercise) => (
          <div key={exercise.number} className="border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-lg mb-3">
              Exercise {exercise.number}
            </h3>

            <div className="mb-3 p-3 bg-red-50 rounded border-l-4 border-red-500">
              <p className="text-base font-medium text-gray-800">
                {exercise.youStatement}
              </p>
            </div>

            <div className="mb-3 p-3 bg-gray-50 rounded">
              <p className="text-sm text-gray-700 italic">
                {exercise.template}
              </p>
            </div>

            <label className="block text-sm font-medium mb-2">
              Your "I" statement:
            </label>
            <textarea
              value={answers[exercise.number] || ''}
              onChange={(e) => handleAnswerChange(exercise.number, e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 min-h-[100px]"
              placeholder="Type your answer here..."
            />
          </div>
        ))}
      </div>

      {data.note && (
        <p className="text-sm italic text-gray-500 mb-4">{data.note}</p>
      )}

      <button
        onClick={handleCheckAnswer}
        disabled={submitted}
        className="w-full bg-emerald-600 text-white py-3 rounded-lg font-semibold hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {submitted ? '✓ Completed' : 'Check Answer'}
      </button>

      {submitted && (
        <div className="mt-4 p-4 bg-emerald-50 rounded-lg border-l-4 border-emerald-500">
          <p className="text-emerald-800">
            Great work! These exercises help you practice constructive communication.
          </p>
        </div>
      )}
    </div>
  );
}
