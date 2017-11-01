// Presenter component for a Page content type from Contentful
import React from 'react'
import PropTypes from 'prop-types'
import '../../../static/css/global.css'
import LibMarkdown from '../../LibMarkdown'
import Related from '../../Related'
import PageTitle from '../../PageTitle'
import SearchProgramaticSet from '../../SearchProgramaticSet'
import ServicePoint from '../ServicePoint'
import PageAlert from '../Alert/Page'
import ContactPoint from '../ContactPoint/'
const PagePresenter = ({ cfPageEntry }) => (
  <article aria-describedby="main-page-title" className='container-fluid content-area'>
    <PageTitle title={cfPageEntry.fields.title} />

    <SearchProgramaticSet open={cfPageEntry.fields.searchPanelOpen} />
    <div className='row'>
      <main className='col-md-8 col-sm-7'>
        <PageAlert alert={cfPageEntry.fields.alert} />
        <LibMarkdown>{ cfPageEntry.fields.body }</LibMarkdown>
        <div className='mobile-only'>
          <ContactPoint cfPageEntry={cfPageEntry} mobile />
        </div>
          <Related
            className='p-resources'
            title={cfPageEntry.fields.relatedResourcesTitleOverride ? cfPageEntry.fields.relatedResourcesTitleOverride : 'Resources'}
            showImages={false}
          >
            { cfPageEntry.fields.relatedResources }
          </Related>
          <Related className='p-guides' title='Guides' showTitle={false} showImages={false}>{ cfPageEntry.fields.libguides }</Related>
          <Related className='p-services' title='Services'>{ cfPageEntry.fields.relatedServices }</Related>
          {
            cfPageEntry.fields.relatedExtraSections && cfPageEntry.fields.relatedExtraSections.map((entry, index) => {
              let fields = entry.fields
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
