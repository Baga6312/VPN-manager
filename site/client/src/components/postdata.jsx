
const Postdata = ( name, mail, password  )=> { 

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
        password  
      })
    })
    const data = await response.json()
    console.log (data)
  }

  return(
  <div>
      <input type="button" value="Register" onClick={RegisterUser}/> 
  </div>
  )
}

export default Postdata 
