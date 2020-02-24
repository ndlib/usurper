import React from 'react'
import { Provider } from 'react-redux'
import { shallow } from 'enzyme'

import { ContentfulFloorContainer, mapStateToProps, mapDispatchToProps } from 'components/Contentful/Floor'
import FloorPresenter from 'components/Contentful/Floor/presenter'
import APIPresenterFactory from 'components/APIPresenterFactory'

const setup = (props) => {
  return shallow(<ContentfulFloorContainer {...props} />)
}

let enzymeWrapper
let props

describe('components/Contentful/Floor/Container', () => {
  const pageSlug = 'fakeSlug'

  beforeEach(() => {
    props = {
      cfFloorEntry: {
        status: 'test',
        json: null,
      },
      match: {
        params: {
          id: pageSlug,
        },
      },
      location: {
        search: '?preview=true',
      },
      searchParams: new URLSearchParams({
        preview: true,
      }),
      fetchFloor: jest.fn(),
    }
    enzymeWrapper = setup(props)
  })

  afterEach(() => {
    enzymeWrapper = undefined
    props = undefined
  })

  it('should call the fetch floor action with preview prop', () => {
    expect(props.fetchFloor).toHaveBeenCalledWith(pageSlug, true)
  })

  it('should call the fetch floor action if slug changes', () => {
    props.fetchFloor.mockReset()
    expect(props.fetchFloor).not.toHaveBeenCalled()

    const newSlug = 'testNewSlug'
    enzymeWrapper.setProps({
      match: {
        params: {
          id: newSlug,
        },
      },
    })
    expect(props.fetchFloor).toHaveBeenCalledWith(newSlug, true)
  })

  it('should NOT call the fetch floor action if slug is unchanged on update', () => {
    props.fetchFloor.mockReset()
    expect(props.fetchFloor).not.toHaveBeenCalled()

    enzymeWrapper.setProps({
      test: 'nothing',
    })
    expect(props.fetchFloor).not.toHaveBeenCalled()
  })

  describe('mapStateToProps', () => {
    it('should map props correctly', () => {
      const ownProps = {
        location: {
          search: '?foo=bar&sp=testMe',
        },
      }
      const state = {
        cfFloorEntry: {
          stuff: 'here',
        },
      }
      const newProps = mapStateToProps(state, ownProps)
      expect(newProps).toEqual(expect.objectContaining({
        cfFloorEntry: state.cfFloorEntry,
        spSlug: 'testMe',
      }))
    })
  })

  describe('mapDispatchToProps', () => {
    it('creates expected actions', () => {
      const newProps = mapDispatchToProps(null)
      expect(newProps.fetchFloor).toEqual(expect.any(Function))
    })
  })
})
