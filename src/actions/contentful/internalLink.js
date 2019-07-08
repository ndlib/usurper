import fetch from 'isomorphic-fetch'
import * as helper from 'constants/HelperFunctions'

// Note that these do NOT go into the store like most actions... It is presumed that the caller is another action which
// will then transform the data to get the desired result.
export const fetchInternalLinks = (preview) => {
  const url = helper.getContentfulQueryUrl(`content_type=internalLink&include=1`, preview)
  return fetch(url).then(response => response.ok ? response.json() : { errorStatus: response.status })
}
