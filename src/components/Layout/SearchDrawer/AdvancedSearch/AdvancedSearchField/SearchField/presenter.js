import React from 'react'
import PropTypes from 'prop-types'

const SearchField = (props) => {
  return (
    <span className='selector'>
      <select id={props.id} onChange={props.onChange}>
        <option value='any'>Any</option>
        <option value='title'>Title</option>
        <option value='creator'>Author/Creator</option>
        <option value='sub'>Subject</option>
        <option value='lsr30'>Series Title</option>
        <option value='lsr31'>Uniform Title</option>
        <option value='lsr06'>Publisher</option>
        <option value='lsr08'>Place of Publication</option>
        <option value='lsr05'>Call number</option>
        <option value='isbn'>ISBN</option>
        <option value='issn'>ISSN</option>
      </select>
    </span>
  )
}

SearchField.propTypes = {
  id: PropTypes.string.isRequired,
  onChange: PropTypes.func,
}

export default SearchField
