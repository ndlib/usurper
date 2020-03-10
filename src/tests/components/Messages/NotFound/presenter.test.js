import React from 'react'
import { shallow } from 'enzyme'

import NotFound from 'components/Messages/NotFound/presenter'
import ServiceNowLink from 'components/Interactive/ServiceNowLink'
import PageTitle from 'components/Layout/PageTitle'

let enzymeWrapper

const setup = (props) => {
  return shallow(<NotFound {...props} />)
}

describe('components/Messages/NotFound/presenter', () => {
  afterEach(() => {
    enzymeWrapper = undefined
  })

  beforeEach(() => {
    const props = {}
    enzymeWrapper = setup(props)
  })

  it('should render a ServiceNowLink', () => {
    expect(enzymeWrapper.find(ServiceNowLink).exists()).toBe(true)
  })

  it('should render correct title', () => {
    const expected = <PageTitle title='Page Not Found' />
    expect(enzymeWrapper.containsMatchingElement(expected)).toBe(true)
  })
})