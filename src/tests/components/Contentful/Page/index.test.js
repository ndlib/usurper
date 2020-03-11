import React from 'react'
import { Provider } from 'react-redux'
import { mount, shallow } from 'enzyme'
import { ContentfulPageContainer } from 'components/Contentful/Page'
import PagePresenter from 'components/Contentful/Page/presenter'
import APIPresenterFactory from 'components/APIPresenterFactory'
import * as statuses from 'constants/APIStatuses'
import configureStore from 'redux-mock-store'

const setup = (props) => {
  return shallow(<ContentfulPageContainer {...props} />, { lifecycleExperimental: true })
}

let enzymeWrapper
let props
describe('components/Contentful/Page/Container', () => {
  describe('normal page', () => {
    beforeEach(() => {
      props = {
        cfPageEntry: { status: 'test', slug: 'fake page slug', json: { sys: { contentType: { sys: { id: 'page' } } } } },
        fetchPage: jest.fn(),
        clearPage: jest.fn(),
        match: { params: { id: 'fake page slug' } },
        history: {
          replace: jest.fn(),
        },
        personal: {
          login: {},
          loggedIn: true,
          label: 'label',
        },
        search: {
          drawerOpen: false,
          hasPref: false,
          usePref: false,
          searchType: 'FAKE_TYPE',
        },
        menus: {},
        location: { search: null },
      }
      enzymeWrapper = setup(props)
    })

    afterEach(() => {
      enzymeWrapper = undefined
    })

    it('only renders APIPresenterFactory with cfPageEntry slice and PagePresenter', () => {
      const expected = (
        <APIPresenterFactory
          status={props.cfPageEntry.status}
          props={{ cfPageEntry: props.cfPageEntry.json, history: props.history }}
          presenter={PagePresenter}
        />
      )
      expect(enzymeWrapper.containsMatchingElement(expected)).toBe(true)
    })

    it('calls the bound fetch page action on load', () => {
      expect(props.fetchPage.mock.calls.length).toBe(1)
    })

    it('does not attempt to redirect to secure version', () => {
      enzymeWrapper.setProps(props)
      expect(props.history.replace.mock.calls.length).toBe(0)
    })
  })

  describe('secure page', () => {
    beforeEach(() => {
      props = {
        cfPageEntry: {
          status: statuses.UNAUTHORIZED,
          slug: 'fake page slug',
          json: {
            sys: { contentType: { sys: { id: 'page' } } },
            fields: {
              requiresLogin: true,
            },
          },
        },
        fetchPage: jest.fn(),
        clearPage: jest.fn(),
        match: { params: { id: 'fake page slug' } },
        history: {
          replace: jest.fn(),
        },
        location: { search: null },
      }
      enzymeWrapper = setup(props)
    })

    afterEach(() => {
      enzymeWrapper = undefined
    })

    it('only renders APIPresenterFactory with cfPageEntry slice and PagePresenter', () => {
      const expected = (
        <APIPresenterFactory
          status={props.cfPageEntry.status}
          props={{ cfPageEntry: props.cfPageEntry.json, history: props.history }}
          presenter={PagePresenter}
        />
      )
      expect(enzymeWrapper.containsMatchingElement(expected)).toBe(true)
    })

    it('calls the bound fetch page action on load', () => {
      expect(props.fetchPage.mock.calls.length).toBe(1)
    })

    it('calls the clearPage function', () => {
      enzymeWrapper.setProps(props)
      expect(props.clearPage.mock.calls.length).toBe(1)
    })

    it('redirects to secure page', () => {
      enzymeWrapper.setProps(props)
      expect(props.history.replace.mock.calls.length).toBe(1)
    })
  })
})
