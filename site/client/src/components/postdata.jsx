import axios from 'axios'

const baseurl = "http://localhost:8000"

const Postdata = ({name , mail , password })=> { 

  const RegisterUser = async (event) => { 
    event.preventDefault()
    axios.post(`${baseurl}/test` , {name , mail , password})
  }

  return(
  <div>
      <input type="button" value="Register" onClick={RegisterUser}/> 
  </div>
  )
}

export default Postdata 
