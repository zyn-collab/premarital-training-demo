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
      className="bg-white rounded-xl shadow-card hover:shadow-card-hv transition-all hover:-translate-y-0.5 cursor-pointer overflow-hidden border border-black/[0.06]"
      onClick={handleClick}
    >
      {/* Course Header */}
      <div className={`p-6 ${isCompleted ? 'bg-emerald-50' : isInProgress ? 'bg-[#F5EDE6]' : 'bg-cream'}`}>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-4xl">{icon}</span>
              <div>
                <h3 className="text-lg font-bold text-[#1a1a1a]">Course {id}</h3>
                <p className="text-sm text-[#666]">{duration}</p>
              </div>
            </div>
            <h2 className="text-xl font-bold text-[#1a1a1a] leading-snug">{title}</h2>
          </div>

          {/* Status Badge */}
          {isCompleted && (
            <span className="px-3 py-1 bg-emerald-600 text-white text-xs font-semibold rounded-full whitespace-nowrap">
              ✓ Completed
            </span>
          )}
          {isInProgress && (
            <span className="px-3 py-1 bg-[#E8926B] text-white text-xs font-semibold rounded-full whitespace-nowrap">
              In Progress
            </span>
          )}
          {isNotStarted && (
            <span className="px-3 py-1 bg-black/10 text-[#444] text-xs font-semibold rounded-full whitespace-nowrap">
              Not Started
            </span>
          )}
        </div>
      </div>

      {/* Course Content */}
      <div className="p-6">
        <p className="text-[#2e2e2e] leading-relaxed mb-4">{description}</p>

        {/* Topics */}
        <div className="mb-5">
          <p className="text-xs font-semibold text-[#1a1a1a] uppercase tracking-wide mb-2">Topics Covered</p>
          <ul className="space-y-1.5">
            {topics.slice(0, 3).map((topic, idx) => (
              <li key={idx} className="text-sm text-[#444] flex items-start gap-2">
                <span className="text-terracotta mt-0.5 flex-shrink-0">•</span>
                <span>{topic}</span>
              </li>
            ))}
            {topics.length > 3 && (
              <li className="text-sm text-[#666] italic">
                + {topics.length - 3} more topics
              </li>
            )}
          </ul>
        </div>

        {/* Progress Bar */}
        {isInProgress && (
          <div className="mb-5">
            <div className="flex justify-between text-sm text-[#555] mb-1.5">
              <span>Progress</span>
              <span>{progressPercent}%</span>
            </div>
            <div className="w-full bg-[#ede8e3] rounded-full h-2">
              <div
                className="bg-[#C44B34] h-2 rounded-full transition-all"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <p className="text-xs text-[#666] mt-1">
              Slide {progress.currentSlide} of {totalSlides}
            </p>
          </div>
        )}

        {/* Action Button */}
        <button
          className={`w-full py-3 px-4 rounded-lg font-semibold transition-colors text-white ${
            isCompleted
              ? 'bg-emerald-600 hover:bg-emerald-700'
              : isInProgress
              ? 'bg-emerald-600 hover:bg-emerald-700'
              : 'bg-navy hover:bg-navy-dark'
          }`}
        >
          {isCompleted ? 'Review Course' : isInProgress ? 'Continue' : 'Start Course'}
        </button>
      </div>
    </div>
  );
}
