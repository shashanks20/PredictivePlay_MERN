import React from 'react';
import Navbar from '../components/Navbar';

const Home = () => (
  <div>
    <Navbar />
    <div className="container-fluid homepage-container">
      <div className="overlay"></div>
      <div className="content">
        <h1>Welcome to Predictiveplay</h1>
        <p>
          Predict the outcomes of the matches and earn points to climb the leaderboard. Compete with other players and showcase your predictive skills!
        </p>
        <h2>How it Works</h2>
        <p>
          1. Browse the upcoming matches and make your predictions.<br />
          2. Earn points based on the accuracy of your predictions.<br />
          3. Check the leaderboard to see your ranking among other players.<br />
          4. Enjoy the thrill of predicting and winning!
        </p>
        <h2>Leaderboard</h2>
        <p>
          Keep an eye on the leaderboard to see how you stack up against other players. The more accurate your predictions, the higher you'll climb!
        </p>
        <h2>Get Started</h2>
        <p>
          Sign up or log in to start predicting matches and earning points. The more you play, the more chances you have to win exciting rewards!
        </p>
      </div>
    </div>
  </div>
);

export default Home;
