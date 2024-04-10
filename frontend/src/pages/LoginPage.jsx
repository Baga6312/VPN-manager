import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import authService from '../services/authService';
import { useNavigate } from 'react-router-dom';
import '../assets/login.css';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isShaking, setIsShaking] = useState(false);
  const navigate = useNavigate();
  const auth = authService();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError('Username and password are required');
      setIsShaking(true);
      setTimeout(() => {
        setIsShaking(false);
      }, 1000); // Adjust the duration of the animation as needed
      } else {
        await auth.login(username, password);
        setError('Invalid username or password');
        setIsShaking(true);
        setTimeout(() => {
          setIsShaking(false);
        }, 300); // Adjust the duration of the animation as needed
      }
    };

  const handleRegister = (e) => {
    e.preventDefault();
    navigate('/signup');
  };

  return (
    <Container className="mt-5">
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <Form className="login-box" onSubmit={handleSubmit}>
            <div id="container">
              <h2 className="login-header">Login</h2>
              <div id="formHeader">
                <input
                  id="formBasicInput"
                  type="text"
                  placeholder="Enter username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              <div id="formHeader">
                <input
                  id="formBasicInput"
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div id="btns">
                <button
                  id="submit-btn"
                  variant="primary"
                  type="submit"
                >
                  Login
                </button>
                <button id="regi-btn" variant="primary" type="button" onClick={handleRegister}>
                  Register
                </button>
              </div>

              {error && <p className={isShaking && error ? 'error-text' : 'red-text'}>{error}</p>}
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
