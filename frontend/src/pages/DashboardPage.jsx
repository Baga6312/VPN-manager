import React, { useState, useEffect } from 'react';
import { Container} from 'react-bootstrap';
import  authService from '../services/authService';
import { useNavigate} from 'react-router-dom';
import '../assets/dashboard.css'
import io from "socket.io-client"
// const socket = io.connect("http://localhost:5000")

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
      };

        ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        setInfo(data);
      };

      
      //  socket.on("data_cast" , (data)=> { 
      //     setInfo(data)
      //  })
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
              <li><h4>VPN Connection Status </h4></li>
              <li>{info && <p>{info} </p>}</li>
              <li><p>{info=="" ? <span>\n \n</span> : null }</p></li>
              <li><p className={info =="" ? 'active-circle' : 'inactive-circle' }>sex</p></li>
            </ul>
          <div id="container">
              <button id="button" variant="danger" onClick={handleLogout}>Logout</button>
          </div>
    </Container>
  );
};


export default DashboardPage ;