import axios from 'axios'


// Create new goal
const createGoal = async (goalData,completeTime,priority, token) => {
  // Configuring the headers with Authorization token
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  // Making a POST request to create a new goal
  const response = await axios.post('https://backend-service-y6sj.onrender.com/api/goals', {text : goalData, completeTime, priority}, config)

  return response.data  // Returning the response data from the API
}

// Get user goals
const getGoals = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  // Making a GET request to retrieve user goals
  const response = await axios.get('https://backend-service-y6sj.onrender.com/api/goals', config)

  return response.data  // Returning the response data from the API
}

// Delete user goal
const deleteGoal = async (goalId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

   // Making a DELETE request to delete a user goal by its ID
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
  console.log("Ayush");
  console.log(completeTime);
  // console.log(goalId);
  // console.log(token);

  // Making a PUT request to update a user goal by its ID
  const response = await axios.put(`https://backend-service-y6sj.onrender.com/api/goals/${goalId}`, {text : goalData, completeTime, priority}, config)

  console.log(response);

  return response.data
}

// Exporting functions to be used externally
const goalService = {
  createGoal,
  getGoals,
  deleteGoal,
  updateGoal
}

export default goalService