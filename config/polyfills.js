
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

if (!Array.prototype.equals) {
  Array.prototype.equals = function (compare) {
    if (!compare || !(compare instanceof Array)) {
      return false
    }

    if (this.length != compare.length) {
      return false
    }

    for (let i = 0; i < this.length; ++i) {
      if (this[i] instanceof Array && compare[i] instanceof Array) {
        if (!this[i].equals(compare[i])) {
          return false
        }
      }

      // this wont corerctly compare objects, eg. { foo: 2 } != { foo: 2 }
      if (this[i] != compare[i]) {
        return false
      }
      return true
    }
  }

  // hide from for:in
  Object.defineProperty(Array.prototype, 'equals', { enumerable: false })
}

// fetch() polyfill for making API calls.
require('whatwg-fetch')

// URLSearchParams
require('url-search-params-polyfill')
// find
require('ie-array-find-polyfill')

// React now requires Array.prototype.map and other things filled out by babel-polyfill
require('babel-polyfill')

// Object.assign() is commonly used with React.
// It will use the native implementation if it's present and isn't buggy.
Object.assign = require('object-assign')
