import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import  authService from '../services/authService';
import QuestForm from '../components/questForm'
import { useNavigate} from 'react-router-dom';

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
      <Row>
        <Col>
          <h2>Welcome, {userData[0]} </h2>
          
        </Col>
      </Row>
      <Row className="mt-4">
        <Col>
          <Card>
            <Card.Body>
              <ul>
                <li><h4>VPN Connection Status</h4></li>
                <li>{ userData[1] == 0  ?  <input type='checkbox' checked={isChecked} onChange={handleChange} />  : <input type='checkbox' checked={isChecked} onChange={handleChange}/> }</li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col>
          <Card>
            <Card.Body>
              <ul>
                <li><h4>Data Usage</h4></li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col>
          <Card>
            <Card.Body>
              <ul>
                <li><h4>Settings</h4></li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col>
          <Card>
            <Card.Body>
              <ul>
                <li><h4>your recent question </h4></li>
                <li>{userData[2] === "null" ? <p> no fking question </p>: userData[2]}</li>
                <li><Button  onClick={submitQuest}>add Question</Button>
                    {showComponent && <QuestForm/> }
                </li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <br/>
                <Button variant="danger" onClick={handleLogout}>Logout</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

    </Container>
  );
};

export default DashboardPage;
