import fetch from 'isomorphic-fetch'
import Config from 'shared/Configuration'

// Note that these do NOT go into the store like most actions... It is presumed that the caller is another action which
// will then transform the data to get the desired result.
export const fetchInternalLinks = (preview) => {
  const query = encodeURIComponent(`content_type=internalLink&include=1`)
  let url = `${Config.contentfulAPI}/${preview ? 'livequery' : 'query'}?locale=en-US&query=${query}`
  if (preview) {
    url += `&preview=${preview}`
  }
  return fetch(url).then(response => response.ok ? response.json() : { errorStatus: response.status })
}
