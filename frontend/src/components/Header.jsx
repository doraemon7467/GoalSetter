import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../features/auth/authSlice'
import { toast } from 'react-toastify'

function Header() {
  // Accessing the navigation functionality from React Router
  const navigate = useNavigate()

  // Accessing the Redux dispatch function
  const dispatch = useDispatch()

  // Retrieving the user state from the Redux store
  const { user } = useSelector((state) => state.auth)

  // Function to handle user logout
  const onLogout = () => {
    // Dispatching the logout action from the authSlice
    dispatch(logout())

    // Dispatching the reset action from the authSlice to reset the auth state
    dispatch(reset())

    // Displaying a success toast message for logout using react-toastify
    toast.success("You are logged out")

    // Navigating the user to the home page after logout
    navigate('/')
  }

  return (
    // Header section of the application
    <header className='header'>
      <div className='logo'>
        <br></br>
        {/* Link to the home page */}
        <Link to='/'><h2>🎯GoalSetter</h2></Link>
      </div>
      <ul>
        {/* Navigation links displayed in the header */}
        {user ? (   // Conditional rendering based on user authentication state
          <li>
            <button className='btn' onClick={onLogout}>
              <FaSignOutAlt /> Logout
            </button>
          </li>
        ) : (  // Login and Register links when the user is not logged in
          <>
            <li>
              <Link to='/login' className='btn'>
                <FaSignInAlt /> Login
              </Link>
            </li>
            <li>
              <Link to='/register' className='btn'>
                <FaUser /> Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </header>
  )
}

export default Header