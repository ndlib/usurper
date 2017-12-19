import { ONESEARCH, NDCATALOG, CURATEND, LIBRARY } from './searchOptions'
const onesearchUrl = (queryTerm, isAdvanced, isOnesearch) => {
  const tab = isOnesearch ? 'onesearch' : 'nd_campus'
  const seachScope = isOnesearch ? 'malc_blended' : 'nd_campus'

  if (isAdvanced) {
    return `http://onesearch.library.nd.edu/primo_library/libweb/action/search.do?fn=search&ct=search&initialSearch=true&mode=Advanced&tab=${tab}&indx=1&dum=true&srt=rank&vid=NDU&frbg=&tb=t${queryTerm}&search_scope=${seachScope}`
  } else {
    return `http://onesearch.library.nd.edu/primo_library/libweb/action/dlSearch.do?bulkSize=10&dym=true&highlight=true&indx=1&institution=NDU&mode=Basic&onCampus=false&pcAvailabiltyMode=true&${queryTerm}&search_scope=${seachScope}&tab=${tab}&vid=NDU&displayField=title&displayField=creator`
  }

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
  let isAdvanced = searchStore.advancedSearch

  if (isAdvanced) {
    // Advanced Search
    const scope0 = advancedSearch['scope_0'] || 'any'
    const scope1 = advancedSearch['scope_1'] || 'any'
    const scope2 = advancedSearch['scope_2'] || 'any'
    const precision0 = advancedSearch['precisionOperator_0'] || 'contains'
    const precision1 = advancedSearch['precisionOperator_1'] || 'contains'
    const precision2 = advancedSearch['precisionOperator_2'] || 'contains'
    const freeText0 = advancedSearch['freeText_0'] || ''
    let freeText1 = advancedSearch['freeText_1'] || ''
    let freeText2 = advancedSearch['freeText_2'] || ''
    const bool0 = advancedSearch['bool_0'] || 'AND'
    const bool1 = advancedSearch['bool_1'] || 'AND'
    const materialType = advancedSearch['materialType'] || 'all_items'
    const language = advancedSearch['language'] || 'all_items'
    const drStartDay = advancedSearch['drStartDay'] || '01'
    const drStartMonth = advancedSearch['drStartMonth'] || '01'
    let drStartYear = advancedSearch['drStartYear5']
    const drEndDay = advancedSearch['drEndDay'] || '31'
    const drEndMonth = advancedSearch['drEndMonth'] || '12'
    let drEndYear = advancedSearch['drEndYear5']
    // Hack to fix weird date insertion on Primo's end of stuff.
    if (drStartYear || drEndYear) {
      if (!freeText1) {
        freeText1 = '\''
      } else if (!freeText2) {
        freeText2 = '\''
      }
    }

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
    `&vl%2816772486UI3%29=${materialType}` +
    `&vl%2824400451UI4%29=${language}`

    // Check if we have a valid date range, otherwise Primo returns an error
    if (drStartYear) {
      // If no end year then use this year
      drEndYear = drEndYear || '9999'
      searchTerm += `&vl%28drStartDay5%29=${drStartDay}` +
                `&vl%28drStartMonth5%29=${drStartMonth}` +
                `&vl%28drStartYear5%29=${drStartYear}` +
                `&vl%28drEndDay5%29=${drEndDay}` +
                `&vl%28drEndMonth5%29=${drEndMonth}` +
                `&vl%28drEndYear5%29=${drEndYear}`
    } else if (drEndYear) {
      // If no start year then start 100 years before end year.
      drStartYear = drStartYear || '0000'
      searchTerm += `&vl%28drStartDay5%29=${drStartDay}` +
                `&vl%28drStartMonth5%29=${drStartMonth}` +
                `&vl%28drStartYear5%29=${drStartYear}` +
                `&vl%28drEndDay5%29=${drEndDay}` +
                `&vl%28drEndMonth5%29=${drEndMonth}` +
                `&vl%28drEndYear5%29=${drEndYear}`
    }

    searchTerm += `&Submit=Search`
  } else if (searchStore.searchType === LIBRARY || searchStore.searchType === CURATEND) {
    searchTerm = advancedSearch['basic-search-field'] || ''
  } else {
    // Basic Search
    searchTerm = `query=any%2Ccontains%2C${advancedSearch['basic-search-field']}`

    switch (searchStore.searchType) {
      case ONESEARCH:
        window.location = onesearchUrl(searchTerm, isAdvanced, true)
        break
      case NDCATALOG:
        window.location = onesearchUrl(searchTerm, isAdvanced, false)
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
}

export default searchQuery
