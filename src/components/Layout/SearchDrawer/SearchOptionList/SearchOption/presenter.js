
import React from 'react'
import PropTypes from 'prop-types'

const SearchOption = (props) => {
  return (
    <li
      id={`uSearchOption_${props.index}`}
      className='uSearchOption'
      onClick={props.onClick}
      onKeyDown={props.onKeyDown}
      tabIndex={props.search.searchBoxOpen ? '0' : '-1'}
      role='option'
      value={props.index}
      aria-selected={props.item.uid === props.search.searchType}
    >
      <p>{props.item.title}</p>
      <small>{props.item.description}</small>
    </li>
  )
}

SearchOption.propTypes = {
  onClick: PropTypes.func,
  index: PropTypes.number,
  item: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    uid: PropTypes.string.isRequired,
  }).isRequired,
  onKeyDown: PropTypes.func,
  search: PropTypes.shape({
    searchBoxOpen: PropTypes.bool,
    searchType: PropTypes.string.isRequired,
  }),
}
export default SearchOption
