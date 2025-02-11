import './App.css';

import { Header, StyleGuide } from '@components';
import { Route, Routes } from 'react-router-dom';

import HomePage from './layout/HomePage/HomePage';
import TournamentDetails from './layout/TournamentDetails/TournamentDetails';
import TournamentEdit from './layout/TournamentEdit/TournamentEdit';
import TournamentsList from './layout/TournamentsList/TournamentsList';

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
