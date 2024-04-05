import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const authService = () => { 

  const baseurl = "HTTP://localhost:3000/api/"
  const [currentUser, setCurrentUser] = useState(null);
  const history = useNavigate();

  const login = (username, password) => {
    // change this shit with jwt  
    axios.get(`${baseurl}user`).then((data )=>{
      console.log(`user : ${data}`)
      if ( data[0] === username && data[1] === password ){
        setCurrentUser(data[0])
        history('/dashboard')
        return true 
      }
    }).catch((err)=>{
      console.log(`error loging in : ${err}`)
    })
  };

  const signup = (username, password) => {
    axios.post(`${baseurl}user` ,  {username , password }).then((data)=>{
      setCurrentUser(username) 
      console.log("data posted successfully")
    }).catch((err)=>{
      console.log(err)
    })
    history('/dashboard'); 
  };

  const logout = (currentUser) => {
    setCurrentUser(null);
    axios.put(`${baseurl}user` , {currentUser})
    history('/login');  
  };

  const  getCurrentUser = () => {
    let user ;
    axios.get(`${baseurl}user`).then((data)=>{
      user = data ; 
    }).catch((err)=>{
      console.log(err)
    })
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