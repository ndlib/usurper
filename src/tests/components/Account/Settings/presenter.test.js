import React from 'react'
import { shallow } from 'enzyme'
import Settings from 'components/Account/Settings/presenter.js'
import CircOptIn from 'components/Account/CirculationHistory/CircOptIn'
import AccountPageWrapper from 'components/Account/AccountPageWrapper'
import HomePageDisplay from 'components/Account/Settings/HomePageDisplay'
import PickUp from 'components/Account/Settings/PickUp'

import * as statuses from 'constants/APIStatuses'

const setup = (props) => {
  return shallow(
    <Settings {...props} />
  )
}

let enzymeWrapper
const props = {
  preview: false,
  homeLibraries: ['foo', 'bar', 'baz'],
  setHomeLibrary: jest.fn(),
  selectedLocation: 'bar',
  libraryStatus: statuses.SUCCESS,
  hideFavorites: true,
  homePageDisplayLoading: false,
  defaultSearch: 'fake',
}

describe('components/Account/Settings/presenter.js', () => {
  beforeEach(() => {
    enzymeWrapper = setup(props)
  })

  afterEach(() => {
    enzymeWrapper = undefined
  })

  it('renders a section for each setting', () => {
    expect(enzymeWrapper.containsMatchingElement(<PickUp />)).toBe(true)
    expect(enzymeWrapper.containsMatchingElement(<HomePageDisplay />)).toBe(true)
  })

  it('should use AccountPageWrapper', () => {
    expect(enzymeWrapper.find(AccountPageWrapper).exists()).toBe(true)
  })
})
