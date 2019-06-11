import React from 'react'
import { shallow } from 'enzyme'

import CircOptIn from 'components/Account/CirculationHistory/CircOptIn'
import UpdateStatus from 'components/Messages/UpdateStatus'
import PolicyInfo from 'components/Account/CirculationHistory/CircOptIn/PolicyInfo'

import { KIND } from 'actions/personal/settings'
import * as statuses from 'constants/APIStatuses'

let enzymeWrapper

const setup = (props) => {
  return shallow(<CircOptIn {...props} />)
}

describe('components/Account/CirculationHistory/CircOptIn', () => {
  afterEach(() => {
    enzymeWrapper = undefined
  })

  const props = {
    updateStatus: statuses.NOT_FETCHED,
    onClickOptIn: jest.fn(),
  }

  beforeEach(() => {
    enzymeWrapper = setup(props)
  })

  it('should render PolicyInfo', () => {
    expect(enzymeWrapper.find(PolicyInfo).exists()).toBe(true)
  })

  it('should show update message with correct status', () => {
    expect(enzymeWrapper.containsMatchingElement(<UpdateStatus status={statuses.NOT_FETCHED} />)).toBe(true)

    enzymeWrapper.setProps({
      updateStatus: statuses.SUCCESS,
    })
    expect(enzymeWrapper.containsMatchingElement(<UpdateStatus status={statuses.SUCCESS} />)).toBe(true)

    enzymeWrapper.setProps({
      updateStatus: statuses.ERROR,
    })
    expect(enzymeWrapper.containsMatchingElement(<UpdateStatus status={statuses.ERROR} />)).toBe(true)
  })
})
