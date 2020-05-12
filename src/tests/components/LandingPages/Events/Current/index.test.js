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
        allEventGroups: {
          status: statuses.NOT_FETCHED,
          json: [],
        },
        combinedStatus: statuses.NOT_FETCHED,
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
        fetchAllEvents: jest.fn(),
        fetchAllEventGroups: jest.fn(),
      }
      enzymeWrapper = setup(props)
    })

    it('should call fetchAllEventGroups with preview flag', () => {
      expect(props.fetchAllEventGroups).toHaveBeenCalledWith(true)
    })

    it('should call fetchAllEvents after event groups fetched', () => {
      const groups = [
        'test',
        'data',
      ]
      enzymeWrapper.setProps({
        allEventGroups: {
          status: statuses.SUCCESS,
          json: groups,
        },
      })
      expect(props.fetchAllEvents).toHaveBeenCalledWith(true, groups)
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
        allEventGroups: {
          status: statuses.SUCCESS,
          json: [],
        },
        combinedStatus: statuses.SUCCESS,
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
        fetchAllEvents: jest.fn(),
        fetchAllEventGroups: jest.fn(),
      }
      enzymeWrapper = setup(props)
    })

    it('should not call fetchAllEvents', () => {
      expect(props.fetchAllEvents).not.toHaveBeenCalled()
    })

    it('should not call fetchAllEventGroups', () => {
      expect(props.fetchAllEventGroups).not.toHaveBeenCalled()
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

    it('should return only current and future events', () => {
      const state = {
        allEvents: {
          status: statuses.SUCCESS,
          json: testData.allTestEvents,
        },
        allEventGroups: {
          status: statuses.SUCCESS,
          json: [],
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
        allEvents: {
          status: statuses.SUCCESS,
          json: testData.allTestEvents,
        },
        allEventGroups: {
          status: statuses.SUCCESS,
          json: [],
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
        allEventGroups: {
          status: statuses.SUCCESS,
          json: [],
        },
      }
      const result = mapStateToProps(state, props)
      expect(result).toEqual(expect.objectContaining({
        pageTitle: expect.stringMatching(/.+/), // Match any string of 1 or more characters
        hasFilter: false,
        events: [],
        filteredEvents: [],
        allEventsStatus: state.allEvents.status,
        combinedStatus: statuses.FETCHING,
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
        allEventGroups: {
          status: statuses.SUCCESS,
          json: [],
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

    it('should create fetchAllEventGroups action', () => {
      const result = mapDispatchToProps(store.dispatch)
      expect(result.fetchAllEventGroups).toEqual(expect.any(Function))
    })
  })
})
