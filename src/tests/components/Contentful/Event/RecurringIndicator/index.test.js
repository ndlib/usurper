import React from 'react'
import { Provider } from 'react-redux'
import { mount, shallow } from 'enzyme'

import RecurringIndicator from 'components/Contentful/Event/RecurringIndicator'

const setup = (props) => {
  return shallow(<RecurringIndicator {...props} />)
}

describe('components/Contentful/Event/RecurringIndicator', () => {
  it('should render something when event is recurring', () => {
    const enzymeWrapper = setup({
      entry: {
        recurring: true,
      },
    })
    expect(enzymeWrapper.isEmptyRender()).toBe(false)
  })

  it('should not render anything when event is not recurring', () => {
    const enzymeWrapper = setup({
      entry: {
        recurring: false,
      },
    })
    expect(enzymeWrapper.isEmptyRender()).toBe(true)
  })

  it('should not error if recurring prop is omitted', () => {
    const enzymeWrapper = setup({
      entry: {},
    })
    expect(enzymeWrapper.isEmptyRender()).toBe(true)
  })
})
