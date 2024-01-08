import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import goalService from './goalService'

// Define initial state for the goals slice  when the application starts or when the store is created. 
const initialState = {
  goals: [],  // Array to hold the goals data fetched from the API.
  // Flags to manage different states
  isError: false,  // Flag to indicate if an error occurred
  isSuccess: false, // Flag to indicate if the action was successful
  isLoading: false, // Flag to indicate if the action is currently loading
  message: '',    // Message to store any relevant information or error messages
}

// Async thunk functions for creating, getting, deleting, and updating goals
// Create new goal
export const createGoal = createAsyncThunk(
  'goals/create',  //Specifies the type of Action  . A string that identifies this async action in Redux DevTools
  async ({goalData, completeTime, priority}, thunkAPI) => {

    try {
      // Retrieve the token from the Redux store state
      // The auth slice in the Redux store contains user data, including the token.
      const token = thunkAPI.getState().auth.user.token
      // console.log(token);
      // Call the asynchronous function createGoal() from the goalService
      // Pass goal data, completion time, priority, and the retrieved token
      return await goalService.createGoal(goalData,completeTime,priority, token)
    } catch (error) {
      // Handle errors and reject with a specific error message
      const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Get user goals
export const getGoals = createAsyncThunk(
  'goals/getAll',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await goalService.getGoals(token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Delete user goal
export const deleteGoal = createAsyncThunk(
  'goals/delete',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      // console.log("reached at slice for delete")
      return await goalService.deleteGoal(id, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Update user goal
export const updateGoal = createAsyncThunk(
  'goals/update',
  async ({goalId,goalData,completeTime,priority} ,thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await goalService.updateGoal(goalId, goalData, completeTime,priority, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Define the goal slice containing reducers and extra reducers for async actions
export const goalSlice = createSlice({
  name: 'goal',
  initialState,
  reducers: {
    reset: (state) => initialState,  // Reset the state to initial state
  },
  extraReducers: (builder) => {
    // Define how the state is updated based on the async action lifecycle
    builder
    // Handling pending state for createGoal async action
      .addCase(createGoal.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createGoal.fulfilled, (state, action) => {
        // Handle fulfilled action
        state.isLoading = false
        state.isSuccess = true
        state.goals.push(action.payload) // Update state with received payload
      })
      // Handling rejected state for createGoal async action
      .addCase(createGoal.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload  // Update state with error message
      })
      .addCase(getGoals.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getGoals.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.goals = action.payload
      })
      .addCase(getGoals.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(deleteGoal.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteGoal.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.goals = state.goals.filter(
          (goal) => goal._id !== action.payload.id
        )
      })
      .addCase(deleteGoal.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(updateGoal.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateGoal.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.goals = state.goals.filter(
          (goal) => goal._id !== action.payload.id
        )
      })
      .addCase(updateGoal.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

// Export actions and reducers and extraReducers from the goal slice
export const { reset } = goalSlice.actions
export default goalSlice.reducer