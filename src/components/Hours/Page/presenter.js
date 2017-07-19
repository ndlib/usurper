import React from 'react'
import PropTypes from 'prop-types'
import './style.css'
import CurrentHours from '../Current'
import Contact from '../../Contact/ServicePoint'
import SearchProgramaticSet from '../../SearchProgramaticSet'
import PageTitle from '../../PageTitle'
import StaticSidebar from '../../Contentful/StaticContent/Sidebar'
import StaticBody from '../../Contentful/StaticContent/Body'

const Presenter = (props) => {
  return (
    <div className='content hours-page'>
      <PageTitle title={'Hours'} />
      <SearchProgramaticSet open={false} />

      <div className='row'>
        <div className='col-md-8 col-sm-7'>
          <div className='service-point-list'>
            {
              props.servicePoints.map((servicePoint) => {
                return (<div key={servicePoint.sys.id}>
                  <CurrentHours servicePoint={servicePoint} >
                    <h4>{servicePoint.fields.address}</h4>
                    <Contact servicePoint={servicePoint} />
                  </CurrentHours>
                </div>)
              })
            }
          </div>
        </div>
        <StaticSidebar slug='hours' preview={props.preview} />
      </div>

      <StaticBody slug='hours' preview={props.preview} />
    </div>
  )
}

Presenter.propTypes = {
  servicePoints: PropTypes.array.isRequired,
  preview: PropTypes.bool,
}

export default Presenter
