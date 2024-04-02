const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const mariadb = require('mariadb');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());

const pool = mariadb.createPool({
  host: 'localhost',
  user: 'your_db_username',
  password: 'your_db_password',
  database: 'vpn_management_db',
  connectionLimit: 5
});

const SECRET_KEY = 'your_secret_key';

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Routes
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  // Retrieve user from database
  let conn;
  try {
    conn = await pool.getConnection();
    const rows = await conn.query("SELECT * FROM users WHERE username = ?", [username]);
    const user = rows[0];

    // Check if user exists and password is correct
    if (user && bcrypt.compareSync(password, user.password)) {
      // Generate JWT token
      const token = jwt.sign({ username: user.username }, SECRET_KEY);
      res.json({ token });
    } else {
      res.status(401).json({ error: 'Invalid username or password' });
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'An unexpected error occurred' });
  } finally {
    if (conn) conn.release(); // Release the connection
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
