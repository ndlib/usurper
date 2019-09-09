import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Route } from 'react-router'
import { mount } from 'enzyme'
import nock from 'nock'

import App from 'components/App'
import PageWrapper from 'components/Layout/PageWrapper'

import Config from 'shared/Configuration'

let enzymeWrapper

describe('components/App', () => {
  beforeAll(() => {
    // Mock a successful response when calling Contentful for global alerts, since this is part of the page wrapper.
    nock(Config.contentfulAPI)
      .get(() => true)
      .query(true)
      .reply(200, [])
      .persist()

    enzymeWrapper = mount(<BrowserRouter><App /></BrowserRouter>)
  })

  afterAll(() => {
    enzymeWrapper.unmount()
  })

  it('should render a PageWrapper with Routes', () => {
    const wrapper = enzymeWrapper.find(PageWrapper)
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.find(Route).length).toBeGreaterThan(0)
  })
})
