import React from 'react'
import PropTypes from 'prop-types'

const SearchInput = (props) => {
  return (<input type='search' id={props.id} onBlur={props.onBlur} onKeyDown={props.onKeyDown} />)
}

SearchInput.propTypes = {
  id: PropTypes.string.isRequired,
  onBlur: PropTypes.func,
  onKeyDown: PropTypes.func,
}

export default SearchInput
