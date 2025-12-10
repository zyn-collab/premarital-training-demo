import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CourseSelection from './components/CourseSelection';
import CourseViewer from './components/CourseViewer';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CourseSelection />} />
        <Route path="/course/:courseId" element={<CourseViewer />} />
      </Routes>
    </Router>
  );
}

export default App;
