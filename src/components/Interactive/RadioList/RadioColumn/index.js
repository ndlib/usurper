import React from 'react'
import PropTypes from 'prop-types'

const RadioColumn = (props) => {
  return (
    <div key={'column_' + props.index} className={'column col-xs-12 col-sm-' + Math.floor(12 / props.columnCount)}>
      {
        props.entries.slice(props.maxPerColumn * props.index, props.maxPerColumn * (props.index + 1))
          .map((entry, index) => {
            const value = index + (props.maxPerColumn * props.index)
            return (
              <label key={'option_' + value} className='listOption' value={value}>
                <input
                  type='radio'
                  title={entry.title}
                  value={value}
                  name={props.radioName}
                  defaultChecked={entry.title === props.selectedTitle}
                  onClick={props.onOptionClick}
                />
                {entry.title}
              </label>
            )
          })
      }
    </div>
  )
}

RadioColumn.propTypes = {
  radioName: PropTypes.string.isRequired,
  selectedTitle: PropTypes.string,
  entries: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  })).isRequired,
  onOptionClick: PropTypes.func.isRequired,
  columnCount: PropTypes.number.isRequired,
  maxPerColumn: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
}

export default RadioColumn
