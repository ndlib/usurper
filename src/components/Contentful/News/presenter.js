// Presenter component for a Page content type from Contentful
import React from 'react'
import PropTypes from 'prop-types'
import 'static/css/global.css'
import LibMarkdown from 'components/LibMarkdown'
import Related from '../Related'
import Image from 'components/Image'
import Link from 'components/Interactive/Link'
import Librarians from 'components/Librarians'
import PageTitle from 'components/Layout/PageTitle'
import SearchProgramaticSet from 'components/SearchProgramaticSet'
import { formatDate } from 'shared/DateLibs.js'
import ShareLinks from 'components/Interactive/ShareLinks'
import OpenGraph from 'components/OpenGraph'

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
        <Image cfImage={entry.fields.image} className='news cover' itemProp='image' width={747} />
        <LibMarkdown itemProp='articleBody'>{ entry.fields.content }</LibMarkdown>
        <LibMarkdown className='contactNews'>{ entry.fields.contactUsPubInfo }</LibMarkdown>
        <Related className='p-resources' title='Resources' showImages={false}>
          { entry.fields.relatedResources }
        </Related>
        <Link to='/news' className='newsEventsLink' arrow>View All News</Link>
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
