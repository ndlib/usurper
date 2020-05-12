import React from 'react'
import { shallow } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import { PastEventsContainer, mapStateToProps, mapDispatchToProps } from 'components/LandingPages/Events/Past'
import Presenter from 'components/LandingPages/Events/Past/presenter'

import * as testData from '../testData'
import * as statuses from 'constants/APIStatuses'

let enzymeWrapper
let props

const setup = (props) => {
  return shallow(<PastEventsContainer {...props} />)
}

describe('components/LandingPages/Events/Past', () => {
  afterEach(() => {
    enzymeWrapper = undefined
    props = undefined
  })

  describe('before fetching data', () => {
    beforeEach(() => {
      props = {
        pageTitle: 'Past Events',
        pageDate: '201909',
        events: [],
        filteredEvents: [],
        allEventsStatus: statuses.NOT_FETCHED,
        allEventGroups: {
          status: statuses.NOT_FETCHED,
          json: [],
        },
        combinedStatus: statuses.NOT_FETCHED,
        filterYear: 2019,
        filterMonth: 8,
        location: {
          search: '?preview=true'
        },
        match: {
          params: {
            date: '201909',
          },
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
        pageTitle: 'Past Events',
        pageDate: '201909',
        events: [],
        filteredEvents: [],
        allEventsStatus: statuses.SUCCESS,
        allEventGroups: {
          status: statuses.SUCCESS,
          json: [],
        },
        combinedStatus: statuses.SUCCESS,
        filterYear: 2019,
        filterMonth: 8,
        location: {
          search: '?preview=true'
        },
        match: {
          params: {
            date: '201909',
          },
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
        match: {
          params: {
            date: null,
          },
        },
      }
    })

    it('should return only past events', () => {
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
        testData.previousEvent,
        testData.twentyNineDaysAgoEvent,
        testData.thirtyDaysAgoEvent,
        testData.yesterdayEvent,
      ]
      expect(result.events).toEqual(expect.arrayContaining(expected))
      expect(result.events).toHaveLength(expected.length)
    })

    it('should return filteredEvents for last 30 days by default', () => {
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
        testData.previousEvent,
        testData.twentyNineDaysAgoEvent,
        testData.yesterdayEvent,
      ]
      expect(result.filteredEvents).toEqual(expect.arrayContaining(expected))
      expect(result.filteredEvents).toHaveLength(expected.length)
    })

    it('should return filteredEvents for specific month if provided', () => {
      const todayDate = testData.todayEvent.startDate
      const currentMonth = todayDate.getMonth()
      const currentMonthString = todayDate.getFullYear().toString() +
        (todayDate.getMonth() + 1).toString().padStart(2, '0')
      props = {
        match: {
          params: {
            date: currentMonthString,
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
      const expected = [
        ...testData.allTestEvents.filter(event => (event.startDate && event.endDate) && // filter out invalid records
          (event.startDate < new Date() || event.endDate < new Date()) && // filter out current/future records
          (event.startDate.getMonth() === currentMonth || event.endDate.getMonth() === currentMonth)) // filter out not matching month
      ]

      // arrayContaining and equal length so that we can ignore order
      expect(result.filteredEvents).toEqual(expect.arrayContaining(expected))
      expect(result.filteredEvents).toHaveLength(expected.length)
      // Make sure we got at least one result to know it worked
      // We can't do this check on the first of a month because we can't have any past events within the same month
      if (todayDate.getDate() !== 1) {
        expect(expected.length).toBeGreaterThan(0)
      }
      // Also make sure the filter props were set
      expect(result.filterYear).toEqual(testData.todayEvent.startDate.getFullYear())
      expect(result.filterMonth).toEqual(testData.todayEvent.startDate.getMonth())
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
  })
})
