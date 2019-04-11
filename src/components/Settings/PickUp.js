import React from 'react'
import PropTypes from 'prop-types'
import RadioList from '../RadioList'
import UpdateStatus from './settingsUpdateStatus'

let showStatus = false
const setShowStatus = (bool) => {
  showStatus = bool
}

const PickUp = (props) => {
  return (
    <div className='col-md-12 col-xs-12'>
      <section className='group'>
        <h2>Pickup Location</h2>
        <p>
          Select your prefered library location to pick up interlibrary loans and document delivery items.
        </p>
        <RadioList
          radioName='default_library'
          entries={props.entries}
          submit={(value, title) => {
            setShowStatus(true)
            props.setHomeLibrary(value, title)
          }}
          defaultIndex={props.defaultIndex}
          useButton
          buttonText='Save'
          onChangeCallback={() => setShowStatus(false)}
        />
        <UpdateStatus status={props.libraryStatus} show={showStatus} />
      </section>
    </div>
  )
}

PickUp.propTypes = {
  entries: PropTypes.array.isRequired,
  setHomeLibrary: PropTypes.func.isRequired, // eslint-disable-line react/no-unused-prop-types
  defaultIndex: PropTypes.number,
  libraryStatus: PropTypes.number,
}
export default PickUp
