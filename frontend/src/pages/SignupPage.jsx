import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import  authService  from '../services/authService';
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const auth = authService()

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      auth.signup(username, password);
      navigate('/dashboard'); // Redirect to dashboard after successful signup
    } catch (error) {
      setError(`Error signing up. Please try again. ${error }`);
    }
  };

  return (
    <Container className="mt-5">
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <h2>Sign Up</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" placeholder="Enter username" value={username} onChange={(e) => setUsername(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </Form.Group>

            <Button variant="primary" type="submit">
              Sign Up
            </Button>

            {error && <p className="text-danger mt-2">{error}</p>}
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default SignupPage;
