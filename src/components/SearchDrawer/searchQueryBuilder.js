import { ONESEARCH, NDCATALOG, CURATEND, LIBRARY } from './searchOptions'
const onesearchBasicURL = (queryTerm) => {
  return `http://onesearch.library.nd.edu/primo_library/libweb/action/dlSearch.do?bulkSize=10&dym=true&highlight=true&indx=1&institution=NDU&mode=Basic&onCampus=false&pcAvailabiltyMode=true&query=${queryTerm}&search_scope=malc_blended&tab=onesearch&vid=NDU&displayField=title&displayField=creator`
}
const ndcatalogBasicURL = (queryTerm) => {
  return `http://onesearch.library.nd.edu/primo_library/libweb/action/dlSearch.do?bulkSize=10&dym=true&highlight=true&indx=1&institution=NDU&mode=Basic&onCampus=false&pcAvailabiltyMode=true&query=${queryTerm}&search_scope=nd_campus&tab=nd_campus&vid=NDU&displayField=title&displayField=creator`
}
const onesearchAdvancedURL = (queryTerm,) => {
  return `http://onesearch.library.nd.edu/primo_library/libweb/action/search.do?fn=search&ct=search&initialSearch=true&mode=Advanced&tab=onesearch&indx=1&dum=true&srt=rank&vid=NDU&frbg=&tb=t${queryTerm}`
}
const ndcatalogAdvancedURL = (queryTerm) => {
  return `http://onesearch.library.nd.edu/primo_library/libweb/action/search.do?fn=search&ct=search&initialSearch=true&mode=Advanced&tab=nd_campus&indx=1&dum=true&srt=rank&vid=NDU&frbg=&tb=t${queryTerm}`
}
const curateBasicURL = (queryTerm) => {
  return `https://curate.nd.edu/catalog?utf8=%E2%9C%93&amp;search_field=all_fields&amp;q=${queryTerm}`
}
const libSearchBasicURL = (queryTerm) => {
  return `/search?q=${queryTerm}`
}

// Actual searchQuery function
const searchQuery = (searchStore, advancedSearch, history) => {
  let searchTerm

  if (searchStore.advancedSearch) {
    // Advanced Search
    const scope0 = advancedSearch['scope_0'] || 'any'
    const scope1 = advancedSearch['scope_1'] || 'any'
    const scope2 = advancedSearch['scope_2'] || 'any'
    const precision0 = advancedSearch['precisionOperator_0'] || 'contains'
    const precision1 = advancedSearch['precisionOperator_1'] || 'contains'
    const precision2 = advancedSearch['precisionOperator_2'] || 'contains'
    const freeText0 = advancedSearch['freeText_0'] || ''
    const freeText1 = advancedSearch['freeText_1'] || ''
    const freeText2 = advancedSearch['freeText_2'] || ''
    const bool0 = advancedSearch['bool_0'] || 'AND'
    const bool1 = advancedSearch['bool_1'] || 'AND'
    const materialType = advancedSearch['materialType'] || 'all_items'
    const language = advancedSearch['language'] || 'all_items'
    const drStartDay = advancedSearch['drStartDay'] || '00'
    const drStartMonth = advancedSearch['drStartMonth'] || '00'
    const drStartYear = advancedSearch['drStartYear5'] || '1900'
    const drEndDay = advancedSearch['drEndDay'] || '00'
    const drEndMonth = advancedSearch['drEndMonth'] || '00'
    const drEndYear = advancedSearch['drEndYear5'] || '9999'
    const scopesListAdvanced = advancedSearch['scopesListAdvanced'] || 'scope:(hathi_pub),scope:(ndulawrestricted),scope:(dtlrestricted),scope:(NDU),scope:(NDLAW),scope:(ndu_digitool)'

    searchTerm = `&vl%2816833817UI0%29=${scope0}` +
    `&vl%28UIStartWith0%29=${precision0}` +
    `&vl%28freeText0%29=${freeText0}` +
    `&vl%28boolOperator0%29=${bool0}` +
    `&vl%2816833818UI1%29=${scope1}` +
    `&vl%281UIStartWith1%29=${precision1}` +
    `&vl%28freeText1%29=${freeText1}` +
    `&vl%28boolOperator1%29=${bool1}` +
    `&vl%2816833819UI2%29=${scope2}` +
    `&vl%281UIStartWith2%29=${precision2}` +
    `&vl%28freeText2%29=${freeText2}` +
    `&vl%28boolOperator2%29=AND` +
    `&vl%2816772486UI3%29=${materialType}` +
    `&vl%2824400451UI4%29=${language}` +
    `&vl%28drStartDay5%29=${drStartDay}` +
    `&vl%28drStartMonth5%29=${drStartMonth}` +
    `&vl%28drStartYear5%29=${drStartYear}` +
    `&vl%28drEndDay5%29=${drEndDay}` +
    `&vl%28drEndMonth5%29=${drEndMonth}` +
    `&vl%28drEndYear5%29=${drEndYear}`
    if (searchStore.searchType === NDCATALOG) {
      searchTerm += `&scp.scps=${scopesListAdvanced}`
    }
    searchTerm += `&Submit=Search`
  } else {
    // Basic Search
    searchTerm = advancedSearch['basic-search-field'] || ''
  }

  switch (searchStore.searchType) {
    case ONESEARCH:
      if (searchStore.advancedSearch) {
        window.location = onesearchAdvancedURL(searchTerm)
      } else {
        searchTerm = 'any%2Ccontains%2C' + searchTerm
        window.location = onesearchBasicURL(searchTerm)
      }
      break
    case NDCATALOG:
      if (searchStore.advancedSearch) {
        window.location = ndcatalogAdvancedURL(searchTerm)
      } else {
        searchTerm = 'any%2Ccontains%2C' + searchTerm
        window.location = ndcatalogBasicURL(searchTerm)
      }
      break
    case CURATEND:
      window.location = curateBasicURL(searchTerm)
      break
    case LIBRARY:
      window.location = `https://search.nd.edu/search/?client=lib_site_srch&site=library;q=${searchTerm}`
      // switch to this when search is implemented locally
      // history.push(libSearchBasicURL(searchTerm))
      break
    default:
      break
  }
}

export default searchQuery
