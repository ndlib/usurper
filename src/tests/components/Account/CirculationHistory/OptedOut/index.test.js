import React from 'react'
import { shallow } from 'enzyme'

import OptedOut from 'components/Account/CirculationHistory/OptedOut'
import Link from 'components/Interactive/Link'
import Config from 'shared/Configuration'

let enzymeWrapper

describe('components/Account/CirculationHistory/OptedOut', () => {
  afterEach(() => {
    enzymeWrapper = undefined
  })

  beforeEach(() => {
    enzymeWrapper = shallow(<OptedOut />)
  })

  it('should render a Link to settings page to opt in', () => {
    const find = <Link to='/settings'>{expect.any(String)}</Link>
    expect(enzymeWrapper.containsMatchingElement(find)).toBe(true)
  })

  it('should render a Link to Onesearch', () => {
    const found = enzymeWrapper.findWhere((el) => el.type() === Link && el.props().to.startsWith(Config.onesearchBaseURL))
    expect(found.exists()).toBe(true)
  })

  it('should render a Link to ILLiad', () => {
    const found = enzymeWrapper.findWhere((el) => el.type() === Link && el.props().to.startsWith(Config.illiadBaseURL))
    expect(found.exists()).toBe(true)
  })
})
