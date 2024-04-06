import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import  authService from '../services/authService';
import { useNavigate} from 'react-router-dom';

const DashboardPage = () => {
  const [userData, setUserData] = useState(null);
  const history = useNavigate();
  const auth = authService()

  useEffect(() => {
     const user = auth.getCurrentUser();
       if (!user) {
         history('/login'); // Redirect to login if user is not authenticated
       } else {
         setUserData(user);
       }
     }, [history]
  );

     const handleLogout = () => {
       auth.logout();
       history('/login');
   };

  return (
    <Container className="mt-4">
      <Row>
        <Col>
          <h2>Welcome, {userData} </h2>
          <Button variant="danger" onClick={handleLogout}>Logout</Button>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col>
          <Card>
            <Card.Body>
              <h4>VPN Connection Status</h4>
              {/* Connect/Disconnect Button */}
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col>
          <Card>
            <Card.Body>
              <h4>Data Usage</h4>
              {/* Usage Statistics */}
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col>
          <Card>
            <Card.Body>
              <h4>Settings</h4>
              {/* Profile Settings, Password Change */}
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col>
          <Card>
            <Card.Body>
              <h4>Support and Help</h4>
              {/* FAQs, Contact Support */}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default DashboardPage;
