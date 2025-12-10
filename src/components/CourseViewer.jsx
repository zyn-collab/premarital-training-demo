import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProgressBar from './ProgressBar';
import Navigation from './Navigation';
import SlideRenderer from './SlideRenderer';
import InfoModal from './InfoModal';
import {
  loadCourseProgress,
  saveCourseProgress,
  resetCourse,
  markCourseComplete
} from '../utils/localStorage';

export default function CourseViewer() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [courseData, setCourseData] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(() => loadCourseProgress(parseInt(courseId)));
  const [nextEnabled, setNextEnabled] = useState(false);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load course data
  useEffect(() => {
    const loadCourse = async () => {
      try {
        setLoading(true);
        const data = await import(`../data/courses/course${courseId}.json`);
        setCourseData(data.default);
        setLoading(false);
      } catch (err) {
        console.error('Error loading course:', err);
        setError(`Course ${courseId} not found or not yet available.`);
        setLoading(false);
      }
    };

    loadCourse();
  }, [courseId]);

  // Save progress whenever slide changes
  useEffect(() => {
    if (courseData) {
      saveCourseProgress(parseInt(courseId), currentSlide);

      // Mark complete when reaching last slide
      if (currentSlide === courseData.totalSlides) {
        markCourseComplete(parseInt(courseId));
      }
    }
  }, [currentSlide, courseId, courseData]);

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
    if (confirm('Are you sure you want to restart this course? This will clear all your progress.')) {
      resetCourse(parseInt(courseId));
      setCurrentSlide(1);
      setNextEnabled(false);
      window.location.reload();
    }
  };

  const handleResetDemo = () => {
    if (confirm('Are you sure you want to reset this course? This will clear all your saved answers and progress.')) {
      resetCourse(parseInt(courseId));
      setCurrentSlide(1);
      setNextEnabled(false);
      window.location.reload();
    }
  };

  const handleBackToCourses = () => {
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading course...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md text-center">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Course Not Available</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={handleBackToCourses}
            className="bg-emerald-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors"
          >
            Back to Courses
          </button>
        </div>
      </div>
    );
  }

  const currentSlideData = courseData.slides.find((s) => s.id === currentSlide);

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <ProgressBar
        current={currentSlide}
        total={courseData.totalSlides}
        courseTitle={courseData.courseTitle}
        courseId={parseInt(courseId)}
        onBackToCourses={handleBackToCourses}
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
          courseId={parseInt(courseId)}
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
        Reset Course
      </button>

      <InfoModal
        isOpen={isInfoModalOpen}
        onClose={() => setIsInfoModalOpen(false)}
        courseId={parseInt(courseId)}
      />
    </div>
  );
}
