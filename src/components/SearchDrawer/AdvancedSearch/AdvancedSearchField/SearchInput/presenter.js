import React from 'react'
import PropTypes from 'prop-types'

const SearchInput = (props) => {
  return (<input id={props.id} onChange={props.onChange} />)
}

export default SearchInput
