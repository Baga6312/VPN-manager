import axios from 'axios'  ; 
import { useState } from 'react';
import { redirect, useNavigate } from 'react-router-dom';

const authService = () => { 

  const baseurl = "http://localhost:5000/api/user"
  const [currentUser, setCurrentUser] = useState(null);
  const history = useNavigate();

  const login = async (username, password) => {

    try {
    const response = await  axios.get(`${baseurl}/` ,  
    {params: { username: username }})
    const user = JSON.parse(response.request.response)[0].name
    console.log(user)
      // if ( data[0] === username && data[1] === password ){
    setCurrentUser(user)
    localStorage.setItem('username' , user)
    history('/dashboard')
    return true
    }
    catch(err) {
      console.log(err)
    }
  };

  const signup = (username, password) => {
    axios.post(`${baseurl}` ,  {username , password }).then((data)=>{
      setCurrentUser(username) 
      console.log("data posted successfully")
    }).catch((err)=>{
      console.log(err)
    })
    history('/dashboard'); 
  };

  const logout = (currentUser) => {
    setCurrentUser(null);
    axios.put(`${baseurl}` , {currentUser})
    history('/login');  
  };

  const getCurrentUser = () => {
    return localStorage.getItem("username") 
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