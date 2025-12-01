import { useEffect } from 'react';

export default function TitleSlide({ data, onNextEnabled }) {
  useEffect(() => {
    // Enable next button immediately for title slides
    onNextEnabled();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 md:p-12 text-center min-h-[400px] flex flex-col justify-center">
      <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
        {data.title}
      </h1>
      <h2 className="text-2xl md:text-3xl font-semibold text-emerald-600 mb-6">
        {data.subtitle}
      </h2>
      <p className="text-lg md:text-xl text-gray-600 italic">
        {data.tagline}
      </p>
    </div>
  );
}
