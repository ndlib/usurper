import React from 'react'
import PropTypes from 'prop-types'

const Bool = (props) => {
  return (
    <select>
      <option value='AND'>AND</option>
      <option value='OR'>OR</option>
      <option value='NOT'>NOT</option>
    </select>
  )
}

export default Bool
