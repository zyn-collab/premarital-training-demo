import TitleSlide from './slides/TitleSlide';
import VideoSlide from './slides/VideoSlide';
import ContentSlide from './slides/ContentSlide';
import PracticeSlide from './slides/PracticeSlide';
import TransitionSlide from './slides/TransitionSlide';
import CheckpointSlide from './slides/CheckpointSlide';
import SummarySlide from './slides/SummarySlide';
import CompletionSlide from './slides/CompletionSlide';
import InteractiveSlide from './slides/InteractiveSlide';
import GenderSelectionSlide from './slides/GenderSelectionSlide';

export default function SlideRenderer({ slide, onNextEnabled, courseId = 2 }) {
  if (!slide) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-8">
        <p className="text-gray-600">Loading slide...</p>
      </div>
    );
  }

  switch (slide.type) {
    case 'title':
      return <TitleSlide data={slide} onNextEnabled={onNextEnabled} />;
    case 'video':
      return <VideoSlide data={slide} onNextEnabled={onNextEnabled} />;
    case 'content':
      return <ContentSlide data={slide} onNextEnabled={onNextEnabled} />;
    case 'practice':
      return <PracticeSlide data={slide} onNextEnabled={onNextEnabled} />;
    case 'transition':
      return <TransitionSlide data={slide} onNextEnabled={onNextEnabled} />;
    case 'checkpoint':
      return <CheckpointSlide data={slide} onNextEnabled={onNextEnabled} courseId={courseId} />;
    case 'summary':
      return <SummarySlide data={slide} onNextEnabled={onNextEnabled} />;
    case 'completion':
      return <CompletionSlide data={slide} />;
    case 'interactive':
      return <InteractiveSlide data={slide} onNextEnabled={onNextEnabled} />;
    case 'gender-selection':
      return <GenderSelectionSlide data={slide} onNextEnabled={onNextEnabled} />;
    default:
      return (
        <div className="bg-white rounded-lg shadow-lg p-8">
          <p className="text-red-600">Unknown slide type: {slide.type}</p>
        </div>
      );
  }
}
