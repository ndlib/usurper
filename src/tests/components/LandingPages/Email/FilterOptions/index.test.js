import React from 'react'
import { shallow } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import FilterOptions, { FilterOptionsContainer } from 'components/LandingPages/Email/FilterOptions'
import Presenter from 'components/LandingPages/Email/FilterOptions/presenter'
import PresenterFactory from 'components/APIPresenterFactory'

import * as statuses from 'constants/APIStatuses'

let enzymeWrapper
let props
let store
let state

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

const setup = (state, ownProps) => {
  store = mockStore(state)
  return shallow(<FilterOptions store={store} {...ownProps} />)
}

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({
    pathname: 'localhost:3000/example/path',
    search: '?preview=true',
  }),
}))

describe('components/LandingPages/Email/FilterOptions', () => {
  afterEach(() => {
    enzymeWrapper = undefined
    props = undefined
    state = undefined
    store = undefined
  })

  beforeEach(() => {
    state = {
      grouping: {
        'event-facets': {
          status: statuses.SUCCESS,
          data: {
            fields: {
              items: [
                {
                  sys: {
                    id: 'abc',
                  },
                  fields: {
                    id: 'foo',
                  },
                },
                {
                  sys: {
                    id: 'xysz',
                  },
                  fields: {
                    id: 'bar',
                  },
                },
              ],
            },
          },
        },
      },
    }
    props = {
      onOptionChange: jest.fn(),
      selectedOptions: {
        test: [
          'one',
          'two',
        ],
      },
    }
    enzymeWrapper = setup(state, props)
  })

  it('should render a PresenterFactory with appropriate props', () => {
    const found = enzymeWrapper.dive().dive().find(PresenterFactory)
    expect(found.exists()).toBe(true)
    expect(found.props().presenter).toEqual(Presenter)
    expect(found.props().props.facets).toHaveLength(2)
    expect(found.props().props.selectedOptions).toEqual(props.selectedOptions)
  })

  describe('without store', () => {
    beforeEach(() => {
      // Call useEffect function immediately on first render
      jest.spyOn(React, 'useEffect').mockImplementation(f => f())
    })

    describe('before data fetched', () => {
      beforeEach(() => {
        props = {
          facetStatus: statuses.NOT_FETCHED,
          facets: [],
          fetchGrouping: jest.fn(),
          onOptionChange: jest.fn(),
          selectedOptions: {},
        }
        enzymeWrapper = shallow(<FilterOptionsContainer {...props} />)
      })

      it('should call fetchGrouping with preview flag', () => {
        expect(props.fetchGrouping).toHaveBeenCalledWith('event-facets', true, expect.any(Number))
      })
    })

    describe('after data fetched', () => {
      beforeEach(() => {
        props = {
          facetStatus: statuses.SUCCESS,
          facets: [],
          fetchGrouping: jest.fn(),
          onOptionChange: jest.fn(),
          selectedOptions: {},
        }
        enzymeWrapper = shallow(<FilterOptionsContainer {...props} />)
      })

      it('should NOT call fetchGrouping', () => {
        expect(props.fetchGrouping).not.toHaveBeenCalled()
      })
    })
  })
})
