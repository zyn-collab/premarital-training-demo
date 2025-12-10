import { useNavigate } from 'react-router-dom';

export default function CourseCard({ course, progress }) {
  const navigate = useNavigate();

  const { id, title, shortTitle, duration, totalSlides, description, icon, topics } = course;

  // Calculate progress percentage
  const progressPercent = progress?.currentSlide
    ? Math.round((progress.currentSlide / totalSlides) * 100)
    : 0;

  const isCompleted = progress?.completed || false;
  const isInProgress = progress?.currentSlide > 1 && !isCompleted;
  const isNotStarted = !progress?.currentSlide || progress.currentSlide === 1;

  const handleClick = () => {
    navigate(`/course/${id}`);
  };

  return (
    <div
      className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow cursor-pointer overflow-hidden"
      onClick={handleClick}
    >
      {/* Course Header */}
      <div className={`p-6 ${isCompleted ? 'bg-emerald-50' : isInProgress ? 'bg-blue-50' : 'bg-gray-50'}`}>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-4xl">{icon}</span>
              <div>
                <h3 className="text-xl font-bold text-gray-800">Course {id}</h3>
                <p className="text-sm text-gray-600">{duration}</p>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>
          </div>

          {/* Status Badge */}
          {isCompleted && (
            <span className="px-3 py-1 bg-emerald-600 text-white text-sm font-semibold rounded-full">
              ✓ Completed
            </span>
          )}
          {isInProgress && (
            <span className="px-3 py-1 bg-blue-600 text-white text-sm font-semibold rounded-full">
              In Progress
            </span>
          )}
          {isNotStarted && (
            <span className="px-3 py-1 bg-gray-300 text-gray-700 text-sm font-semibold rounded-full">
              Not Started
            </span>
          )}
        </div>
      </div>

      {/* Course Content */}
      <div className="p-6">
        <p className="text-gray-700 mb-4">{description}</p>

        {/* Topics */}
        <div className="mb-4">
          <p className="text-sm font-semibold text-gray-600 mb-2">Topics Covered:</p>
          <ul className="space-y-1">
            {topics.slice(0, 3).map((topic, idx) => (
              <li key={idx} className="text-sm text-gray-600 flex items-start">
                <span className="mr-2">•</span>
                <span>{topic}</span>
              </li>
            ))}
            {topics.length > 3 && (
              <li className="text-sm text-gray-500 italic">
                + {topics.length - 3} more topics
              </li>
            )}
          </ul>
        </div>

        {/* Progress Bar */}
        {isInProgress && (
          <div className="mb-4">
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <span>Progress</span>
              <span>{progressPercent}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Slide {progress.currentSlide} of {totalSlides}
            </p>
          </div>
        )}

        {/* Action Button */}
        <button
          className={`w-full py-3 px-4 rounded-lg font-semibold transition-colors ${
            isCompleted
              ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
              : isInProgress
              ? 'bg-blue-600 hover:bg-blue-700 text-white'
              : 'bg-gray-800 hover:bg-gray-900 text-white'
          }`}
        >
          {isCompleted ? 'Review Course' : isInProgress ? 'Continue' : 'Start Course'}
        </button>
      </div>
    </div>
  );
}
