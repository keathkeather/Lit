import React from 'react';
import ReactDOM from 'react-dom';
import { AccountProvider } from './Home/AccountContext';
import { BookProvider } from './Home/BookContext';
import { BookListProvider } from './ApiClient/BookListContext';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './index.css';
import LoadingScreen from './LoadingScreen';
import LandingScreen from './Landing/LandingScreen';
import LoginScreen from './Landing/LoginScreen';
import SignupScreen from './Landing/SignupScreen';
import FeaturesScreen from './Landing/FeaturesScreen';
import PricingScreen from './Landing/PricingScreen';
import CheckpointScreen from './Landing/CheckpointScreen';
import AboutusScreen from './Landing/AboutusScreen';
import ContactusScreen from './Landing/ContactusScreen';
import UserHomeScreen from './Home/UserHomeScreen';
import GameScreen from './Home/GameScreen';
import BookScreen from './Home/BookScreen';
import ExploreScreen from './Home/ExploreScreen'; 
import QuestList from './Home/QuestList';
import HelpScreen from './Home/HelpScreen';
import QuizScreen from './Home/QuizScreen';
import MyList from './Home/MyList';
import AdminHomeScreen from './Admin/AdminHomeScreen';
import FeedbackAndReports from './Admin/FeedbackandReports';
import SubscriptionScreen from './Subscription/SubscriptionScreen';
import EditUserScreen from './Admin/EditUserScreen';
import BeAnAuthorScreen from './Home/BeAnAuthorScreen';
import AuthorMyList from './Home/AuthorMyList';
import CreateBookScreen from './Home/CreateBookScreen';
import BooksScreen from './Admin/BooksScreen';
import Dashboard from './Admin/Dashboard';
import ScoreScreen from './Home/ScoreScreen';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <AccountProvider>
    <BookProvider>
    <BookListProvider>
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
        <Route path="/contactus" element={<ContactusScreen />} />
        <Route path="/userhome" element={<UserHomeScreen />} />
        <Route path="/game" element={<GameScreen />} />
        <Route path="/book" element={<BookScreen />} />
        <Route path="/questlist" element={<QuestList />} />
        <Route path="/explore" element={<ExploreScreen />} />
        <Route path="/help" element={<HelpScreen />} />
        <Route path="/quiz/:quizId" element={<QuizScreen />} />
        <Route path="/mylist" element={<MyList />} />
        <Route path="/admin" element={<AdminHomeScreen/>}/>
        <Route path="/subscription" element={<SubscriptionScreen/>}/>
        <Route path="/reportsandfeedbacks" element={<FeedbackAndReports />} />
        <Route path="/edituser/:userId" element={<EditUserScreen />} />
        <Route path="/beanauthor" element={<BeAnAuthorScreen />} />
        <Route path="/authormylist" element={<AuthorMyList />} />
        <Route path="/createbook" element={<CreateBookScreen />} />
        <Route path="/books" element={<BooksScreen />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/score/:score/:perfectScore" element={<ScoreScreen/>} />
      </Routes>
    </Router>
    </BookListProvider>
    </BookProvider>
    </AccountProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();