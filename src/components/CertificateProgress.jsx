export default function CertificateProgress({ completedCount, totalCourses = 6 }) {
  const progressPercent = Math.round((completedCount / totalCourses) * 100);
  const isComplete = completedCount === totalCourses;

  return (
    <div className={`rounded-lg p-6 mb-8 ${isComplete ? 'bg-emerald-600' : 'bg-gradient-to-r from-blue-600 to-indigo-600'}`}>
      <div className="text-white">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold mb-1">
              {isComplete ? '🎓 Certificate Complete!' : 'Marriage Preparation Certificate'}
            </h2>
            <p className="text-white/90">
              {isComplete
                ? 'Congratulations! You have completed all required courses.'
                : 'Complete all 6 courses to receive your certificate'}
            </p>
          </div>
          <div className="text-right">
            <div className="text-5xl font-bold">{completedCount}/{totalCourses}</div>
            <div className="text-sm text-white/80">Courses Complete</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="bg-white/20 rounded-full h-3 mb-3">
          <div
            className="bg-white rounded-full h-3 transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Progress Text */}
        <div className="flex justify-between text-sm text-white/90">
          <span>{progressPercent}% Complete</span>
          {!isComplete && (
            <span>{totalCourses - completedCount} courses remaining</span>
          )}
        </div>

        {/* Certificate Message */}
        {isComplete && (
          <div className="mt-4 p-4 bg-white/10 rounded-lg border border-white/20">
            <p className="text-sm">
              📋 <strong>Next Step:</strong> A Ghaazee (marriage officer) will verify your completion and sign your certificate for submission to Family Court.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
