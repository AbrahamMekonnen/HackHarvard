
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';
import { AuthPage } from './pages/AuthPage'; 
import { Dashboard } from './pages/Dashboard';
import { QuizPage } from './pages/QuizPage';
import { LevelQuiz } from './components/LevelQuiz';


function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/auth" element={<AuthPage />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/quiz/:levelId" element={<QuizPage />} />

            </Routes>
        </Router>
    );
}

export default App;
