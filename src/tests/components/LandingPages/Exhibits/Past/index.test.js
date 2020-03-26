import React from 'react'
import { shallow } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import { PastExhibitsContainer, mapStateToProps, mapDispatchToProps } from 'components/LandingPages/Exhibits/Past'
import Presenter from 'components/LandingPages/Exhibits/Past/presenter'

import * as testData from '../testData'
import * as statuses from 'constants/APIStatuses'

let enzymeWrapper
let props

const setup = (props) => {
  return shallow(<PastExhibitsContainer {...props} />)
}

describe('components/LandingPages/Exhibits/Past', () => {
  afterEach(() => {
    enzymeWrapper = undefined
    props = undefined
  })

  describe('before fetching data', () => {
    beforeEach(() => {
      props = {
        pageTitle: 'Past Exhibits',
        pageDate: '201909',
        exhibits: [],
        filteredExhibits: [],
        allExhibitsStatus: statuses.NOT_FETCHED,
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
        pageTitle: 'Past Exhibits',
        pageDate: '201909',
        exhibits: [],
        filteredExhibits: [],
        allExhibitsStatus: statuses.SUCCESS,
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
        match: {
          params: {
            date: null,
          },
        },
      }
    })

    it('should return only past exhibits', () => {
      const state = {
        allExhibits: {
          status: statuses.SUCCESS,
          json: testData.allTestExhibits,
        },
      }
      const result = mapStateToProps(state, props)
      const expected = [
        testData.previousExhibit,
        testData.oneSeventyNineDaysAgoExhibit,
        testData.oneEightyDaysAgoExhibit,
        testData.yesterdayExhibit,
      ]
      expect(result.exhibits).toEqual(expect.arrayContaining(expected))
      expect(result.exhibits).toHaveLength(expected.length)
    })

    it('should return filteredExhibits for last 180 days by default', () => {
      const state = {
        allExhibits: {
          status: statuses.SUCCESS,
          json: testData.allTestExhibits,
        },
      }
      const result = mapStateToProps(state, props)
      const expected = [
        testData.previousExhibit,
        testData.oneSeventyNineDaysAgoExhibit,
        testData.yesterdayExhibit,
      ]
      expect(result.filteredExhibits).toEqual(expect.arrayContaining(expected))
      expect(result.filteredExhibits).toHaveLength(expected.length)
    })

    it('should return filteredExhibits for specific month if provided', () => {
      const todayDate = testData.todayExhibit.event.startDate
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
        allExhibits: {
          status: statuses.SUCCESS,
          json: testData.allTestExhibits,
        },
      }
      const result = mapStateToProps(state, props)
      const expected = [
        ...testData.allTestExhibits.filter(exhibit => (exhibit.event.startDate && exhibit.event.endDate) && // filter out invalid records
          (exhibit.event.startDate < new Date() || exhibit.event.endDate < new Date()) && // filter out current/future records
          (exhibit.event.startDate.getMonth() === currentMonth || exhibit.event.endDate.getMonth() === currentMonth)) // filter out not matching month
      ]

      // arrayContaining and equal length so that we can ignore order
      expect(result.filteredExhibits).toEqual(expect.arrayContaining(expected))
      expect(result.filteredExhibits).toHaveLength(expected.length)
      // Make sure we got at least one result to know it worked
      // We can't do this check on the first of a month because we can't have any past exhibits within the same month
      if (todayDate.getDate() !== 1) {
        expect(expected.length).toBeGreaterThan(0)
      }
      // Also make sure the filter props were set
      expect(result.filterYear).toEqual(testData.todayExhibit.event.startDate.getFullYear())
      expect(result.filterMonth).toEqual(testData.todayExhibit.event.startDate.getMonth())
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
