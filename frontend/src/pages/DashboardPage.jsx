import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import  authService from '../services/authService';
import QuestForm from '../components/questForm'
import { useNavigate} from 'react-router-dom';
import '../assets/dashboard.css'

const DashboardPage = () => {
  const [userData, setUserData] = useState([]);
  const [showComponent , setShowComponenet ] = useState(false)
  const [isChecked, setIsChecked] = useState(false);
  const history = useNavigate();
  const auth = authService()

  useEffect(() => {
       const user = auth.getCurrentData()
       if (!user) {
         history('/login'); // Redirect to login if user is not authenticated
       } else {
          setUserData(user)
       }
     }, [history]
  );

  const submitQuest= () => { 
    setShowComponenet(true)
  }

   const handleChange = () => {
    setIsChecked(!isChecked); // Toggles the checked state
  };
  const handleLogout = () => {
    auth.logout();
    history('/login');
  };

  return (
    <Container className="mt-4">
      <h2 id="header">Welcome, {userData[0]} </h2>
          <ul id="vpn-status">
              <li><h4>VPN Connection Status</h4></li>
              <li>{userData[1] ==0 ? <label class="switch"><input type="checkbox" /><span class="slider"></span></label> : <label class="switch"><input type="checkbox"/><span class="slider"></span></label>}</li>
          </ul>
          {/* <ul>
              <li><h4>Settings</h4></li>
          </ul> */}
          <ul id="question">
            <li><h4>your recent question </h4></li>
            <li>{userData[2] === "null" ? <p>no fking question </p>: userData[2]}</li>
            <li><button id="button-1" onClick={submitQuest}>add Question</button>{showComponent && <QuestForm/> }</li>
          </ul>
          <button id="button" variant="danger" onClick={handleLogout}>Logout</button>
          <br/>
    </Container>
  );
};

export default DashboardPage;
