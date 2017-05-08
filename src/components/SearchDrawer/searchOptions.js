import React from 'react'
export const searchOptions = [
  {
    title: 'OneSearch',
    description:'The ND Catalog plus articles, datasets and more',
    target: 'https://library.nd.edu/utilities/search/ndu/onesearch',
    additionalLinks: (<a href='http://library.nd.edu/utilities/search/ndu/onesearch?mode=Advanced'>Advanced Search</a>)
  },
  {
    title: 'ND Catalog',
    description:'Print and electronic books, journals and databases',
    target: 'https://library.nd.edu/utilities/search/ndu/nd_campus',
    additonalLinks: (<a href='http://library.nd.edu/utilities/search/ndu/ndcampus?mode=Advanced'>Advanced Search</a> | <a href='http://alephprod.library.nd.edu/F/?func=find-b-0'>Catalog classNameic</a>)
  },
  {
    title: 'CurateND',
    description:'Theses, dissertations and articles by ND researchers',
    target: 'https://curate.nd.edu/catalog?utf8=%E2%9C%93&amp;search_field=all_fields&amp;q='
  },
  {
    title: 'Library Website',
    description:'Research guides, services, people and places',
    target: 'https://search.nd.edu/search/?client=lib_site_srch&amp;q=',
    additonalLinks: 'This doesn\'t work yet, but we\'re working on it'
  }
]
