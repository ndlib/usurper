import React from 'react'
import { shallow } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import StaticBody, { BodyContainer } from 'components/Contentful/StaticContent/Body'
import PresenterFactory from 'components/APIInlinePresenterFactory'
import Presenter from 'components/Contentful/StaticContent/Body/presenter'

import * as statuses from 'constants/APIStatuses'

let enzymeWrapper
let store
let props
let state

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

const setup = (state, ownProps) => {
  store = mockStore(state)
  return shallow(<StaticBody store={store} {...ownProps} />)
}

describe('components/Contentful/StaticContent/Body', () => {
  afterEach(() => {
    enzymeWrapper = undefined
  })

  describe('with store', () => {
    beforeEach(() => {
      props = {
        slug: 'test',
        preview: true,
        hideLoading: true,
        showDescription: true,
        children: (<div>children</div>),
      }
      state = {
        cfStatic: {
          status: statuses.SUCCESS,
          slug: 'test',
          json: {
            someData: 'sample',
          },
        },
      }
      enzymeWrapper = setup(state, props)
    })

    it('should render a PresenterFactory with needed props', () => {
      const found = enzymeWrapper.dive().dive().find(PresenterFactory)
      expect(found.exists()).toBe(true)
      expect(found.props().presenter).toEqual(Presenter)
      expect(found.props().props).toEqual(expect.objectContaining({
        cfStatic: state.cfStatic.json,
        showDescription: props.showDescription,
        children: props.children,
      }))
    })
  })

  describe('without store', () => {
    beforeEach(() => {
      props = {
        cfStatic: {
          status: statuses.NOT_FETCHED,
          slug: 'test',
          json: {
            someData: 'sample',
          },
        },
        slug: 'test',
        preview: true,
        hideLoading: true,
        showDescription: true,
        children: (<div>children</div>),
        fetchSidebar: jest.fn(),
      }
      enzymeWrapper = shallow(<BodyContainer {...props} />)
    })

    it('should call fetch sidebar with preview flag', () => {
      expect(props.fetchSidebar).toHaveBeenCalledWith(props.slug, props.preview)
    })

    it('should call fetch sidebar and not render if slug does not match', () => {
      // Clear it so the initial render isn't considered
      props.fetchSidebar.mockClear()
      expect(props.fetchSidebar).not.toHaveBeenCalled()

      const newSlug = 'newSlug'
      props.slug = 'newSlug'
      enzymeWrapper = shallow(<BodyContainer {...props} />)
      expect(props.fetchSidebar).toHaveBeenCalledWith(newSlug, expect.any(Boolean))
      expect(enzymeWrapper.isEmptyRender()).toBe(true)
    })
  })
})