import React from 'react'
import PropTypes from 'prop-types'

const DateField = (props) => {
  // Create list of days
  let days = [(<option id={`${props.id}Day_00`} key={`${props.id}Day_00`}>Day</option>)]
  for (let i = 1; i <= 31; i++) {
    const id = `${props.id}${props.formatID(i, 'Day')}`
    days.push(<option id={id} key={id
    }>{i}</option>)
  }

  // Create list of months
  let months = [(<option id={`${props.id}Month_00`} key={`${props.id}Month_00`}>Month</option>)]
  for (let i = 1; i <= 12; i++) {
    const id = `${props.id}${props.formatID(i, 'Month')}`
    months.push(<option id={id} key={id}>{i}</option>)
  }

  return (
    <div>
      <label>{props.label}: </label>
      <span className='selector'><select id={`${props.id}Day`} onChange={props.onChange}>
        {days}
      </select></span>
      <span className='selector'><select id={`${props.id}Month`} onChange={props.onChange}>
        {months}
      </select></span>
      <input type='text' id={`${props.id}Year5`} placeholder='year' onChange={props.onChange} />
    </div>
  )
}

export default DateField
