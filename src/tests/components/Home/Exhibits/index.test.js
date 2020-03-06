import React from 'react'
import { shallow } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import HomeExhibits, { HomeExhibitsContainer } from 'components/Home/Exhibits'
import Presenter from 'components/Home/Exhibits/presenter'
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
  return shallow(<HomeExhibits store={store} {...ownProps} />)
}

const futureExhibit1 = {
  id: 'first entry',
  slug: 'snail',
  title: 'HELLO',
  event: {
    startDate: new Date('2900-01-01T00:00:00'),
    endDate: new Date('2900-01-05T12:00:00'),
  },
  preferOnHomepage: false,
  order: 13,
}
const futureExhibit2 = {
  id: 'second entry',
  slug: 'escargo',
  title: 'WORLD',
  event: {
    startDate: new Date('2900-01-03T00:00:00'),
    endDate: new Date('2900-01-03T01:00:00'),
  },
  preferOnHomepage: false,
  order: 0,
}
const pastExhibit = {
  id: 'living in the past',
  slug: 'get filtered',
  title: '!',
  event: {
    startDate: new Date('1971-03-04T00:00:00'),
    endDate: new Date('1971-03-04T00:01:00'),
  },
  preferOnHomepage: true,
  order: 2,
}
const eventLessExhibit = {
  id: 'woohoo',
  slug: 'it fine',
  title: 'yay',
  preferOnHomepage: true,
  order: -1,
}
const invalidExhibit = {
  id: 'missing date',
  slug: 'feelsBadMan',
  title: '</3',
  event: {
    startDate: null,
  },
  preferOnHomepage: false,
}

describe('components/Home/Exhibits', () => {
  afterEach(() => {
    enzymeWrapper = undefined
    props = undefined
    state = undefined
    store = undefined
  })

  beforeEach(() => {
    state = {
      allExhibits: {
        status: statuses.SUCCESS,
        json: [
          pastExhibit,
          futureExhibit2,
          futureExhibit1,
          invalidExhibit,
          eventLessExhibit,
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

  it('should render a PresenterFactory with filtered and sorted exhibits', () => {
    const found = enzymeWrapper.dive().dive().find(PresenterFactory)
    expect(found.exists()).toBe(true)
    expect(found.props().presenter).toEqual(Presenter)
    expect(found.props().status).toEqual(state.allExhibits.status)
    expect(found.props().props.entries).toEqual([
      eventLessExhibit,
      pastExhibit,
      futureExhibit2,
    ])
  })

  describe('without store', () => {
    beforeEach(() => {
      props = {
        exhibitsStatus: statuses.NOT_FETCHED,
        filteredExhibits: [
          futureExhibit1,
          futureExhibit2,
        ],
        location: {
          search: '?preview=true',
        },
        fetchAllExhibits: jest.fn(),
      }
      enzymeWrapper = shallow(<HomeExhibitsContainer {...props} />)
    })

    it('should call fetchAllExhibits with preview flag', () => {
      expect(props.fetchAllExhibits).toHaveBeenCalledWith(true)
    })
  })
})
