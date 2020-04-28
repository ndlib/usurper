// Presenter component for a Event content type from Contentful
import React from 'react'
import PropTypes from 'prop-types'
import typy from 'typy'
import 'static/css/global.css'
import LibMarkdown from 'components/LibMarkdown'
import Link from 'components/Interactive/Link'
import Related from '../Related'
import Image from 'components/Image'
import Librarians from 'components/Librarians'
import PageTitle from 'components/Layout/PageTitle'
import SearchProgramaticSet from 'components/SearchProgramaticSet'
import ServicePoint from '../ServicePoint'
import ShareLinks from 'components/Interactive/ShareLinks'
import OpenGraph from 'components/OpenGraph'
import Media from 'components/Media'
import RecurringIndicator from './RecurringIndicator'
import Presenters from '../../Presenters'
import Sponsorships from '../../Sponsorships'
import AddToCalendar from 'components/Interactive/AddToCalendar'
import InternalLink from '../InternalLink'
import PageLink from '../PageLink'

const PagePresenter = ({ entry }) => {
  let body = entry.content
  if (entry.audience) {
    body += `\n\nOpen to ${typy(entry.audience).safeArray.join(', ')}.`
  }
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
          <div className='event-info'>
            <div className='event-details'>
              <div className='event-detail-date' aria-label={'Date'}>
                { entry.displayDate } <RecurringIndicator entry={entry} inline />
              </div>
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
            <div className='event-buttons'>
              <ShareLinks title={entry.title} />
              <AddToCalendar
                title={entry.title}
                description={entry.shortDescription}
                location={entry.locationText}
                startDate={entry.startDate}
                endDate={entry.endDate}
              />
            </div>
          </div>
          <LibMarkdown itemProp='articleBody'>{ body }</LibMarkdown>
          <Related className='p-resources' title='Resources' showImages={false}>{ entry.relatedResources }</Related>
          <Sponsorships sponsors={entry.sponsors} />
          <Presenters presenters={typy(entry, 'presenters').safeArray} />
        </main>
        <aside className='col-md-4 right'>
          <Image cfImage={entry.representationalImage} className='cover' itemProp='image' />
          <Link to={entry.registrationUrl} className='button callout' hideIfNull>Register for this event</Link>
          { typy(entry.callOutLinks).safeArray.map(link => link.sys.contentType.sys.id === 'internalLink' ? (
            <InternalLink key={link.sys.id} className='button callout' cfEntry={link} />
          ) : (
            <PageLink key={link.sys.id} className='button callout' cfPage={link} />
          )) }
          <Media data={entry.media} />
          <Librarians netids={entry.contactPeople} />
          <ServicePoint cfServicePoint={entry.location} showDetails={false} />
          <Related className='p-pages' title='Related Pages' showImages={false}>{ entry.relatedPages }</Related>
        </aside>
      </div>
      <Link to='/events' className='viewAllEvents' arrow>View All Events</Link>
    </article>
  )
}

PagePresenter.propTypes = {
  entry: PropTypes.object.isRequired,
}

export default PagePresenter
