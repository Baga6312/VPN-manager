import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import  authService  from '../services/authService';
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmedPassword, setConfirmedPassword ] = useState('')
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const auth = authService()

  const handleSubmit =async (e) => {
    e.preventDefault();
    
    try {
      if (!username || !password || !confirmedPassword ){
        setError('all fields must be set ')
      }else if (password !== confirmedPassword ){
        setError('check password ')
      }else if (username && password === confirmedPassword ){
        localStorage.setItem("username" , username)
        await auth.signup(username, password);
        navigate('/dashboard'); // Redirect to dashboard after successful signup
      }

    } catch (error) {
      setError(`Error signing up. Please try again. ${error }`);
    }
  };

  const handleLogin = (e) =>{
    e.preventDefault()
    navigate("/login")
  }

  
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

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control type="password" placeholder="Enter password" value={confirmedPassword} onChange={(e) => setConfirmedPassword(e.target.value)} />
            </Form.Group>


            <Button variant="primary" type="button" onClick={(e)=>{handleSubmit(e)}}>
              Sign Up
            </Button>
            <Button variant="primary" type="button" onClick={(e)=>{handleLogin(e)}} >
              Login
            </Button>

            {error && <p className="text-danger mt-2">{error}</p>}
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default SignupPage;
