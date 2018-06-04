import { ONESEARCH, NDCATALOG, CURATEND, LIBRARY } from './searchOptions'

const padLeftZero = (num) => {
  if (num.length < 2) {
    return `0${num}`
  }
  return num
}

const onesearchUrl = (queryTerm, isAdvanced, isOnesearch) => {
  const tab = isOnesearch ? 'onesearch' : 'nd_campus'
  const seachScope = isOnesearch ? 'malc_blended' : 'nd_campus'
  const isProduction = window.location.hostname === 'library.nd.edu'
  const env = isProduction ? '' : 'pprd'
  const vid = isProduction ? 'NDU' : 'NDUA'
  const mode = isAdvanced ? 'advanced' : 'basic'
  return `http://onesearch${env}.library.nd.edu/primo-explore/search` +
    `?${queryTerm}` +
    `&institution=NDU` +
    `&vid=${vid}` +
    `&tab=${tab}` +
    `&search_scope=${seachScope}` +
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

    // Build advanced search query
    searchTerm = `query=${scope0},${precision0},${freeText0}`
    if (freeText1 !== '') {
      searchTerm += `,${bool0}&query=${scope1},${precision1},${freeText1}`
    }
    if (freeText2 !== '') {
      searchTerm += `,${bool1}&query=${scope2},${precision2},${freeText2}`
    }

    if (materialType !== 'all_items') {
      searchTerm += `,AND&pfilter=pfilter,exact,${materialType}`
    }
    if (language !== 'all_items') {
      searchTerm += `,AND&pfilter=lang,exact,${language}`
    }
    if (drStartYear) {
      searchTerm += `,AND&pfilter=dr_s,exact,${drStartYear}${padLeftZero(drStartMonth)}${padLeftZero(drStartDay)}`
    }
    if (drEndYear) {
      searchTerm += `,AND&pfilter=dr_e,exact,${drEndYear}${padLeftZero(drEndMonth)}${padLeftZero(drEndDay)}`
    }
    searchTerm += ',AND'
  } else if (searchStore.searchType === LIBRARY || searchStore.searchType === CURATEND) {
    searchTerm = advancedSearch['basic-search-field'] || ''
  } else {
    // Basic Search
    searchTerm = `query=any%2Ccontains%2C${advancedSearch['basic-search-field']}`
  }
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
      window.location = `https://search.nd.edu/search/?client=lib_site_srch&site=library&q=${searchTerm}`
      // switch to this when search is implemented locally
      // history.push(libSearchBasicURL(searchTerm))
      break
    default:
      break
  }
}

export default searchQuery
