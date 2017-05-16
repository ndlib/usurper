const fetch = require.requireActual('isomorphic-fetch')

module.exports = (url, config) => {
  if (url.match(/^http[s]?:\/\//)) {
    return fetch(url, config)
  }
  return fetch('https://localhost' + url, config)
}
