import React from 'react'
import { shallow } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import NotFound, { mapStateToProps, mapDispatchToProps } from 'components/Messages/NotFound'
import Presenter from 'components/Messages/NotFound/presenter'
import PresenterFactory from 'components/APIPresenterFactory'

import { CF_REQUEST_ALL_REDIRECTS } from 'actions/contentful/allRedirects'
import * as statuses from 'constants/APIStatuses'

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

let enzymeWrapper
let store

const setup = (state, props) => {
  store = mockStore(state)
  return shallow(<NotFound store={store} {...props} />)
}

describe('components/Messages/NotFound', () => {
  afterEach(() => {
    enzymeWrapper = undefined
    store = undefined
  })

  describe('before/during load', () => {
    beforeEach(() => {
      const props = {
        history: {
          replace: jest.fn(),
          location: {
            pathname: '/test',
            search: '?preview=true',
          },
        },
      }
      const state = {
        allRedirects: {
          status: statuses.NOT_FETCHED,
          json: [],
        },
      }
      enzymeWrapper = setup(state, props)
    })

    it('should render a PresenterFactory with appropriate presenter', () => {
      const found = enzymeWrapper.dive().dive().find(PresenterFactory)
      expect(found.exists()).toBe(true)
      expect(found.props().presenter).toEqual(Presenter)
    })

    it('should call store to fetch redirects', () => {
      const component = enzymeWrapper.dive().dive() // Forces lifecycle events
      expect(store.getActions()).toEqual(expect.arrayContaining([
        { type: CF_REQUEST_ALL_REDIRECTS },
      ]))
    })
  })

  describe('after load - no redirect', () => {
    beforeEach(() => {
      const props = {
        history: {
          replace: jest.fn(),
          location: {
            pathname: '/test',
            search: '?preview=true',
          },
        },
      }
      const state = {
        allRedirects: {
          status: statuses.SUCCESS,
          json: [],
        },
      }
      enzymeWrapper = setup(state, props)
    })

    it('should render a PresenterFactory with appropriate presenter', () => {
      const found = enzymeWrapper.dive().dive().find(PresenterFactory)
      expect(found.exists()).toBe(true)
      expect(found.props().presenter).toEqual(Presenter)
      expect(found.props().status).toEqual(statuses.SUCCESS)
    })
  })

  describe('after load - with redirect', () => {
    let props

    beforeEach(() => {
      window.location.replace = jest.fn()
    })

    afterEach(() => {
      props = undefined
    })

    const setupRedirect = (url) => {
      const queryIndex = url.indexOf('?')
      props = {
        history: {
          replace: jest.fn(),
          location: {
            pathname: queryIndex >= 0 ? url.slice(0, queryIndex) : url,
            search: queryIndex >= 0 ? url.slice(queryIndex) : '',
          },
        },
      }
      const state = {
        allRedirects: {
          status: statuses.FETCHING,
          json: [
            { fromPath: '/basic', toPath: '/elsewhere' },
            { fromPath: '/fancy/wildcard/*.html', toPath: '/somewhere'},
            { fromPath: '/forwardQuery', toPath: '/anywhere', forwardQuery: true },
            { fromPath: '/forwardPath/*', toPath: '/nowhere', forwardPath: true },
            { fromPath: '/external/*/test', toPath: 'https://www.test.url/', forwardQuery: true, forwardPath: true },
          ],
        },
      }
      enzymeWrapper = setup(state, props)
      enzymeWrapper.dive().dive().setProps({
        fetchStatus: statuses.SUCCESS,
      })
    }

    it('should redirect to internal page', () => {
      setupRedirect('/bAsIC') // ensure case-insensitive route matching works
      expect(props.history.replace).toHaveBeenCalledWith('/elsewhere')
      // Status of presenter should be FETCHING so that it displays loading while the redirection is happening
      const found = enzymeWrapper.dive().dive().find(PresenterFactory)
      expect(found.exists()).toBe(true)
      expect(found.props().status).toEqual(statuses.FETCHING)
    })

    it('should support wildcard redirects', () => {
      setupRedirect('/fancy/wildcard/fhqwhgads.html')
      expect(props.history.replace).toHaveBeenCalledWith('/somewhere')
    })

    it('should forward query string to redirected page', () => {
      setupRedirect('/forwardQuery?everybody=toTheLimit')
      expect(props.history.replace).toHaveBeenCalledWith('/anywhere?everybody=toTheLimit')
    })

    it('should forward path to redirected page', () => {
      setupRedirect('/forwardPath/test/forward')
      expect(props.history.replace).toHaveBeenCalledWith('/nowhere/test/forward')
    })

    it('should redirect to external sites as well', () => {
      setupRedirect('/external/goSomewhere/extra/test?query=here&done=true')
      expect(props.history.replace).not.toHaveBeenCalled()
      expect(window.location.replace).toHaveBeenCalledWith('https://www.test.url/goSomewhere/extra?query=here&done=true')
    })

    it('should not redirect if no match', () => {
      setupRedirect('/noMatch')
      expect(props.history.replace).not.toHaveBeenCalled()
      expect(window.location.replace).not.toHaveBeenCalled()
    })

    it('should not redirect unless match is at beginning of string', () => {
      setupRedirect('/test/basic')
      expect(props.history.replace).not.toHaveBeenCalled()
      expect(window.location.replace).not.toHaveBeenCalled()
    })
  })
})