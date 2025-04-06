import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CleanFeed from './pages/CleanFeed';
import Header from './components/Header';

function App() {
  return (
    <BrowserRouter>
      <div className="relative overflow-x-hidden">
        <Header />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/clean-feed" element={<CleanFeed />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;


// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import HomePage from './pages/HomePage';
// import CleanFeed from './pages/CleanFeed';

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<HomePage />} />
//         <Route path="/clean-feed" element={<CleanFeed />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;