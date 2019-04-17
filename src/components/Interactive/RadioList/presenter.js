import React from 'react'
import PropTypes from 'prop-types'

const Presenter = (props) => {
  const radioName = props.radioName
  const optClick = props.onOptionClick
  const optKeyDown = props.onOptionKeyDown
  const focus = props.focus
  return (
    <div className='radio-list'>
      <form>
        <ul className='col-2-list' style={{ display: 'inline-block' }}>
          {
            props.entries.map((entry, index) => {
              return (
                <li
                  key={'option_' + index}
                  className='listOption'
                  onClick={optClick}
                  onKeyDown={optKeyDown}
                  value={index}
                  ref={item => focus(index, item)}
                >
                  <label>
                    <input
                      type='radio'
                      title={entry.title}
                      value={index}
                      name={radioName}
                      defaultChecked={entry.title === props.selectedTitle}
                    />
                    {entry.title}
                  </label>
                </li>
              )
            })
          }
        </ul>
      </form>
      {
        props.useButton && (
          <button
            className='radio-list-button clearfix'
            onClick={props.onButtonClick}>
            {props.buttonText}
          </button>
        )
      }
    </div>
  )
}

Presenter.propTypes = {
  radioName: PropTypes.string.isRequired,
  selectedTitle: PropTypes.string,
  entries: PropTypes.array,

  useButton: PropTypes.bool,
  buttonText: PropTypes.string,
  onButtonClick: PropTypes.func,

  focus: PropTypes.func,
  onOptionClick: PropTypes.func.isRequired,
  onOptionKeyDown: PropTypes.func.isRequired,
}

export default Presenter
