require("dotenv").config()
const express = require('express');
const cors = require("cors"); 
const app = express()
const jwt = require("jsonwebtoken")
const mariadb = require('mariadb')
const { spawn } = require("child_process"); 

app.use(cors())
app.use(express.json()) 
app.use(express.urlencoded({ extended: true }))

const http = require('http'); 
const { Server } = require("socket.io") 
const server = http.createServer(app)

const io = new Server(server,{
  cors : {
    origin: "http://localhost:5173" , 
    methods: ["GET" , "POST"], 
  },
})

const pool = mariadb.createPool({
  host : 'localhost' , 
  user : 'root' , 
  password : 'password', 
  database : 'testing' , 
  connectionLimit : 5 
})


const authenticate = (req, res ,next ) =>{
  const authHeader = req.headers['authorization']
  const token =authHeader &&  authHeader.split(' ')[1]
  
  if (token == null ) return res.sendStatus(401)

  jwt.verify(token , process.env.ACCESS_TOKEN_SECRET , (err , data )=>{
    if (err) return res.sendStatus(403)
    
    req.user = data
    next()
  })
}

// server.js

app.get('/api/getinfo', async (req, res) => {
  const intervalId = setInterval(() => {
    const child = spawn("sudo", ["wg"]);

    child.stdout.on('data', (data) => {
      const info = data.toString().split(' ');
      for (let i = 0; i < info.length; i++) {
        if (info[i] === "transfer:") {
          console.log(info[i] + " " + info[i + 1] + " " + info[i + 2] +" "+ info[i + 3] +" "+ info [ i + 4]+" "+info[i+5]);
          io.on("connection" , (socket)=> {
            const data = info[i] + " " + info[i + 1] + " " + info[i + 2] +" "+ info[i + 3] +" "+ info [ i + 4]+" "+info[i+5] 
            socket.emit("data_cast" , (data))
          })
        }
      }
    });

  }, 1000); 
  setTimeout(() => {
    clearInterval(intervalId);
  }, 60000); 
});


app.get('/api/user' , authenticate , async (req,res)=>{

  const username = req.user.name; 
  const password = req.user.pass
  try {
  const object = await pool.query('SELECT * FROM users WHERE username = ? AND password = ? ' , [username , password])
    
  if (object.length > 0 )
    {res.json({message : object })}
  else 
    {res.json({message : "invalid token"})}

  }catch (err) { 
    res.json({error : "server error "})
  }
} )

app.post('/api/register' , async(req ,res )=> { 
  const username = req.body.username ; 
  const password = req.body.password; 

  const response = await pool.query(`INSERT INTO users (username , password, isConnected , age) VALUES ('${username}' , '${password}'  , ${false} , ${Math.floor(Math.random() * 50)})`) 
  res.json({message : 'success'})

})

app.post('/api/user' , (req , res ) => { 
  const username = req.body.username
  const password = req.body.password

  const user = {name : username , pass : password}

  const accessToken = jwt.sign(user , process.env.ACCESS_TOKEN_SECRET ) 
  res.json({accessToken : accessToken})
})



server.listen(5000 , ()=> { 
  console.log("server is running on port 5000")
})