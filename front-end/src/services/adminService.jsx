import axios from 'axios';


const adminService = () => {
    const baseurl = "http://localhost:5000/api/admin"

    const getUsers = async () => {
        try {
            const response = await axios.get(`${baseurl}/users`, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            return response.data;
        }
        catch (error) {
            console.error('Error during authentication:', error);
            return 'An error occurred. Please try again later.';
        }
    }

    const deleteNetwork = async (id) => {
        try {
            await axios.delete(`${baseurl}/network/${id}`, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
        }
        catch (error) {
            console.error('Error during authentication:', error);
            return 'An error occurred. Please try again later.';
        }
    }

    const updateNetwork = async (id, network, ip) => {
        try {
            await axios.patch(`${baseurl}/network/${id}`, { network, ip }, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
        }
        catch (error) {
            console.error('Error during authentication:', error);
            return 'An error occurred. Please try again later.';
        }
    }

    const deleteUser = async (id) => {
        try {
            await axios.delete(`${baseurl}/user/${id}`, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
        }
        catch (error) {
            console.error('Error during authentication:', error);
            return 'An error occurred. Please try again later.';
        }
    }

    const updateUser = async (id, username) => {
        try {
            await axios.patch(`${baseurl}/user/${id}`, { username }, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
        }
        catch (error) {
            console.error('Error during authentication:', error);
            return 'An error occurred. Please try again later.';
        }
    }


    return {
        getUsers,
        deleteNetwork,
        updateNetwork,
        deleteUser,
        updateUser
    };
}

export default adminService; 
