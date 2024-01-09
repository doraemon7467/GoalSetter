import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Header from './components/Header'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Register from './pages/Register'
import Footer from './components/Footer'

function App() {
  return (
    <>
    {/* Router component from react-router-dom */}
      <Router>
        <div className='container'>
          {/* Header component */}
          <Header />
           {/* Routes component to define application routes */}
          <Routes>
            {/* Route for Dashboard component */}
            <Route path='/' element={<Dashboard />} />
            {/* Route for Login component */}
            <Route path='/login' element={<Login />} />
             {/* Route for Register component */}
            <Route path='/register' element={<Register />} />
          </Routes>
        </div>
      </Router>
      {/* ToastContainer component from react-toastify for displaying toast notifications */}
      <ToastContainer />
      {/* Footer component */}
      <Footer></Footer>
    </>
  )
}

export default App