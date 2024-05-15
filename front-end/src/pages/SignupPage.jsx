import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import  authService  from '../services/authService';
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmedPassword, setConfirmedPassword ] = useState('')
  const [isShaking , setIsShaking] = useState(false)
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const auth = authService()

  const handleSubmit =async (e) => {
    e.preventDefault();
    
    try {
      if (!username || !password || !confirmedPassword ){

        setError('all fields must be set ')
        setIsShaking(true);
        setTimeout(() => {
          setIsShaking(false);
        }, 1000); 

      }else if (password !== confirmedPassword ){

        setError('check password ')
        setIsShaking(true);
        setTimeout(() => {
          setIsShaking(false);
        }, 1000); 

      }else if (username && password === confirmedPassword ){
        localStorage.setItem("username" , username)
        localStorage.setItem("question" , null)
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
          <Form className="login-box" onSubmit={handleSubmit}>
            <div id="container">
            <h2 className='login-header'>Sign Up</h2>
              <div id="formHeader">
                <input id="formBasicInput" type="text" placeholder="Enter username" value={username} onChange={(e) => setUsername(e.target.value)} />
              </div>

              <div id="formHeader">
                <input id="formBasicInput" type="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>

              <div id="formHeader">
                <input id="formBasicInput" type="password" placeholder="Confirm password" value={confirmedPassword} onChange={(e) => setConfirmedPassword(e.target.value)} />
              </div>

              <div id="btns">
                <button id="submit-btn" variant="primary" type="button" onClick={(e)=>{handleSubmit(e)}}>Sign Up</button>
                <button id="regi-btn" variant="primary" type="button" onClick={(e)=>{handleLogin(e)}} >Login</button>
              </div>

              {error && <p className={isShaking && error ? 'error-text' : 'red-text'}>{error}</p>}
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default SignupPage;
