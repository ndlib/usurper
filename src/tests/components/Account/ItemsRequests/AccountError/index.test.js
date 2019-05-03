import React from 'react'
import { shallow } from 'enzyme'

import AccountError from 'components/Account/ItemsRequests/AccountError'
import PageAlert from 'components/Messages/PageAlert'
import ServiceNowLink from 'components/Interactive/ServiceNowLink'

let enzymeWrapper

describe('components/Account/ItemsRequests/AccountError/index.js', () => {
  beforeEach(() => {
    enzymeWrapper = shallow(<AccountError />)
  })

  afterEach(() => {
    enzymeWrapper = undefined
  })

  it('should render a warning PageAlert', () => {
    const found = enzymeWrapper.find(PageAlert)
    expect(found.exists()).toBe(true)
    expect(found.props().type).toEqual('warning')
  })

  it('should render a link to service now', () => {
    const find = <ServiceNowLink>{expect.any(String)}</ServiceNowLink>
    expect(enzymeWrapper.containsMatchingElement(find)).toBe(true)
  })
})
