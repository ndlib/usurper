import React from 'react'
import PropTypes from 'prop-types'

const MatchType = (props) => {
  return (
    <span className='selector'><select id={props.id} onChange={props.onChange} onLoad={props.onChange}>
      <option value='contains'>contains</option>
      <option value='exact'>is (exact)</option>
      <option value='begins_with'>starts with</option>
    </select>
    </span>
  )
}

MatchType.propTypes = {
  id: PropTypes.string.isRequired,
  onChange: PropTypes.func,
}

export default MatchType
