import React from 'react'
import PropTypes from 'prop-types'
const DeleteButton = (props) => {
  return (
    <button className='danger' onClick={props.action}>Delete</button>
  )
}

DeleteButton.propTypes = {
  action: PropTypes.func,
}
export default DeleteButton
