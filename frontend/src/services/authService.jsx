import axios from 'axios'  ; 
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


const authService = () => { 

  const baseurl = "http://localhost:5000/api"
  const [err, setError] = useState('')
  const history = useNavigate();

  const login = async (username, password) => {
    try {

      const response = await axios.post(`${baseurl}/user`, { username, password });
      const token = response.data.accessToken;
      const headers = { authorization: `Bearer ${token}` };
  
      const response2 = await axios.get(`${baseurl}/user`, { headers });
      
      if (response2.data.message === 'invalid token'){
        localStorage.clear()
        setError("invalid username or password")
      }else{ 
        history('/dashboard')
      }
      
    } catch (error) {
      console.error('Error during authentication:', error);
      setError('An error occurred. Please try again later.');
    }
  };
  

  const signup = async (username, password) => {

    const response = await axios.post(`${baseurl}/register` , {username : username , password : password }) 
    const userdata = response.data.message 
    console.log(userdata)
    if (userdata) {
      setError('error signing up , try again later')
    }else { 
      setData(userdata)
    }
  
  };

  const logout = () => {
    try{
      localStorage.clear()
      history('/login');
    }catch(err){
      console.log(err)
    }
  };

  const getCurrentUser = () => {
    return localStorage.getItem("username") 
  };

  return {
    login,
    logout,
    getCurrentUser,
    signup,
    getCurrentUser,
    err, 
  };
}

export default authService ; 