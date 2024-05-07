import React, { useState, useEffect } from 'react';
import { Container, Button } from 'react-bootstrap';
import authService from '../services/authService';
import QuestForm from '../components/questForm';
import { useNavigate } from 'react-router-dom';
import '../assets/dashboard.css';
import io from "socket.io-client";

const socket = io.connect("http://localhost:5000");

const DashboardPage = () => {
  const [userData, setUserData] = useState([]);
  const [showComponent, setShowComponent] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [info, setInfo] = useState("");
  const history = useNavigate();
  const auth = authService();

  useEffect(() => {
    const user = auth.getCurrentData();
    if (!user) {
      history('/login'); // Redirect to login if user is not authenticated
    } else {
      setUserData(user);
    }

    socket.on("data_cast", (data) => {
      setInfo(data);
    });

    // Clean up the socket listener when component unmounts
    return () => {
      socket.off("data_cast");
    };
  }, [history, auth]);

  const submitQuest = () => {
    setShowComponent(true);
  };

  const handleLogout = () => {
    auth.logout();
    history('/login');
  };

  return (
    <Container className="mt-4">
      <h2 id="header">Welcome, {userData[0]} </h2>
      <ul id="vpn-status">
        <li><h4>VPN Connection Status </h4></li>
        <li>{info === "" ? <p>no sex ? </p> : info}</li>
        <li>
          {userData[1] === 0 ? (
            <label className="switch">
              <input type="checkbox" />
              <span className="slider"></span>
            </label>
          ) : (
            <label className="switch">
              <input
                type="checkbox"
              />
              <span className="slider"></span>
            </label>
          )}
        </li>
        <li>{userData[3] === 0 ? <p>no user info </p> : userData[3]}</li>
      </ul>
      <ul id="question">
        <li><h4>your recent question </h4></li>
        <li>{userData[2] === "null" ? <p>no fking question </p> : userData[2]}</li>
        <li>
          <button id="button-1" onClick={submitQuest}>add Question</button>
          {showComponent && <QuestForm />}
        </li>
      </ul>
      <button id="button" variant="danger" onClick={handleLogout}>Logout</button>
      <br />
    </Container>
  );
};

export default DashboardPage;
