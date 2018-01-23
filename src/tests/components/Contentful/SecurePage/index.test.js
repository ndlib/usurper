import React from 'react'
import { Provider } from 'react-redux'
import { mount } from 'enzyme'
import { ContentfulPageContainer } from '../../../../components/Contentful/SecurePage'
import PagePresenter from '../../../../components/Contentful/Page/presenter'
import APIPresenterFactory from '../../../../components/APIPresenterFactory'
import * as statuses from '../../../../constants/APIStatuses'
import configureStore from 'redux-mock-store'

const setup = (props) => {
  const store = configureStore()(props)
  return mount(
    <Provider store={store}>
      <ContentfulPageContainer {...props} />
    </Provider>)
}

let enzymeWrapper
let props
describe('components/Contentful/SecurePage/Container', () => {
  describe('when logged in', () => {
    beforeEach(() => {
      props = {
        isLoggedIn: true,
        cfPageEntry: { status: statuses.NOT_FETCHED },
        fetchPage: jest.fn(),
        match: { params: { id: 'fake page slug' } },
        location: { search: null },
        personal: { login: { token: 'token' } },
      }
      enzymeWrapper = setup(props)
    })

    afterEach(() => {
      enzymeWrapper = undefined
    })

    it('only renders APIPresenterFactory with cfPageEntry slice and PagePresenter', () => {
      expect(enzymeWrapper.
        containsMatchingElement(
          <APIPresenterFactory
            status={props.cfPageEntry.status}
            props={{ cfPageEntry: props.cfPageEntry.json }}
            presenter={PagePresenter}
          />
        )
      ).toBe(true)
    })

    it('calls the bound fetch page action on load', () => {
      expect(props.fetchPage.mock.calls.length).toBe(1)
    })
  })

  describe('when not logged in', () => {
    beforeEach(() => {
      props = {
        isLoggedIn: false,
        loginLoc: '/loc',
        cfPageEntry: { status: statuses.NOT_FETCHED },
        fetchPage: jest.fn(),
        match: { params: { id: 'fake page slug' } },
        location: { search: null },
        personal: { login: { redirectUrl: 'newurl' } },
      }
      enzymeWrapper = setup(props)
    })

    afterEach(() => {
      enzymeWrapper = undefined
    })

    it('only renders APIPresenterFactory with cfPageEntry slice and PagePresenter', () => {
      expect(enzymeWrapper.
        containsMatchingElement(
          <APIPresenterFactory
            status={props.cfPageEntry.status}
            props={{ cfPageEntry: props.cfPageEntry.json }}
            presenter={ PagePresenter }
          />
        )).toBe(true)
    })

    it('does not call fetch page', () => {
      expect(props.fetchPage.mock.calls.length).toBe(0)
    })

    // it('calls the redirect function', () => {
    //   expect(window.location).toBe(props.personal.login.redirectUrl)
    // })
  })
})
