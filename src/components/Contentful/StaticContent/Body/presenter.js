// Presenter component for a Floor content type from Contentful
import React from 'react'
import PropTypes from 'prop-types'
import 'static/css/global.css'
import Related from '../../Related'
import LibMarkdown from 'components/LibMarkdown'

const Presenter = ({ cfStatic, showDescription, children }) => (
  <div key={`ContentfulSidebar_${cfStatic.sys.id}_main`} role='complementary'>
    { cfStatic.fields.shortDescription && (
      <React.Fragment>
        <meta name='description' content={cfStatic.fields.shortDescription} />
        {showDescription && (
          <LibMarkdown>{cfStatic.fields.shortDescription}</LibMarkdown>
        )}
      </React.Fragment>
    )}
    {children}
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
  cfStatic: PropTypes.shape({
    sys: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
    fields: PropTypes.shape({
      shortDescription: PropTypes.string,
      relatedResources: PropTypes.any,
      libguides: PropTypes.any,
      relatedServices: PropTypes.any,
    }).isRequired,
  }).isRequired,
  showDescription: PropTypes.bool,
  children: PropTypes.node,
}

export default Presenter
