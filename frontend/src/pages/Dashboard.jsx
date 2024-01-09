import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import GoalForm from '../components/GoalForm'
import GoalItem from '../components/GoalItem'
import Spinner from '../components/Spinner'
import Popup from '../components/Popup'
import { getGoals, reset } from '../features/goals/goalSlice' // Importing action creators
import { toast } from 'react-toastify'

// How much time has passed since the goal is created
function getAge(createdAt) {
  // Calculate the difference in milliseconds between the current date and the createdAt date
  const msDiff2 = new Date().getTime() - new Date(createdAt).getTime();    //current date - created date

  // Convert the time difference from milliseconds to days
  const age = Math.floor(msDiff2 / (1000 * 60 * 60 * 24)) ;

  // Return the age in days
  return age;
}

function getDaysLeft(completeTime){
  // Calculate the difference in milliseconds between the future date (completeTime) and the current date
  const msDiff1 = new Date(completeTime).getTime() - new Date().getTime();    //Future date - current date

  // Convert the time difference from milliseconds to days
  const daysLeft = Math.floor(msDiff1 / (1000 * 60 * 60 * 24)) + 1;

  // Return the number of days left
  return daysLeft;
}

function getAgedPriority(completeTime, originalPriority){

  // const currentDate = new Date();
  // const deadline = new Date(completeTime);
  const timeRemaining = getDaysLeft(completeTime);

  // If the time remaining is negative (past the completion time), return a default value (-1)
  if(timeRemaining < 0) return -1;

  const priorityIncreaseFactor = 1;


 // Calculate the updated priority based on an exponential formula
  const updatedPriority = (originalPriority * Math.exp(1 / (priorityIncreaseFactor * timeRemaining))).toFixed(2);

  // Return the updated priority with a maximum of 100.
  // return Math.min(updatedPriority, 100);

  // Return the updated priority value considering the original priority and the aging factor
  
  return Math.max(updatedPriority, originalPriority);
}


function Dashboard() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  // State for managing popup visibility and sorting parameters
  const [buttonPopup, setButtonPopup] = useState(false);
  const [sortParameter, setSortParameter] = useState(null)
  
  // Retrieving data from Redux store
  const { user } = useSelector((state) => state.auth)
  const { goals, isLoading, isError, message } = useSelector((state) => state.goals)

  // object = { ...object, property1: value1, property2: value2 }
  
  // State to manage sorted goals
  const [sortedGoals, setSortedGoals] = useState(goals);

  // useEffect hook to handle initial loading and redirection
  useEffect(() => {

    // Redirect to login if user is not authenticated
    if (!user) {
      navigate('/login')
    }
    
    // Display error toast if there's an error fetching goals
    if (isError) {
      if(message !== "Cannot read properties of null (reading 'token')")
        toast.error(message);
    }

    // Dispatch action to fetch goals
    dispatch(getGoals())


  }, [user, navigate, isError, message, dispatch])
 
  useEffect(() => {

    // useEffect to sort goals based on sortParameter change
    setSortedGoals(goals.slice().sort((a,b) => {
      if(sortParameter === "completeTime"){
        return (new Date(a[sortParameter]) - new Date(b[sortParameter]));
      }
      else if(sortParameter === "Age"){
        return getDaysLeft(b.createdAt) - getDaysLeft(a.createdAt);
      }
      else if(sortParameter === "daysLeft"){
        return getAge(b.completeTime) - getAge(a.completeTime);
      }
      else if(sortParameter === "agedPriority"){
        return getAgedPriority(b.completeTime, b.priority) - getAgedPriority(a.completeTime, a.priority);
      }
      else{
        return b[sortParameter] - a[sortParameter];
      }
    }));
    // console.log(sortParameter);
  }, [sortParameter, goals]);


  // If data is loading, display a Spinner component
  if (isLoading) {
    return <Spinner />
  }

  // JSX for rendering the Dashboard component
  return (
    <>
      <section className='heading'>
        <h1>Welcome {user && user.name}</h1>
        <p>Goals Dashboard</p>
      </section>

       {/* Dropdown for selecting sorting parameter */}
      <section className="sort">
        <label htmlfor="sort" className='sortLabel'>Sort on the basis of </label>
        <select className="dropdown" name="sortParam" value={sortParameter} onChange={(e) => {setSortParameter(e.target.value)}}>
          <option value="createdAt">Create Time</option>
          <option value="priority">Priority</option>
          <option value="completeTime">Complete Time</option>
          <option value="daysLeft">Days Left</option>
          <option value="Age">Age</option>
          <option value="agedPriority">Aged Priority</option>
        </select>
      </section>

      {/* Rendering goals */}
      <section className='content'>
        {sortedGoals.length > 0 ? (
          <div className='goals'>
            {sortedGoals.map((goal) => (
              <GoalItem key={goal._id} goal={goal} pastDate={getDaysLeft(goal.completeTime) < 0}/>
              ))}
          </div>
        ) : (
          <>
            <p>Journey towards success begin with one small goal</p>
            <p> Create a goal ⬇️ and get started now</p>
          </>
          )}
      </section>

      <br></br>
      <br></br>

       {/* Button to trigger goal form popup */}
      <button onClick={() => setButtonPopup(true)} className='btn btn-trigger'> Add a Goal </button>

      {/* Popup component for adding a goal */}
      <Popup trigger={buttonPopup} setTrigger={setButtonPopup}> <GoalForm setTrigger={setButtonPopup}/> </Popup>

      {/* <GoalForm /> */}
    </>
  )
}

export default Dashboard  // Exporting the Dashboard component