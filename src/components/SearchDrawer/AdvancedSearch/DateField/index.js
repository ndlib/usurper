import React from 'react'
import PropTypes from 'prop-types'

const padZero = (n, p) => {
  if (n < 10) {
    n = '0' + n
  }
  return n
}
const formatID = (n, p) => {
  return `${p}_${padZero(n)}`
}

const DateField = (props) => {
  let days = [(<option id={`${props.id}Day_00`} key={`${props.id}Day_00`}>Day</option>)]

  let months = [(<option id={`${props.id}Month_00`} key={`${props.id}Month_00`}>Month</option>)]

  for (let i = 1; i <= 31; i++) {
    const id = `${props.id}Day_${formatID(i, 'Day')}`
    days.push(<option id={id} key={id
    }>{i}</option>)
  }

  for (let i = 1; i <= 12; i++) {
    const id = `${props.id}Month_${formatID(i, 'Month')}`
    months.push(<option id={id} key={id}>{i}</option>)
  }

  return (
    <div>
      <label>{props.label}: </label>
      <select id={`exlidInput_${props.id}Day_`}>
        {days}
      </select>
      <select id={`exlidInput_${props.id}Month_`}>
        {months}
      </select>
      <input type='text' id={`input_${props.id}Year5`} placeholder='year' />
    </div>
  )
}

export default DateField
