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
const WebSocket = require("ws")
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const pool = mariadb.createPool({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'testing',
  connectionLimit: 5
})

const admin = {
  username: "admin",
}


const authenticate = (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) return res.sendStatus(401)

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
    if (err) return res.sendStatus(403)

    if (data.name == admin.username)
      data.isAdmin = true

    req.user = data
    next()
  })
}

const adminVerification = (req, res, next) => {
  if (req.user.isAdmin) {
    next()
  } else {
    res.sendStatus(403)
  }
}

// server.js

app.get('/api/getinfo', async (req, res) => {
  const intervalId = setInterval(() => {
    const child = spawn("sudo", ["wg"]);

    child.stdout.on('data', (data) => {
      const info = data.toString().split(' ');
      for (let i = 0; i < info.length; i++) {
        if (info[i] === "transfer:") {
          const data = info[i] + " " + info[i + 1] + " " + info[i + 2] + " " + info[i + 3] + " " + info[i + 4] + " " + info[i + 5]
          console.log(data)
          wss.on('connection', (ws) => {
            ws.send(JSON.stringify(data))
          })
        }
      }
    }, 1000)
  })
})

app.get('/api/user', authenticate, async (req, res) => {

  const username = req.user.name;
  const password = req.user.pass
  try {
    const object = await pool.query('SELECT * FROM users WHERE username = ? AND password = ? ', [username, password])

    if (object.length > 0) {
      await pool.query(`UPDATE users SET isConnected = ${true} WHERE username = '${username}' AND password = '${password}'`)
      res.json({ message: object })
    }
    else { res.json({ message: "invalid token" }) }

  } catch (err) {
    res.json({ error: "server error " })
  }
})

app.post('/api/register', async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const response = await pool.query(`INSERT INTO users (username , password, isConnected , age) VALUES ('${username}' , '${password}'  , ${false} , ${Math.floor(Math.random() * 50)})`)
  res.json({ message: 'success' })

})

app.post('/api/user', (req, res) => {
  const username = req.body.username
  const password = req.body.password

  const user = { name: username, pass: password }

  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
  res.json({ accessToken: accessToken })
})

app.post('/api/logout', authenticate, async (req, res) => {
  const username = req.user.name;
  const password = req.user.pass;

  await pool.query(`UPDATE users SET isConnected = ${false} WHERE username = '${username}' AND password = '${password}'`)
  res.json({ message: "success" })
})


//  ------------------------- admin apis -------------------

// get users with their networks
app.get('/api/admin/users', authenticate, adminVerification, async (req, res) => {
  const users = await pool.query('SELECT * FROM users');
  const network = await pool.query('SELECT * FROM network')

  for (const user of users) {
    user.networks = network.filter(n => n.user === user.id)
  }
  res.json(users)
})

// update network by id
app.patch('/api/admin/network/:id', authenticate, adminVerification, async (req, res) => {
  const id = req.params.id
  const { network, ip } = req.body
  await pool.query(`UPDATE network SET network = '${network}', ip = '${ip}' WHERE id = ${id}`)
  res.json({ message: "success" })
});

// delete network by id
app.delete('/api/admin/network/:id', authenticate, adminVerification, async (req, res) => {
  const id = req.params.id
  await pool.query(`DELETE FROM network WHERE id = ${id}`)
  res.json({ message: "success" })
});

// delete user by id
app.delete('/api/admin/user/:id', authenticate, adminVerification, async (req, res) => {
  const id = req.params.id
  await pool.query(`DELETE FROM users WHERE id = ${id}`)
  res.json({ message: "success" })
});

//update user by id
app.patch('/api/admin/user/:id', authenticate, adminVerification, async (req, res) => {
  const id = req.params.id
  const { username } = req.body
  await pool.query(`UPDATE users SET username = '${username}' WHERE id = ${id}`)
  res.json({ message: "success" })
});

// this function can be used to add new user to network
async function addUserToNetwork(userId, network, ip) {
  await pool.query(`INSERT INTO network (user, network, ip) VALUES (${userId}, '${network}', '${ip}')`)
}

server.listen(5000, () => {
  console.log("server is running on port 5000")
})