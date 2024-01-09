import { useState, useEffect } from 'react'
import { FaSignInAlt } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { login, reset } from '../features/auth/authSlice'  // Importing actions from authSlice
import Spinner from '../components/Spinner'  // Importing a Spinner component

function Login() {
  // State for form data (email and password)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const { email, password } = formData  // Destructuring form data

  const navigate = useNavigate()   // Navigation hook from React Router
  const dispatch = useDispatch()  // Dispatch function from Redux

  // Selecting data from the Redux store using useSelector
  const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth)

  useEffect(() => {
    if (isSuccess || user) {
      toast.success("Login successful")
      navigate('/')
    }
    
    if (isError) {
      toast.error(message)
    }


    // dispatch(reset())
  }, [user, isError, isSuccess, message, navigate])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()

    // Create user object with form data and dispatch the login action
    const userData = {
      email,
      password,
    }

    dispatch(login(userData))
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <section className='heading'>
        <h1>
          <FaSignInAlt /> Login
        </h1>
        <p>Login and start setting goals</p>
      </section>

      <section className='form'>
        <form onSubmit={onSubmit}>
          <div className='form-group'>
            <input
              type='email'
              className='form-control'
              id='email'
              name='email'
              value={email}
              placeholder='Enter your email'
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <input
              type='password'
              className='form-control'
              id='password'
              name='password'
              value={password}
              placeholder='Enter password'
              onChange={onChange}
            />
          </div>

          <div className='form-group'>
            <button type='submit' className='btn btn-block'>
              Submit
            </button>
          </div>

          <p className='form-priority'>Guest Email: guest@gmail.com </p>
          <p className='form-priority'>Guest Password: guest123 </p>
        </form>
      </section>
    </>
  )
}

export default Login