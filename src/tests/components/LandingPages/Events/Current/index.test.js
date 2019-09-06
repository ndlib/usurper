import React from 'react'
import { shallow } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import { CurrentEventsContainer, mapStateToProps, mapDispatchToProps } from 'components/LandingPages/Events/Current'
import Presenter from 'components/LandingPages/Events/Current/presenter'

import * as testData from '../testData'
import * as statuses from 'constants/APIStatuses'

let enzymeWrapper
let props

const setup = (props) => {
  return shallow(<CurrentEventsContainer {...props} />)
}

describe('components/LandingPages/Events/Current', () => {
  afterEach(() => {
    enzymeWrapper = undefined
    props = undefined
  })

  describe('before fetching data', () => {
    beforeEach(() => {
      props = {
        pageTitle: 'Current Events',
        pageDate: '20190907',
        events: [],
        filteredEvents: [],
        allEventsStatus: statuses.NOT_FETCHED,
        location: {
          search: '?preview=true'
        },
        match: {
          params: {
            date: '20190907',
          },
        },
        fetchAllEvents: jest.fn(),
      }
      enzymeWrapper = setup(props)
    })

    it('should call fetchAllEvents with preview flag', () => {
      expect(props.fetchAllEvents).toHaveBeenCalledWith(true)
    })
  })

  describe('after fetching data', () => {
    beforeEach(() => {
      props = {
        pageTitle: 'Current Events',
        pageDate: '20190907',
        events: [],
        filteredEvents: [],
        allEventsStatus: statuses.SUCCESS,
        location: {
          search: '?preview=true'
        },
        match: {
          params: {
            date: '20190907',
          },
        },
        fetchAllEvents: jest.fn(),
      }
      enzymeWrapper = setup(props)
    })

    it('should not call fetchAllEvents', () => {
      expect(props.fetchAllEvents).not.toHaveBeenCalled()
    })
  })

  describe('mapStateToProps', () => {
    beforeEach(() => {
      props = {
        match: {
          params: {
            date: null,
          },
        },
      }
    })

    it('should return only current and future events', () => {
      const state = {
        allEvents: {
          status: statuses.SUCCESS,
          json: testData.allTestEvents,
        },
      }
      const result = mapStateToProps(state, props)
      const expected = [
        testData.todayEvent,
        testData.futureEvent,
        testData.wayFutureEvent,
      ]
      expect(result.events).toEqual(expect.arrayContaining(expected))
      expect(result.events).toHaveLength(expected.length)
    })

    it('should return filteredEvents for specific day if provided', () => {
      const todayDate = testData.todayEvent.startDate
      const todayDateString = todayDate.getFullYear().toString() +
        (todayDate.getMonth() + 1).toString().padStart(2, '0') +
        todayDate.getDate().toString().padStart(2, '0')
      props = {
        match: {
          params: {
            date: todayDateString,
          },
        },
      }

      const state = {
        allEvents: {
          status: statuses.SUCCESS,
          json: testData.allTestEvents,
        },
      }
      const result = mapStateToProps(state, props)
      expect(result.filteredEvents).toEqual([
        testData.todayEvent,
      ])
      // Also make sure the filter props were set
      expect(result.pageDate).toEqual(todayDateString)
      expect(result.hasFilter).toBe(true)
    })

    it('should provide safe defaults', () => {
      const state = {
        allEvents: {
          status: statuses.FETCHING,
        },
      }
      const result = mapStateToProps(state, props)
      expect(result).toEqual(expect.objectContaining({
        pageTitle: expect.stringMatching(/.+/), // Match any string of 1 or more characters
        hasFilter: false,
        events: [],
        filteredEvents: [],
        allEventsStatus: state.allEvents.status,
      }))
    })
  })

  describe('mapDispatchToProps', () => {
    const middlewares = [ thunk ]
    const mockStore = configureMockStore(middlewares)
    let store

    beforeEach(() => {
      const state = {
        allEvents: {
          status: statuses.SUCCESS,
          json: []
        },
      }
      store = mockStore(state)
    })

    afterEach(() => {
      store = undefined
    })

    it('should create fetchAllEvents action', () => {
      const result = mapDispatchToProps(store.dispatch)
      expect(result.fetchAllEvents).toEqual(expect.any(Function))
    })
  })
})
