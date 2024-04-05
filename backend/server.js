require("dotenv").config()
const express = require('express');
const cors = require("cors"); 
const app = express()
const PORT = process.env.PORT || 5000;
const mariadb = require('mariadb')


app.use(cors())
app.use(express.json()) 
app.use(express.urlencoded({ extended: true }))


const pool = mariadb.createPool({
  host : 'localhost' , 
  user : 'root' , 
  password : 'password', 
  database : 'testing' , 
  connectionLimit : 5 
})


app.get('/api/user' , async (req , res)=>{

   const username = req.query.username ; 
   const password = req.body.password
   let conn ; 

   try { 
    conn = await pool.getConnection(); 
    const rows = await pool.query (`SELECT * FROM etudiant WHERE name = ? ` , [username]) 
    console.log(rows)
    res.json(rows)

   }catch(err) { 

    console.error('Error fetching dat: ',err);
    res.status(500).send('Internal server Error')

   }finally { 

    (conn) ? conn.release() : null ; 

   }

})

app.listen(PORT , ()=>{
  try {
    console.log(`server is listening on port ${PORT}`)
  }catch (err) { 
    console.error(`Error ${err}`)
  }
})
