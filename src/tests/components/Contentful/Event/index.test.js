import React from 'react'
import { shallow } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import { ContentfulEvent, ContentfulEventContainer } from 'components/Contentful/Event'
import PresenterFactory from 'components/APIPresenterFactory'
import Presenter from 'components/Contentful/Event/presenter'

import * as statuses from 'constants/APIStatuses'

let enzymeWrapper
let store
let props
let state

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

const setup = (state, ownProps) => {
  store = mockStore(state)
  return shallow(<ContentfulEvent store={store} {...ownProps} />)
}

describe('components/Contentful/Event', () => {
  afterEach(() => {
    enzymeWrapper = undefined
  })

  describe('with store', () => {
    beforeEach(() => {
      props = {
        location: {
          search: '?preview=true',
        },
        match: {
          params: {
            id: 'test',
          },
        },
      }
      state = {
        cfEventEntry: {
          status: statuses.SUCCESS,
          json: {
            slug: 'test',
            startDate: '2019-09-07T13:20:00Z',
            endDate: '2019-09-08T14:30:00Z',
            timeOverride: '8:30-9:30AM',
          },
        },
        allEventGroups: {
          status: statuses.SUCCESS,
          json: [],
        }
      }
      enzymeWrapper = setup(state, props)
    })

    it('should render a PresenterFactory', () => {
      const found = enzymeWrapper.dive().dive().find(PresenterFactory)
      expect(found.exists()).toBe(true)
      expect(found.props().presenter).toEqual(Presenter)
    })
  })

  describe('without store', () => {
    describe('before load', () => {
      beforeEach(() => {
        props = {
          status: statuses.NOT_FETCHED,
          allEventGroups: {
            status: statuses.NOT_FETCHED,
            json: ['one', 'two'],
          },
          match: {
            params: {
              id: 'slug',
            },
          },
          preview: true,
          fetchEvent: jest.fn(),
          fetchAllEventGroups: jest.fn(),
        }
        enzymeWrapper = shallow(<ContentfulEventContainer {...props} />)
      })

      it('should call fetchAllEventGroups with preview flag', () => {
        expect(props.fetchAllEventGroups).toHaveBeenCalledWith(true)
      })

      it('should NOT call fetchEvent before event groups fetched', () => {
        expect(props.fetchEvent).not.toHaveBeenCalled()
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
        expect(props.fetchEvent).toHaveBeenCalledWith(props.match.params.id, true, groups)
      })
    })

    describe('after event groups load', () => {
      beforeEach(() => {
        props = {
          status: statuses.NOT_FETCHED,
          allEventGroups: {
            status: statuses.SUCCESS,
            json: ['one', 'two'],
          },
          match: {
            params: {
              id: 'slug',
            },
          },
          preview: true,
          fetchEvent: jest.fn(),
          fetchAllEventGroups: jest.fn(),
        }
        enzymeWrapper = shallow(<ContentfulEventContainer {...props} />)
      })

      it('should NOT fetch event groups again', () => {
        expect(props.fetchAllEventGroups).not.toHaveBeenCalled()
      })

      it('should fetch event', () => {
        expect(props.fetchEvent).toHaveBeenCalledWith(props.match.params.id, true, props.allEventGroups.json)
      })
    })

    describe('after load', () => {
      beforeEach(() => {
        props = {
          status: statuses.SUCCESS,
          allEventGroups: {
            status: statuses.SUCCESS,
            json: ['one', 'two'],
          },
          data: {
            displayDate: 'Sep. 7, 2019',
            displayTime: '08:33 am',
            test: 'data',
            slug: 'slug',
          },
          match: {
            params: {
              id: 'slug',
            },
          },
          preview: true,
          fetchEvent: jest.fn(),
          fetchAllEventGroups: jest.fn(),
        }
        enzymeWrapper = shallow(<ContentfulEventContainer {...props} />)
      })

      it('should NOT make fetch calls on mount', () => {
        expect(props.fetchEvent).not.toHaveBeenCalled()
        expect(props.fetchAllEventGroups).not.toHaveBeenCalled()
      })

      it('should fetch event again if slug changes', () => {
        const newSlug = 'newSlug'
        enzymeWrapper.setProps({
          match: {
            ...props.match,
            params: {
              ...props.match.params,
              id: newSlug,
            },
          },
        })
        expect(props.fetchEvent).toHaveBeenCalledWith(newSlug, expect.any(Boolean), props.allEventGroups.json)
      })
    })
  })
})