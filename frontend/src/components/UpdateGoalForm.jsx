import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateGoal } from '../features/goals/goalSlice'
import { useNavigate } from 'react-router-dom'

function UpdateGoalForm(props) {
  // Initializing state variables to store the updated values of text, completeTime, and priority
  const [text, setText] = useState(props.goal.text)
  const [completeTime, setCompleteTime] = useState(props.goal.completeTime);
  const [priority, setPriority] = useState(props.goal.priority);

  // Accessing the Redux dispatch function
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // Function to handle form submission
  const onSubmit = (e) => {
    e.preventDefault()

    // Dispatching the action to update the goal with the new data
    dispatch(updateGoal({ goalId : (props.goal._id), goalData : {text}, completeTime : {completeTime}, priority : {priority}}));
    setText('')

    // Closing the update goal form by invoking the setTrigger function
    props.setTrigger(false);

     navigate('/')
    
  }

  return (
    <section className='form'>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='text'>Update the Goal</label>
          <input
            type='text'
            name='text'
            id='text'
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <label htmlFor='completeTime'>Complete Time</label>
          <input
            type= 'date'
            name= 'completeTime'
            id  = 'completeTime'
            value={completeTime}
            onChange={(e) => setCompleteTime(e.target.value)}
          />

          <label htmlFor='priority'>Priority</label>
          <input
            type= 'number'
            name= 'priority'
            id  = 'priority'
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          />
        </div>
        <div className='form-group'>
          <button className='btn btn-block' type='submit'>
            Update Goal
          </button>
        </div>
      </form>
    </section>
  )
}

export default UpdateGoalForm;