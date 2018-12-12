import React from 'react'
import PropTypes from 'prop-types'

const SearchInput = (props) => {
  return (<input id={props.id} onBlur={props.onBlur} onKeyDown={props.onKeyDown} />)
}

export default SearchInput
