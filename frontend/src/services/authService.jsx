import axios from 'axios'  ; 
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';



const authService = () => { 

  const baseurl = "http://localhost:5000/api/user/"
  const [currentUser, setCurrentUser] = useState(``);
  const [IsAuthenthicated,setIsAuthenthicated] = useState(false)
  const history = useNavigate();


  useEffect(() => {
    const user = localStorage.getItem('username');
    setCurrentUser(user || ''); 
    setIsAuthenthicated(!user )
  },[])

  const setEnv = async (user, val) => {
    if (val) {    
      setCurrentUser(user);
      axios.put(baseurl, { Authenticated: true, username: user }); // Send authenticated state
      localStorage.setItem('username', user);
    } else {
      await axios.put(baseurl, { Authenticated: false, username: currentUser}); // Send unauthenticated state
      localStorage.removeItem('username');
      setCurrentUser('');
      history('/login');
    }
  };

  const login = async (currentUser, password) => {

    try {
      const response = await  axios.get(`${baseurl}` , {params: { username: currentUser}})
      const user = JSON.parse(response.request.response)[0].username
      setIsAuthenthicated(true)
      setEnv(currentUser,true)
      history('/dashboard')
    }catch(err) {
      console.log(err)
    }
  };

  const signup = async (username, password) => {

    try {
    const response = await axios.post(baseurl , {username , password}) ;
    const user = JSON.parse(response.request.response)[0].username

    setEnv(user,true)
    
    } catch(err){
      console.error(err)
    }
  };

  const logout = (currentUser) => {
    try{
      setIsAuthenthicated(false)
      setEnv(currentUser , false)
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
    signup,
    getCurrentUser,
    currentUser, 
  };
}

export default authService ; 