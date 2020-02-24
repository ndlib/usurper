import React from 'react'
import { shallow } from 'enzyme'

import { FloorSearch, mapStateToProps, mapDispatchToProps } from 'components/FloorSearch'
import Empty from 'components/FloorSearch/Empty'
import Loading from 'components/Messages/Loading'
import * as statuses from 'constants/APIStatuses'

let enzymeWrapper
let props

const setup = (props) => {
  return shallow(<FloorSearch {...props} />)
}

describe('components/FloorSearch', () => {
  afterEach(() => {
    enzymeWrapper = undefined
    props = undefined
  })

  describe('while loading', () => {
    beforeEach(() => {
      props = {
        redirect: {
          status: statuses.NOT_FETCHED,
          slug: 'foobar',
        },
        searchString: '?foo=bar',
        history: {
          push: jest.fn(),
        },
        searchFloorMaps: jest.fn(),
      }
      enzymeWrapper = setup(props)
    })

    it('should call action to fetch floor map', () => {
      expect(props.searchFloorMaps).toHaveBeenCalled()
    })

    it('should render Loading', () => {
      expect(enzymeWrapper.find(Loading).exists()).toBe(true)
    })

    it('should redirect to floor page if one is found', () => {
      enzymeWrapper.setProps({
        redirect: {
          status: statuses.SUCCESS,
          slug: 'foobar',
          servicePoint: 'baz',
        },
      })
      expect(props.history.push).toHaveBeenCalledWith('foobar?foo=bar&sp=baz')
    })

    it('should render Empty component when an error occurs', () => {
      enzymeWrapper.setProps({
        redirect: {
          status: statuses.ERROR,
        },
      })
      expect(enzymeWrapper.find(Empty).exists()).toBe(true)
      expect(enzymeWrapper.find(Loading).exists()).toBe(false)
    })
  })

  describe('mapStateToProps', () => {
    it('should map required props correctly', () => {
      const state = {
        floorSearch: {
          slug: 'test',
        },
      }
      const ownProps = {
        location: {
          search: '?preview=true',
        },
        history: {},
      }
      const response = mapStateToProps(state, ownProps)
      expect(response).toMatchObject({
        redirect: state.floorSearch,
        searchString: '?preview=true',
      })
    })
  })

  describe('mapDispatchToProps', () => {
    it('creates expected actions', () => {
      const newProps = mapDispatchToProps(null)
      expect(newProps.searchFloorMaps).toEqual(expect.any(Function))
    })
  })
})
