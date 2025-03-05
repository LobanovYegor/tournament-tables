import './HomePage.css';

import illustration from '../../assets/tournament-win-illustration.jpeg';

export default function HomePage() {
  return (
    <div className="home-page">
      <div className="right-side">
        <h1>Portal Name</h1>
        <p>Some description about the portal.</p>
      </div>
      <div className="left-side">
        <img src={illustration} alt="Illustration" />
      </div>
    </div>
  );
}
