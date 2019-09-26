/* eslint complexity: ["warn", 15] */
// Helper functions are not something that should need regular maintenance. They should "just work",
// and their inner-workings often need to be complex to accommodate generic usage.

import typy from 'typy'

import * as statuses from 'constants/APIStatuses'
import Config from 'shared/Configuration'

export const filterList = (list, filterFields, filterValue) => {
  const value = filterValue.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')

  return list.filter((item) => {
    let inFilter = false
    if (!filterFields || !filterFields.length) {
      inFilter = typy(value).isTruthy
    } else {
      if (!Array.isArray(filterFields)) {
        filterFields = [ filterFields ]
      }
      filterFields.forEach((field) => {
        inFilter = inFilter || (item && item[field] && item[field].toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').indexOf(value) >= 0)
      })
    }
    return inFilter
  })
}

// NOTE: Internal function uses typy on sortKeys. This means you can use typy syntax when specifying sort keys,
// which is particularly useful when you have nested keys in your object structure. For instance, you might supply
// an array ['fields.title', 'fields.subtitle'] which would order by title primarily and then subtitle secondarily.
// However, this does not support ordering multiple keys in different directions.
const sortInternal = (a, b, sortKeys, sortDir) => {
  let result = 0
  const direction = (sortDir.toLowerCase() === 'desc' ? -1 : 1)
  const sortKey = sortKeys[0] // Expect an array. We'll call the function recursively if we need to go past first key

  const aValue = typy(a, sortKey).safeObject
  const bValue = typy(b, sortKey).safeObject
  // If one of them is null or undefined, a direct string comparison won't work right...
  if (typy(aValue).isNullOrUndefined || typy(bValue).isNullOrUndefined) {
    result = (!!aValue - !!bValue) * direction // falsy values will be given lower priority in asc and higher in desc
  } else if (aValue instanceof Date && bValue instanceof Date) {
    result = (aValue.getTime() - bValue.getTime()) * direction
  } else {
    result = aValue.toString() // works on numbers and puts them at the top (asc) or bottm (desc)
      .localeCompare(bValue, undefined, { sensitivity: 'accent', ignorePunctuation: true }) * direction
    // If any of these returns true, that means we are comparing booleans. While booleans don't logically sort
    // well, the most natural way to sort is ascending and you usually want the "true" values at the top. For this
    // reason, invert the direction since 'true' > 'false', but we want (boolean) true < false.
    // eslint-disable-next-line eqeqeq
    if (typy(a).isBoolean || typy(b).isBoolean || aValue.toString().toLowerCase() == 'true' || bValue.toString().toLowerCase() == 'true') {
      result = -result
    }
  }
  if (result === 0 && sortKeys.length > 1) {
    return sortInternal(a, b, sortKeys.slice(1), sortDir)
  }
  return result
}

export const sortList = (list, sortKeys, sortDir) => {
  if (!Array.isArray(list)) {
    list = typy(list).safeArray
  }
  if (!Array.isArray(sortKeys)) {
    sortKeys = [ sortKeys ]
  }
  return list.sort((a, b) => sortInternal(a, b, sortKeys, sortDir))
}

export const filterAndSort = (list, filterFields, filterValue, sortKey, sortDir) => {
  return sortList(filterList(list, filterFields, filterValue), sortKey, sortDir)
}

export const pluralize = (listOrCount, singularForm, pluralForm) => {
  singularForm = singularForm || '' // If omitted, will return empty string in singular form
  pluralForm = pluralForm || (singularForm + 's') // If omitted, will append s to singular form
  return (typy(listOrCount).isNumber ? listOrCount : listOrCount.length) === 1 ? singularForm : pluralForm
}

export const reduceStatuses = (arrayOfStatuses) => {
  return arrayOfStatuses.reduce((a, b) => {
    const error = (status) => status === statuses.ERROR || status === statuses.UNAUTHORIZED
    const fetching = (status) => status === statuses.FETCHING
    const notFound = (status) => status === statuses.NOT_FOUND
    const valid = (status) => status === statuses.SUCCESS || notFound(status)

    if (error(a) || error(b)) {
      // Return error if any errors
      return statuses.ERROR
    } else if (fetching(a) || fetching(b)) {
      // Return fetching if any fetching
      return statuses.FETCHING
    } else if (notFound(a) && notFound(b)) {
      // Only return not found if ALL statuses are not found
      return statuses.NOT_FOUND
    } else if (valid(a) && valid(b)) {
      // If all are fetched and not errors, return success even if a mix of success and not found
      return statuses.SUCCESS
    }
    // Return not fetched for any combination of "valid" (completed successfully) statuses and not fetched statuses
    return statuses.NOT_FETCHED
  })
}

// When given a contentful reference with an internalLink sys.id, find the correct internalLink with all its fields
// and return a merged object. In other words, get the internal link (and its page) when the initial call was not
// deep enough to include the required fields to make it work.
export const mergeInternalLink = (partialRecord, internalLinks) => {
  const match = internalLinks.find(search => search.sys.id === partialRecord.sys.id)
  if (!match) {
    return partialRecord
  }
  return {
    sys: match.sys,
    fields: {
      ...match.fields,
      // The page is huge, so only get what we actually need
      page: match.fields.page ? {
        sys: typy(match.fields, 'page.sys').safeObjectOrEmpty,
        fields: {
          title: typy(match.fields, 'page.fields.title').safeString,
          slug: typy(match.fields, 'page.fields.slug').safeString,
          relatedResources: typy(match.fields, 'page.fields.relatedResources').safeArray,
          relatedExtraSections: typy(match.fields, 'page.fields.relatedExtraSections').safeArray,
        },
      } : null,
    },
    linkText: (typy(match, 'fields.usePageTitle').safeBoolean && typy(match, 'fields.page').isObject)
      ? typy(match, 'fields.page.fields.title').safeString
      : typy(match, 'fields.title').safeString,
  }
}

export const getContentfulQueryUrl = (query, preview = false, secure = false) => {
  const endpoint = secure ? 'secureQuery' : (preview ? 'preview/query' : 'query')
  let url = `${Config.contentfulAPI}/${endpoint}?locale=en-US&query=${encodeURIComponent(query)}`
  if (preview) {
    url += `&preview=${preview}`
  }
  return url
}

export const buildQueryString = (existingQuery, key, values) => {
  let queryString = ''
  // Add any query parameters that were already part of the url besides subject filters
  if (typy(existingQuery).isString) {
    const oldQuery = existingQuery.replace('?', '').split('&')
    oldQuery.forEach(item => {
      const pair = item.split('=')
      if (pair.length === 2 && pair[0].toLowerCase() !== key.toLowerCase()) {
        queryString += `${queryString.length ? '&' : '?'}${item}`
      }
    })
  }

  // Now URL encode and add each value using the specified key, ignoring duplicates
  typy(values).safeArray.forEach(value => {
    if (value) {
      const encoded = `${key}=${encodeURIComponent(value)}`
      if (queryString.indexOf(encoded) < 0) {
        queryString += `${queryString.length ? '&' : '?'}${encoded}`
      }
    }
  })
  return queryString
}
