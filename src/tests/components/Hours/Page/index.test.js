import React from 'react'
import { shallow } from 'enzyme'
import configureStore from 'redux-mock-store'

import { HoursPageContainer, mapStateToProps, mapDispatchToProps } from 'components/Hours/Page'
import HoursPagePresenter from 'components/Hours/Page/presenter'
import APIPresenterFactory from 'components/APIPresenterFactory'

import * as statuses from 'constants/APIStatuses'

let enzymeWrapper
let props

const setup = (props) => {
  return shallow(<HoursPageContainer {...props} />)
}

describe('components/Hours/Page', () => {
  afterEach(() => {
    enzymeWrapper = undefined
    props = undefined
  })

  describe('container', () => {
    beforeEach(() => {
      // Mock some browser functions
      document.getElementById = jest.fn(() => document.createElement('div'))
      Element.prototype.getBoundingClientRect = jest.fn(() => ({
        top: 333,
      }))
      window.scroll = jest.fn()

      props = {
        hoursEntry: { status: statuses.NOT_FETCHED, json: {} },
        servicePointsWithHours: {},
        servicePointsStatus: statuses.NOT_FETCHED,
        cfStatic: { status: statuses.NOT_FETCHED },
        combinedStatus: statuses.NOT_FETCHED,
        hoursStatus: statuses.NOT_FETCHED,
        location: {},
        fetchHours: jest.fn(),
        fetchServicePoints: jest.fn(),
        fetchSidebar: jest.fn(),
      }
      enzymeWrapper = setup(props)
    })

    it('should call appropriate actions on load', () => {
      expect(props.fetchHours).toHaveBeenCalled()
      expect(props.fetchServicePoints).toHaveBeenCalled()
      expect(props.fetchSidebar).toHaveBeenCalled()
    })

    it('should render APIPresenterFactory', () => {
      expect(enzymeWrapper.find(APIPresenterFactory).exists()).toBe(true)
    })

    it('should scroll when anchor link set', () => {
      enzymeWrapper.setProps({
        location: {
          hash: '#test',
        },
      })

      expect(window.scroll).toHaveBeenCalled()
    })
  })

  describe('mapStateToProps', () => {
    beforeEach(() => {
      props = {
        location: {
          search: 'preview=true',
        },
      }
    })

    it('should combine statuses correctly', () => {
      let state = {
        hours: { status: statuses.NOT_FETCHED },
        cfServicePoints: { status: statuses.FETCHING },
        cfStatic: { status: statuses.SUCCESS },
      }
      let result = mapStateToProps(state, props)
      expect(result.combinedStatus).toEqual(statuses.FETCHING)

      state = {
        hours: { status: statuses.SUCCESS },
        cfServicePoints: { status: statuses.ERROR },
        cfStatic: { status: statuses.NOT_FETCHED },
      }
      result = mapStateToProps(state, props)
      expect(result.combinedStatus).toEqual(statuses.ERROR)

      state = {
        hours: { status: statuses.SUCCESS },
        cfServicePoints: { status: statuses.SUCCESS },
        cfStatic: { status: statuses.SUCCESS },
      }
      result = mapStateToProps(state, props)
      expect(result.combinedStatus).toEqual(statuses.SUCCESS)
    })

    it('should recognize preview prop', () => {
      const state = {
        hours: { status: statuses.NOT_FETCHED },
        cfServicePoints: { status: statuses.NOT_FETCHED },
        cfStatic: { status: statuses.NOT_FETCHED },
      }
      const result = mapStateToProps(state, props)
      expect(result.preview).toBe(true)
    })

    it('should filter service points to only those with an hours code', () => {
      const goodServicePoint = {
        fields: {
          slug: 'yay',
          hoursCode: '123456',
        },
      }
      const badServicePoint = {
        fields: {
          slug: 'empty',
          nothing: 'to see here',
        },
      }
      const expectedServicePoints = {
        [goodServicePoint.fields.slug]: goodServicePoint,
      }

      const state = {
        hours: { status: statuses.SUCCESS },
        cfServicePoints: {
          status: statuses.SUCCESS,
          json: [ goodServicePoint, badServicePoint ],
        },
        cfStatic: { status: statuses.SUCCESS },
      }
      const result = mapStateToProps(state, props)
      expect(result.servicePointsWithHours).toEqual(expectedServicePoints)
    })
  })

  describe('mapDispatchToProps', () => {
    const store = configureStore()(props)

    it('returns a function for each expected action', () => {
      const result = mapDispatchToProps(store.dispatch)
      expect(result.fetchHours).toEqual(expect.any(Function))
      expect(result.fetchServicePoints).toEqual(expect.any(Function))
      expect(result.fetchSidebar).toEqual(expect.any(Function))
    })
  })
})
