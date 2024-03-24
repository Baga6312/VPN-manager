const express= require("express")
const app = express()
const cors= require("cors")
const bodyParser = require("body-parser")
const mariadb = require("mariadb")

const pool = mariadb.createPool({ 
  host : "localhost", 
  user : "root" , 
  password : "password" , 
  database : "testing" ,
  connectionLimit : 10
})
 
app.use(bodyParser.urlencoded({extended:false})) ; 


app.use(cors())
app.use(express.json())

app.post("/test" , async(req, res)=> {  
    var values = [
    req.body.name.toString(), 
    req.body.mail.toString(), 
    req.body.passwor.toString()
    ]
    const rows = await pool.query("INSERT INTO etudiant (name , mail , password ) VALUES (?)", [values])
      .then((result)=>console.log("data posted succefull "))
      .catch((err)=>{console.log(err)}) 
})

app.get("/test", async (req , res )=> { 
      const rows = await pool.query("SELECT * FROM etudiant")
      console.log(rows)
      res.send(rows)
})

app.listen(8000, ()=> { 
  console.log("server started succefull")
})
