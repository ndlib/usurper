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
import Media from '../../Media'
import Presenters from '../../Presenters'
import Sponsorships from '../../Sponsorships'
import AddToCalendar from '../../AddToCalendar'

const PagePresenter = ({ entry }) => {
  return (
    <article
      className='container-fluid content-area'
      itemScope
      itemType='http://schema.org/Event'
      itemProp='mainEntity'
    >
      {entry.shortDescription && (<meta itemProp='description' content={entry.shortDescription} />) }
      <meta itemProp='startDate' content={entry.startDate} />
      <meta itemProp='endDate' content={entry.endDate} />
      <PageTitle title={entry.title} itemProp='name' />
      <OpenGraph
        title={entry.title}
        description={entry.shortDescription}
        image={entry.representationalImage}
      />
      <SearchProgramaticSet open={false} />
      <div className='row'>
        <main className='col-md-8 article'>
          <div className='event-details'>
            <div className='event-detail-date' aria-label={'Date'}>{entry.displayDate }</div>
            <div className='event-detail-time' aria-label={'Time'}>
              <LibMarkdown>{ entry.displayTime }</LibMarkdown>
            </div>
            {
              entry.locationText && (
                <div
                  className='event-detail-location'
                  aria-label='Location'
                  itemScope
                  itemType='http://schema.org/Place'
                  itemProp='location'
                >
                  <LibMarkdown itemProp='address'>{ entry.locationText }</LibMarkdown>
                </div>
              )
            }
          </div>
          <LibMarkdown itemProp='articleBody'>{ entry.content }</LibMarkdown>
          <Related className='p-resources' title='Resources' showImages={false}>{ entry.relatedResources }</Related>
          <Sponsorships sponsors={entry.sponsors} />
          <Presenters presenters={entry.presenters} />
          <ShareLinks title={entry.title} />
          <AddToCalendar
            title={entry.title}
            description={entry.shortDescription}
            location={entry.locationText}
            startDate={entry.startDate}
            endDate={entry.endDate}
          />
          <Link to='/events' className='viewAll viewNewsEvents'>View All Events</Link>
        </main>
        <aside className='col-md-4 right'>
          <Image cfImage={entry.representationalImage} className='cover' itemProp='image' />
          <Link to={entry.registrationUrl} className='button callout' hideIfNull>Register Here</Link>
          <Media data={entry.media} />
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
