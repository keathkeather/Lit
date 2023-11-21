import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';
import LoadingScreen from './LoadingScreen';
import LandingScreen from './Landing/LandingScreen';
import LoginScreen from './Landing/LoginScreen';
import SignupScreen from './Landing/SignupScreen';
import FeaturesScreen from './Landing/FeaturesScreen';
import PricingScreen from './Landing/PricingScreen';
import CheckpointScreen from './Landing/CheckpointScreen';
import AboutusScreen from './Landing/AboutusScreen';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<LoadingScreen />} />
        <Route path="/landing" element={<LandingScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/signup" element={<SignupScreen />} />
        <Route path="/features" element={<FeaturesScreen />} />
        <Route path="/pricing" element={<PricingScreen />} />
        <Route path="/checkpoint" element={<CheckpointScreen />} />
        <Route path="/aboutus" element={<AboutusScreen />} />
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
