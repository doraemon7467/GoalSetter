import axios from 'axios'


axios.defaults.withCredentials = true;

// Create new goal
const createGoal = async (goalData,completeTime,priority, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.post('https://goal-setter-backend-one.vercel.app/api/goals', {text : goalData, completeTime, priority}, config)

  return response.data
}

// Get user goals
const getGoals = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get('https://goal-setter-backend-one.vercel.app/api/goals', config)

  return response.data
}

// Delete user goal
const deleteGoal = async (goalId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.delete(`https://goal-setter-backend-one.vercel.app/api/goals/${goalId}`, config)

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

  const response = await axios.put(`https://goal-setter-backend-one.vercel.app/api/goals/${goalId}`, {text : goalData, completeTime, priority}, config)

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