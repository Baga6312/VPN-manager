import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import Dashboard from './components/Dashboard';
import QRCodeScan from './components/QRcodeScan';
import Tests from './pages/tests'
import Tests2 from './pages/tests2'

const App = () => {
  return (
    <Router>
      <div className="login">
        <Routes>
          <Route path="/" element={<LoginForm/>}/>
          <Route path="/login" element={<LoginForm/>}/>
          <Route path="/signup" element={<SignupForm/>}/>
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/QRCodeScan" element={<QRCodeScan/>}/>
          <Route path="/tests" element={<Tests/>}/>
          <Route path="/tests2" element={<Tests2/>}/>
        </Routes>
      </div>
    </Router>  
  );
};

export default App;
