import './App.css';

import Header from './components/Header/Header.tsx';
import HomePage from './layout/HomePage/HomePage.tsx';
import TournamentsList from './layout/TournamentsList/TournamentsList.tsx';
import { Route, Routes } from 'react-router-dom';
import StyleGuide from './components/StyleGuide/StyleGuide.tsx';
import TournamentEdit from './layout/TournamentEdit/TournamentEdit.tsx';
import TournamentDetails from './layout/TournamentDetails/TournamentDetails.tsx';

function App() {
  return (
    <div className="main-container">
      <div className="header-container">
        <Header />
      </div>
      <div className="view-container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/tournaments" element={<TournamentsList />} />
          <Route
            path="/tournaments/details/:id"
            element={<TournamentDetails />}
          />
          <Route path="/tournaments/edit" element={<TournamentEdit />} />
          <Route path="/style-guide" element={<StyleGuide />} />
        </Routes>
      </div>
      <div className="footer-container">&copy; 2025</div>
    </div>
  );
}

export default App;
