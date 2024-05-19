import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import Dashboard from './components/Dashboard';
import QRCodeScan from './components/QRcodeScan';
import Infos from './pages/Infos'
import Networking from './pages/Networking'
import Instruction from './pages/Instruction';
import Admin from './pages/Admin';

const App = () => {
  return (
    <Router>
      <div className="login">
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/Infos" element={<Infos />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/QRCodeScan" element={<QRCodeScan />} />
          <Route path="/Networking" element={<Networking />} />
          <Route path="/Instruction" element={<Instruction />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
