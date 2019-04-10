import React from 'react'
import PropTypes from 'prop-types'

const Presenter = (props) => {
  return (
    <div className='dropdown'>
      <label>
        <ul>
          <li
            className='selectedOption'
            onClick={props.onSelectedClick}
            onKeyDown={props.onSelectedKeyDown}
            tabIndex='0'
          >
            {props.selectedTitle}
          </li>
          <span className='dropdownOptionList'>
            {
              props.entries.map((entry, index) => {
                return (
                  <li
                    key={'option_' + index}
                    className='listOption'
                    onClick={props.onOptionClick}
                    onKeyDown={props.onOptionKeyDown}
                    value={index}
                    ref={item => props.focus(index, item)}
                  >
                    {entry.title}
                  </li>
                )
              })
            }
          </span>
        </ul>
      </label>
      {
        props.useButton && (
          <button onClick={props.onButtonClick}>
            {props.buttonText}
          </button>
        )
      }
    </div>
  )
}

Presenter.propTypes = {
  selectedTitle: PropTypes.string.isRequired,
  entries: PropTypes.array,

  useButton: PropTypes.bool,
  buttonText: PropTypes.string,
  onButtonClick: PropTypes.func,

  focus: PropTypes.func, // eslint-disable-line react/no-unused-prop-types
  onSelectedClick: PropTypes.func.isRequired,
  onSelectedKeyDown: PropTypes.func.isRequired,
  onOptionClick: PropTypes.func.isRequired, // eslint-disable-line react/no-unused-prop-types
  onOptionKeyDown: PropTypes.func.isRequired,
}

export default Presenter
