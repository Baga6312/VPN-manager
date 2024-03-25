import {  useState } from 'react'
import './App.css'
import Showdata from './components/showdata.jsx'
import Postdata from './components/postdata.jsx'
import Modifdata from './components/modifdata.jsx'

function App() {
  const [name , setName] = useState('')
  const [mail , setMail] = useState('')
  const [password, setPassword] = useState('')

  return (
  <div>
    <form >
    <h1>Register</h1>
      <input 
              value={name}
              onChange={(e)=> setName(e.target.value)}
              type="text" 
              placeholder="First name "/><br/>
      <input 
              value={mail}
              onChange={(e)=> setMail(e.target.value)}
              type="email" 
              placeholder="Email"/><br/>
      <input 
              value={password}
              onChange={(e)=> setPassword(e.target.value)}
              type="password" 
              placeholder="password"/><br/>
      <Postdata name={name} mail={mail} password={password} /> 
      <Showdata />
      <Modifdata />

    </form>
  </div>
  )
}

export default App 
