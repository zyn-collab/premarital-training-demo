// ============= MULTI-COURSE SUPPORT =============

// Save course progress
export const saveCourseProgress = (courseId, slideNum) => {
  const progress = getCourseProgress(courseId);
  progress.currentSlide = slideNum;
  localStorage.setItem(`course_${courseId}_progress`, JSON.stringify(progress));
};

// Load course progress
export const loadCourseProgress = (courseId) => {
  const progress = getCourseProgress(courseId);
  return progress.currentSlide || 1;
};

// Get full course progress object
export const getCourseProgress = (courseId) => {
  const saved = localStorage.getItem(`course_${courseId}_progress`);
  if (saved) {
    return JSON.parse(saved);
  }
  return {
    currentSlide: 1,
    completed: false,
    checkpoints: {}
  };
};

// Mark course as completed
export const markCourseComplete = (courseId) => {
  const progress = getCourseProgress(courseId);
  progress.completed = true;
  localStorage.setItem(`course_${courseId}_progress`, JSON.stringify(progress));
};

// Save checkpoint answer for a specific course
export const saveCourseCheckpointAnswer = (courseId, checkpointNum, answer, textAnswer = null) => {
  const progress = getCourseProgress(courseId);
  if (!progress.checkpoints) progress.checkpoints = {};

  progress.checkpoints[checkpointNum] = {
    answer: answer,
    textAnswer: textAnswer,
    passed: true
  };

  localStorage.setItem(`course_${courseId}_progress`, JSON.stringify(progress));
};

// Get checkpoint answer for a specific course
export const getCourseCheckpointAnswer = (courseId, checkpointNum) => {
  const progress = getCourseProgress(courseId);
  return progress.checkpoints?.[checkpointNum]?.answer || null;
};

// Get checkpoint text answer for a specific course
export const getCourseCheckpointTextAnswer = (courseId, checkpointNum) => {
  const progress = getCourseProgress(courseId);
  return progress.checkpoints?.[checkpointNum]?.textAnswer || null;
};

// Get all courses progress (for course selection screen)
export const getAllCoursesProgress = () => {
  const allProgress = {};
  for (let i = 1; i <= 6; i++) {
    allProgress[i] = getCourseProgress(i);
  }
  return allProgress;
};

// Reset specific course
export const resetCourse = (courseId) => {
  localStorage.removeItem(`course_${courseId}_progress`);
};

// Reset all courses
export const resetAllCourses = () => {
  for (let i = 1; i <= 6; i++) {
    localStorage.removeItem(`course_${i}_progress`);
  }
};

// ============= LEGACY SUPPORT (for backward compatibility) =============

// Save progress (legacy - maps to course 2)
export const saveProgress = (slideNum) => {
  saveCourseProgress(2, slideNum);
};

// Load progress (legacy - maps to course 2)
export const loadProgress = () => {
  return loadCourseProgress(2);
};

// Save checkpoint answer (legacy - maps to course 2)
export const saveCheckpointAnswer = (checkpointNum, answer, textAnswer = null) => {
  saveCourseCheckpointAnswer(2, checkpointNum, answer, textAnswer);
};

// Get checkpoint answer (legacy - maps to course 2)
export const getCheckpointAnswer = (checkpointNum) => {
  return getCourseCheckpointAnswer(2, checkpointNum);
};

// Get checkpoint text answer (legacy - maps to course 2)
export const getCheckpointTextAnswer = (checkpointNum) => {
  return getCourseCheckpointTextAnswer(2, checkpointNum);
};

// Reset demo (legacy - resets all courses)
export const resetDemo = () => {
  localStorage.clear();
};

// Convert video duration to seconds
export const parseDuration = (duration) => {
  // "3min" → 180, "5min" → 300
  const num = parseInt(duration);
  if (duration.includes('min')) return num * 60;
  return num;
};
