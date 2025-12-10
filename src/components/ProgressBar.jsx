export default function ProgressBar({ current, total, courseTitle, courseId, onBackToCourses }) {
  const percentage = Math.round((current / total) * 100);

  return (
    <div className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
      <div className="max-w-4xl mx-auto px-4 py-4">
        {/* Header with back button and course number */}
        <div className="flex items-center justify-between mb-2">
          {onBackToCourses && (
            <button
              onClick={onBackToCourses}
              className="text-emerald-600 hover:text-emerald-700 font-medium text-sm flex items-center gap-1"
            >
              ← Back to Courses
            </button>
          )}
          {courseId && (
            <span className="text-sm font-semibold text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
              Course {courseId}/6
            </span>
          )}
        </div>

        <h1 className="text-lg md:text-xl font-semibold text-gray-800 mb-2">
          {courseTitle}
        </h1>
        <div className="flex items-center gap-4">
          <p className="text-sm text-gray-600 whitespace-nowrap">
            Slide {current} of {total}
          </p>
          <div className="flex-1">
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-emerald-600 h-2.5 rounded-full transition-all duration-300"
                style={{ width: `${percentage}%` }}
              ></div>
            </div>
          </div>
          <p className="text-sm text-gray-600 font-medium">{percentage}%</p>
        </div>
      </div>
    </div>
  );
}
