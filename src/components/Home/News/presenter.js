import React from 'react'
import NewsCard from 'components/NewsCard'
import LegacyNewsCard from 'components/NewsCard/Legacy'
import Link from 'components/Interactive/Link'
import Config from 'shared/Configuration'

import './style.css'

const News = (entries) => {
  return (
    <div className={(Config.features.exhibitsEnabled ? 'col-md-7' : 'col-md-6') + ' col-xs-12'}>
      <section aria-label='News' className='newsSection'>
        <Link to='/news' className='newsEventHeader'><h1>News</h1></Link>
        { Config.features.exhibitsEnabled && (
          <hr aria-hidden='true' />
        )}
        <div className={'newsList' + (Config.features.exhibitsEnabled ? '' : ' legacy')}>
          { Config.features.exhibitsEnabled
            ? entries.map(entry => <NewsCard key={entry.sys.id} entry={entry} isHome />)
            : entries.map(entry => <LegacyNewsCard key={entry.sys.id} entry={entry} />)
          }
        </div>
        <Link to='/news' className='newsEventsLink' arrow>View All News</Link>
      </section>
    </div>
  )
}

export default News
