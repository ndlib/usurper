import React from 'react'
import PropTypes from 'prop-types'
import Image from '../../Image'
import PageLink from '../PageLink'
import Librarians from '../../Librarians'
import ServicePoint from '../ServicePoint'
import Related from '../../Related'
import { withErrorBoundary } from '../../ErrorBoundary'

const servicePoints = (points, shouldRender) => {
  if (!shouldRender || !points) {
    return null
  }

  return points.map((point, index) => {
    return <ServicePoint cfServicePoint={point} key={index + '_point'} />
  })
}

const ContactPoint = ({ cfPageEntry, mobile }) => (
  <aside className={mobile ? 'mobile-only' : 'col-md-4 col-sm-5 col-xs-12 right desktop-only'}>
    {mobile ? null : <Image cfImage={cfPageEntry.fields.image} className='cover' />}
    <PageLink className='button callout' cfPage={cfPageEntry.fields.callOutLink} />
    { servicePoints(cfPageEntry.fields.servicePoints, mobile) }
    <Librarians netids={cfPageEntry.fields.contactPeople} />
    { servicePoints(cfPageEntry.fields.servicePoints, !mobile) }
    <Related
      className='p-pages'
      title='Related Pages'
      showImages={false}
    >
      { cfPageEntry.fields.relatedPages }
    </Related>
  </aside>
)

ContactPoint.propTypes = {
  cfPageEntry: PropTypes.object.isRequired,
  mobile: PropTypes.bool,
}

export default withErrorBoundary(ContactPoint)
