import {useState } from 'react'  ; 

const Showdata= () => { 
  const [isLoading , setIsLoading] = useState(false) 
  const [dataUser , setDataUsers] = useState([])

  const fetchData = async (event) => { 
    event.preventdefault() 
    setIsLoading(true) 
    try { 
      const response = await fetch("http://localhost:8000/test").json()
      setDataUsers(response)
    }catch (err ){ 
      console.log(err)
    } finally {
      setIsLoading(false)
    }

  }
  return(
    <div>
      {isLoading ? 'Loading ... ' : <input type='button' disabled={isLoading} onClick={fetchData}/>}
      <ul>
        {dataUser.length && (
        dataUser.map((user)=>
          <li key="user">{user.name}</li>)
        )}
      </ul>
    </div>
  )
}

export default Showdata 
