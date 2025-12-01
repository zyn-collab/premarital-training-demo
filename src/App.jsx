import { useState, useEffect, useCallback } from 'react';
import courseData from './data/courseData.json';
import ProgressBar from './components/ProgressBar';
import Navigation from './components/Navigation';
import SlideRenderer from './components/SlideRenderer';
import InfoModal from './components/InfoModal';
import { loadProgress, saveProgress, resetDemo } from './utils/localStorage';

function App() {
  const [currentSlide, setCurrentSlide] = useState(() => loadProgress());
  const [nextEnabled, setNextEnabled] = useState(false);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);

  useEffect(() => {
    // Save progress whenever slide changes
    saveProgress(currentSlide);
  }, [currentSlide]);

  const handleNextEnabled = useCallback(() => {
    setNextEnabled(true);
  }, []);

  const handleNext = () => {
    if (currentSlide < courseData.totalSlides) {
      setCurrentSlide((prev) => prev + 1);
      setNextEnabled(false);
    }
  };

  const handlePrevious = () => {
    if (currentSlide > 1) {
      setCurrentSlide((prev) => prev - 1);
      setNextEnabled(false);
    }
  };

  const handleRestart = () => {
    if (confirm('Are you sure you want to restart the course? This will clear all your progress.')) {
      resetDemo();
      setCurrentSlide(1);
      setNextEnabled(false);
      window.location.reload();
    }
  };

  const handleResetDemo = () => {
    if (confirm('Are you sure you want to reset the demo? This will clear all your saved answers and progress.')) {
      resetDemo();
      setCurrentSlide(1);
      setNextEnabled(false);
      window.location.reload();
    }
  };

  const currentSlideData = courseData.slides.find((s) => s.id === currentSlide);

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <ProgressBar
        current={currentSlide}
        total={courseData.totalSlides}
        courseTitle={courseData.courseTitle}
      />

      <div className="max-w-4xl mx-auto px-4 pt-4">
        <button
          onClick={() => setIsInfoModalOpen(true)}
          className="text-emerald-600 hover:text-emerald-700 font-medium text-sm underline flex items-center gap-1"
        >
          📖 Info about model + demo answers to use
        </button>
      </div>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <SlideRenderer
          key={currentSlide}
          slide={currentSlideData}
          onNextEnabled={handleNextEnabled}
        />
      </main>

      <Navigation
        onPrevious={handlePrevious}
        onNext={handleNext}
        isPreviousDisabled={currentSlide === 1}
        isNextDisabled={!nextEnabled}
        isLastSlide={currentSlide === courseData.totalSlides}
        onRestart={handleRestart}
      />

      <button
        onClick={handleResetDemo}
        className="fixed bottom-20 right-4 text-sm text-gray-500 hover:text-gray-700 bg-white px-3 py-2 rounded shadow-sm border border-gray-200"
      >
        Reset Demo
      </button>

      <InfoModal
        isOpen={isInfoModalOpen}
        onClose={() => setIsInfoModalOpen(false)}
      />
    </div>
  );
}

export default App;
