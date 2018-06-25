import React from 'react'
import PropTypes from 'prop-types'
import PageTitle from '../../PageTitle'
import SearchProgramaticSet from '../../SearchProgramaticSet'
import SearchCallout from '../../Contentful/Floor/SearchCallout/index'
import Contact from '../../Contact/ServicePoint'

const Empty = (props) => {
  return (
    <div className='contact-page'>
      <PageTitle title='Unable to Find Map' />
      <SearchProgramaticSet open={false} />
      <div className='row'>
        <div className='col-md-8 col-sm-7 floor'>
          <p>A map cannot be found for this item. Please contact the Circulation Desk for help finding it.</p>

          <SearchCallout location={props.location} />
          <div className='point-card'>
            <h3>Circulation Desk</h3>
            <Contact servicePoint={props.points['circulationservicedesk']} />
          </div>
        </div>
      </div>
    </div>
  )
}

Empty.propTypes = {
  location: PropTypes.object,
  points: PropTypes.object,
}

export default Empty
