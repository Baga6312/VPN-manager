import React, { useState } from 'react';
import axios from 'axios'; 

const AuthService = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/login', { username, password });
      const { token } = response.data;

      localStorage.setItem('token', token);

      window.location.href = '/dashboard';
    } catch (error) {
      setError('Invalid username or password');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');

    window.location.href = '/login';
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Login</button>
      </form>
      {error && <p>{error}</p>}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default AuthService;
