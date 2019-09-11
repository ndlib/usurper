import React from 'react'
import { shallow } from 'enzyme'

import { GlobalAlertsContainer, mapStateToProps, mapDispatchToProps } from 'components/Contentful/Alert/Global'
import Presenter from 'components/Contentful/Alert/presenter'

import * as statuses from 'constants/APIStatuses'
import { REQUEST_PERSONAL } from 'actions/personal/constants'

let enzymeWrapper
let props

const setup = (props) => {
  return shallow(<GlobalAlertsContainer {...props} />)
}

const today = new Date()
const yesterday = new Date(new Date(today).setDate(today.getDate() - 1))
const tomorrow = new Date(new Date(today).setDate(today.getDate() + 1))

describe('components/Contentful/Alert/Global', () => {
  afterEach(() => {
    enzymeWrapper = undefined
    props = undefined
  })

  describe('before/during loading', () => {
    beforeEach(() => {
      // Create a new wrapper without a store for this test... It's easier that way
      props = {
        allAlerts: {},
        allAlertsStatus: statuses.NOT_FETCHED,
        hiddenAlerts: {
          state: statuses.NOT_FETCHED,
        },
        hideAlertStatus: statuses.NOT_FETCHED,
        isLoggedIn: true,
        location: {
          search: 'preview=true',
        },
        fetchAllAlerts: jest.fn(),
        getHiddenAlerts: jest.fn(),
        setHiddenAlerts: jest.fn(),
        clearUpdateSettings: jest.fn(),
      }
      enzymeWrapper = setup(props)
    })

    it('should call fetchAllAlerts with preview flag', () => {
      expect(props.fetchAllAlerts).toHaveBeenCalledWith(true)
    })

    it('should call getHiddenAlerts', () => {
      expect(props.getHiddenAlerts).toHaveBeenCalled()
    })

    it('should not render anything', () => {
      expect(enzymeWrapper.isEmptyRender()).toBe(true)
    })

    it('should update hidden alerts in state after loading', () => {
      enzymeWrapper.setProps({
        allAlertsStatus: statuses.SUCCESS,
        hiddenAlerts: {
          state: statuses.SUCCESS,
          data: ['test']
        },
      })

      expect(enzymeWrapper.state().hiddenAlertIds).toEqual(['test'])
    })
  })

  describe('after load', () => {
    beforeEach(() => {
      // Create a new wrapper without a store for this test... It's easier that way
      props = {
        allAlerts: {},
        allAlertsStatus: statuses.SUCCESS,
        hiddenAlerts: {
          state: statuses.SUCCESS,
          data: ['test'],
        },
        hideAlertStatus: statuses.NOT_FETCHED,
        isLoggedIn: true,
        location: {},
        fetchAllAlerts: jest.fn(),
        getHiddenAlerts: jest.fn(),
        setHiddenAlerts: jest.fn(),
        clearUpdateSettings: jest.fn(),
      }
      enzymeWrapper = setup(props)
    })

    it('should render presenter', () => {
      const expected = <Presenter alerts={props.allAlerts} hiddenIds={props.hiddenAlerts.data} />
      expect(enzymeWrapper.containsMatchingElement(expected)).toBe(true)
    })

    it('should update hidden alerts in state store changes', () => {
      enzymeWrapper.setProps({
        hideAlertStatus: statuses.SUCCESS,
        hiddenAlerts: {
          state: statuses.SUCCESS,
          data: ['new'],
        },
      })

      expect(props.clearUpdateSettings).toHaveBeenCalled()
      expect(enzymeWrapper.state().hiddenAlertIds).toEqual(['new'])
    })

    it('should clear alerts list when calling clearHiddenAlerts', () => {
      expect(props.setHiddenAlerts).not.toHaveBeenCalledWith([])
      expect(enzymeWrapper.state().hiddenAlertIds).not.toEqual([])

      enzymeWrapper.instance().clearHiddenAlerts()

      expect(props.setHiddenAlerts).toHaveBeenCalledWith([])
      expect(enzymeWrapper.state().hiddenAlertIds).toEqual([])
    })

    it('should add alert id to list when calling hideAlert', () => {
      enzymeWrapper.instance().hideAlert('newId')

      const expected = [
        ...props.hiddenAlerts.data,
        'newId',
      ]
      expect(props.setHiddenAlerts).toHaveBeenCalledWith(expected)
      expect(enzymeWrapper.state().hiddenAlertIds).toEqual(expected)
    })
  })

  describe('mapStateToProps', () => {
    const testAlerts = [
      {
        sys: {
          id: 'valid 1',
        },
        fields: {
          startTime: yesterday,
          endTime: tomorrow,
          type: 'test_group_1',
          global: true,
        },
      },
      {
        sys: {
          id: 'valid 2',
        },
        fields: {
          startTime: yesterday,
          endTime: tomorrow,
          type: 'test_group_2',
          global: true,
        },
      },
      {
        sys: {
          id: 'valid 777',
        },
        fields: {
          startTime: yesterday,
          endTime: tomorrow,
          type: 'test_group_2',
          global: true,
        },
      },
      {
        sys: {
          id: 'past',
        },
        fields: {
          startTime: yesterday,
          endTime: yesterday,
          type: 'test_invalid',
          global: true,
        },
      },
      {
        sys: {
          id: 'future',
        },
        fields: {
          startTime: tomorrow,
          endTime: tomorrow,
          type: 'test_invalid',
          global: true,
        },
      },
    ]
    const state = {
      settings: {
        hiddenAlerts: {
          state: statuses.SUCCESS,
          data: ['test'],
        },
        update: {
          hiddenAlerts: {
            state: statuses.NOT_FETCHED,
          },
        },
      },
      personal: {
        login: {
          token: 'fake token',
        },
      },
      allAlerts: {
        status: statuses.SUCCESS,
        json: testAlerts,
      },
    }
    const result = mapStateToProps(state)

    it('should recognize user as logged in', () => {
      expect(result.isLoggedIn).toEqual(true)
    })

    it('should group alerts according to type', () => {
      expect(Object.keys(result.allAlerts).length).toBeGreaterThan(0)

      for (const group in result.allAlerts) {
        const expectedInGroup = testAlerts.filter(alert => alert.fields.type === group)
        expect(result.allAlerts[group]).toHaveLength(expectedInGroup.length)
        expectedInGroup.forEach(expected => {
          expect(result.allAlerts[group].some(search => search.id === expected.sys.id)).toBe(true)
        })
      }
    })

    it('should only include current alerts', () => {
      expect(result.allAlerts['test_group_1']).toHaveLength(1)
      expect(result.allAlerts['test_group_2']).toHaveLength(2)
      expect(result.allAlerts['test_invalid']).toBeFalsy()
    })
  })

  describe('mapDispatchToProps', () => {
    it('should create expected actions', () => {
      const result = mapDispatchToProps(null)

      expect(result).toEqual(expect.objectContaining({
        fetchAllAlerts: expect.any(Function),
        getHiddenAlerts: expect.any(Function),
        setHiddenAlerts: expect.any(Function),
        clearUpdateSettings: expect.any(Function),
      }))
    })
  })
})
