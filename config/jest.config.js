const Enzyme = require('enzyme')
const EnzymeAdapter = require('enzyme-adapter-react-16')

// Setup enzyme's react adapter
Enzyme.configure({ adapter: new EnzymeAdapter() })

// Add mock for Google Analytics tracking
jest.mock('react-ga')

// Add mock for window functions since they are a browser only thing
window.scrollTo = () => { }
window.alert = (msg) => { console.log(msg) } // don't use alert, but just in case

class LocalStorageMock {
  constructor () {
    this.store = {}
  }

  clear () {
    this.store = {}
  }

  getItem (key) {
    return this.store[key] ? this.store[key] : null
  }

  setItem (key, value) {
    this.store[key] = value.toString()
  }

  removeItem (key) {
    delete this.store[key]
  }
}

global.localStorage = new LocalStorageMock()
