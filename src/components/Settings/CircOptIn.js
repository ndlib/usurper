import React from 'react'
import PropTypes from 'prop-types'
import HoverToolTip from '../HoverToolTip'
const CircOptIn = (props) => {
  return (
    <div className='col-md-12 col-xs-12'>
      <section className='group'>
        <h2>Circulation History</h2>
        <p>
          <input
            id='circ-opt-in'
            type='checkbox'
            onChange={props.setCircStatus}
            defaultChecked={props.circHistory} />
          <label htmlFor='circ-opt-in'>Save my Circulation History.<HoverToolTip>Here is some helpful text.</HoverToolTip></label>
          <span style={{ float: 'right' }}><button>Save</button></span>
        </p>
      </section>
    </div>
  )
}
CircOptIn.propTypes = {
  setCircStatus: PropTypes.func.isRequired,
  circHistory: PropTypes.bool,
}
export default CircOptIn
