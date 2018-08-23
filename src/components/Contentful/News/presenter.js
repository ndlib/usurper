// Presenter component for a Page content type from Contentful
import React from 'react'
import PropTypes from 'prop-types'
import '../../../static/css/global.css'
import LibMarkdown from '../../LibMarkdown'
import Related from '../../Related'
import Image from '../../Image'
import Link from '../../Link'
import Contact from '../../Contact/ServicePoint'
import Librarians from '../../Librarians'
import PageTitle from '../../PageTitle'
import SearchProgramaticSet from '../../SearchProgramaticSet'
import CurrentHours from '../../Hours/Current'
import PageLink from '../PageLink'
import { formatDate } from '../../../shared/DateLibs.js'
import ShareLinks from '../../ShareLinks'
import OpenGraph from '../../OpenGraph'

const PagePresenter = ({ entry }) => (
  <article
    className='container-fluid content-area news-article'
    itemScope
    itemType='http://schema.org/NewsArticle'
    itemProp='mainEntity'
  >
    {entry.fields.shortDescription && (<meta name='description' content={entry.fields.shortDescription} />) }
    <PageTitle title={entry.fields.title} itemProp='headline' classes='col-md-8 col-sm-8'>
      <div className='tagline news col-md-12'>
        { entry.fields.author && <div className='author'>{ 'By ' + entry.fields.author }</div> }
        { entry.fields.publishedDate && (
          <div className={'published' + (entry.fields.author ? ' separator' : '')}>
            { formatDate(entry.fields.publishedDate) }
          </div>
        )}
        <ShareLinks className='separator' title={entry.fields.title} />
        { entry.fields.prevPublishedUrl && (
          <div className='prevPubDate'>
            Previously Published&nbsp;
            <Link to={entry.fields.prevPublishedUrl}>
              { entry.fields.prevPublishedUrl }
            </Link>
          </div>
        )}
      </div>
    </PageTitle>
    <OpenGraph
      title={entry.fields.title}
      description={entry.fields.shortDescription}
      image={entry.fields.image}
    />
    <SearchProgramaticSet open={false} />
    <div className='row'>
      <main className='col-md-8 col-sm-8 article'>
        <Image cfImage={entry.fields.image} className='news cover' itemProp='image' />
        <LibMarkdown itemProp='articleBody'>{ entry.fields.content }</LibMarkdown>
        <LibMarkdown >{ entry.fields.articleContacts }</LibMarkdown>
        <Related className='p-resources' title='Resources' showImages={false}>{ entry.fields.relatedResources }</Related>
        <Link to='/news' className='newsEventsLink viewAll'>View All News</Link>
      </main>
      <aside className='col-md-4 col-sm-4 right news'>
        <Librarians netids={entry.fields.contactPeople} />
        <Related className='p-pages' title='Related Pages' showImages={false}>{ entry.fields.relatedPages }</Related>
      </aside>
    </div>
  </article>
)

PagePresenter.propTypes = {
  entry: PropTypes.object.isRequired,
}

export default PagePresenter
