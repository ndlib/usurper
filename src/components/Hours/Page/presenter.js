import React from 'react'
import PropTypes from 'prop-types'

import CurrentHours from '../Current'
import Contact from 'components/Contact/ServicePoint'
import SearchProgramaticSet from 'components/SearchProgramaticSet'
import PageTitle from 'components/Layout/PageTitle'
import StaticSidebar from 'components/Contentful/StaticContent/Sidebar'
import StaticBody from 'components/Contentful/StaticContent/Body'
import StaticAlert from 'components/Contentful/StaticContent/Alert'
import OpenGraph from 'components/OpenGraph'

import '../style.css'

const Presenter = (props) => {
  return (
    <section className='content hours-page'>
      <PageTitle title={props.title || 'Hours and Contact Information'} />
      <OpenGraph
        title={props.title || 'Hours and Contact Information'}
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
                  <div key={sp.sys.id} id={sp.fields.slug} className={servicePointOrder.main ? 'main-service-point' : 'sub-service-point'}>
                    <CurrentHours servicePoint={sp} defaultExpanded={sp.fields.slug === props.anchorSlug}>
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
  servicePoints: PropTypes.object.isRequired,
  preview: PropTypes.bool,
  hoursPageOrder: PropTypes.array.isRequired,
  title: PropTypes.string,
  anchorSlug: PropTypes.string,
}

export default Presenter
