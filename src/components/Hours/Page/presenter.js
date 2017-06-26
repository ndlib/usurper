import React from 'react'
import PropTypes from 'prop-types'
import './style.css'
import CurrentHours from '../Current'
import Contact from '../../Contact/ServicePoint'
import SearchProgramaticSet from '../../SearchProgramaticSet'

const Presenter = (props) => {
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
          props.servicePoints.map((servicePoint) => {
            let expanded = props.expandedId === servicePoint.sys.id
            if (expanded) {
              return (
                <div key={servicePoint.sys.id}>
                  <CurrentHours jsonHoursApiKey={servicePoint.fields.hoursCode} />
                  <Contact servicePoint={servicePoint} />
                </div>
              )
            } else {
              return (
                <div key={servicePoint.sys.id} onClick={() => props.onclick(servicePoint.sys.id)}>
                  {servicePoint.fields.title}
                </div>
              )
            }
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
