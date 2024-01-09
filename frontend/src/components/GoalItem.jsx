import { useDispatch } from 'react-redux'
import { useState, useEffect} from 'react'
import { deleteGoal } from '../features/goals/goalSlice'
import { AiFillDelete, AiFillEdit } from 'react-icons/ai'
import Popup from './Popup'
import UpdateGoalForm from './UpdateGoalForm'
import GoalDetails from './GoalDetails'

function GoalItem({ goal, pastDate }) {
  // Initialize the dispatch function to trigger Redux actions
  const dispatch = useDispatch()

  // State variables for managing pop-up visibility
  const [buttonPopup, setButtonPopup] = useState(false);
  const [buttonPopupDetails, setButtonPopupDetails] = useState(false);

  // Format createdAt date for display
  const dateAndTime = new Date(goal.createdAt).toLocaleString('id-ID').split(',');
  
  return (
    <div className={'goal ' + (pastDate ? 'redBorder' : ' ')}>

      {/* Display goal date */}
      <div className='date'>{dateAndTime[0]}</div>

       {/* Display goal text */}
      <h2 className='goalText'>{goal.text}</h2>

       {/* Button to delete the goal */}
      <button onClick={() => dispatch(deleteGoal(goal._id))} className='close'>
        <AiFillDelete />
      </button>

      {/* Button to trigger edit goal pop-up */}
      <button onClick={() => setButtonPopup(true)} className='update'>
        <AiFillEdit />
      </button>
        
      {/* Pop-up for updating the goal */}
      <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
        <UpdateGoalForm setTrigger={setButtonPopup} goal={goal}/>
      </Popup>

      {/* Button to view goal details */}
      <button onClick={() => setButtonPopupDetails(true)} className='btn btn-item'>
        View Details
      </button>

      {/* Pop-up for displaying goal details */}
      <Popup trigger={buttonPopupDetails} setTrigger={setButtonPopupDetails}>
        <GoalDetails setTrigger={setButtonPopupDetails} goal={goal}/>
      </Popup>
    </div>
  )
}

export default GoalItem