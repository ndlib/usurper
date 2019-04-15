import React from 'react'
import { shallow } from 'enzyme'
import Settings from '../../../../components/Account/Settings/presenter.js'
import UserMenu from '../../../../components/Layout/Navigation/UserMenu'

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

  it('Renders a UserMenu component', () => {
    let have = <UserMenu />
    expect(enzymeWrapper.containsMatchingElement(have)).toBe(true)
  })
})
