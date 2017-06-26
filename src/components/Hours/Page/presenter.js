import React from 'react'
import PropTypes from 'prop-types'
import './style.css'
import CurrentHours from '../Current'
import Contact from '../../Contact/ServicePoint'
import SearchProgramaticSet from '../../SearchProgramaticSet'

const Presenter = (servicePoints) => {
  return (
    <div className='content'>
      <SearchProgramaticSet open={false} />
      <h2>Hours</h2>
      <hr />
      <div>
        <p>View building and service desk hours.</p>
      </div>
      <div className='service-point-list'>
        {
          servicePoints.map((servicePoint) => {
            return (
              <div key={servicePoint.sys.id}>
                <CurrentHours jsonHoursApiKey={servicePoint.fields.hoursCode} />
                <Contact servicePoint={servicePoint} />
              </div>
            )
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
