import React from 'react'
import PropTypes from 'prop-types'
import './style.css'
import CurrentHours from '../Current'
import Contact from '../../Contact/ServicePoint'
import SearchProgramaticSet from '../../SearchProgramaticSet'
import PageTitle from '../../PageTitle'

const Presenter = (props) => {
  return (
    <div className='content hours-page'>
      <PageTitle title={'Hours'} />
      <SearchProgramaticSet open={false} />
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
  servicePoints: PropTypes.array.isRequired,
}

export default Presenter
