import React from 'react'
import * as statuses from '../../../constants/APIStatuses'
import Login from '../../../components/Login/presenter'
import Link from '../../../components/Link'

import { shallow } from 'enzyme'

let enzymeWrapper
describe('components/Login/presenter.js', () => {
  beforeEach(() => {
    enzymeWrapper = shallow(<Login loggedIn={true} label='label' buttonUrl='button' logoutUrl='logout' />)
  })

  afterEach(() => {
    enzymeWrapper = undefined
  })

  it('should render a login link', () => {
    let link = <Link to='button' className='login'>label</Link>
    expect(enzymeWrapper.containsMatchingElement(link)).toBe(true)
  })

  it('should render a logout link', () => {
    let link = <Link to='logout' className='logout' hideIfNull>Log Out</Link>
    expect(enzymeWrapper.containsMatchingElement(link)).toBe(true)
  })
})
