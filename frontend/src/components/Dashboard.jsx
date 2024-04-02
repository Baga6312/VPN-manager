import React, { useState, useEffect } from 'react';
import { Button, Container, Row, Col, Card } from 'react-bootstrap';
import authService from '../services/authService';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [userData, setUserData] = useState({});
  const history = useNavigate();

  useEffect(() => {
    // Fetch user data from authService
    const user = authService.getCurrentUser();
    if (!user) {
      history.push('/login'); // Redirect to login if user is not authenticated
    } else {
      setUserData(user);
    }
  }, [history]);

  const handleLogout = () => {
    authService.logout();
    history.push('/login');
  };

  return (
    <Container className="mt-4">
      <Row>
        <Col>
          <h2>Welcome, {userData.username}</h2>
          <Button variant="danger" onClick={handleLogout}>Logout</Button>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col>
          <Card>
            <Card.Body>
              <h4>VPN Connection Status</h4>
              {/* Display VPN connection status */}
              {/* Connect/Disconnect Button */}
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card>
            <Card.Body>
              <h4>Server Selection</h4>
              {/* Dropdown Menu for server selection */}
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
        <Col>
          <Card>
            <Card.Body>
              <h4>Connection Logs</h4>
              {/* Log Entries */}
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col>
          <Card>
            <Card.Body>
              <h4>Account Information</h4>
              {/* Username, Email, Subscription Plan */}
            </Card.Body>
          </Card>
        </Col>
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

export default Dashboard;
