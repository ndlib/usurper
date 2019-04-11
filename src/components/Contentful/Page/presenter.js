// Presenter component for a Page content type from Contentful
import React from 'react'
import PropTypes from 'prop-types'
import '../../../static/css/global.css'
import LibMarkdown from '../../LibMarkdown'
import Related from '../../Related'
import PageTitle from '../../PageTitle'
import SearchProgramaticSet from '../../SearchProgramaticSet'
import PageAlert from '../Alert/Page'
import ContactPoint from '../ContactPoint/'
import OpenGraph from '../../OpenGraph'
import Link from '../../Link'

const PagePresenter = ({ cfPageEntry }) => (
  <article aria-describedby='main-page-title' className='container-fluid content-area'>
    {cfPageEntry.fields.parentPage && (
      <Link to={cfPageEntry.fields.parentPage.fields.slug} className='breadcrumb'>
        Back to {cfPageEntry.fields.parentPage.fields.alternateTitle || cfPageEntry.fields.parentPage.fields.title}
      </Link>
    )}
    {cfPageEntry.fields.shortDescription && (<meta name='description' content={cfPageEntry.fields.shortDescription} />)}
    <PageTitle title={cfPageEntry.fields.title} />
    <OpenGraph
      title={cfPageEntry.fields.title}
      description={cfPageEntry.fields.shortDescription}
      image={cfPageEntry.fields.image}
    />
    <SearchProgramaticSet open={cfPageEntry.fields.searchPanelOpen} />
    <div className='row'>
      <main className='col-md-8 col-sm-7'>
        <div className='pageAlertContainer'>
          <PageAlert alerts={cfPageEntry.fields.alerts} />
        </div>
        <div className='mobile-only'>
          <ContactPoint cfPageEntry={cfPageEntry} mobile />
        </div>
        <LibMarkdown>{ cfPageEntry.fields.body }</LibMarkdown>
        <Related
          className='p-resources'
          title={cfPageEntry.fields.relatedResourcesTitleOverride
            ? cfPageEntry.fields.relatedResourcesTitleOverride
            : 'Resources'}
          showImages={false}
        >
          { cfPageEntry.fields.relatedResources }
        </Related>
        <Related className='p-guides' title='Guides' showTitle={false} showImages={false}>
          { cfPageEntry.fields.libguides }
        </Related>
        <Related className='p-services' title='Services'>{ cfPageEntry.fields.relatedServices }</Related>
        {
          cfPageEntry.fields.relatedExtraSections && cfPageEntry.fields.relatedExtraSections.map((entry, index) => {
            const fields = entry.fields
            let className = 'p-resources'
            let showImages = false
            if (fields.type) {
              switch (fields.type) {
                case 'Guides':
                  className = 'p-guides'
                  break
                case 'Services':
                  className = 'p-services'
                  showImages = true
                  break
                default:
                  className = 'p-resources'
              }
            }
            return (
              <Related
                className={className}
                title={fields.title}
                showImages={showImages}
                key={index + '_related'}
              >
                { fields.links }
              </Related>
            )
          })
        }
      </main>
      <ContactPoint cfPageEntry={cfPageEntry} mobile={false} />
    </div>
  </article>
)

PagePresenter.propTypes = {
  cfPageEntry: PropTypes.object.isRequired,
}

export default PagePresenter
