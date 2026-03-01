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
    <div className="min-h-screen bg-cream">
      {/* Masthead — government branding strip */}
      <div className="bg-white border-b border-black/[0.06] py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center gap-1.5 text-xs text-[#555]">
          <span className="inline-block w-2 h-2 rounded-full bg-[#c0392b] flex-shrink-0" />
          <span>A Maldives Government Website</span>
        </div>
      </div>

      {/* Header — peach, matching Kaiveni Portal style */}
      <header className="bg-peach">
        <div className="max-w-7xl mx-auto px-4 py-6 md:py-8">
          <div className="flex items-center gap-3 mb-1">
            {/* Couple SVG mark */}
            <svg width="36" height="34" viewBox="0 0 54 50" fill="none" aria-hidden="true">
              <circle cx="17" cy="11" r="7" stroke="#1a1a1a" strokeWidth="1.6" fill="none"/>
              <path d="M9 25 C8 20 10 17 17 16 C24 17 26 20 25 25 L25 38 L9 38 Z" fill="#E8926B" opacity="0.5"/>
              <path d="M9 38 L9 46 M25 38 L25 46 M6 46 L28 46" stroke="#1a1a1a" strokeWidth="1.6" strokeLinecap="round"/>
              <circle cx="37" cy="11" r="7" stroke="#1a1a1a" strokeWidth="1.6" fill="none"/>
              <path d="M29 38 L29 46 M45 38 L45 46 M26 46 L48 46" stroke="#1a1a1a" strokeWidth="1.6" strokeLinecap="round"/>
              <path d="M27 42 C27 36 24 30 22 26" stroke="#5B8E7D" strokeWidth="1.4" fill="none" strokeLinecap="round"/>
            </svg>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-[#1a1a1a] leading-tight">
                Marriage Preparation Program
              </h1>
              <p className="text-sm text-[#555] mt-0.5 font-medium tracking-wide">
                Kaiveni Portal · marriage.gov.mv
              </p>
            </div>
          </div>
          <p className="text-[#444] mt-3 text-base leading-relaxed max-w-xl">
            Complete all 6 courses to prepare for a successful marriage
          </p>
        </div>
        {/* Peach → cream wave */}
        <div aria-hidden="true" className="overflow-hidden leading-none -mb-px">
          <svg viewBox="0 0 1440 36" preserveAspectRatio="none" className="w-full block" style={{height:'36px'}}>
            <path d="M0 14 C240 36 480 2 720 16 C960 30 1200 6 1440 20 L1440 36 L0 36 Z" fill="#FAF6F2"/>
          </svg>
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
        <div className="mt-12 bg-white rounded-xl shadow-card p-8 border border-black/[0.06]">
          <h2 className="text-xl font-bold text-[#1a1a1a] mb-5">About This Program</h2>
          <div className="grid md:grid-cols-2 gap-6 text-[#2e2e2e]">
            <div>
              <h3 className="font-semibold text-[#1B3F61] mb-3 text-sm uppercase tracking-wide">Program Details</h3>
              <ul className="space-y-2 text-sm text-[#444]">
                <li>• <strong>Total Duration:</strong> {coursesMetadata.totalDuration}</li>
                <li>• <strong>Total Content:</strong> {coursesMetadata.totalSlides} slides</li>
                <li>• <strong>Format:</strong> Self-paced online learning</li>
                <li>• <strong>Completion:</strong> All 6 courses required</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-[#1B3F61] mb-3 text-sm uppercase tracking-wide">What You'll Learn</h3>
              <ul className="space-y-2 text-sm text-[#444]">
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

      </main>

      {/* Footer — peach top band + dark bottom band */}
      <footer>
        <div className="bg-peach pt-8 pb-6 px-4">
          <div className="max-w-7xl mx-auto">
            <p className="text-base font-bold text-[#1a1a1a] mb-1">Kaiveni Portal</p>
            <p className="text-sm text-[#555] max-w-xl leading-relaxed">
              Kaiveni Portal is the official marriage preparation service provided by the Family Court of the Maldives.
            </p>
            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm">
              <a href="#" className="text-terracotta hover:underline">Contact</a>
              <a href="#" className="text-terracotta hover:underline">FAQs</a>
              <a href="#" className="text-terracotta hover:underline">Feedback</a>
            </div>
          </div>
        </div>
        <div className="bg-[#1B3A5A] text-white/80 py-4 px-4">
          <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-3 text-xs">
            <div className="flex flex-wrap gap-x-5 gap-y-1">
              <a href="#" className="text-white/60 hover:text-white">Privacy statement</a>
              <a href="#" className="text-white/60 hover:text-white">Terms of use</a>
            </div>
            <p className="text-white/60">© {new Date().getFullYear()} Government of Maldives</p>
          </div>
          <p className="max-w-7xl mx-auto mt-2 text-white/40 text-[10px]">
            This is a demonstration version. The full program requires completion verification by a Ghaazee (marriage officer).
          </p>
        </div>
      </footer>
    </div>
  );
}
