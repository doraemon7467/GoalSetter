import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createGoal } from '../features/goals/goalSlice' // importing the action creator from goalSlice

function GoalForm(props) {
  const [text, setText] = useState('')
  const [completeTime, setCompleteTime] = useState(null);
  const [priority, setPriority] = useState(0)
  

  //  This function will be used to dispatch actions to the Redux store.
  const dispatch = useDispatch()

  const onSubmit = (e) => {
    e.preventDefault()

    //  dispatches the createGoal action with the form data
    dispatch(createGoal({ goalData : {text}, completeTime : {completeTime}, priority : {priority} }));
    setText('')

    // closes the goal form by calling props.setTrigger(false).
    props.setTrigger(false);

  }

  return (
    <section className='form'>
      <form onSubmit={onSubmit}>
        <div className='form-group'>

          <label htmlFor='text'>Add a Goal</label>
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
          <p className='form-priority'>Higher the number, greater the priority</p>

        </div>
        <div className='form-group'>
          <button className='btn btn-block' type='submit'>
            Add Goal
          </button>
        </div>
      </form>
    </section>
  )
}

export default GoalForm