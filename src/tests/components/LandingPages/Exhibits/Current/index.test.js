import React from 'react'
import { shallow } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import { CurrentExhibitsContainer, mapStateToProps, mapDispatchToProps } from 'components/LandingPages/Exhibits/Current'
import Presenter from 'components/LandingPages/Exhibits/Current/presenter'

import * as testData from '../testData'
import * as statuses from 'constants/APIStatuses'

let enzymeWrapper
let props

const setup = (props) => {
  return shallow(<CurrentExhibitsContainer {...props} />)
}

describe('components/LandingPages/Exhibits/Current', () => {
  afterEach(() => {
    enzymeWrapper = undefined
    props = undefined
  })

  describe('before fetching data', () => {
    beforeEach(() => {
      props = {
        pageTitle: 'Current Exhibits',
        pageDate: '20190907',
        exhibits: [],
        filteredExhibits: [],
        allExhibitsStatus: statuses.NOT_FETCHED,
        location: {
          search: '?preview=true'
        },
        match: {
          params: {
            date: '20190907',
          },
        },
        history: {
          push: jest.fn(),
        },
        fetchAllExhibits: jest.fn(),
      }
      enzymeWrapper = setup(props)
    })

    it('should call fetchAllExhibits with preview flag', () => {
      expect(props.fetchAllExhibits).toHaveBeenCalledWith(true)
    })
  })

  describe('after fetching data', () => {
    beforeEach(() => {
      props = {
        pageTitle: 'Current Exhibits',
        pageDate: '20190907',
        exhibits: [],
        filteredExhibits: [],
        allExhibitsStatus: statuses.SUCCESS,
        location: {
          search: '?preview=true'
        },
        match: {
          params: {
            date: '20190907',
          },
        },
        history: {
          push: jest.fn(),
        },
        fetchAllExhibits: jest.fn(),
      }
      enzymeWrapper = setup(props)
    })

    it('should not call fetchAllExhibits', () => {
      expect(props.fetchAllExhibits).not.toHaveBeenCalled()
    })
  })

  describe('mapStateToProps', () => {
    beforeEach(() => {
      props = {
        location: {
          search: '?preview=false&audience=me&audience=you'
        },
        match: {
          params: {
            date: null,
          },
        },
      }
    })

    it('should return only current and future exhibits', () => {
      const state = {
        allExhibits: {
          status: statuses.SUCCESS,
          json: testData.allTestExhibits,
        },
      }
      const result = mapStateToProps(state, props)
      const expected = [
        testData.todayExhibit,
        testData.futureExhibit,
        testData.wayFutureExhibit,
      ]
      expect(result.exhibits).toEqual(expect.arrayContaining(expected))
      expect(result.exhibits).toHaveLength(expected.length)
    })

    it('should return filteredExhibits for specific day if provided', () => {
      const todayDate = testData.todayExhibit.event.startDate
      const todayDateString = todayDate.getFullYear().toString() +
        (todayDate.getMonth() + 1).toString().padStart(2, '0') +
        todayDate.getDate().toString().padStart(2, '0')
      props = {
        location: {
          search: ''
        },
        match: {
          params: {
            date: todayDateString,
          },
        },
      }

      const state = {
        allExhibits: {
          status: statuses.SUCCESS,
          json: testData.allTestExhibits,
        },
      }
      const result = mapStateToProps(state, props)
      expect(result.filteredExhibits).toEqual([
        testData.todayExhibit,
      ])
      // Also make sure the filter props were set
      expect(result.pageDate).toEqual(todayDateString)
      expect(result.hasFilter).toBe(true)
    })

    it('should provide safe defaults', () => {
      const state = {
        allExhibits: {
          status: statuses.FETCHING,
        },
      }
      const result = mapStateToProps(state, props)
      expect(result).toEqual(expect.objectContaining({
        pageTitle: expect.stringMatching(/.+/), // Match any string of 1 or more characters
        hasFilter: false,
        exhibits: [],
        filteredExhibits: [],
        allExhibitsStatus: state.allExhibits.status,
      }))
    })
  })

  describe('mapDispatchToProps', () => {
    const middlewares = [ thunk ]
    const mockStore = configureMockStore(middlewares)
    let store

    beforeEach(() => {
      const state = {
        allExhibits: {
          status: statuses.SUCCESS,
          json: []
        },
      }
      store = mockStore(state)
    })

    afterEach(() => {
      store = undefined
    })

    it('should create fetchAllExhibits action', () => {
      const result = mapDispatchToProps(store.dispatch)
      expect(result.fetchAllExhibits).toEqual(expect.any(Function))
    })
  })
})
