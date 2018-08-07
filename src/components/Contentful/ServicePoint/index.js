// Container component for a Page content type from Contentful
import React from 'react'
import PropTypes from 'prop-types'
import CurrentHours from '../../Hours/Current'
import Contact from '../../Contact/ServicePoint'
import { withErrorBoundary } from '../../ErrorBoundary'

const ServicePoint = ({ cfServicePoint, showDetails }) => {
  if (!cfServicePoint) {
    return null
  }

  return (
    <section
      aria-label={'Service Point: ' + cfServicePoint.fields.title}
      role='complementary'
      className='sp-address'
      itemScope
      itemType='http://schema.org/Place'
    >
      <h2 itemProp='name'>{cfServicePoint.fields.title}</h2>


      { showDetails && (
        <div>
          <h4 itemProp='streetAddress'>{cfServicePoint.fields.address}</h4>
          <CurrentHours servicePoint={cfServicePoint} />
        </div>
      )}
      <Contact servicePoint={cfServicePoint} showDetails={showDetails} />
    </section>
  )
}

ServicePoint.propTypes = {
  cfServicePoint: PropTypes.object.isRequired,
  showDetails: PropTypes.bool,
}

ServicePoint.defaultProps = {
  showDetails: true,
}

export default withErrorBoundary(ServicePoint)
