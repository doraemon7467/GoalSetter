// Importing configureStore function from Redux Toolkit
import { configureStore } from '@reduxjs/toolkit'

// Importing reducers for auth and goals slices
import authReducer from '../features/auth/authSlice'
import goalReducer from '../features/goals/goalSlice'

// Creating the Redux store
export const store = configureStore({
   // Configuring the store with reducers
  reducer: {
    auth: authReducer,  // Setting the authReducer for 'auth' slice
    goals: goalReducer, // Setting the goalReducer for 'goals' slice
  },
})