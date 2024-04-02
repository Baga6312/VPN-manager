// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes , Route } from 'react-router-dom';
import LoginPage from '../pages/LoginPage.jsx'
import SignupPage from '../pages/LoginPage.jsx';
import DashboardPage from '../pages/LoginPage.jsx';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" component={LoginPage} />
        <Route path="/signup" component={SignupPage} />
        <Route path="/dashboard" component={DashboardPage} />
      </Routes>
    </Router>
  );
};

export default App;
