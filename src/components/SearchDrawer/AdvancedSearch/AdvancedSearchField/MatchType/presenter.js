import React from 'react'
import PropTypes from 'prop-types'

const MatchType = (props) => {
  return (
    <select id={props.id} onChange={props.onChange} onLoad={props.onChange}>
      <option value='contains'>contains</option>
      <option value='exact'>is (exact)</option>
      <option value='begins_with'>starts with</option>
    </select>
  )
}

export default MatchType
