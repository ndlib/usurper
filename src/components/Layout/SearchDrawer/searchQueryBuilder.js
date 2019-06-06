import { ONESEARCH, NDCATALOG, CURATEND, LIBRARY } from 'constants/searchOptions'
import Config from 'shared/Configuration'

const padLeftZero = (num) => {
  if (num.length < 2) {
    return `0${num}`
  }
  return num
}

const onesearchUrl = (queryTerm, isAdvanced, isOnesearch) => {
  const tab = isOnesearch ? 'onesearch' : 'nd_campus'
  const vid = 'NDU'
  const mode = isAdvanced ? 'advanced' : 'basic'
  const searchScope = isOnesearch ? 'malc_blended' : 'nd_campus'

  return `${Config.onesearchBaseURL}/primo-explore/search` +
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
  let searchTerm = ''
  const isAdvanced = searchStore.advancedSearch
  // let searchScope = 'nd_campus'

  if (isAdvanced) {
    // Advanced Search
    for (let i = 0; i < 3; i++) {
      const scope = advancedSearch['scope_' + i] || 'any'
      const precision = advancedSearch['precisionOperator_' + i] || 'contains'
      const freeText = advancedSearch['freeText_' + i] || (i === 0 ? 'alldocuments' : '')
      const bool = i < 3 ? (advancedSearch['bool_' + i] || 'AND') : 'AND'
      if (freeText) {
        searchTerm += i === 0 ? '' : '&'
        searchTerm += `query=${scope},${precision},${encodeURIComponent(freeText)},${bool}`
      }
    }

    const materialType = advancedSearch['materialType'] || 'all_items'
    const language = advancedSearch['language'] || 'all_items'
    const drStartDay = advancedSearch['drStartDay'] || '01'
    const drStartMonth = advancedSearch['drStartMonth'] || '01'
    const drStartYear = advancedSearch['drStartYear5']
    const drEndDay = advancedSearch['drEndDay'] || '31'
    const drEndMonth = advancedSearch['drEndMonth'] || '12'
    const drEndYear = advancedSearch['drEndYear5']
    // searchScope = advancedSearch['scopesListAdvanced'] ? advancedSearch['scopesListAdvanced'] : searchScope

    // Build advanced search query
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
    searchTerm = encodeURIComponent(advancedSearch['basic-search-field'] || '')
  } else {
    // Basic Search
    let searchQuery = encodeURIComponent(advancedSearch['basic-search-field'])
    if (!searchQuery) {
      searchQuery = 'alldocuments'
    }
    searchTerm = `query=any%2Ccontains%2C${searchQuery}`
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
      // window.location = `/search/?q=${searchTerm}`
      // switch to this when search is implemented locally
      history.push(libSearchBasicURL(searchTerm))
      break
    default:
      break
  }
}

export default searchQuery
