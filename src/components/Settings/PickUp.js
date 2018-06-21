import React from 'react'
import PropTypes from 'prop-types'
import RadioList from '../RadioList'
import UpdateStatus from './settingsUpdateStatus'

const PickUp = (props) => {
  return (
    <div className='col-md-12 col-xs-12'>
      <section className='group'>
        <h2>Pickup Location</h2>
        <p>
          Select your prefered library location to pick up interlibrary loans and document delivery items.
        </p>
        <RadioList
          entries={props.entries}
          submit={(value, title) => props.setHomeLibrary(value)}
          defaultIndex={props.defaultIndex}
          useButton
          buttonText='Save'
        />
        <br className='clear' />
        <UpdateStatus status={props.libraryStatus} />
      </section>

    </div>
  )
}
PickUp.propTypes = {
  entries: PropTypes.array.isRequired,
  setHomeLibrary: PropTypes.func.isRequired,
  defaultIndex: PropTypes.number,
  libraryStatus: PropTypes.number,

}
export default PickUp
