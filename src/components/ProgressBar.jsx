export default function ProgressBar({ current, total, courseTitle, courseId, onBackToCourses }) {
  const percentage = Math.round((current / total) * 100);

  return (
    <div className="bg-peach sticky top-0 z-10" style={{boxShadow:'0 2px 8px rgba(0,0,0,0.08)'}}>
      <div className="max-w-4xl mx-auto px-4 py-3 md:py-4">
        {/* Top row: back link + course badge */}
        <div className="flex items-center justify-between mb-2">
          {onBackToCourses && (
            <button
              onClick={onBackToCourses}
              className="text-[#1B3F61] hover:text-[#142F4A] font-semibold text-sm flex items-center gap-1 transition-colors"
            >
              ← Back to Courses
            </button>
          )}
          {courseId && (
            <span className="text-xs font-semibold text-[#1B3F61] bg-white/60 px-3 py-1 rounded-full border border-[#1B3F61]/20">
              Course {courseId} of 6
            </span>
          )}
        </div>

        {/* Course title */}
        <h1 className="text-base md:text-lg font-bold text-[#1a1a1a] mb-2 leading-snug">
          {courseTitle}
        </h1>

        {/* Progress row */}
        <div className="flex items-center gap-3">
          <p className="text-xs text-[#555] whitespace-nowrap font-medium">
            {current} / {total}
          </p>
          <div className="flex-1">
            <div className="w-full bg-black/10 rounded-full h-2">
              <div
                className="bg-[#1B3F61] h-2 rounded-full transition-all duration-300"
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>
          <p className="text-xs text-[#555] font-semibold w-10 text-right">{percentage}%</p>
        </div>
      </div>
    </div>
  );
}
