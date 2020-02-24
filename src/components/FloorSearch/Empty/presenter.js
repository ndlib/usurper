import React from 'react'
import PropTypes from 'prop-types'
import PageTitle from 'components/Layout/PageTitle'
import SearchProgramaticSet from 'components/SearchProgramaticSet'
import SearchCallout from 'components/Contentful/Floor/SearchCallout/index'
import Contact from 'components/Contact/ServicePoint'

const Empty = (props) => {
  return (
    <div className='contact-page'>
      <PageTitle title='Unable to Find Map' />
      <SearchProgramaticSet open={false} />
      <div className='row'>
        <div className='col-md-8 col-sm-7 floor'>
          <p>A map cannot be found for this item. Please contact the Circulation Desk for help finding it.</p>

          <SearchCallout location={props.location} />
          { props.points.map(point => (
            <div className='point-card' key={point.sys.id}>
              <h3>{point.fields.title}</h3>
              <Contact servicePoint={point} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

Empty.propTypes = {
  location: PropTypes.object,
  points: PropTypes.arrayOf(PropTypes.shape({
    sys: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
    fields: PropTypes.shape({
      title: PropTypes.string.isRequired,
    }).isRequired,
  })).isRequired,
}

export default Empty
