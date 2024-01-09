import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FaUser } from 'react-icons/fa'
import { register, reset } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'

function Register() {
  // State to handle form data
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  })

  // Destructuring form data
  // Extract individual properties from the formData object into separate variables. 
  const { name, email, password, password2 } = formData

  // Hooks for navigation, dispatch, and Redux state
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth)

  // useEffect hook to manage side effects
  useEffect(() => {
    // Display error toast if there's an error
    if (isError) {
      toast.error(message)
    }

    // If registration is successful, display success toast and navigate to home
    if (isSuccess || user) {
      toast.success("Registeration successful")
      navigate('/')
    }

    // Reset the authentication state after displaying toast or navigating
    // eliminating any previous error messages or successful registration flags 
    // that might be retained in the state.
    dispatch(reset())

  }, [user, isError, isSuccess, message, navigate, dispatch])

  // Function to handle form field changes
  const onChange = (e) => {
    // The function uses the callback version of setFormData, 
    // which accepts the previous state as an argument (in this case, prevState). 
    // It then returns a new state object by spreading the properties of prevState and 
    // updating the property corresponding to the changed input field.
    // similar to
    // const handleEmailChange = (e) => {
    //   setFormData({ ...formData, email: e.target.value });
    // };
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  // Function to handle form submission
  const onSubmit = (e) => {
    e.preventDefault()

    // Check if passwords match
    if (password !== password2) {
      toast.error('Passwords do not match')
    } else {
      // If passwords match, create user object and dispatch register action
      const userData = {
        name,
        email,
        password,
      }

      dispatch(register(userData))
    }
  }

  // Show spinner if loading
  if (isLoading) {
    return <Spinner />
  }

  // JSX for registration form
  return (
    <>
    {/* Heading section */}
      <section className='heading'>
        <h1>
          <FaUser /> Register
        </h1>
        <p>Please create an account</p>
      </section>

       {/* Form section */}
      <section className='form'>
        <form onSubmit={onSubmit}>
           {/* Input fields for name, email, passwords */}
          {/* Each input field has an onChange handler to update state */}
          {/* Submit button triggers the onSubmit function */}
          {/* Values are controlled by state */}
          {/* When the form is submitted, the onSubmit function is called */}
          <div className='form-group'>
            <input
              type='text'
              className='form-control'
              id='name'
              name='name'
              value={name}
              placeholder='Enter your name'
              onChange={onChange}
            />
          </div>
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
            <input
              type='password'
              className='form-control'
              id='password2'
              name='password2'
              value={password2}
              placeholder='Confirm password'
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <button type='submit' className='btn btn-block'>
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  )
}

export default Register