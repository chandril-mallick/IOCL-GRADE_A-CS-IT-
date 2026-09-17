import { Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import StudyBook from './pages/StudyBook';
import PracticeLab from './pages/PracticeLab';
import MockTests from './pages/MockTests';
import ErrorBook from './pages/ErrorBook';
import Flashcards from './pages/Flashcards';
import Formulas from './pages/Formulas';
import Bookmarks from './pages/Bookmarks';
import SevenDayPlan from './pages/SevenDayPlan';
import LastDay from './pages/LastDay';

function App() {
  return (
    <div className="app-container">
      <Sidebar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/book/*" element={<StudyBook />} />
          <Route path="/practice" element={<PracticeLab />} />
          <Route path="/mock" element={<MockTests />} />
          <Route path="/error-book" element={<ErrorBook />} />
          <Route path="/flashcards" element={<Flashcards />} />
          <Route path="/formulas" element={<Formulas />} />
          <Route path="/bookmarks" element={<Bookmarks />} />
          <Route path="/7-day-plan" element={<SevenDayPlan />} />
          <Route path="/last-day" element={<LastDay />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
