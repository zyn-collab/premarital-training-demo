// Save progress
export const saveProgress = (slideNum) => {
  localStorage.setItem('currentSlide', slideNum);
};

// Load progress
export const loadProgress = () => {
  const saved = localStorage.getItem('currentSlide');
  return saved ? parseInt(saved) : 1;
};

// Save checkpoint answer
export const saveCheckpointAnswer = (checkpointNum, answer, textAnswer = null) => {
  localStorage.setItem(`checkpoint_${checkpointNum}`, answer);
  if (textAnswer) {
    localStorage.setItem(`checkpoint_${checkpointNum}_text`, textAnswer);
  }
  localStorage.setItem(`checkpoint_${checkpointNum}_passed`, 'true');
};

// Get checkpoint answer
export const getCheckpointAnswer = (checkpointNum) => {
  return localStorage.getItem(`checkpoint_${checkpointNum}`);
};

// Get checkpoint text answer
export const getCheckpointTextAnswer = (checkpointNum) => {
  return localStorage.getItem(`checkpoint_${checkpointNum}_text`);
};

// Reset demo
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
