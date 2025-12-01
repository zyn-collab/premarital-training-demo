import { useState, useEffect } from 'react';
import { parseDuration } from '../../utils/localStorage';

export default function VideoSlide({ data, onNextEnabled }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check screen size
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (!isPlaying || timeRemaining <= 0) return;

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          setIsPlaying(false);
          setIsCompleted(true);
          onNextEnabled();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isPlaying, timeRemaining, onNextEnabled]);

  const handlePlay = () => {
    if (!isPlaying && !isCompleted) {
      // Use 10 seconds for demo instead of full video duration
      const duration = 10; // parseDuration(data.video.duration);
      setTimeRemaining(duration);
      setIsPlaying(true);
    } else if (isPlaying) {
      setIsPlaying(false);
    } else if (isCompleted) {
      setIsPlaying(true);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
        {data.title}
      </h2>

      {data.quote && (
        <p className="text-lg italic text-gray-600 mb-6 border-l-4 border-emerald-500 pl-4">
          "{data.quote}"
        </p>
      )}

      {/* Content sections */}
      {data.content && (
        <div className="mb-6 space-y-4">
          {data.content.poorCommunication && (
            <div>
              <h3 className="text-xl font-semibold mb-2 text-red-600">
                {data.content.poorCommunication.heading}
              </h3>
              <ul className="space-y-1 ml-6">
                {data.content.poorCommunication.items.map((item, i) => (
                  <li key={i} className="text-base text-gray-700">✗ {item}</li>
                ))}
              </ul>
            </div>
          )}
          {data.content.goodCommunication && (
            <div>
              <h3 className="text-xl font-semibold mb-2 text-emerald-600">
                {data.content.goodCommunication.heading}
              </h3>
              <ul className="space-y-1 ml-6">
                {data.content.goodCommunication.items.map((item, i) => (
                  <li key={i} className="text-base text-gray-700">✓ {item}</li>
                ))}
              </ul>
            </div>
          )}
          {data.content.heading && (
            <div>
              <h3 className="text-xl font-semibold mb-2">{data.content.heading}</h3>
              <ul className="space-y-1 ml-6">
                {data.content.reasons?.map((item, i) => (
                  <li key={i} className="text-base text-gray-700">• {item}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {data.intro && (
        <div className="mb-6">
          <p className="text-lg font-semibold mb-2">{data.intro.question}</p>
          <p className="text-base text-gray-700 italic">{data.intro.answer}</p>
        </div>
      )}

      {data.example && (
        <div className="mb-6 bg-amber-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">{data.example.title}</h3>
          {data.example.scenarios.map((scenario, i) => (
            <p key={i} className="text-base text-gray-700">• {scenario}</p>
          ))}
          <p className="text-base font-semibold text-emerald-600 mt-2">
            {data.example.conclusion}
          </p>
        </div>
      )}

      {/* Video Placeholder */}
      <div className="my-6 bg-gray-300 rounded-lg min-h-[300px] flex flex-col items-center justify-center p-8">
        <p className="text-xl font-bold text-gray-700 mb-4 text-center">
          {isMobile
            ? `📱 VERTICAL VIDEO PLACEHOLDER - ${data.video.duration}`
            : `🎥 HORIZONTAL VIDEO PLACEHOLDER - ${data.video.duration}`}
        </p>
        {timeRemaining > 0 && (
          <p className="text-lg text-gray-700 mb-4">
            Time remaining: {formatTime(timeRemaining)}
          </p>
        )}
        <button
          onClick={handlePlay}
          className="px-8 py-3 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700 transition-colors"
        >
          {isPlaying ? '⏸ Pause' : isCompleted ? '▶️ Replay' : '▶️ Play Video'}
        </button>
      </div>

      {data.footer && (
        <p className="text-center text-lg font-semibold text-emerald-600 mt-6">
          {data.footer}
        </p>
      )}
    </div>
  );
}
