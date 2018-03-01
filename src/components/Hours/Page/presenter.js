import React from 'react'
import PropTypes from 'prop-types'
import './style.css'
import CurrentHours from '../Current'
import Contact from '../../Contact/ServicePoint'
import SearchProgramaticSet from '../../SearchProgramaticSet'
import PageTitle from '../../PageTitle'
import StaticSidebar from '../../Contentful/StaticContent/Sidebar'
import StaticBody from '../../Contentful/StaticContent/Body'
import StaticAlert from '../../Contentful/StaticContent/Alert'
import Link from '../../Link'

const Presenter = (props) => {
  return (
    <section className='content hours-page'>
      <PageTitle title={'Hours'} />
      <SearchProgramaticSet open={false} />

      <div className='row'>
        <div className='col-md-8 col-sm-7'>
          <StaticAlert slug='hours' preview={props.preview} />

          <main className='service-point-list' role='tablist'>
            {
              props.hoursPageOrder.map((servicePointOrder) => {
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
}

export default Presenter
