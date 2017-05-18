import React from 'react'
import { Provider } from 'react-redux'
import { mount, shallow } from 'enzyme'
import { ContentfulPageContainer } from '../../../../components/Contentful/Page'
import PagePresenter from '../../../../components/Contentful/Page/presenter'
import APIPresenterFactory from '../../../../components/APIPresenterFactory'
import * as statuses from '../../../../CONSTANTS/APIStatuses'
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
        cfPageEntry: { status: 'test', json: {} },
        fetchPage: jest.fn(),
        match: { params: { id: 'fake page slug' } },
        history: {
          push: jest.fn(),
        },
      }
      enzymeWrapper = setup(props)
    })

    afterEach(() => {
      enzymeWrapper = undefined
    })

    it('only renders APIPresenterFactory with cfPageEntry slice and PagePresenter', () => {
      expect(enzymeWrapper
        .containsMatchingElement(<APIPresenterFactory
          status={props.cfPageEntry.status}
          props={{ cfPageEntry: props.cfPageEntry.json }}
          presenter={PagePresenter} />))
        .toBe(true)
    })

    it('calls the bound fetch page action on load', () => {
      expect(props.fetchPage.mock.calls.length).toBe(1)
    })

    it('does not attempt to redirect to secure version', () => {
      enzymeWrapper.setProps(props)
      expect(props.history.push.mock.calls.length).toBe(0)
    })
  })

  describe('secure page', () => {
    beforeEach(() => {
      props = {
        cfPageEntry: {
          status: statuses.SUCCESS,
          json: {
            fields: {
              requiresLogin: true,
            },
          },
        },
        fetchPage: jest.fn(),
        clearPage: jest.fn(),
        match: { params: { id: 'fake page slug' } },
        history: {
          push: jest.fn(),
        },
      }
      enzymeWrapper = setup(props)
    })

    afterEach(() => {
      enzymeWrapper = undefined
    })

    it('only renders APIPresenterFactory with cfPageEntry slice and PagePresenter', () => {
      expect(enzymeWrapper
        .containsMatchingElement(<APIPresenterFactory
          status={props.cfPageEntry.status}
          props={{ cfPageEntry: props.cfPageEntry.json }}
          presenter={PagePresenter} />))
        .toBe(true)
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
      expect(props.history.push.mock.calls.length).toBe(1)
    })
  })
})
