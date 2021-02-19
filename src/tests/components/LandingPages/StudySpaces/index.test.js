import React from 'react'
import { shallow } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import { SpacesContainer, mapStateToProps, mapDispatchToProps } from 'components/LandingPages/StudySpaces'
import Presenter from 'components/LandingPages/StudySpaces/presenter'

import * as statuses from 'constants/APIStatuses'

let enzymeWrapper
let props

const setup = (props) => {
  return shallow(<SpacesContainer {...props} />)
}

describe('components/LandingPages/Exhibits/Current', () => {
  afterEach(() => {
    enzymeWrapper = undefined
    props = undefined
  })

  describe('before fetching data', () => {
    beforeEach(() => {
      props = {
        spaces: [],
        allSpacesStatus: statuses.NOT_FETCHED,
        facetStatus: statuses.NOT_FETCHED,
        combinedStatus: statuses.NOT_FETCHED,
        facets: [],
        fetchAllSpaces: jest.fn(),
        fetchGrouping: jest.fn(),
        location: {
          search: '?preview=true'
        },
      }
      enzymeWrapper = setup(props)
    })

    it('should call fetchAllSpaces with preview flag', () => {
      expect(props.fetchAllSpaces).toHaveBeenCalledWith(true)
    })

    it('should call fetchGrouping (to get facets) with preview flag', () => {
      expect(props.fetchGrouping).toHaveBeenCalledWith(expect.any(String), true, expect.any(Number))
    })

    it('should render presenter', () => {
      expect(enzymeWrapper.find(Presenter).exists()).toBe(true)
    })
  })

  describe('after fetching data', () => {
    beforeEach(() => {
      props = {
        spaces: [],
        allSpacesStatus: statuses.SUCCESS,
        facetStatus: statuses.SUCCESS,
        combinedStatus: statuses.SUCCESS,
        facets: [],
        fetchAllSpaces: jest.fn(),
        fetchGrouping: jest.fn(),
        location: {
          search: '?preview=true'
        },
      }
      enzymeWrapper = setup(props)
    })

    it('should not call fetchAllSpaces', () => {
      expect(props.fetchAllSpaces).not.toHaveBeenCalled()
    })

    it('should not call fetchGrouping', () => {
      expect(props.fetchGrouping).not.toHaveBeenCalled()
    })

    it('should render presenter', () => {
      expect(enzymeWrapper.find(Presenter).exists()).toBe(true)
    })
  })

  describe('mapStateToProps', () => {
    beforeEach(() => {
      props = {
        location: {
          search: '?preview=false'
        },
        match: {
          params: {
            date: null,
          },
        },
      }
    })

    it('should provide safe defaults', () => {
      const state = {
        allSpaces: {
          status: statuses.FETCHING,
        },
      }
      const result = mapStateToProps(state, props)
      expect(result).toEqual(expect.objectContaining({
        spaces: [],
        allSpacesStatus: state.allSpaces.status,
        facetStatus: statuses.NOT_FETCHED,
        combinedStatus: state.allSpaces.status,
        facets: [],
      }))
    })
  })

  describe('mapDispatchToProps', () => {
    const middlewares = [ thunk ]
    const mockStore = configureMockStore(middlewares)
    let store

    beforeEach(() => {
      const state = {
        allSpaces: {
          status: statuses.SUCCESS,
        },
      }
      store = mockStore(state)
    })

    afterEach(() => {
      store = undefined
    })

    it('should create expected action functions', () => {
      const result = mapDispatchToProps(store.dispatch)
      expect(result.fetchAllSpaces).toEqual(expect.any(Function))
      expect(result.fetchGrouping).toEqual(expect.any(Function))
    })
  })
})
