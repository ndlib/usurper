const fetch = require.requireActual('isomorphic-fetch');

module.exports = (url, config) => {
  return fetch('https://localhost' + url, config);
};
