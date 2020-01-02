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
    beforeEach(() => {
      props = {
        status: statuses.NOT_FETCHED,
        data: {
          displayDate: 'Sep. 7, 2019',
          displayTime: '08:33 am',
          test: 'data',
        },
        match: {
          params: {
            id: 'slug',
          },
        },
        preview: true,
        fetchEvent: jest.fn(),
      }
      enzymeWrapper = shallow(<ContentfulEventContainer {...props} />)
    })

    it('should fetch event with preview flag', () => {
      expect(props.fetchEvent).toHaveBeenCalledWith(props.match.params.id, true, undefined)
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
      expect(props.fetchEvent).toHaveBeenCalledWith(newSlug, expect.any(Boolean), undefined)
    })

    it('should fetch event again if recurrenceDate changes', () => {
      const newDate = '2019-09-07'
      enzymeWrapper.setProps({
        match: {
          ...props.match,
          params: {
            ...props.match.params,
            date: newDate,
          },
        },
      })
      expect(props.fetchEvent).toHaveBeenCalledWith(props.match.params.id, expect.any(Boolean), newDate)
    })
  })
})