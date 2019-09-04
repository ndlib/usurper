import React from 'react'
import { shallow } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import Events, { EventsContainer, mapStateToProps, mapDispatchToProps } from 'components/LandingPages/Events'
import CurrentEvents from 'components/LandingPages/Events/Current'
import PastEvents from 'components/LandingPages/Events/Past'
import PresenterFactory from 'components/APIInlinePresenterFactory'

import * as statuses from 'constants/APIStatuses'

let enzymeWrapper
let props

const setup = (props) => {
  return shallow(<EventsContainer {...props} />)
}

describe('components/LandingPages/Events', () => {
  afterEach(() => {
    enzymeWrapper = undefined
    props = undefined
  })

  describe('without data', () => {
    beforeEach(() => {
      props = {
        allEventsStatus: statuses.NOT_FETCHED,
        allEvents: [],
        events: [],
        isPast: false,
        pageTitle: 'Current Events',
        pageDate: '20190907',
        filterYear: 2019,
        filterMonth: 8,
        filterDay: 7,
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

    it('should render a PresenterFactory with CurrentEvents as presenter', () => {
      const presenter = enzymeWrapper.find(PresenterFactory)
      expect(presenter.exists()).toBe(true)

      expect(presenter.props().presenter).toEqual(CurrentEvents)
      expect(presenter.props().status).toEqual(props.allEventsStatus)
    })
  })

  describe('with data', () => {
    beforeEach(() => {
      props = {
        allEventsStatus: statuses.SUCCESS,
        allEvents: [],
        events: [],
        isPast: true,
        pageTitle: 'Past Events',
        pageDate: '20190907',
        filterYear: 2019,
        filterMonth: 8,
        filterDay: 7,
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

    it('should render a PresenterFactory with PastEvents as presenter', () => {
      const presenter = enzymeWrapper.find(PresenterFactory)
      expect(presenter.exists()).toBe(true)

      expect(presenter.props().presenter).toEqual(PastEvents)
      expect(presenter.props().status).toEqual(props.allEventsStatus)
      expect(presenter.props().props).toEqual(expect.objectContaining({
        events: expect.any(Array),
      }))
    })

    it('should filter events when filter value is changed', () => {
      const instance = enzymeWrapper.instance()
      instance.onFilterChange({
        target: { value: 'search_for_me' },
      })

      const presenter = enzymeWrapper.find(PresenterFactory)
      expect(presenter.props().props.filterValue).toEqual('search_for_me')
      expect(presenter.props().props.events).toEqual([])
      expect(presenter.props().props.allEvents).toEqual(props.allEvents) // allEvents should not be impacted by filtering
    })

    it('should reset filter when changing date', () => {
      enzymeWrapper.setState({
        filterValue: 'test',
      })
      expect(enzymeWrapper.props().props.filterValue).toEqual('test')
      expect(enzymeWrapper.props().props.pageDate).toEqual(props.pageDate)

      // Set the date to trigger a change
      const newDate = '20200509'
      enzymeWrapper.setProps({
        pageDate: newDate,
      })

      expect(enzymeWrapper.props().props.filterValue).toEqual('')
      expect(enzymeWrapper.props().props.pageDate).toEqual(newDate)
    })



    it('should reset filter when changing between past and current', () => {
      enzymeWrapper.setState({
        filterValue: 'test',
      })

      const newValue = !props.isPast
      enzymeWrapper.setProps({
        isPast: newValue,
      })

      expect(enzymeWrapper.props().props.filterValue).toEqual('')
      expect(enzymeWrapper.props().props.isPast).toEqual(newValue)
    })
  })

  describe('mapStateToProps', () => {
    // Set up a bunch of differently dated events to use in tests
    const makeEvent = (offsetStartDays, offsetEndDays) => {
      const startDate = new Date(new Date().setDate(new Date().getDate() + offsetStartDays))
      const endDate = offsetEndDays ? new Date(new Date().setDate(new Date().getDate() + offsetEndDays)) : startDate
      return {
        startDate,
        endDate,
      }
    }
    const thirtyDaysAgoEvent = makeEvent(-30)
    const twentyNineDaysAgoEvent = makeEvent(-29)
    const previousEvent = makeEvent(-45, -1)
    const yesterdayEvent = makeEvent(-1, -1)
    const todayEvent = {
      // should be end of day so that when we look for current events, endDate > now
      startDate: new Date(new Date().setHours(23, 59, 59, 998)),
      endDate: new Date(new Date().setHours(23, 59, 59, 999)),
    }
    const futureEvent = makeEvent(1, 3)
    const wayFutureEvent = makeEvent(100)
    const incompleteEvent = {
      startDate: new Date(),
      // no end date
    }
    // Intentionally ordered funky to make sure sorting works
    const allTestEvents = [
      futureEvent,
      thirtyDaysAgoEvent,
      twentyNineDaysAgoEvent,
      todayEvent,
      yesterdayEvent,
      incompleteEvent,
      wayFutureEvent,
      previousEvent,
    ]

    it('should set page title based on past or current', () => {
      const state = {
        allEvents: {
          status: statuses.NOT_FETCHED,
        },
      }
      const past = mapStateToProps(state, {
        isPast: true,
        location: {},
        match: { params: {} },
      })
      const current = mapStateToProps(state, {
        isPast: false,
        location: {},
        match: { params: {} },
      })

      expect(past.pageTitle).toBeTruthy()
      expect(current.pageTitle).toBeTruthy()
      expect(current.pageTitle).not.toEqual(past.pageTitle)
    })

    describe('for current events', () => {
      beforeEach(() => {
        props = {
          isPast: false,
          location: {
            search: '?preview=true'
          },
          match: {
            params: {
              date: null,
            },
          },
        }
      })

      it('should filter events to current and future ones only', () => {
        const state = {
          allEvents: {
            status: statuses.SUCCESS,
            json: allTestEvents,
          },
        }
        const result = mapStateToProps(state, props)

        expect(result.events).toEqual([
          todayEvent,
          futureEvent,
          wayFutureEvent,
        ])
      })

      it('should filter events to specific day if provided', () => {
        const todayDateString = todayEvent.startDate.getFullYear().toString() +
          (todayEvent.startDate.getMonth() + 1).toString().padStart(2, '0') +
          todayEvent.startDate.getDate().toString().padStart(2, '0')
        props = {
          ...props,
          match: {
            params: {
              date: todayDateString,
            },
          },
        }

        const state = {
          allEvents: {
            status: statuses.SUCCESS,
            json: allTestEvents,
          },
        }
        const result = mapStateToProps(state, props)
        expect(result.events).toEqual([
          todayEvent,
        ])
        // Also make sure the filter props were set
        expect(result.pageDate).toEqual(todayDateString)
        expect(result.filterYear).toEqual(todayEvent.startDate.getFullYear())
        expect(result.filterMonth).toEqual(todayEvent.startDate.getMonth())
        expect(result.filterDay).toEqual(todayEvent.startDate.getDate())
      })

      it('should provide safe defaults', () => {
        const state = {
          allEvents: {
            status: statuses.FETCHING,
          },
        }
        const result = mapStateToProps(state, props)
        expect(result).toEqual(expect.objectContaining({
          events: [],
          allEvents: [],
          pageTitle: expect.stringMatching(/.+/), // Match any string of 1 or more characters
          pageDate: null,
          filterYear: null,
          filterMonth: null,
          filterDay: null,
        }))
      })
    })

    describe('for past events', () => {
      beforeEach(() => {
        props = {
          isPast: true,
          location: {
            search: null,
          },
          match: {
            params: {
              date: null,
            },
          },
        }
      })

      it('should filter events to the last 30 days', () => {
        const state = {
          allEvents: {
            status: statuses.SUCCESS,
            json: allTestEvents,
          },
        }
        const result = mapStateToProps(state, props)
        expect(result.events).toEqual([
          previousEvent,
          twentyNineDaysAgoEvent,
          yesterdayEvent,
        ])
      })

      it('should filter events to specific month if provided', () => {
        const currentMonth = todayEvent.startDate.getMonth()
        const currentMonthString = todayEvent.startDate.getFullYear().toString() +
          (todayEvent.startDate.getMonth() + 1).toString().padStart(2, '0')
        props = {
          ...props,
          match: {
            params: {
              date: currentMonthString,
            },
          },
        }

        const state = {
          allEvents: {
            status: statuses.SUCCESS,
            json: allTestEvents,
          },
        }
        const result = mapStateToProps(state, props)
        const expected = [
          ...allTestEvents.filter(event => (event.startDate && event.endDate) && // filter out invalid records
            (event.startDate < new Date() || event.endDate < new Date()) && // filter out current/future records
            (event.startDate.getMonth() === currentMonth || event.endDate.getMonth() === currentMonth)) // filter out not matching month
        ]

        // arrayContaining and equal length so that we can ignore order
        expect(result.events).toEqual(expect.arrayContaining(expected))
        expect(result.events).toHaveLength(expected.length)
        // Make sure we got at least one result to know it worked
        expect(expected.length).toBeGreaterThan(0)
        // Also make sure the filter props were set
        expect(result.filterYear).toEqual(todayEvent.startDate.getFullYear())
        expect(result.filterMonth).toEqual(todayEvent.startDate.getMonth())
      })
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