// Presenter component for a Floor content type from Contentful
import React from 'react'
import PropTypes from 'prop-types'
import '../../../../static/css/global.css'
import Related from '../../../Related'

const Presenter = ({ cfStatic }) => (
  <div key={`ContentfulSidebar_${cfStatic.sys.id}_main`} role='complementary'>
    { cfStatic.fields.shortDescription && (
      <meta name='description' content={cfStatic.fields.shortDescription} />
    )}
    <Related className='p-resources' title='Resources' showImages={false}>
      { cfStatic.fields.relatedResources }
    </Related>
    <Related className='p-guides' title='Guides' showTitle={false} showImages={false}>
      { cfStatic.fields.libguides }
    </Related>
    <Related className='p-services' title='Services'>
      { cfStatic.fields.relatedServices }
    </Related>
  </div>
)

Presenter.propTypes = {
  cfStatic: PropTypes.object.isRequired,
}

export default Presenter
