import React from 'react'
import PropTypes from 'prop-types'
import './style.css'
import CurrentHours from '../Current'
import Contact from '../../Contact/ServicePoint'
import SearchProgramaticSet from '../../SearchProgramaticSet'
import PageTitle from '../../Layout/PageTitle'
import StaticSidebar from '../../Contentful/StaticContent/Sidebar'
import StaticBody from '../../Contentful/StaticContent/Body'
import StaticAlert from '../../Contentful/StaticContent/Alert'
import OpenGraph from '../../OpenGraph'

const Presenter = (props) => {
  return (
    <section className='content hours-page'>
      <PageTitle title={'Hours and Contact Information'} />
      <OpenGraph
        title={'Hours and Contact Information'}
        description={'Hours and contact info of all the libraries and service points'}
        image={false}
      />
      <SearchProgramaticSet open={false} />

      <div className='row'>
        <div className='col-md-8 col-sm-7'>
          <StaticAlert slug='hours' preview={props.preview} />

          <main className='service-point-list' role='tablist'>
            {
              props.hoursPageOrder.map((servicePointOrder) => {
                const sp = props.servicePoints[servicePointOrder.servicePointSlug]
                if (!sp) {
                  return null
                }

                return (
                  <div key={sp.sys.id} className={servicePointOrder.main ? 'main-service-point' : 'sub-service-point'}>
                    <CurrentHours servicePoint={sp} >
                      <address>{sp.fields.address}</address>
                      <Contact servicePoint={sp} />
                    </CurrentHours>
                  </div>
                )
              })
            }
          </main>
        </div>
        <StaticSidebar slug='hours' preview={props.preview} />
      </div>

      <StaticBody slug='hours' preview={props.preview} />
    </section>
  )
}

Presenter.propTypes = {
  servicePoints: PropTypes.array.isRequired,
  preview: PropTypes.bool,
  hoursPageOrder: PropTypes.array.isRequired,
}

export default Presenter
