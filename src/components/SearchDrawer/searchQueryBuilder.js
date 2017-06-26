import { ONESEARCH, NDCATALOG, CURATEND, LIBRARY } from './searchOptions'

const searchQuery = (searchStore, advancedSearch) => {
  const onesearchBasicURL = (queryTerm) => {
    return `http://onesearch.library.nd.edu/primo_library/libweb/action/dlSearch.do?bulkSize=10&dym=true&highlight=true&indx=1&institution=NDU&mode=Basic&onCampus=false&pcAvailabiltyMode=true&query=any%2Ccontains%2C${queryTerm}&search_scope=malc_blended&tab=onesearch&vid=NDU&displayField=title&displayField=creator`
  }

  const ndcatalogBasicURL = (queryTerm) => {
    return `http://onesearch.library.nd.edu/primo_library/libweb/action/dlSearch.do?bulkSize=10&dym=true&highlight=true&indx=1&institution=NDU&mode=Basic&onCampus=false&pcAvailabiltyMode=true&query=any%2Ccontains%2C${queryTerm}&search_scope=nd_campus&tab=nd_campus&vid=NDU&displayField=title&displayField=creator`
  }
  const curateBasicURL = (queryTerm) => {
    return `https://curate.nd.edu/catalog?utf8=%E2%9C%93&amp;search_field=all_fields&amp;q=${queryTerm}`
  }
  const libSearchBasicURL = (queryTerm) => {
    return `/search?q=${queryTerm}`
  }

  if (searchStore.advancedSearch) {

  } else {
    // Basic Search
    const searchTerm = advancedSearch['basic-search-field'] || ''
    switch (searchStore.searchType) {
      case ONESEARCH:
        window.location = onesearchBasicURL(searchTerm)
        break
      case NDCATALOG:
        window.location = ndcatalogBasicURL(searchTerm)
        break
      case CURATEND:
        window.location = curateBasicURL(searchTerm)
        break
      case LIBRARY:
        return libSearchBasicURL(searchTerm)
      default:
        return libSearchBasicURL(searchTerm)
    }
  }
}

export default searchQuery
