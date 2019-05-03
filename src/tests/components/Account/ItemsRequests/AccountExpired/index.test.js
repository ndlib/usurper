import React from 'react'
import { shallow } from 'enzyme'

import AccountExpired from 'components/Account/ItemsRequests/AccountExpired'
import PageAlert from 'components/Messages/PageAlert'
import ServiceNowLink from 'components/Interactive/ServiceNowLink'

let enzymeWrapper

describe('components/Account/ItemsRequests/AccountExpired/index.js', () => {
  beforeEach(() => {
    enzymeWrapper = shallow(<AccountExpired />)
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
