import React from 'react'
import { shallow } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import { EventGroupContainer, mapStateToProps, mapDispatchToProps } from 'components/LandingPages/Events/Group'
import Presenter from 'components/LandingPages/Events/Group/presenter'

import * as testData from '../testData'
import * as statuses from 'constants/APIStatuses'

let enzymeWrapper
let props

const groupId = 'my-test-events'

const setup = (props) => {
  return shallow(<EventGroupContainer {...props} />)
}

describe('components/LandingPages/Events/Group', () => {
  afterEach(() => {
    enzymeWrapper = undefined
    props = undefined
  })

  describe('before fetching data', () => {
    beforeEach(() => {
      props = {
        pageTitle: 'Past Events',
        events: [],
        fetchStatus: statuses.NOT_FETCHED,
        groupId: groupId,
        location: {
          search: '?preview=true'
        },
        match: {
          params: {
            groupId: groupId,
          },
        },
        fetchGrouping: jest.fn(),
      }
      enzymeWrapper = setup(props)
    })

    it('should call fetchGrouping with preview flag', () => {
      expect(props.fetchGrouping).toHaveBeenCalledWith(props.groupId, true, expect.any(Number))
    })
  })

  describe('after fetching data', () => {
    beforeEach(() => {
      props = {
        pageTitle: 'Past Events',
        events: [],
        fetchStatus: statuses.SUCCESS,
        groupId: groupId,
        group: {},
        location: {
          search: '?preview=true'
        },
        match: {
          params: {
            groupId: groupId,
          },
        },
        fetchGrouping: jest.fn(),
      }
      enzymeWrapper = setup(props)
    })

    it('should not call fetchGrouping', () => {
      expect(props.fetchGrouping).not.toHaveBeenCalled()
    })
  })

  describe('mapStateToProps', () => {
    beforeEach(() => {
      props = {
        match: {
          params: {
            groupId: groupId,
          },
        },
      }
    })

    it('should return all events in grouping', () => {
      const state = {
        grouping: {
          [groupId]: {
            status: statuses.SUCCESS,
            data: {
              sys: { id: '1234' },
              fields: {
                items: testData.allTestEvents,
              },
            },
          },
        },
      }
      const result = mapStateToProps(state, props)
      expect(result.events).toEqual(testData.allTestEvents)
    })

    it('should provide safe defaults', () => {
      const state = {
        grouping: {
          [groupId]: {
            status: statuses.FETCHING,
          },
        },
      }
      const result = mapStateToProps(state, props)
      expect(result).toEqual(expect.objectContaining({
        groupId: groupId,
        pageTitle: expect.stringMatching(/.+/), // Match any string of 1 or more characters
        fetchStatus: statuses.FETCHING,
        events: [],
        group: undefined,
      }))
    })
  })

  describe('mapDispatchToProps', () => {
    const middlewares = [ thunk ]
    const mockStore = configureMockStore(middlewares)
    let store

    beforeEach(() => {
      const state = {
        grouping: {
          [groupId]: {
            status: statuses.SUCCESS,
            data: {},
          },
        },
      }
      store = mockStore(state)
    })

    afterEach(() => {
      store = undefined
    })

    it('should create fetchGrouping action', () => {
      const result = mapDispatchToProps(store.dispatch)
      expect(result.fetchGrouping).toEqual(expect.any(Function))
    })
  })
})
