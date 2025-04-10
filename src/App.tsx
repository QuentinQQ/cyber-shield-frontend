import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CleanFeed from './pages/CleanFeed';
import Header from './components/Header';
import QuizPage from './pages/Quiz';
import SafePeople from './pages/SafePeople'; 
import ScenarioGame from './pages/ScenarioGame';
import GetHelp from './pages/GetHelp'; 

function App() {
  return (
    <BrowserRouter>
      <div className="relative overflow-x-hidden">
        <Header />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/clean-feed" element={<CleanFeed />} />
          <Route path="/quiz" element={<QuizPage />} />
          <Route path="/safe-people" element={<SafePeople />} />
          <Route path="/scenario" element={<ScenarioGame />} />
          <Route path="/get-help" element={<GetHelp />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;