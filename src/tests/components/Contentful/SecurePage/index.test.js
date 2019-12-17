import React from 'react'
import { shallow } from 'enzyme'

import ContentfulPage, { ContentfulPageContainer } from 'components/Contentful/SecurePage'
import PagePresenter from 'components/Contentful/Page/presenter'
import APIPresenterFactory from 'components/APIPresenterFactory'
import * as statuses from 'constants/APIStatuses'

let enzymeWrapper
let props

const setup = (props) => {
  return shallow(<ContentfulPageContainer {...props} />)
}

describe('components/Contentful/SecurePage/Container', () => {
  describe('when logged in', () => {
    beforeEach(() => {
      props = {
        login: { state: statuses.SUCCESS, token: 'token' },
        cfPageEntry: { status: statuses.NOT_FETCHED },
        match: { params: { id: 'fake page slug' } },
        location: { search: null },
        fetchPage: jest.fn(),
        initLogin: jest.fn(),
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
        login: { token: null },
        cfPageEntry: { status: statuses.NOT_FETCHED },
        match: { params: { id: 'fake page slug' } },
        location: { search: null },
        fetchPage: jest.fn(),
        initLogin: jest.fn(),
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
  })
})
