import axios  from 'axios'
import {useState} from 'react'


const Modifdata = () => { 
  const [isUpdating , setIsUpdating] = useState(false)

  const updateData = (event) => { 
    event.preventDefault()
    setIsUpdating(true)
    try { 
      axios.put("http://localhost:8000/test") 
    } catch(err ){ 
      console.log(err)
    } finally {
      setIsUpdating(false)
    }
  }
return(
  <div>
      {isUpdating ? 'updating...' : <input value="modify ur da" type="button" onClick={updateData} />} 
  </div>

)

}

export default Modifdata 
