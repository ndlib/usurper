import React from 'react'
import PageTitle from 'components/Layout/PageTitle'
import SearchProgramaticSet from 'components/SearchProgramaticSet'
import NewsCard from 'components/NewsCard'

const News = (entries) => {
  return (
    <section className='col-md-8 col-xs-12'>
      <PageTitle title='News' />
      <SearchProgramaticSet open={false} />
      <div>
        {entries.map(entry => <NewsCard key={entry.sys.id} entry={entry} />)}
      </div>
    </section>
  )
}

export default News
