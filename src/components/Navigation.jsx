export default function Navigation({
  onPrevious,
  onNext,
  isPreviousDisabled,
  isNextDisabled,
  isLastSlide,
  onRestart
}) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
      <div className="max-w-4xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <button
            onClick={onPrevious}
            disabled={isPreviousDisabled}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors min-h-[44px]"
          >
            ← Previous
          </button>

          {!isLastSlide ? (
            <button
              onClick={onNext}
              disabled={isNextDisabled}
              className="px-6 py-3 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors min-h-[44px]"
            >
              Next →
            </button>
          ) : (
            <button
              onClick={onRestart}
              className="px-6 py-3 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors min-h-[44px]"
            >
              Restart Course
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
