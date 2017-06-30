import React from 'react'
import PropTypes from 'prop-types'
import './style.css'
import CurrentHours from '../Current'
import Contact from '../../Contact/ServicePoint'
import SearchProgramaticSet from '../../SearchProgramaticSet'

const Presenter = (props) => {
  return (
    <div className='content hours-page'>
      <SearchProgramaticSet open={false} />
      <h2>Hours</h2>
      <hr aria-hidden="true" />
      <div>
        <p>View building and service desk hours.</p>
      </div>
      <div className='service-point-list'>
        {
          props.servicePoints.map((servicePoint) => {
            return (<div key={servicePoint.sys.id}>
              <CurrentHours servicePoint={servicePoint} >
                <Contact servicePoint={servicePoint} />
              </CurrentHours>
            </div>)
          })
        }
      </div>
    </div>
  )
}

Presenter.propTypes = {
  servicePoints: PropTypes.object.isRequired,
}

export default Presenter
