import { useState, useEffect } from 'react';
import coursesMetadata from '../data/coursesMetadata.json';
import CourseCard from './CourseCard';
import CertificateProgress from './CertificateProgress';
import { getCourseProgress, getAllCoursesProgress } from '../utils/localStorage';

export default function CourseSelection() {
  const [allProgress, setAllProgress] = useState({});

  useEffect(() => {
    // Load progress for all courses
    const progress = getAllCoursesProgress();
    setAllProgress(progress);
  }, []);

  // Calculate completed courses
  const completedCount = Object.values(allProgress).filter(
    (p) => p?.completed
  ).length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900">
            Marriage Preparation Program
          </h1>
          <p className="text-gray-600 mt-1">
            Complete all 6 courses to prepare for a successful marriage
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Certificate Progress */}
        <CertificateProgress
          completedCount={completedCount}
          totalCourses={coursesMetadata.courses.length}
        />

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {coursesMetadata.courses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              progress={allProgress[course.id]}
            />
          ))}
        </div>

        {/* Program Info */}
        <div className="mt-12 bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            About This Program
          </h2>
          <div className="grid md:grid-cols-2 gap-6 text-gray-700">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Program Details</h3>
              <ul className="space-y-2 text-sm">
                <li>• <strong>Total Duration:</strong> {coursesMetadata.totalDuration}</li>
                <li>• <strong>Total Content:</strong> {coursesMetadata.totalSlides} slides</li>
                <li>• <strong>Format:</strong> Self-paced online learning</li>
                <li>• <strong>Completion:</strong> All 6 courses required</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">What You'll Learn</h3>
              <ul className="space-y-2 text-sm">
                <li>• Islamic foundations of marriage</li>
                <li>• Communication and conflict resolution</li>
                <li>• Health, intimacy, and family planning</li>
                <li>• Financial management and planning</li>
                <li>• Building a safe, violence-free home</li>
                <li>• Parenting preparation and skills</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-8 text-center text-sm text-gray-600">
          <p>
            This is a demonstration version. The full program requires completion verification by a Ghaazee (marriage officer).
          </p>
        </div>
      </main>
    </div>
  );
}
