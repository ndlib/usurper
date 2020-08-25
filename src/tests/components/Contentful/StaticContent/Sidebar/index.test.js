import React from 'react'
import { shallow } from 'enzyme'
import Sidebar, { mapStateToProps, mapDispatchToProps } from 'components/Contentful/StaticContent/Sidebar'
import Presenter from 'components/Contentful/StaticContent/Sidebar/presenter'
import PresenterFactory from 'components/APIInlinePresenterFactory'
import * as statuses from 'constants/APIStatuses'

let enzymeWrapper
let props

const setup = (props) => {
  return shallow(<Sidebar.WrappedComponent {...props} />)
}

const slug = 'sluggyMcSlugger'

describe('components/Contentful/StaticContent/Sidebar', () => {
  beforeEach(() => {
    props = {
      slug,
      cfStatic: {
        status: statuses.NOT_FETCHED,
        slug,
      },
      fetchSidebar: jest.fn(),
      preview: true,
    }
    enzymeWrapper = setup(props)
  })

  afterEach(() => {
    enzymeWrapper = undefined
    props = undefined
  })

  it('should render a PresenterFactory', () => {
    const found = enzymeWrapper.find(PresenterFactory)
    expect(found.exists()).toBe(true)
    expect(found.props().presenter).toEqual(Presenter)
  })

  it('should call fetchSidebar to get static content', () => {
    expect(props.fetchSidebar).toHaveBeenCalled()
  })

  describe('with data loaded', () => {
    beforeEach(() => {
      props = {
        slug,
        cfStatic: {
          status: statuses.SUCCESS,
          slug,
        },
        fetchSidebar: jest.fn(),
        preview: true,
      }
      enzymeWrapper = setup(props)
    })

    it('should NOT call fetchSidebar', () => {
      expect(props.fetchSidebar).not.toHaveBeenCalled()
    })
  })

  describe('with different slug', () => {
    beforeEach(() => {
      props = {
        slug: 'foo',
        cfStatic: {
          status: statuses.SUCCESS,
          slug: 'bar',
        },
        fetchSidebar: jest.fn(),
        preview: true,
      }
      enzymeWrapper = setup(props)
    })

    it('should call fetchSidebar to get static content', () => {
      expect(props.fetchSidebar).toHaveBeenCalled()
    })

    it('should NOT render anything', () => {
      expect(enzymeWrapper.isEmptyRender()).toBe(true)
    })
  })

  describe('mapStateToProps', () => {
    it('should map props as expected', () => {
      const state = {
        cfStatic: {
          some: 'object',
        },
      }
      const result = mapStateToProps(state)
      expect(result.cfStatic).toEqual(state.cfStatic)
    })
  })

  describe('mapDispatchToProps', () => {
    let dispatch

    beforeEach(() => {
      dispatch = jest.fn()
    })

    it('should create functions for actions', () => {
      const result = mapDispatchToProps(dispatch)
      expect(result.fetchSidebar).toEqual(expect.any(Function))
    })
  })
})
