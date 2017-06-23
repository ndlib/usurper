'use strict'

if (typeof Promise === 'undefined') {
  // Rejection tracking prevents a common issue where React gets into an
  // inconsistent state due to an error, but it gets swallowed by a Promise,
  // and the user has no idea what causes React's erratic future behavior.
  require('promise/lib/rejection-tracking').enable()
  window.Promise = require('promise/lib/es6-extensions.js')
}

if (!String.prototype.startsWith) {
  String.prototype.startsWith = function (searchString, position) {
    return this.substr(position || 0, searchString.length) === searchString
  }
}

// fetch() polyfill for making API calls.
require('whatwg-fetch')

// URLSearchParams
require('url-search-params-polyfill')
// find
require('ie-array-find-polyfill')

// Object.assign() is commonly used with React.
// It will use the native implementation if it's present and isn't buggy.
Object.assign = require('object-assign')
