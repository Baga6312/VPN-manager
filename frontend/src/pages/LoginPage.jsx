import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import authService from '../services/authService';
import { useNavigate } from 'react-router-dom';
import '../assets/login.css'

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const auth = authService()

  const handleSubmit = async (e) => {



    e.preventDefault();
    if (!username && !password) {
      setError('Username and password are required');
    }else{
      await auth.login(username, password)
      setError('invalid username or password')
    }
  }



  const handleRegister = (e) => {
    e.preventDefault();
    navigate("/signup")
  }


  return (
    <Container className="mt-5">
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <Form className='login-box' onSubmit={handleSubmit}>
          <h2 className='login-header'>Login</h2>
            <div id="formHeader">
              <p>Username</p>
              <input id="formBasicInput" type="text" placeholder="Enter username" value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>

            <div id="formHeader">
              <p>Password</p>
              <input id="formBasicInput" type="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>

            <Button id="submit-btn" variant="primary" type="submit">
              Login
            </Button>
            <Button id="regi-btn" variant="primary" type="button" onClick={(e) => { handleRegister(e) }} >
              Register
            </Button>

            {error && <p id="error-text" className="text-danger mt-2">{error}</p>}
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
