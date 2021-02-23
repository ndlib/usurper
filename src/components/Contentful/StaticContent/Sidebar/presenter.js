// Presenter component for a Floor content type from Contentful
import React from 'react'
import PropTypes from 'prop-types'
import 'static/css/global.css'
import LibMarkdown from 'components/LibMarkdown'
import PageLink from '../../PageLink'
import Librarians from 'components/Librarians'
import Related from '../../Related'
import ServicePoint from 'components/Contentful/ServicePoint'

const Presenter = ({ cfStatic, inline, showDescription }) => (
  <aside key={`ContentfulSidebar_${cfStatic.sys.id}`} className={inline ? '' : 'col-md-4 col-sm-5 col-xs-12 right'}>
    <PageLink className='button callout' cfPage={cfStatic.fields.callOutLink} />
    {showDescription ? <LibMarkdown>{cfStatic.fields.shortDescription}</LibMarkdown> : null}
    <Librarians netids={cfStatic.fields.contactPeople} />
    {
      cfStatic.fields.servicePoints && cfStatic.fields.servicePoints.map((point, index) => {
        return <ServicePoint cfServicePoint={point} key={index + '_point'} />
      })
    }
    <Related className='p-pages' title='Related Pages' showImages={false}>{ cfStatic.fields.relatedPages }</Related>
  </aside>
)

Presenter.propTypes = {
  cfStatic: PropTypes.object.isRequired,
  inline: PropTypes.bool,
}

export default Presenter
