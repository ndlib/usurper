import { ONESEARCH, NDCATALOG, CURATEND, LIBRARY } from './searchOptions'

const padLeftZero = (num) => {
  if (num.length < 2) {
    return `0${num}`
  }
  return num
}

const onesearchUrl = (queryTerm, isAdvanced, isOnesearch) => {
  const tab = isOnesearch ? 'onesearch' : 'nd_campus'
  const isProduction = window.location.hostname === 'library.nd.edu'
  const env = isProduction ? '' : 'pprd'
  const vid = 'NDU'
  const mode = isAdvanced ? 'advanced' : 'basic'
  const searchScope = isOnesearch ? 'malc_blended' : 'nd_campus'

  return `http://onesearch${env}.library.nd.edu/primo-explore/search` +
    `?${queryTerm}` +
    `&institution=NDU` +
    `&vid=${vid}` +
    `&tab=${tab}` +
    `&search_scope=${searchScope}` +
    `&mode=${mode}` +
    `&displayMode=full` +
    `&bulkSize=10` +
    `&highlight=true` +
    `&dum=true` +
    `&displayField=all` +
    `&pcAvailabiltyMode=true`
    // `&onCampus=false`
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
  // let searchScope = 'nd_campus'

  if (isAdvanced) {
    // Advanced Search
    const scope0 = advancedSearch['scope_0'] || 'any'
    const scope1 = advancedSearch['scope_1'] || 'any'
    const scope2 = advancedSearch['scope_2'] || 'any'
    const precision0 = advancedSearch['precisionOperator_0'] || 'contains'
    const precision1 = advancedSearch['precisionOperator_1'] || 'contains'
    const precision2 = advancedSearch['precisionOperator_2'] || 'contains'
    const freeText0 = advancedSearch['freeText_0'] || 'alldocuments'
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
    // searchScope = advancedSearch['scopesListAdvanced'] ? advancedSearch['scopesListAdvanced'] : searchScope

    // Build advanced search query
    searchTerm = `query=${scope0},${precision0},${freeText0},${bool0}`
    if (freeText1 !== '') {
      searchTerm += `&query=${scope1},${precision1},${freeText1},${bool1}`
    }
    if (freeText2 !== '') {
      searchTerm += `&query=${scope2},${precision2},${freeText2},AND`
    }

    if (materialType !== 'all_items') {
      searchTerm += `&pfilter=pfilter,exact,${materialType},AND`
    }
    if (language !== 'all_items') {
      searchTerm += `&pfilter=lang,exact,${language},AND`
    }
    if (drStartYear) {
      searchTerm += `&pfilter=dr_s,exact,${drStartYear}${padLeftZero(drStartMonth)}${padLeftZero(drStartDay)},AND`
    }
    if (drEndYear) {
      searchTerm += `&pfilter=dr_e,exact,${drEndYear}${padLeftZero(drEndMonth)}${padLeftZero(drEndDay)},AND`
    }
  } else if (searchStore.searchType === LIBRARY || searchStore.searchType === CURATEND) {
    searchTerm = advancedSearch['basic-search-field'] || ''
  } else {
    // Basic Search
    let searchQuery = advancedSearch['basic-search-field']
    if (!searchQuery) {
      searchQuery = 'alldocuments'
    }
    searchTerm = `query=any%2Ccontains%2C${searchQuery}`
  }

  switch (searchStore.searchType) {
    case ONESEARCH:
      window.location = onesearchUrl(searchTerm, isAdvanced, true,)
      break
    case NDCATALOG:
      window.location = onesearchUrl(searchTerm, isAdvanced, false)
      break
    case CURATEND:
      window.location = curateBasicURL(searchTerm)
      break
    case LIBRARY:
      // window.location = `/search/?q=${searchTerm}`
      // switch to this when search is implemented locally
      history.push(libSearchBasicURL(searchTerm))
      break
    default:
      break
  }
}

export default searchQuery
