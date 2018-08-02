import React from 'react'
import PropTypes from 'prop-types'

const Presenter = (props) => {
  return (
    <div className='radio-list'>
      <label>
        <ul className='col-2-list'>
          <form>
            {
              props.entries.map((entry, index) => {
                return (
                  <li
                    key={'option_' + index}
                    className={entry.title === props.selected ? 'listOption selectedOption' : 'listOption'}
                    onClick={props.onOptionClick}
                    onKeyDown={props.onOptionKeyDown}
                    value={index}
                    ref={item => props.focus(index, item)}
                  >
                    <input
                      type='radio'
                      name={entry.title}
                      value={index}
                      defaultChecked={entry.title === props.selectedTitle}
                    />
                    {entry.title}
                  </li>
                )
              })
            }
          </form>
        </ul>
      </label>
      {
        props.useButton && (
          <button
            className='radio-list-button'
            onClick={props.onButtonClick}>
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

  focus: PropTypes.func,
  onSelectedClick: PropTypes.func.isRequired,
  onSelectedKeyDown: PropTypes.func.isRequired,
  onOptionClick: PropTypes.func.isRequired,
  onOptionKeyDown: PropTypes.func.isRequired,
}

export default Presenter
