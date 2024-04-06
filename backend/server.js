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


app.put ('/api/user' , async(req ,res )=>{ 
  const username = req.body.username ; 
  const authenthicated = req.body.Authenticated
  try { 

    conn = await pool.getConnection(); 
    await pool.query (`UPDATE users SET IS_CONNECTED = ? WHERE username = ? ; ` , [authenthicated , username]) 

  }catch ( err ) { 

    console.error(`error : ${err}`);
  }finally { 
  
    (conn) ? conn.release() : null ; 

  }
})

app.post('/api/user' , async(req , res) => { 
  const username = req.body.username;
  const password = req.body.password; 

  try { 

    conn = await pool.getConnection(); 
    const rows =  await pool.query (` INSERT INTO users (username , password ) VALUES ('${username}' , '${password}'); ` , [username , password ]) 
    
    console.log(rows)

  }catch(err) { 

   console.error('Error fetching dat: ',err);
   res.status(500).send('Internal server Error')

  }finally { 

   (conn) ? conn.release() : null ; 

  }

})

app.get('/api/user' , async (req , res)=>{

  //  const username = req.query.username ; 
  //  const password = req.body.password
  //  let conn ; 

  //  try { 
  //   conn = await pool.getConnection(); 
  //   const rows = await pool.query (`SELECT * FROM users WHERE username = ? ` , [username]) 
  //   console.log(rows)
  //   res.json(rows)

  //  }catch(err) { 

  //   console.error('Error fetching dat: ',err);
  //   res.status(500).send('Internal server Error')

  //  }finally { 

  //   (conn) ? conn.release() : null ; 

  //  }
})

app.listen(PORT , ()=>{
  try {
    console.log(`server is listening on port ${PORT}`)
  }catch (err) { 
    console.error(`Error ${err}`)
  }
})
