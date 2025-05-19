import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CleanFeed from './pages/CleanFeed';
import Header from './components/Header';
import QuizPage from './pages/Quiz';
import SafePeople from './pages/SafePeople'; 
import ScenarioGame from './pages/ScenarioGame';
import GetHelp from './pages/GetHelp'; 
import Story from './pages/Story'; 
import Video from './pages/Video'; 
import CharacterIntroPage from './pages/CharacterIntroPage'; 
import CleanFeedIntro from './pages/CleanFeedIntro'; 
import TextAnalysisPage from './pages/TextAnalysisPage';
import SpaceCursor from './components/SpaceCursor'; 
import RelaxPage from './pages/RelaxPage';
import SocialMediaQuestion from './pages/SocialMediaQuestion';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';

function App() {
  return (
    <>
      {/* Add SpaceCursor at the root level, outside BrowserRouter */}
      <SpaceCursor />
      
      <BrowserRouter>
        <div className="relative overflow-x-hidden">
          <Header />

          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/clean-feed" element={<CleanFeedIntro />} />
            <Route path="/clean-feed-game" element={<CleanFeed skipIntro={true} />} />
            <Route path="/quiz" element={<QuizPage />} />
            <Route path="/quiz-2" element={<SocialMediaQuestion />} />
            <Route path="/safe-people" element={<SafePeople />} />
            <Route path="/scenario" element={<ScenarioGame />} />
            <Route path="/get-help" element={<GetHelp />} />
            <Route path="/story" element={<Story />} />
            <Route path="/video" element={<Video />} />
            <Route path="/video/:videoId" element={<Video />} />
            <Route path="/character-intro" element={<CharacterIntroPage />} />
            <Route path="/text-checker" element={<TextAnalysisPage />} />
            <Route path="/relax" element={<RelaxPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;