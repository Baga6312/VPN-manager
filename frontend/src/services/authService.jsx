import axios from 'axios'  ; 
import { useEffect, useState } from 'react';
import runCmd from './script'
import { useNavigate } from 'react-router-dom';



const authService = () => { 

  const baseurl = "http://192.168.62.86:5000/api"
  const [err, setError] = useState('')
  const [data , setData ] = useState({})
  const history = useNavigate();

  const login = async (username, password) => {
    try {

      const response = await axios.post(`${baseurl}/user`, { username, password });
      const token = response.data.accessToken;
      const headers = { authorization: `Bearer ${token}` };
  
      const response2 = await axios.get(`${baseurl}/user`, { headers });
      localStorage.setItem("username",response2.data.message[0].username)
      localStorage.setItem("question",response2.data.message[0].supportAndHelp)
      localStorage.setItem("connection",response2.data.message[0].isConnected)

      if (response2.data.message === 'invalid token'){
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
    const data = response.data.message 
    if (data) {
      setError('error signing up , try again later')
    }else { 
      setData(data)
    }
  
  };

  const runcmd = async () => {
    return runCmd('firefox')
  }

  const logout = () => {
    try{
      localStorage.clear()
      history('/login');
    }catch(err){
      console.log(err)
    }
  };

  const getCurrentData = () => {
    return  [
      localStorage.getItem("username") , 
      localStorage.getItem("connection") , 
      localStorage.getItem("question") , 
    ]
  };


  return {
    runcmd, 
    login,
    logout,
    getCurrentData  ,
    signup,
    err, 
  };
}

export default authService ; 