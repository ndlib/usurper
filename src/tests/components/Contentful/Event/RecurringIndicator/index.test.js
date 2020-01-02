import React from 'react'
import { Provider } from 'react-redux'
import { mount, shallow } from 'enzyme'

import RecurringIndicator from 'components/Contentful/Event/RecurringIndicator'

const setup = (props) => {
  return shallow(<RecurringIndicator {...props} />)
}

describe('components/Contentful/Event/RecurringIndicator', () => {
  it('should render something when event has a recurrence schedule', () => {
    const enzymeWrapper = setup({
      entry: {
        dateSchedule: ['2019-01-01'],
      },
    })
    expect(enzymeWrapper.isEmptyRender()).toBe(false)
  })

  it('should not render anything when event has a recurrence schedule', () => {
    const enzymeWrapper = setup({
      entry: {
        dateSchedule: [],
      },
    })
    expect(enzymeWrapper.isEmptyRender()).toBe(true)
  })

  it('should not error if recurrence schedule is omitted', () => {
    const enzymeWrapper = setup({
      entry: {},
    })
    expect(enzymeWrapper.isEmptyRender()).toBe(true)
  })
})
