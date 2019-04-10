import React from 'react'
import PropTypes from 'prop-types'

const Bool = (props) => {
  return (
    <span className='selector'>
      <select id={props.id} onChange={props.onChange}>
        <option value='AND'>AND</option>
        <option value='OR'>OR</option>
        <option value='NOT'>NOT</option>
      </select>
    </span>
  )
}

Bool.propTypes = {
  onChange: PropTypes.func.isRequired,
  id: PropTypes.string,
}

export default Bool
