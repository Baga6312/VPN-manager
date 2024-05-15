import React, { useState, useEffect } from 'react';
import authService from '../services/authService';
import '../assets/dashboard.css'
import { Container} from 'react-bootstrap';
import { useNavigate} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinus ,  faAngleUp , faAngleDown } from '@fortawesome/free-solid-svg-icons'

const DashboardPage =() => {
  const [userData, setUserData] = useState([]);
  const [showComponent , setShowComponenet ] = useState(false)
  const [info , setInfo] = useState("")
  const history = useNavigate();
  const auth = authService()

  useEffect(() => {
       const user = auth.getCurrentData()
       if (!user) {
         history('/login'); // Redirect to login if user is not authenticated
       } else {
          setUserData(user) 
       }

        const ws = new WebSocket('ws://localhost:5000');

        ws.onopen = () => {
        console.log('Connected to WebSocket server');
        ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        setInfo(data);
      };

      };
     }, [history ]
  );

  const submitQuest= () => { 
    setShowComponenet(true)
  }

  const handleLogout = () => {
    auth.logout();
    history('/login');
  };

  return (
    <Container className="mt-4">
      <h2 id="header">Welcome, {userData[0]} </h2>
            <ul id="status">
              <li>
                <h4>VPN Connection Status</h4>
              </li>
              <li>
                  {info !== "" ? <span class="whiet-spaces">
                  <FontAwesomeIcon icon={faAngleUp}/> 
                    <li>h</li> 
                    { info.split(" ")[1] }
                    { info.split(" ")[2]}
                    <li>h</li> 
                  <FontAwesomeIcon icon={faAngleDown}/>
                    <li>h</li> 
                    { info.split(" ")[4] }
                    { info.split(" ")[5]}</span> 
                    
                    : <span class="whiet-spaces"> 
                  <FontAwesomeIcon icon={faAngleUp} />
                      <li>h</li> 
                      <FontAwesomeIcon icon={faMinus}/>
                      <FontAwesomeIcon icon={faMinus}/>
                      <li>h</li> 
                  <FontAwesomeIcon icon={faAngleDown}/>
                      </span>
                    }  
                </li>
              <li><p className={info =="" ? 'active-circle' : 'inactive-circle' }>sex</p></li>
            </ul>
          <div id="container">
              <button id="button" variant="danger" onClick={handleLogout}>Logout</button>
          </div>
    </Container>
  );
};


export default DashboardPage ;