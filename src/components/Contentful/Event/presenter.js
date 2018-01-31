// Presenter component for a Event content type from Contentful
import React from 'react'
import PropTypes from 'prop-types'
import '../../../static/css/global.css'
import LibMarkdown from '../../LibMarkdown'
import Link from '../../Link'
import Related from '../../Related'
import Image from '../../Image'
import Librarians from '../../Librarians'
import PageTitle from '../../PageTitle'
import SearchProgramaticSet from '../../SearchProgramaticSet'
import ServicePoint from '../ServicePoint'
import ShareLinks from '../../ShareLinks'
import Presenters from '../../Presenters'
import { formatDate, hour12 } from '../../../shared/DateLibs.js'

const PagePresenter = ({ entry }) => {
  const defaultTime = `${hour12(new Date(entry.fields.startDate))} - ${hour12(new Date(entry.fields.endDate))}`
  const eventTime = entry.fields.timeOverride !== undefined ? entry.fields.timeOverride : defaultTime
  return (
    <article
      className='container-fluid content-area'
      itemScope
      itemType='http://schema.org/Event'
      itemProp='mainEntity'
    >
      {entry.fields.shortDescription && (<meta name='description' content={entry.fields.shortDescription} />) }
      <meta itemProp='startDate' content={entry.fields.startDate} />
      <meta itemProp='endDate' content={entry.fields.endDate} />
      <PageTitle title={entry.fields.title} itemProp='name' />
      <SearchProgramaticSet open={false} />
      <div className='row'>
        <main className='col-md-8'>
          <div className='event-details'>
            <div className='event-detail-header'>Date</div>
            <div>{ formatDate(entry.fields.startDate) } - { formatDate(entry.fields.endDate) }</div>
            <div className='event-detail-header'>Time</div>
            <div><LibMarkdown className='event-detail-time'>{ eventTime }</LibMarkdown></div>
          </div>
          {
            entry.fields.locationOverride && (
              <div className='event-details'>
                <div className='event-detail-header'>Location</div>
                <div>{ entry.fields.locationOverride }</div>
              </div>
            )
          }
          <LibMarkdown itemProp='description'>{ entry.fields.content }</LibMarkdown>
          <Related className='p-resources' title='Resources' showImages={false}>{ entry.fields.relatedResources }</Related>
          { entry.fields.presenters && (<Presenters presenters={entry.fields.presenters} />) }
          <ShareLinks title={entry.fields.title} />
        </main>
        <aside className='col-md-4 right'>
          <Image cfImage={entry.fields.representationalImage} className='cover' />
          <Link to={entry.fields.registrationUrl} className='button callout' hideIfNull>Register Here</Link>
          <Librarians netids={entry.fields.contactPeople} />
          <ServicePoint cfServicePoint={entry.fields.location} showHours={false} />
          <Related className='p-pages' title='Related Pages' showImages={false}>{ entry.fields.relatedPages }</Related>
        </aside>
      </div>
    </article>
  )
}

PagePresenter.propTypes = {
  entry: PropTypes.object.isRequired,
}

export default PagePresenter
