import axios from 'axios'


// Register user
const register = async (userData) => {
  const response = await axios.post('https://backend-service-y6sj.onrender.com/api/users', userData)

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }

  return response.data;
}

// Login user
const login = async (userData) => {
  const response = await axios.post('https://backend-service-y6sj.onrender.com/api/users/login', userData)

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }

  return response.data
}

// Logout user
const logout = () => {
  localStorage.removeItem('user');
  console.log("User deleted from local storage");
}

const authService = {
  register,
  logout,
  login,
}

export default authService