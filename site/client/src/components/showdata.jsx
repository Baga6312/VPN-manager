import axios from  'axios'
import { useEffect , useState } from 'react'  ; 

const Showdata= () => { 
  const [isLoading , setIsLoading] = useState(false) 
  const [userData , setUserData ] = useState([])


  const fetchData = async (event) => { 
    event.preventDefault()
    setIsLoading(true)
    try{ 
      const data = await axios.get("http://localhost:8000/test").then(({data})=> setUserData(data ))
    }catch(err){ 
      console.log(err)
    }finally{ 
      setIsLoading(false)
    }
  }

  useEffect(()=> { fetchData()
  },[])

  return(
    <div>
      {isLoading ? 'Loading ...' : (<input 
                                    type='button'
                                    disabled={isLoading} 
                                    value="show users" 
                                    onClick={fetchData}
                                    />) }
                                    
      <ul>
        {userData.length > 0 && (
         userData.map((user)=>
          <li key="user.mail">{user.name}</li>
          ))}
      </ul>
    </div>
  )
}

export default Showdata 

