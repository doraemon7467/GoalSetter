import axios from 'axios'


// Create new goal
const createGoal = async (goalData,completeTime,priority, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.post('https://backend-service-y6sj.onrender.com/api/goals', {text : goalData, completeTime, priority}, config)

  return response.data
}

// Get user goals
const getGoals = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get('https://backend-service-y6sj.onrender.com/api/goals', config)

  return response.data
}

// Delete user goal
const deleteGoal = async (goalId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.delete(`https://backend-service-y6sj.onrender.com/api/goals/${goalId}`, config)

  console.log(response);

  return response.data
}

// Update user goal
const updateGoal = async (goalId, goalData,completeTime,priority, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  console.log(goalData);
  // console.log(goalId);
  // console.log(token);

  const response = await axios.put(`https://backend-service-y6sj.onrender.com/api/goals/${goalId}`, {text : goalData, completeTime, priority}, config)

  console.log(response);

  return response.data
}

const goalService = {
  createGoal,
  getGoals,
  deleteGoal,
  updateGoal
}

export default goalService