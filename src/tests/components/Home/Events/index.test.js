import React from 'react'
import { shallow } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import HomeEvents, { HomeEventsContainer } from 'components/Home/Events'
import Presenter from 'components/Home/Events/presenter'
import PresenterFactory from 'components/APIInlinePresenterFactory'

import * as statuses from 'constants/APIStatuses'

let enzymeWrapper
let props
let state
let store

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

const setup = (state, ownProps) => {
  store = mockStore(state)
  return shallow(<HomeEvents store={store} {...ownProps} />)
}

const futureEvent1 = {
  id: 'first entry',
  slug: 'snail',
  title: 'HELLO',
  startDate: new Date('2900-01-01T00:00:00'),
  endDate: new Date('2900-01-05T12:00:00'),
  preferOnHomepage: false,
}
const futureEvent2 = {
  id: 'second entry',
  slug: 'escargo',
  title: 'WORLD',
  startDate: new Date('2900-01-03T00:00:00'),
  endDate: new Date('2900-01-03T01:00:00'),
  preferOnHomepage: false,
}
const pastEvent = {
  id: 'living in the past',
  slug: 'get filtered',
  title: '!',
  startDate: new Date('1971-03-04T00:00:00'),
  endDate: new Date('1971-03-04T00:01:00'),
  preferOnHomepage: true,
}
const invalidEvent = {
  id: 'missing date',
  slug: 'feelsBadMan',
  title: '</3',
  preferOnHomepage: false,
}

describe('components/Home/Events', () => {
  afterEach(() => {
    enzymeWrapper = undefined
    props = undefined
    state = undefined
    store = undefined
  })

  beforeEach(() => {
    state = {
      allEvents: {
        status: statuses.SUCCESS,
        json: [
          futureEvent2,
          pastEvent,
          futureEvent1,
          invalidEvent,
        ],
      }
    }
    props = {
      location: {
        search: '?preview=false',
      },
    }
    enzymeWrapper = setup(state, props)
  })

  it('should render a PresenterFactory with filtered and sorted events', () => {
    const found = enzymeWrapper.dive().dive().find(PresenterFactory)
    expect(found.exists()).toBe(true)
    expect(found.props().presenter).toEqual(Presenter)
    expect(found.props().status).toEqual(state.allEvents.status)
    expect(found.props().props.entries).toEqual([
      futureEvent1,
      futureEvent2,
    ])
  })

  describe('without store', () => {
    beforeEach(() => {
      props = {
        allEventsStatus: statuses.NOT_FETCHED,
        allEvents: [
          futureEvent1,
          futureEvent2,
        ],
        location: {
          search: '?preview=true',
        },
        fetchAllEvents: jest.fn(),
      }
      enzymeWrapper = shallow(<HomeEventsContainer {...props} />)
    })

    it('should call fetchAllEvents with preview flag', () => {
      expect(props.fetchAllEvents).toHaveBeenCalledWith(true)
    })
  })
})
