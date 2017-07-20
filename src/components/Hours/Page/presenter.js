import React from 'react'
import PropTypes from 'prop-types'
import './style.css'
import CurrentHours from '../Current'
import Contact from '../../Contact/ServicePoint'
import SearchProgramaticSet from '../../SearchProgramaticSet'
import PageTitle from '../../PageTitle'
import StaticSidebar from '../../Contentful/StaticContent/Sidebar'
import StaticBody from '../../Contentful/StaticContent/Body'

const hoursPageOrder = [
  { servicePointSlug: 'hesburghlibrary', main: true },
  { servicePointSlug: 'askusdesk', main: false },
  { servicePointSlug: 'circulationservicedesk', main: false },
  { servicePointSlug: 'oitoutpost', main: false },
  { servicePointSlug: 'reservesmicrotextandmediadesk', main: false },
  { servicePointSlug: 'architecturelibrary', main: true },
  { servicePointSlug: 'byzantinestudiesreadingroom', main: true },
  { servicePointSlug: 'centerfordigitalscholarship', main: true },
  { servicePointSlug: 'centerfordigitalscholarshiprooms', main: false },
  { servicePointSlug: 'chemistryphysicslibrary', main: true },
  { servicePointSlug: 'engineeringlibrary', main: true },
  { servicePointSlug: 'kelloggkroclibrary', main: true },
  { servicePointSlug: 'mahaffeybusinesslibrary', main: true },
  { servicePointSlug: 'medievalinstitutelibrary', main: true },
  { servicePointSlug: 'musiclibrary', main: true },
  { servicePointSlug: 'radiationchemistryreadingroom', main: true },
  { servicePointSlug: 'visualresourcescenter', main: true },
]

const Presenter = (props) => {
  return (
    <div className='content hours-page'>
      <PageTitle title={'Hours'} />
      <SearchProgramaticSet open={false} />

      <div className='row'>
        <div className='col-md-8 col-sm-7'>
          <div className='service-point-list'>
            {
              hoursPageOrder.map((servicePointOrder) => {
                let sp = props.servicePoints[servicePointOrder.servicePointSlug]
                if (!sp) {
                  return null
                }
                
                return (<div key={sp.sys.id} className={servicePointOrder.main ? 'main-service-point' : 'sub-service-point'}>
                  <CurrentHours servicePoint={sp} >
                    <h4>{sp.fields.address}</h4>
                    <Contact servicePoint={sp} />
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
