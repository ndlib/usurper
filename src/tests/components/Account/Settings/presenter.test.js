import React from 'react'
import { shallow } from 'enzyme'
import Settings from 'components/Account/Settings/presenter.js'
import CircOptIn from 'components/Account/Settings/CircOptIn'
import AccountPageWrapper from 'components/Account/AccountPageWrapper'

const setup = (props) => {
  return shallow(
    <Settings {...props} />
  )
}

let enzymeWrapper
let props = {
  preview: false,
  homeLibraries: [],
  setHomeLibrary: jest.fn(),
  setCircStatus: jest.fn(),
  getCircStatus: jest.fn(),
}

describe('components/Account/Settings/presenter.js', () => {
  beforeEach(() => {
    enzymeWrapper = setup(props)
  })

  afterEach(() => {
    enzymeWrapper = undefined
  })

  it('should use AccountPageWrapper', () => {
    expect(enzymeWrapper.find(AccountPageWrapper).exists()).toBe(true)
  })

  it('should render a CircOptIn component', () => {
    expect(enzymeWrapper.find(CircOptIn).exists()).toBe(true)
  })
})
