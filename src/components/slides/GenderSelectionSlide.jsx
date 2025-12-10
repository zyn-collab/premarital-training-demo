import { useState, useEffect } from 'react';

export default function GenderSelectionSlide({ data, onNextEnabled }) {
  const [selectedGender, setSelectedGender] = useState(() => {
    return localStorage.getItem('course_3_gender') || null;
  });

  useEffect(() => {
    // If already selected, enable next immediately
    if (selectedGender) {
      onNextEnabled();
    }
  }, [selectedGender, onNextEnabled]);

  const handleGenderSelect = (gender) => {
    setSelectedGender(gender);
    localStorage.setItem('course_3_gender', gender);
    onNextEnabled();
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 text-center">
        {data.title}
      </h2>

      {data.subtitle && (
        <p className="text-lg text-gray-600 mb-8 text-center">{data.subtitle}</p>
      )}

      {data.explanation && (
        <div className="mb-8 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
          <p className="text-base text-gray-700">{data.explanation}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <button
          onClick={() => handleGenderSelect('male')}
          className={`p-8 rounded-lg border-2 transition-all ${
            selectedGender === 'male'
              ? 'border-emerald-600 bg-emerald-50'
              : 'border-gray-300 bg-white hover:border-emerald-400'
          }`}
        >
          <div className="text-6xl mb-4">👨</div>
          <div className="text-xl font-semibold text-gray-800">Male Track</div>
          {selectedGender === 'male' && (
            <div className="mt-2 text-emerald-600 font-medium">✓ Selected</div>
          )}
        </button>

        <button
          onClick={() => handleGenderSelect('female')}
          className={`p-8 rounded-lg border-2 transition-all ${
            selectedGender === 'female'
              ? 'border-emerald-600 bg-emerald-50'
              : 'border-gray-300 bg-white hover:border-emerald-400'
          }`}
        >
          <div className="text-6xl mb-4">👩</div>
          <div className="text-xl font-semibold text-gray-800">Female Track</div>
          {selectedGender === 'female' && (
            <div className="mt-2 text-emerald-600 font-medium">✓ Selected</div>
          )}
        </button>
      </div>

      {data.note && (
        <p className="text-sm italic text-gray-500 text-center">{data.note}</p>
      )}

      {selectedGender && (
        <div className="mt-6 p-4 bg-emerald-50 rounded-lg border-l-4 border-emerald-500">
          <p className="text-emerald-800">
            You've selected the <span className="font-semibold">{selectedGender}</span> track.
            Click Next to continue.
          </p>
        </div>
      )}
    </div>
  );
}
