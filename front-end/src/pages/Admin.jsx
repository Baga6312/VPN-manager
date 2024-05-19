import { useState, useEffect } from 'react';
import authService from '../services/authService';
import adminService from '../services/adminService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { faUser, faTrash, faEdit } from '@fortawesome/free-solid-svg-icons'


const DashboardPage = () => {
  const [userData, setUserData] = useState([]);
  const [users, setUsers] = useState([])
  const navigate = useNavigate();
  const auth = authService()
  const admin = adminService()

  useEffect(() => {
    const user = auth.getCurrentData()
    if (!user) {
      navigate('/login');
    } else {
      setUserData(user)
    }

  }, [navigate]
  );

  const fetchUsers = async () => {
    try {
      const users = await admin.getUsers();
      users.map((user) => {
        user.open = false
        return user;
      })
      setUsers(users);
    }
    catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, []);


  const handleLogout = () => {
    auth.logout();
    navigate('/login');
  };

  const handleClickOnUser = (id) => {
    const userss = users.map((user) => {
      if (user.id == id)
        user.open = !user.open
      else
        user.open = false
      return user;
    })
    setUsers([...userss])
  }

  const handleDeleteNetwork = async (id) => {
    try {
      const a = confirm('Are you sure you want to delete this network?');
      if (!a) return;
      await admin.deleteNetwork(id);
      await fetchUsers();
      alert('Network deleted successfully');
    } catch (err) {
      console.log(err)
    }
  }

  const handleEditNetwork = async (network) => {
    try {
      const newValue = prompt('Enter new network', network.network);
      if (!newValue) return;
      await admin.updateNetwork(network.id, newValue, network.ip);
      await fetchUsers();
      alert('Network updated successfully');
    } catch (err) {
      console.log(err)
    }
  }

  const handleEditIp = (network) => {
    const newValue = prompt('Enter new ip', network.ip);
    if (!newValue) return;
    admin.updateNetwork(network.id, network.network, newValue);
    fetchUsers();
    alert('Ip updated successfully');
  }

  const handleDeleteUser = async (id) => {
    try {
      const a = confirm('Are you sure you want to delete this user?');
      if (!a) return;
      await admin.deleteUser(id);
      await fetchUsers();
      alert('User deleted successfully');
    } catch (err) {
      console.log(err)
    }
  }

  const handleEditUsername = async (user) => {
    try {
      const newValue = prompt('Enter new username', user.username);
      if (!newValue) return;
      await admin.updateUser(user.id, newValue);
      await fetchUsers();
      alert('User updated successfully');
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Container className="mt-4" style={{ backgroundColor: "#b31313", height: 'auto' }}>
      <ul style={{ backgroundColor: "#b31313" }}>
        <div id="navi">
          <li>
            <h2> Welcome, {userData[0]} </h2>
          </li>
          <li id="container">
            <button id="button" onClick={handleLogout}>Logout</button>
          </li>
        </div>
        <li className="infos" style={{ width: "70vw" }} >
          {
            users.map((user, index) => {
              return (
                <div key={index}>
                  <div onClick={(e) => { e.preventDefault(); handleClickOnUser(user.id) }} id="container-1" style={{ backgroundColor: "#ea906d", marginBottom: "20px" }}>
                    <div style={{
                      display: 'flex',
                      margin: '10px',
                      marginTop: '20px',
                    }}>
                      <FontAwesomeIcon style={{
                        height: '50px', marginRight: '10px'
                      }} icon={faUser} />
                      <div id="icons">
                        <p><strong>{user.username}</strong></p>
                      </div>
                    </div>
                    <div style={{ display: 'flex' }}>
                      <p>
                        <FontAwesomeIcon style={{
                          margin: '10px',
                          marginTop: '20px',
                          height: '20px'
                        }} onClick={(e) => { e.preventDefault(); handleDeleteUser(user.id) }} icon={faTrash} />
                      </p>
                      <p>
                        <FontAwesomeIcon style={{
                          margin: '10px',
                          marginTop: '20px',
                          height: '20px'
                        }} onClick={(e) => { e.preventDefault(); handleEditUsername(user) }} icon={faEdit} />
                      </p>
                    </div>
                    <div>
                      <p style={{
                        marginTop: '26px',
                        marginRight: '15px',
                        color: user.isConnected ? 'green' : 'gray',
                        backgroundColor: user.isConnected ? 'green' : 'gray',
                        borderRadius: '30px'
                      }}>sex</p>
                    </div>
                  </div>
                  {user.open && <div id="container-1" style={{ backgroundColor: "#ea906d", marginBottom: "20px", margin: 40, width: 'auto', display: 'block', cursor: 'auto' }}>
                    <div><p style={{ textAlign: 'left', margin: 20, marginTop: 40 }}>Connected Networks</p></div>
                    {user.networks.length > 0 ? user.networks.map((network, index) => {
                      return (
                        <div key={index} id="container-1" style={{ backgroundColor: "white", display: 'flex', margin: 20, width: 'auto', cursor: 'auto' }}>
                          <p style={{ margin: 10 }}>
                            <FontAwesomeIcon style={{
                              height: '20px',
                              cursor: 'pointer',
                            }} onClick={(e) => { e.preventDefault(); handleEditNetwork(network) }} icon={faEdit} />
                            <span>{network.network}</span>
                          </p>
                          <p style={{ margin: 10 }}>
                            <FontAwesomeIcon style={{
                              height: '20px',
                              cursor: 'pointer',
                            }} onClick={(e) => { e.preventDefault(); handleEditIp(network) }} icon={faEdit} />
                            <span>{network.ip}</span>
                          </p>
                          <p style={{ margin: 10 }}>
                            <FontAwesomeIcon style={{
                              height: '20px',
                              cursor: 'pointer',
                            }} onClick={(e) => { e.preventDefault(); handleDeleteNetwork(network.id) }} icon={faTrash} />
                          </p>
                        </div>
                      )
                    }) : <p style={{ margin: 20, fontWeight: 700 }}>No networks connected</p>}
                    <p>.</p>
                  </div>}
                </div>
              )
            })
          }

        </li>
      </ul>
    </Container>
  );
};


export default DashboardPage;