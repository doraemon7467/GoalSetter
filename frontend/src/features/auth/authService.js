import axios from 'axios'


// Register user
const register = async (userData) => {
  const response = await axios.post('https://goal-setter-backend-one.vercel.app/api/users', userData)

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }

  return response.data;
}

// Login user
const login = async (userData) => {
  const response = await axios.post('https://goal-setter-backend-one.vercel.app/api/users/login', userData)

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }

  return response.data
}

// Logout user
const logout = () => {
  localStorage.removeItem('user');
  console.log("User deleted");
}

const authService = {
  register,
  logout,
  login,
}

export default authService