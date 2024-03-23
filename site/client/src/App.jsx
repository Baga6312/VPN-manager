import { useState } from 'react'
import './App.css'

function App() {
  const [name , setName] = useState('')
  const [mail , setMail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading , setIsLoading] = useState(false)
  const [dataUsers , setDataUsers] = useState([]) 
  const [err , setError] = useState(null)

  const fetchDatausers = async () => { 
    setIsLoading(true)
    setError(null) 
    try {
    const response = await fetch("http://localhost:8000/test") , { 
      method:'GET' , 
      headers {
          'Content-Type' : 'application/json'
        }
      },
      }catch(err){ 
        setError(err)
      }finally{ 
        setIsLoading(false)
    }
  }






  const RegisterUser = async (event) => { 
    event.preventDefault()
    const response = await  fetch("http://localhost:8000/test" , { 
      method: 'POST',
      headers: {
        'Content-Type':'application/json' 
      },
      body: JSON.stringify({
        name , 
        mail , 
        password, 
      })
    })
    const data = await response.json()
    console.log (data)
  }

  return (
  <div>
    <form onSubmit={RegisterUser}>
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
      <input type="submit" value="Register"/> 
    
    </form>
  </div>
  )
}

export default App
