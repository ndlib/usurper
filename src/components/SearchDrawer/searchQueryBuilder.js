import { searchOptions } from './searchOptions'
import { ONESEARCH, NDCATALOG, CURATEND, LIBRARY } from './searchTypes'

const searchQuery = (searchTarget, q) => {
  switch (searchTarget) {
    case ONESEARCH:
      return ''
    case NDCATALOG:
      return ''
    case CURATEND:
      return 'https://curate.nd.edu/catalog?utf8=%E2%9C%93&amp;search_field=all_fields&amp;q='
    case LIBRARY:
      return 'https://search.nd.edu/search/?client=lib_site_srch&amp;q='
    default:
      return ''
  }
}

export default searchQuery
