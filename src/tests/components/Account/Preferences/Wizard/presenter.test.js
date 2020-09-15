import React from 'react'
import { shallow } from 'enzyme'
import ReactModal from 'react-modal'

import Wizard from 'components/Account/Preferences/Wizard/presenter'

let enzymeWrapper

const setup = (props) => {
  return shallow(<Wizard {...props} />)
}

describe('components/Account/Preferences/Wizard/presenter.js', () => {
  afterEach(() => {
    enzymeWrapper = undefined
  })

  const props = {
    stepNumber: 2,
    stepCount: 3,
    onDismiss: jest.fn(),
  }

  beforeEach(() => {
    enzymeWrapper = setup(props)
  })

  it('should render inside modal', () => {
    expect(enzymeWrapper.find(ReactModal).exists()).toBe(true)
  })

  it('should render close button', () => {
    const found = enzymeWrapper.find('.close-button')
    expect(found.exists()).toBe(true)
    expect(found.props().onClick).toEqual(props.onDismiss)
  })

  it('should display correct step count', () => {
    const found = enzymeWrapper.find('.wizard-step-count-top')
    expect(found.exists()).toBe(true)
    expect(found.text()).toEqual(`${props.stepNumber}/${props.stepCount}`)

    // Try some random numbers, just to be sure :)
    let times = 0
    while (times < 10) {
      const number1 = Math.floor(Math.random() * 100)
      const number2 = Math.floor(Math.random() * 100)
      enzymeWrapper = setup({
        stepNumber: number1,
        stepCount: number2,
        onDismiss: jest.fn(),
      })

      expect(enzymeWrapper.find('.wizard-step-count-top').text()).toEqual(`${number1}/${number2}`)

      times++
    }
  })
})
