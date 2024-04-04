import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const authService = () => { 
  const [currentUser, setCurrentUser] = useState(null);
  const history = useNavigate();

  const login = (username, password) => {
    if (username ) {
     //  === JSON.parse(localStorage.getItem('user'))) {
      const user = { username };
      setCurrentUser(user);
      // localStorage.setItem('user', JSON.stringify(user));
      history('/dashboard');  
      return true;
    } else {
      console.error("user does not exist ")
    }
  };

  const signup = (username, password) => {
    const newUser = { username };
    setCurrentUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
    history('/dashboard'); 
  };


  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('user');
    history('/login');  
  };

  const  getCurrentUser = () => {
    const user = localStorage.getItem('user');
    console.log(user)
    return JSON.parse(user);
  };

  return {
    login,
    logout,
    signup,
    getCurrentUser,
    currentUser, 
  };
}

export default authService ; 