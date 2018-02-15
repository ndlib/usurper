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
import OpenGraph from '../../OpenGraph'
import Presenters from '../../Presenters'
import AddToCalendar from '../../AddToCalendar'

const PagePresenter = ({ entry }) => {
  return (
    <article
      className='container-fluid content-area'
      itemScope
      itemType='http://schema.org/Event'
      itemProp='mainEntity'
    >
      {entry.shortDescription && (<meta name='description' content={entry.shortDescription} />) }
      <meta itemProp='startDate' content={entry.startDate} />
      <meta itemProp='endDate' content={entry.endDate} />
      <PageTitle title={entry.title} itemProp='name' />
      <OpenGraph
        title={entry.title}
        description={entry.shortDescription}
        image={entry.image}
      />
      <SearchProgramaticSet open={false} />
      <div className='row'>
        <main className='col-md-8'>
          <div className='event-details'>
            <div className='event-detail-header'>Date</div>
            <div>{ entry.displayDate }</div>
            <div className='event-detail-header'>Time</div>
            <div><LibMarkdown className='event-detail-time'>{ entry.displayTime }</LibMarkdown></div>
          </div>
          {
            entry.locationOverride && (
              <div className='event-details'>
                <div className='event-detail-header'>Location</div>
                <div>{ entry.locationOverride }</div>
              </div>
            )
          }
          <LibMarkdown itemProp='description'>{ entry.content }</LibMarkdown>
          <Related className='p-resources' title='Resources' showImages={false}>{ entry.relatedResources }</Related>
          <ShareLinks title={entry.title} />
          <AddToCalendar
            title={entry.title}
            description={entry.shortDescription}
            location={entry.locationOverride}
            startDate={entry.startDate}
            endDate={entry.endDate}
          />
          <Link to='/events' className='viewAll viewNewsEvents'>View All Events</Link>
        </main>
        <aside className='col-md-4 right'>
          <Image cfImage={entry.representationalImage} className='cover' />
          <Link to={entry.registrationUrl} className='button callout' hideIfNull>Register Here</Link>
          <Librarians netids={entry.contactPeople} />
          <ServicePoint cfServicePoint={entry.location} showDetails={false} />
          <Related className='p-pages' title='Related Pages' showImages={false}>{ entry.relatedPages }</Related>
        </aside>
      </div>
    </article>
  )
}

PagePresenter.propTypes = {
  entry: PropTypes.object.isRequired,
}

export default PagePresenter
