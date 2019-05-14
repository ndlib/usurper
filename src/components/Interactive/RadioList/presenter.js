import React from 'react'
import PropTypes from 'prop-types'

import RadioColumn from './RadioColumn'

const Presenter = (props) => {
  const columns = []
  const columnCount = 2
  const maxPerColumn = Math.ceil(props.entries.length / columnCount)

  for (let i = 0; i < columnCount; i++) {
    columns.push(
      <RadioColumn key={i}
        entries={props.entries}
        onOptionClick={props.onOptionClick}
        radioName={props.radioName}
        selectedTitle={props.selectedTitle}
        columnCount={columnCount}
        maxPerColumn={maxPerColumn}
        index={i}
      />
    )
  }

  return (
    <div className='radio-list gap-top'>
      <div className='row'>
        {columns}
      </div>
    </div>
  )
}

Presenter.propTypes = {
  radioName: PropTypes.string.isRequired,
  selectedTitle: PropTypes.string,
  entries: PropTypes.array.isRequired,
  onOptionClick: PropTypes.func.isRequired,
}

export default Presenter
